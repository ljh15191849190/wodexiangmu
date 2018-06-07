var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //获取途径名称
        Get_Way_Name: '',
        Create_Time:"",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000015",
            System_Key: "BasicData"
        },
        //子列表的查询条件
        childSearchModel: {
            Field_Name: "B_Get_way.Get_Way_Id"
          , Parent_Key: "Get_Way_Id"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableUrl: 'Seach'
    },
    methods: {
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "GetWayDetail",
                title: '获取途径新增',
                width: "555px",
                height: "210px",
                url: '/BasicData/GetWay/Detail',
                callBack: function (iframeId) {
                    //调用获取途径详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmGetWay.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomerGetWayList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("CustomerGetWayList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomerGetWayList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "GetWayDetail",
                title: '获取途径修改',
                width: "555px",
                height: "210px",
                url: "/BasicData/GetWay/Detail",
                urlparameter: "keyValue=" + selectRow[0].Get_Way_Id,
                callBack: function (iframeId) {
                    //调用获取途径详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmGetWay.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Get_Way",
                systemKey: "BasicData",
                vm: app
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Get_Way',
                menu_Id: 'M000015',
                list_Id: 'CustomerGetWayList',
                systemKey: 'BasicData',
                vm: app
            })
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000015", List_Id: "CustomerGetWayList" });
            var grows = $.fn.DataTable.TreeGrid.prototype.treeGridRows;
            var dtSettings = new $.fn.dataTable.Api("#CustomerGetWayList").settings()[0];
            $.fn.DataTable.TreeGrid.prototype.resetTreeGridRows(dtSettings, null, grows);
            PageCommon.RefreshTablePage("CustomerGetWayList");

        },
        Clear: function () {
            this.Get_Way_Name = '';
        }
    }
})