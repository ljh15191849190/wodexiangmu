var searchData = {};
var vmTopmenu = new Vue({
    el: '#apps',
    data: {
        //上菜单名称
        Top_Menu_Name: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000007",
            System_Key: "SystemSet"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE"
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
        //选择的行数据
        GetSelectRow: function (datas) {
            this.selectRow = datas;
        },
        New: function () {
            PageCommon.ModalOpen({
                id: "Top_MenuDetailNew",
                title: '工具栏详细',
                width: "500px",
                height: "250px",
                url: '/SystemSet/TopMenu/Detail',               
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).top_menu_vue.Save();
                }
            })
        },
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("TopMenuList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("TopMenuList");  //刷新数据
                },
                close: true
            })
        },
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("TopMenuList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            PageCommon.ModalOpen({
                id: "Top_MenuDetailNew",
                title: '工具栏详细',
                width: "500px",
                height: "250px",
                url: "/SystemSet/TopMenu/Detail",
                urlparameter:"keyValue=" + selectRow[0].Top_Menu_Id,
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).top_menu_vue.Save();
                }
            })
        },
        //启用菜单
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("TopMenuList");
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
                    PageCommon.RefreshTablePage("TopMenuList");
                }
            });
        },
        //禁用菜单
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("TopMenuList");
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
                    PageCommon.RefreshTablePage("TopMenuList");
                }
            });
        },
        Search: function (obj) {
            vmTopmenu.searchModel = $("#searchForm").GetSearchModel();
        }
    }
})
