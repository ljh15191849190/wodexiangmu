
    var searchData = {};
    var vmProductionArea = new Vue({
        el: '#apps',
        data: {
            Create_Time:'',
            //产地名称
            Product_Area_Name: "",
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000004",
                System_Key: "BasicData"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: searchData
        },
        methods: {
            //新增产地名称
            New: function () {
                //弹出产地详情iframe窗
                PageCommon.ModalOpen({
                    id: "ProductionAreaDetailNew",
                    title: '产地详细',
                    width: "550px",
                    height: "210px",
                    url: '/BasicData/ProductionArea/Detail',
                    callBack: function (iframeId) {
                        //调用产地详情页保存方法
                        PageCommon.ChildrenFrames(iframeId).productionarea_vue.Save()
                    }
                })
            },
            //删除产地名称
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("ProductionAreaList");

                //调用删除共同方法
                PageCommon.SubmitDetialForm({
                    url: "Delete",
                    param: selectRow,
                    success: function () {
                        PageCommon.RefreshTablePage("ProductionAreaList");  //刷新数据
                    },
                    close: true
                })
            },
            //修改产地名称
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ProductionAreaList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //弹出产地详情iframe窗
                PageCommon.ModalOpen({
                    id: "ProductionAreaDetailUpdate",
                    title: '产地详细',
                    width: "550px",
                    height: "210px",
                    url: "/BasicData/ProductionArea/Detail",
                    urlparameter: "keyValue=" + selectRow[0].Product_Area_Id,
                    callBack: function (iframeId) {
                        //调用产地详情页保存方法
                        PageCommon.ChildrenFrames(iframeId).productionarea_vue.Save()
                    }
                })
            },
            //导入
            Import: function (obj) {
                PageCommon.ModalImportOpen({
                    tableName: "B_Product_Area",
                    systemKey: "BasicData",
                    vm: vmProductionArea
                })
            },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'B_Product_Area',
                    menu_Id: 'M000004',
                    list_Id: 'ProductionAreaList',
                    systemKey: 'BasicData',
                    vm: vmProductionArea
                })
            },
        
            //产地设置
            Set: function () {

            },
            //查询产地
            Search: function () {
                vmProductionArea.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000004", List_Id: "ProductionAreaList" });
            },
            Clear: function () {
                this.Product_Area_Name = '';
                this.Create_Time = '';
            }
        }
    });
