var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key;
}
var vmCarrier = new Vue({
    el: '#app',
    data: {
        Carrier_Name: '',
        Carrier_Short_Name: '',
        Carrier_Address: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000013",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "CarrierSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key
            }
        }
    },
    methods: {
        //查询
        Search: function (obj) {
            vmCarrier.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
        },
        mClear: function () {
            this.Carrier_Name = '';
            this.Carrier_Short_Name = '';
            this.Carrier_Address = '';
        }
    }
});
