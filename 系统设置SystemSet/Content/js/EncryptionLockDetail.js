//主键
var keyValue = PageCommon.Request("keyValue");
var EncryptionLockDiv = new Vue({
    el: '#app',
    data: {
        S_Encryption_Lock: {
           //员工ID
            Employee_Id: '',
            //秘钥Code
            Secret_Code: '',
            //秘钥(secret_key)
            Secret_Key: '',
            //启用
            Is_Activate: '0'
        },
        readonly:false,
        Employeeresult: ["Employee_Id", "Name"],
        filedSearch: ["Employee_Id", "Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Employee_Id", "Name"]
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            var vm = this;
            vm.readonly = true;
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { "keyValue": [keyValue] },
                success: function (data) {
                    EncryptionLockDiv.S_Encryption_Lock = data;
                }
            });
        } else {
            var vm = this;
            vm.readonly = false;
        }
    },
    methods: {
        //保存系统画面数据
        Save: function () {
            
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "encryptionLock": EncryptionLockDiv.S_Encryption_Lock,
                    "keyValue": [keyValue]
                },
                success: function () {
                    
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("EncryptionLockList");
                }
            });
        },
        TemplateSelection: function (data) {
            this.S_Encryption_Lock.Employee_Id = data.Employee_Id;
            this.S_Encryption_Lock.Name = data.Name;
            
        }
    }
})
