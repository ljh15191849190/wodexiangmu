//菜单分组id
var Menu_Group_Id = PageCommon.Request("Menu_Group_Id");
//菜单id
var Menu_Id = PageCommon.Request("Menu_Id");
//系统id
var System_Id = PageCommon.Request("System_Id");
//层级id
var Approval_Level_Id = PageCommon.Request("Approval_Level_Id");

//主键
var keyValue = PageCommon.Request("keyValue");
var vmApprovalLevel = new Vue({
    el: '#app',
    data: {
        S_Approval_Level: {
            //层级名称
            Approval_Level_Name: '',
            //菜单分组id
            Menu_Group_Id: Menu_Group_Id,
            //菜单id
            Menu_Id: Menu_Id,
            //系统id
            System_Id: System_Id,
            //层级id
            Approval_Level_Id: Approval_Level_Id
        }
    },
    mounted: function () {
        if (Approval_Level_Id) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [Approval_Level_Id] },
                success: function (data) {
                    vmApprovalLevel.S_Approval_Level = data;
                }
            });
        }
    },
    methods: {
        //保存系统画面数据
        Save: function (selectRow) {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            
            //提交数据
            PageCommon.SubmitForm({
                url: "SaveApprovalLevel",
                param: { InsertApprovalLevel: vmApprovalLevel.S_Approval_Level, approvalLevel:selectRow},
                success: function (data) {
                    //关闭iframe窗
                    PageCommon.ModalClose();
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("ApprovalLevelList");
                    
                   
                }
            });
        }
    }
})
