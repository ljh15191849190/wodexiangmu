var vmProduct = new Vue({
    el: '#apps',
    data: {
        Delete_Reason: '',
        In_Storeage_Id: "",
        productrange: {
            first: "",
            second: ""
        },
        Brand_Id: "",
        Package: "",
        Brand_Name: '',
        Product_Classify_Name: '',
        Storeage_Name: '',
        Refercnce_Goods_Locate_Id: "",
        Storeage_Id: "",
        In_Storeage_Way: "",
        Bill_Status: "",
        Bill_Type: "",
        Create_Time: "",
        Create_Department: "",
        Create_User: "",
        Corporation_Id: "",
        Corporation_Name: "",
        Inventry_Type:'',
        Product_Area_Id: "",
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
                  Field_Name: ["W_In_Storeage_Detail.In_Storeage_Id"],
                  Parent_Key: ["In_Storeage_Id"],
                  Detail_Seach: 'DetailSeach',
                  Child_List: 'InStoreageDetailList',
                  Default_Child: "true"
              }
        ],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
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
            if (Field_Name === "Should_Enter_Count" || Field_Name === "Entered_Count" || Field_Name === "This_Enter_Count" || Field_Name === "On_Shelf_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Should_Enter_Count" || Field_Name === "Entered_Count" || Field_Name === "This_Enter_Count" || Field_Name === "On_Shelf_Count") {
                console.log(this.globalParameter)
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
            var selectRow = PageCommon.GetTableSelectRow("InStoreageList");
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
                    PageCommon.RefreshTablePage("InStoreageList");  //刷新数据
                },
                close: true
            })
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("InStoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].In_Storeage_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("InStoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].In_Storeage_Status == '03') {
                PageCommon.ShowMessageRight("E2049");
                return;
            }

            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].In_Storeage_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        InStoreage: function () {
            var selectRow = PageCommon.GetTableSelectRow("InStoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].In_Storeage_Status == '03') {
                PageCommon.ShowMessageRight("E2046");
            } else {
                PageCommon.Loading(true, "正在加载中...");
                selectRow[0].Execute_InStoreage_Flag = 1;
                PageCommon.SubmitForm({
                    url: "ExcuteInStoreage",
                    param: { inStoreage: selectRow[0] },
                    success: function (data) {
                        PageCommon.RefreshTablePage("InStoreageList");

                    }
                });
            }
        },
        Print: function () { },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'W_In_Storeage',
                menu_Id: 'M000002',
                list_Id: 'InStoreageList',
                systemKey: 'Warehouse',
                vm: vmProduct
            })
        },
        //部门设置
        Set: function () {

        },

        //查询部门名称
        Search: function () {
            vmProduct.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "InStoreageList" });
        },
        mClear: function () {
            this.Product_Name = '';
            $('#Inventry_Type').val(null).trigger('change');
            $('#Product_Name').val(null).trigger('change');
            $('#Big_Classify_Id').val(null).trigger('change');
            this.Package = '';
            $('#Material_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            this.Pc = '';
            this.Tm = '';
            this.Production_Month = '';
            $('#Inner_Radius').val(null);
            $('#Inner_Radius_second').val(null);
            $('#Outer_Radius').val(null);
            $('#Outer_Radius_second').val(null);
            this.productrange.first = '';
            this.productrange.second = '';
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
            this.Storeage_Name = '';
            this.Package = '';
            this.Create_User = '';
        },

    }
});