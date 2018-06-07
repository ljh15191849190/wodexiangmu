
    //事业部主键
    var keyValue = PageCommon.Request("keyValue");
    var businessdepartment_vue = new Vue({
        el: '#app',
        data: {
            B_Business_Department: {
                //事业部名称
                Business_Department_Name: "",
                //备注
                Remark: "",
                B_Business_Department_Pc_List: [],
            },
            //产品分类查询条件
            Product_ClassifyWhere: [{
                Field_Name: 'Parent_Product_Classify_Id',
                Expression: "03",
                Value1: ""
            }],
            //产品分类排序
            Product_ClassifyOrder: [{
                Field_Name: "Show_Order",
                Orderby: "ASC"
            }],
            //产品分类显示字段
            Product_ClassifyResult: ["Product_Classify_Id", "Product_Classify_Name"],

        },
        mounted: function () {
            if (keyValue) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: [keyValue] },
                    success: function (data) {
                        businessdepartment_vue.B_Business_Department = data;
                       
                    }
                });
            }
        },
        methods: {
            //保存事业部画面数据
            Save: function () {
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                if (!(businessdepartment_vue.B_Business_Department.B_Business_Department_Pc_List).length > 0) {
                    PageCommon.ShowMessageArrayRight("E2038", new Array("事业部"));
                    return;
                };
                //提交数据
                PageCommon.SubmitForm({
                    url: "Save",
                    param: { businessdepartment: businessdepartment_vue.B_Business_Department },
                    success: function () {
                        //关闭iframe窗
                        PageCommon.ModalClose()
                        //刷新表格数据
                        PageCommon.CurrentWindow().PageCommon.RefreshTablePage("BusinessDepartmentList");
                    }
                });
            }
        }
    });
