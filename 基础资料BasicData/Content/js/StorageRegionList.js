var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //仓库储区
        Storage_Region_Name: '',
        //仓库储区简称
        Storage_Region_Short_Name: '',
        //仓库储区类型
        Storage_Region_Type:'',
        //储区类型下拉查询条件
        StorageRegionWhere: [],
        //储区类型排序条件
        StorageRegionOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //储区类型下拉显示字段
        StorageRegionResult: [ "Storage_Region_Type"],
        //仓库Id
        Storage_Id: "",
        //仓库名称
        Storage_Name: "",
        Storageresult: ["Storage_Id", "Storage_Name"],
        filedSearch: ["Storage_Id", "Storage_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Storage_Id", "Storage_Name"],
        //仓库区域
        Storage_Area_Id: '',
        //仓库区域下拉查询条件
        StorageAreaWhere: [],
        //仓库区域排序条件
        StorageAreaOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库区域下拉显示字段
        StorageAreaResult: ["Storage_Area_Id", "Storage_Area_Name"],
        //仓库区域联动条件
        linkage: null,
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000018",
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
                id: "StorageRegionSingleDetail",
                title: '仓库储区单个新增',
                width: "585px",
                height: "240px",
                url: '/BasicData/StorageRegion/SingleDetail',
                callBack: function (iframeId) {
                    //调用仓库区域单个新增详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmStorageRegionSingle.Save()
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
            var selectRow = PageCommon.GetTableSelectRow("StorageRegionList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("StorageRegionList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("StorageRegionList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "StorageRegionDetail",
                title: '仓库储区修改',
                width: "585px",
                height: "240px",
                url: "/BasicData/StorageRegion/SingleDetail",
                urlparameter: "keyValue=" + selectRow[0].Storage_Region_Id,
                callBack: function (iframeId) {
                    //调用仓库区域单个新增详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmStorageRegionSingle.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "StorageRegionImport",
                title: '导入仓库储区列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Storage_Region&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            app.Search();
            PageCommon.ModalOpen({
                id: "StorageRegionExport",
                title: '导出仓库储区列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Storage_Region&formID=searchForm&List_Id=StorageRegionList&Menu_Id=M000018&SystemKey=BasicData",
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
            app.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000018", List_Id: "StorageRegionList" });
        },
        TemplateSelection: function (data) {
            this.Storage_Id = data.id;
            this.Storage_Name = data.Storage_Name || data.text;

            app.linkage = {};
            app.linkage.Field_Name = "Storage_Id";
            app.linkage.Value1 = data.id;
        },
        
        //根据仓库查询仓库区域
        ChangeStorage: function (value) {
            app.linkage = {};
            app.linkage.Field_Name = "Storage_Id";
            app.linkage.Value1 = value;
        },
    }
})