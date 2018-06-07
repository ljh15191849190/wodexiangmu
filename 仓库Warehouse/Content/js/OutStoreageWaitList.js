var vmWaitOutStoreage = new Vue({
    el: '#apps',
    data: {
        Customer_Name: '',
        Product_Classify_Name: "",
        Brand_Name: '',
        Storeage_Name: "",
        Out_Storeage_Way: '',
        Storeage_Id: '',
        Storeage_Name: '',
        Product_Name: '',
        Product_Id: '',
        Corporation_Id: "",
        Corporation_Name: "",
        Employee_Id: '',
        Employee_Name: "",
        Brand_Id: "",
        Brand_Name: "",
        Product_Area_Id: "",
        Product_Area_Name: "",
        Storeage_Name: "",
        Bill_Type: "",
        Package: "",
        Receiver: "",
        Inventry_Type:'',
        Create_Time: "",
        Address: '',
        productrange: {
            first: "",
            second: ""
        },
        //产地
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        //品牌
        Brandresult: ["Brand_Id", "Brand_Name"],
        BrandfiledSearch: ["Brand_Id", "Brand_Name"],
        BrandmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        BrandinputField: ["Brand_Id", "Brand_Name"],
        //任务人
        Employeeresult: ["Employee_Id", "Name"],
        EmployeefiledSearch: ["Employee_Id", "Name"],
        EmployeemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        EmployeeinputField: ["Employee_Id", "Name"],
        //库房
        Storeageresult: ["Storeage_Id", "Storeage_Name"],
        StoreagefiledSearch: ["Storeage_Id", "Storeage_Name"],
        StoreagemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        StoreageinputField: ["Storeage_Id", "Storeage_Name"],
        //客户
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerfiledSearch: ["Customer_Id", "Customer_Name"],
        CustomerOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        childSearchModel: [
             {
                 Field_Name: ["W_Out_Storeage_Wait_Detail.Out_Storeage_Wait_Id"],
                 Parent_Key: ["Out_Storeage_Wait_Id"],
                 Child_List: 'OutStoreageWaitDetailList',
                 Detail_Seach: 'DetailSeach',
                 Default_Child: "true"
             }
        ],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000006",
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
            if (Field_Name === "Should_Out_Count" || Field_Name === "Out_Count") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Should_Out_Count" || Field_Name === "Out_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
        },
        Relation: function () {
            var selectRow = PageCommon.GetTableSelectRow("OutStoreageWaitList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Out_Storeage_Way != '02') {
                PageCommon.Loading(true, "正在加载中...");
                var obj = {};
                obj.Storeage_Operate_Id = selectRow[0].Out_Storeage_Wait_Id;
                PageCommon.SubmitForm({
                    url: "ScanOutStoreage",
                    param: { scanPlan: obj },
                    success: function (data) {
                        PageCommon.RefreshTablePage("OutStoreageWaitList");

                    }
                });
            }
        },
        Print: function () { },
        Set: function () { },
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'W_Out_Storeage_Wait',
                menu_Id: 'M000006',
                list_Id: 'OutStoreageWaitList',
                systemKey: 'Warehouse',
                vm: vmWaitOutStoreage
            })
        },
        //查询部门名称
        Search: function () {
            vmWaitOutStoreage.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000006", List_Id: "OutStoreageWaitList" });
        },
        mClear: function () {
            $('#Corporation_Id').val(null).trigger('change');
            $('#Employee_Id').val(null).trigger('change');
            $('#Brand_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            $('#Storeage_Id').val(null).trigger('change');
            $('#Bill_Type').val(null).trigger('change');
            $('#Out_Storeage_Way').val(null).trigger('change');
            $('#Inventry_Type').val(null).trigger('change');
            this.Package = '';
            this.Receiver = '';
            this.Create_Time = '',
            this.Address = '',
            this.Customer_Name = '';
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            $('#productrange_SearchStart').val(null);
            $('#productrange_SearchEnd').val(null);
        },

    }
});