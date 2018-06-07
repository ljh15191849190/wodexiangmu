var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //仓库名称
        Storeage_Id: '',
        //仓库区域名称
        Storeage_Area_Name: '',
        //仓库区域简称
        Storeage_Area_Short_Name: '',
        //仓库下拉查询条件
        StorageWhere: [],
        //仓库排序条件
        StorageOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库下拉显示字段
        StorageResult: ["Storage_Id", "Storage_Name"],
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000016",
            System_Key: "BasicData"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach'
    },
    methods: {
        //单个新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "StorageAreaDetail",
                title: '仓库区域单个新增',
                width: "555px",
                height: "220px",
                url: '/BasicData/StorageArea/SingleDetail',
                callBack: function (iframeId) {
                    //调用仓库区域单个新增详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmStorageAreaSingle.Save()
                }
            })
        },
        //批量新增
        BatchNew: function (obj) {
            window.location.href = PageCommon.SetUrl("BatchDetail");

        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("StorageAreaList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("StorageAreaList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("StorageAreaList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "StorageAreaDetail",
                title: '仓库区域修改',
                width: "555px",
                height: "220px",
                url: "/BasicData/StorageArea/SingleDetail",
                urlparameter: "keyValue=" + selectRow[0].Storage_Area_Id,
                callBack: function (iframeId) {
                    //调用仓库区域单个新增详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmStorageAreaSingle.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "StorageAreaImport",
                title: '导入仓库区域列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Storage_Area&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            app.Search();
            PageCommon.ModalOpen({
                id: "StorageAreaExport",
                title: '导出仓库区域列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Storage_Area&formID=searchForm&List_Id=StorageAreaList&Menu_Id=M000016&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000016", List_Id: "StorageAreaList" });
        }
    }
})