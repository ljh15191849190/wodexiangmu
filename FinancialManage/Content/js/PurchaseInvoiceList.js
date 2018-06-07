var vmPurchaseInvoice = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Invoice_Date: "",
        Create_Department_Id: "",
        Employee_Id: "",
        Name: '',
        Invoice_Number: "",
        Invoice_Type: "",
        Invoice_Status: '',
        Create_Time: '',
        Package: '',
        Product_Area_Id: '',
        Brand_Name: '',
        Product_Classify_Name: '',
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
        //产地
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        //发票类型
        Tax_RatefiledResult: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
        Tax_RatefiledSearch: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
        Tax_RatemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        Tax_RateinputField: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "FinancialManage"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        childSearchModel: [
             {
                 Field_Name: ["F_Purchase_Invoice_Detail.Purchase_Invoice_Id"],
                 Parent_Key: ["Purchase_Invoice_Id"],
                 Detail_Seach: 'DetailSeach',
                 Child_List: 'PurchaseInvoiceDetailList',
                 Default_Child: "true"
             }
        ],

        Message: {},
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
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Check", "relevantnumber=" + selectRow[0].Purchase_Invoice_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //设为异常
        Exception: function () {
            var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Is_Exception == '0') {
                PageCommon.ShowMessageArrayRight("E2072", new Array("已设为异常"));
                return;
            }
            PageCommon.ModalOpen({
                id: "PurchaseInvoice",
                title: '采购发票异常设置',
                width: "535px",
                height: "200px",
                btn: ['确定'],
                url: '/FinancialManage/PurchaseInvoice/Detail',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).Register_vue.Save(selectRow[0]);
                }
            })

        },
        //设为正常
        Normal: function () {
            var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Is_Exception == '1') {
                PageCommon.ShowMessageArrayRight("E2072", new Array("已设为正常"));
                return;
            }
            selectRow[0].Is_Exception = 1;
            PageCommon.SubmitForm({
                url: "ConvertNormalOrException",
                param: { purchaseInvoice: selectRow[0] },
                success: function (data) {
                    //刷新表格数据
                    PageCommon.RefreshTablePage("PurchaseInvoiceList");


                }
            });
        },
        //认证
        InvoiceCertified: function () {
            var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Invoice_Status == '03' || selectRow[0].Invoice_Status == '02') {
                PageCommon.ShowMessageArrayRight("E2072", new Array("已认证"));
                return;
            }
            PageCommon.SubmitForm({
                url: "PurchaseInvoiceCertified",
                param: { purchaseInvoice: selectRow[0] },
                success: function (data) {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("PurchaseInvoiceList");


                }
            });

        },
        //退票
        InvoiceRefund: function () {
            var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Invoice_Status == "02" || selectRow[0].Invoice_Status == "03") {
                PageCommon.ShowMessageArrayRight("E2072", new Array("已退票"));
                return;

            } else {
                PageCommon.SubmitForm({
                    url: "PurchaseInvoiceRefund",
                    param: { purchaseInvoice: selectRow[0] },
                    success: function (data) {
                        //关闭iframe窗
                        PageCommon.ModalClose()
                        //刷新表格数据
                        PageCommon.CurrentWindow().PageCommon.RefreshTablePage("PurchaseInvoiceList");
                    }
                });
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
            if (Field_Name === "Sure_Invoice_Count" || Field_Name === "This_Invoice_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
        },
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;

            if (Field_Name === "Invoice_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Invoice_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }

        },

        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'F_Purchase_Invoice',
                menu_Id: 'M000002',
                list_Id: 'PurchaseInvoiceList',
                systemKey: 'FinancialManage',
                vm: vmPurchaseInvoice
            })
        },
        //设置
        Set: function () {

        },
        //打印
        Print: function () {

        },
        //查询部门名称
        Search: function () {
            vmPurchaseInvoice.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000003", List_Id: "PurchaseInvoiceList" });
        },
        mClear: function () {
            this.Invoice_Date = '';
            $('#Create_Department_Id').val(null).trigger('change');
            $('#Create_User').val(null).trigger('change');
            this.Invoice_Number = '';
            this.Employee_Id = '';
            $('#Invoice_Type').val(null).trigger('change');
            $('#Invoice_Status').val(null).trigger('change');
            $('#productrange_SearchStart').val(null);
            $('#productrange_SearchEnd').val(null);
            this.Create_Time = '';

            $('#productrange_SearchStart').val(null);
            $('#productrange_SearchEnd').val(null);
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
            this.Product_Area_Id = '';
            $('#Product_Area_Id').val(null);
            this.Package = '';

        },
    }
});