namespace Customer.Kagema.BackgroundServices
{
	using System;
	using System.IO;
	using System.Linq;

	using Crm.Library.AutoFac;
	using Crm.Library.BackgroundServices;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Environment.Network;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Services.Interfaces;
	using Crm.Service.Model;
	using Crm.Service.Services.Interfaces;
	using Crm.Service;
	using log4net;

	using Microsoft.Extensions.Hosting;

	using Quartz;
	using Microsoft.AspNetCore.Authorization;
	using Sms.Checklists.Model;
	using Crm.DynamicForms.Model;
	using Crm.DynamicForms.ViewModels;
	using Crm.Library.Extensions;
	using Crm.Services;
	using System.Collections.Generic;
	using Crm.Services.Interfaces;
	using Crm.Model;
	using Sms.Checklists.ViewModels;
	using Crm.Service.BackgroundServices;
	using System.Globalization;
	using System.Security.Principal;
	using System.Threading;

	using System.Net.Mail;
	using System.Net.Mime;
	using System.Text;

	using Crm.Library.Extensions.IIdentity;
	using Crm.Library.Globalization;
	using Crm.Library.Globalization.Lookup;
	using Crm.Service.Model.Lookup;
	using Ical.Net.DataTypes;
	using Customer.Kagema.Services;

	[DisallowConcurrentExecution]
	public class KagemaServiceOrderDocumentSaverAgent : ServiceOrderDocumentSaverAgent
	{
		private readonly IServiceOrderService serviceOrderService;
		private readonly IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderRepository;
		private readonly IServiceOrderDocumentSaverConfiguration serviceOrderDocumentSaverConfiguration;
		private readonly IAppSettingsProvider appSettingsProvider;
		private readonly IFileService fileService;
		private readonly IEnumerable<IDispatchReportAttachmentProvider> dispatchReportAttachmentProviders;
		private readonly IRepositoryWithTypedId<DocumentAttribute, Guid> documentAttributeRepository;
		private readonly IClientSideGlobalizationService clientSideGlobalizationService;
		private readonly ReportCompletenessValidator validator;
		private readonly IPdfService pdfService;
		private readonly IRenderViewToStringService renderViewToStringService;
		private readonly Func<DynamicFormReference, ServiceOrderChecklistResponseViewModel> responseViewModelFactory;

		public KagemaServiceOrderDocumentSaverAgent(ISessionProvider sessionProvider, IServiceOrderDocumentSaverConfiguration serviceOrderDocumentSaverConfiguration, IServiceOrderService serviceOrderService, IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderRepository, ILog logger, IAppSettingsProvider appSettingsProvider, IHostApplicationLifetime hostApplicationLifetime, IFileService fileService, IRepositoryWithTypedId<DocumentAttribute, Guid> documentAttributeRepository, IEnumerable<IDispatchReportAttachmentProvider> dispatchReportAttachmentProviders, Func<DynamicFormReference, ServiceOrderChecklistResponseViewModel> responseViewModelFactory, IClientSideGlobalizationService clientSideGlobalizationService, IPdfService pdfService, IRenderViewToStringService renderViewToStringService)
			: base(sessionProvider,serviceOrderDocumentSaverConfiguration,serviceOrderService,serviceOrderRepository,logger,appSettingsProvider,hostApplicationLifetime)
		{
			this.serviceOrderDocumentSaverConfiguration = serviceOrderDocumentSaverConfiguration;
			this.serviceOrderService = serviceOrderService;
			this.serviceOrderRepository = serviceOrderRepository;
			this.appSettingsProvider = appSettingsProvider;
			this.dispatchReportAttachmentProviders = dispatchReportAttachmentProviders;
			this.fileService = fileService;
			this.documentAttributeRepository = documentAttributeRepository;
			this.clientSideGlobalizationService = clientSideGlobalizationService;
			this.validator = new ReportCompletenessValidator(logger);
			this.pdfService = pdfService;
			this.renderViewToStringService = renderViewToStringService;
			this.responseViewModelFactory = responseViewModelFactory;
		}

		protected override void SaveServiceOrderReport(ServiceOrderHead order, string exportServiceOrderReportsPath)
		{
			// Validate order completeness before generating reports
			if (!validator.ValidateServiceOrderCompleteness(order))
			{
				throw new InvalidOperationException($"Service Order {order.OrderNo} failed validation - incomplete data detected");
			}

			// Force eager loading of critical relationships to prevent lazy loading issues
			EnsureDataIsLoaded(order);

			ExportServiceReport(order);
			ExportServiceOrderChecklists(order);
			ExportServiceOrderDocuments(order);
		}

