var vmPrepareGoods = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Delete_Reason: '',
        Product_Classify_Name: '',
        Brand_Name: '',
        Storeage_Name: '',
        Corporation_Name: '',
        Create_Department_Name: '',
        Prepare_Status: '',
        Brand_Id: "",
        Storeage_Id: "",
        Create_Time: "",
        Create_Department_Id: '',
        Create_User: "",
        Company_Id: "",
        Product_Area_Id: '',
        Inventry_Type:'',
        Package: '',
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
        childSearchModel: [
              {
                  Field_Name: ["W_Prepare_Goods_Detail.Prepare_Goods_Id"],
                  Parent_Key: ["Prepare_Goods_Id"],
                  Detail_Seach: 'DetailSeach',
                  Child_List: 'PrepareGoodsDetailList',
                  Default_Child: "true"
              }
        ],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000007",
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
            if (Field_Name === "Sum_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
           
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Sum_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }

        },

        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "This_Prepare_Count" || Field_Name === "Prepared_Count" || Field_Name === "Should_Prepare_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "This_Prepare_Count" || Field_Name === "Prepared_Count" || Field_Name === "Should_Prepare_Count") {
                if (value) {
                    if (value.toString().charAt(0) == '0') {
                        return '0';
                    } else {
                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                    }
                }
            }
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },

        //删除员工
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PrepareGoodsList");
            //画面选择一条数据
            if (selectRow.length == 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: "0",
                success: function () {
                    PageCommon.RefreshTablePage("PrepareGoodsList");  //刷新数据
                },
                close: true
            })
            
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PrepareGoodsList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Search", "relevantnumber=" + selectRow[0].Prepare_Goods_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PrepareGoodsList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Prepare_Goods_Status == '01' || selectRow[0].Prepare_Goods_Status == '03') {
                //详细画面更新跳转
                window.location.href = PageCommon.SetUrlParameter("Search", "relevantnumber=" + selectRow[0].Prepare_Goods_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            }
        },
        OKprepareGoods: function () {
            var selectRow = PageCommon.GetTableSelectRow("PrepareGoodsList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Prepare_Goods_Status == '01' || selectRow[0].Prepare_Goods_Status == '03') {
                PageCommon.Loading(true, "正在加载中...");
                PageCommon.SubmitForm({
                    url: "ConfirmPrepareGoods",
                    param: { prepareGoods: selectRow[0] },
                    success: function (data) {
                        PageCommon.RefreshTablePage("PrepareGoodsList");

                    }
                });

            } else {
                PageCommon.ShowMessageRight("E2063");
                return;
            }
        },
        CancelprepareGoods: function () {
            var selectRow = PageCommon.GetTableSelectRow("PrepareGoodsList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Prepare_Goods_Status != '02') {
                PageCommon.ShowMessageRight("E2063");
                return;
            } else {
                PageCommon.Loading(true, "正在加载中...");
                PageCommon.SubmitForm({
                    url: "CancelPrepareGoods",
                    param: { prepareGoods: selectRow[0] },
                    success: function (data) {
                        PageCommon.RefreshTablePage("PrepareGoodsList");

                    }
                });
            }
        },
        Print: function () { },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'W_Prepare_Goods',
                menu_Id: 'M000007',
                list_Id: 'PrepareGoodsList',
                systemKey: 'Warehouse',
                vm: vmPrepareGoods
            })
        },
        //部门设置
        Set: function () {

        },

        //查询部门名称
        Search: function () {
            vmPrepareGoods.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000007", List_Id: "PrepareGoodsList" });
        },
        mClear: function () {
            this.Product_Name = '';
            $('#Brand_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            $('#Storeage_Id').val(null).trigger('change');
            $('#Prepare_Status').val(null).trigger('change');
            $('#Create_User').val(null).trigger('change');
            $('#Create_Department_Id').val(null).trigger('change');
            $('#Inventry_Type').val(null).trigger('change');
            this.Create_Time = '';
            this.In_Storeage_Id = '';
            this.productrange.first = '';
            this.productrange.second = '';
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            this.Package = '';
            this.Create_Department_Name = '';
        },

    }
});