
    var keyValue = PageCommon.Request("keyValue");
    
    var CustomerInfo = new Vue({
        el: '#app',
        data: {
            CustomerBasic: '',
            CustomerData: {}
        },
        mounted: function () {
            var $this = this;
            if (keyValue) {
                PageCommon.GetFormData({
                    url: "DetailSeach",
                    param: { keyValue: keyValue }
                    , success: function (data) {
                        CustomerInfo.CustomerData = data;
                        CustomerInfo.CustomerBasic = PageCommon.SetUrl("CustomerBasic");
                    }
                });
            }
            $('.supplier_list').on('click', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var src = $(this).attr('data-src');
                $this.CustomerBasic = PageCommon.SetUrl(src);
            })

        },
        methods: {

        }
    });
