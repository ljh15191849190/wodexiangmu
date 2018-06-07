//主键
var keyValue = PageCommon.Request("keyValue");
var HomeShowDiv = new Vue({
    el: '#app',
    data: {
        S_Home_Show: {
            //表示名称
            Home_Show_Name: "",
            //是否启用
            Is_Activate: '0',
            //表示顺
            Show_Order: '',
            //备注
            Remark: ''
        }
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    HomeShowDiv.S_Home_Show = data;
                }
            });
        }
    },
    methods: {
        //保存首页表示画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "homeShow": HomeShowDiv.S_Home_Show
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("HomeShowList");
                }
            });
        }
    }
})
