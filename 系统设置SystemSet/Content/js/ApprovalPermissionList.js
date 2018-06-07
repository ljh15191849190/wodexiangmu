
var app = new Vue({
    el: '#apps',
    data: {
        //系统名称
        System_Id: '',
        //员工名称
        Name: '',
        //层级名称
        tierName: '',
        //系统名称搜索下拉框查询条件
        systemwhere: [],
        //系统名称下拉框显示字段
        systemresult: ["System_Id", "System_Name"],
        //系统名称下拉框排序
        systemorder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //菜单表格查询条件
        searchModelMenu: {
            "Where_Parameter_List": [{
                Field_Name: "S_Menu.System_Id",
                Condition_Value1: "01",
                Expression: "02",
                Module_Id: "SystemSet",
                Query_Type: "01"
            }]
        },
        //菜单表格查询url
        tableurlMenu: 'SearchMenu',
        //菜单表头查询条件
        ColumHeaderSeachMenu: {
            Menu_Id: "M000027",
            System_Key: "SystemSet"
        },
        //层级表格查询条件
        searchModelLevel: {},
        //层级表格查询url
        tableurlLevel: 'SeachApprovalLevel',
        //层级表头查询条件
        ColumHeaderSeachLevel:
            {
                Menu_Id: "M000028",
                System_Key: "SystemSet"
            },
        //用户表格查询条件
        searchModelUser: {},
        //用户表格查询url
        tableurlUser: 'UserSeach',
        //用户表头查询条件
        ColumHeaderSeachUser: {
            Menu_Id: "M000045",
            System_Key: "SystemSet"
        },
        //层级表格查询条件
        searchModelCheckUser: {},
        //层级表格查询url
        tableurlCheckUser: 'UserSeach',
        //层级表头查询条件
        ColumHeaderSeachCheckUser:
                {
                    Menu_Id: "M000042",
                    System_Key: "SystemSet"
                },
        selectLevelRow: [],

    },
    mounted() {

    },
    methods: {
        Search: function () {
            app.searchModelMenu = $("#searchForm").GetSearchModel();
            
            app.searchModelUser = {
                "Pagination_Info": {
                    Conditional_Value1: ''
                }
            }

            app.searchModelLevel = {
                "Pagination_Info": {
                    Conditional_Value1: '',
                    Conditional_Value2: '',
                    Conditional_Value3: ''
                }
            }
        },
        //菜单表格
        MenuRowClick: function (row) {
            if ($(row.node()).hasClass("selected")) {
                //取消选中状态
                app.searchModelLevel = {
                    "Pagination_Info": {
                        Conditional_Value1: '',
                        Conditional_Value2: '',
                        Conditional_Value3: ''
                    }
                }
            } else {
                if (row.data()) {
                    //选中状态
                    app.searchModelLevel = {
                        "Pagination_Info": {
                            Conditional_Value1: row.data().Menu_Id,
                            Conditional_Value2: row.data().Menu_Group_Id,
                            Conditional_Value3: row.data().System_Id
                        }
                    }
                }
            }
        },
        //给选择角色表格添加选中样式
        rowcallback: function (row, data, index) {
            if (data.Is_Checked == 1) {
                $.fn.dataTable.Api('#CheckApprovalUserList').rows(index).select();
            }
        },
        //层级表格
        LevelRowClick: function (row) {
            if ($(row.node()).hasClass("selected")) {
                //取消选中状态
                app.searchModelUser = {
                    "Pagination_Info": {
                        Conditional_Value1: ''
                    }
                }
            } else {
                if (row.data()) {
                    //选中状态
                    app.searchModelUser = {
                        "Pagination_Info": {
                            Conditional_Value1: row.data().Approval_Level_Id
                        }
                    }
                }
            }
        },

        //添加用户
        NewUser: function () {
            var selectLevelRow = PageCommon.GetTableSelectRow("ApprovalLevelList");
            var selectMenuRow = PageCommon.GetTableSelectRow("ApprovalMenuList");
            //画面选择一条数据
            if (selectLevelRow.length != 1) {
                PageCommon.ShowMessageArrayRight("E2038", new Array("层级"));
                return;
            }
            PageCommon.ModalOpen({
                id: "Copy",
                title: '添加用户',
                width: "950px",
                height: "580px",
                url: '/SystemSet/ApprovalPermission/Users',
                urlparameter: 'Menu_Group_Id=' + selectMenuRow[0].Menu_Group_Id + '&Menu_Id=' + selectMenuRow[0].Menu_Id + '&System_Id=' + selectMenuRow[0].System_Id + "&Approval_Level_Id=" + selectLevelRow[0].Approval_Level_Id,
                callBack: function (iframeId) {
                    //获取选中数据
                    var selectRow = PageCommon.ChildrenFrames(iframeId).PageCommon.GetTableSelectRow("UserAuthLists");
                    if (selectRow.length == 0) {
                        PageCommon.ShowMessageRight("E2008");
                        return;
                    }
                    var userIds = [];
                    $.each(selectRow, function (index, item) {
                        userIds.push(this.User_Id);
                    });
                    //关闭iframe窗
                    PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();

                    //提交数据
                    PageCommon.SubmitForm({
                        url: "SaveApprovalUser",
                        param: {
                            "userIds": userIds, approvalLevel: PageCommon.GetTableSelectRow("ApprovalLevelList")[0]
                        },
                        success: function () {

                            PageCommon.RefreshTablePage("UserAuthListss")   //刷新数据
                        }
                    });
                }
            })
        },
        //删除用户
        DeleteUser: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("UserAuthListss");

            if (!(selectRow.length > 0)) {
                PageCommon.ShowMessageArrayRight("E2038", new Array("用户"));
                return;
            }

            for (var i = 0; i < selectRow.length; i++) {
                selectRow[i].Approval_Level_Id = PageCommon.GetTableSelectRow("ApprovalLevelList")[0].Approval_Level_Id;
            }


            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                prompt: "确定要删除该用户吗？",
                url: "DeleteApprovalUser",
                type:'0',
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("UserAuthListss")   //刷新数据

                },
                close: true
            })
        },
        //添加层级
        New: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ApprovalLevelList");
            var MenuSelectRow = PageCommon.GetTableSelectRow("ApprovalMenuList");
            var title = "添加层级";
            var parameter = "";
            var approvalLevel = {};
            if (selectRow.length != 1) {
                if (MenuSelectRow.length == 1) {
                    parameter = 'Menu_Group_Id=' + MenuSelectRow[0].Menu_Group_Id + '&Menu_Id=' + MenuSelectRow[0].Menu_Id + '&System_Id=' + MenuSelectRow[0].System_Id;

                } else {
                    PageCommon.ShowMessageArrayRight("E2038", new Array("审批层级"));
                    return;
                }

            } else {
                title = "插入层级";
                approvalLevel = selectRow[0];
                parameter = 'Menu_Group_Id=' + selectRow[0].Menu_Group_Id + '&Menu_Id=' + selectRow[0].Menu_Id + '&System_Id=' + selectRow[0].System_Id;
            }


            PageCommon.ModalOpen({
                id: "ApprovalLevelNew",
                title: title,
                width: "300px",
                height: "150px",
                url: "/SystemSet/ApprovalPermission/Detail",
                urlparameter: parameter,
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmApprovalLevel.Save(approvalLevel)
                }
            })
        },
        //修改层级
        Update: function () {
            //获取选中行数据
            var selectLevelRow = PageCommon.GetTableSelectRow("ApprovalLevelList");
            if (selectLevelRow.length != 1) {
                PageCommon.ShowMessageArrayRight("E2038", new Array("审批层级"));
                return;
            }
            PageCommon.ModalOpen({
                id: "ApprovalLevelUpdate",
                title: '修改层级',
                width: "340px",
                height: "200px",
                url: '/SystemSet/ApprovalPermission/Detail',
                urlparameter: 'Approval_Level_Id=' + selectLevelRow[0].Approval_Level_Id,
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmApprovalLevel.Save()
                }
            })
        },
        //删除层级
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ApprovalLevelList");
            if (selectRow.length != 1) {
                PageCommon.ShowMessageArrayRight("E2038", new Array("审批层级"));
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                prompt: "确定要删除层级【" + selectRow[0].Approval_Level_Name + "】吗？",
                url: "Delete",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("ApprovalLevelList")   //刷新数据
                    app.searchModelUser = {
                        "Pagination_Info": {
                            Conditional_Value1: ""
                        }
                    }
                },
                close: true
            })
        },

        //清空
        mClear: function () {
            app.System_Id = "";
            $('#System_Id').val(null).trigger('change');
        }
    }
})
