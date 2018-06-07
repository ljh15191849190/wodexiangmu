
    var Payment_vue = new Vue({
        el: '#apps',
        data: {
            //付款项目
            Pay_Item:'',
            //付款方式
            Payment_Method:'',
            //付款部门
            Pay_Department_Id: '',
            //供应商
            Supplier_Id:'',
            //审核状态
            Approval_Status:'',
            Companyresult: ["Company_Id", "Company_Name"],
            CompanyFiledSearch: ["Company_Id", "Company_Name"],
            CompanyInputField: ["Company_Id", "Company_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],

            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000005",
                System_Key: "FinancialManage"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            childSearchModel: [{
                //子表关联主表的外键
                Field_Name: ["F_Pay_Bill_Detail.Pay_Bill_Id"],
                //父表主键
                Parent_Key: ["Pay_Bill_Id"],
                //子表格id
                Child_List: 'PaymentFormDetail',
                //子表格查询地址
                Detail_Seach: 'DetailSeach',
                //默认显示在第3列
                Default_Child: "true"
            }],
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
            //数字合计
            childtotalback: function (Field_Name, a, b) {
                var vm = this;

                if (Field_Name === "Should_Pay_Amount" || Field_Name === "Fact_Pay_Amount") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
                }

            },
            //表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {

                
                if (Field_Name === "Should_Pay_Amount" || Field_Name === "Fact_Pay_Amount") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PaymentFormList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Pay_Bill_Id + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //修改
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PaymentFormList");

                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //详细画面更新跳转
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Pay_Bill_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("PaymentFormList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //调用删除共同方法
                PageCommon.SubmitDetialForm({
                    url: "Invalid",
                    param: selectRow,
                    type: '0',
                    success: function () {
                        PageCommon.RefreshTablePage("PaymentFormList");  //刷新数据
                    },
                    close: true
                })
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PaymentFormList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Pay_Bill_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //审批意见
            mApproval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PaymentFormList");
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
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'F_Pay_Bill',
                    menu_Id: 'M000005',
                    list_Id: 'PaymentFormList',
                    systemKey: 'FinancialManage',
                    vm: Payment_vue
                })
            },

            //设置
            Set: function () {

            },
            //查询
            Search: function () {
                Payment_vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000005", List_Id: "PaymentFormList" });
            },
            //清除
            mClear: function () {
                this.Pay_Item = '';
                this.Payment_Method = '';
                this.Pay_Department_Id = '';
                this.Company_Id = '';
                this.Supplier_Id = '';
                this.Approval_Status = '';
                $('#Pay_Item').val(null).trigger('change');
                $('#Payment_Method').val(null).trigger('change');
                $('#Company_Id').val(null).trigger('change');
                $('#Approval_Status').val(null).trigger('change');
            }
        }
    });
