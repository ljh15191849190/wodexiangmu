
//主键
var keyValue = PageCommon.Request("keyValue");
var vmStorageAreaSingle = new Vue({
    el: '#app',
    data: {
        B_Storeage_Area: {
            //仓库Id
            Storeage_Id: "",
            //仓库名称
            Storeage_Name:"",
            //区域名称
            Storeage_Area_Name: '',
            //区域简称
            Storeage_Area_Short_Name: '',
            //备注
            Remark: ''
        },
        Storageresult: ["Storeage_Id", "Storeage_Name"],
        filedSearch: ["Storeage_Id", "Storeage_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Storeage_Id", "Storeage_Name"],
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    vmStorageAreaSingle.B_Storeage_Area = data;
                }
            });
        }
    },
    methods: {
        //保存仓库区域画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "storageArea": vmStorageAreaSingle.B_Storeage_Area
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("StoreageAreaList");
                }
            });
        },
        TemplateSelection: function (data) {
            this.B_Storeage_Area.Storeage_Id = data.id;
            this.B_Storeage_Area.Storeage_Name = data.Storeage_Name || data.text;
        }
    }
})
