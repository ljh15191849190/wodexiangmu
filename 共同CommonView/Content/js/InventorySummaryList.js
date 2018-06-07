var RequestValue = PageCommon.Request();
//查询来源
if (RequestValue.seach_type) {
    var seach_type = RequestValue.seach_type;
    var v_id, Menu_Id;
    if (seach_type == '0') {
        v_id = 'InventorySummaryList';
        Menu_Id = 'M000001';
    } else if (seach_type == '4') {
        v_id = 'InventoryDetailSumList';
        Menu_Id = 'M000017';
    }else{
        v_id = 'ProductList';
        Menu_Id = 'M000015';
    }
}
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key;
}
//单据类型
if (RequestValue.is_purchase) {
    var is_purchase = RequestValue.is_purchase;
}
//是否拆分
if (RequestValue.is_split) {
    var is_split = RequestValue.is_split;
}
//仓库id
if(RequestValue.storeage_id){
    var storeage_id = RequestValue.storeage_id;
}
var vmInventorySummary = new Vue({
    el: '#app',
    data: {
        seach_type: seach_type,
        //产地下拉框排序
        Product_Area_Id: '',
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        productrange: {
            first: "",
            second: ""
        },
        //页签
        Product: {
            //基本信息
            basicInfo: false,
            //历史进货
            historyStock: false,
            //历史销售
            historySell: false,
            //历史价格申请
            historyPriceApply: false,
            //分配
            allocation: false,
            //寄售
            consignSale: false,
            //调拨在途
            transfersTransit: false,
        },
        //型号规格
        Product_Name: '',
        //品牌
        Brand_Name: '',
        //库房名称
        Storeage_Name: '',
        //品名
        Product_Classify_Name: '',
        //产地
        Product_Area_Name: '',
        //油脂包装
        Package: '',
        //仅查现货
        Inventory_Total_Count: '0',
        v_id: v_id,
        //型号选择表头查询条件
        columHeaderSeach: {
            Menu_Id: Menu_Id,
            System_Key: "BusinessCommon"
        },
        tableUrl: "ProductSeach",
        searchModel: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: seach_type,
                Conditional_Value2: is_purchase,
                Conditional_Value3: is_split,
                Conditional_Value4: storeage_id,
            },
        },
        //基本信息表头查询条件
        columHeaderSeach2: {
            Menu_Id: "M000005",
            System_Key: "BusinessCommon",
        },
        tableUrl2: "RelationProductSeach",
        searchModel2: {
            Pagination_Info: {
                System_Key: system_key,
                Conditional_Value1: ''
            }
        },
        //型号详细数据
        detailInfo: {},
        //位数cookie
        globalParameter: PageCommon.GlobalParameter(),
        //库房类型
        Inventry_Type: '',
        //库房类型数据字典key
        InventryTypeDictionaryKey: 'INVENTRY_TYPE',
    },
    mounted: function () {
        var vm = this;
        
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

        });
        $(".replyType").on('click', '.title1', function () {
            $(this).parent().find(".shrink").slideToggle();
            $(this).parent().find(".down_tab").toggleClass("rotate");
            $(this).toggleClass("boder");
        })
        $(".replyType").on('click', '.down_tab', function () {
            $(this).parent().find(".shrink").slideToggle();
            $(this).toggleClass("rotate");
            $(this).parent().find(".title1").toggleClass("boder");
        })
        $("#tab").on("click", 'li', function () {
            var index = $(this).index();
            if (index == 0) {
                $(".replyType").find('.type').eq(0).show();
                $.each(vm.Product, function (i, n) {
                    vm.Product[i] = false;
                })
            } else {
                var selectRow = PageCommon.GetTableSelectRow(v_id);
                vm.detailInfo = selectRow[0];
                if (vm.detailInfo.Is_Purchase == '1') {
                    if (vm.detailInfo.Product_Name.indexOf('@', vm.detailInfo.Product_Name.length - 1) <0) {
                        vm.detailInfo.Product_Name += '@';
                    }
                }
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                $(".replyType").find('.type').eq(0).hide();
                $.each(vm.Product, function (i, n) {
                    if (i == 'basicInfo' && index == 1) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else if (i == 'historyStock' && index == 2) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else if (i == 'historySell' && index == 3) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else if (i == 'historyPriceApply' && index == 4) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else if (i == 'allocation' && index == 5) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else if (i == 'consignSale' && index == 6) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else if (i == 'transfersTransit' && index == 7) {
                        vm.Product[i] = true;
                        vm.searchModel2.Pagination_Info.Conditional_Value1 = vm.detailInfo.Product_Id;
                    } else {
                        vm.Product[i] = false;
                    }
                })
            }
            $(this).addClass("tabactive").siblings().removeClass("tabactive");
        })
    },
    methods: {
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Inventory_Total_Count" || Field_Name === "Inventory_Free_Count" || Field_Name === "Wait_Out_Count" || Field_Name === "Allocated_Count" || Field_Name === "On_way_Count" || Field_Name === "Consignment_Count" || Field_Name === "Sample_Product_Count" || Field_Name === "Lend_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way),vm.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Weighting_Aver_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Inventory_Total_Count" || Field_Name === "Inventory_Free_Count" || Field_Name === "Wait_Out_Count" || Field_Name === "Allocated_Count" || Field_Name === "On_way_Count" || Field_Name === "Consignment_Count" || Field_Name === "Sample_Product_Count" || Field_Name === "Lend_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name === "Weighting_Aver_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
        },
        Search() {
            vmInventorySummary.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmInventorySummary.searchModel.Pagination_Info.Conditional_Value1 = seach_type;
            vmInventorySummary.searchModel.Pagination_Info.Conditional_Value2 = is_purchase;
            vmInventorySummary.searchModel.Pagination_Info.Conditional_Value3 = is_split;
            vmInventorySummary.searchModel.Pagination_Info.Conditional_Value4 = storeage_id;
            if (vmInventorySummary.Inventory_Total_Count == '0') {
                var postdata = {};
                postdata.Field_Name = "B_Product.Inventory_Total_Count";
                postdata.Query_Type = "02";
                postdata.Expression = "08";
                vmInventorySummary.searchModel.Where_Parameter_List.push(postdata);
            }
        },
        mClear() {
            this.Product_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            this.Product_Classify_Name = '';
            this.Product_Area_Name = '';
            this.Package = '';
            this.Goods_Locate_Name = '';
            this.Storeage_Age = '';
        }
    }
});
