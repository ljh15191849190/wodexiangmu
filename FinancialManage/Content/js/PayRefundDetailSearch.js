﻿  var vmPayRefundSearch = new Vue({
        el: '#app',
        data: {
            //付款项目
            Pay_Item: '',
            //付款方式
            Payment_Method: '',
            //付款部门
            Pay_Department_Id: '',
            //供应商
            Supplier_Id: '',
            //审核状态
            Approval_Status: '',
            Companyresult: ["Company_Id", "Company_Name"],
            CompanyFiledSearch: ["Company_Id", "Company_Name"],
            CompanyInputField: ["Company_Id", "Company_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000006",
                System_Key: "FinancialManage"
            },
            //表格查询url
            tableUrl: "PaymentDetailSearch",
            //表格查询条件
            searchModel: {

            },

            //位数cookie
            globalParameter: {},

            //行数据
            selectRow: []
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
                
                if (Field_Name === "Fact_Pay_Amount") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
                }
            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                
                if (Field_Name === "Fact_Pay_Amount") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                }
            },
            //查询
            Search: function () {
                vmPayRefundSearch.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000006", List_Id: "PaymentFormSearchList" });
            },
            SelectRow: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PaymentFormSearchList");
                return selectRow;
            },
            //清除
            mClear: function () {
                this.Pay_Item = '';
                this.Payment_Method = '';
                this.Company_Id = '';
                this.Approval_Status = '';
                $('#Pay_Item').val(null).trigger('change');
                $('#Payment_Method').val(null).trigger('change');
                $('#Company_Id').val(null).trigger('change');
                $('#Approval_Status').val(null).trigger('change');
            }
        }
    });
