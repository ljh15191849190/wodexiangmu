var keyValue = PageCommon.Request("keyValue");
var searchData = {};
var LendOrderLead_vue = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        globalParameter: PageCommon.GlobalParameter(),
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000023",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "InventoryDetailSeach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        P_Inventory_Distribute: {
            //分配单号
            Inventory_Distribute_Id: "",
            //定货日期
            Create_Time: "",
            //审核状态
            Approval_Status: "",
            //创建员工
            Create_Employee_Name: "",
            //部门
            Department_Name: "",
            //型号
            Product_Name: "",
            //品牌
            Brand_Name: "",
            //油脂包装
            Package: "",
            //品名
            Product_Classify_Name: '',
            //产地
            Product_Area_Name: ""
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
        //表格合计数字格式化
        pagetotalback: function (Field_Name, a, b) {
            if (Field_Name === "Distribute_Count" || Field_Name === "Distribute_Handle_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
        },
        //子表格行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Distribute_Count" || Field_Name === "Distribute_Handle_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
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
            if (Field_Name === "Weighting_Average_Cost") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
        },
        //保存菜单画面数据
        Add: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("InventoryDetailList");
            //画面选择一条数据
            if (!selectRow.length > 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalClose()
            return selectRow;
        },
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000023", List_Id: "InventoryDetailList" });
        },
    }
});