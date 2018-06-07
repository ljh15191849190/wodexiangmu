
//主键
var keyValue = PageCommon.Request("keyValue");
var vmCompany = new Vue({
    el: '#app',
    data: {
        B_Company: {
            //公司名称
            Company_Name: "",
            //公司简称
            Company_Short_Name: '',
            //父公司
            Parent_Company_Id: '',
            //公司电话
            Company_Tel:'',
            //发票抬头
            Invoice: '',
            //公司地址
            Company_Address:'',
            //备注
            Remark: ''
        },
        //Companyresult: ["Company_Id", "Company_Name", "Parent_Company_Id"],
        //filedSearch: ["Company_Id", "Company_Name", "Parent_Company_Id"],
        //mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //inputField: ["Company_Id", "Company_Name", "Parent_Company_Id"]
        //公司下拉框显示字段
        CompanyResult: ["Company_Id", "Company_Name"],
        //公司下拉框查询条件
        CompanySearch: ["Company_Id", "Company_Name"],
        //公司排序条件
        CompanyOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //公司下拉框检索字段
       CompanyField: ["Company_Id", "Company_Name"],
        CompanyWhere: [{}],
        },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    vmCompany.B_Company = data;
                }
            });
        }
       
    },
    methods: {

        //保存地理关系画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "company": vmCompany.B_Company
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("CompanyList");
                }
            });
        },
        TemplateSelection: function (data) {
            this.B_Company.Parent_Company_Id = data.id;
        }
    }
})

