var vmOutStoreage = new Vue({
    el: '#apps',
    data: {
        Delete_Reason: '',
        Out_Storeage_Id: "",
        Out_Storeage_Way: '',
        productrange: {
            first: "",
            second: ""
        },
        Batch_Id: "",
        Brand_Id: "",
        Product_Area_Id: "",
        Product_Area_Name: "",
        Product_Classify_Name: '',
        Brand_Name: '',
        Storeage_Name: '',
        Send_Storeage_Name: "",
        Package: "",
        Goods_Locate_Id: "",
        Goods_Locate_Name: "",
        Storeage_Id: "",
        Storeage_Name: "",
        Send_Storeage_Id: '',
        Create_Time: '',
        Inventry_Type:'',
        Create_Department_Name: "",
        Create_User: "",
        Corporation_Id: '',
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
        childSearchModel: [
              {
                  Field_Name: ["W_Out_Storeage_Detail.Out_Storeage_Id"],
                  Parent_Key: ["Out_Storeage_Id"],
                  Detail_Seach: 'DetailSeach',
                  Child_List: 'OutStoreageDetailList',
                  Default_Child: "true"
              }
        ],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000010",
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
            //console.log(b)
            //console.log(c);
        });

    },
    methods: {
        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Should_Out_Count" || Field_Name === "Out_Count" || Field_Name === "This_Out_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Should_Out_Count" || Field_Name === "Out_Count" || Field_Name === "This_Out_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },

        //删除员工
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("OutStoreageList");
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
                    PageCommon.RefreshTablePage("OutStoreageList");  //刷新数据
                },
                close: true
            })
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OutStoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Edit", "relevantnumber=" + selectRow[0].Out_Storeage_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OutStoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Out_Storeage_Status == '01')
            {
                //详细画面更新跳转
                window.location.href = PageCommon.SetUrlParameter("Edit", "relevantnumber=" + selectRow[0].Out_Storeage_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            }
             },
        OutStoreage: function () {
            var selectRow = PageCommon.GetTableSelectRow("OutStoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            var msg = selectRow[0].Out_Storeage_Id;
            if (selectRow[0].Out_Storeage_Status != '01') {
                PageCommon.ShowMessageArrayRight("E2057", new Array(msg));
                return;
            } else {
                PageCommon.Loading(true, "正在加载中...");
                selectRow[0].Execute_OutStoreage_Flag = 1;
                PageCommon.SubmitForm({
                    url: "ExcuteOutStoreage",
                    param: { OutStoreage: selectRow[0] },
                    success: function (data) {
                        PageCommon.RefreshTablePage("OutStoreageList");

                    }
                });
            }
        },
        Print: function () { },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'W_Out_Storeage',
                menu_Id: 'M000010',
                list_Id: 'OutStoreageList',
                systemKey: 'Warehouse',
                vm: vmOutStoreage
            })
        },
        //部门设置
        Set: function () {

        },

        //查询部门名称
        Search: function () {
            vmOutStoreage.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000010", List_Id: "OutStoreageList" });
        },
        mClear: function () {
            this.Out_Storeage_Id = '';
            this.Batch_Id = '';
            this.productrange.first = '';
            this.productrange.second = '';
            $('#Brand_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            this.Package = '';
            this.Create_User = '';
            $('#Send_Storeage_Id').val(null).trigger('change');
            $('#Goods_Locate_Id').val(null).trigger('change');
            $('#Storeage_Id').val(null).trigger('change');
            $('#Create_Employee_Id').val(null).trigger('change');
            $('#Create_Department_Id').val(null).trigger('change');
            $('#Out_Storeage_Way').val(null).trigger('change');
            $('#Bill_Type').val(null).trigger('change');
            $('#Corporation_Id').val(null).trigger('change');
            $('#Inventry_Type').val(null).trigger('change');
            this.Create_Time = '';
            this.Production_Month = '';
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            this.Send_Storeage_Name = '';
            this.Create_Department_Name = '';
            this.Corporation_Name = '';
        },

    }
});