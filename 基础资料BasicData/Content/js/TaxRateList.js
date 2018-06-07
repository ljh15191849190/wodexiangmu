var searchData = {};
var vmTaxRate = new Vue({
    el: '#apps',
    data: {
        //发票类型
        Invoice_Type: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000011",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData
    },
    methods: {
        //新增发票类型
        New: function () {
            //弹出发票类型详情iframe窗
            PageCommon.ModalOpen({
                id: "TaxRateDetailNew",
                title: '税率详情',
                width: "490px",
                height: "170px",
                url: '/BasicData/TaxRate/Detail',
                callBack: function (iframeId) {
                    //调用发票类型详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).taxRate_vue.Save()
                }
            })
        },
        //删除发票类型名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("TaxRateList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("TaxRateList");  //刷新数据
                },
                close: true
            })
        },
        //修改发票类型名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("TaxRateList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出发票类型详情iframe窗
            PageCommon.ModalOpen({
                id: "TaxRateDetailUpdate",
                title: '税率详情',
                width: "490px",
                height: "170px",
                url: "/BasicData/TaxRate/Detail",
                urlparameter: "keyValue=" + selectRow[0].Tax_Rate_Id,
                callBack: function (iframeId) {
                    //调用发票类型详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).taxRate_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "TaxRateDetail",
                title: '税率列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Tax_Rate&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            vmTaxRate.Search();
            PageCommon.ModalOpen({
                id: "TaxRateDetail",
                title: '税率列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Tax_Rate&formID=searchForm&List_Id=TaxRateList&Menu_Id=M000011&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //发票类型设置
        Set: function () {

        },
        //查询发票类型
        Search: function () {
            vmTaxRate.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000011", List_Id: "TaxRateList" });
        }
    }
});