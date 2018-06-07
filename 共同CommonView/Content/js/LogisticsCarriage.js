var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key;
}
if (RequestValue.storeage_id) {
    var storeage_id = RequestValue.storeage_id;
}
if (RequestValue.customer_id) {
    var customer_id = RequestValue.customer_id;
}
if (RequestValue.detail_number) {
    var detail_number = RequestValue.detail_number;
}
if (RequestValue.total_weight) {
    var total_weight = RequestValue.total_weight;
}
var vmLogisticsCarriage = new Vue({
    el: '#app',
    data: {
        Carrier_Name: '',
        cost: {
            first: "",
            second: ""
        },
        globalParameter: PageCommon.GlobalParameter(),
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000014",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "LogisticsCarriageSeach",
        //表格查询条件
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                //库房id
                Conditional_Value1: storeage_id,
                //客户id
                Conditional_Value2: customer_id,
                //收货人明细号
                Conditional_Value3: detail_number,
                //总重量
                Conditional_Value4: total_weight,
            }
        }
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
        //表格行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            if (Field_Name == "Total_Weight") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Weight_Decimal, that.globalParameter.Weight_Digital_Cut_Way);
            }
            if (Field_Name == "Logistics_Carriage") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //查询
        Search: function () {
            vmLogisticsCarriage.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmLogisticsCarriage.searchModel.Pagination_Info.Conditional_Value1 = storeage_id;
            vmLogisticsCarriage.searchModel.Pagination_Info.Conditional_Value2 = customer_id;
            vmLogisticsCarriage.searchModel.Pagination_Info.Conditional_Value3 = detail_number;
            vmLogisticsCarriage.searchModel.Pagination_Info.Conditional_Value4 = total_weight;
        },
        //清除
        mClear: function () {
            this.Carrier_Name = "";
            this.cost.first = '';
            this.cost.second = '';
        }
    }
});
