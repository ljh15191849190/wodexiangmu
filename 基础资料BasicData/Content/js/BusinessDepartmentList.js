
var vmBusinessDepartment = new Vue({
    el: '#apps',
    data: {
        //事业部名称
        Business_Department_Name: "",
        Create_Time: "",
        Product_Classify_Name:"",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {}
    },
    mounted:function(){
        this.linkClick();
    },
    methods: {
        linkClick: function () {
            $("#BusinessDepartmentList").on("click", "tr td a", function () {
                var index = $(this).parents("tr").index();
                var selectRow = $.fn.dataTable.Api("#BusinessDepartmentList").row(index).data();
                var Department_Name = "事业部名称";
                var Department_NameDetail = $(this).text();
                var Field_Name = "B_Employee.Business_Department_Id";
                //弹出部门员工详情iframe窗
                PageCommon.ModalOpen({
                    id: "EmployeeListDetail",
                    title: '员工信息',
                    width: "900px",
                    height: "700px",
                    url: '/BasicData/Employee/EmployeeListDetail',
                    urlparameter: "keyValue1=" + selectRow.Business_Department_Id + "&keyValue2=" + Department_Name + "&keyValue3=" + Department_NameDetail + "&keyValue4=" + Field_Name,
                    btn: [''],
                    btnclass: [''],
                    callBack: function (iframeId) {
                        //关闭弹窗
                        PageCommon.CurrentWindow().PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                    }
                })
            })
        },
        //新增事业部
        New: function () {
            //弹出事业部详情iframe窗
            PageCommon.ModalOpen({
                id: "BusinessDepartmentDetailNew",
                title: '事业部详细',
                width: "810px",
                height: "450px",
                url: '/BasicData/BusinessDepartment/Detail',
                callBack: function (iframeId) {
                    //调用事业部详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).businessdepartment_vue.Save()
                }
            })
        },
        //删除事业部
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("BusinessDepartmentList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("BusinessDepartmentList");  //刷新数据
                },
                close: true
            })
        },
        //修改事业部
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("BusinessDepartmentList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出事业部详情iframe窗
            PageCommon.ModalOpen({
                id: "BusinessDepartmentDetailUpdate",
                title: '事业部详细',
                width: "810px",
                height: "350px",
                url: "/BasicData/BusinessDepartment/Detail",
                urlparameter: "keyValue=" + selectRow[0].Business_Department_Id,
                callBack: function (iframeId) {
                    //调用事业部详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).businessdepartment_vue.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Business_Department",
                systemKey: "BasicData",
                vm: vmBusinessDepartment
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Business_Department',
                menu_Id: 'M000003',
                list_Id: 'BusinessDepartmentList',
                systemKey: 'BasicData',
                vm: vmBusinessDepartment
            })
        },
        //事业部设置
        Set: function () {

        },
        //查询事业部
        Search: function () {
            vmBusinessDepartment.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000003", List_Id: "BusinessDepartmentList" });
        },
        Clear: function () {
             this.Business_Department_Name = '';
             this.Create_Time = '';
             this.Product_Classify_Name = '';
    }
    }
});
