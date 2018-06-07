
    var SaleRefundApply_vue = new Vue({
        el: '#apps',
        data: {
            globalParameter: PageCommon.GlobalParameter(),
            //是否显示生成采购按钮
            btnNew: true,
            //是否显示修改按钮
            btnEdit: true,
            //是否显示删除按钮
            btnDelete: true,
            //是否显示审核按钮
            btnApproval: true,
            //是否显示审批意见按钮
            btnApprovalOpinion: false,
            //是否显示设置按钮
            btnSet: true,
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000019",
                System_Key: "FinancialApplication"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //表格查询条件
            FA_Sale_Refund_Apply: {
                //单号
                Sale_Refund_Apply_Id: "",
                //申请日期
                Create_Time: "",
                //退款方式
                Payment_Method: "",
                //任务人
                Employee_Name: "",
                //部门
                Department_Name: "",
                //客户
                Customer_Name: "",
                //审核状态
                Approval_Status: ""
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
            //表格合计数字格式化
            pagetotalback: function (Field_Name, a, b) {
                var that = this;
                if (Field_Name == "Refund_Amount" || Field_Name == "Goods_Pay" || Field_Name == "Earnest" || Field_Name == "Freight" || Field_Name == "Other") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Money_Decimal];
                }
            },
            //表格行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name == "Refund_Amount" || Field_Name == "Goods_Pay" || Field_Name == "Earnest" || Field_Name == "Freight" || Field_Name == "Other") {
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
                var selectRow = PageCommon.GetTableSelectRow("SaleRefundApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Refund_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleRefundApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Refund_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleRefundApplyList");
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
                        PageCommon.RefreshTablePage("SaleRefundApplyList");  //刷新数据
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
                    tableName: 'FA_Sale_Refund_Apply',
                    menu_Id: 'M000012',
                    list_Id: 'SaleRefundApplyList',
                    systemKey: 'FinancialApplication',
                    vm: SaleRefundApply_vue
                })
            },
            //查询
            Search: function () {
                var that = this;
                that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000012", List_Id: "SaleRefundApplyList" });
            },
            //清除
            mClear: function () {
                this.FA_Sale_Refund_Apply.Sale_Refund_Apply_Id = "";
                this.FA_Sale_Refund_Apply.Create_Time = "";
                this.FA_Sale_Refund_Apply.Approval_Status = "";
                this.FA_Sale_Refund_Apply.Customer_Name = "";
                this.FA_Sale_Refund_Apply.Employee_Name = "";
                this.FA_Sale_Refund_Apply.Payment_Method = "";
                this.FA_Sale_Refund_Apply.Department_Name = "";
                $('#Approval_Status').val(null).trigger('change');
                $('#Payment_Method').val(null).trigger('change');
                PageCommon.TableDefaultSort("SaleRefundApplyList");
            }
        }
    });
