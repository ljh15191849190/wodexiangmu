
var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key;
}
if (RequestValue.accept_bill_status) {
    var accept_bill_status = RequestValue.accept_bill_status;
}
var objectId = '';
if (RequestValue.objectId) {
    objectId = RequestValue.objectId;
}
var vmAcceptBill = new Vue({
    el: '#app',
    data: {
        object_type: objectId == '' ? true : false,
        customer: objectId == '' ? true : false,
        supplier: false,
        globalParameter: PageCommon.GlobalParameter(),
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000012",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "AcceptBillSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: accept_bill_status,
                Conditional_Value2: objectId,
            }
        },
        //表格查询条件
        FA_Accept_Bill: {
            //类型
            Object_Type: '01',
            //客户
            Customer_Name: '',
            //供应商
            Supplier_Name: '',
            //承兑归属任务人
            Name2: '',
            //任务人
            Name: '',
            //部门
            Department_Name: "",
            //承兑汇票状态
            Accept_Bill_Status: "",
            //承兑汇票号码
            Accept_Bill_Number: "",
        },
    },
    mounted: function () {
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //表格合计数字格式化
        pagetotalback: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name == "Accept_Bill_Account" || Field_Name == "Customer_Undertake_Charge" || Field_Name == "Company_Undertake_Charge" || Field_Name == "Discount_Charge") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Price_Decimal, that.globalParameter.Money_Digital_Cut_Way),that.globalParameter.Other_Money_Decimal];
            } 
        },
        //表格行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            //货款总额 运费余额 定金余额
            if (Field_Name == "Accept_Bill_Account" || Field_Name == "Customer_Undertake_Charge" || Field_Name == "Company_Undertake_Charge" || Field_Name == "Discount_Charge") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //查询
        Search: function () {
            vmAcceptBill.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmAcceptBill.searchModel.Pagination_Info.Conditional_Value1 = accept_bill_status;
            vmAcceptBill.searchModel.Pagination_Info.Conditional_Value2 = objectId;
        },
        template_selection: function (data) {
            if (data.id == '01') {
                this.customer = true;
                this.supplier = false;
            } else {
                this.customer = false;
                this.supplier = true;
            }
        },
        //清除
        mClear: function () {
            this.FA_Accept_Bill.Accept_Bill_Number = "";
            this.FA_Accept_Bill.Customer_Name = "";
            this.FA_Accept_Bill.Supplier_Name = "";
            this.FA_Accept_Bill.Name2 = "";
            this.FA_Accept_Bill.Name = "";
            this.FA_Accept_Bill.Department_Name = "";
            $('#Object_Type').val(null).trigger('change');
            $('#Accept_Bill_Status').val(null).trigger('change');
        },
    }
});
