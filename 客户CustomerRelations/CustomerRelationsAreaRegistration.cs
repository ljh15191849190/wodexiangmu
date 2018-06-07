using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.WebView.Areas.CustomerRelations
{
    public class CustomerRelationsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "CustomerRelations";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CustomerRelations_default",
                "CustomerRelations/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
