
var vmCustomer = new Vue({
    el: '#apps',
    data: {
        //客户申请单号
        Apply_Bill_Id: "",
        //客户名称
        Customer_Id: "",
        //审核状态
        Approval_Status: "",
        //创建时间
        Create_Time:'',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000005",
            System_Key: "CustomerRelations"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //审核状态
        ExamineDictionaryKey: "APPROVAL_STATUS",
    },
    mounted: function () {
        //控件拖动
        $('.drag_1').arrangeable({
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
            var selectRow = PageCommon.GetTableSelectRow("CustomerList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Apply_Bill_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面新增跳转
        New: function () {

            window.location.href = PageCommon.SetUrl("Detail");
        },
        //详细画面更新跳转
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomerList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03') {
                PageCommon.ShowMessageRight("E2041");
                return;
            }
            //详细画面更新跳转

            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Apply_Bill_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改


        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomerList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03' || selectRow[0].Approval_Status == '04') {
                PageCommon.ShowMessageRight("E2084");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow[0],
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("CustomerList");  //刷新数据
                },
                close: true
            })
        },
        //审批意见
        ApprovalOpinion: function () {

        },
        //审核
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CustomerList");
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
                tableName: 'C_Customer_Apply',
                menu_Id: 'M000005',
                list_Id: 'CustomerList',
                systemKey: 'CustomerRelations',
                vm: vmCustomer
            })
        },
        //设置
        Set: function () {


        },
        //查询
        Search: function (obj) {
            vmCustomer.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000005", List_Id: "CustomerList" });
        },
        //清空
        mClear: function () {
            this.Apply_Bill_Id = '';
            this.Approval_Status = '';
            this.Customer_Id = '';
            this.Create_Time = '';
            $('#Approval_Status').val(null).trigger('change');
        }
    }
});