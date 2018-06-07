var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key;
}
if (RequestValue.seach_type) {
    var seach_type = RequestValue.seach_type;
}
if (RequestValue.invoice_status) {
    var invoice_status = RequestValue.invoice_status;
}
var vmSaleInvoice = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Invoice_Date: "",
        Create_Department_Name: "",
        Create_Employee_Name: "",
        Task_Employee_Name: '',
        Task_Department_Name: '',
        Invoice_Number: "",
        Invoice_Status: "",
        Customer_Name: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000011",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "InvoiceSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: seach_type,
                Conditional_Value2: invoice_status
            }
        },
        childSearchModel: [
            {
                Field_Name: ["F_Sale_Invoice_Detail.Sale_Invoice_Id"],
                Parent_Key: ["Sale_Invoice_Id"],
                Detail_Seach: 'InvoiceDetailSeach',
                Child_List: 'SaleInvoiceDetailList',
                Default_Child: "true",
                System_Key: system_key,
            }
        ],
        //位数cookie
        globalParameter: {}
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

        });
        $(".replyType").on('click', '.title1', function () {
            $(this).parent().find(".shrink").slideToggle();
            $(this).parent().find(".down_tab").toggleClass("rotate");
            $(this).toggleClass("boder");
        })
        $(".replyType").on('click', '.down_tab', function () {
            $(this).parent().find(".shrink").slideToggle();
            $(this).toggleClass("rotate");
            $(this).parent().find(".title1").toggleClass("boder");
        })
    },
    methods: {
        //父表格合计处理
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Invoice_Price_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
            }
            if (Field_Name === "Invoice_Price_Tax_Sum_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "Invoice_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
            }
        },
        //父表格表格数据初始化处理
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            //发票单价总额
            if (Field_Name === "Invoice_Price_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //发票价税合计总额
            if (Field_Name === "Invoice_Price_Tax_Sum_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //发票总额
            if (Field_Name === "Invoice_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //子表格合计处理
        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Count" || Field_Name === "Red_Flush_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Tax_Sum") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "Price_Tax_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
            }
            if (Field_Name === "Price_Sum") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
            }
        },
        //子表格表格数据初始化处理
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            //数量//红冲数量
            if (Field_Name === "Count" || Field_Name === "Red_Flush_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //价税合计
            if (Field_Name === "Price_Tax_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //价税总额
            if (Field_Name === "Price_Tax_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //单价
            if (Field_Name === "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //单价总额
            if (Field_Name === "Price_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Tax_Rate") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, 6, '1');
            }
        },
        //查询部门名称
        Search: function () {
            vmSaleInvoice.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmSaleInvoice.searchModel.Pagination_Info.Conditional_Value1 = seach_type;
            vmSaleInvoice.searchModel.Pagination_Info.Conditional_Value2 = invoice_status;
        },
        mClear: function () {
            this.productrange.first = '';
            this.productrange.second = '';
            this.Create_Department_Name = '';
            this.Create_Employee_Name = '';
            this.Task_Employee_Name = '';
            this.Task_Department_Name = '';
            this.Customer_Name = '';
            this.Invoice_Number = '';
            this.Invoice_Status = '';
            this.Invoice_Date = '';
            $('#Invoice_Status').val(null).trigger('change');
        },
    }
});
