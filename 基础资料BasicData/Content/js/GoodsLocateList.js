
var searchData = {};
var vmGoodsLocate = new Vue({
    el: '#apps',
    data: {
        //货位名称
        Goods_Locate_Name: "",
        Create_Time: "",
        //货位类型
        Goods_Locate_Type: "",
        //仓库id
        Storeage_Id: "",
        //仓库区域id
        Storeage_Area_Id: "",
        //仓库储区id
        Storeage_Region_Id: "",
        //货位类型
        GoodsLocateTypeDictionaryKey: "GOODS_LOCATE_TYPE",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000023",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
                //仓库ID下拉框排序
        StoreageOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库ID下拉框显示字段
        StoreageResult: ["Storeage_Id", "Storeage_Name"],
        //仓库ID下拉框查询条件
        StoreageWhere: [],

        //仓库区域ID下拉框排序
        StoreageAreaOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库区域ID下拉框显示字段
        StoreageAreaResult: ["Storeage_Area_Id", "Storeage_Area_Name"],
        //仓库区域ID下拉框查询条件
        StoreageAreaWhere: [],

        //仓库储区ID下拉框排序
        StoreageRegionOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库储区ID下拉框显示字段
        StoreageRegionResult: ["Storeage_Region_Id", "Storeage_Region_Name"],
        //仓库储区ID下拉框查询条件
        StoreageRegionWhere: [],
     
    },

    methods: {
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //删除员工
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("GoodsLocateList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("GoodsLocateList");  //刷新数据
                },
                close: true
            })
        },
        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("GoodsLocateList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + selectRow[0].Goods_Locate_Id);
        },
       
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Goods_Locate",
                systemKey: "BasicData",
                vm: vmGoodsLocate
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Goods_Locate',
                menu_Id: 'M000023',
                list_Id: 'GoodsLocateList',
                systemKey: 'BasicData',
                vm: vmGoodsLocate
            })
        },
        //部门设置
        Set: function () {

        },
        //查询部门名称
        Search: function () {
            vmGoodsLocate.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000023", List_Id: "GoodsLocateList" });
        },
        mClear: function () {
            this.Goods_Locate_Name = '';
            $('#Goods_Locate_Type').val(null).trigger('change');
            $('#Storeage_Id').val(null).trigger('change');
            this.Storeage_Id = '';
            $('#Storeage_Area_Id').val(null).trigger('change');
            $('#Storeage_Region_Id').val(null).trigger('change');
    }
    }
});