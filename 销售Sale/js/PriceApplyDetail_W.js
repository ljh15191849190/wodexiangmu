
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
var PriceApply_vue = new Vue({
    el: '#apps',
    data: {
        M_Price_Apply: {
            //统购外购
            Is_Purchase: '1',
            //客户
            Customer_Id: '',
            //任务人
            Employee_Id: '',
            Department_Name: '',
            Department_Id: '',
            //报价有效期
            Quote_Usefel_Life: '',
            //运费支付
            Freight_Pay: '',
            //运输方式
            Transportation_Way: '',
            //其他说明
            Remark: '',
            M_Price_Apply_Detail_List: []
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "Sale",
            List_Id: "PriceApplyDetailEdit"
        },
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerSearch: ["Customer_Id", "Customer_Name"],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],

        Employeeresult: ["Employee_Id", "Name"],
        EmployeFiledSearch: ["Employee_Id", "Name"],
        EmployeInputField: ["Employee_Id", "Name"],
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
        //是否显示导入按钮
        btnImport: true,
        //位数cookie
        globalParameter: {},
        //编辑表格id
        tableid: ['PriceApplyDetailEdit']
    },
    mounted: function () {
        var vm = this;
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
                    PriceApply_vue.M_Price_Apply = data;

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
        }
    },
    methods: {
        //客户选择
        TemplateSelectionCustomer: function (data) {
            if (data) {
                PriceApply_vue.M_Price_Apply.Employee_Id = data.Employee_Id;
                PriceApply_vue.M_Price_Apply.Department_Id = data.Department_Id;
                PriceApply_vue.M_Price_Apply.Department_Name = data.Department_Name;
            } else {
                PriceApply_vue.M_Price_Apply.Employee_Id = '';
                PriceApply_vue.M_Price_Apply.Department_Id = '';
                PriceApply_vue.M_Price_Apply.Department_Name = '';
            }
        },
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Apply_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

            if (Field_Name === "Price_Tax_Sum" || Field_Name === "Total_Price" || Field_Name === "Customer_Receive_Price") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "Price_Sum" ) {

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
            //净价
            if (Field_Name === "Net_Price") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];

            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Include_Tax_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }

            }
            if (Field_Name === "Delivery_Date") {
                if (value) {
                    return moment(value).format('YYYY-MM-DD');
                }
            }
            if (Field_Name === "Is_Include_Tax") {
                return '0';
            }
            if (Field_Name === "Delivery_Date") {
                if (value) {
                    return moment(value).format('YYYY-MM-DD');
                }
            }
            //销售数量 退货数量
            if (Field_Name === "Apply_Count") {
                if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);

                }
            }

            //价税合计
            if (Field_Name === "Price_Tax_Sum" || Field_Name === "Customer_Receive_Price") {
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
            if (Field_Name === "Storage_Rate" || Field_Name === "Futures_Rate") {
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
            if (Field_Name === "Total_Price_Tax_Sum") {
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
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);

                }
            }
            //单价
            if (Field_Name === "Price"|| Field_Name === "Net_Price") {
                if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                }
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Ty_Way_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Ty_Way").html();
                $("#div_temp_Ty_Way").attr("id", "div_temp_Ty_Way_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Ty_Way_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Ty_Way: rowData.Ty_Way
                    },
                    methods: {
                        PayWay: function (val) {

                            var CommissionIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission' });
                            var Commissionvalue = cell.cell(':eq(' + cell.index().row + ')', CommissionIndex, { search: 'applied' })
                            var CommissionRatendex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission_Rate' });
                            var CommissionRatevalue = cell.cell(':eq(' + cell.index().row + ')', CommissionRatendex, { search: 'applied' })
                            if (val.id == "05") {
                                Commissionvalue.data("0");
                                CommissionRatevalue.data("0");
                            }
                        }
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Ty_Way_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Product_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Product_Name").html();
                $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);

                //获取下C_CustomerId的下标
                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                //var productNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });
                var productNameIndex2 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Purchase' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });
                //var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', productNameIndex, { search: 'applied' });
                var cell_active3 = cell.cell(':eq(' + cell.index().row + ')', productNameIndex2, { search: 'applied' });

                //cell.Product_Name = cell_active2.data();
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Product_Purchase: ''
                    },
                    mounted: function () {
                        this.Product_Purchase = cell_active.data() + cell_active3.data();
                    },
                    methods: {
                        TemplateSelectionProduct: function (data) {
                            if (data) {
                                cell.New_Name = data.New_Name;
                                var aoColumns = cell.settings()[0].aoColumns;
                                for (var key in data) {
                                    if (key != "Product_Name" && key != "ROWNUM" && key != "New_Name") {
                                        if (key == "Detail_Number") {
                                            var tindexs = _.findLastIndex(aoColumns, { mData: "Product_Price_Detail_Number" });
                                            cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' }).data(data[key]);
                                        } else {
                                            var tindexs = _.findLastIndex(aoColumns, { mData: key });

                                            if (tindexs > 0) {

                                                cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' }).data(data[key]);
                                            }
                                        }
                                    }
                                }
                                cell.cell(':eq(' + cell.index().row + ')', _.findLastIndex(aoColumns, { mData: "Weighting_Aver_Cost" }), { search: 'applied' }).data(data["Weighting_Aver_Cost"]);
                            }
                        },
                    }
                });
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Apply_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Apply_Count").html();
                $("#div_temp_Apply_Count").attr("id", "div_temp_Apply_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Apply_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Apply_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Goods_Apply_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Goods_Apply").html();
                $("#div_temp_Goods_Apply").attr("id", "div_temp_Goods_Apply_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Goods_Apply_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Goods_Apply: rowData.Goods_Apply
                    },
                    methods: {
                        GoodChange: function (val) {
                            var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Cost_Source' });
                            if (val.id == '01') {
                                var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data("库存成本");

                                var WacIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Weighting_Aver_Cost' });
                                var WacValue = cell.cell(':eq(' + cell.index().row + ')', WacIndex, { search: 'applied' }).data();

                                var ApplyCostIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Cost' });
                                var ApplyCostValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCostIndex, { search: 'applied' });

                                ApplyCostValue.data(WacValue);

                                var StorageRateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storage_Rate' });
                                var StorageRate = cell.cell(':eq(' + cell.index().row + ')', StorageRateIndex, { search: 'applied' });

                                var TaxsumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                                var Taxsumvalue = cell.cell(':eq(' + cell.index().row + ')', TaxsumIndex, { search: 'applied' }).data();

                                var rtn = CountProfit(Taxsumvalue, ApplyCostValue.data());
                                StorageRate.data(rtn);


                            } else if (val.id == '02') {
                                cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data("询价成本");
                                var ApplyCostIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Cost' });
                                var ApplyCostValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCostIndex, { search: 'applied' });

                                ApplyCostValue.data(0);

                                var StorageRateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storage_Rate' });
                                var StorageRate = cell.cell(':eq(' + cell.index().row + ')', StorageRateIndex, { search: 'applied' });

                                StorageRate.data(0);


                            }
                        }
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Goods_Apply_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Customer_Receive_Price") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Customer_Receive_Price").html();
                $("#div_temp_Customer_Receive_Price").attr("id", "div_temp_Customer_Receive_Price_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Customer_Receive_Price_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Customer_Receive_Price_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Cost_Source") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Cost_Source").html();
                $("#div_temp_Cost_Source").attr("id", "div_temp_Cost_Source_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Cost_Source_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    },
                    mounted: function () {
                        $("#Cost_Source").dblclick(function () {
                            var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Goods_Apply_Name' });
                            var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();


                            var ProductIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                            var ProductId = cell.cell(':eq(' + cell.index().row + ')', ProductIndex, { search: 'applied' }).data();


                            if (value == "询价") {
                                PageCommon.ModalOpen({
                                    id: "priceAnswer",
                                    title: "询价回复",
                                    width: "850px",
                                    height: "500px",
                                        url: '/Sale/PriceApply/PriceAnswer?customerid=' + PriceApply_vue.M_Price_Apply.Customer_Id + "&ispurchase=0&productid="+ProductId,
                                    btn: ["添加"],
                                    btnid: ["btnSave"],
                                    callBack: function (iframeId) {
                                        var selectRow = PageCommon.ChildrenFrames(iframeId).vmPriceanswer.SelectRow();

                                        PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                                        if (selectRow.length != 1) {
                                            return;
                                        }
                                        var costIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Cost' });
                                        cell.cell(':eq(' + cell.index().row + ')', costIndex, { search: 'applied' }).data(selectRow[0].Answer_Price);

                                        var StorageRateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storage_Rate' });
                                        var StorageRate = cell.cell(':eq(' + cell.index().row + ')', StorageRateIndex, { search: 'applied' });

                                        var TaxsumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                                        var Taxsumvalue = cell.cell(':eq(' + cell.index().row + ')', TaxsumIndex, { search: 'applied' }).data();

                                        var rtn = CountProfit(Taxsumvalue, selectRow[0].Answer_Price);
                                        StorageRate.data(rtn);

                                        var consultAnswerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Consult_Price_Answer_Id' });
                                        cell.cell(':eq(' + cell.index().row + ')', consultAnswerIdIndex, { search: 'applied' }).data(selectRow[0].Consult_Price_Answer_Id);

                                    }
                                })
                            }
                        })
                    },

                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Cost_Source_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Price") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Price").html();
                $("#div_temp_Price").attr("id", "div_temp_Price_" + cell.index().row + "_" + cell.index().column);
                var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Include_Tax_Name' });
                var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();

                cell.isshade_bg = false;
                cell.readonly = false;
                if (value == "" || value == "否") {
                    cell.isshade_bg = false
                    cell.readonly = false
                } else {
                    cell.isshade_bg = true
                    cell.readonly = true
                }
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Price_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                        isshade_bg: cell.isshade_bg,
                        readonly: cell.readonly
                    },

                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Price_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Commission") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Commission").html();
                $("#div_temp_Commission").attr("id", "div_temp_Commission_" + cell.index().row + "_" + cell.index().column);
                var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Ty_Way_Name' });
                var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();
                cell.isshade_bg = true;
                cell.readonly = true;
                if (value == "税前佣金" || value == "税后佣金") {
                    cell.isshade_bg = false
                    cell.readonly = false
                } else {
                    cell.isshade_bg = true
                    cell.readonly = true
                }
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Commission_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                        isshade_bg: cell.isshade_bg,
                        readonly: cell.readonly
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Commission_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Price_Tax_Sum") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Price_Tax_Sum").html();
                $("#div_temp_Price_Tax_Sum").attr("id", "div_temp_Price_Tax_Sum_" + cell.index().row + "_" + cell.index().column);
                var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Include_Tax_Name' });
                var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();

                cell.isshade_bg = false;
                cell.readonly = false;
                if (value == "" || value == "否") {
                    cell.isshade_bg = true
                    cell.readonly = true
                } else {
                    cell.isshade_bg = false
                    cell.readonly = false
                }

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Price_Tax_Sum_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                        isshade_bg: cell.isshade_bg,
                        readonly: cell.readonly
                    },


                });

                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Price_Tax_Sum_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Commission_Rate") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Commission_Rate").html();
                $("#div_temp_Commission_Rate").attr("id", "div_temp_Commission_Rate_" + cell.index().row + "_" + cell.index().column);
                var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Ty_Way_Name' });
                var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();
                cell.isshade_bg = true;
                cell.readonly = true;
                if (value == "税前佣金率" || value == "税后佣金率") {
                    cell.isshade_bg = false
                    cell.readonly = false
                } else {
                    cell.isshade_bg = true
                    cell.readonly = true
                }

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Commission_Rate_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                        isshade_bg: cell.isshade_bg,
                        readonly: cell.readonly
                    },


                });

                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Price_Tax_Sum_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Delivery_Date") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Delivery_Date").html();
                $("#div_temp_Delivery_Date").attr("id", "div_temp_Delivery_Date_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Delivery_Date_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: ''
                    },
                    mounted: function () {
                        this.vmodel = cell.data();
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Delivery_Date_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Is_Include_Tax_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Is_Include_Tax").html();
                $("#div_temp_Is_Include_Tax").attr("id", "div_temp_Is_Include_Tax_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Is_Include_Tax_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Is_Include_Tax: cell.data() == '是' ? '0' : '1'
                    }
                });
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
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Goods_Apply_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var goodsApplyIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Goods_Apply' });

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
            if (titleData.mData == "Ty_Way_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var tyWayIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Ty_Way' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', tyWayIndex, { search: 'applied' });
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
                //var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                //var cell_active = cell.cell(':eq(' + ids + ')', productIdIndex, { search: 'applied' });
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
                    ////修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        //cell_active.data(cell.Product_Id);
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
            if (titleData.mData == "Is_Include_Tax_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var isIncludeIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Include_Tax' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', isIncludeIndex, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Include_Tax);
                //修改datatable 对应的值
                cell.data(value);
            }
            if (titleData.mData == "Price_Tax_Sum") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;
                var taxIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Tax' });
                var taxvalue = cell.cell(':eq(' + cell.index().row + ')', taxIndex, { search: 'applied' });
                var PriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price' });
                var pricevalue = cell.cell(':eq(' + cell.index().row + ')', PriceIndex, { search: 'applied' });

                var RateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission_Rate' });
                var Ratevalue = cell.cell(':eq(' + cell.index().row + ')', RateIndex, { search: 'applied' });

                var CommissionIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission' });
                var Commissionvalue = cell.cell(':eq(' + cell.index().row + ')', CommissionIndex, { search: 'applied' });

                var NetPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Net_Price' });
                var NetPrice = cell.cell(':eq(' + cell.index().row + ')', NetPriceIndex, { search: 'applied' });

                if (cell.isshade_bg == false) {
                    var rtnval = CountPrice(true, $(jqInputs[0]).val());
                    pricevalue.data(rtnval.Price);
                    taxvalue.data(rtnval.Tax);
                    //CountProfit(Taxsumvalue, cost);

                    var IndexTy = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Ty_Way_Name' });
                    var valueTy = cell.cell(':eq(' + cell.index().row + ')', IndexTy, { search: 'applied' }).data();
                    if (valueTy != "不提佣") {
                        if (valueTy == "税前佣金" || valueTy == "税后佣金") {
                            var rtnCommiss = CountYj(true, rtnval.Price_Tax_Sum, Commissionvalue.data());
                            Ratevalue.data(rtnCommiss.Commission_Rate);
                            NetPrice.data(rtnCommiss.Net_Price);
                        } else {
                            var rtnCommiss = CountYj(false, rtnval.Price_Tax_Sum, Ratevalue.data());
                            Commissionvalue.data(rtnCommiss.Commission);
                            NetPrice.data(rtnCommiss.Commission);
                        }
                    }


                    var TotalPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Total_Price' });
                    var TotalPrice = cell.cell(':eq(' + cell.index().row + ')', TotalPriceIndex, { search: 'applied' });


                    var TotalPriceTaxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Total_Price_Tax_Sum' });
                    var TotalPriceTaxSum = cell.cell(':eq(' + cell.index().row + ')', TotalPriceTaxSumIndex, { search: 'applied' });


                    var ApplyCountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Count' });
                    var ApplyCountValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCountIndex, { search: 'applied' }).data();

                    if (ApplyCountValue == "") {
                        ApplyCountValue = 0;
                    }


                    TotalPrice.data(ApplyCountValue * rtnval.Price);
                    TotalPriceTaxSum.data(ApplyCountValue * rtnval.Price_Tax_Sum);

                    var StorageRateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storage_Rate' });
                    var StorageRate = cell.cell(':eq(' + cell.index().row + ')', StorageRateIndex, { search: 'applied' });

                    var ApplyCostValueIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Cost' });
                    var ApplyCostValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCostValueIndex, { search: 'applied' });

                    var rtn = CountProfit(rtnval.Price_Tax_Sum, ApplyCostValue.data());
                    StorageRate.data(rtn);

                }
                cell.data($(jqInputs[0]).val());
                PageCommon.RefreshTablePage("PriceApplyDetailEdit");

            }
            if (titleData.mData == "Price") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;
                var TaxsumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                var Taxsumvalue = cell.cell(':eq(' + cell.index().row + ')', TaxsumIndex, { search: 'applied' });
                var taxIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Tax' });
                var taxvalue = cell.cell(':eq(' + cell.index().row + ')', taxIndex, { search: 'applied' });

                var RateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission_Rate' });
                var Ratevalue = cell.cell(':eq(' + cell.index().row + ')', RateIndex, { search: 'applied' });

                var CommissionIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission' });
                var Commissionvalue = cell.cell(':eq(' + cell.index().row + ')', CommissionIndex, { search: 'applied' });

                var NetPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Net_Price' });
                var NetPrice = cell.cell(':eq(' + cell.index().row + ')', NetPriceIndex, { search: 'applied' });

                if (cell.isshade_bg == false) {
                    var rtnval = CountPrice(false, $(jqInputs[0]).val());
                    Taxsumvalue.data(rtnval.Price_Tax_Sum);
                    taxvalue.data(rtnval.Tax);

                    var IndexTy = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Ty_Way_Name' });
                    var valueTy = cell.cell(':eq(' + cell.index().row + ')', IndexTy, { search: 'applied' }).data();
                    if (valueTy != "不提佣") {
                        if (valueTy == "税前佣金" || valueTy == "税后佣金") {
                            var rtnCommiss = CountYj(true, rtnval.Price_Tax_Sum, Commissionvalue.data());
                            Ratevalue.data(rtnCommiss.Commission_Rate);
                            NetPrice.data(rtnCommiss.Net_Price);
                        } else {
                            var rtnCommiss = CountYj(false, rtnval.Price_Tax_Sum, Ratevalue.data());
                            Commissionvalue.data(rtnCommiss.Commission);
                            NetPrice.data(rtnCommiss.Net_Price);
                        }
                    }

                    var TotalPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Total_Price' });
                    var TotalPrice = cell.cell(':eq(' + cell.index().row + ')', TotalPriceIndex, { search: 'applied' });


                    var TotalPriceTaxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Total_Price_Tax_Sum' });
                    var TotalPriceTaxSum = cell.cell(':eq(' + cell.index().row + ')', TotalPriceTaxSumIndex, { search: 'applied' });


                    var ApplyCountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Count' });
                    var ApplyCountValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCountIndex, { search: 'applied' }).data();

                    if (ApplyCountValue == "") {
                        ApplyCountValue = 0;
                    }


                    TotalPrice.data(ApplyCountValue * rtnval.Price);
                    TotalPriceTaxSum.data(ApplyCountValue * rtnval.Price_Tax_Sum);


                    var StorageRateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storage_Rate' });
                    var StorageRate = cell.cell(':eq(' + cell.index().row + ')', StorageRateIndex, { search: 'applied' });


                    var ApplyCostValueIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Cost' });
                    var ApplyCostValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCostValueIndex, { search: 'applied' });


                    var rtn = CountProfit(rtnval.Price_Tax_Sum, ApplyCostValue.data());
                    StorageRate.data(rtn);
                }

                cell.data($(jqInputs[0]).val());
                PageCommon.RefreshTablePage("PriceApplyDetailEdit");
            }
            if (titleData.mData == "Apply_Count") {
                var jqInputs = $('input', cell.node());
                cell.data($(jqInputs[0]).val());

                var TotalPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Total_Price' });
                var TotalPrice = cell.cell(':eq(' + cell.index().row + ')', TotalPriceIndex, { search: 'applied' });


                var TotalPriceTaxSumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Total_Price_Tax_Sum' });
                var TotalPriceTaxSum = cell.cell(':eq(' + cell.index().row + ')', TotalPriceTaxSumIndex, { search: 'applied' });


                var ApplyCountIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Apply_Count' });
                var ApplyCountValue = cell.cell(':eq(' + cell.index().row + ')', ApplyCountIndex, { search: 'applied' }).data();

                if (ApplyCountValue == "") {
                    ApplyCountValue = 0;
                }

                var TaxsumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                var Taxsumvalue = cell.cell(':eq(' + cell.index().row + ')', TaxsumIndex, { search: 'applied' }).data();

                if (Taxsumvalue == "") {
                    Taxsumvalue = 0;
                }

                var PriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price' });
                var pricevalue = cell.cell(':eq(' + cell.index().row + ')', PriceIndex, { search: 'applied' }).data();
                if (pricevalue == "") {
                    pricevalue = 0;
                }


                TotalPrice.data(ApplyCountValue * pricevalue);
                TotalPriceTaxSum.data(ApplyCountValue * Taxsumvalue);


                PageCommon.RefreshTablePage("PriceApplyDetailEdit");
            }
            if (titleData.mData == "Commission") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;
                var RateIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission_Rate' });
                var Ratevalue = cell.cell(':eq(' + cell.index().row + ')', RateIndex, { search: 'applied' });
                var PriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                var pricevalue = cell.cell(':eq(' + cell.index().row + ')', PriceIndex, { search: 'applied' }).data();

                var NetPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Net_Price' });
                var NetPrice = cell.cell(':eq(' + cell.index().row + ')', NetPriceIndex, { search: 'applied' });

                if (cell.isshade_bg == false) {

                    var rtnval = CountYj(true, pricevalue, $(jqInputs[0]).val());
                    Ratevalue.data(rtnval.Commission_Rate);
                    NetPrice.data(rtnval.Net_Price);

                }
                cell.data($(jqInputs[0]).val());
            }
            if (titleData.mData == "Commission_Rate") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;
                var CommissionIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Commission' });
                var Commissionvalue = cell.cell(':eq(' + cell.index().row + ')', CommissionIndex, { search: 'applied' });
                var PriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                var pricevalue = cell.cell(':eq(' + cell.index().row + ')', PriceIndex, { search: 'applied' }).data();
                var NetPriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Net_Price' });
                var NetPrice = cell.cell(':eq(' + cell.index().row + ')', NetPriceIndex, { search: 'applied' });

                if (cell.isshade_bg == false) {
                    var rtnval = CountYj(false, pricevalue, $(jqInputs[0]).val());
                    Commissionvalue.data(rtnval.Commission);
                    NetPrice.data(rtnval.Net_Price);

                }
                cell.data($(jqInputs[0]).val());
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
            else {

                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
                PageCommon.RefreshTablePage("PriceApplyDetailEdit");

            }
        },
        //设置控件属性
        Set: function () {

        },
        //保存菜单画面数据
        Save: function () {

            PageCommon.CheckDataTables({
                tableId: "PriceApplyDetailEdit",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty: true
                    },
                         {
                             columnName: "Apply_Count",
                             CheckEmpty: true,
                             CheckLength: '14'
                         },
                        {
                            columnName: "Customer_Receive_Price",
                            CheckEmpty: true,
                            CheckLength: '28'
                        },
                        {
                            columnName: "Apply_Price",
                            CheckEmpty: true,
                            CheckLength: '28'
                        },
                        {
                            columnName: "Ty_Way",
                            CheckEmpty: true
                        },
                        {
                            columnName: "Commission",
                            CheckEmpty: true,
                            CheckLength: '28'
                        },
                        {
                            columnName: "Delivery_Date",
                            CheckEmpty: true
                        },
                        {
                            columnName: "Goods_Apply",
                            CheckEmpty: true
                        },

                ],



            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("PriceApplyDetailEdit");

            PriceApply_vue.M_Price_Apply.M_Price_Apply_Detail_List = [];

            //设置统购外购
            PriceApply_vue.M_Price_Apply.Is_Purchase = "1";


            //联系人信息组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Product_Name != "" && item.Cost_Source != "") {
                    var obj = {};
                    for (var key in item) {
                        if (item.Product_Name.indexOf('@@') > 1) {
                            item.Product_Name = item.Product_Name.substring(0, item.Product_Name.indexOf('@@'));
                        }
                        var keyTypes = typeof item[key];
                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                            if (key == "Is_Include_Tax_Name") {
                                if (item.Is_Include_Tax_Name == '是') {
                                    obj.Is_include_Tax = "0";
                                } else {
                                    obj.Is_include_Tax = "1";
                                }
                            }
                        }
                    }



                    PriceApply_vue.M_Price_Apply.M_Price_Apply_Detail_List.push(obj);

                }
            });

            //验证至少输入一条明细
            if (!PriceApply_vue.M_Price_Apply.M_Price_Apply_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027");
                PageCommon.Loading(false);
                return;
            }

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { PriceApply: PriceApply_vue.M_Price_Apply }
             , success: function (data) {

                 window.location.href = PageCommon.SetUrlParameter("Detail_W", "relevantnumber=" + data.Result_Model.Request_Object.Price_Apply_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
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
             , param: { PriceApply: PriceApply_vue.M_Price_Apply },
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
             , param: { PriceApply: PriceApply_vue.M_Price_Apply },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("List_W");
                }
            });
        },
        //审批意见
        mApproval: function () {

        },

        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List_W', vm);
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
