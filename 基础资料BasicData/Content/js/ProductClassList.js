var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        Create_Time:'',
        //产品分类名称
        Product_Classify_Name: '',
        //产品简称
        Product_Short_Name:'',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000006",
            System_Key: "BasicData"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableUrl: 'Seach',
            
    },
    methods: {
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "ProductClassDetail",
                title: '产品分类新增',
                width: "555px",
                height: "210px",
                url: '/BasicData/ProductClassify/Detail',
                callBack: function (iframeId) {
                    //调用产品分类详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmProductClass.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ProductClassifyList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("ProductClassifyList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ProductClassifyList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "ProductClassDetail",
                title: '产品分类修改',
                width: "555px",
                height: "210px",
                url: "/BasicData/ProductClassify/Detail",
                urlparameter: "keyValue=" + selectRow[0].Product_Classify_Id,
                callBack: function (iframeId) {
                    //调用产品分类详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmProductClass.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Product_Classify",
                systemKey: "BasicData",
                vm: app
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Product_Classify',
                menu_Id: 'M000006',
                list_Id: 'ProductClassifyList',
                systemKey: 'BasicData',
                vm: app
            })
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000006", List_Id: "ProductClassList" });
            var grows = $.fn.DataTable.TreeGrid.prototype.treeGridRows;
            var dtSettings = new $.fn.dataTable.Api("#ProductClassifyList").settings()[0];
            $.fn.DataTable.TreeGrid.prototype.resetTreeGridRows(dtSettings, null, grows);
            PageCommon.RefreshTablePage("ProductClassifyList");
        },
        Clear: function () {
            this.Product_Classify_Name = '';
            this.Product_Short_Name = '';
            this.Create_Time = '';
        }
    }
})
