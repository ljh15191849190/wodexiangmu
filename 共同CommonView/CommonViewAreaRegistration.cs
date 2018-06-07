using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.WebView.Areas.CommonView
{
    public class CommonViewAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "CommonView";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CommonView_default",
                "CommonView/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}

  