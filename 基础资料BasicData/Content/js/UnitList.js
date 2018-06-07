var searchData = {};
var vmUnit = new Vue({
    el: '#apps',
    data: {
        //单位名称
        Unit_Name: "",
        //单位类型
        Unit_Type: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000010",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //单位类型Key
        UnitTypeDictionaryKey: "UNIT_TYPE"
    },
    methods: {
        //新增单位名称
        New: function () {
            //弹出单位详情iframe窗
            PageCommon.ModalOpen({
                id: "UnitDetailNew",
                title: '单位详细',
                width: "490px",
                height: "170px",
                url: '/BasicData/Unit/Detail',
                callBack: function (iframeId) {
                    //调用单位详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).unit_vue.Save()
                }
            })
        },
        //删除单位名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("UnitList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("UnitList");  //刷新数据
                },
                close: true
            })
        },
        //修改单位名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("UnitList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出单位详情iframe窗
            PageCommon.ModalOpen({
                id: "UnitDetailUpdate",
                title: '单位详细',
                width: "490px",
                height: "170px",
                url: "/BasicData/Unit/Detail",
                urlparameter: "keyValue=" + selectRow[0].Unit_Id,
                callBack: function (iframeId) {
                    //调用单位详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).unit_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "UnitDetail",
                title: '单位列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Unit&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            vmUnit.Search();
            PageCommon.ModalOpen({
                id: "UnitDetail",
                title: '单位列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Unit&formID=searchForm&List_Id=UnitList&Menu_Id=M000010&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //单位设置
        Set: function () {

        },
        //查询单位名称
        Search: function () {
            vmUnit.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000010", List_Id: "UnitList" });
        }
    }
});