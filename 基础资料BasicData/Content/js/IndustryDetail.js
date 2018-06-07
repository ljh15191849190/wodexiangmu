
//主键
var keyValue = PageCommon.Request("keyValue");
var vmIndusty = new Vue({
    el: '#app',
    data: {
        B_Industry: {
            //行业名称
            Industry_Name: "",
            //行业简称
            Industry_Short_Name: '',
            //父行业
            Parent_Industry_Id: '',
                 //客户类型
            Customer_Type: "",
            
            //备注
            Remark: ''
        },
        //Industryresult: ["Industry_Id", "Industry_Name", "Parent_Industry_Id"],
        //filedSearch: ["Industry_Id", "Industry_Name", "Parent_Industry_Id"],
        //mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //inputField: ["Industry_Id", "Industry_Name", "Parent_Industry_Id"],
          //父行业下拉框显示字段
        IndustryResult: ["Industry_Id", "Industry_Name"],
        //父行业下拉框查询条件
        IndustrySearch: ["Industry_Id", "Industry_Name"],
        //父行业排序条件
        IndustryOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //父行业下拉框检索字段
        IndustryField: ["Industry_Id", "Industry_Name"],
        IndustryWhere: [{}],
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    vmIndusty.B_Industry = data;
                }
            });
        }
    },
    methods: {
        onchange: function (val) {
            vmIndusty.B_Industry.Industry_Short_Name = val;
        },
        //保存首页表示画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "Industry": vmIndusty.B_Industry
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("IndustryList");
                }
            });
        },
       
    }
})
