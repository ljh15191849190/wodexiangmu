using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.WebView.Areas.SystemSet
{
    public class SystemSetAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "SystemSet";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "SystemSet_default",
                "SystemSet/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
