
using Crm.Library.Helper;

namespace Customer.Kagema.Services
{
    public class PdfGenerationConfig
    {
        private readonly IAppSettingsProvider appSettingsProvider;

        public PdfGenerationConfig(IAppSettingsProvider appSettingsProvider)
        {
            this.appSettingsProvider = appSettingsProvider;
        }

        public double ServiceReportHeaderMargin => appSettingsProvider.GetValue(MainPlugin.Settings.Report.HeaderMargin);
        public double ServiceReportFooterMargin => appSettingsProvider.GetValue(MainPlugin.Settings.Report.FooterMargin);
        public double DispatchReportHeaderMargin => 3.0; // Match DispatchReportAttachmentProvider
        public double DispatchReportFooterMargin => 2.0; // Match DispatchReportAttachmentProvider
        public double HeaderOnlyMargin => 1.0; // Match DispatchReportAttachmentProvider
        public double FooterOnlyMargin => 27.5; // Match DispatchReportAttachmentProvider
        
        // Ensure consistent page settings
        public string PageSize => "A4";
        public string Orientation => "Portrait";
        public double PageWidth => 210; // A4 width in mm
        public double PageHeight => 297; // A4 height in mm
    }
}
