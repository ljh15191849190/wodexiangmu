﻿var searchData = {};
var vmBrand = new Vue({
    el: '#apps',
    data: {
        //品牌名称
        Brand_Name: "",
        //价格级别
        Price_Grade: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000012",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData
    },
    methods: {
        //新增品牌名称
        New: function () {
            //弹出品牌详情iframe窗
            PageCommon.ModalOpen({
                id: "BrandDetailNew",
                title: '品牌详细',
                width: "490px",
                height: "200px",
                url: '/BasicData/Brand/Detail',
                callBack: function (iframeId) {
                    //调用品牌详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).brand_vue.Save()
                }
            })
        },
        //删除品牌名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("BrandList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("BrandList");  //刷新数据
                },
                close: true
            })
        },
        //修改品牌名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("BrandList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出品牌详情iframe窗
            PageCommon.ModalOpen({
                id: "BrandDetailUpdate",
                title: '品牌详细',
                width: "490px",
                height: "200px",
                url: "/BasicData/Brand/Detail",
                urlparameter: "keyValue=" + selectRow[0].Brand_Id,
                callBack: function (iframeId) {
                    //调用品牌详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).brand_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalOpen({
                id: "BrandDetail",
                title: '品牌列表',
                width: "270px",
                height: "250px",
                btn: ['导入'],
                url: '/CommonView/ImportExport/Import',
                urlparameter: "tableName=B_Brand&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        },
        //导出
        Export: function (obj) {
            vmBrand.Search();
            PageCommon.ModalOpen({
                id: "BrandDetail",
                title: '品牌列表',
                width: "270px",
                height: "250px",
                btn: ['导出'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=B_Brand&formID=searchForm&List_Id=BrandList&Menu_Id=M000012&SystemKey=BasicData",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //品牌设置
        Set: function () {

        },
        //查询品牌名称
        Search: function () {
            vmBrand.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000012", List_Id: "BrandList" });
        }
    }
});