var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key
}
//客户状态
if (RequestValue.goods_locate_type) {
    var goods_locate_type = RequestValue.goods_locate_type
}
//是否为父客户组件
if (RequestValue.storeage_id) {
    var storeage_id = RequestValue.storeage_id
}
var vmCustomerSearch = new Vue({
    el: '#app',
    data: {
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000016",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "GoodsLocateSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: storeage_id,
                Conditional_Value2: goods_locate_type
            }
        },
        //货位名称
        Goods_Locate_Name: "",
        Create_Time: "",
        //货位类型
        Goods_Locate_Type: "",
        //仓库Name
        Storeage_Name: "",
        //仓库区域id
        Storeage_Area_Id: "",
        //仓库储区id
        Storeage_Region_Id: "",
        //货位类型
        GoodsLocateTypeDictionaryKey: "GOODS_LOCATE_TYPE",
        //仓库区域ID下拉框排序
        StoreageAreaOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库区域ID下拉框显示字段
        StoreageAreaResult: ["Storeage_Area_Id", "Storeage_Area_Name"],
        //仓库区域ID下拉框查询条件
        StoreageAreaWhere: [],

        //仓库储区ID下拉框排序
        StoreageRegionOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库储区ID下拉框显示字段
        StoreageRegionResult: ["Storeage_Region_Id", "Storeage_Region_Name"],
        //仓库储区ID下拉框查询条件
        StoreageRegionWhere: [],
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
        Search: function (obj) {
            vmCustomerSearch.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmCustomerSearch.searchModel.Pagination_Info.Conditional_Value1 = storeage_id;
            vmCustomerSearch.searchModel.Pagination_Info.Conditional_Value2 = goods_locate_type;
        },
        //清除
        mClear: function () {
            this.Goods_Locate_Name = '';
            $('#Goods_Locate_Type').val(null).trigger('change');
            this.Storeage_Id = '';
            $('#Storeage_Area_Id').val(null).trigger('change');
            this.Storeage_Area_Id = '';
            $('#Storeage_Area_Id').val(null).trigger('change');
            this.Storeage_Region_Id = '';
            $('#Storeage_Region_Id').val(null).trigger('change');
            this.Create_Time = "";
        }
    }
});
