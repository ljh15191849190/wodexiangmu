//用户主键
var keyValue = PageCommon.Request("keyValue");
var Register_vue = new Vue({
    el: '#app',
    data: function () {
        return {
            Carrier_Id: '',
            Send_Employee_Id: '',
            Send_Express_Bill_Number: '',
            Send_Invoice_Date: '',
            EmployeefiledResult: ["Employee_Id", "Name"],
            EmployeefiledSearch: ["Employee_Id", "Name"],
            EmployeemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            EmployeeinputField: ["Employee_Id", "Name"],
            CarrierfiledResult: ["Carrier_Id", "Carrier_Name"],
            CarrierfiledSearch: ["Carrier_Id", "Carrier_Name"],
            CarriermainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            CarrierinputField: ["Carrier_Id", "Carrier_Name"],
        }
    },
    //computed: {
    //     Invoice_Date: function () {
    //         return moment(new Date().getTime()).format("YYYY-MM-DD");
    //     }
    // },
    mounted: function () {

    },
    methods: {
        //保存系统画面数据
        Save: function (selectRow) {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            selectRow.Carrier_Id = vm.Carrier_Id;
            selectRow.Send_Employee_Id = vm.Send_Employee_Id;
            selectRow.Send_Express_Bill_Number = vm.Send_Express_Bill_Number;
            selectRow.Send_Invoice_Date = vm.Send_Invoice_Date;
            PageCommon.SubmitForm({
                url: "SaveSendInvoice",
                param: { saleInvoice: selectRow },
                success: function (data) {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("SaleInvoiceRegisterList");
                }
            });
        }
    }
})
