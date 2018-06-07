var RequestValue = PageCommon.Request();
//查询来源
if (RequestValue.seach_type) {
    var seach_type = RequestValue.seach_type
}
//系统key
var system_key = "Warehouse";
//单据类型
if (RequestValue.is_purchase) {
    var is_purchase = RequestValue.is_purchase
}
var vmInventorySummary = new Vue({
    el: '#apps',
    data: {
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
        Product_Classify_Id: '',
        //油脂包装
        Package: '',
        //产品种类
        Batch_Id: '',
        //型号状态
        Goods_Locate_Name: '',
        productrange: { 'first': "", 'second': "" },
        //仅查现货
        Inventory_Total_Count: '0',
        Inventry_Type: '',
        //型号选择表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000001",
            System_Key: "BusinessCommon"
        },
        tableUrl: "ProductSeach",
        searchModel: {
            Pagination_Info: {
                System_Key: system_key
            },
            Is_Purchase: is_purchase,
            Seach_Type: seach_type
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
                var selectRow = PageCommon.GetTableSelectRow("InventorySummaryList");
                vm.detailInfo = selectRow[0];
              
                   
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
                        if (vm.detailInfo.Is_Purchase == '1' && vm.detailInfo.Product_Name.indexOf("@") <= -1) {
                            vm.detailInfo.Product_Name = vm.detailInfo.Product_Name + '@';
                        }
                        var searchModel = {};
                        searchModel.Pagination_Info = {
                            System_Key: system_key,
                            Conditional_Value1: '3',
                            Conditional_Value2: vm.detailInfo.Is_Purchase,
                            Current_Page: 0,
                            Page_Size: 1
                        },
                         searchModel.Where_Parameter_List =
                            [{
                                Field_Name: "Product_Id",
                                Condition_Value1: vm.detailInfo.Product_Id,
                                Expression: "02",
                                Module_Id: system_key,
                                Query_Type: "01"
                            }]

                        PageCommon.GetFormData({
                            url: "ProductSeach",
                            param: searchModel,
                            success: function (data) {
                                console.log(data);
                                vm.detailInfo.Inventory_Total_Count = data.data[0].Inventory_Total_Count;
                                vm.detailInfo.Inventory_Free_Count = data.data[0].Inventory_Free_Count;
                                vm.detailInfo.Wait_Out_Count = data.data[0].Wait_Out_Count;
                                vm.detailInfo.Allocated_Count = data.data[0].Allocated_Count;
                                vm.detailInfo.On_way_Count = data.data[0].On_way_Count;
                                vm.detailInfo.Consignment_Count = data.data[0].Consignment_Count;
                                vm.detailInfo.Sample_Product_Count = data.data[0].Sample_Product_Count;
                                vm.detailInfo.Lend_Count = data.data[0].Lend_Count;
                                vm.detailInfo.Sample_Storehouse_Count = data.data[0].Sample_Storehouse_Count;
                                vm.detailInfo.Borrow_Count = data.data[0].Borrow_Count;
                                vm.detailInfo.Asthenia_Count = data.data[0].Asthenia_Count;
                                vm.detailInfo.Damaged_Count = data.data[0].Damaged_Count;
                                vm.detailInfo.Inferior_Product_Count = data.data[0].Inferior_Product_Count;


                            }
                        });
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
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Weighting_Aver_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Lastest_Price_Include_Tax" || Field_Name === "Inventory_Total_Count" || Field_Name === "Inventory_Free_Count" || Field_Name === "Wait_Out_Count" || Field_Name === "Allocated_Count" || Field_Name === "On_way_Count" || Field_Name === "Consignment_Count" || Field_Name === "Sample_Product_Count" || Field_Name === "Lend_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            //成本价
            if (Field_Name === "Weighting_Aver_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        Search() {
            vmInventorySummary.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
            vmInventorySummary.searchModel.Is_Purchase = is_purchase;
            vmInventorySummary.searchModel.Seach_Type = seach_type;
            if (vmInventorySummary.Inventory_Total_Count == '0') {
                var postdata = {};
                postdata.Field_Name = "B_Product.Inventory_Total_Count";
                postdata.Query_Type = "02";
                postdata.Expression = "08";
                vmInventorySummary.searchModel.Where_Parameter_List.push(postdata);
            }
        },
        Export() { },
        mClear() {
            $('#Inventry_Type').val(null).trigger('change');
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