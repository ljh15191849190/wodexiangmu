
//材质主键
var keyValue = PageCommon.Request("keyValue");
var material_vue = new Vue({
    el: '#app',
    data: {
        B_Material: {
            //材质名称
            Material_Name: "",
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
                    material_vue.B_Material = data;
                }
            });
        }
    },
    methods: {
        //保存材质画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { materials: material_vue.B_Material },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("MaterialsList");
                }
            });
        }
    }
});
