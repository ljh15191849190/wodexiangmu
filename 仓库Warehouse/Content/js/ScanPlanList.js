var vmScanPlan = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Package: "",
        Product_Classify_Name: '',
        Brand_Name: '',
        Storeage_Name: '',
        Scan_Status: '',
        Create_Department_Name: '',
        Product_Area_Id: "",
        Product_Area_Name: "",
        Brand_Id: "",
        Storeage_Id: "",
        Storeage_Name: "",
        In_Storeage_Way: "",
        Bill_Status: "",
        Bill_Type: "",
        Create_Time: "",
        Create_Department: "",
        Create_User: "",
        Corporation_Id: "",
        Corporation_Name: "",
        //产地
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        //品牌
        Brandresult: ["Brand_Id", "Brand_Name"],
        BrandfiledSearch: ["Brand_Id", "Brand_Name"],
        BrandmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        BrandinputField: ["Brand_Id", "Brand_Name"],
        //货位
        Locateresult: ["Goods_Locate_Id", "Goods_Locate_Name"],
        LocatefiledSearch: ["Goods_Locate_Id", "Goods_Locate_Name"],
        LocatemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        LocateinputField: ["Goods_Locate_Id", "Goods_Locate_Name"],
        //仓库
        Storeageresult: ["Storeage_Id", "Storeage_Name"],
        StoreagefiledSearch: ["Storeage_Id", "Storeage_Name"],
        StoreagemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        StoreageinputField: ["Storeage_Id", "Storeage_Name"],
        //部门
        Departmentresult: ["Department_Id", "Department_Name"],
        DepartmentfiledSearch: ["Department_Id", "Department_Name"],
        DepartmentmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        DepartmentinputField: ["Department_Id", "Department_Name"],
        //制单人
        Userresult: ["Employee_Id", "Name"],
        UserfiledSearch: ["Employee_Id", "Name"],
        UsermainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        UserinputField: ["Employee_Id", "Name"],
        //公司
        Commanyresult: ["Company_Id", "Company_Name"],
        CommanyfiledSearch: ["Company_Id", "Company_Name"],
        CommanymainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CommanyinputField: ["Company_Id", "Company_Name"],

        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000012",
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
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Should_Scan_Count" || Field_Name === "Scan_Count" || Field_Name === "Recheck_Count" || Field_Name === "Sure_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Should_Scan_Count" || Field_Name === "Scan_Count" || Field_Name === "Recheck_Count" || Field_Name === "Sure_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }


        },
        Import: function () {
            window.location.href = PageCommon.SetUrlParameter("Upload")
        },
        //查看
        New: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ScanPlanList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Scan_Plan_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            //window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Storeage_Operation_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        CancleScan: function () {
            var selectRow = PageCommon.GetTableSelectRow("ScanPlanList");
            //画面选择一条数据
            if (selectRow.length == 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            PageCommon.Loading(true, "正在加载中...");
            PageCommon.SubmitForm({
                url: "UndoScanning",
                param: { objList: selectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("ScanPlanList");

                }
            });
        },
        //查询部门名称
        Search: function () {
            vmScanPlan.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000012", List_Id: "ScanPlanList" });
        },
        mClear: function () {
            $('#Bill_Status').val(null).trigger('change');
            $('#Bill_Type').val(null).trigger('change');
            $('#Create_Department_Id').val(null).trigger('change');
            $('#In_Storeage_Way').val(null).trigger('change');
            $('#Storeage_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            $('#Brand_Id').val(null).trigger('change');
            this.Create_Time = '';
            this.productrange.first = '';
            this.productrange.second = '';
            $('#Create_User').val(null).trigger('change');
            $('#Corporation_Id').val(null).trigger('change');
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            this.Create_Department_Name = '';
            this.Package = '';
        },

    }
});