var searchData = {};
var vmsystemparameter = new Vue({
    el: '#apps',
    data: {
        //参数对象
        System_Parameter_Object: "",
        //系统参数标题KC
        Parameter_Title:"",
        //启用
        Is_Activate:"",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000037",
            System_Key: "SystemSet"
        },
        childSearchModel: [
                {
                    Field_Name: ["S_System_Parameter_Detail.System_Parameter_Object"],
                    Parent_Key: ["System_Parameter_Object"],
                    Child_List: 'SystemParameterDetailList',
                    Detail_Seach: 'DetailSeach',
                    Default_Child: "true",
                }
            ],
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //选择的行数据
        selectRow: [],
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE"
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
        //选择的行数据
        GetSelectRow: function (datas) {
            this.selectRow = datas;
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SystemParameterList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("SystemParameterList");  //刷新数据
                },
                close: true
            })
        },
        //详细画面更新跳转
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SystemParameterList");
            console.log(selectRow)
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + selectRow[0].System_Parameter_Object);
        },
        Set: function () {

        },
        //禁用菜单
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("SystemParameterList");
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
                    PageCommon.RefreshTablePage("SystemParameterList");
                }
            });
        },
        //启用菜单
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("SystemParameterList");
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
                    PageCommon.RefreshTablePage("SystemParameterList");
                }
            });
        },
        Search: function () {
            vmsystemparameter.searchModel = $("#searchForm").GetSearchModel();
        },
        mClear: function () {
            //参数对象
            this.System_Parameter_Object="";
            //系统参数标题KC
            this.Parameter_Title="";
            //启用
            this.Is_Activate="";
        }
    }
});

