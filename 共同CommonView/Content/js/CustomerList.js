var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key
}
//客户状态
if (RequestValue.customer_status) {
    var customer_status = RequestValue.customer_status
}
//是否为父客户组件
if (RequestValue.is_parent) {
    var is_parent = RequestValue.is_parent
}
var vmCustomerSearch = new Vue({
    el: '#app',
    data: {
        //客户名称
        Customer_Name: '',
        //任务人
        Employee_Id: '',
        //联系人
        Name: '',
        //行业
        Industry_Id: '',
        //客户地址
        Customer_Address: '',
        //所属行业下拉框查询条件
        IndustryWhere: [],
        //所属行业下拉框排序
        IndustryOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //所属行业下拉框显示字段
        IndustryResult: ["Industry_Id", "Industry_Name"],
        //主营产品
        Major_Manage_Product: '',
        //客户状态
        Customer_Status: '',
        //审核状态
        Approval_Status: '',
        //客户类型
        Customer_Type: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000004",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "CustomerSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: customer_status,
                Conditional_Value2: is_parent
            }
        },
        Employeeresult: ["Employee_Id", "Name"],
        EmployeFiledSearch: ["Employee_Id", "Name"],
        EmployeInputField: ["Employee_Id", "Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        globalParameter: PageCommon.GlobalParameter()
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
            if (Field_Name == "Goods_Pay_Sum" || Field_Name == "Freight_Balance" || Field_Name == "Earnest_Balance" || Field_Name == "Other") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Price_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Money_Decimal];
            }
        },
        //表格行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            //汇票金额 客户承担费用 公司预估承担费用 贴息费用
            if (Field_Name == "Goods_Pay_Sum" || Field_Name == "Freight_Balance" || Field_Name == "Earnest_Balance" || Field_Name == "Other") {
                if (!value) {
                    value = 0;
                } 
                return PageCommon.NumberDispose(value, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
        },
        Search: function (obj) {
            vmCustomerSearch.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmCustomerSearch.searchModel.Pagination_Info.Conditional_Value1 = customer_status;
            vmCustomerSearch.searchModel.Pagination_Info.Conditional_Value2 = is_parent;
        },
        //清除
        mClear: function () {
            this.Customer_Name = '';
            this.Customer_Address = '';
            this.Employee_Id = '';
            $('#Employee_Id').val(null).trigger('change');
            this.Name = '';
            this.Industry_Id = '';
            this.Major_Manage_Product = '';
            this.Customer_Status = '';
            $('#Customer_Status').val(null).trigger('change');
            this.Customer_Type = '';
            $('#Customer_Type').val(null).trigger('change');
        }
    }
});
