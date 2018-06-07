
var searchData = {};
var searchData1 = {};
var vmDataDictionary = new Vue({
    el: '#apps',
    data: {
        //对象名称
        Object_Name: '',
        //是否启用
        Is_Activate: "0",
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE",
        //表格查询条件
        searchModel: searchData,
        //详细表格查询条件
        searchModel1: { "Where_Parameter_List": [{}] },
        //表格查询url
        tableurl: 'Seach',
        //详细表查询url
        tableurl1: 'DetailSeach',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000014",
            System_Key: "SystemSet"
        },
        //详细表头查询条件
        ColumHeaderSeach1: {
            Menu_Id: "M000015",
            System_Key: "SystemSet"
        },
        //选择的行数据
        selectRow: [],
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
        //分组行点击事件
        GroupListRowClick: function (row) {
            if ($(row.node()).hasClass("selected")) {
                vmDataDictionary.searchModel1 = {}
            } else {
                vmDataDictionary.searchModel1 = {
                    "Where_Parameter_List": [{
                        Field_Name: "S_Data_Dictionary.Object_Type",
                        Condition_Value1: row.data().Object_Type,
                        Expression: "02",
                        Module_Id: "SystemSet",
                        Query_Type: "01"
                    }]
                }
            }
        },
        //新增
        New: function (obj) {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("DataDictionaryGroupList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("DataDictionaryGroupList");  //刷新数据
                    PageCommon.RefreshTablePage("DataDictionaryList");  //刷新列表数据
                },
                close: true
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("DataDictionaryGroupList");
            var selectDetailRow = PageCommon.GetTableSelectRow("DataDictionaryList");

            var rowColumn;
            if (selectRow.length ==1){
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
        //启用
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("DataDictionaryList");
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
                    PageCommon.RefreshTablePage("DataDictionaryList");
                }
            });
        },
        //禁用
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("DataDictionaryList");
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
                    PageCommon.RefreshTablePage("DataDictionaryList");
                }
            });
        },
        //设置
        Set: function (obj) {

        },
        //搜索
        Search: function (obj) {
            vmDataDictionary.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000014", List_Id: "DataDictionaryGroupList" });
        },
        mClear: function () {
            this.Object_Name = '';
            PageCommon.TableDefaultSort("DataDictionaryGroupList");
        }
    }
})