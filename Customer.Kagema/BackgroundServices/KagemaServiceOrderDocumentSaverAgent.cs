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
		private readonly PdfGenerationConfig pdfConfig;

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
			this.pdfConfig = new PdfGenerationConfig(appSettingsProvider);
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

		/// <summary>
		/// Generate service report using exact same method as preview with proper CSS context
		/// </summary>
		private byte[] GenerateServiceReportWithProperContext(ServiceOrderHead order)
		{
			try
			{
				// Establish proper web context for CSS and resource loading
				EstablishWebRenderingContext();
				
				// Create service report model with proper context
				var reportViewModel = new Crm.Service.ViewModels.ServiceOrderReportViewModel(order, appSettingsProvider);
				
				// Use exact same margins as preview
				var headerMargin = pdfConfig.ServiceReportHeaderMargin;
				var footerMargin = pdfConfig.ServiceReportFooterMargin;
				
				// Render with proper CSS context and base URL
				var htmlContent = renderViewToStringService.RenderViewToString("Crm.Service", "ServiceOrderReport", "ServiceOrderReport", reportViewModel);
				
				// Apply CSS fixes for PDF generation
				htmlContent = ApplyPdfSpecificCssAdjustments(htmlContent);
				
				// Generate PDF with exact same settings as preview
				return pdfService.Html2Pdf(htmlContent, 
					headerMargin: headerMargin, 
					footerMargin: footerMargin,
					pageSize: pdfConfig.PageSize,
					orientation: pdfConfig.Orientation,
					enableLocalFileAccess: true, // Ensure images load properly
					loadImages: true); // Ensure logos render
			}
			catch (Exception ex)
			{
				Logger.Error($"Failed to generate service report with proper context for order {order.OrderNo}: {ex.Message}", ex);
				// Fallback to original method if new method fails
				return serviceOrderService.CreateServiceOrderReportAsPdf(order);
			}
		}

		/// <summary>
		/// Generate dispatch report using EXACT same method as DispatchReportAttachmentProvider
		/// </summary>
		private byte[] GenerateDispatchReportWithProperContext(ServiceOrderDispatch dispatch)
		{
			try
			{
				// Establish proper web context for CSS and resource loading
				EstablishWebRenderingContext();
				
				// Create dispatch report model - use same factory as preview
				var model = responseViewModelFactory(dispatch as DynamicFormReference);
				
				// Generate main content with EXACT same margins as DispatchReportAttachmentProvider
				var viewAsPdf = pdfService.Html2Pdf(
					renderViewToStringService.RenderViewToString("Crm.DynamicForms", "DynamicForm", "Response", model), 
					headerMargin: pdfConfig.DispatchReportHeaderMargin, // 3.0
					footerMargin: pdfConfig.DispatchReportFooterMargin, // 2.0
					pageSize: pdfConfig.PageSize,
					orientation: pdfConfig.Orientation,
					enableLocalFileAccess: true,
					loadImages: true
				);
				
				// Generate header with EXACT same settings
				byte[] headerAsPdf = null;
				try
				{
					var headerContent = renderViewToStringService.RenderViewToString("Crm.DynamicForms", "DynamicForm", "DynamicFormPageHeader", model);
					if (!string.IsNullOrWhiteSpace(headerContent))
					{
						headerContent = ApplyPdfSpecificCssAdjustments(headerContent);
						headerAsPdf = pdfService.Html2Pdf(headerContent, 
							headerMargin: pdfConfig.HeaderOnlyMargin, // 1.0
							pageSize: pdfConfig.PageSize,
							orientation: pdfConfig.Orientation,
							enableLocalFileAccess: true,
							loadImages: true);
					}
				}
				catch (Exception ex)
				{
					Logger.Warn($"Failed to render header for dispatch {dispatch.Id}: {ex.Message}");
				}
				
				// Generate footer with EXACT same settings
				byte[] footerAsPdf = null;
				try
				{
					var footerContent = renderViewToStringService.RenderViewToString("Crm.DynamicForms", "DynamicForm", "DynamicFormPageFooter", model);
					if (!string.IsNullOrWhiteSpace(footerContent))
					{
						footerContent = ApplyPdfSpecificCssAdjustments(footerContent);
						footerAsPdf = pdfService.Html2Pdf(footerContent, 
							headerMargin: pdfConfig.FooterOnlyMargin, // 27.5
							pageSize: pdfConfig.PageSize,
							orientation: pdfConfig.Orientation,
							enableLocalFileAccess: true,
							loadImages: true);
					}
				}
				catch (Exception ex)
				{
					Logger.Warn($"Failed to render footer for dispatch {dispatch.Id}: {ex.Message}");
				}
				
				// Combine header, content, and footer EXACTLY like DispatchReportAttachmentProvider
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

		/// <summary>
		/// Establish proper web rendering context to match preview environment
		/// </summary>
		private void EstablishWebRenderingContext()
		{
			try
			{
				// Set proper base URL for image/resource resolution
				var baseUrl = appSettingsProvider.GetValue("Application.BaseUrl") ?? "http://localhost";
				
				// Ensure HTTP context is available for resource resolution
				if (System.Web.HttpContext.Current == null)
				{
					// Create minimal HTTP context for resource loading
					var httpRequest = new System.Web.HttpRequest("", baseUrl, "");
					var httpResponse = new System.Web.HttpResponse(new System.IO.StringWriter());
					var httpContext = new System.Web.HttpContext(httpRequest, httpResponse);
					System.Web.HttpContext.Current = httpContext;
				}
			}
			catch (Exception ex)
			{
				Logger.Warn($"Failed to establish web rendering context: {ex.Message}");
				// Continue without HTTP context - PDF generation will still work but might have resource loading issues
			}
		}

		/// <summary>
		/// Apply CSS adjustments specifically for PDF generation to match preview appearance
		/// </summary>
		private string ApplyPdfSpecificCssAdjustments(string htmlContent)
		{
			// Fix common PDF rendering issues
			var adjustedContent = htmlContent
				// Ensure images use absolute paths
				.Replace("src=\"/", $"src=\"{appSettingsProvider.GetValue("Application.BaseUrl") ?? "http://localhost"}/")
				// Fix font rendering
				.Replace("<head>", "<head><style>body { font-family: Arial, sans-serif; } img { max-width: 100%; height: auto; }</style>")
				// Ensure proper page breaks
				.Replace("page-break-inside: avoid", "page-break-inside: avoid; -webkit-print-color-adjust: exact;");
			
			return adjustedContent;
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

		public virtual string GetDispatchReportFileName(ServiceOrderDispatch dispatch)
		{
			return $"{dispatch.OrderHead.OrderNo} - {dispatch.Date.ToLocalTime().ToIsoDateString()} {dispatch.Date.ToFormattedString("HH-mm")} - {dispatch.DispatchedUser.DisplayName}";
		}
	}
}
