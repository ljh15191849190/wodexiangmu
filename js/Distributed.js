
    var RequestValue = PageCommon.Request();
//销售类型
if (RequestValue.Sale_Bill_Type) {
    var Sale_Bill_Type = RequestValue.Sale_Bill_Type
}
//客户id
if (RequestValue.Customer_Id) {
    var Customer_Id = RequestValue.Customer_Id
}
var vmDistributedResultOrder = new Vue({
    el: '#app',
    data: {
        //型号规格
        Product_Id: '',
        productrange: {
            first: "",
            second: ""
        },
        //产品分类名称
        Product_Classify_Id:'',
        //品牌
        Brand_Id:'',
        //产地名称
        Product_Area_Id:'',
        //油脂包装
        Package:'',
            
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
        tableUrl: "DistributedSeach",
        //表格查询条件
        searchModel: {
            Where_Parameter_List: [{
                Field_Name: "B_Product.Object_Id",
                Query_Type: "01",
                Expression: "02",
                Condition_Value1: RequestValue.Customer_Id,
                Contorl_Id: "Customer_Id"
            }]
        },
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

    },
    methods: {
        //数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;
            //数量
            if (Field_Name === "Sale_Sum_Count" || Field_Name === "Distribute_Count" || Field_Name === "Distribute_Handle_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            //税额
            if (Field_Name === "Tax") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            //价税合计
            if (Field_Name === "Price_Tax_Sum" || Field_Name === "Answer_Price") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            //数量
            if (Field_Name === "Sale_Sum_Count" || Field_Name === "Distribute_Count" || Field_Name === "Distribute_Handle_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }

            //价税合计
            if (Field_Name === "Price_Tax_Sum" || Field_Name === "Answer_Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
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
            var searchData = $("#searchForm").GetSearchModel({ Menu_Id: "M000006", List_Id: "DistributedResultDetail" });
            searchData.Where_Parameter_List.push({ Field_Name: "B_Product.Customer_Id", Query_Type: "01", Expression: "02", Condition_Value1: RequestValue.Customer_Id, Contorl_Id: "Customer_Id" });
            vmDistributedResultOrder.searchModel = searchData;
        },
        //清除
        mClear: function () {
            this.productrange.first = '';
            this.productrange.second = '';
            this.Product_Classify_Id = '';
            this.Brand_Id = '';
            this.Package = '';
            this.Product_Area_Id = '';
            $('#Product_Area_Id').val(null).trigger('change');
            PageCommon.TableDefaultSort("DistributedResultDetail");
        }
    }
});
