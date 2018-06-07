
//主键
var keyValue = PageCommon.Request("keyValue");
var vmStorageRegionSingle = new Vue({
    el: '#app',
    data: {
        B_Storage_Region: {
            //仓库储区
            Storage_Region_Name: "",
            //仓库储区简称
            Storage_Region_Short_Name: "",
            //储区类型
            Storage_Region_Type: '',
            //仓库
            Storage_Id: '',
            Storage_Name: '',
            //仓库区域
            Storage_Area_Id: '',
            Storage_Area_Name:'',
            //备注
            Remark: ''
        },
        //仓库区域下拉查询条件
        StorageAreaWhere: [],
        //仓库区域排序条件
        StorageAreaOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库区域下拉显示字段
        StorageAreaResult: ["Storage_Area_Id", "Storage_Area_Name"],
        //储区类型下拉查询条件
        StorageRegionTypeWhere: [],
        //储区类型排序条件
        StorageRegionTypeOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //储区类型下拉显示字段
        StorageRegionTypeResult: ["Storage_Region_Id", "Storage_Region_Type"],
        
        //仓库区域联动条件
        linkage: null,
        Storageresult: ["Storage_Id", "Storage_Name"],
        filedSearch: ["Storage_Id", "Storage_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Storage_Id", "Storage_Name"],
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    vmStorageRegionSingle.B_Storage_Region = data;
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
                    "storageRegion": vmStorageRegionSingle.B_Storage_Region
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("StorageRegionList");
                }
            });
        },
        TemplateSelection: function (data) {
            vmStorageRegionSingle.linkage = {};
            vmStorageRegionSingle.linkage.Field_Name = "Storage_Id";
            vmStorageRegionSingle.linkage.Value1 = data.id;
        },
    }
})
