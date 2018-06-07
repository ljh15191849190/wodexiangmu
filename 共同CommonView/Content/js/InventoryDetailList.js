var RequestValue = PageCommon.Request();
if (RequestValue.seach_type) {
    var seach_type = RequestValue.seach_type
}
if (RequestValue.system_key) {

    var system_key = RequestValue.system_key
}
if (RequestValue.is_purchase) {
    var is_purchase = RequestValue.is_purchase
}
if (RequestValue.is_split) {
    var is_split = RequestValue.is_split
}
if (RequestValue.not_inventry_type) {
    var not_inventry_type = RequestValue.not_inventry_type
}
var vmInventoryDetail = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Product_Area_Id: '',
        //产地下拉框排序
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        Product_Name: '',
        Brand_Name: '',
        Batch_Id:'',
        Storeage_Name: '',
        Product_Classify_Name: '',
        Product_Area_Name: '',
        Package: '',
        Goods_Locate_Name: '',
        Storeage_Age: '',
        Inventory_Total_Count: '0',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "BusinessCommon"
        },
        tableUrl: "ProductSeach",
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: seach_type,
                Conditional_Value2: is_purchase,
                Conditional_Value3: is_split,
                Conditional_Value5: not_inventry_type
            }
        },
        //位数cookie
        globalParameter: {}
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

        });
    },
    methods: {
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Inventory_Total_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way),vm.globalParameter.Count_Decimal];
            }
        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Inventory_Total_Count") {
                if (value.charAt(0) == '0') {
                    return '0';
                } else {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
        },
        Search() {
            vmInventoryDetail.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmInventoryDetail.searchModel.Pagination_Info.Conditional_Value1 = seach_type;
            vmInventoryDetail.searchModel.Pagination_Info.Conditional_Value2 = is_purchase;
            vmInventoryDetail.searchModel.Pagination_Info.Conditional_Value3 = is_split;
            vmInventoryDetail.searchModel.Pagination_Info.Conditional_Value5 = not_inventry_type;
            if (vmInventoryDetail.Inventory_Total_Count == '0') {
                var postdata = {};
                postdata.Field_Name = "B_Product.Inventory_Total_Count";
                postdata.Query_Type = "02";
                postdata.Expression = "08";
                vmInventoryDetail.searchModel.Where_Parameter_List.push(postdata);
            }
        },
        mClear() {
            this.Product_Area_Id = '';
            $('#Product_Area_Id').val(null).trigger('change');
            productrange.first = '';
            productrange.second = '';
            this.Product_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            this.Product_Classify_Name = '';
            this.Product_Area_Name = '';
            this.Package = '';
            this.Batch_Id = '';
            this.Goods_Locate_Name = '';
            this.Storeage_Age = '';
        }
    }
});
