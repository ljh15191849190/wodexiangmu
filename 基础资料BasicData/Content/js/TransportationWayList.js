var searchData = {};
var vmTransportation_Way = new Vue({
    el: '#apps',
    data: {
        //运输方式名称
        Transportation_Way_Name: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000013",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData
    },
    methods: {
        //新增运输方式名称
        New: function () {
            //弹出运输方式详情iframe窗
            PageCommon.ModalOpen({
                id: "TransportationWayDetailNew",
                title: '运输方式详细',
                width: "585px",
                height: "210px",
                url: '/BasicData/TransportationWay/Detail',
                callBack: function (iframeId) {
                    //调用运输方式详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).transportationWay_vue.Save()
                }
            })
        },
        //删除运输方式名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("TransportationWayList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("TransportationWayList");  //刷新数据
                },
                close: true
            })
        },
        //修改运输方式名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("TransportationWayList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出运输方式详情iframe窗
            PageCommon.ModalOpen({
                id: "TransportationWayDetailUpdate",
                title: '运输方式详细',
                width: "585px",
                height: "210px",
                url: "/BasicData/TransportationWay/Detail",
                urlparameter: "keyValue=" + selectRow[0].Transportation_Way_Id,
                callBack: function (iframeId) {
                    //调用运输方式详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).transportationWay_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "TransportationWayDetail",
                title: '运输方式列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Transportation_Way&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            vmTransportation_Way.Search();
            PageCommon.ModalOpen({
                id: "TransportationWayDetail",
                title: '运输方式列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Transportation_Way&formID=searchForm&List_Id=TransportationWayList&Menu_Id=M000013&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //运输方式设置
        Set: function () {

        },
        //查询运输方式名称
        Search: function () {
            vmTransportation_Way.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000013", List_Id: "TransportationWayList" });
        }
    }
});