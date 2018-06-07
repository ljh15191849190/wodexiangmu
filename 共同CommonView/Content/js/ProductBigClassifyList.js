var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key
}
var vmProductBigClassify = new Vue({
    el: '#app',
    data: {
        //产品分类名称
        Product_Classify_Name: '',
        //产品简称
        Product_Short_Name: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000009",
            System_Key: "BusinessCommon"
        },
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key
            }
        },
        //表格查询url
        tableUrl: 'ProductBigClassifySeach',
    },
    methods: {
        //查询
        Search: function (obj) {
            vmProductBigClassify.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
        },
        mClear: function () {
            this.Product_Classify_Name = '';
            this.Product_Short_Name = '';
        }
    }
})

