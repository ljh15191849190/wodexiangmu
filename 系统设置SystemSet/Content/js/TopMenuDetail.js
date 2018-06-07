//菜单主键
var keyValue = PageCommon.Request("keyValue");
var top_menu_vue = new Vue({
    el: '#app',
    data: {
        S_Top_Menu: {
            //上菜单ID
            Top_Menu_Id: "",
            //上菜单名称
            Top_Menu_Name: "",
            //上菜单图片
            Top_Menu_Image: "",
            //表示顺
            Show_Order: "",
            //是否激活
            Is_Activate: "0",
            //备注
            Remark: ""
        }
    },
    mounted: function () {
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    top_menu_vue.S_Top_Menu = data;
                }
            });
        }
    },
    methods: {
        //保存上菜单画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save",
                param: { topmenu: top_menu_vue.S_Top_Menu },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("TopMenuList");
                }
            });
        },
        //返回列表画面
        Back: function () {
            window.location.href = PageCommon.SetUrl("List");
        }
    }
})
