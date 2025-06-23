
using System;
using System.Linq;
using Crm.Service.Model;
using log4net;

namespace Customer.Kagema.Services
{
    public class ReportCompletenessValidator
    {
        private readonly ILog logger;

        public ReportCompletenessValidator(ILog logger)
        {
            this.logger = logger;
        }

        public virtual bool ValidateServiceOrderCompleteness(ServiceOrderHead order)
        {
            var validationErrors = new List<string>();

            // Essential order data validation
            if (string.IsNullOrEmpty(order.OrderNo))
                validationErrors.Add("OrderNo is missing");

            if (order.CustomerContact == null)
                validationErrors.Add("CustomerContact is missing");

            if (order.Dispatches == null || !order.Dispatches.Any())
                validationErrors.Add("No dispatches found");

            // Validate each dispatch has required data
            foreach (var dispatch in order.Dispatches ?? new List<ServiceOrderDispatch>())
            {
                if (dispatch.DispatchedUser == null)
                    validationErrors.Add($"DispatchedUser missing for dispatch {dispatch.Id}");

                if (string.IsNullOrEmpty(dispatch.StatusKey))
                    validationErrors.Add($"StatusKey missing for dispatch {dispatch.Id}");
            }

            // Check for related data that should be loaded
            if (order.ServiceOrderMaterials == null)
                validationErrors.Add("ServiceOrderMaterials collection is null");

            if (order.ServiceOrderTimePostings == null)
                validationErrors.Add("ServiceOrderTimePostings collection is null");

            if (validationErrors.Any())
            {
                logger.Error($"Service Order {order.OrderNo} validation failed: {string.Join("; ", validationErrors)}");
                return false;
            }

            logger.Info($"Service Order {order.OrderNo} validation passed");
            return true;
        }

        public virtual bool ValidateDispatchCompleteness(ServiceOrderDispatch dispatch)
        {
            var validationErrors = new List<string>();

            if (dispatch.OrderHead == null)
                validationErrors.Add("OrderHead is missing");

            if (dispatch.DispatchedUser == null)
                validationErrors.Add("DispatchedUser is missing");

            if (string.IsNullOrEmpty(dispatch.StatusKey))
                validationErrors.Add("StatusKey is missing");

            if (dispatch.OrderHead?.CustomerContact == null)
                validationErrors.Add("CustomerContact is missing from OrderHead");

            if (validationErrors.Any())
            {
                logger.Error($"Dispatch {dispatch.Id} validation failed: {string.Join("; ", validationErrors)}");
                return false;
            }

            logger.Info($"Dispatch {dispatch.Id} validation passed");
            return true;
        }

        public virtual bool ValidateGeneratedFileContent(byte[] fileContent, string fileName)
        {
            if (fileContent == null || fileContent.Length == 0)
            {
                logger.Error($"Generated file {fileName} is empty or null");
                return false;
            }

            // Basic PDF validation - check for PDF header
            if (fileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
            {
                var pdfHeader = System.Text.Encoding.ASCII.GetString(fileContent.Take(4).ToArray());
                if (pdfHeader != "%PDF")
                {
                    logger.Error($"Generated PDF file {fileName} does not have valid PDF header");
                    return false;
                }
            }

            // Check minimum file size (too small likely indicates incomplete generation)
            if (fileContent.Length < 1024) // Less than 1KB is suspicious for a report
            {
                logger.Warn($"Generated file {fileName} is very small ({fileContent.Length} bytes) - possible incomplete generation");
                return false;
            }

            logger.Info($"Generated file {fileName} validation passed ({fileContent.Length} bytes)");
            return true;
        }
    }
}
