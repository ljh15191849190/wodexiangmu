  var vmSaleInvoiceRefundApply = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            Invoice_Date: "",
            Create_Department_Id: "",
            Create_User: "",
            Invoice_Number: "",
            Invoice_Status: "",
            Approval_Status: "",
            Customer_Id: '',
            Customer_Name:'',
            Create_Time:'',
            //客户
            Customerresult: ["Customer_Id", "Customer_Name"],
            CustomerfiledSearch: ["Customer_Id", "Customer_Name"],
            CustomerOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            CustomerinputField: ["Customer_Id", "Customer_Name"],
            //部门
            Departmentresult: ["Department_Id", "Department_Name"],
            DepartmentfiledSearch: ["Department_Id", "Department_Name"],
            DepartmentmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            DepartmentinputField: ["Department_Id", "Department_Name"],
            //制单人
            Userresult: ["Employee_Id", "Name"],
            UserfiledSearch: ["Employee_Id", "Name"],
            UsermainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            UserinputField: ["Employee_Id", "Name"],
            childSearchModel: [
                  {
                      Field_Name: ["F_Sale_Invoice_Detail.Sale_Invoice_Id"],
                      Parent_Key: ["Sale_Invoice_Id"],
                      Detail_Seach: 'DetailSeach',
                      Child_List: 'SaleInvoiceRefundApplyDetailList',
                      Default_Child: "true"
                  }
            ],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000009",
                System_Key: "FinancialApplication"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //位数cookie
            globalParameter: {}

        },
        mounted: function () {
            var vm = this;
            vm.globalParameter = PageCommon.GlobalParameter();
            //控件拖动
            $('.form-group').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

            });
        },
        methods: {
            childtotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Count" || Field_Name === "Return_Goods_Count") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
                //价税合计
                if (Field_Name === "Price_Tax_Sum") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                //单价总额
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //YJ
                if (Field_Name === "Commission") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
                }
                //税额
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
                //单价
                if (Field_Name === "Price") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
            },
            //表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Count" || Field_Name === "Return_Goods_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
                //价税合计
                if (Field_Name === "Price_Tax_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //单价总额
                if (Field_Name === "Price_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //价税总额
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //单价
                if (Field_Name === "Price") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //税额
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Tax_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, 6, 1);

                }
            },
            //详细画面新增跳转
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            Cancel: function () {
                var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRefundApplyList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                if (selectRow[0].Invoice_Status == '04') {
                    PageCommon.ShowMessageArrayRight("E2072", new Array("已退票"));
                    return;
                }
                if (selectRow[0].Approval_Status == '03') {
                    PageCommon.SubmitForm({
                        url: "SaleInvoiceRefund",
                        param: { exceptionInvoiceApply: selectRow[0] },
                        success: function (data) {
                            PageCommon.RefreshTablePage("SaleInvoiceRefundApplyList");
                        }
                    });
                   
                } else {
                    PageCommon.ShowMessageRight("I3060");
                    return;
                }
              


            },
            //删除员工
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRefundApplyList");
                //画面选择一条数据
                if (selectRow.length == 0) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                if (selectRow[0].Approval_Status == '01' || selectRow[0].Approval_Status == '04') {
                    //调用删除共同方法
                    PageCommon.SubmitDetialForm({
                        url: "Delete",
                        param: selectRow,
                        type: "0",
                        success: function () {
                            PageCommon.RefreshTablePage("SaleInvoiceRefundApplyList");  //刷新数据
                        },
                        close: true
                    })
                } else {
                    PageCommon.ShowMessageRight("E2084");
                }
            },
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRefundApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Exception_Invoice_Apply_Id + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRefundApplyList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Exception_Invoice_Apply_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //修改部门名称
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRefundApplyList");
                if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
                }
                if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03') {
                    PageCommon.ShowMessageRight("E2041");
                    return;
                }
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //详细画面更新跳转
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Exception_Invoice_Apply_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            Print: function () { },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'FA_Exception_Invoice_Apply_Refund',
                    menu_Id: 'M000006',
                    list_Id: 'SaleInvoiceRefundApplyList',
                    systemKey: 'FinancialApplication',
                    vm: vmSaleInvoiceRefundApply
                })
            },
            //设置
            Set: function () {

            },
            //打印
            Print: function () {

            },
            //审批意见
            mApproval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRefundApplyList");
                console.log(selectRow)
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                if (selectRow[0].Approval_Status == '01') {
                    PageCommon.ShowMessageRight("E2042");
                    return;
                }
            },
            //查询部门名称
            Search: function () {
                vmSaleInvoiceRefundApply.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000009", List_Id: "SaleInvoiceRefundApplyList" });
            },
            mClear: function () {
                this.Invoice_Date = '';
                $('#Create_Department_Id').val(null).trigger('change');
                $('#Create_User').val(null).trigger('change');
                this.Invoice_Number = '';
                $('#Invoice_Status').val(null).trigger('change');
                $('#Approval_Status').val(null).trigger('change');
                $('#productrange_SearchStart').val(null);
                $('#productrange_SearchEnd').val(null);
                this.Customer_Name = '';
                this.Create_Time = '';
            },
        }
    });