		private void EnsureDataIsLoaded(ServiceOrderHead order)
		{
			try
			{
				// Force loading of lazy-loaded relationships
				if (order.CustomerContact != null)
				{
					var _ = order.CustomerContact.Name; // Access property to trigger loading
				}

				if (order.Dispatches != null)
				{
					foreach (var dispatch in order.Dispatches)
					{
						if (dispatch.DispatchedUser != null)
						{
							var _ = dispatch.DispatchedUser.DisplayName; // Force loading
						}
					}
				}

				// Ensure collections are initialized
				var materialsCount = order.ServiceOrderMaterials?.Count ?? 0;
				var postingsCount = order.ServiceOrderTimePostings?.Count ?? 0;
				var dispatchesCount = order.Dispatches?.Count ?? 0;

				Logger.Info($"Order {order.OrderNo} - Loaded: {dispatchesCount} dispatches, {materialsCount} materials, {postingsCount} postings");
			}
			catch (Exception ex)
			{
				Logger.Error($"Error ensuring data is loaded for order {order.OrderNo}: {ex.Message}", ex);
				throw;
			}
		}

		[AllowAnonymous]
		private void ExportServiceReport(ServiceOrderHead order)
		{
			const int maxRetries = 3;
			Exception lastException = null;

			for (int attempt = 1; attempt <= maxRetries; attempt++)
			{
				try
				{
					Logger.Info($"Generating service report for order {order.OrderNo} (attempt {attempt}/{maxRetries})");

					// Use the same PDF generation method as preview to ensure consistency
					var bytes = GenerateServiceReportWithProperContext(order);

					// Validate generated content
					var filename = serviceOrderDocumentSaverConfiguration.GetReportFileName(order);
					if (!validator.ValidateGeneratedFileContent(bytes, filename))
					{
						throw new InvalidOperationException($"Generated service report for order {order.OrderNo} failed validation");
					}

					var exportPath = appSettingsProvider.GetValue(KagemaPlugin.Settings.ServiceOrderReportPath);
					var directory = Path.Combine(exportPath, order.OrderNo);
					var directoryWithLmobileFolder = Path.Combine(directory, "L-Mobile");
					var ServiceOrderReportFullpath = Path.Combine(directoryWithLmobileFolder, filename);

					if (Directory.Exists(directoryWithLmobileFolder) == false)
					{
						Directory.CreateDirectory(directoryWithLmobileFolder);
					}

					File.WriteAllBytes(ServiceOrderReportFullpath, bytes);
					Logger.Info($"Successfully exported service report for order {order.OrderNo}");
					return; // Success, exit retry loop
				}
				catch (Exception ex)
				{
					lastException = ex;
					Logger.Warn($"Attempt {attempt} failed for service report generation of order {order.OrderNo}: {ex.Message}");

					if (attempt < maxRetries)
					{
						Thread.Sleep(1000 * attempt); // Progressive delay
					}
				}
			}

			// All retries failed
			throw new InvalidOperationException($"Failed to generate service report for order {order.OrderNo} after {maxRetries} attempts", lastException);
		}

