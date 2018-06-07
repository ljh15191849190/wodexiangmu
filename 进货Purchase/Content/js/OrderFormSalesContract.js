var keyValue = PageCommon.Request("keyValue");
var searchData = {};
var Orderimport_vue = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        globalParameter: PageCommon.GlobalParameter(),
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "OrderApplyDetailSeach",
        //表格查询条件
        searchModel: {},
        M_Order_Apply: {
            //单号
            Order_Apply_Id: "",
            //日期
            Create_Time: "",
            //申请人
            Create_Employee_Name: "",
            //部门
            Create_Department_Name: "",
            //地区
            address: "",
            //型号
            Product_Name: "",
            //品牌
            Brand_Name: ""
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
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name == "Apply_Count" || Field_Name === "Distribute_Count" || Field_Name === "Cancel_Count" || Field_Name === "Predistribution_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }
            if (Field_Name === "Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Price_Tax_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
        },
        //保存菜单画面数据
        Add: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OrderApplyDetailList");
            console.log(JSON.stringify(selectRow));
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
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "OrderApplyDetailList" });
        },
    }
});