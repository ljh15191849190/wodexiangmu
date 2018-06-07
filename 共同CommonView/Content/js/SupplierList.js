
var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key;
}
//单据类型
if (RequestValue.is_purchase) {
    var is_purchase = RequestValue.is_purchase;
    console.log(is_purchase)
}
var vmSupplierSearch = new Vue({
    el: '#app',
    data: {
        //供应商id
        Supplier_Name: "",
        //其他抬头id
        Other_Name: "",
        //结算方式
        Payway_Way: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000006",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "SupplierSeach",
        childtableUrl: "SupplierDetailSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: is_purchase,
            }
        },
        //结算方式key
        PaywayDictionaryKey: "PAY_WAY",
        //位数cookie
        globalParameter: PageCommon.GlobalParameter()
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
        columrender: function (Field_Name, value, type, rowData) {
            if (Field_Name === "Goods_Payment_Balance" || Field_Name === "All_Balance" || Field_Name === "Advance_Payment") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Goods_Payment_Balance" || Field_Name === "All_Balance" || Field_Name === "Advance_Payment") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
            }
        },
        Search: function (obj) {
            vmSupplierSearch.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmSupplierSearch.searchModel.Pagination_Info.Conditional_Value1 = is_purchase;
        },
        mClear: function () {
            //供应商申请单号
            this.Supplier_Name = '';
            this.Other_Name = '';
            this.Payway_Way = '';
        }
    }
});