		[AllowAnonymous]
		private void ExportServiceOrderChecklists(ServiceOrderHead order)
		{
			var exportPath = appSettingsProvider.GetValue(KagemaPlugin.Settings.ServiceOrderReportPath);
			var directory = Path.Combine(exportPath, order.OrderNo);
			var directoryWithLmobileFolder = Path.Combine(directory, "L-Mobile");

			var Checklists = new List<FileResource>();

			foreach (ServiceOrderDispatch dispatch in order.Dispatches)
			{
				// Validate dispatch before processing
				if (!validator.ValidateDispatchCompleteness(dispatch))
				{
					Logger.Warn($"Skipping incomplete dispatch {dispatch.Id} for order {order.OrderNo}");
					continue;
				}

				var user = dispatch.DispatchedUser;
				if (user != null)
				{
					try
					{
						Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(user.GetIdentityString()), new string[0]);
						Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(clientSideGlobalizationService.GetCurrentLanguageCultureNameOrDefault());
						Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(clientSideGlobalizationService.GetCurrentCultureNameOrDefault());
					}
					catch (Exception ex)
					{
						Logger.Warn($"Failed to set thread culture for user {user.GetIdentityString()}: {ex.Message}");
						// Continue with default culture
					}
				}

				try
				{
					// Use the same PDF generation method as preview to ensure consistency
					var bytes = GenerateDispatchReportWithProperContext(dispatch);
					var fileName = GetDispatchReportFileName(dispatch).AppendIfMissing(".pdf");

					// Validate generated dispatch report
					if (!validator.ValidateGeneratedFileContent(bytes, fileName))
					{
						Logger.Error($"Generated dispatch report for dispatch {dispatch.Id} failed validation - skipping");
						continue;
					}

					Checklists.Add(fileService.CreateAndSaveFileResource(bytes, MediaTypeNames.Application.Pdf, fileName));

					// Process attachments using the existing provider logic
					foreach (var dispatchReportAttachmentProvider in dispatchReportAttachmentProviders)
					{
						var attachments = dispatchReportAttachmentProvider.GetAttachments(dispatch, true);
						foreach (var attachment in attachments)
						{
							try
							{
								var attachmentBytes = attachment.ContentStream.ReadAllBytes();
								if (validator.ValidateGeneratedFileContent(attachmentBytes, attachment.Name))
								{
									Checklists.Add(fileService.CreateAndSaveFileResource(attachmentBytes, attachment.ContentType.MediaType, attachment.Name));
								}
								else
								{
									Logger.Warn($"Attachment {attachment.Name} failed validation - skipping");
								}
							}
							catch (Exception ex)
							{
								Logger.Error($"Failed to process attachment {attachment.Name}: {ex.Message}", ex);
							}
						}
					}
				}
				catch (Exception ex)
				{
					Logger.Error($"Failed to generate dispatch report for dispatch {dispatch.Id}: {ex.Message}", ex);
					// Continue with other dispatches
				}
			}

			// Save validated checklists
			foreach (FileResource checklist in Checklists)
			{
				try
				{
					var fullPath = Path.Combine(directoryWithLmobileFolder, checklist.Filename);
					using (var unc = new UNCAccessWithCredentials())
					{
						if (Directory.Exists(directoryWithLmobileFolder) == false)
						{
							Directory.CreateDirectory(directoryWithLmobileFolder);
						}
						File.WriteAllBytes(fullPath, checklist.Content);
					}
				}
				catch (Exception ex)
				{
					Logger.Error($"Failed to save checklist {checklist.Filename}: {ex.Message}", ex);
					throw; // Re-throw to mark the entire operation as failed
				}
			}

			Logger.Info($"Successfully exported {Checklists.Count} checklists for order {order.OrderNo}");
		}

		[AllowAnonymous]
		private string ExportServiceOrderDocuments(ServiceOrderHead order)
		{
			string folder = appSettingsProvider.GetValue(KagemaPlugin.Settings.ServiceOrderReportPath);


			var relatedDocuments = documentAttributeRepository.GetAll().Where(x => x.ReferenceKey == order.Id).ToList();
			var exportDocument = !String.IsNullOrEmpty(appSettingsProvider.GetValue(KagemaPlugin.Settings.ServiceOrderReportPath))
				&& relatedDocuments.Count() > 0;
			if (relatedDocuments.Count() == 0)
			{
				return null;
			}

			foreach (var document in relatedDocuments)
			{
				//var directory = Path.Combine(appSettingsProvider.GetValue(KagemaPlugin.Settings.ServiceOrderReportPath), order.OrderNo);

				var filename = "(" + relatedDocuments.IndexOf(document).ToString() + ")" + document.FileName;

				//var fullPath = Path.Combine(directory, filename);

				var directory = Path.Combine(appSettingsProvider.GetValue(KagemaPlugin.Settings.ServiceOrderReportPath), order.OrderNo);
				var directoryWithLmobileFolder = Path.Combine(directory, "L-Mobile");
				var fullPath = Path.Combine(directoryWithLmobileFolder, filename);


				using (var unc = new UNCAccessWithCredentials())
				{

					if (Directory.Exists(directoryWithLmobileFolder) == false)
					{
						Directory.CreateDirectory(directoryWithLmobileFolder);
					}
					File.WriteAllBytes(fullPath, document.FileResource.Content);
				}
			}

			return folder;
		}

