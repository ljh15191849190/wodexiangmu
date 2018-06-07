//部门主键
var keyValue = PageCommon.Request("keyValue");
var unit_vue = new Vue({
    el: '#app',
    data: {
        B_Unit: {
            //单位名称
            Unit_Name: "",
            //单位类型
            Unit_Type: "",
            //备注
            Remark: ""
        },
        //单位类型Key
        UnitTypeDictionaryKey: "UNIT_TYPE"
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    unit_vue.B_Unit = data;
                }
            });
        }
    },
    methods: {
        //保存部门画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { unit: unit_vue.B_Unit },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("UnitList");
                }
            });
        }
    }
});
