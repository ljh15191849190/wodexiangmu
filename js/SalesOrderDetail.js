
    //主键
    var RequestValue = PageCommon.Request();
if (RequestValue.relevantnumber) {
    var relevantnumber = RequestValue.relevantnumber;
    if (relevantnumber.indexOf(',') != -1) {
        relevantnumber = relevantnumber.split(",");
    } else {
        relevantnumber = [relevantnumber];
    }
}
if (RequestValue.save) {
    var save = RequestValue.save;
}
var SalesOrder_vue = new Vue({
    el: '#apps',
    data: {
        Receiver_Detail_Number:'',
        //客户和收货人联动
        linkage: {},
        M_Sale_Bill: {
            //销售类型
            Sale_Bill_Type: '01',
            //统购外购
            Is_Purchase: '0',
            //客户
            Customer_Id: '',
            //合同编号
            Contract_Number: '',
            //销售日期
            Sale_Date: '',
            //承运商
            Carrier_Id: '',
            //发票类型
            Invoice_Type: '',
            //税率
            Tax_Rate_Id: '',
            Tax_Rate: '',
            //投保状态
            Insure_Status: '',
            //运费支付
            Freight_Pay: '',
            //运输方式
            Transportation_Way_Id: '',
            //投保备注
            Insure_Remark: '',
            //收货备注
            Receiver_Ramark: '',
            //收货人明细号
            Receiver_Detail_Number: '',
            //发货注意
            Send_Out_Goods_Notice: '',
            //是否折扣
            Is_Discount: '1',
            //任务人
            Employee_Id: '',
            //任务人部门
            Department_Name: '',
            //是否代客发货
            Is_Replace_Cus_Deliver_Goods: '1',
            M_Sale_Bill_Detail_List: [],

        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000006",
            System_Key: "Sale",
            List_Id: "SaleOrderDetailEdit"
        },
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerSearch: ["Customer_Id", "Customer_Name"],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],

        //承运商下拉框查询条件
        CarrierWhere: [],
        //承运商下拉框排序
        CarrierOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        linkageTransportation: true,
        //承运商下拉框显示字段
        CarrierResult: ["Carrier_Id", "Carrier_Name"],

        //发票下拉框查询条件
        TaxWhere: [],
        //发票下拉框排序
        TaxOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        //发票下拉框显示字段
        TaxResult: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
        //运输方式下拉框显示字段
        TransportationResult: ["Transportation_Way_Id", "Transportation_Way_Name"],
        //运输方式下拉框查询条件
        TransportationWhere: [

        ],
        //运输方式字表查询条件
        TransportChild: [{
            Table_Name: "B_Transportation_Way",
            Primary_Key_Field: ["id"],
            Field_Name: ["Transportation_Way_Name"],
            Is_Name: "0",
            System_Key: "Sale"
        }],
        //运输方式下拉框排序
        TransportationOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC",
        }],
        //任务人下拉框查询条件
        ReceiverWhere: [],
        //任务人下拉框排序
        ReceiverOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        //任务人下拉框显示字段
        ReceiverResult: ["Name", "Name"],
        //是否只读
        readonly: false,
        //是否遮罩
        isshade_bg: false,
        //表格是否可编辑
        isedittable: true,
        //是否显示审核按钮
        btnApproval: false,
        //是否显示审批意见按钮
        btnApprovalOpinion: false,
        //是否显示保存按钮
        btnSave: true,
        //是否显示提交按钮
        btnSubmit: false,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
        //是否显示编辑按钮
        btnEdit: false,
        //位数cookie
        globalParameter: {},
        //是否执行折扣型号选择事件
        IsDiscountEdit: 0,
        //是否编辑
        IsEdit: 0,
        //库房id1
        storeage_id: '',
        //客户id2
        customer_id: '',
        //收货人明细号3
        detail_number: '',
        //总重量4
        total_weight: '',
        //编辑表格id
        tableid: ['SaleOrderDetailEdit']
    },
    mounted: function () {

        var vm = this;
        //var item = ['btnEdit', 'btnSubmit'];
        //$.each(item, function (i, n) {
        //    vm[n] = true;
        //})
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $('.form-group').arrangeable({
            dragSelector: '.shade_bg'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

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
            if ($(".down_2").is(".rotate")) {
                $(".BasicInformation").slideUp(500);
                $(".title1").addClass("boder");
                $(".down_tab").each(function () {
                    if ($(this).is(".rotate")) {

                    } else {
                        $(this).addClass("rotate");
                    }
                })

            } else {
                $(".BasicInformation").slideDown(500);
                $(".title1").removeClass("boder");
                $(".down_tab").each(function () {
                    if ($(this).is(".rotate")) {
                        $(this).removeClass("rotate");
                    }
                })
            }

        })
        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber }
                , success: function (data) {
                    SalesOrder_vue.M_Sale_Bill = data;
                    SalesOrder_vue.linkage = data;
                    if (data.Is_Discount == "" || data.Is_Discount == null || data.Is_Discount == "1") {
                        vm.IsDiscountEdit = 1;
                    }
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        approvalstatus: data.Approval_Status,

                    });
                    //点击保存
                    PageCommon.Clickbtn(vm, 'Save');
                    if (save) {
                        vm.isedittable = false;
                    }

                }
            });

        } else {
            vm.IsEdit = 1;
            vm.IsDiscountEdit = 1;
        }

    },
    methods: {
        pagetotalback: function (i, pageTotal) {
            var vm = this;
            if (i == 6) {
                vm.total_weight = pageTotal;

            }

        },
        FreightCompute: function () {
            var vm = this;
            //客户id2
            vm.customer_id = vm.M_Sale_Bill.Customer_Id   //'C0000000075',
            //收货人明细号3
            vm.detail_number = vm.M_Sale_Bill.Detail_Number //15,

            PageCommon.ModalOpen({
                id: 'LogisticsCarriageList',
                title: '运费查询',
                width: '900px',
                height: '800px',
                btn: [],
                url: '../../CommonView/BusinessSeach/LogisticsCarriage',
                urlparameter: "system_key=Sale" + '&storeage_id=' + vm.storeage_id + '&customer_id=' + vm.customer_id + '&detail_number=' + vm.detail_number + '&total_weight=' + vm.total_weight,
            })
        },
        //税率
        ChangeTax: function (data) {
            console.log(data);
            var vm = this;
            //发票类型
            vm.M_Sale_Bill.Invoice_Type = data.text;
            //税率
            vm.M_Sale_Bill.Tax_Rate = data.Tax_Rate;
        },
        //折扣选择
        OnChange: function (value) {

            var tableData = PageCommon.GetDataTableData("SaleOrderDetailEdit");
            if (SalesOrder_vue.IsDiscountEdit > 0) {
                if (value == "0") {
                    PageCommon.GetBusinessRule({
                        systemBusinessObject: "PRODUCT_DISCOUNT",
                        detailNumbers: "1",
                        success: function (result) {

                            var discountName = "折扣型号";
                            if (result && result.length > 0) {
                                discountName = result[0].Selected_Value;
                            }
                            var data = { Product_Name: discountName, Is_Purchase: '1', Sale_Count: "1", Is_Purchase_Name: '否', NotAllowedRemove: true, Is_Discount: "0", Is_Discount_Name: "是" };
                            $.each(tableData, function (index, item) {
                                if (item.Product_Name == "") {
                                    item.Product_Name = discountName;
                                    item.Is_Discount_Name = "是";
                                    item.NotAllowedRemove = true;
                                    item.Sale_Count = "1";
                                    item.Is_Discount = "0";
                                    SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List = tableData;
                                    return false;
                                }

                                if (index == tableData.length - 1) {
                                    tableData.push(data);
                                    SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List = tableData;

                                    return false;
                                }

                            });
                        }

                    });
                } else if (value == "1") {
                    SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List = _.filter(tableData, function (item) {
                        return item.Is_Discount != "0";
                    });

                }
            }

            SalesOrder_vue.IsDiscountEdit++;
        },
        //客户选择情况编辑表格
        TemplateSelectionCustomer: function (data) {
            if (data) {
                SalesOrder_vue.M_Sale_Bill.Employee_Id = data.Employee_Id;
                SalesOrder_vue.M_Sale_Bill.Department_Id = data.Department_Id;

                if (SalesOrder_vue.IsEdit > 0) {
                    SalesOrder_vue.M_Sale_Bill.Is_Discount = "1";
                    SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List = [];
                    //SalesOrder_vue.linkage = data;
                }
                SalesOrder_vue.linkage = {
                    id: data.Customer_Id,
                    Detail_Number: SalesOrder_vue.M_Sale_Bill.Receiver_Detail_Number
                }
                SalesOrder_vue.IsEdit = 1;
            } else {
                SalesOrder_vue.M_Sale_Bill.Employee_Id = '';
                SalesOrder_vue.M_Sale_Bill.Department_Id = '';
                SalesOrder_vue.M_Sale_Bill.Is_Discount = "1";
                SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List = [];
                SalesOrder_vue.linkage = '';
            }
        },
        //数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Weight_Sum") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Weight_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Weight_Decimal, vm.globalParameter.Weight_Digital_Cut_Way), vm.globalParameter.Weight_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            //YJ率
            //if (Field_Name === "Commission_Rate") {

            //    return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Rate_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Rate_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Rate_Decimal];
            //}
            //CY利润率_库 CY利润率_期
            //if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {

            //    return [PageCommon.NumberDispose(a, vm.globalParameter.Profit_Margin_Decimal, vm.globalParameter.Profit_Margin_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Profit_Margin_Decimal, vm.globalParameter.Profit_Margin_Digital_Cut_Way), 2];
            //}
            //单价总额
            if (Field_Name === "Price_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
            }
            //价税总额
            if (Field_Name === "Price_Tax_Sum_Amount") {

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
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }

        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {

            if (Field_Name === "Is_Purchase_Name" || Field_Name === "Is_Discount_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }

            }

            if (Field_Name === "Is_Purchase" || Field_Name === "Is_Discount") {
                return '0';
            }
            //销售数量 退货数量
            if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
                if (value) {
                    
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
                
            }
            //总重量
            if (Field_Name === "Weight_Sum") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Weight_Decimal, this.globalParameter.Weight_Digital_Cut_Way);
                   
                }
            }
            //价税合计
            if (Field_Name === "Price_Tax_Sum") {
                if (value) {
                  
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
            //YJ率
            if (Field_Name === "Commission_Rate") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.YJ_Rate_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                   
                }
            }
            //CY利润率_库 CY利润率_期
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
                    
                }
            }
            //单价总额
            if (Field_Name === "Price_Sum") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    
                }
            }
            //价税总额
            if (Field_Name === "Price_Tax_Sum_Amount") {
                if (value) {
                  
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
            //YJ
            if (Field_Name === "Commission") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                    
                }
            }
            //税额
            if (Field_Name === "Tax") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
                   
                }
            }
            //单价
            if (Field_Name === "Price") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
        },

        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {

            //Is_Discount 获取是否折扣型号
            var Is_DiscountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Discount' });
            var cell_Is_Discount = cell.cell(':eq(' + cell.index().row + ')', Is_DiscountIndex, { search: 'applied' });
            var is_discount = cell_Is_Discount.data() == "0";

            if (SalesOrder_vue.M_Sale_Bill.Customer_Id == "") {

                PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                return;
            } else if (is_discount) {
                //折扣型号只能价格
                if (titleData.mData == "Price") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Price").html();
                    $("#div_temp_Price").attr("id", "div_temp_Price_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Price_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Price_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }

                return;

            } else {

                var tdWidth = $(cell.node()).width();
                if (titleData.mData == "Product_Name") {
                    var productIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });
                    var cell_active_product = cell.cell(':eq(' + cell.index().row + ')', productIndex, { search: 'applied' });

                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Product_Name").html();
                    $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);

                    //获下标
                    var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Inventory_Distribute_Id' });
                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });

                    //设置获取分配数据条件
                    var whereParameterList = [];

                    switch (SalesOrder_vue.Sale_Bill_Type) {
                        case "01":
                            //预留销售
                            whereParameterList.push({
                                Field_Name: "B_Product.Bill_Type",
                                Condition_Value1: "TS",
                                Query_Type: "01",
                                Expression: "02"
                            });
                            break;
                        case "02":
                            //零售销售
                            whereParameterList.push({
                                Field_Name: "B_Product.Bill_Type",
                                Condition_Value1: "TS",
                                Query_Type: "01",
                                Expression: "02"
                            });

                            //获取分配到个人
                            whereParameterList.push({
                                Field_Name: "B_Product.Apply_Object_Code",
                                Condition_Value1: "02",
                                Query_Type: "01",
                                Expression: "02"
                            });

                            whereParameterList.push({
                                Field_Name: "B_Product.Object_Id",
                                Condition_Value1: SalesOrder_vue.M_Sale_Bill.Employee_Id,
                                Query_Type: "01",
                                Expression: "02"
                            });

                            break;
                        case "03":
                            //寄售销售
                            whereParameterList.push({
                                Field_Name: "B_Product.Bill_Type",
                                Condition_Value1: "JS",
                                Query_Type: "01",
                                Expression: "02"
                            }); break;
                        case "04":
                            //样品销售
                            whereParameterList.push({
                                Field_Name: "B_Product.Bill_Type",
                                Condition_Value1: "YP",
                                Query_Type: "01",
                                Expression: "02"
                            }); break;
                    }

                    if (SalesOrder_vue.Sale_Bill_Type != "02") {

                        //不是零售 获取分配到客户的数据
                        whereParameterList.push({
                            Field_Name: "B_Product.Apply_Object_Code",
                            Condition_Value1: "01",
                            Query_Type: "01",
                            Expression: "02"
                        });

                        whereParameterList.push({
                            Field_Name: "B_Product.Object_Id",
                            Condition_Value1: SalesOrder_vue.M_Sale_Bill.Customer_Id,
                            Query_Type: "01",
                            Expression: "02"
                        });
                    }

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Product_Purchase: "",
                            searchparameter: {
                                searchUrl: '/Sale/SalesOrder/Distributed',
                                searchTitle: '分配查询',
                                inventoryId: 'DistributedResultDetail',
                            },
                            where_parameter_list: whereParameterList,
                            input_field: ['Inventory_Distribute_Id']
                        },
                        mounted: function () {
                            this.Product_Purchase = cell_active.data();

                        },
                        methods: {
                            urlparameterback: function () {
                                if (SalesOrder_vue.M_Sale_Bill.Sale_Bill_Type && SalesOrder_vue.M_Sale_Bill.Customer_Id) {
                                    var urlparameter = 'Sale_Bill_Type=' + SalesOrder_vue.M_Sale_Bill.Sale_Bill_Type + '&' + 'Customer_Id=' + SalesOrder_vue.M_Sale_Bill.Customer_Id;
                                    return urlparameter;
                                } else {
                                    PageCommon.ShowMessageRight("E2008");
                                }
                            },
                            TemplateSelectionProduct: function (data) {
                                if (data) {
                                    cell.New_Name = data.New_Name;
                                    for (var key in data) {
                                        if (key != "Product_Name" && key != "ROWNUM") {
                                            var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                                            var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                                            tcell.data(data[key]);

                                        }

                                    }
                                    SalesOrder_vue.storeage_id = data.Storeage_Id;


                                    var taxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum_Amount' });
                                    var princeSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Sum' });

                                    var salecountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Sale_Count' });
                                    var salecount = cell.cell(':eq(' + cell.index().row + ')', salecountIndex, { search: 'applied' }).data();

                                    if (!salecount) {
                                        salecount = 1;
                                    }

                                    var price = data.Price;
                                    var priceTax = data.Price_Tax_Sum;

                                    //小数位数取得
                                    var globalParameter = PageCommon.GlobalParameter();

                                    var value1 = price * salecount;
                                    value1 = PageCommon.NumberDispose(value1, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);
                                    cell.cell(':eq(' + cell.index().row + ')', princeSumIndex, { search: 'applied' }).data(value1);

                                    var value2 = priceTax * salecount;
                                    value2 = PageCommon.NumberDispose(value2, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);

                                    cell.cell(':eq(' + cell.index().row + ')', taxSumIndex, { search: 'applied' }).data(value2);


                                    var WeightIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Weight_Sum' });
                                    var cell_active_weight = cell.cell(':eq(' + cell.index().row + ')', WeightIndex, { search: 'applied' });
                                    var weight = data.Weight * salecount;
                                    weight = PageCommon.NumberDispose(weight, 2, 'round');
                                    cell_active_weight.data(weight);

                                    var OneWeightIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Weight' });
                                    cell.cell(':eq(' + cell.index().row + ')', OneWeightIndex, { search: 'applied' }).data(data.Weight);

                                    PageCommon.RefreshTablePage("SaleOrderDetailEdit");
                                }
                            },
                        }
                    });
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Sale_Count") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Sale_Count").html();
                    $("#div_temp_Sale_Count").attr("id", "div_temp_Sale_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Sale_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Sale_Count_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);


                }
                else if (titleData.mData == "Material_Code") {

                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Material_Code").html();
                    $("#div_temp_Material_Code").attr("id", "div_temp_Material_Code_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Material_Code_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        },

                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Material_Code_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Out_Order_Number") {

                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Out_Order_Number").html();
                    $("#div_temp_Out_Order_Number").attr("id", "div_temp_Out_Order_Number_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Out_Order_Number_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        },

                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Out_Order_Number_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Batch_Id") {
                    if ($('select', cell.node()).length > 0) {
                        return;
                    }
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Batch_Id").html();
                    $("#div_temp_Batch_Id").attr("id", "div_temp_Batch_Id" + cell.index().row + "_" + cell.index().column);

                    var StorageId;
                    var ProductId;
                    var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });

                    var storageIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storeage_Id' });
                    var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', storageIdIndex, { search: 'applied' });

                    if (cell_active.data() != "") {
                        ProductId = "-1";
                        StorageId = "-1";
                    } else {
                        ProductId = cell_active.data();
                        StorageId = cell_active2.data();
                    }
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Batch_Id" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Batch_Id: rowData.Batch_Id,
                            //批号下拉框查询条件
                            BatchWhere: [
                                {
                                    Field_Name: "Product_Id",
                                    Value1: ProductId,
                                    Expression: '02',
                                    Query_Type: '01',
                                },
                                {
                                    Field_Name: "Storeage_Id",
                                    Value1: StorageId,
                                    Expression: '02',
                                    Query_Type: '01',
                                }
                            ],
                            //批号下拉框排序
                            BatchOrder: [{
                                Field_Name: "Create_Time",
                                Orderby: "ASC"
                            }],
                            //批号下拉框显示字段
                            BatchResult: ["Batch_Id", "Batch_Id"],
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('select', cell.node());

                    $(jqInputs).attr('id', "Batch_Id_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Remark") {
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
            }
            PageCommon.RefreshTablePage("SaleOrderDetailEdit");
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            //Is_Discount 获取是否折扣型号
            var Is_DiscountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Discount' });
            var cell_Is_Discount = cell.cell(':eq(' + cell.index().row + ')', Is_DiscountIndex, { search: 'applied' });
            var is_discount = cell_Is_Discount.data() == "0";
            if (is_discount) {
                if (titleData.mData == "Price") {
                    //折扣型号只能价格
                    var jqInputs = $('input', cell.node());
                    //验证数据
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
                    } else {
                        //修改datatable 对应的值
                        cell.data($(jqInputs[0]).val());
                    }
                    PageCommon.RefreshTablePage("SaleOrderDetailEdit");
                }

                return;

            }

            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Batch_Id") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var goodsApplyIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Batch_Id' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', goodsApplyIndex, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());

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
            if (titleData.mData == "Product_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Product_Name_" + cell.index().row + "_" + cell.index().column);

                if ($(jqInputs[0]).val()) {

                    cell.data(cell.New_Name);

                } else {
                    for (var key in rowData) {
                        if (key != "ROWNUM" && key != "edit") {
                            var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                            var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                            tcell.data("");
                        }
                    }
                }

                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
            }
            if (titleData.mData == "Remark") {
                var jqInputs = $('textarea', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
                    $(jqInputs).focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            }
            if (titleData.mData == "Sale_Count") {
                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());

                    var taxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum_Amount' });
                    var princeSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Sum' });
                    var princeIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price' });
                    var priceTaxIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });

                    var price = cell.cell(':eq(' + cell.index().row + ')', princeIndex, { search: 'applied' }).data();
                    var priceTax = cell.cell(':eq(' + cell.index().row + ')', priceTaxIndex, { search: 'applied' }).data();

                    //小数位数取得
                    var globalParameter = PageCommon.GlobalParameter();

                    var value1 = price * $(jqInputs[0]).val();
                    value1 = PageCommon.NumberDispose(value1, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);
                    cell.cell(':eq(' + cell.index().row + ')', princeSumIndex, { search: 'applied' }).data(value1);

                    var value2 = priceTax * $(jqInputs[0]).val();
                    value2 = PageCommon.NumberDispose(value2, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);

                    cell.cell(':eq(' + cell.index().row + ')', taxSumIndex, { search: 'applied' }).data(value2);


                    var WeightIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Weight_Sum' });
                    var cell_active_weight = cell.cell(':eq(' + cell.index().row + ')', WeightIndex, { search: 'applied' });

                    var OneWeightIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Weight' });
                    var OneWeight = cell.cell(':eq(' + cell.index().row + ')', OneWeightIndex, { search: 'applied' }).data();

                    var salecount = $(jqInputs[0]).val();
                    if (!salecount) {
                        salecount = 1;
                    }

                    var weight = OneWeight * salecount;
                    weight = PageCommon.NumberDispose(weight, 2, 'round');
                    cell_active_weight.data(weight);

                    PageCommon.RefreshTablePage("SaleOrderDetailEdit");
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
                PageCommon.RefreshTablePage("SaleOrderDetailEdit");

            }
        },
        //设置控件属性
        Set: function () {

        },
        //保存菜单画面数据Out_Order_Number
        Save: function () {
            PageCommon.CheckDataTables({
                tableId: "SaleOrderDetailEdit",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty:true
                    },
                     {
                         columnName: "Sale_Count",
                         CheckEmpty: true,
                         CheckLength: '14'
                     },
                     {
                         columnName: "Out_Order_Number",
                         CheckNumberOrEngish: true,
                         CheckLength: '20'
                     },
                     {
                         columnName: "Material_Code",
                         CheckNumberOrEngish: true,
                         CheckLength: '50'
                     },
                     {
                         columnName: "Price",
                         CheckLength: '28'
                     },
                ],
            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("SaleOrderDetailEdit");

            SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List = [];

            //设置统购外购
            //SalesOrder_vue.M_Sale_Bill.Is_Purchase = "0";


            //销售信息组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Product_Name != "" && item.Sale_Count != "") {
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];

                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }
                    }

                    if (obj.Product_Name != "" && item.Sale_Count != "") {
                        SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List.push(obj);
                    }


                }
            });
            //验证至少输入一条明细
            if (!SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                //PageCommon.Loading(false);
                return;
            } else if (SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List.length == 1) {
                if (SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List[0]) {
                    //判断是否是折扣型号
                    if (SalesOrder_vue.M_Sale_Bill.M_Sale_Bill_Detail_List[0].Is_Discount == "0") {
                        PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                        PageCommon.Loading(false);
                        return;

                    }
                }
            }
            SalesOrder_vue.M_Sale_Bill.Receiver_Detail_Number = SalesOrder_vue.Receiver_Detail_Number;
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { saleBill: SalesOrder_vue.M_Sale_Bill }
             , success: function (data) {
                 window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Sale_Bill_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
             }
            });
        },
        //编辑
        Edit: function () {
            var vm = this;
            PageCommon.Clickbtn(vm, 'Edit');
        },

        //提交
        Submit: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Submit"
               , param: { saleBill: SalesOrder_vue.M_Sale_Bill },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //审核
        Approval: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Approval"
               , param: { saleBill: SalesOrder_vue.M_Sale_Bill },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("List");
                }
            });
        },
        //审批意见
        mApproval: function () {

        },
        //运费计算
        Compute: function () {

        },
        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List', vm);
        },
        ChangeCarrier: function (value) {
            if (value) {
                SalesOrder_vue.linkageTransportation = {};
                SalesOrder_vue.linkageTransportation.Field_Name = "Carrier_Id";
                SalesOrder_vue.linkageTransportation.Value1 = value.id;
            } else {
                SalesOrder_vue.linkageTransportation == '';
            }
        }
    },
    watch: {

        'M_Sale_Bill.Customer_Id': function (value) {

            if (this.IsEdit > 0) {
                if (value != "" && value != null && this.M_Sale_Bill.Sale_Date != "") {

                    //判断客户附件上传超期日
                    PageCommon.IsCustomerSaleOverdue({
                        customerId: value,
                        systemKey: "Sale",
                        saleDate: this.M_Sale_Bill.Sale_Date

                    });
                }

            }

        }

    }
});

