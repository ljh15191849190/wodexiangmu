var vmStorage = new Vue({
    el: '#apps',
    data: {
        Storeage_Id: '',
        Storeage_Code:'',
        //仓库名称
        Storeage_Name: '',
        //归属部门
        Department_Id: '',
        Employee_Id:'',
        //仓库地址
        Address: '',
        //仓库全拼
        Create_Time: '',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "BasicData"
        },
        //表格查询条件
        searchModel: {},
        //表格查询url
        tableurl: 'Seach',
        //部门下拉查询条件
        DepartmentWhere: [],
        //部门排序条件
        DepartmentOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //部门下拉显示字段
        DepartmentResult: ["Department_Id","Department_Name"],
    },
    methods: {
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "StorageDetail",
                title: '仓库管理新增',
                width: "555px",
                height: "340px",
                url: '/BasicData/Storage/Detail',
                callBack: function (iframeId) {
                    //调用仓库详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).storeage_vue.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("StoreageList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("StoreageList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("StoreageList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "StorageDetail",
                title: '仓库管理修改',
                width: "555px",
                height: "340px",
                url: "/BasicData/Storage/Detail",
                urlparameter: "keyValue=" + selectRow[0].Storeage_Id,
                callBack: function (iframeId) {
                    //调用仓库详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).storeage_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Storeage",
                systemKey: "BasicData"
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Storeage',
                menu_Id: 'M000004',
                list_Id: 'StoreageList',
                systemKey: 'BasicData',
                vm: vmStorage
            })
        },
     
        //分布
        Distribute: function () {
            window.location.href = PageCommon.SetUrl("Distributed");
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            vmStorage.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000008", List_Id: "StoreageList" });
        },
        Clear: function () {
            this.Storeage_Name = '';
            this.Storeage_Code = '';
            this.Address = '';
            $('#Department_Id').val(null).trigger('change');
            this.Create_Time = '';

        }
    }
})