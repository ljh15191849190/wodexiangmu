var RequestValue = PageCommon.Request();
//系统key
if (RequestValue.system_key) {
    var system_key = RequestValue.system_key
}
var vmEmployee = new Vue({
    el: '#app',
    data: {
        //员工姓名
        Name: "",
        //员工性别
        Sex: "",
        Query_Code:'',
        //部门id
        Department_Name: "",
        //事业部id
        Business_Department_Id: "",
        //员工出生日期
        Birthday: "",
        //员工入职日期
        Entry_Date: "",
        //员工离职日期
        Leave_Date: "",
        //员工手机
        Cellphone: "",
        Create_Time: "",
        //员工地址
        Home_Address: "",
        IsActiveDictionaryKey: "IS_ACTIVATE",
        //性别
        SexDictionaryKey: "SEX",
        //事业部下拉框排序
        business_DepartmentOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //事业部下拉框显示字段
        business_DepartmentResult: ["Business_Department_Id", "Business_Department_Name"],
        //事业部下拉框查询条件
        business_DepartmentWhere: [],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "BusinessCommon"
        },
        //表格查询url
        tableUrl: "EmployeeSeach",
        //表格查询条件
        searchModel: {
            Pagination_Info: {
                System_Key: system_key
            },
        },
    },
    methods: {
        //查询部门名称
        Search: function () {
            vmEmployee.searchModel = $("#searchForm").GetSearchModel({
                System_Key: system_key
            });
        },
        mClear: function () {
            this.Name = '';
            this.Query_Code = '';
            this.Sex = '';
            this.Department_Name = '';
            $('#Sex').val(null).trigger('change');
            $('#Department_Id').val(null).trigger('change');
            $('#Business_Department_Id').val(null).trigger('change');
            this.Create_Time = '';
            this.Birthday = '';
            this.Entry_Date = '';
            this.Leave_Date = '';
            this.Cellphone = '';
            this.Home_Address = '';
        }
    }
});
