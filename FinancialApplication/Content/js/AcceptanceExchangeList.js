var AcceptBillApply_vue = new Vue({
    el: '#apps',
    data: {
        globalParameter: PageCommon.GlobalParameter(),
        //是否显示设置按钮
        btnSet: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000011",
            System_Key: "FinancialApplication"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        FA_Accept_Bill: {
            //单号
            Accept_Bill_Apply_Id: "",
            //承兑归属任务人
            Accept_Bill_Belong_Employee_Name: "",
            //任务人
            Employee_Name: "",
            //任务人部门
            Department_Name: "",
            //承兑汇票状态
            Accept_Bill_Status: "",
            //承兑汇票号码
            Accept_Bill_Number: "",
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
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'FA_Accept_Bill',
                menu_Id: 'M000002',
                list_Id: 'AcceptBillList',
                systemKey: 'FinancialApplication',
                vm: AcceptBillApply_vue
            })
        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("AcceptBillList");
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("AcceptBillList");  //刷新数据
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
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "AcceptBillList" });
        },
        //清除
        mClear: function () {
            this.FA_Accept_Bill.Accept_Bill_Apply_Id = "";
            this.FA_Accept_Bill.Approval_Status = "";
            this.FA_Accept_Bill.Accept_Bill_Belong_Employee_Name = "";
            this.FA_Accept_Bill.Employee_Name = "";
            this.FA_Accept_Bill.Department_Name = "";
            this.FA_Accept_Bill.Accept_Bill_Number = "";
            $('#Approval_Status').val(null).trigger('change');
            PageCommon.TableDefaultSort("AcceptBillList");
        },
    }
});