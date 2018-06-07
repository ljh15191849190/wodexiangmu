
    var AcceptBillApply_vue = new Vue({
        el: '#apps',
        data: {
            globalParameter: PageCommon.GlobalParameter(),
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
                Menu_Id: "M000012",
                System_Key: "FinancialApplication"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //表格查询条件
            FA_Accept_Bill_Apply: {
                //单号
                Accept_Bill_Apply_Id: "",
                //申请日期
                Create_Time: "",
                //贴息起计日期
                Discount_Start_Count_Date: "",
                //承兑到期日期
                Accept_End_Date: "",
                //审核状态
                Approval_Status: "",
                //承兑归属任务人
                Accept_Bill_Belong_Employee_Name: "",
                //任务人
                Employee_Name: "",
                //任务人部门
                Department_Name: "",
                //汇票号码
                Accept_Bill_Number: "",
                //是否贴现
                Is_Discount: "",
                //贴现出票银行
                Bank_Id: "",
                //不贴现出票银行
                No_Discount_Bank:'',
            },
            //银行查询条件
            bank: {
                Menuresult: ["Bank_Id", "Bank_Name"],
                filedSearch: ["Bank_Id", "Bank_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Bank_Id", "Bank_Name"]
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
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("AcceptBillApplyList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Accept_Bill_Apply_Id + ',' + selectRow[0].Is_Purchase + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //表格合计数字格式化
            pagetotalback: function (Field_Name, a, b) {
                var that = this;
                if (Field_Name == "Accept_Bill_Account" || Field_Name == "Customer_Undertake_Charge" || Field_Name == "Company_Undertake_Charge" || Field_Name == "Discount_Charge") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Money_Decimal];
                }
                if (Field_Name == "Endorsement_Count") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), that.globalParameter.Count_Decimal];
                }
            },
            //表格行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name == "Accept_Bill_Account" || Field_Name == "Customer_Undertake_Charge" || Field_Name == "Company_Undertake_Charge" || Field_Name == "Discount_Charge") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name == "Endorsement_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //导出
            Export: function () { },
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("AcceptBillApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Accept_Bill_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("AcceptBillApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Accept_Bill_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //编辑
            Edit: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("AcceptBillApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Accept_Bill_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("AcceptBillApplyList");
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
                        PageCommon.RefreshTablePage("AcceptBillApplyList");  //刷新数据
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
                that.searchModel = $("#searchForm").GetSearchModel();
            },
            //清除
            mClear: function () {
                this.FA_Accept_Bill_Apply.Accept_Bill_Apply_Id = "";
                this.FA_Accept_Bill_Apply.Create_Time = "";
                this.FA_Accept_Bill_Apply.Discount_Start_Count_Date = "";
                this.FA_Accept_Bill_Apply.Accept_End_Date = "";
                this.FA_Accept_Bill_Apply.Approval_Status = "";
                this.FA_Accept_Bill_Apply.Accept_Bill_Belong_Employee_Name = "";
                this.FA_Accept_Bill_Apply.Employee_Name = "";
                this.FA_Accept_Bill_Apply.Department_Name = "";
                this.FA_Accept_Bill_Apply.Accept_Bill_Number = "";
                this.FA_Accept_Bill_Apply.Is_Discount = "";
                this.FA_Accept_Bill_Apply.Bank_Name = "";
                $('#Approval_Status').val(null).trigger('change');
                $('#Bank_Id').val(null).trigger('change');
                $('#Is_Discount').val(null).trigger('change');
                PageCommon.TableDefaultSort("AcceptBillApplyList");
            }
        }
    });
