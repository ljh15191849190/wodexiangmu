var vm = new Vue({
    el: '#apps',
    data: {
        S_Menu: {
            //系统名称
            System_Id: "01"
        },
        //页签url
        tabs_url: "BusinessRuleSetSearch",
        //页签id
        tabsid: "",
        //页签name
        tabsname: "",
        //设置数据
        BusinessRuleSet: [],
        //系统下拉框排序
        systemOrder: [{
            Field_Name: "Show_Order",
            Orderby: "DESC"
        }],
        //系统下拉框显示字段
        systemResult: ["System_Id", "System_Name"],
        //系统下拉框查询条件
        systemWhere: [],
        isshow:false,
        isshowloading:false
    },
    mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        var t = $('#Set_Tabs').offset().top;
        $('#Set_Tabs').height($(window).height() - t - 20);
    },
    methods: {
        //获取设置数据
        getBusinessRuleSet: function () {
            var vm = this;
            $.ajax({
                method: "POST",
                dateType: "JSON",
                url: "BusinessRuleDetailSetSearch",
                data: { "Id": vm.tabsid },
                success: function (data) {
                    if (data) {
                        //vm.isshowloading = false;
                        var obj = JSON.parse(data);
                        vm.BusinessRuleSet = obj;
                        if (obj.length == 0) {
                            vm.isshow = true;
                            vm.tabsname = "";
                        } else {
                            vm.isshow = false;
                            vm.$nextTick(function () {
                                //共同验证控件属性
                                PageCommon.CheckPageInputBlur();
                                //获取页签name
                                $("#Set_Tabs li").each(function (i) {
                                    if ($(this).hasClass("active_tabs")) {
                                        vm.tabsname = $(this).html()
                                    }
                                })
                            })
                        }
                    }
                }
            })
        },
        //获取页签id
        tab: function (tabsid) {
            this.tabsid = tabsid;
            this.getBusinessRuleSet();
        },
        Save: function () {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "SaveBusinessRuleDetailSet",
                param: { "BusinessRuleModelsJson": vm.BusinessRuleSet },
                 success: function (data) {
                    PageCommon.Reload();
                }
            });
        }
    }
});
