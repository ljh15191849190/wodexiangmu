 var vmPurchaseInvoiceRegister = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            Brand_Id:'',
            Register_Date:'',
            Supplier_Id:'',
            Invoice_Number: "",
            Invoice_Type: "",
            Is_Exception: "",
            Approval_Status: '',
            Product_Classify_Name:'',
            Brand_Name:'',
            Product_Area_Id:'',
            Package:'',
            Create_Time:'',
            //产地
            AreaOrder: [{}],
            AreaResult: ["Product_Area_Id", "Product_Area_Name"],
            AreaWhere: [],
            //供应商
            Supplierresult: ["Supplier_Id", "Supplier_Name"],
            SupplierfiledSearch: ["Supplier_Id", "Supplier_Name"],
            SuppliermainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            SupplierinputField: ["Supplier_Id", "Supplier_Name"],
            //品牌规格
            Brandresult: ["Brand_Id", "Brand_Name"],
            BrandfiledSearch: ["Brand_Id", "Brand_Name"],
            BrandmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            BrandinputField: ["Brand_Id", "Brand_Name"],
            childSearchModel: [
                  {
                      Field_Name: ["F_Purchase_Invoice_R_Detail.Purchase_Invoice_Register_Id"],
                      Parent_Key: ["Purchase_Invoice_Register_Id"],
                      Detail_Seach: 'DetailSeach',
                      Child_List: 'PurchaseInvoiceRegisterDetailList',
                      Default_Child: "true"
                  }
            ],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000014",
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
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Invoice_Register_Id + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //Shenhe: function () {
            //    var vm = this;
            //    var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterList");
            //    PageCommon.SubmitForm({
            //        url: "ReviewApply",
            //        param: { purchaseInvoiceRegister: selectRow[0] },
            //        success: function (data) {
            //        }
            //    });
            //},
            pagetotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                //单价总额
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Invoice_Amount" || Field_Name === "Price_Tax_Amount") {

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
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
              
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
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount" || Field_Name === "Invoice_Amount") {
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
                //税率
                if (Field_Name === "Tax_Rate") {
                    return PageCommon.NumberDispose(value, 6, 1);
                }
            },
            childtotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Sure_Invoice_Count" || Field_Name === "This_Invoice_Count") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
            },
            //表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                //数量 
                if (Field_Name === "Sure_Invoice_Count" || Field_Name === "This_Invoice_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
              
            },
            //详细画面新增跳转
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //删除员工
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterList");
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
                            PageCommon.RefreshTablePage("PurchaseInvoiceRegisterList");  //刷新数据
                        },
                        close: true
                    })
                } else {
                    PageCommon.ShowMessageRight("E2084");
                }
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Invoice_Register_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //修改部门名称
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Invoice_Register_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            Print: function () { },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'F_Purchase_Invoice_Register',
                    menu_Id: 'M000014',
                    list_Id: 'PurchaseInvoiceRegisterList',
                    systemKey: 'FinancialApplication',
                    vm: vmPurchaseInvoiceRegister
                })
            },
            //设置
            Set: function () {

            },
            //打印
            Print: function () {

            },
            //审批意见
            ApprovalOpinion: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterList");
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
                vmPurchaseInvoiceRegister.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000014", List_Id: "PurchaseInvoiceRegisterList" });
            },
            mClear: function () {
                this.Register_Date = '';
                $('#Brand_Id').val(null).trigger('change');
                $('#Is_Exception').val(null).trigger('change');
                this.Invoice_Number = '';
                $('#Invoice_Type').val(null).trigger('change');
                $('#Supplier_Id').val(null).trigger('change');
                this.productrange.first = '';
                this.productrange.second = '';
                this.Product_Classify_Name = '';
                this.Brand_Name = '';
                $('#Product_Area_Id').val(null).trigger('change');
                this.Package = '';
                this.Create_Time = '';
            },
        }
    });