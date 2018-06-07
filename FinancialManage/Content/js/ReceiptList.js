
    var Receipt_vue = new Vue({
        el: '#apps',
        data: {
            //收款方式
            Receipt_Way: "",
            //到账日期
            Arrive_Account_Date: '',
            //客户
            Customer_Id: '',
            //任务人
            Employee_Id: '',
            //任务人部门
            Department_Id:'',
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000007",
                System_Key: "FinancialManage"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},

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
            pagetotalback: function (Field_Name, a, b) {
                var vm = this;

                if (Field_Name === "Receipt_Sum" || Field_Name === "Goods_Pay" || Field_Name === "Earnest" || Field_Name === "Freight" || Field_Name === "Other") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
                }
               
                
            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Arrive_Account_Date") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
                if (Field_Name === "Receipt_Sum" || Field_Name === "Goods_Pay" || Field_Name === "Earnest" || Field_Name === "Freight" || Field_Name === "Other") {
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
            //修改
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ReceiptFormList");

                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //详细画面更新跳转
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Receipt_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("ReceiptFormList");
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
                        PageCommon.RefreshTablePage("PayRefundList");  //刷新数据
                    },
                    close: true
                })
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ReceiptFormList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Receipt_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //审批意见
            mApproval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ReceiptFormList");
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
                    tableName: 'F_Receipt',
                    menu_Id: 'M000007',
                    list_Id: 'ReceiptFormList',
                    systemKey: 'FinancialManage',
                    vm: Receipt_vue
                })
            },
           
            //设置
            Set: function () {

            },
            //查询
            Search: function () {
                Receipt_vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000007", List_Id: "ReceiptFormList" });
            },
            //清除
            mClear: function () {
                this.Receipt_Way = '';
                this.Arrive_Account_Date = '';
                this.Customer_Id = '';
                this.Employee_Id = '';
                this.Department_Id = '';
                $('#Customer_Id').val(null).trigger('change');
                $('#Employee_Id').val(null).trigger('change');
                $('#Department_Id').val(null).trigger('change');
            }
        }
    });
