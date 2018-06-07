var keyValue = PageCommon.Request("keyValue");
console.log(keyValue)
var SupplierInfo = new Vue({
    el: '#app',
    data: {
        SupplierBasicInfo: '',
        SupplierData: {}
    },
    mounted: function () {
        var $this = this;
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: keyValue }
                , success: function (data) {
                    console.log(data)
                    SupplierInfo.SupplierData = data;
                    SupplierInfo.SupplierBasicInfo = PageCommon.SetUrl("SupplierBasicInfo");
                }
            });
        }
        $('.supplier_list').on('click', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var src = $(this).attr('data-src');
            $this.SupplierBasicInfo = PageCommon.SetUrl(src);
        })

    },
    methods: {

    }
});