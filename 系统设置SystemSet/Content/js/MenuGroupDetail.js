
//菜单主键
var keyValue = PageCommon.Request("keyValue");
var MenuGroupDetailDiv = new Vue({
    el: '#app',
    data: {
        S_Menu_Group: {
            //系统名称
            System_Id: '',
            //菜单分组名称
            Menu_Group_Name: '',
            //表示顺
            Show_Order: '',
            //备注
            Remark: '',
            //启用
            Is_Activate: '0'
        },
        //系统名称搜索下拉框查询条件
        systemwhere: [],
        //系统名称下拉框显示字段
        systemresult: ["System_Id", "System_Name"],
        //系统名称下拉框排序
        systemorder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }]
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    MenuGroupDetailDiv.S_Menu_Group = data;
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
                param: {
                    "menuGroup": MenuGroupDetailDiv.S_Menu_Group
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("MenuGroupList");
                }
            });
        }
    }
})
