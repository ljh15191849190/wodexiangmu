    var Supplier_Id = PageCommon.Request("Supplier_Id");
    var vmSaleInvoiceRegister = new Vue({
        el: '#app',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            Supplier_Id:'',
            Product_Name: "",
            Create_Department_Id: "",
            Create_User: "",
            Product_Classify_Name: "",
            Invoice_Status: "",
            Supplier_Name:'',
            Brand_Name: '',
            Product_Area_Id: "",
            Package: '',
            //产地下拉框排序
            AreaOrder: [{}],
            AreaResult: ["Product_Area_Id", "Product_Area_Name"],
            AreaWhere: [],
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
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000017",
                System_Key: "FinancialApplication"
            },
            //表格查询url
            tableUrl: "IntroducePurchaseBillList",
            //表格查询条件
            searchModel: {
                "Where_Parameter_List": [{
                    Field_Name: "P_Wait_Pay.Supplier_Id",
                    Condition_Value1: Supplier_Id,
                    Expression: "02",
                    Module_Id: "FinancialApplication",
                    Query_Type: "01"
                }]
            },
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
            pagetotalback: function (Field_Name, a, b) {
                var vm = this;
                //数量
                if (Field_Name === "Should_Enter_Count" || Field_Name === "This_Invoice_Count" || Field_Name === "Sale_Count" || Field_Name === "Entered_Count" || Field_Name === "Return_Goods_Count" || Field_Name === "Cancel_Count" || Field_Name === "Invoice_Count") {
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
                if (Field_Name === "Price_Tax_Amount") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //其他金额
                if (Field_Name === "Pay_Amount" || Field_Name === "Invoice_Amount" || Field_Name === "Receipt_Amount" || Field_Name === "Incoice_Amount") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
                }
                //单价
                if (Field_Name === "Price") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
                //税额
                if (Field_Name === "Tax") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
                //YJ
                if (Field_Name === "Commission") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
                }
            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                //数量 
                if (Field_Name === "Should_Enter_Count" || Field_Name === "This_Invoice_Count" || Field_Name === "Sale_Count" || Field_Name === "Entered_Count" || Field_Name === "Return_Goods_Count" || Field_Name === "Cancel_Count" || Field_Name === "Invoice_Count") {
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
                if (Field_Name === "Price_Tax_Amount") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //其他总额
                if (Field_Name === "Pay_Amount" || Field_Name === "Invoice_Amount" || Field_Name === "Receipt_Amount" || Field_Name === "Incoice_Amount") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
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
                //YJ
                if (Field_Name === "Commission") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                }
                //税率
                if (Field_Name === "Tax_Rate") {
                    return PageCommon.NumberDispose(value , 6, 1);
                }
            },

            //查询部门名称
            Search: function () {
                vmSaleInvoiceRegister.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000017", List_Id: "PurchaseInvoiceRegisterWaitPayList" });
            },
            Add: function () {
                var selectRow = PageCommon.GetTableSelectRow("PurchaseInvoiceRegisterWaitPayList");
                //画面选择一条数据
                if (!selectRow.length > 0) {
                    top.PageCommon.ShowMessageRight("E2008");
                    return;
                }
                var flag = false;
                if (PageCommon.CurrentWindow().Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.F_Purchase_Invoice_R_Detail_List.length > 0) {
                    for (var i = 0; i < selectRow.length; i++) {
                        $.each(PageCommon.CurrentWindow().Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.F_Purchase_Invoice_R_Detail_List, function (index, item) {
                            if (selectRow[i].Purchase_Id == item.Purchase_Id && selectRow[i].Purchase_Detail_Number == item.Purchase_Detail_Number) {
                                flag = true;
                                return;
                            }
                        });
                    }
                }
                if (flag) {
                    top.PageCommon.ShowMessageRight("I3064");
                    return;
                }
                PageCommon.ModalClose()
                return selectRow;
            },
            mClear: function () {
                this.Supplier_Id = '';
                this.Product_Name = '';
                $('#Create_Department_Id').val(null).trigger('change');
                $('#Create_User').val(null).trigger('change');
                this.productrange.first = '';
                this.productrange.second = '';
                this.Product_Classify_Name = '';
                this.Supplier_Name = '';
                this.Brand_Name = '';
                $('#Product_Area_Id').val(null).trigger('change');
                this.Package = '';
                this.Create_Time = '';
            },
        }
    });