///计算单价 价税合计
//IsIncludeTax 是否含税
//含税时 Price=价税合计 不含税时 Price= 单价；
var CountPrice = function (IsIncludeTax, Price) {

    var obj = {};

    if (IsIncludeTax) {
        obj.Price = Price / 1.17;
        obj.Tax = Price - obj.Price;
        obj.Price_Tax_Sum = Price;
    } else {
        obj.Price = Price;
        obj.Price_Tax_Sum = Price * 1.17;
        obj.Tax = obj.Price_Tax_Sum - Price;

    }

    return obj;

}

///计算利润率
///PriceTaxSum ：价税合计
///Cost:成本
var CountProfit = function (PriceTaxSum, Cost) {
    if (PriceTaxSum <= 0) {
        return 0;
    }
    return (PriceTaxSum - Cost) / PriceTaxSum * 100;

}

//计算佣金 佣金率
var CountYj = function (isYjl, price, YjOrYjl) {
    var obj = {};
    if (price == "") {
        obj.Commission_Rate = 0;
        obj.Commission = 0;
        obj.Net_Price = 0;
    } else
        if (isYjl) {
            //根据佣金计算佣金率
            obj.Commission_Rate = YjOrYjl / price * 100;
            obj.Commission = YjOrYjl;
            obj.Net_Price = price - YjOrYjl;
        } else {
            //根据佣金率计算佣金
            obj.Commission = price * YjOrYjl / 100;
            obj.Commission_Rate = YjOrYjl;
            obj.Net_Price = price - obj.Commission;
        }
    return obj;
}
