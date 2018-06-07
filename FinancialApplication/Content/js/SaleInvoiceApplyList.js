var vmSaleInvoiceApply = new Vue({
    el: '#apps',
    data: {
        //页签
        SaleInvoice: {
            invoiceMessage: true,
            //销售明细
            saleInvoce: false,
            //寄票信息
            sendMessage: false,
        },
        productrange: {
            first: "",
            second: ""
        },
        Create_Department: '',
        Create_Time: "",
        Latest_Invoice_Time: "",
        Create_User: "",
        Sale_Bill_Id: "",
        Invoice_Status: "",
        Approval_Status: "",
        Customer_Id: "",
        //产地
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
        //公司
        Commanyresult: ["Customer_Id", "Customer_Name"],
        CommanyfiledSearch: ["Customer_Id", "Customer_Name"],
        CommanymainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CommanyinputField: ["Customer_Id", "Customer_Name"],
        childSearchModel: [
              {
                  Field_Name: ["FA_Sale_Invoice_Apply_Detail.Sale_Invoice_Apply_Id"],
                  Parent_Key: ["Sale_Invoice_Apply_Id"],
                  Detail_Seach: 'DetailSeach',
                  Child_List: 'SaleInvoiceApplyDetailList',
                  Default_Child: "true"
              }
        ],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000001",
            System_Key: "FinancialApplication"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //第二张表头查询条件
        columHeaderSeach2: {
            Menu_Id: "M000002",
            System_Key: "FinancialApplication"
        },
        //表格查询url
        tableUrl2: "SaleBillDetailSeach",
        //表格查询条件
        searchModel2: {},
        //详细数据
        detailInfo: {},
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
        $(".replyType").on('click', '.title1', function () {
            $(this).parent().find(".shrink").slideToggle();
            $(this).parent().find(".down_tab").toggleClass("rotate");
            $(this).toggleClass("boder");
        })
        $(".replyType").on('click', '.down_tab', function () {
            $(this).parent().find(".shrink").slideToggle();
            $(this).toggleClass("rotate");
            $(this).parent().find(".title1").toggleClass("boder");
        })

        $("#tab").on("click", 'li', function () {
            var index = $(this).index();
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            $.each(vm.SaleInvoice, function (i, n) {
                if (i == 'invoiceMessage' && index == 0) {
                    vm.SaleInvoice[i] = true;
                    vm.detailInfo = selectRow[0];
                }
                else if (i == 'saleInvoce' && index == 1) {
                    vm.SaleInvoice[i] = true;
                    vmSaleInvoiceApply.searchModel2 = {
                        "Where_Parameter_List": [
                            {
                                "Condition_Value1": selectRow[0].Sale_Invoice_Apply_Id,
                                "Field_Name": "FA_Sale_Invoice_Apply_Detail.Sale_Invoice_Apply_Id",
                                "Expression": "02",
                                "Query_Type": "01"
                            }]
                    }
                }
                else if (i == 'sendMessage' && index == 2) {
                    vm.SaleInvoice[i] = true;

                }
                else {
                    vm.SaleInvoice[i] = false;
                }
            })

            $(this).addClass("tabactive").siblings().removeClass("tabactive");
        })
    },
    methods: {
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Invoice_Apply_Id + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        RowClick: function (row) {
            var vm = this;
            if (!$(row.node()).hasClass("selected")) {
                //选中状态
                if (row.data()) {
                    vm.detailInfo = row.data();

                }
            }
            vm.SaleInvoice.invoiceMessage = true;
            vm.SaleInvoice.saleInvoce = false;
            vm.SaleInvoice.sendMessage = false;
            $("#tab li:first").addClass("tabactive").siblings().removeClass("tabactive");
            PageCommon.RefreshTablePage("SaleOrderDetail");  //刷新数据
        },
        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            //数量
            if (Field_Name === "Count") {
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
            //单价
            if (Field_Name === "Price") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
            }
            //税额
            if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            //税率
            if (Field_Name === "Tax_Rate") {
                return [PageCommon.NumberDispose(a, 6, 1), PageCommon.NumberDispose(b, 6, 1), 6];
            }
        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Count") {
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
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            //数量
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
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
            if (Field_Name === "Price_Tax_Sum_Amount") {

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
            //长宽高
            if (Field_Name === "Length") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Lenght_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Lenght_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), vm.globalParameter.Lenght_Decimal];
            }
            //重量
            if (Field_Name === "Weight") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Weight_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Weight_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), vm.globalParameter.Weight_Decimal];
            }
            //YJ
            if (Field_Name === "Commission") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
            }

            //成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            //数量 
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
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
            //税率
            if (Field_Name === "Tax_Rate") {
                return [PageCommon.NumberDispose(a, 6, 1), PageCommon.NumberDispose(b, 6, 1), 6];
            }
            //长宽高 
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Lenght_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            //总重量
            if (Field_Name === "Weight") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Weight_Decimal, this.globalParameter.Weight_Digital_Cut_Way);
            }
            //YJ
            if (Field_Name === "Commission") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
            }

            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }

        },
        //销售表格数字合计
        salepagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {

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
            if (Field_Name === "Tax") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
            //单价
            if (Field_Name === "Price") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
            }
        },
        //销售表格行初始化
        salecolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            //销售数量 退货数量
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
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
            //YJ率
            if (Field_Name === "Commission_Rate") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.YJ_Rate_Decimal, this.globalParameter.TY_Digital_Cut_Way);
            }
            //CY利润率_库 CY利润率_期
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
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
            //YJ
            if (Field_Name === "Commission") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
            //单价
            if (Field_Name === "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Invoice_Apply_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        },
        //删除员工
        Delete: function () {
            ////获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyList");
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
                    PageCommon.RefreshTablePage("SaleInvoiceApplyList");  //刷新数据
                },
                close: true
            })
        },

        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Invoice_Apply_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        Print: function () { },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'FA_Sale_Invoice_Apply',
                menu_Id: 'M000001',
                list_Id: 'SaleInvoiceApplyList',
                systemKey: 'FinancialApplication',
                vm: vmSaleInvoiceApply
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
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceApplyList");
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
            vmSaleInvoiceApply.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000001", List_Id: "SaleInvoiceApplyList" });
        },
        mClear: function () {
            this.Create_Time = '';
            this.Latest_Invoice_Time = '';
            this.Create_Department = '';
            $('#Create_Department').val(null).trigger('change');
            $('#Create_User').val(null).trigger('change');
            this.Sale_Bill_Id = '';
            $('#Invoice_Status').val(null).trigger('change');
            $('#Approval_Status').val(null).trigger('change');
            $('#Customer_Id').val(null).trigger('change');
            this.productrange.first = '';
            this.productrange.second = '';
        },
    }
});