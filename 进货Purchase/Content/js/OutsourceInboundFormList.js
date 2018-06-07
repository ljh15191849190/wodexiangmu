    var OutInboundForm_vue = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            globalParameter: PageCommon.GlobalParameter(),
            //子表格
            childSearchModel: [
               {
                   Field_Name: ["P_Purchase.Purchase_Id"],
                   Parent_Key: ["Purchase_Id"],
                   Child_List: 'OutInboundFormDetailList',
                   Detail_Seach: 'DetailSeach',
                   Default_Child: "true",
               }
            ],
            //是否显示生成采购按钮
            btnNew: true,
            //是否显示审核按钮
            btnApproval: true,
            //是否显示修改按钮
            btnEdit: true,
            //是否显示删除按钮
            btnDelete: true,
            //是否显示审批意见按钮
            btnApprovalOpinion: false,
            //是否显示设置按钮
            btnSet: true,
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000007",
                System_Key: "Purchase"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //表格查询条件
            P_Purchase: {
                //进货单号
                Purchase_Id: "",
                //进货日期
                Create_Time: "",
                //发票类型
                Invoice_Type: "",
                //供应商
                Supplier_Name: "",
                //审核状态
                Approval_Status: "",
                //创建员工
                Create_Employee_Name: "",
                //部门
                Create_Department_Name: "",
                //型号
                Product_Name: "",
                //库房
                Storeage_Name: "",
                //品牌
                Brand_Name: "",
                //油脂包装
                Package: "",
                //产地
                Product_Area_Id: "",
                //供应商合同号
                Supplier_Contract_Number: "",
                //提货单号
                Delivery_Bill_Number: "",
                //品名
                Product_Classify_Name: '',
                //进货币种
                Currency_Id: ""

            },
            //发票类型查询条件
            invoice: {
                Menuresult: ["Tax_Rate_Id", "Invoice_Type"],
                filedSearch: ["Tax_Rate_Id", "Invoice_Type"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Tax_Rate_Id", "Invoice_Type"]
            },
            //产地查询条件
            area: {
                Menuresult: ["Product_Area_Id", "Product_Area_Name"],
                filedSearch: ["Product_Area_Id", "Product_Area_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Product_Area_Id", "Product_Area_Name"]
            },
            //币种查询条件
            currency: {
                Menuresult: ["Currency_Id", "Currency_Name"],
                filedSearch: ["Currency_Id", "Currency_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Currency_Id", "Currency_Name"]
            }
        },
        mounted: function () {
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
                //console.log(b)
                //console.log(c);
            });
        },
        methods: {
            //父表格合计数字格式化
            pagetotalback: function (Field_Name, a, b) {
                var that = this;
                if (Field_Name === "Price_Sum") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Price_Sum_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Price_Sum_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Price_Sum_Decimal];
                }
                if (Field_Name === "Price_Tax_Sum") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Total_Decimal];
                }
                if (Field_Name === "Return_Goods_Amount") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Tax_Price_Sum_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Tax_Price_Sum_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Sum_Decimal];
                }
            },
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Price_Tax_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Total_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Price_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            },
            //子表格合计数字格式化
            childtotalback: function (Field_Name, a, b) {
                var that = this;
                if (Field_Name === "Price_Tax_Sum") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Total_Decimal];
                }
            },
            //子表格行初始化事件
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name === "Purchase_Count"|| Field_Name == "Return_Goods_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
                if (Field_Name === "Price_Tax_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //单价
                if (Field_Name === "Price" || Field_Name == "Final_Price") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //税额
                if (Field_Name === "Tax") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if ( Field_Name == "Exchange_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, 2, "1");
                }
            },
            //导出
            Export: function (obj) {
                //PageCommon.ModalExportOpen({
                //    tableName: 'S_Menu',
                //    menu_Id: 'M000001',
                //    list_Id: 'MenuList',
                //    systemKey: 'SystemSet',
                //    vm: Orderform_vue
                //})
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //编辑
            Edit: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("OutInboundFormList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("OutInboundFormList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //删除
            Delete: function () {
                var that = this;
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("OutInboundFormList"); 
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
                    param: selectRow,
                    type: "0",
                    success: function () {
                        PageCommon.RefreshTablePage("OutInboundFormList");  //刷新数据
                    },
                    close: true
                })
            },
            //设置
            Set: function () {

            },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'P_Purchase_Out',
                    menu_Id: 'M000006',
                    list_Id: 'OutInboundFormList',
                    systemKey: 'Purchase',
                    vm: OutInboundForm_vue
                })
            },
            //查询
            Search: function () {
                var that = this;
                that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000006", List_Id: "OutInboundFormList" });
            },
            //清除
            mClear: function () {
                this.P_Purchase.Purchase_Id = "";
                this.P_Purchase.Create_Time = "";
                this.P_Purchase.Supplier_Name = "";
                this.P_Purchase.Approval_Status = "";
                this.P_Purchase.Create_Employee_Name = "";
                this.P_Purchase.Create_Department_Name = "";
                this.P_Purchase.Product_Name = "";
                this.P_Purchase.Brand_Name = "";
                this.P_Purchase.Package = "";
                this.P_Purchase.Product_Area_Id = "";
                this.P_Purchase.Storeage_Name = "";
                this.P_Purchase.Invoice_Type = "";
                this.P_Purchase.Product_Classify_Name = "";
                $('#Approval_Status').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                $('#Invoice_Type').val(null).trigger('change');
                PageCommon.TableDefaultSort("OutInboundFormList");
            },
        }
    });
