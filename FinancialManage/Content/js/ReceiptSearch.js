
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
                Department_Id: '',
                //表头查询条件
                columHeaderSeach: {
                    Menu_Id: "M000007",
                    System_Key: "FinancialManage"
                },
                //表格查询url
                tableUrl: "ReceiptDataSearch",
                //表格查询条件
                searchModel: {},

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

                    if (Field_Name === "Receipt_Sum" || Field_Name === "Goods_Pay" || Field_Name === "Earnest" || Field_Name === "Freight") {
                        return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
                    }

                },
                //表格行初始化
                columrender: function (Field_Name, value, type, rowData, rowSetting) {

                    if (Field_Name === "Receipt_Sum" || Field_Name === "Goods_Pay" || Field_Name === "Earnest" || Field_Name === "Freight") {
                        if (!value) {
                            value = 0;
                        }
                        return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                },

                SelectRow: function () {
                    //取得选择行数据
                    var selectRow = PageCommon.GetTableSelectRow("ReceiptFormList");
                    return selectRow;
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
