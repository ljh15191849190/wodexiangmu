
var vm = new Vue({
    el: '#apps',
    data: {
        //页签url
        tabs_url: "SystemParameterSetSearch",
        //页签id
        tabsid: "",
        //页签name
        tabsname: "",
        //设置数据
        SystemSet: []
    },
    mounted: function () {

    },
    methods: {
        //获取系统参数数据
        getSystemSet: function () {
            var vm = this;
            $.ajax({
                method: "POST",
                dateType: "JSON",
                url: "SystemParameterDetailSetSearch",
                data: { "Id": vm.tabsid },
                success: function (data) {
                    if (data) {
                        var obj = JSON.parse(data);
                        vm.SystemSet = obj;
                        vm.$nextTick(function () {
                            //共同验证控件属性
                            PageCommon.CheckPageInputBlur();
                            //获取页签name
                            $("#Set_Tabs li").each(function (i) {
                                if ($(this).hasClass("active_tabs")) {
                                    vm.tabsname = $(this).html();
                                }
                            })
                        })
                    }
                }
            })
        },
        //获取页签id
        tab: function (tabsid) {
            this.tabsid = tabsid;
            this.getSystemSet();
        },
        Save: function () {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "SaveParameterDetailSet",
                param: { "SystemParameterModelsJson": vm.SystemSet },
                success: function (data) {
                    PageCommon.Reload();
                }
            });
        }
    }
});
