//菜单主键
var keyValue = PageCommon.Request("keyValue");
var product_vue = new Vue({
    el: '#apps',
    data: {
        B_Product: {
            //型号规格
            Product_Name: '',
            //型号id
            Product_Purchase: '',
            Product_Id: '',
            //分类
            Custom: '',
            Pc: '',
            Production_Month: '',
            Tm: '',
            //产地
            Product_Area_Name: '',
            //品牌
            Brand_Name: '',
            Package: '',
            Unit_Name: '',
            is_purchase: '',
            //定价
            Product_Price: {
                Price_Value1: '',
                Price_Value2: '',
                Price_Value3: '',
                Price_Value4: '',
                Price_Value5: '',
                Coefficient_Value1: '',
                Coefficient_Value2: '',
                Coefficient_Value3: '',
                Coefficient_Value4: '',
                Coefficient_Value5: "",
                Price_Difference_Name: "",
                B_Product_Price_Detail_List: [],
            },
        },
        //信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000026",
            System_Key: "BasicData",
            List_Id: ""
        },
        //位数cookie
        globalParameter: {},
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $('.contact').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        //页签折叠
        $(".title1").click(function () {
            $(this).parent().find(".BasicInformation").slideToggle();
            $(this).parent().find(".down_tab").toggleClass("rotate");
            $(this).toggleClass("boder");
        })
        $(".down_tab").click(function () {
            $(this).parent().find(".BasicInformation").slideToggle();
            $(this).parent().find(".title1").toggleClass("boder");
            $(this).toggleClass("rotate");
        })
        $(".down_2").click(function () {
            $(this).toggleClass("rotate");
            $(".BasicInformation").slideToggle();
            $(".title1").toggleClass("boder");
            $(".down_tab").toggleClass("rotate");
        })
        var vm = this;
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    product_vue.B_Product = data;
                }
            });
        }
    },
    methods: {
        //datacallback: function (rowdata) {
        //    if (Array.isArray(rowdata)) {
        //        rowdata = rowdata[0];
        //        product_vue.datacallbackData = rowdata;
        //        console.log(product_vue.datacallbackData);
        //    }

        //},
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Tag_Name") {
                var html = "<span class=\"label  label-success\">启用</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            } else if (Field_Name === "Latest_Price_Is_Include_Tax_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            } else if (Field_Name === "Standard_Price_Is_Include_Tax_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }
            if (Field_Name === "Tax_Rate") {
                return '1.170000';
            }
            //if (Field_Name === "Customs_Duty") {  //关税
            //    return product_vue.B_Product.Custom;
            //}
            //价税合计
            if (Field_Name === "Price_Tax_Sum") {
               
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //单价总额
            if (Field_Name === "Price_Sum") {
               
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //价税总额
            if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount" || Field_Name === "Lastest_Price_Include_Tax" || Field_Name === "Latest_Price_No_Include_Tax") {
               
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //单价
            if (Field_Name === "Price" || Field_Name === "Standard_Price") {
              
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //
            if (Field_Name === "L_P_Currency_Exchange_Rate") {
              
                return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {
               
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "Tax_Rate") {
               
                return PageCommon.NumberDispose(value, 6, 1);

            }
            if (Field_Name === "Is_Tag") {
                return '0';
            }
            else if (Field_Name === "Latest_Price_Is_Include_Tax") {
                return '1';
            }
            else if (Field_Name === "Standard_Price_Is_Include_Tax_Name") {
                return '1';
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData, datatable) {
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Remark") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Remark").html();

                $("#div_temp_Remark").attr("id", "div_temp_Remark_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Remark_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });

                //设置控件在DataTables上
                var jqInputs = $('textarea', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
                $(".outer-lg", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Order_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Order_Count").html();
                $("#div_temp_Order_Count").attr("id", "div_temp_Order_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Order_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Order_Count: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Order_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Standard_Price") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Standard_Price").html();
                $("#div_temp_Standard_Price").attr("id", "div_temp_Standard_Price_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Standard_Price_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Standard_Price: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Standard_Price_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Price_Explain") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Price_Explain").html();
                $("#div_temp_Price_Explain").attr("id", "div_temp_Price_Explain_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Price_Explain_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Price_Explain: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Price_Explain_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Coder") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Coder").html();
                $("#div_temp_Coder").attr("id", "div_temp_Coder_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Coder_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Coder: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Coder_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Login_Explain") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Login_Explain").html();
                $("#div_temp_Login_Explain").attr("id", "div_temp_Login_Explain_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Login_Explain_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Login_Explain: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Login_Explain_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Supplier_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }

                //获取模板的html
                cell.node().innerHTML = $("#temp_Supplier_Name").html();
                $("#div_temp_Supplier_Name").attr("id", "div_temp_Supplier_Name_" + cell.index().row + "_" + cell.index().column);
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', 4, { search: 'applied' });
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Supplier_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        //Packageresult: ["Supplier_Id", "Supplier_Name", "Tax_Rate_Id"],
                        //PackagefiledSearch: ["Supplier_Id", "Supplier_Name", "Tax_Rate_Id"],
                        //PackagemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                        //PackageinputField: ["Supplier_Id", "Supplier_Name"],
                        //SupplierWhere:[{
                        //    "Main_Where_List": [{
                        //        Field_Name: "Supplier_Type",
                        //        Condition_Value1: "01",
                        //        Expression: "02",
                        //        Module_Id: "BasicData",
                        //        Query_Type: "01",

                        //    }]
                        //}],
                        Supplier_Name: ""
                    },
                    mounted: function () {
                        this.Supplier_Name = cell_active.data();
                    },
                    methods: {
                        TemplateSelection: function (value) {
                            if (value) {
                                cell.Supplier_Id = value.id;
                                cell.Supplier_Name = value.name;
                                //设置控件在DataTables上
                                var productdata = PageCommon.GetDataTableData("ProductOrderPriceDetailList");
                                var name = productdata[cell.index().row].Latest_Price_Currency_Id;
                                if (name) {
                                    PageCommon.GetSeachTableData({
                                        tableName: "B_Supplier_Charge",
                                        systemKey: "BasicData",
                                        mainWhere: [{
                                            Field_Name: "Supplier_Id",
                                            Value1: value,
                                            Expression: '03',
                                        },
                                        {
                                            Field_Name: "Currency_Id",
                                            Value1: name,
                                            Expression: '03',
                                        }],
                                        filedSeach: ["Charge"],
                                        success: function (data) {
                                            if (data.length > 0) {
                                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' });
                                                lenght.data(parseFloat(data[0].Charge).toFixed(4));
                                            }
                                        }
                                    })
                                }
                            } else {
                                cell.Supplier_Id = '';
                                cell.Supplier_Name = '';
                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' });
                                lenght.data('');
                            }
                        }
                    }
                });
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Customer_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Customer_Name").html();
                $("#div_temp_Customer_Name").attr("id", "div_temp_Customer_Name_" + cell.index().row + "_" + cell.index().column);
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', 6, { search: 'applied' });
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Customer_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Customerresult: ["Customer_Id", "Customer_Name", "Tax_Rate_Id"],
                        CustomerfiledSearch: ["Customer_Id", "Customer_Name", "Tax_Rate_Id"],
                        CustomermainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                        CustomerinputField: ["Customer_Id", "Customer_Name"],
                        CustomerWhere: [{
                            "Main_Where_List": [{
                                Field_Name: "Customer_Status",
                                Condition_Value1: "03",
                                Expression: "02",
                                Module_Id: "BasicData",
                                Query_Type: "01",

                            }]
                        }],
                        Customer_Name: ""
                    },
                    mounted: function () {
                        this.Customer_Name = cell_active.data();
                    },
                    methods: {
                        TemplateSelectionCustomer: function (data) {
                            if (data) {
                                cell.Customer_Id = data.id;
                                cell.Customer_Name = data.name;
                            } else {
                                cell.Customer_Id = '';
                                cell.Customer_Name = '';
                            }
                        }
                    }
                });
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Latest_Price_Currency_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Latest_Price_Currency_Name").html();
                $("#div_temp_Latest_Price_Currency_Name").attr("id", "div_temp_Latest_Price_Currency_Name" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Latest_Price_Currency_Name" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Latest_Price_CurrencyName: rowData.Latest_Price_Currency_Id,
                        //系统下拉框查询条件
                        CurrencyWhere: [],
                        //系统下拉框排序
                        CurrencyOrder: [{
                            Field_Name: "Create_Time",
                            Orderby: "ASC"
                        }],
                        //系统下拉框显示字段
                        CurrencyResult: ["Currency_Id", "Currency_Name", "Exchange_Rate"], //, "Exchange_Rate"
                    },
                    methods: {
                        LatestPricechange: function (value) {
                            if (value) {
                                var productdata = PageCommon.GetDataTableData("ProductOrderPriceDetailList");
                                var name = productdata[cell.index().row].Supplier_Id;
                                if (name) {
                                    PageCommon.GetSeachTableData({
                                        tableName: "B_Supplier_Charge",
                                        systemKey: "BasicData",
                                        mainWhere: [{
                                            Field_Name: "Supplier_Id",
                                            Value1: name,
                                            Expression: '03',
                                        },
                                        {
                                            Field_Name: "Currency_Id",
                                            Value1: value.id,
                                            Expression: '03',
                                        }],
                                        filedSeach: ["Charge"],
                                        success: function (data) {
                                            if (data.length > 0) {
                                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' });
                                                lenght.data(parseFloat(data[0].Charge).toFixed(4));
                                            }
                                        }
                                    })
                                }
                                var vm = this;
                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 16, { search: 'applied' });
                                lenght.data(value.Exchange_Rate);

                                //关税
                                var CustomsDuty = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customs_Duty' });
                                var IsIncludeCustomsDuty = "";
                                if (value.text == "人民币") {
                                    IsIncludeCustomsDuty = "1.000000";
                                } else {
                                    IsIncludeCustomsDuty = product_vue.B_Product.Custom;
                                }
                                cell.cell(':eq(' + cell.index().row + ')', CustomsDuty, { search: 'applied' }).data(IsIncludeCustomsDuty);
                            } else {
                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' });
                                lenght.data('');
                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 16, { search: 'applied' });
                                lenght.data('');
                                var CustomsDuty = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customs_Duty' });
                                cell.cell(':eq(' + cell.index().row + ')', CustomsDuty, { search: 'applied' }).data('');

                            }
                        },
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Latest_Price_Currency_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Account_Way_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Account_Way").html();
                $("#div_temp_Account_Way").attr("id", "div_temp_Account_Way_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Account_Way_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        //dictionary_key: "COMPUTE_TYPE",
                        Account_Way: rowData.Account_Way
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Account_Way_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);


            }
            else if (titleData.mData == "Standard_Price_Currency_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Standard_Price_Currency_Name").html();
                $("#div_temp_Standard_Price_Currency_Name").attr("id", "div_temp_Standard_Price_Currency_Name" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Standard_Price_Currency_Name" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Standard_Price_CurrencyName: rowData.Standard_Price_Currency_Id,
                        //系统下拉框查询条件
                        CurrencyWhere: [],
                        //系统下拉框排序
                        CurrencyOrder: [{
                            Field_Name: "Create_Time",
                            Orderby: "ASC"
                        }],
                        //系统下拉框显示字段
                        CurrencyResult: ["Currency_Id", "Currency_Name", 'Exchange_Rate'],
                    },
                    methods: {
                        StandardPricechange: function (value) {
                            var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'S_P_Currency_Exchange_Rate' });
                            var lenght = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });
                            if (value) {
                                var vm = this;
                                //var datas = vm.message;
                                //var obj = null;
                                ////var ds = datas.dt;
                                //$.each(datas, function (index, item) {
                                //    if (value == item.id) {
                                //        obj = item;
                                //        return false;
                                //    }
                                //});
                                //获取下C_CustomerId的下标
                                //var lenght = cell.cell(':eq(' + cell.index().row + ')', 16, { search: 'applied' });
                                lenght.data(value.Exchange_Rate);
                            } else {
                                lenght.data('');
                            }
                        },
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Standard_Price_Currency_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Industry_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Industry_Name").html();
                $("#div_temp_Industry_Name").attr("id", "div_temp_Industry_Name" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Industry_Name" + cell.index().row + "_" + cell.index().column,
                    data: {
                        IndustryName: rowData.Industry,
                        //系统下拉框查询条件
                        IndustryWhere: [],
                        //系统下拉框排序
                        IndustryOrder: [{
                            Field_Name: "Create_Time",
                            Orderby: "ASC"
                        }],
                        //系统下拉框显示字段
                        IndustryResult: ["Industry_Id", "Industry_Name"],
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Industry_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Latest_Price_Is_Include_Tax_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Latest_Price_Is_Include_Tax").html();
                $("#div_temp_Latest_Price_Is_Include_Tax").attr("id", "div_temp_Latest_Price_Is_Include_Tax_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Latest_Price_Is_Include_Tax_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Latest_Price_Is_Include_Tax: rowData.Latest_Price_Is_Include_Tax == '' ? '1' : rowData.Latest_Price_Is_Include_Tax
                    },

                });
            }
            else if (titleData.mData == "Standard_Price_Is_Include_Tax_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Standard_Price_Is_Include_Tax").html();
                $("#div_temp_Standard_Price_Is_Include_Tax").attr("id", "div_temp_Standard_Price_Is_Include_Tax_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Standard_Price_Is_Include_Tax_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Standard_Price_Is_Include_Tax: rowData.Standard_Price_Is_Include_Tax == '' ? '1' : rowData.Standard_Price_Is_Include_Tax
                    }
                });
            }
            else if (titleData.mData == "Is_Tag_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Is_Tag").html();
                $("#div_temp_Is_Tag").attr("id", "div_temp_Is_Tag_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Is_Tag_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Is_Tag: rowData.Is_Tag == '' ? '0' : rowData.Is_Tag
                    }
                });
            }
            else if (titleData.mData == "Unit_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Unit_Name").html();
                $("#div_temp_Unit_Name").attr("id", "div_temp_Unit_Name" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Unit_Name" + cell.index().row + "_" + cell.index().column,
                    data: {
                        UnitId: rowData.Unit_Id,
                        //系统下拉框查询条件
                        systemWhere: [],
                        //系统下拉框排序
                        systemOrder: [{
                            Field_Name: "Create_Time",
                            Orderby: "ASC"
                        }],
                        //系统下拉框显示字段
                        systemResult: ["Unit_Id", "Unit_Name"],
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Unit_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Latest_Price") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Latest_Price").html();
                $("#div_temp_Latest_Price").attr("id", "div_temp_Latest_Price_" + cell.index().row + "_" + cell.index().column);
                //计算方式
                var AccountWay = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Account_Way_Name' });
                var IsIncludeAccountWay = cell.cell(':eq(' + cell.index().row + ')', AccountWay, { search: 'applied' }).data();
                //币种
                var LatestPrice = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Latest_Price_Currency_Name' });
                var IsIncludeLatestPrice = cell.cell(':eq(' + cell.index().row + ')', LatestPrice, { search: 'applied' }).data();
                //最新成本价是否含税
                var LatestPriceIsIncludeTax = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Latest_Price_Is_Include_Tax_Name' });
                var IsIncludeTax = cell.cell(':eq(' + cell.index().row + ')', LatestPriceIsIncludeTax, { search: 'applied' }).data();
                if (IsIncludeTax == "" || IsIncludeTax == "否") {
                    IsIncludeTax = "否";
                }
                //关税
                var CustomsDuty = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customs_Duty' });
                var IsIncludeCustomsDuty = "";
                if (IsIncludeLatestPrice == "人民币") {
                    IsIncludeCustomsDuty = "1.000000";
                } else {
                    IsIncludeCustomsDuty = product_vue.B_Product.Custom;
                }
                cell.cell(':eq(' + cell.index().row + ')', CustomsDuty, { search: 'applied' }).data(IsIncludeCustomsDuty);

                //费用
                var Exponse = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Exponse' });
                var IsIncludeExponse = cell.cell(':eq(' + cell.index().row + ')', Exponse, { search: 'applied' }).data();
                //税率
                var TaxRate = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Tax_Rate' });
                var IsIncludeTaxRate = "1.17000";
                //汇率
                var CurrencyExchangeRate = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'L_P_Currency_Exchange_Rate' });
                var IsIncludeCurrencyExchangeRate = cell.cell(':eq(' + cell.index().row + ')', CurrencyExchangeRate, { search: 'applied' }).data();

                //价税合计(最新成本价 含税)
                var Lastest_Price_Include_Tax = cell.cell(':eq(' + cell.index().row + ')', 24, { search: 'applied' });
                //单价  (最新成本价 不含税)
                var Latest_Price_No_Include_Tax = cell.cell(':eq(' + cell.index().row + ')', 25, { search: 'applied' });
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Latest_Price_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Latest_Price: cell.data()
                    },
                    methods: {
                        Priceonchange: function (value) {
                            if (value) {
                                if (IsIncludeTaxRate && IsIncludeCurrencyExchangeRate && IsIncludeExponse && IsIncludeCustomsDuty && IsIncludeLatestPrice && IsIncludeAccountWay && IsIncludeTax) {
                                    if (IsIncludeLatestPrice != "人民币") {
                                        if (IsIncludeAccountWay == "乘") {
                                            if (IsIncludeTax == "是") {
                                                Lastest_Price_Include_Tax.data((parseFloat(value) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse) * parseFloat(IsIncludeCurrencyExchangeRate)));
                                                Latest_Price_No_Include_Tax.data((parseFloat(value) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse) * parseFloat(IsIncludeCurrencyExchangeRate)) / parseFloat(IsIncludeTaxRate));
                                            }
                                            else {
                                                var hanshuijia = parseFloat(value) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse) * parseFloat(IsIncludeCurrencyExchangeRate).toFixed(2)
                                                Lastest_Price_Include_Tax.data(hanshuijia * parseFloat(IsIncludeTaxRate).toFixed(4));
                                                Latest_Price_No_Include_Tax.data((parseFloat(value) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse) * parseFloat(IsIncludeCurrencyExchangeRate)).toFixed(2));
                                            }
                                        } else {
                                            if (IsIncludeTax == "是") {
                                                Lastest_Price_Include_Tax.data((parseFloat(value) / Math.abs(parseFloat(IsIncludeCurrencyExchangeRate)) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse)).toFixed(4));
                                                Latest_Price_No_Include_Tax.data((parseFloat(value) / Math.abs(parseFloat(IsIncludeCurrencyExchangeRate)) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse)) / parseFloat(IsIncludeTaxRate));
                                            }
                                            else {
                                                Lastest_Price_Include_Tax.data((parseFloat(value) * parseFloat(IsIncludeCurrencyExchangeRate) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse)).toFixed(2));
                                                Latest_Price_No_Include_Tax.data(((parseFloat(value) / Math.abs(parseFloat(IsIncludeCurrencyExchangeRate)) * parseFloat(IsIncludeCustomsDuty) * parseFloat(IsIncludeExponse))).toFixed(2) * parseFloat(IsIncludeTaxRate).toFixed(4));
                                            }
                                        }
                                    } else {
                                        if (IsIncludeTax == "是") {
                                            Lastest_Price_Include_Tax.data((parseFloat(value)).toFixed(4));
                                            Latest_Price_No_Include_Tax.data(((parseFloat(value).toFixed(4)) / parseFloat(IsIncludeTaxRate)).toFixed(2));
                                        }
                                        else {
                                            Lastest_Price_Include_Tax.data((parseFloat(value).toFixed(2) * parseFloat(IsIncludeTaxRate)).toFixed(4));
                                            Latest_Price_No_Include_Tax.data((parseFloat(value).toFixed(2)));
                                        }
                                    }
                                }

                            }

                        }
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Latest_Price_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Remark") {
                var jqInputs = $('textarea', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            }
            if (titleData.mData == "Unit_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 9, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                console.log($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).find("option:selected").html()) {
                        cell.data($(jqInputs[0]).find("option:selected").html());
                    } else {
                        cell.data("");
                    }
                }
            }
            if (titleData.mData == "Latest_Price_Currency_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 14, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                console.log($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).find("option:selected").html()) {
                        cell.data($(jqInputs[0]).find("option:selected").html());
                    } else {
                        cell.data("");
                    }
                }
            }
            if (titleData.mData == "Standard_Price_Currency_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 20, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                console.log($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).find("option:selected").html()) {
                        cell.data($(jqInputs[0]).find("option:selected").html());
                    } else {
                        cell.data("");
                    }
                }
            }
            else if (titleData.mData == "Supplier_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Supplier_Name_" + cell.index().row + "_" + cell.index().column);
                if (typeof (cell.Supplier_Name) == "undefined") {
                    console.log(2222)
                    cell.Supplier_Id = $(jqInputs).val();
                    cell.Supplier_Name = $(jqInputs).text();
                    console.log($(jqInputs))
                    console.log($(jqInputs).val())

                }

                //修改第2列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 4, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Supplier_Id);
                        cell.data(cell.Supplier_Name);
                    } else {
                        cell.data("");
                    }

                }
            }
            else if (titleData.mData == "Customer_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Customer_Name_" + cell.index().row + "_" + cell.index().column);
                if (typeof (cell.Customer_Name) == "undefined") {
                    cell.Customer_Id = $(jqInputs).val();
                    cell.Customer_Name = $(jqInputs).text();
                }

                //修改第2列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 6, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Customer_Id);
                        cell.data(cell.Customer_Name);
                    } else {
                        cell.data("");
                    }

                }
            }
            else if (titleData.mData == "Industry_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 26, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                console.log($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).find("option:selected").html()) {
                        cell.data($(jqInputs[0]).find("option:selected").html());
                    } else {
                        cell.data("");
                    }
                }
            }
            else if (titleData.mData == "Latest_Price_Is_Include_Tax_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 17, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Latest_Price_Is_Include_Tax);
                //修改datatable 对应的值
                cell.data(value);

            }
            else if (titleData.mData == "Standard_Price_Is_Include_Tax_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 23, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Standard_Price_Is_Include_Tax_Name);
                //修改datatable 对应的值
                cell.data(value);

            }
            else if (titleData.mData == "Is_Tag_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 31, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("ORDER_PRICE_TAG", rowData.Is_Tag);
                //修改datatable 对应的值
                cell.data(value);

            }
            else if (titleData.mData == "Account_Way_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 40, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                console.log($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).find("option:selected").html()) {
                        cell.data($(jqInputs[0]).find("option:selected").html());
                    } else {
                        cell.data("");
                    }
                }


            }
            else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }



        },

        //设置控件属性
        Set: function (val) {

        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            $('#ProductOrderPriceDetailList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "ProductOrderPriceDetailList",
                Key: "Order_Count",
                columns: [
                     {
                         columnName: "Supplier_Id",
                         CheckEmpty: true
                     },
                     {
                         columnName: "Supplier_Name",
                         CheckEmpty: true
                     },
                      {
                          columnName: "Customer_Id",
                          CheckEmpty: true,
                      },
                    {
                        columnName: "Customer_Name",
                        CheckEmpty: true,
                    },
                     {
                         columnName: "Account_Way",
                         CheckEmpty: true
                     },
                      {
                          columnName: "Account_Way_Name",
                          CheckEmpty: true
                      },
                      {
                          columnName: "Order_Count",
                          CheckEmpty: true,
                          CheckLength: '15'
                      },
                       {
                           columnName: "Standard_Price",
                           CheckEmpty: true,
                           CheckLength: '15'
                       },
                       {
                           columnName: "Price_Explain",
                           CheckLength: '15'
                       },
                       
                         {
                             columnName: "Latest_Price_Currency_Id",
                             CheckEmpty: true,
                         },
                         {
                             columnName: "Latest_Price_Currency_Name",
                             CheckEmpty: true,
                         },
                          
                            {
                                columnName: "Standard_Price_Currency_Id",
                                CheckEmpty: true,
                            },
                             {
                                 columnName: "Standard_Price_Currency_Name",
                                 CheckEmpty: true,
                             },
                              {
                                  columnName: "Industry",
                                  CheckEmpty: true,
                              },
                               {
                                   columnName: "Industry_Name",
                                   CheckEmpty: true,
                               },
                              {
                                  columnName: "Latest_Price",
                                  CheckEmpty: true,
                                  CheckLength: '15'
                              },
                                {
                                    columnName: "Login_Explain",
                                    CheckLength: '15'
                                },
                                {
                                    columnName: "Coder",
                                    CheckLength: '15'
                                },
                                {
                                    columnName: "Remark",
                                    CheckLength: '200'
                                }


                ],
            });
            console.log(product_vue.B_Product);
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            if (!product_vue.B_Product.Product_Price.Product_Price_Id) {
                PageCommon.ShowMessageRight("I3075");
                return;
            }
            //获取grid数据
            var productdata = PageCommon.GetDataTableData("ProductOrderPriceDetailList");
            product_vue.B_Product.Product_Price.B_Product_Price_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(productdata, function (index, item) {
                if (item.Supplier_Id != "") {
                    if (item.Detail_Number) {
                        for (var key in item) {
                            var keyTypes = typeof item[key];
                            if (keyTypes != 'object' && keyTypes != 'function') {
                                item[key] = item[key];
                            }
                        }
                        //  obj.Product_Price_Id = product_vue.B_Product.Product_Price.Product_Price_Id;
                        item.Customs_Duty = product_vue.B_Product.Custom;
                        item.Latest_Price_Is_Include_Tax = item.Latest_Price_Is_Include_Tax == "" ? 1 : item.Latest_Price_Is_Include_Tax;
                        item.Latest_Price_Is_Include_Tax_Name = item.Latest_Price_Is_Include_Tax == "0" ? "是" : "否";
                        item.Standard_Price_Is_Include_Tax = item.Standard_Price_Is_Include_Tax == "" ? 1 : item.Standard_Price_Is_Include_Tax;
                        item.Standard_Price_Is_Include_Tax_Name = item.Standard_Price_Is_Include_Tax == "0" ? "是" : "否";
                        item.Is_Tag = item.Is_Tag == "" ? 0 : item.Is_Tag;
                        item.Is_Tag_Name = item.Is_Tag == "0" ? "启用" : "作废";
                        product_vue.B_Product.Product_Price.B_Product_Price_Detail_List.push(item);
                    } else {
                        var obj = {};
                        for (var key in item) {
                            var keyTypes = typeof item[key];
                            if (keyTypes != 'object' && keyTypes != 'function') {
                                obj[key] = item[key];
                            }
                        }
                        obj.Product_Price_Id = product_vue.B_Product.Product_Price.Product_Price_Id;
                        obj.Customs_Duty = product_vue.B_Product.Custom;
                        obj.Latest_Price_Is_Include_Tax = item.Latest_Price_Is_Include_Tax == "" ? 1 : item.Latest_Price_Is_Include_Tax;
                        obj.Latest_Price_Is_Include_Tax_Name = obj.Latest_Price_Is_Include_Tax == "0" ? "是" : "否";
                        obj.Standard_Price_Is_Include_Tax = item.Standard_Price_Is_Include_Tax == "" ? 1 : item.Standard_Price_Is_Include_Tax;
                        obj.Standard_Price_Is_Include_Tax_Name = obj.Standard_Price_Is_Include_Tax == "0" ? "是" : "否";
                        obj.Is_Tag = item.Is_Tag == "" ? 0 : item.Is_Tag;
                        obj.Is_Tag_Name = obj.Is_Tag == "0" ? "启用" : "作废";
                        product_vue.B_Product.Product_Price.B_Product_Price_Detail_List.push(obj);
                    }
                }
            });

            //验证至少输入一条明细
            if (!product_vue.B_Product.Product_Price.B_Product_Price_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //if (product_vue.deleteList.length > 0)
            //{
            //    product_vue.B_Product.Product_Price.B_Product_Price_Detail_List = product_vue.B_Product.Product_Price.B_Product_Price_Detail_List.concat(product_vue.deleteList);
            //}

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { productPrice: product_vue.B_Product.Product_Price }
             , success: function () {
                 //判断编辑还是新增
                 if (!!!keyValue) {
                     PageCommon.Reload();
                 } else {
                     window.location.href = PageCommon.SetUrl("List");
                 }
             }
            });
        },
        TemplateSelectionProduct: function (result) {
            if (result) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: [result.Product_Id] },
                    success: function (data) {
                        data.Product_Purchase = result.Product_Purchase;
                        product_vue.B_Product = data;
                        if (!data.Product_Price) {

                            data.Product_Price = { B_Product_Price_Detail_List: [] };
                        }
                    }
                });

            } else {
                product_vue.B_Product = {
                    Product_Price: {
                        B_Product_Price_Detail_List: []
                    }
                };
            }
        },
        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        }
    }
});