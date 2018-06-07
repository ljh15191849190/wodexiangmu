
var keyValue = PageCommon.Request("keyValue");
var searchData = {};
var PaymentImport_vue = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        globalParameter: PageCommon.GlobalParameter(),
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "FinancialApplication"
        },
        //表格查询url
        tableUrl: "PurchaseDetailSeach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        //表格查询条件
        P_Purchase: {
            //进货单号
            Purchase_Id: "",
            //进货日期
            Create_Time: "",
            //供应商
            Supplier_Name: "",
            //制单人
            Create_Employee_Name: "",
            //部门
            Create_Department_Name: "",
            //型号
            Product_Name: "",
            //品牌
            Brand_Name: "",
            //油脂包装
            Package: "",
            //产地
            Product_Area_Id: "",
            //供应商合同号
            Supplier_Contract_Number: "",
            //提货单号
            Delivery_Bill_Number: "",
            //品名
            Product_Classify_Name: ''
        },
        //作废原因
        Delete_Reason: '',
        //发票类型查询条件
        invoice: {
            Menuresult: ["Tax_Rate_Id", "Invoice_Type"],
            filedSearch: ["Tax_Rate_Id", "Invoice_Type"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Tax_Rate_Id", "Invoice_Type"]
        },
        //产地查询条件
        area: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
        //币种查询条件
        currency: {
            Menuresult: ["Currency_Id", "Currency_Name"],
            filedSearch: ["Currency_Id", "Currency_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Currency_Id", "Currency_Name"]
        }
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    console.log(data)
                }
            });
        }
    },
    methods: {
        //父表格合计数字格式化
        pagetotalback: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name == "This_Pay_Count" || Field_Name == "Entered_Count" || Field_Name == "Return_Goods_Count") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), that.globalParameter.Count_Decimal];
            }
            if (Field_Name == "Total_Pay_Amount" || Field_Name == "Completion_Payment_Amount" || Field_Name == "This_Pay_Amount") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Sum_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Price_Tax_Sum") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
                if (Field_Name === "Total_Pay_Amount" || Field_Name === "Completion_Payment_Amount" || Field_Name === "This_Pay_Amount") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
                if (Field_Name == "This_Pay_Count" || Field_Name == "Entered_Count" || Field_Name == "Return_Goods_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
        },
        //保存菜单画面数据
        Add: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseDetailList");
            //画面选择一条数据
            if (!selectRow.length > 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalClose()
            return selectRow;
        },
        TemplateSelection: function (data) {
            this.Product_Id = data.id;
            this.Product_Name = data.Product_Name || data.text;

        },
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000008", List_Id: "PurchaseDetailList" });
        },
    }
});
