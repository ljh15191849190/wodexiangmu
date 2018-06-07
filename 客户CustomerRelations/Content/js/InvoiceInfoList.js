
var Invoice_vue = new Vue({
    el: '#apps',
    data: {
        //客户名称
        Customer_Id: '',
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerfiledSearch: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        //创建日期
        Create_Time: '',
        //税号
        Taxpayer_Id: '',
        //开票名称
        Invoice_Name: '',
        //账号
        Account: '',
        //开票地址
        Address_Gather: '',
        //审核状态
        Approval_Status: '',
        //任务人
        Employee_Id : '',
        
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //开票信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000007",
            System_Key: "CustomerRelations",
            List_Id: ""
        },

    },
    mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
           
        });

    },
    methods: {
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Create_Time") {
                return moment(value).format('YYYY-MM-DD hh:mm:ss');
            }
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("InvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Apply_Bill_Id + "," + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //新增
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("InvoiceList");
            
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status != '01') {
                PageCommon.ShowMessageRight("E2084");
                return;
            }
           
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type:'0',
                success: function () {
                    PageCommon.RefreshTablePage("InvoiceList");  //刷新数据
                },
                close: true
            })
        },
        //修改
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("InvoiceList");
            var status = selectRow[0].Approval_Status;
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03') {
                PageCommon.ShowMessageRight("E2041");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Apply_Bill_Id + "," + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        },
        //审批意见
        ApprovalOpinion: function () {

        },
        //审核
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("InvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == "01" || selectRow[0].Approval_Status == "03") {
                PageCommon.ShowMessageRight("E2083");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Apply_Bill_Id + ',' + selectRow[0].Customer_Id + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //导出
        Export: function (obj) {

            PageCommon.ModalExportOpen({
                tableName: 'C_Customer_Invoice',
                menu_Id: 'M000007',
                list_Id: 'InvoiceList',
                systemKey: 'CustomerRelations',
                vm: Invoice_vue
            })
        },
        //设置
        Set: function () {


        },
        //查询
        Search: function () {
            Invoice_vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000007", List_Id: "InvoiceList" });
        },
        //清空
        mClear: function () {
            this.Taxpayer_Id = '';
            this.Customer_Id = '';
            this.Invoice_Name = '';
            this.Employee_Id = '',
            this.Approval_Status = '';
            this.Bank = '';
            this.Create_Time = '';
            this.Address_Gather = '';
            this.Account = '';
            $('#Customer_Id').val(null).trigger('change');
            $('#Employee_Id').val(null).trigger('change');
            $('#Approval_Status').val(null).trigger('change');

        },
    }
});