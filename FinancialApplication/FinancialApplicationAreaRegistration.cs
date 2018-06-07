using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.WebView.Areas.FinancialApplication
{
    public class FinancialApplicationAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "FinancialApplication";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "FinancialApplication_default",
                "FinancialApplication/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
