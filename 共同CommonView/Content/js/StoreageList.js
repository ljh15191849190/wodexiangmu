var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key
}
var vmStoreageSearch = new Vue({
    el: '#app',
    data: {
        Name: '',
        Cellphone: '',
        Office_Telephone: '',
        //仓库名称
        Storeage_Name: '',
        //归属部门
        Department_Name: '',
        //仓库地址
        Address: '',
        //仓库编码
        Storeage_Code: '',
        Create_Time: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "StoreageSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key
            }
        },
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
            vmStoreageSearch.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
        },
        //清除
        mClear: function () {
            this.Department_Name = '';
            this.Storeage_Name = '';
            this.Storeage_Code = '';
            this.Address = '';
            this.Create_Time = '';
            this.Name = '';
            this.Cellphone = '';
            this.Office_Telephone = '';
        }
    }
});
