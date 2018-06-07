
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
var ConsignSale_vue = new Vue({
    el: '#apps',
    data: {
        //收货人
        Receiver_Detail_Number: '',
        //客户和收货人联动
        linkage: {},
        M_Consign_Sale_Apply: {
            //客户名称
            Customer_Id: '',
            //合同日期
            Contract_Date: '',
            //承运商
            Carrier_Id: '',
            //投保状态
            Insure_Status: '',
            //运费支付
            Freight_Pay: '',
            //发票类型
            Invoice_Type: '',
            //税率
            Tax_Rate_Id: '',
            Tax_Rate: '',
            //运输方式
            Transportation_Way_Id: '',
            //收货人明细号
            Receiver_Detail_Number: '',
            //任务人
            Employee_Id: '',
            //任务人部门
            Department_Name: '',
            //是否代客发货
            Is_Replace_Cus_Deliver_Goods: '1',
            //备注
            Remark: '',
            M_Consign_Sale_Apply_Detail_List: []
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "Sale",
            List_Id: "ConsignSaleApplyDetail"
        },
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],

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
        linkageTransportation: true,

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
        IsEdit: 0,
        //编辑表格id
        tableid: ['ConsignSaleApplyDetail']
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.drag2').arrangeable({
            dragSelector: '.space'
        });
        $('.drag1').arrangeable({
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
                    console.log(data)
                    ConsignSale_vue.M_Consign_Sale_Apply = data;
                    //ConsignSale_vue.linkage = data;
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
        }

    },
    methods: {

        //承运商、运输方式联动选择
        ChangeCarrier: function (value) {
            if (value) {
                ConsignSale_vue.linkageTransportation = {};
                ConsignSale_vue.linkageTransportation.Field_Name = "Carrier_Id";
                ConsignSale_vue.linkageTransportation.Value1 = value.id;
            } else {
                ConsignSale_vue.linkageTransportation = '';
            }
        },
        //税率
        ChangeTax: function (data) {
            ConsignSale_vue.M_Consign_Sale_Apply.Invoice_Type = data.text;
            ConsignSale_vue.M_Consign_Sale_Apply.Tax_Rate = data.Tax_Rate;
        },
        //表格数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Consign_Sale_Count" || Field_Name === "Sale_Count" || Field_Name === "Turned_Sale_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

            if (Field_Name === "Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "Price_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
            }
            //价税总额
            if (Field_Name === "Price_Tax_Amount") {

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
            if (Field_Name === "Storeage_Cost" || Field_Name === "Latest_Cost") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Inventry_Is_Purchase_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }

            }
            if (Field_Name === "Contract_Date") {
                if (value) {
                    return moment(value).format('YYYY-MM-DD');
                }
            }
            if (Field_Name === "Inventry_Is_Purchase") {
                return '0';
            }
            if (Field_Name === "Delivery_Date") {
                if (value) {
                    return moment(value).format('YYYY-MM-DD');
                }
            }
            //数量
            if (Field_Name === "Consign_Sale_Count" || Field_Name === "Sale_Count" || Field_Name === "Turned_Sale_Sum") {
                if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
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
            //库存利润率 期货利润率
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
            if (Field_Name === "Price_Tax_Amount") {
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
            if (Field_Name === "Storeage_Cost" || Field_Name === "Latest_Cost") {
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
        //客户选择情况编辑表格
        TemplateSelectionCustomer: function (data) {
            if (data) {
                if (ConsignSale_vue.IsEdit > 0) {
                    ConsignSale_vue.M_Consign_Sale_Apply.M_Consign_Sale_Apply_Detail_List = [];

                }
                ConsignSale_vue.linkage = {
                    id: data.Customer_Id,
                    Detail_Number: ConsignSale_vue.M_Consign_Sale_Apply.Receiver_Detail_Number
                }
                ConsignSale_vue.IsEdit=1;
                ConsignSale_vue.M_Consign_Sale_Apply.Employee_Id = data.Employee_Id;
                ConsignSale_vue.M_Consign_Sale_Apply.Department_Id = data.Department_Id;
            } else {
                ConsignSale_vue.M_Consign_Sale_Apply.M_Consign_Sale_Apply_Detail_List = [];
                ConsignSale_vue.linkage = '';
                ConsignSale_vue.M_Consign_Sale_Apply.Employee_Id = '';
                ConsignSale_vue.M_Consign_Sale_Apply.Department_Id = '';
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (ConsignSale_vue.M_Consign_Sale_Apply.Customer_Id == "") {

                PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                return;
            } else {
                if (titleData.mData == "Product_Name") {

                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Product_Name").html();
                    $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);

                    //获取下C_CustomerId的下标
                    var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Inventory_Distribute_Id' });
                    var productNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });

                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });
                    var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', productNameIndex, { search: 'applied' });


                    //cell.Product_Name = cell_active2.data();

                    //设置获取分配数据条件
                    var whereParameterList = [];


                    //寄售销售
                    whereParameterList.push({
                        Field_Name: "B_Product.Bill_Type",
                        Condition_Value1: "TS",
                        Query_Type: "01",
                        Expression: "02"
                    });



                    //不是零售 获取分配到客户的数据
                    whereParameterList.push({
                        Field_Name: "B_Product.Apply_Object_Code",
                        Condition_Value1: "01",
                        Query_Type: "01",
                        Expression: "02"
                    });

                    whereParameterList.push({
                        Field_Name: "B_Product.Object_Id",
                        Condition_Value1: ConsignSale_vue.M_Consign_Sale_Apply.Customer_Id,
                        Query_Type: "01",
                        Expression: "02"
                    });

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
                                if (ConsignSale_vue.M_Consign_Sale_Apply.Customer_Id) {
                                    var urlparameter = 'Customer_Id=' + ConsignSale_vue.M_Consign_Sale_Apply.Customer_Id;
                                    return urlparameter;
                                } else {
                                    PageCommon.ShowMessageRight("E2008");
                                }
                            },
                            TemplateSelectionProduct: function (data) {
                                if (data) {
                                    cell.New_Name = data.New_Name;
                                    for (var key in data) {
                                        if (key != "Product_Name") {
                                            var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                                            var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                                            tcell.data(data[key]);
                                        }

                                    }


                                    var taxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Amount' });
                                    var princeSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Sum' });

                                    var salecountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Consign_Sale_Count' });
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
                                } 
                            },
                        }
                    });
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Consign_Sale_Count") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Consign_Sale_Count").html();
                    $("#div_temp_Consign_Sale_Count").attr("id", "div_temp_Consign_Sale_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Consign_Sale_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Consign_Sale_Count_" + cell.index().row + "_" + cell.index().column);
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


            PageCommon.RefreshTablePage("ConsignSaleApplyDetail");
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {

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
                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                var cell_active = cell.cell(':eq(' + ids + ')', productIdIndex, { search: 'applied' });
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
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
            if (titleData.mData == "Consign_Sale_Count") {
                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());

                    var taxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Amount' });
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
                    console.log("---" + value1);

                    var value2 = priceTax * $(jqInputs[0]).val();
                    console.log("---" + value2);

                    value2 = PageCommon.NumberDispose(value2, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);

                    cell.cell(':eq(' + cell.index().row + ')', taxSumIndex, { search: 'applied' }).data(value2);

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
                PageCommon.RefreshTablePage("ConsignSaleApplyDetail");

            }
        },
        //设置控件属性
        Set: function () {

        },
        //保存菜单画面数据
        Save: function () {

            PageCommon.CheckDataTables({
                tableId: "ConsignSaleApplyDetail",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty: true
                    },
                     {
                         columnName: "Consign_Sale_Count",
                         CheckEmpty: true,
                         CheckLength: '14'
                     },
                     {
                         columnName: "Material_Code",
                         CheckNumberOrEngish:true,
                         CheckLength: '50'
                     },

                ],



            });


            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("ConsignSaleApplyDetail");

            ConsignSale_vue.M_Consign_Sale_Apply.M_Consign_Sale_Apply_Detail_List = [];
            //寄售信息组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Product_Id != "") {
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];

                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }
                    }

                    if (obj.Product_Id != "") {
                        ConsignSale_vue.M_Consign_Sale_Apply.M_Consign_Sale_Apply_Detail_List.push(obj);
                    }


                }
            });

            //验证至少输入一条明细
            if (!ConsignSale_vue.M_Consign_Sale_Apply.M_Consign_Sale_Apply_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            ConsignSale_vue.M_Consign_Sale_Apply.Receiver_Detail_Number = ConsignSale_vue.Receiver_Detail_Number;
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { ConsignSaleApply: ConsignSale_vue.M_Consign_Sale_Apply }
             , success: function (data) {
                 window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Consign_Sale_Apply_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
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
             , param: { ConsignSaleApply: ConsignSale_vue.M_Consign_Sale_Apply },
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
             , param: { ConsignSaleApply: ConsignSale_vue.M_Consign_Sale_Apply },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("List");
                }
            });
        },
        //审批意见
        mApproval: function () {

        },

        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List', vm);
        }
    }
});