		/// <summary>
		/// Generate service report using the same method as preview to ensure consistency
		/// </summary>
		private byte[] GenerateServiceReportWithProperContext(ServiceOrderHead order)
		{
			try
			{
				// Create service report model with proper context
				var reportViewModel = new Crm.Service.ViewModels.ServiceOrderReportViewModel(order, appSettingsProvider);
				
				// Get configuration values for consistent margins
				var headerMargin = appSettingsProvider.GetValue(MainPlugin.Settings.Report.HeaderMargin);
				var footerMargin = appSettingsProvider.GetValue(MainPlugin.Settings.Report.FooterMargin);
				
				// Render the view with proper context
				var htmlContent = renderViewToStringService.RenderViewToString("Crm.Service", "ServiceOrderReport", "ServiceOrderReport", reportViewModel);
				
				// Generate PDF with consistent settings
				return pdfService.Html2Pdf(htmlContent, headerMargin: headerMargin, footerMargin: footerMargin);
			}
			catch (Exception ex)
			{
				Logger.Error($"Failed to generate service report with proper context for order {order.OrderNo}: {ex.Message}", ex);
				// Fallback to original method if new method fails
				return serviceOrderService.CreateServiceOrderReportAsPdf(order);
			}
		}

		/// <summary>
		/// Generate dispatch report using the same method as preview to ensure consistency
		/// </summary>
		private byte[] GenerateDispatchReportWithProperContext(ServiceOrderDispatch dispatch)
		{
			try
			{
				// Create dispatch report model with proper context
				var reportViewModel = new Crm.Service.ViewModels.DispatchReportViewModel(dispatch, appSettingsProvider);
				
				// Get configuration values for consistent margins
				var headerMargin = appSettingsProvider.GetValue(MainPlugin.Settings.Report.HeaderMargin);
				var footerMargin = appSettingsProvider.GetValue(MainPlugin.Settings.Report.FooterMargin);
				
				// Render the main content
				var viewAsPdf = pdfService.Html2Pdf(
					renderViewToStringService.RenderViewToString("Crm.Service", "DispatchReport", "DispatchReport", reportViewModel), 
					headerMargin: headerMargin, 
					footerMargin: footerMargin
				);
				
				// Render header if it exists
				byte[] headerAsPdf = null;
				try
				{
					var headerContent = renderViewToStringService.RenderViewToString("Crm.DynamicForms", "DynamicForm", "DynamicFormPageHeader", reportViewModel);
					if (!string.IsNullOrWhiteSpace(headerContent))
					{
						headerAsPdf = pdfService.Html2Pdf(headerContent, headerMargin: 1);
					}
				}
				catch (Exception ex)
				{
					Logger.Warn($"Failed to render header for dispatch {dispatch.Id}: {ex.Message}");
				}
				
				// Render footer if it exists
				byte[] footerAsPdf = null;
				try
				{
					var footerContent = renderViewToStringService.RenderViewToString("Crm.DynamicForms", "DynamicForm", "DynamicFormPageFooter", reportViewModel);
					if (!string.IsNullOrWhiteSpace(footerContent))
					{
						footerAsPdf = pdfService.Html2Pdf(footerContent, headerMargin: 27.5);
					}
				}
				catch (Exception ex)
				{
					Logger.Warn($"Failed to render footer for dispatch {dispatch.Id}: {ex.Message}");
				}
				
				// Combine header, content, and footer like the preview does
				if (headerAsPdf != null && footerAsPdf != null)
				{
					return pdfService.AddPageHeadersFooters(viewAsPdf, headerAsPdf, footerAsPdf);
				}
				else
				{
					return viewAsPdf;
				}
			}
			catch (Exception ex)
			{
				Logger.Error($"Failed to generate dispatch report with proper context for dispatch {dispatch.Id}: {ex.Message}", ex);
				// Fallback to original method if new method fails
				return serviceOrderService.CreateDispatchReportAsPdf(dispatch);
			}
		}

		public virtual string GetDispatchReportFileName(ServiceOrderDispatch dispatch)
		{
			return $"{dispatch.OrderHead.OrderNo} - {dispatch.Date.ToLocalTime().ToIsoDateString()} {dispatch.Date.ToFormattedString("HH-mm")} - {dispatch.DispatchedUser.DisplayName}";
		}
	}
}
