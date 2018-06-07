//主键
var keyValue = PageCommon.Request("keyValue");
var systemnotice_vue= new Vue({
    el: '#app',
    data: {
        S_System_Notice: {
            //系统ID
            System_Notice_Id: "",
            //系统名称
            Title: "",
            //备注
            Content: "",
            Is_Activate:"0",
            Department_Name: "",
            Department_Id: "",
        },
        editorCheckInfo: '',
        //系统下拉框排序
        departmentOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //系统下拉框显示字段
        departmentResult: ["Department_Id", "Department_Name"],
        //系统下拉框查询条件
        filedSearch: ["Department_Id", "Department_Name"],
        inputField: ["Department_Id", "Department_Name", "Department_Short_Name"],
        departmentWhere: []
    },
    mounted: function () {
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    //var model = JSON.parse(data);
                    systemnotice_vue.S_System_Notice = data;
                }
            });
        }
    },
    methods: {
        //保存系统画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput() || this.S_System_Notice.Content == '') {
                this.editorCheckInfo = '请输入公告内容！';
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { systemNotice: systemnotice_vue.S_System_Notice },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose();
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("SystemNoticeList");
                    //top.parent.PageCommon.RefreshTablePage("SystemNoticeList");
                }
            });
        }
    }
})
