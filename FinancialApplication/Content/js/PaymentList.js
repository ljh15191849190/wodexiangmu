
    var GoodsPayApplyBill_vue = new Vue({
        el: '#apps',
        data: {
            globalParameter: PageCommon.GlobalParameter(),
            //子表格
            childSearchModel: [
               {
                   Field_Name: ["FA_Goods_Pay_Apply_Bill.Goods_Pay_Apply_Bill_Id"],
                   Parent_Key: ["Goods_Pay_Apply_Bill_Id"],
                   Child_List: 'GoodsPayApplyBillDetailList',
                   Detail_Seach: 'DetailSeach',
                   Default_Child: "true",
               }
            ],
            //是否显示生成采购按钮
            btnNew: true,
            //是否显示修改按钮
            btnEdit: true,
            //是否显示审核按钮
            btnApproval: true,
            //是否显示删除按钮
            btnDelete: true,
            //是否显示审批意见按钮
            btnApprovalOpinion: false,
            //是否显示设置按钮
            btnSet: true,
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000007",
                System_Key: "FinancialApplication"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //表格查询条件
            FA_Goods_Pay_Apply_Bill: {
                //货款申请单号
                Goods_Pay_Apply_Bill_Id: "",
                //申请日期
                Create_Time: "",
                //采购单号
                Purchase_Bill_Id: "",
                //采购单位
                Supplier_Name: "",
                //审核状态
                Approval_Status: "",
                //付款单位
                Payment_Supplier_Name: "",
                //付款公司
                Company_Id: "",
            },
            //付款公司查询条件
            company: {
                Menuresult: ["Company_Id", "Company_Name"],
                filedSearch: ["Company_Id", "Company_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Company_Id", "Company_Name"]
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
                if (Field_Name === "Fact_Pay_Amount" || Field_Name === "Charged_Aganist_Amount" || Field_Name === "No_Charge_Aganist_Amount" || Field_Name === "Goods_Payment_Balance") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Money_Decimal];
                }
            },
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name == "Fact_Pay_Amount" || Field_Name === "Charged_Aganist_Amount" || Field_Name === "No_Charge_Aganist_Amount" || Field_Name === "Goods_Payment_Balance") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Fact_Pay_Amount_Percent") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, 2, "1");
                }
            },
            //子表格合计数字格式化
            childtotalback: function (Field_Name, a, b) {
                var that = this;
                if (Field_Name == "This_Pay_Amount") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Money_Decimal];
                }
            },
            //子表格行初始化事件
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name == "This_Pay_Amount") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //编辑
            Edit: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("GoodsPayApplyBillList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Goods_Pay_Apply_Bill_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("GoodsPayApplyBillList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Goods_Pay_Apply_Bill_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("GoodsPayApplyBillList");
                //调用删除共同方法
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
                        PageCommon.RefreshTablePage("GoodsPayApplyBillList");  //刷新数据
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
                    tableName: 'FA_Goods_Pay_Apply_Bill',
                    menu_Id: 'M000008',
                    list_Id: 'GoodsPayApplyBillList',
                    systemKey: 'FinancialApplication',
                    vm: GoodsPayApplyBill_vue
                })
            },
            //查询
            Search: function () {
                var that = this;
                that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000008", List_Id: "GoodsPayApplyBillList" });
            },
            //清除
            mClear: function () {
                this.FA_Goods_Pay_Apply_Bill.Goods_Pay_Apply_Bill_Id = "";
                this.FA_Goods_Pay_Apply_Bill.Create_Time = "";
                this.FA_Goods_Pay_Apply_Bill.Supplier_Name = "";
                this.FA_Goods_Pay_Apply_Bill.Approval_Status = "";
                this.FA_Goods_Pay_Apply_Bill.Payment_Supplier_Name = "";
                this.FA_Goods_Pay_Apply_Bill.Purchase_Bill_Id = "";
                this.FA_Goods_Pay_Apply_Bill.Company_Id = "";
                $('#Approval_Status').val(null).trigger('change');
                $('#Company_Id').val(null).trigger('change');
                PageCommon.TableDefaultSort("GoodsPayApplyBillList");
            },
        }
    });
