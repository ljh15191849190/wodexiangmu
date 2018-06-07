
var searchData = {};
var vmTableField = new Vue({
    el: '#apps',
    data: {
        //表名
        Table_Name: '',
        //表名称下拉查询条件
        Tablewhere: [],
        //表名称下拉框排序
        Tableorder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        filedSearch: ["Table_Name"],
        //表名称下拉框显示字段
        Tableresult: ["Table_Name"],
        //字段名
        Field_Name: '',
        //字段表示名
        Field_Show: '',
        //字段类型
        Field_Type: '',
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000034",
            System_Key: "SystemSet"
        },
        //表名联动条件
        linkage: null
    },
        mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //新增
        New: function (obj) {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomTableFieldList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("CustomTableFieldList");  //刷新数据
                },
                close: true
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomTableFieldList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue1=" + selectRow[0].DataBase_Name + "&keyValue2=" + selectRow[0].Table_Name + "&keyValue3=" + selectRow[0].Field_Name);
        },
        
        //设置
        Setit: function (obj) {

        },
        //查询
        Search: function (obj) {
            vmTableField.searchModel = $("#searchForm").GetSearchModel();
        },
        TemplateSelection: function (data) {
            if (data) {
                this.linkage = data.id;
            } else {
                this.linkage = "";
            }
        }
    }
})
