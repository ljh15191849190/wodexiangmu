
var searchData = {};
var vmStatusDictionary = new Vue({
    el: '#apps',
    data: {
        //对象名称
        Group_Name: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000035",
            System_Key: "SystemSet"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000036",
            System_Key: "SystemSet"
        },
        //表格查询url
        TableUrl: "DetailSeach",
        //表格查询条件
        SearchModel: { "Where_Parameter_List": [{}] }
    },
    mounted:function(){
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
        //分组行点击事件
        GroupListRowClick: function (row) {          
            if ($(row.node()).hasClass("selected")) {
                vmStatusDictionary.SearchModel = {}
            } else {
                vmStatusDictionary.SearchModel = {
                    "Where_Parameter_List": [{
                        Field_Name: "S_Status_Dictionary.Object_Type",
                        Condition_Value1: row.data().Object_Type,
                        Expression: "02",
                        Module_Id: "SystemSet",
                        Query_Type: "01"
                    }]
                }
            }
        },
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        Search: function (obj) {
            vmStatusDictionary.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000035", List_Id: "StatusDictionaryGroupList" });
        },
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("StatusDictionaryGroupList");
            var selectDetailRow = PageCommon.GetTableSelectRow("StatusDictionaryList");

            var rowColumn;
            if (selectRow.length == 1) {
                rowColumn = selectRow[0].Object_Type;
            } else if (selectDetailRow.length == 1) {
                rowColumn = selectDetailRow[0].Object_Type;
            } else {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + rowColumn);
        },
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("StatusDictionaryGroupList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("StatusDictionaryGroupList");  //刷新数据
                    PageCommon.RefreshTablePage("StatusDictionaryList");  //刷新数据
                },
                close: true
            })
        },
        //启用
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("StatusDictionaryList");
            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }
            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index, obj) {
                if (obj.Is_Activate == "1") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 0;
                    newSelectRow.push(newobj);
                }
            });
            if (newSelectRow.length == 0) return;
            //调用提交数据
            PageCommon.SubmitForm({
                url: "UpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("StatusDictionaryList");
                }
            });
        },
        //禁用
        Disable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("StatusDictionaryList");
            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }
            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index, obj) {
                if (obj.Is_Activate == "0") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 1;
                    newSelectRow.push(newobj);
                }
            });
            if (newSelectRow.length == 0) return;

            //调用提交数据
            PageCommon.SubmitForm({
                url: "UpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("StatusDictionaryList");
                }
            });
        },
        mClear: function () {
            this.Group_Name = '';
            PageCommon.TableDefaultSort("StatusDictionaryGroupList");
        }
    }
});

