
    //产地主键
    var keyValue = PageCommon.Request("keyValue");
    var productionarea_vue = new Vue({
        el: '#app',
        data: {
            B_Product_Area: {
                //产地名称
                Product_Area_Name: "",
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
                        productionarea_vue.B_Product_Area = data;
                    }
                });
            }
        },
        methods: {
            //保存产地画面数据
            Save: function () {
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //提交数据
                PageCommon.SubmitForm({
                    url: "Save",
                    param: { productionarea: productionarea_vue.B_Product_Area },
                    success: function () {
                        //关闭iframe窗
                        PageCommon.ModalClose()
                        //刷新表格数据
                        PageCommon.CurrentWindow().PageCommon.RefreshTablePage("ProductionAreaList");
                    }
                });
            }
        }
    });
