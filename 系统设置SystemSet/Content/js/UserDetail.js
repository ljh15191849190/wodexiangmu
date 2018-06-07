//用户主键
var keyValue = PageCommon.Request("keyValue");
var user_vue = new Vue({
    el: '#app',
    data: {
        S_User: {
            ////用户头像
            //Staff_Image: "",
            //员工id
            Name:"",
            Employee_Id: "",
            //账号
            User_Name: "",
            //部门
            Department_Id:'',
            //职位
            Position_Id: '',
            //是否启用
            Is_Activate: "0",
            File_Dir: null,
            File_Model_List: [{
                Base64_Imgage:''
            }]
        },
        aaa:'',
        //表名联动条件
        linkage: null,
        Employeeresult: ["Employee_Id", "Name"],
        filedSearch: ["Employee_Id", "Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Employee_Id", "Name"],

        Positionresult: ["Position_Id", "Position_Name"],
        PositionfiledSearch: ["Position_Id", "Position_Name"],
        PositioninputField: ["Position_Id", "Position_Name"],

        Departmentresult: ["Department_Id", "Department_Name"],
        DepartmentfiledSearch: ["Department_Id", "Department_Name"],
        DepartmentinputField: ["Department_Id", "Department_Name"],
        //角色查询条件
        Employeeresult1: ["Employee_Id", "Name"],
        filedSearch1: ["Employee_Id", "Name"],
        mainOrderBy1: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField1: ["Employee_Id", "Name"]
    },
    mounted: function () {
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    
                    user_vue.S_User = data;
                }
            });
        }

    },
    methods: {
        //选择员工
        TemplateSelectionEmployee: function (data) {
            if (data) {
                user_vue.S_User.Department_Id = data.Department_Id;
                user_vue.S_User.Position_Id = data.Position_Id;
            } else {
                user_vue.S_User.Department_Id = '';
                user_vue.S_User.Position_Id = '';
            }
        },
        //保存系统画面数据
        Save: function () {
            
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            PageCommon.SubmitForm({
                url: "Save",
                param: { user: user_vue.S_User },
                close: false,
                type: '1',
                success: function (data) {

                    //获取父窗体
                    var ParentWindow = PageCommon.CurrentWindow();
                    //刷新表格数据
                    ParentWindow.PageCommon.RefreshTablePage("UserList");

                    PageCommon.ModalClose();
                    //打开分配角色权限窗口
                    //ParentWindow.PageCommon.ModalOpen({
                    //    id: "UserPermissionUpdate",
                    //    title: user_vue.S_User.User_Name + "--权限分配",
                    //    width: "700px",
                    //    height: "560px",
                    //    url: "/SystemSet/UserPermission/List",
                    //    urlparameter: "keyValue=" + data.Result_Model.User_Id,
                    //    btn: ["关闭"],
                    //    btnid: ["btnClose"],
                    //    btnclass: ['btn btn-danger'],
                    //    callBack: function (iframeId) {
                    //        ParentWindow.PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                    //    }
                    //})
                }
            });
        },

    }
})
