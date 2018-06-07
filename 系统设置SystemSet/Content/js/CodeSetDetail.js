//编码设置主键
var keyValue = PageCommon.Request("keyValue");
var keyValue1 = PageCommon.Request("keyValue1");
var codeset_vue = new Vue({
    el: '#app',
    data: {
        S_Code_Set: {
            //系统编码ID
            System_Id: "",
            //表名
            Table_Name: "",
            //字段名称
            Field_Name: "",
            //系统编码
            System_Id: "",
            //新编码
            New_Code: "",
            //前缀
            Prefix: "",
            //长度
            Code_Length: "",
            //是否每天编号
            Is_Every_Date_Code: "0",
            //是否补零
            Is_Zero: "0",
            //是否加日期
            Is_Add_Date: "0",
            //是否加时间
            Is_Add_Time: "0",
            //启用
            Is_Activate: "0",
            //备注
            Remark: "",
            //主键值
            KeyValue: keyValue
        },
        //系统分组联动条件
        linkage: null,
        //系统下拉框排序
        systemOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //系统下拉框显示字段
        systemResult: ["System_Id", "System_Name"],
        //系统下拉框查询条件
        systemWhere: []
    },
    mounted: function () {
        if (keyValue && keyValue1) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue, keyValue1] },
                success: function (data) {
                    codeset_vue.S_Code_Set = data;
                }
            });
        }
    },
    methods: {
        //保存系统画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }

            PageCommon.SubmitForm({
                url: "Save",
                param: { codeset: codeset_vue.S_Code_Set },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("CodeSetList");
                }
            });
        },
        //返回列表画面
        Back: function () {
            window.location.href = PageCommon.SetUrl("List");
        },
        TemplateSelection: function (data) {
            this.Table_Name = data.Table_Name;
            this.linkage = "";
            this.linkage = data.id;
        }
    }
});

