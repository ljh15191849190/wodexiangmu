
var searchData = {};
var vmSystem = new Vue({
    el: '#apps',
    data: {
        //系统名称
        System_Name: "",
        //系统简称
        System_short_Name: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000011",
            System_Key: "SystemSet"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData
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
        //新增系统名称
        New: function () {
            //弹出系统管理详情iframe窗
            PageCommon.ModalOpen({
                id: "SystemDetailNew",
                title: '系统详细',
                width: "500px",
                height: "250px",
                url: '/SystemSet/System/Detail',             
                callBack: function (iframeId) {
                    //调用系统管理详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).system_vue.Save();
                }
            })
        },
        //删除系统名称
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SystemList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("SystemList");  //刷新数据
                },
                close: true
            })
        },
        //修改系统名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SystemList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }   
            //弹出系统管理详情iframe窗
            PageCommon.ModalOpen({
                id: "SystemDetailUpdate",
                title: '系统详细',
                width: "500px",
                height: "250px",
                url: "/SystemSet/System/Detail",
                urlparameter:"keyValue=" + selectRow[0].System_Id,
                callBack: function (iframeId) {
                    //调用系统管理详情页保存方法           
                    PageCommon.ChildrenFrames(iframeId).system_vue.Save()
                }
            })
        },
        //禁用系统名称
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("SystemList");

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
                    //刷新表格数据
                    PageCommon.RefreshTablePage("SystemList");
                }
            });
        },
        //启用系统名称
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("SystemList");

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
                    //刷新表格数据
                    PageCommon.RefreshTablePage("SystemList");
                }
            });
        },
        //系统设置
        Set: function () {

        },
        //查询系统名称
        Search: function () {
            vmSystem.searchModel = $("#searchForm").GetSearchModel();
        }
    }
});
