
var searchData = {};
var vmClone = new Vue({
    el: '#apps',
    data: {
        //账号
        User_Name: '',
        //用户姓名
        Name: '',
        //部门
        Department_Id: '',
        Departmentresult: ["Department_Id", "Department_Name"],
        filedSearch: ["Department_Id", "Department_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Department_Id", "Department_Name"],
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: '/UserPermission/SeachUser',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000044",
            System_Key: "SystemSet"
        },
        //用户ID
        uerId: [],

    },
    mounted: function () {

    },
    methods: {
        //查询
        Search: function (obj) {
            vmClone.searchModel = $("#searchForm").GetSearchModel();
            //app["trrid" + app.selectTabsid] = ['', app.selectTabsid];
        },
        //清空
        mClear: function () {
            vmClone.User_Name = "";
            vmClone.Name = "";
            vmClone.Department_Id = "";
            $('#DepartmentDetail_Id').val(null).trigger('change');

        },
        //保存系统画面数据
        Save: function () {
            var selectRow = PageCommon.GetTableSelectRow("UserAuthLists");
            //画面选择一条数据
            if (selectRow.length == 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            vmClone.uerId = [];
            var parenrId = PageCommon.CurrentWindow().app.selectRow_UserId;
            vmClone.uerId.push(parenrId);
            $("#UserAuthLists tr").each(function () {
                if ($(this).hasClass("selected")) {
                    var selectRow = $.fn.dataTable.Api("#UserAuthLists").row(this).data();
                    vmClone.uerId.push(selectRow.User_Id);
                }
            });

            //提交数据
            PageCommon.SubmitForm({
                url: "ClonePermission",
                param: {
                    "userIds": vmClone.uerId,
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose();
                }
            });


        },
    }
})
