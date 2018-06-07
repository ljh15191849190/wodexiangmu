//部门主键
var keyValue = PageCommon.Request("keyValue");
var taxRate_vue = new Vue({
    el: '#app',
    data: {
        B_Tax_Rate: {
            //发票类型
            Invoice_Type: "",
            //税率
            Tax_Rate: "",
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
                    taxRate_vue.B_Tax_Rate = data;
                }
            });
        }
    },
    methods: {
        //保存部门画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { taxRate: taxRate_vue.B_Tax_Rate },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("TaxRateList");
                }
            });
        }     
    }
});
