//运输方式主键
var keyValue = PageCommon.Request("keyValue");
var transportationWay_vue = new Vue({
    el: '#app',
    data: {
        B_Transportation_Way: {
            //运输方式名称
            Transportation_Way_Name: "",
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
                    transportationWay_vue.B_Transportation_Way = data;
                }
            });
        }
    },
    methods: {
        //保存运输方式画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { transportationWay: transportationWay_vue.B_Transportation_Way },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("TransportationWayList");
                }
            });
        }     
    }
});
