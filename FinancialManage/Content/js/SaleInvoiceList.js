var vmSaleInvoiceRegister = new Vue({
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
        Create_Time: '',
        Invoice_Date: "",
        Create_Department_Id: "",
        Create_User: "",
        Invoice_Number: "",
        Invoice_Status: "",
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
            Menu_Id: "M000001",
            System_Key: "FinancialManage"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        childSearchModel: [
             {
                 Field_Name: ["F_Purchase_Invoice_R_Detail.Purchase_Invoice_Register_Id"],
                 Parent_Key: ["Purchase_Invoice_Register_Id"],
                 Detail_Seach: 'DetailSeach',
                 Child_List: 'SaleInvoiceRegisterDetailList',
                 Default_Child: "true"
             }
        ],
        //第二张表头查询条件
        columHeaderSeach2: {
            Menu_Id: "M000002",
            System_Key: "FinancialManage"
        },
        //表格查询url
        tableUrl2: "SaleBillDetailSeach",
        //表格查询条件
        searchModel2: {},
        //详细数据
        detailInfo: {
            Customer_Invoice: {},
            Sale_Invoice_Send_Invoice: {},
            Customer_Send_Invoice: {}
        },
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
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            $.each(vm.SaleInvoice, function (i, n) {
                if (i == 'invoiceMessage' && index == 0) {
                    vm.SaleInvoice[i] = true;
                }
                else if (i == 'saleInvoce' && index == 1) {
                    vm.SaleInvoice[i] = true;
                    vmSaleInvoiceRegister.searchModel2 = {
                        "Where_Parameter_List": [
                            {
                                "Field_Name": "F_Sale_Invoice_Detail.Sale_Invoice_Id",
                                "Condition_Value1": selectRow[0].Sale_Invoice_Id,
                                "Expression": "02",
                                "Query_Type": "01"
                            }],

                    }
                }
                else if (i == 'sendMessage' && index == 2) {
                    vm.SaleInvoice[i] = true;
                } else {
                    vm.SaleInvoice[i] = false;
                }
            })

            $(this).addClass("tabactive").siblings().removeClass("tabactive");
        })
    },
    methods: {
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
        //寄票信息
        SendInvoice: function () {
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Invoice_Status == '01') {
                PageCommon.ShowMessageArrayRight("E2072", new Array("未登记"));
                return;
            } else if (selectRow[0].Invoice_Status == '02') {
                if (selectRow[0].Is_Send_Invoice && selectRow[0].Is_Send_Invoice == "0") {
                    PageCommon.ShowMessageArrayRight("E2072", new Array("已寄票"));
                    return;
                }
            } else {
                PageCommon.ShowMessageArrayRight("E2072", new Array(selectRow[0].Invoice_Status_Name));
                return;
            }
            PageCommon.ModalOpen({
                id: "SendInvoice",
                title: '寄票信息',
                width: "555px",
                height: "300px",
                btn: ['确定'],
                url: '/FinancialManage/SaleInvoice/Detail',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).Register_vue.Save(selectRow[0]);
                }
            })

        },
        //确认签收
        Confirm: function () {
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Invoice_Status == '01') {
                PageCommon.ShowMessageArrayRight("E2072", new Array("未登记"));
                return;
            } else if (selectRow[0].Invoice_Status == '02') {
                if (selectRow[0].Is_Send_Invoice && selectRow[0].Is_Send_Invoice == "0") {
                    if (selectRow[0].Sign_Status && selectRow[0].Sign_Status == "02") {
                        PageCommon.ShowMessageArrayRight("E2072", new Array("已确认签收"));
                        return;
                    }
                } else {
                    PageCommon.ShowMessageArrayRight("E2072", new Array("未寄票"));
                    return;
                }

            } else {
                PageCommon.ShowMessageArrayRight("E2072", new Array(selectRow[0].Invoice_Status_Name));
                return;
            }
            PageCommon.SubmitForm({
                url: "ConfirmSign",
                param: { saleInvoice: selectRow[0] },
                success: function (data) {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("SaleInvoiceRegisterList");


                }
            });

        },
        //登记发票
        InvoiceRegister: function () {
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Invoice_Status != '01') {
                PageCommon.ShowMessageArrayRight("E2072", new Array("已登记"));
                return;
            }
            PageCommon.ModalOpen({
                id: "RegisterPackage",
                title: '登记发票',
                width: "535px",
                height: "500px",
                btn: ['确定'],
                url: '/FinancialManage/SaleInvoice/Register',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).Register_vue.Save(selectRow[0]);
                }
            })

        },
        //查看
        CheckLook: function () {
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "RegisterPackage",
                title: '登记发票',
                width: "535px",
                height: "500px",
                btn: ['确定'],
                url: '/FinancialManage/SaleInvoice/Register',
                urlparameter: "relevantnumber=" + selectRow[0].Sale_Invoice_Id + '&sourcetype=0&isedit=1',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).Register_vue.Save(selectRow[0]);
                }
            })
            //window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Product_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            //数量
            if (Field_Name === "Count" || Field_Name === "Red_Flush_Count") {
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
        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Count" || Field_Name === "Red_Flush_Count") {
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
            //价税总额
            if (Field_Name === "Invoice_Price_Tax_Sum_Amount" || Field_Name === "Invoice_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
            }
            //单价总额
            if (Field_Name === "Invoice_Price_Amount") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
            }
         
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            //单价总额
            if (Field_Name === "Invoice_Price_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //价税总额
            if (Field_Name === "Invoice_Price_Tax_Sum_Amount" || Field_Name === "Invoice_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }

        },
        //详细画面新增跳转
        //New: function () {
        //    window.location.href = PageCommon.SetUrl("Detail");
        //},
        //销售表格数字合计
        salepagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Weight") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Weight_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Weight_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), vm.globalParameter.Weight_Decimal];
            }
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
            //总重量
            if (Field_Name === "Weight") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Weight_Decimal, this.globalParameter.Weight_Digital_Cut_Way);
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
            if (Field_Name === "Price_Tax_Sum_Amount") {
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
        //删除员工
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("SaleInvoiceRegisterList");  //刷新数据
                },
                close: true
            })
        },

        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].In_Storeage_Status == '03') {
                PageCommon.ShowMessageRight("E2049");
                return;
            }

            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Invoice_Apply_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        Print: function () { },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'F_Sale_Invoice',
                menu_Id: 'M000001',
                list_Id: 'SaleInvoiceRegisterList',
                systemKey: 'FinancialManage',
                vm: vmSaleInvoiceRegister
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
            var selectRow = PageCommon.GetTableSelectRow("SaleInvoiceRegisterList");
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
            vmSaleInvoiceRegister.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000001", List_Id: "SaleInvoiceRegisterList" });
        },
        mClear: function () {
            this.Invoice_Date = '';
            $('#Create_Department_Id').val(null).trigger('change');
            $('#Create_User').val(null).trigger('change');
            this.Invoice_Number = '';
            $('#Invoice_Status').val(null).trigger('change');
            $('#productrange_SearchStart').val(null);
            $('#productrange_SearchEnd').val(null);
            this.Create_Time = '';
        },
    }
});