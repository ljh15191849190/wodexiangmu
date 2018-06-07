
var vmEmployee = new Vue({
    el: '#apps',
    data: {
        Delete_Reason:'',
        Query_Code:"",
        //员工姓名
        Name: "",
        //员工性别
        Sex: "",
        //部门
        Department_Name: "",
        //事业部id
        Business_Department_Id:"",
        //员工出生日期
        Birthday: "",
        //员工入职日期
        Entry_Date: "",
        //员工离职日期
        Leave_Date: "",
        //员工手机
        Cellphone: "",
        Create_Time:"",
        //员工地址
        Home_Address: "",
        Position_Id:"",
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
            Menu_Id: "M000014",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {}
    },

    methods: {
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //删除员工
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("EmployeeList");
            //画面选择一条数据
            if (selectRow.length == 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: "0",
                success: function () {
                    PageCommon.RefreshTablePage("EmployeeList");  //刷新数据
                },
                close: true
            })
          
        },
        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("EmployeeList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转+ "&keyValue2=" + selectRow[0].Table_Name 
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Employee_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Employee",
                systemKey: "BasicData",
                vm: vmEmployee
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Employee',
                menu_Id: 'M000014',
                list_Id: 'EmployeeList',
                systemKey: 'BasicData',
                vm: vmEmployee
            })
        },
        //部门设置
        Set: function () {

        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("EmployeeList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Employee_Id +'&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //查询部门名称
        Search: function () {
            vmEmployee.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000014", List_Id: "EmployeeList" });
        },
        mClear: function () {
            this.Name = '';
            this.Sex = '';
            $('#Department_Id').val(null).trigger('change');
            $('#Business_Department_Id').val(null).trigger('change');
            this.Birthday = '';
            this.Entry_Date = '';
            this.Leave_Date = '';
            this.Cellphone = '';
            this.Home_Address = '';
            this.Position_Id='';
    }
    }
});