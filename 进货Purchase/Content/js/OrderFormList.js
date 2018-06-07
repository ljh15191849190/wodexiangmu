var Orderform_vue = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        //子表格
        childSearchModel: [
           {
               Field_Name: ["P_Purchase_Order.Purchase_Order_Id"],
               Parent_Key: ["Purchase_Order_Id"],
               Child_List: 'PurchaseOrderDetailList',
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
            Menu_Id: "M000001",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        P_Purchase_Order: {
            //定货单号
            Purchase_Order_Id: "",
            //定货日期
            Create_Time: "",
            //供应商
            Supplier_Name: "",
            //审核状态
            Approval_Status: "",
            //任务人
            Employee_Name: "",
            //创建员工
            Create_Employee_Name: "",
            //部门
            Department_Name: "",
            //定货单类型
            Purchase_Order_Type: '',
            //型号
            Product_Name: "",
            //品牌
            Brand_Name: "",
            //油脂包装
            Package: "",
            //品名
            Product_Classify_Name: '',
            //产地
            Product_Area_Name: ""
        },
        //产地查询条件
        area: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
        globalParameter: PageCommon.GlobalParameter()
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
            if (Field_Name === "Total_Order_Count") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), that.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Total_Sum") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Tax_Price_Sum_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Tax_Price_Sum_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Sum_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Total_Order_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name === "Total_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //子表格合计数字格式化
        childtotalback: function (Field_Name, a, b) {
            if (Field_Name === "Purchase_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
        },
        //子表格行初始化事件
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "First_Consult_Price" || Field_Name == "Final_Price" || Field_Name == "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Purchase_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }
            if (Field_Name === "Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Price_Tax_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
        },
        //新增
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Order_Id + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //编辑
        Edit: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == "02" || selectRow[0].Approval_Status == "03") {
                PageCommon.ShowMessageRight("E2041");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Order_Id + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //删除
        Delete: function () {
            var that = this;
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderList");
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
                    PageCommon.RefreshTablePage("PurchaseOrderList");  //刷新数据
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
                tableName: 'P_Purchase_Order',
                menu_Id: 'M000003',
                list_Id: 'PurchaseOrderList',
                systemKey: 'Purchase',
                vm: Orderform_vue
            })
        },
        //查询
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000003", List_Id: "PurchaseOrderList" });
        },
        //清除
        mClear: function () {
            this.P_Purchase_Order.Purchase_Order_Id = "";
            this.P_Purchase_Order.Create_Time = "";
            this.P_Purchase_Order.Supplier_Name = "";
            this.P_Purchase_Order.Approval_Status = "";
            this.P_Purchase_Order.Employee_Name = "";
            this.P_Purchase_Order.Create_Employee_Name = "";
            this.P_Purchase_Order.Department_Name = "";
            this.P_Purchase_Order.Purchase_Order_Type = "";
            this.P_Purchase_Order.Product_Name = "";
            this.P_Purchase_Order.Brand_Name = "";
            this.P_Purchase_Order.Package = "";
            this.P_Purchase_Order.Product_Area_Name = "";
            this.P_Purchase_Order.Product_Classify_Name = "";
            $('#Approval_Status').val(null).trigger('change');
            $('#Purchase_Order_Type').val(null).trigger('change');
            $('#Product_Area_Name').val(null).trigger('change');
            PageCommon.TableDefaultSort("PurchaseOrderList");
        },
    }
});