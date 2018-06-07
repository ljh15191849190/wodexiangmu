   //用户主键
    var keyValue = PageCommon.Request("keyValue");
    var Register_vue = new Vue({
        el: '#app',
        data: function () {
            return {
                Tax_Proof_Number: '',
            }
        },
        mounted: function () {

        },
        methods: {
            //保存系统画面数据
            Save: function (SelectRow) {
                var vm = this;
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                SelectRow.Tax_Proof_Number = vm.Tax_Proof_Number;
                PageCommon.SubmitForm({
                    url: "RegisterTaxNumber",
                    param: { exceptionInvoiceApply: SelectRow },
                    success: function (data) {
                        //关闭iframe窗
                        PageCommon.ModalClose()
                        //刷新表格数据
                        PageCommon.CurrentWindow().PageCommon.RefreshTablePage("SaleInvoiceRegisterList");


                    }
                });
            },
            TemplateSelectionEmployee: function (data) {
                this.Employee_Id = data.id;
            },
            TemplateSelectionCarrier: function (data) {
                this.Carrier_Id = data.id;
            },
        }
    })