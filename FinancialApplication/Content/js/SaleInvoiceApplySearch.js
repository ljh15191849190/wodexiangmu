var vmSaleInvoiceApply = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Product_Classify_Name: '',
        Brand_Name: '',
        Product_Id: "",
        Product_Name: "",
        Sale_Bill_Id: "",
        Brand_Id: "",
        Sale_Date: '',
        Package: '',
        //型号规格
        Specificationresult: ["Product_Id", "Product_Name"],
        SpecificationfiledSearch: ["Product_Id", "Product_Name"],
        SpecificationmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        SpecificationinputField: ["Product_Id", "Product_Name"],
        //品牌
        Brandresult: ["Brand_Id", "Brand_Name"],
        BrandfiledSearch: ["Brand_Id", "Brand_Name"],
        BrandmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        BrandinputField: ["Brand_Id", "Brand_Name"],
        //收款公司
        Commanyresult: ["Company_Id", "Company_Name"],
        CommanyfiledSearch: ["Company_Id", "Company_Name"],
        CommanymainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CommanyinputField: ["Company_Id", "Company_Name"],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000020",
            System_Key: "FinancialApplication",
        },
        //表格查询url
        tableUrl: "IntroduceSaleBillDetail",
        //表格查询条件
        searchModel: {},
        globalParameter: {},

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
        initcomplete: function () {
            var vm = this;
            if (PageCommon.CurrentWindow().Sale_Invoice_Apply_vue.SelectionData.Customer_Id && PageCommon.CurrentWindow().Sale_Invoice_Apply_vue.SelectionTaxRateData.id) {
                vm.searchModel = {
                    "Where_Parameter_List": [{
                        Field_Name: "M_Sale_Bill.Customer_Id",
                        Condition_Value1: PageCommon.CurrentWindow().Sale_Invoice_Apply_vue.SelectionData.Customer_Id,
                        Expression: "02",
                        Query_Type: "01"
                    },
                    {
                        Field_Name: "M_Sale_Bill.Tax_Rate_Id",
                        Condition_Value1: PageCommon.CurrentWindow().Sale_Invoice_Apply_vue.SelectionTaxRateData.id,
                        Expression: "02",
                        Query_Type: "01"
                    }]
                }
            }
        },
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            //数量
            if (Field_Name === "Sale_Count" || Field_Name === "Out_Storeage_Count" || Field_Name === "Return_Goods_Count" || Field_Name === "Cancel_Count" || Field_Name === "Invoice_Count") {
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
            if (Field_Name === "Price_Tax_Amount" || Field_Name === "Pay_Amount" || Field_Name === "Invoice_Amount" || Field_Name === "Receipt_Amount") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
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
            if (Field_Name === "Sale_Count" || Field_Name === "Out_Storeage_Count" || Field_Name === "Return_Goods_Count" || Field_Name === "Cancel_Count" || Field_Name === "Invoice_Count") {
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
            if (Field_Name === "Price_Tax_Amount" || Field_Name === "Pay_Amount" || Field_Name === "Invoice_Amount" || Field_Name === "Receipt_Amount") {
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
            //YJ
            if (Field_Name === "Commission") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
            }
            //税率
            if (Field_Name === "Tax_Rate") {
                return [PageCommon.NumberDispose(a, 6, 1), PageCommon.NumberDispose(b, 6, 1), 6];
            }
         
        },
        //保存菜单画面数据
        Add: function () {
            var vm = this;
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyWaitReceiptDetail");
            //画面选择一条数据
            if (!selectRow.length > 0) {
                top.PageCommon.ShowMessageRight("E2008");
                return;
            }
            var flag = false;
            if (PageCommon.CurrentWindow().Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.FA_Sale_Invoice_Apply_Detail_List.length > 0) {
                for (var index = selectRow.length - 1; index >= 0; index--) {
                    flag = false;
                    var rs = vm.Validate(PageCommon.CurrentWindow().Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.FA_Sale_Invoice_Apply_Detail_List, selectRow[index]);
                    if (rs) {
                        flag = true;
                        // return false;
                    }
                }

            }
            if (flag) {
                top.PageCommon.ShowMessageRight("E2043");
                return;
            }
            PageCommon.ModalClose()
            return selectRow;
        },
        //查询部门名称
        Search: function () {

            vmSaleInvoiceApply.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000020", List_Id: "SaleInvoiceApplyWaitReceiptDetail" });
        },
        mClear: function () {
            this.Product_Name = '';
            $('#Product_Name').val(null);
            $('#Big_Classify_Id').val(null).trigger('change');
            this.Package = '';
            $('#Material_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            this.Pc = '';
            this.Tm = '';
            this.Production_Month = '';
            $('#Inner_Radius').val(null);
            $('#Inner_Radius_second').val(null);
            $('#Outer_Radius').val(null);
            $('#Outer_Radius_second').val(null);
            this.Product_Classify_Name = '';
            this.Brand_Name = '';
        },
        Validate: function (arrayList, data) {
            var flag = false;
            $.each(arrayList, function (index, item) {
                if (data.Sale_Bill_Id == item.Sale_Bill_Id && data.Sale_Bill_Detail_Number == item.Sale_Bill_Detail_Number) {
                    flag = true;
                    return;
                }
            });
            return flag;
        }



    }
});