
var searchData = {};
var vmUser = new Vue({
    el: '#apps',
    data: {
        //导入页面弹窗参数
        leadUrl: '/BasicData/Employee/Lead',
        //员工姓名
        Name: "",
        //账号
        User_Name: "",
        //启用
        Is_Activate: "",
        
        //创建日期
        Create_Time: '',
        //部门名称
        Department_Id: '',
        //职位
        Position_Id: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000006",
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
            
        });
    },
    methods: {
        New: function () {
            //window.location.href = "Detail"
            PageCommon.ModalOpen({
                id: 'UserlNew',
                title: '用户详细',
                width: "450px",
                height: "320px",
                url: '/SystemSet/User/Detail',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).user_vue.Save()
                }
            })
        },
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("UserList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("UserList");  //刷新数据
                },
                close: true
            })
        },
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("UserList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "UserUpdate",
                title: '用户详情',
                width: "450px",
                height: "320px",
                url: "/SystemSet/User/Detail",
                urlparameter:"keyValue="+ selectRow[0].User_Id,
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).user_vue.Save()
                }
            })
        },
       
        //禁用菜单
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("UserList");
            
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
                    PageCommon.RefreshTablePage("UserList");
                }
            });
        },
        //启用菜单
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("UserList");

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
                    PageCommon.RefreshTablePage("UserList");
                }
            });
        },
        Set: function () {

        },
        Setpassword: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("UserList");
            //调用共同方法
            PageCommon.SubmitDetialForm({
                errorCode: "E2017",
                prompt: PageCommon.GetCodeMsg('I3017'),
                param: selectRow,
                url: "SetPassword",
                success: function (data) {
                    PageCommon.RefreshTablePage("UserList");  //刷新数据
                }
            })
        },
        Search: function () {
            vmUser.searchModel = $("#searchForm").GetSearchModel();
        },
        //清空
        mClear: function () {
            
            vmUser.Name = "";
            vmUser.User_Name = "";
            vmUser.Is_Activate = "";
            vmUser.Create_Time = "";
            vmUser.Department_Id = "";
            vmUser.Position_Id = "";
       }
    }
});
