//用户主键
var keyValue = PageCommon.Request("keyValue");
var Register_vue = new Vue({
    el: '#app',
    data: function () {
        return {
            Exception_Reason: ""
        }

    },
    methods: {
        //保存系统画面数据
        Save: function (selectRow) {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            selectRow.Exception_Reason = vm.Exception_Reason;
            selectRow.Is_Exception = 0;
            PageCommon.SubmitForm({
                url: "ConvertNormalOrException",
                param: { purchaseInvoice: selectRow },
                success: function (data) {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("PurchaseInvoiceList");


                }
            });

        },

    }
})
