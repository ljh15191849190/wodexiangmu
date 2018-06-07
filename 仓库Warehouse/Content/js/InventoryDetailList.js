    var RequestValue = PageCommon.Request();
    if (RequestValue.seach_type) {
        var seach_type = RequestValue.seach_type
    }
    var system_key = "Warehouse";
    if (RequestValue.is_purchase) {
        var is_purchase = RequestValue.is_purchase
    }
    var vmInventoryDetail = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            Product_Name: '',
            Brand_Name: '',
            Storeage_Name: '',
            Product_Classify_Name: '',
            Product_Area_Name: '',
            Package: '',
            Batch_Id: '',
            Goods_Locate_Name: '',
            Product_Area_Id:'',
            Storeage_Age: '',
            Inventry_Type:'',
            Inventory_Total_Count: '0',
            productrange: { 'first': "", 'second': "" },
            //产地下拉框排序
            AreaOrder: [{}],
            AreaResult: ["Product_Area_Id", "Product_Area_Name"],
            AreaWhere: [],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000002",
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
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
            },
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Inventory_Total_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            },
            Search() {
                vmInventoryDetail.searchModel = $("#searchForm").GetSearchModel({
                    System_Key: system_key
                });
                vmInventoryDetail.searchModel.Is_Purchase = is_purchase;
                vmInventoryDetail.searchModel.Seach_Type = seach_type;
                if (vmInventoryDetail.Inventory_Total_Count == '0') {
                    var postdata = {};
                    postdata.Field_Name = "B_Product.Inventory_Total_Count";
                    postdata.Query_Type = "02";
                    postdata.Expression = "08";
                    vmInventoryDetail.searchModel.Where_Parameter_List.push(postdata);
                }
            },
            Export(){},
            mClear() {
                $('#Product_Area_Id').val(null).trigger('change');
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