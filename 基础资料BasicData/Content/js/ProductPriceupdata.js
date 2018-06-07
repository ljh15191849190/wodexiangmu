//用户主键
var keyValue = PageCommon.Request("keyValue");
var Priceupdata_vue = new Vue({
    el: '#app',
    data: function () {
        return {
            UpdataValue: true,
            ModifyType: true,
            PriceDifference: false,
            //下拉框
            mupdata: "",
            updatavalue: "",
            Price_Difference: "",

            valueModify: "",
            floatRatio: ""
        }

    },

    mounted: function () {
        $("#typeSpecification").select2({
            placeholder: "请选择",
            allowClear: true,//删除x图标Production_Month
            minimumResultsForSearch: Infinity,
            templateSelection: function formatRepoSelection(repo) {
                if ($(repo.element).attr("value") == "Price_Value1") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = true;
                    return "一级固定价";
                }
                if ($(repo.element).attr("value") == "Price_Value2") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = true;
                    return "二级固定价";
                }
                if ($(repo.element).attr("value") == "Price_Value3") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = true;
                    return "三级固定价";
                }
                if ($(repo.element).attr("value") == "Price_Value4") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = true;
                    return "四级固定价";
                }
                if ($(repo.element).attr("value") == "Price_Value5") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = true;
                    return "五级固定价";
                }
                if ($(repo.element).attr("value") == "Coefficient_Value1") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = false;
                    return "一级价系数";
                }
                if ($(repo.element).attr("value") == "Coefficient_Value2") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = false;
                    return "二级价系数";
                }
                if ($(repo.element).attr("value") == "Coefficient_Value3") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = false;
                    return "三级价系数";
                }
                if ($(repo.element).attr("value") == "Coefficient_Value4") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = false;
                    return "四级价系数";
                }
                if ($(repo.element).attr("value") == "Coefficient_Value5") {
                    Priceupdata_vue.UpdataValue = true;
                    Priceupdata_vue.PriceDifference = false;
                    Priceupdata_vue.ModifyType = false;
                    return "五级价系数";
                }
                if ($(repo.element).attr("value") == "Price_Difference") {
                    Priceupdata_vue.PriceDifference = true;
                    Priceupdata_vue.UpdataValue = false;
                    Priceupdata_vue.ModifyType = false;
                    return "系数标记";
                }
                var ee = $(repo.element).attr("value");
                return ee;

            }
        });
        $("#typeSpecification1").select2({
            placeholder: "请选择",
            allowClear: true,//删除x图标Production_Month
            minimumResultsForSearch: Infinity,
            templateSelection: function formatRepoSelection(repo) {
                if ($(repo.element).attr("value") == "valueModify") {
                    Priceupdata_vue.valueModify = "valueModify";
                    return "数值修正";
                }
                if ($(repo.element).attr("value") == "floatRatio") {
                    Priceupdata_vue.floatRatio = "floatRatio";
                    return "浮动比例";
                }
                var ee = $(repo.element).attr("value");
                return ee;

            }
        });
        $("#typeSpecification").on("change", function () {
            Priceupdata_vue.mupdata = $(this).val();

        });
    },
    methods: {
        //保存系统画面数据
        Save: function () {
            var vm = this;
            ////数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var e = PageCommon.CurrentWindow().vmProduct.selectRow;
            $.each(e, function (index, item) {
                if (vm.mupdata == "Price_Difference") {
                    item[vm.mupdata] = vm.Price_Difference;
                } else if (vm.mupdata == "Coefficient_Value1" || vm.mupdata == "Coefficient_Value2" || vm.mupdata == "Coefficient_Value3" || vm.mupdata == "Coefficient_Value4" || vm.mupdata == "Coefficient_Value5") {
                    item[vm.mupdata] = vm.updatavalue;
                } else {
                    if (Priceupdata_vue.valueModify) {
                        item[vm.mupdata] = parseFloat(item[vm.mupdata]) + parseFloat(vm.updatavalue);

                    } else {
                        item[vm.mupdata] = parseFloat(item[vm.mupdata]) * (parseFloat(vm.updatavalue));
                    }

                }
            });
            PageCommon.SubmitForm({
                url: "BatchEditProductPrice",
                param: { objList: e },
                success: function (data) {
                    console.log(data)
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("ProductList");


                }
            });
        },

    }
})