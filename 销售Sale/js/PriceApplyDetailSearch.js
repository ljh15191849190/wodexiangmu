var RequestValue = PageCommon.Request();
    var vmPriceApplyDetail = new Vue({
        el: '#app',
        data: {
            //型号规格
            Product_Id: '',
            productrange: {
                first: "",
                second: ""
            },
            //产品分类名称
            Product_Classify_Id:'',
            //品牌
            Brand_Id:'',
            //产地名称
            Product_Area_Id:'',
            //油脂包装
            Package:'',

            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            Arearesult: ["Product_Area_Id", "Product_Area_Name"],
            AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
            AreaInputField: ["Product_Area_Id", "Product_Area_Name"],

            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000002",
                System_Key: "Sale"
            },
            //表格查询url
            tableUrl: "DetailAndProductSeach",
            //表格查询条件
            searchModel: {
                Where_Parameter_List: [{
                    Field_Name: "B_Product.Customer_Id",
                    Query_Type: "01",
                    Expression: "02",
                    Condition_Value1: RequestValue.Customer_Id,
                    Contorl_Id: "Customer_Id"
                }]
            },
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
            totalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Apply_Count") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }

                if (Field_Name === "Price_Tax_Sum" || Field_Name === "Total_Price") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Total_Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //YJ
                if (Field_Name === "Commission") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
                }
                //税额
                if (Field_Name === "Tax") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
                //申请成本 最新成本
                if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
                }
            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Delivery_Date") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
                //销售数量 退货数量
                if (Field_Name === "Apply_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }

                //价税合计
                if (Field_Name === "Price_Tax_Sum" || Field_Name === "Total_Price") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //YJ率
                if (Field_Name === "Commission_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.YJ_Rate_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                }
                //库存利润率 期货利润率
                if (Field_Name === "Storage_Rate" || Field_Name === "Futures_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
                }
                //单价总额
                if (Field_Name === "Price_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //价税总额
                if (Field_Name === "Total_Price_Tax_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //YJ
                if (Field_Name === "Commission") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                }
                //税额
                if (Field_Name === "Tax") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //申请成本 最新成本
                if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
                }
                //单价
                if (Field_Name === "Price" || Field_Name === "Customer_Receive_Price" || Field_Name === "Net_Price") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            },

            //查询
            Search: function () {
                var searchData = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "PriceApplyDetail" });
                searchData.Where_Parameter_List.push({ Field_Name: "B_Product.Customer_Id", Query_Type: "01", Expression: "02", Condition_Value1: RequestValue.Customer_Id, Contorl_Id: "Customer_Id" });
                vmPriceApplyDetail.searchModel = searchData;
            },
            //清除
            mClear: function () {
                this.productrange.first = '';
                this.productrange.second = '';
                this.Product_Classify_Id = '';
                this.Brand_Id = '';
                this.Package = '';
                this.Product_Area_Id = '';


                $('#Product_Area_Id').val(null).trigger('change');
            }
        }
    });
