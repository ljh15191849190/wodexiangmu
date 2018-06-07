var searchData = {};
var vmCurrency = new Vue({
    el: '#apps',
    data: {
        //币种名称
        Currency_Name: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000009",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData
    },
    methods: {
        //新增币种名称
        New: function () {
            //弹出币种详情iframe窗
            PageCommon.ModalOpen({
                id: "CurrencyDetailNew",
                title: '币种详细',
                width: "490px",
                height: "180px",
                url: '/BasicData/Currency/Detail',
                callBack: function (iframeId) {
                    //调用币种详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).currency_vue.Save()
                }
            })
        },
        //删除币种名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("CurrencyList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("CurrencyList");  //刷新数据
                },
                close: true
            })
        },
        //修改币种名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CurrencyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出品牌详情iframe窗
            PageCommon.ModalOpen({
                id: "CurrencyDetailUpdate",
                title: '币种详细',
                width: "490px",
                height: "180px",
                url: "/BasicData/Currency/Detail",
                urlparameter: "keyValue=" + selectRow[0].Currency_Id,
                callBack: function (iframeId) {
                    //调用币种详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).currency_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "CurrencyDetail",
                title: '币种列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Currency&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            vmCurrency.Search();
            PageCommon.ModalOpen({
                id: "CurrencyDetail",
                title: '币种列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Currency&formID=searchForm&List_Id=CurrencyList&Menu_Id=M000009&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //币种设置
        Set: function () {

        },
        //查询币种名称
        Search: function () {
            vmCurrency.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000009", List_Id: "CurrencyList" });
        }
    }
});