var keyValue = PageCommon.Request("keyValue");
var searchData = {};
var OutPurchasePlanlead_vue = new Vue({
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
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "OrderFormDetailSeachDetailSeach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        P_Purchase_Plan_Detail: {
            //单号
            Purchase_Plan_Id: '',
            //制单日期
            Create_Time: '',
            //创建员工
            Create_Employee_Name: '',
            //型号
            Product_Name: '',
            //品牌
            Brand_Name: '',
            //产地
            Product_Area_Name: "",
            //油脂包装
            Package: '',
            //品名
            Product_Classify_Name: ''
        },
        //产地查询条件
        area: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
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
            if (Field_Name == "Purchase_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Purchase_Count") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name == "First_Consult_Price" || Field_Name == "Final_Price" || Field_Name == "Price") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }
            if (Field_Name === "Tax") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Price_Tax_Sum") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
        },
        //保存菜单画面数据
        Add: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderDetailleadList");
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
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000008", List_Id: "PurchaseOrderDetailleadList" });
        },
    }
});
