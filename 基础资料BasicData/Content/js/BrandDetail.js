//部门主键
var keyValue = PageCommon.Request("keyValue");
var brand_vue = new Vue({
    el: '#app',
    data: {
        B_Brand: {
            //品牌名称
            Brand_Name: "",
            //价格级别
            Price_Grade: "",
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
                    brand_vue.B_Brand = data;
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
                param: { brand: brand_vue.B_Brand },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("BrandList");
                }
            });
        }     
    }
});
