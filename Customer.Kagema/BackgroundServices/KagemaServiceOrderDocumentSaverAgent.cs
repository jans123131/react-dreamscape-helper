namespace Customer.Kagema.BackgroundServices
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Net.Mime;
    using System.Security.Principal;
    using System.Threading;

    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Data.NHibernateProvider;
    using Crm.Library.Extensions;
    using Crm.Library.Extensions.IIdentity;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Helper;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Crm.Service;
    using Crm.Service.BackgroundServices;
    using Crm.Service.Model;
    using Crm.Service.Services.Interfaces;
    using Crm.Services.Interfaces;

    using Customer.Kagema.Model.Extensions;
    using Customer.Kagema.Services;

    using log4net;

    using Microsoft.Extensions.Hosting;

    using Quartz;

    [DisallowConcurrentExecution]
    public class KagemaServiceOrderDocumentSaverAgent : ServiceOrderDocumentSaverAgent
    {
        private readonly IServiceOrderService serviceOrderService;
        private readonly IServiceOrderDocumentSaverConfiguration configuration;
        private readonly IEnumerable<IDispatchReportAttachmentProvider> dispatchReportAttachmentProviders;
        private readonly IRepositoryWithTypedId<ServiceOrderDispatch, Guid> serviceOrderDispatchRepository;
        private readonly IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderHeadRepository;
        private readonly IAppSettingsProvider appSettingsProvider;
        private readonly ILog logger;
        private readonly IHostApplicationLifetime hostApplicationLifetime;
        private readonly IFileService fileService;

        private readonly PdfGenerationConfig pdfConfig;
        private readonly ReportCompletenessValidator validator;

        public KagemaServiceOrderDocumentSaverAgent(ISessionProvider sessionProvider, IServiceOrderService serviceOrderService, IServiceOrderDocumentSaverConfiguration configuration, IEnumerable<IDispatchReportAttachmentProvider> dispatchReportAttachmentProviders, IRepositoryWithTypedId<ServiceOrderDispatch, Guid> serviceOrderDispatchRepository, IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderHeadRepository, IAppSettingsProvider appSettingsProvider, ILog logger, IHostApplicationLifetime hostApplicationLifetime, IFileService fileService, IRenderViewToStringService renderViewToStringService, IPdfService pdfService, PdfGenerationConfig pdfConfig, ReportCompletenessValidator validator) : base(sessionProvider, serviceOrderService, configuration, dispatchReportAttachmentProviders, serviceOrderDispatchRepository, serviceOrderHeadRepository, appSettingsProvider, logger, hostApplicationLifetime, fileService)
        {
            this.serviceOrderService = serviceOrderService;
            this.configuration = configuration;
            this.dispatchReportAttachmentProviders = dispatchReportAttachmentProviders;
            this.serviceOrderDispatchRepository = serviceOrderDispatchRepository;
            this.serviceOrderHeadRepository = serviceOrderHeadRepository;
            this.appSettingsProvider = appSettingsProvider;
            this.logger = logger;
            this.hostApplicationLifetime = hostApplicationLifetime;
            this.fileService = fileService;
            this.pdfConfig = pdfConfig;
            this.validator = validator;
        }

        protected override void SaveServiceOrderReport(ServiceOrderHead order)
        {
            if (!validator.ValidateServiceOrderCompleteness(order))
            {
                order.ReportSavingError = "Service order data validation failed";
                return;
            }

            // Use consistent PDF generation like preview
            var bytes = GenerateServiceOrderReportWithConsistentDesign(order);
            
            if (!validator.ValidateGeneratedFileContent(bytes, $"{order.OrderNo}.pdf"))
            {
                order.ReportSavingError = "Generated PDF validation failed";
                return;
            }

            var fileName = configuration.GetReportFileName(order).AppendIfMissing(".pdf");
            var filePath = Path.Combine(configuration.GetReportSavePath(order), fileName);
            
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                File.WriteAllBytes(filePath, bytes);
                order.ReportSaved = true;
                order.ReportSavingError = null;
                logger.Info($"Service order report saved: {filePath}");
            }
            catch (Exception ex)
            {
                order.ReportSavingError = ex.ToString();
                logger.Error($"Failed to save service order report for {order.OrderNo}: {ex}");
            }
        }

        protected override void SaveDispatchReport(ServiceOrderDispatch dispatch)
        {
            if (!validator.ValidateDispatchCompleteness(dispatch))
            {
                dispatch.ReportSavingError = "Dispatch data validation failed";
                return;
            }

            // Use consistent PDF generation like preview  
            var bytes = GenerateDispatchReportWithConsistentDesign(dispatch);
            
            if (!validator.ValidateGeneratedFileContent(bytes, $"{dispatch.OrderHead.OrderNo}_dispatch.pdf"))
            {
                dispatch.ReportSavingError = "Generated PDF validation failed";
                return;
            }

            var fileName = configuration.GetReportFileName(dispatch).AppendIfMissing(".pdf");
            var filePath = Path.Combine(configuration.GetReportSavePath(dispatch), fileName);
            
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                File.WriteAllBytes(filePath, bytes);
                dispatch.ReportSaved = true;
                dispatch.ReportSavingError = null;
                logger.Info($"Dispatch report saved: {filePath}");
            }
            catch (Exception ex)
            {
                dispatch.ReportSavingError = ex.ToString();
                logger.Error($"Failed to save dispatch report for {dispatch.OrderHead.OrderNo}: {ex}");
            }
        }

        private byte[] GenerateServiceOrderReportWithConsistentDesign(ServiceOrderHead order)
        {
            // Use same generation method as preview with consistent margins
            return serviceOrderService.CreateServiceOrderReportAsPdf(order, 
                headerMargin: pdfConfig.ServiceReportHeaderMargin,
                footerMargin: pdfConfig.ServiceReportFooterMargin);
        }

        private byte[] GenerateDispatchReportWithConsistentDesign(ServiceOrderDispatch dispatch)
        {
            // Use same generation method as DispatchReportAttachmentProvider for consistency
            return serviceOrderService.CreateDispatchReportAsPdf(dispatch,
                headerMargin: pdfConfig.DispatchReportHeaderMargin,
                footerMargin: pdfConfig.DispatchReportFooterMargin);
        }

        protected override void Run(IJobExecutionContext context)
        {
            if (!appSettingsProvider.GetValue(ServicePlugin.Settings.Report.SaveServiceOrderReports) && !appSettingsProvider.GetValue(ServicePlugin.Settings.Report.SaveDispatchReports))
            {
                return;
            }

            var serviceOrderIdsWithoutReport = GetPendingServiceOrderDocuments().Cast<ServiceOrderHead>().ToList().Select(x => x.Id);
            foreach (var serviceOrderId in serviceOrderIdsWithoutReport)
            {
                if (receivedShutdownSignal)
                {
                    break;
                }

                try
                {
                    BeginRequest();
                    var order = serviceOrderHeadRepository.Get(serviceOrderId);
                    if (appSettingsProvider.GetValue(ServicePlugin.Settings.Report.SaveServiceOrderReports))
                    {
                        SaveServiceOrderReport(order);
                    }
                    serviceOrderHeadRepository.SaveOrUpdate(order);
                }
                catch (Exception exception)
                {
                    EndRequest();
                    BeginRequest();
                    var order = serviceOrderHeadRepository.Get(serviceOrderId);
                    order.ReportSavingError = exception.ToString();
                    serviceOrderHeadRepository.SaveOrUpdate(order);
                }
                finally
                {
                    EndRequest();
                }
            }

            var dispatchIdsWithoutReport = GetPendingDispatchDocuments().Cast<ServiceOrderDispatch>().ToList().Select(x => x.Id);
            foreach (var dispatchId in dispatchIdsWithoutReport)
            {
                if (receivedShutdownSignal)
                {
                    break;
                }

                try
                {
                    BeginRequest();
                    var dispatch = serviceOrderDispatchRepository.Get(dispatchId);
                    if (appSettingsProvider.GetValue(ServicePlugin.Settings.Report.SaveDispatchReports))
                    {
                        SaveDispatchReport(dispatch);
                    }
                    serviceOrderDispatchRepository.SaveOrUpdate(dispatch);
                }
                catch (Exception exception)
                {
                    EndRequest();
                    BeginRequest();
                    var dispatch = serviceOrderDispatchRepository.Get(dispatchId);
                    dispatch.ReportSavingError = exception.ToString();
                    serviceOrderDispatchRepository.SaveOrUpdate(dispatch);
                }
                finally
                {
                    EndRequest();
                }
            }
        }
    }
}
