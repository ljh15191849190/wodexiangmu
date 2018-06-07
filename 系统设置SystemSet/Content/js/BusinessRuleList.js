
var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //业务规则对象
        Business_Rule_Object: '',
        //菜单名称
        Menu_Id: '',
        //标题
        Title:'',
        //是否启用
        Is_Activate: "",
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000016",
            System_Key: "SystemSet"
        },
        childSearchModel: [
                {
                    Field_Name: ["S_Business_Rule_Detail.Business_Rule_Object"],
                    Parent_Key: ["Business_Rule_Object"],
                    Child_List: 'BusinessRuleDetailList',
                    Detail_Seach: 'DetailSeach',
                    Default_Child: "true",
                }
            ],
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach',
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE",
         //菜单查询条件
        Menuresult: ["Menu_Id", "Menu_Name"],
        //filedSearch: ["Menu_Id", "Menu_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //inputField: ["Menu_Id", "Menu_Name"],
        mainWhere: [{
            Field_Name: "Menu_Layer",
            Value1: "0",
            Expression: "04",
            Module_Id: "SystemSet"
        }]
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
            var selectRow = PageCommon.GetTableSelectRow("BusinessRuleList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("BusinessRuleList");  //刷新数据
                },
                close: true,               
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("BusinessRuleList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + selectRow[0].Business_Rule_Object);
        },
       
        //启用
        Enable: function (obj) {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("BusinessRuleList");
            console.log(selectRow);
            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }

            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index,obj) {
                if (obj.Is_Activate == "1") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 0;
                    newSelectRow.push(newobj);
                }

            });
            if (newSelectRow.length == 0) return;

            //调用提交数据
            PageCommon.SubmitForm({
                url: "BusinessRuleUpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("BusinessRuleList");
                }
            });
        },
        //禁用
        Dissable: function (obj) {
            ///获取选中行
            var selectRow = PageCommon.GetTableSelectRow("BusinessRuleList");
            console.log(selectRow);
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
                url: "BusinessRuleUpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("BusinessRuleList");
                }
            });
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel();
        },
        TemplateSelection: function (data) {
            this.Menu_Id = data.Menu_Id;
        },
        mClear: function () {
            //菜单名称
            this.Menu_Id = '';
            $('#Menu_Id').val(null).trigger('change');
            //标题
            this.Title =  '';
            //是否启用
            this.Is_Activate = '';
        }
    }
})

