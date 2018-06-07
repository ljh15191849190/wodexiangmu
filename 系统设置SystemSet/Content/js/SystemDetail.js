
//菜单主键
var keyValue = PageCommon.Request("keyValue");
var system_vue = new Vue({
    el: '#app',
    data: {
        S_System: {
            //系统ID
            System_Id: "",
            //系统名称
            System_Name: "",
            //系统简称
            System_short_Name: "",
            //系统图片
            System_Image: "",
            //表示顺
            Show_Order: "",
            //是否启用
            Is_Activate: "0",
            //备注
            Remark: ""
        }
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    system_vue.S_System = data;
                }
            });
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
                param: { system: system_vue.S_System },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("SystemList");
                }
            });
        }
    }
});
