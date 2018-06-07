
var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key
}
var vmBrand = new Vue({
    el: '#app',
    data: {
        //品牌
        Brand_Name: '',
        Price_Grade:'',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000010",
            System_Key: "BusinessCommon"
        },
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key
            }
        },
        //表格查询url
        tableUrl: 'BrandSeach',

    },
    methods: {
        //查询
        Search: function (obj) {
            vmBrand.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
        },
        mClear: function () {
            this.Brand_Name = '';
        }
    }
})

