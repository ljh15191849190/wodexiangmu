 //主键
var keyValue = PageCommon.Request("keyValue");
var vmProductClass = new Vue({
    el: '#app',
    data: {
        B_Product_Classify: {
            //产品分类名称
            Product_Classify_Name: "",
            //产品简称
            Product_Short_Name:'',
            //父产品分类
            Parent_Product_Classify_Id:"",
            //备注
            Remark: ''
        },
         //产品分类下拉框显示字段
        ProductResult: ["Product_Classify_Id", "Product_Classify_Name"],
        //产品分类下拉框查询条件
        ProductSearch: ["Product_Classify_Id", "Product_Classify_Name"],
        //产品分类排序条件
        ProductOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //产品分类下拉框检索字段
        ProductField: ["Product_Classify_Id", "Product_Classify_Name"],
        ProductWhere: [{}],
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    vmProductClass.B_Product_Classify = data;
                }
            });
        }
    },
    methods: {
        onchange: function (val) {
            vmProductClass.B_Product_Classify.Product_Short_Name = val;
        },
        //保存产品分类画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "productClassify": vmProductClass.B_Product_Classify
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("ProductClassifyList");
                }
            });
        },
        TemplateSelection: function (data) {
            this.B_Product_Classify.Parent_Product_Classify = data.id;
        }
    }
})