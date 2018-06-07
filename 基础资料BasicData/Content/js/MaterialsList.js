
var searchData = {};
var vmMaterials = new Vue({
    el: '#apps',
    data: {
        //材质名称
        Material_Name: "",
        //启用
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData
    },
    methods: {
        //新增材质名称
        New: function () {
            //弹出材质详情iframe窗
            PageCommon.ModalOpen({
                id: "MaterialsDetailNew",
                title: '材质详细',
                width: "490px",
                height: "170px",
                url: '/BasicData/Materials/Detail',
                callBack: function (iframeId) {
                    //调用材质详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).material_vue.Save()
                }
            })
        },
        //删除材质名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("MaterialsList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("MaterialsList");  //刷新数据
                },
                close: true
            })
        },
        //修改材质名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("MaterialsList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出系统管理详情iframe窗
            PageCommon.ModalOpen({
                id: "MaterialsDetailUpdate",
                title: '材质详细',
                width: "490px",
                height: "170px",
                url: "/BasicData/Materials/Detail",
                urlparameter: "keyValue=" + selectRow[0].Material_Id,
                callBack: function (iframeId) {
                    //调用材质详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).material_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "MaterialsDetail",
                title: '材质列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Material&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            vmMaterials.Search();
            PageCommon.ModalOpen({
                id: "MaterialsDetail",
                title: '材质列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Material&formID=searchForm&List_Id=MaterialsList&Menu_Id=M000002&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //材质设置
        Set: function () {

        },
        //查询材质
        Search: function () {
            vmMaterials.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "MaterialsList" });
        }
    }
});
