var Ordercancelform_vue = new Vue({
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
               Field_Name: ["P_Purchase_Order_Cancel.Purchase_Order_Cancel_Id"],
               Parent_Key: ["Purchase_Order_Cancel_Id"],
               Child_List: 'PurchaseOrderDetailCancleList',
               Detail_Seach: 'DetailSeach',
               Default_Child: "true",
           }
        ],
        //是否显示审核按钮
        btnApproval: true,
        //是否显示生成采购按钮
        btnNew: true,
        //是否显示修改按钮
        btnEdit: true,
        //是否显示删除按钮
        btnDelete: true,
        //是否显示设置按钮
        btnSet: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        P_Purchase_Order_Cancel: {
            //定货取消单号
            Purchase_Order_Cancel_Id: "",
            //制单日期
            Create_Time: "",
            //供应商
            Supplier_Name: "",
            //审核状态
            Approval_Status: "",
            //创建员工
            Create_Employee_Name: "",
            //部门
            Create_Department_Name: "",
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
            if (Field_Name === "Cancel_Total_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Cancel_Total_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
        },
        //子表格合计数字格式化
        childtotalback: function (Field_Name, a, b) {
            if (Field_Name == "Cancel_Count" || Field_Name == "Order_Goods_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //子表格行初始化事件
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Cancel_Count" || Field_Name == "Order_Goods_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'P_Purchase_Order_Cancel',
                menu_Id: 'M000004',
                list_Id: 'PurchaseOrderCancleList',
                systemKey: 'Purchase',
                vm: Ordercancelform_vue
            })
        },
        //新增
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //审核
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderCancleList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Order_Cancel_Id + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //编辑
        Edit: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderCancleList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Order_Cancel_Id + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //删除
        Delete: function () {
            var that = this;
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseOrderCancleList");
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
                    PageCommon.RefreshTablePage("PurchaseOrderCancleList");  //刷新数据
                },
                close: true
            })
        },
        //设置
        Set: function () {

        },
        //查询
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000004", List_Id: "PurchaseOrderCancleList" });
        },
        //清除
        mClear: function () {
            this.P_Purchase_Order_Cancel.Purchase_Order_Cancel_Id = "";
            this.P_Purchase_Order_Cancel.Create_Time = "";
            this.P_Purchase_Order_Cancel.Supplier_Name = "";
            this.P_Purchase_Order_Cancel.Approval_Status = "";
            this.P_Purchase_Order_Cancel.Create_Employee_Name = "";
            this.P_Purchase_Order_Cancel.Create_Department_Name = "";
            this.P_Purchase_Order_Cancel.Product_Name = "";
            this.P_Purchase_Order_Cancel.Brand_Name = "";
            this.P_Purchase_Order.Package = "";
            this.P_Purchase_Order.Product_Area_Name = "";
            this.P_Purchase_Order.Product_Classify_Name = "";
            $('#Approval_Status').val(null).trigger('change');
            PageCommon.TableDefaultSort("PurchaseOrderCancleList");
        }
    }
});
