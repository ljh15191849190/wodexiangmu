var searchData = {};
var vmLogisticsCarriage = new Vue({
    el: '#apps',
    data: {
        //承运商名称
        Carrier_Id: "",
        //商品名称
        Product_Id: "",
        //区域名称
        Area: "",
        //省名称
        Province: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000022",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //承运商下拉框查询条件
        carrierWhere: [],
        //承运商下拉框排序
        carrierOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        //承运商下拉框显示字段
        carrierResult: ["Carrier_Id", "Carrier_Name"],
        //商品下拉框查询条件
        productWhere: [],
        //商品下拉框排序
        productOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        //商品下拉框显示字段
        productResult: ["Product_Id", "Product_Name"],
        //区域联动条件
        linkage: null,
        //区域下拉框查询条件
        areaWhere: [{
            Field_Name: "Area_Layer",
            Value1: "1",
            Expression: "03",
            Module_Id: "BasicData"
        }],
        //区域下拉框排序
        areaOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        //区域下拉框显示字段
        areaResult: ["Geography_Id", "Geography_Name"],
        //省下拉框查询条件
        provenceWhere: [{
            Field_Name: "Area_Layer",
            Value1: "2",
            Expression: "03",
            Module_Id: "BasicData"
        }],
        //省下拉框排序
        provenceOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        //省下拉框显示字段
        provenceResult: ["Geography_Id", "Geography_Name"]
    },
    methods: {
        //新增物流运费
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //删除物流运费名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("LogisticsCarriageList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("LogisticsCarriageList");  //刷新数据
                },
                close: true
            })
        },
        //修改物流运费
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("LogisticsCarriageList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + selectRow[0].Logistics_Carriage_Id);
        },
        //物流费用的导入
        Import: function () {

        },
        //物流费用的导出
        Export: function () {

        },
        //物流费用设置
        Set: function () {

        },
        //根据区域查询省份
        ChangeArea: function (value) {
            vmLogisticsCarriage.linkage = {};
            vmLogisticsCarriage.linkage.Field_Name = "Parent_Geography_Id";
            vmLogisticsCarriage.linkage.Value1 = value;
        },
        //查询物流费用
        Search: function () {
            vmLogisticsCarriage.searchModel = $("#searchForm").GetSearchModel();
        }
    }
});