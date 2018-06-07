//部门主键
var keyValue = PageCommon.Request("keyValue");

var department_vue = new Vue({
    el: '#app',
    data: {
        B_Department: {
            //部门ID
            Department_Id: "",
            //部门名称
            Department_Name: "",
            //部门简称             
            Department_Short_Name: "",
            //父部门
            Parent_Department_Id: "",
            //父部门
            Parent_Department_Name: "",
            //备注
            Remark: ""
        },
    },
    mounted: function () {
        //this.B_Department.Parent_Department_Id = "007"
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    department_vue.B_Department = data;
                    
                }
            });
        } else {
            this.B_Department.Parent_Department_Id = PageCommon.CurrentWindow().vmDepartment.chartmodel.Department_Id;
            this.B_Department.Parent_Department_Name = PageCommon.CurrentWindow().vmDepartment.chartmodel.Department_Name;
        }
    },
    methods: {
        onchange: function (val) {
            department_vue.B_Department.Department_Short_Name = val;
        },
        //保存部门画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { department: department_vue.B_Department },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().vmDepartment.Getdata();
                    

                }
            });
        },
        TemplateSelection: function (data) {
            this.B_Department.Parent_Department_Id = data.id;
            //console.log(data)
        }
    }
});
