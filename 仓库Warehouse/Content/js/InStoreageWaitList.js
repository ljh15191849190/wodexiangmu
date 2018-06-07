    var vmWaitInStoreage = new Vue({
        el: '#apps',
        data: {
            Bill_Id: "",
            Product_Classify_Name:'',
            Product_Name: "",
            Brand_Name: "",
            Product_Area_Id: "",
            Storeage_Id: "",
            Storeage_Name:'',
            Bill_Type: "",
            In_Storeage_Way: "",
            Corporation_Name: "",
            Package: "",
            Inventry_Type:'',
            Create_Time: "",
            productrange: {
                first: "",
                second: ""
            },
            //产地
            AreaOrder: [{ }],
            AreaResult: ["Product_Area_Id", "Product_Area_Name"],
            AreaWhere: [],
            //品牌
            Brandresult: ["Brand_Id", "Brand_Name"],
            BrandfiledSearch: ["Brand_Id", "Brand_Name"],
            BrandmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            BrandinputField: ["Brand_Id", "Brand_Name"],
            //库房
            Storeageresult: ["Storeage_Id", "Storeage_Name"],
            StoreagefiledSearch: ["Storeage_Id", "Storeage_Name"],
            StoreagemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            StoreageinputField: ["Storeage_Id", "Storeage_Name"],
            childSearchModel: [
                 {
                     Field_Name: ["W_In_Storeage_Wait_Detail.In_Storeage_Wait_Id"],
                     Parent_Key: ["In_Storeage_Wait_Id"],
                     Child_List: 'InStoreageWaitDetailList',
                     Detail_Seach: 'DetailSeach',
                     Default_Child: "true"
                 }
            ],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000001",
                System_Key: "Warehouse"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //位数cookie
            globalParameter: {}

        },
        mounted: function () {
            var vm = this;
            vm.globalParameter = PageCommon.GlobalParameter();
            //控件拖动
            $('.form-group').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

            });
        },
        methods: {
            childtotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Should_Enter_Count" || Field_Name === "Entered_Count") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
              
            },
            //表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Should_Enter_Count" || Field_Name === "Entered_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            },
            Relation: function () {
                var selectRow = PageCommon.GetTableSelectRow("InStoreageWaitList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                if (selectRow[0].In_Storeage_Way != '02') {
                    PageCommon.Loading(true, "正在加载中...");
                    var obj = {};
                    obj.Storeage_Operate_Id = selectRow[0].In_Storeage_Wait_Id;
                    PageCommon.SubmitForm({
                        url: "ScanInStoreage",
                        param: { scanPlan: obj },
                        success: function (data) {
                            PageCommon.RefreshTablePage("InStoreageWaitList");

                        }
                    });
                } 
            },
            
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'W_In_Storeage_Wait',
                    menu_Id: 'M000001',
                    list_Id: 'InStoreageWaitList',
                    systemKey: 'Warehouse',
                    vm: vmWaitInStoreage
                })
            },
            //查询部门名称
            Search: function () {
                vmWaitInStoreage.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000001", List_Id: "InStoreageWaitList" });
            },
            mClear: function () {
                this.Package = '';
                $('#In_Storeage_Way').val(null).trigger('change');
                $('#Inventry_Type').val(null).trigger('change');
                $('#Bill_Type').val(null).trigger('change');
                $('#Storeage_Id').val(null).trigger('change');
                $('#Storeage_Id').val(null).trigger('change');
                this.Storeage_Id = '';
                $('#Product_Area_Id').val(null).trigger('change');
                $('#Brand_Id').val(null).trigger('change');
                this.Brand_Name = '';
                this.Product_Classify_Name = '';
                this.Bill_Id = '';
                this.Storeage_Name = '';
                this.Create_Time = '';
                this.productrange.first = '';
                this.productrange.second = '';
            },
          
        }
    });