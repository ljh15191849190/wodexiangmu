
    var RequestValue = PageCommon.Request();
//销售类型
if (RequestValue.Sale_Bill_Type) {
    var Sale_Bill_Type = RequestValue.Sale_Bill_Type
}
//客户id
if (RequestValue.Customer_Id) {
    var Customer_Id = RequestValue.Customer_Id
}
var vmSaleOrderDetail = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        //型号规格
        Product_Id: '',
        //油脂包装
        Package:'',
        //品牌
        Brand_Name: '',
        //产品分类
        Product_Classify_Id: '',
        //产地名称
        Product_Area_Id: '',
        //仓库
        Storeage_Id: '',
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        Arearesult: ["Product_Area_Id", "Product_Area_Name"],
        AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
        AreaInputField: ["Product_Area_Id", "Product_Area_Name"],


        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000006",
            System_Key: "Sale"
        },
        //表格查询url
        tableUrl: "SaleDetailSeach",
        //表格查询条件
        searchModel: {
            Where_Parameter_List: [{
                Field_Name: "M_Sale_Bill.Customer_Id",
                Query_Type: "01",
                Expression: "02",
                Contorl_Id: "Customer_Id",
                Condition_Value1: RequestValue.CustomerId
            }],

        },

        //位数cookie
        globalParameter: {},

        //行数据
        selectRow: []
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

    },
    methods: {
        //数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Sale_Count" || Field_Name === "Allow_Return_Goods_Count" || Field_Name === "Return_Goods_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

            if (Field_Name === "Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            //YJ
            if (Field_Name === "Commission") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
            }
            //税额
            if (Field_Name === "Tax") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            //销售数量 退货数量
            if (Field_Name === "Sale_Count" || Field_Name === "Allow_Return_Goods_Count" || Field_Name === "Return_Goods_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }

            //价税合计
            if (Field_Name === "Price_Tax_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //YJ率
            if (Field_Name === "Commission_Rate") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.YJ_Rate_Decimal, this.globalParameter.TY_Digital_Cut_Way);
            }
            //库存利润率 期货利润率
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }
            
            //YJ
            if (Field_Name === "Commission") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
            //单价
            if (Field_Name === "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },

        //查询
        Search: function () {
            vmSaleOrderDetail.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000006", List_Id: "SaleOrderSearch" });
        },
        SelectRow: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleOrderSearch");
            return selectRow;
        },
        //清除
        mClear: function () {
            this.productrange.first = '';
            this.productrange.second = '';
            this.Product_Classify_Id = '';
            this.Brand_Name = '';
            this.Package = '';
            this.Storeage_Id = '';
            this.Product_Area_Id = '';
            $('#Product_Id').val(null).trigger('change');
            $('#Product_Classify_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
                
        }
    }
});
