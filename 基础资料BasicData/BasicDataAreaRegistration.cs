using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.WebView.Areas.BasicData
{
    public class BasicDataAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "BasicData";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "BasicData_default",
                "BasicData/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
