var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
          Create_Time:'',
        //行业名称
        Industry_Name: '',
        //行业简称
        Industry_Short_Name:'',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000005",
            System_Key: "BasicData"
        },
        //子列表的查询条件
        childSearchModel: {
            Field_Name: "B_Industry_Detail.Industry_Id"
          , Parent_Key: "Industry_Id"
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
                id: "IndustryDetail",
                title: '行业新增',
                width: "555px",
                height: "300px",
                url: '/BasicData/Industry/Detail',
                callBack: function (iframeId) {
                    //调用菜单分组管理详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmIndusty.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("IndustryList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("IndustryList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("IndustryList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "IndustryDetail",
                title: '行业修改',
                width: "555px",
                height: "300px",
                url: "/BasicData/Industry/Detail",
                urlparameter: "keyValue=" + selectRow[0].Industry_Id,
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmIndusty.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Industry",
                systemKey: "BasicData",
                vm: app
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Industry',
                menu_Id: 'M000005',
                list_Id: 'IndustryList',
                systemKey: 'BasicData',
                vm: app
            })
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000005", List_Id: "IndustryList" });
            var grows = $.fn.DataTable.TreeGrid.prototype.treeGridRows;
            var dtSettings = new $.fn.dataTable.Api("#IndustryList").settings()[0];
            $.fn.DataTable.TreeGrid.prototype.resetTreeGridRows(dtSettings, null, grows);
            PageCommon.RefreshTablePage("IndustryList");
            
        },
        Clear: function () {
            this.Industry_Name = "";
            this.Industry_Short_Name = "";
            this.Create_Time = "";
        }
    }
})