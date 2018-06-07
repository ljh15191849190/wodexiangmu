//部门主键
var keyValue = PageCommon.Request("keyValue");
var currency_vue = new Vue({
    el: '#app',
    data: {
        B_Currency: {
            //币种名称
            Currency_Name: "",
            //汇率
            Exchange_Rate:"",
            //备注
            Remark: ""
        }
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    currency_vue.B_Currency = data;
                }
            });
        }
    },
    methods: {
        //保存币种画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { currency: currency_vue.B_Currency },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("CurrencyList");
                }
            });
        }     
    }
});
