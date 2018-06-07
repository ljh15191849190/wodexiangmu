var Assigned_vue = new Vue({
    el: '#app',
    data: {
        globalParameter: PageCommon.GlobalParameter(),
        //表格是否可编辑
        isedittable: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000014",
            System_Key: "Purchase"
        },
        //采购计划详情
        P_Purchase_Plan_Detail: {},
        dSupplement_Count: "",
        dcount: '',
        dcount2: '',
        dediterowdata: '',
        dlist: []
    },
    mounted: function () {
        var that = this;
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b);
            //console.log(c);
        });
        var RequestValue = PageCommon.Request();
        if (RequestValue.relevantnumber) {
            var relevantnumber = RequestValue.relevantnumber;
            if (relevantnumber.indexOf(',') != -1) {
                relevantnumber = relevantnumber.split(",");
            } else {
                relevantnumber = [relevantnumber];
            }
            PageCommon.GetFormData({
                url: "GetDistribute",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Purchase_Plan_Detail = data;
                    that.dlist = data.P_Purchase_Plan_Distribute_List;
                    that.dcount2 = data.P_Purchase_Plan_Distribute_List[0].Distribute_Count;
                    that.dSupplement_Count = data.Supplement_Count;
                    that.dcount = data.Supplement_Count;
                }
            });
        }
    },
    watch: {
        dSupplement_Count: function (value, oldvalue) {
            var that = this;
            value = parseFloat(value); that.dcount = parseFloat(that.dcount); oldvalue = parseFloat(oldvalue);
            that.P_Purchase_Plan_Detail.Final_Count = parseFloat(that.P_Purchase_Plan_Detail.Apply_Count) + value;
            if (that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List.length) {
                if (value < 0) {
                    value = oldvalue;
                } else {
                    if (value > that.dcount) {
                        if (oldvalue > value) {
                            var count = parseFloat(value) - parseFloat(oldvalue);
                            for (var i = that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List.length - 1; i >= 0; i--) {
                                count = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) + count;
                                if (count < 0) {
                                    that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count = 0;
                                    Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                                } else {
                                    that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count = count;
                                    Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                                    break;
                                }
                            }
                        } else if (oldvalue < value) {
                            that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count) + (parseFloat(value) - parseFloat(oldvalue));
                            Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, 0, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0]);
                        } else {
                            that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count = parseFloat(that.dcount2) + (parseFloat(value) - parseFloat(that.dcount));
                            Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, 0, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0]);
                        }
                    }
                    if (value == that.dcount) {
                        if (oldvalue > value) {
                            var count = parseFloat(value) - parseFloat(oldvalue);
                            for (var i = that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List.length - 1; i >= 0; i--) {
                                count = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) + count;
                                if (count < 0) {
                                    that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count = 0;
                                    Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                                } else {
                                    that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count = count;
                                    Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                                    break;
                                }
                            }
                        } else if (oldvalue < value) {
                            that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count) + (parseFloat(value) - parseFloat(oldvalue));
                            Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, 0, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0]);
                        } else {
                            that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count = parseFloat(that.dcount2);
                            Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, 0, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0]);
                        }
                    }
                    if (value < that.dcount) {
                        if (oldvalue < value) {
                            that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Distribute_Count) + (parseFloat(value) - parseFloat(oldvalue));
                            Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, 0, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0]);
                        } else {
                            var count = parseFloat(value) - parseFloat(oldvalue);
                            for (var i = that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List.length - 1; i >= 0; i--) {
                                count = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) + count;
                                if (count < 0) {
                                    that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count = 0;
                                    Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                                } else {
                                    that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count = count;
                                    Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            var num1 = 0, num2 = 0;
            for (var i = 0; i < that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List.length; i++) {
                that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Include_Tax_Amount = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) * parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Lastest_Price_Include_Tax);
                that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].No_Include_Tax_Amount = parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) * parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Latest_Price_No_Include_Tax);
                Vue.set(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List, i, that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i]);
                num1 += parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) * parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Lastest_Price_Include_Tax);
                num2 += parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Distribute_Count) * parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[i].Latest_Price_No_Include_Tax);
            }
            that.P_Purchase_Plan_Detail.Include_Tax_Amount = num1;
            that.P_Purchase_Plan_Detail.No_Include_Tax_Amount = num2;
            PageCommon.RefreshTablePage("PurchasePlanDistributeList");
        },
    },
    methods: {
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData, datatable) {
            var that = this;
            that.dediterowdata = cell.data();
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Distribute_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Distribute_Count").html();
                $("#div_temp_Distribute_Count").attr("id", "div_temp_Distribute_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Distribute_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Distribute_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Delivery_Date") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Delivery_Date").html();
                $("#div_temp_Delivery_Date").attr("id", "div_temp_Delivery_Date_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Delivery_Date_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Delivery_Date_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);

            } else if (titleData.mData == "Instruction_Month") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Instruction_Month").html();
                $("#div_temp_Instruction_Month").attr("id", "div_temp_Instruction_Month_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Instruction_Month_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Instruction_Month_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var that = this;
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            var jqInputs = $('input', cell.node());
            //验证数据
            if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                cell.focus();
            } else {
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());
            }
            var ids = 0;
            var a = datatable.cell(':eq(' + ids + ')', 4, { search: 'applied' }).data();
            if (that.dediterowdata > 0 || that.dediterowdata == 0) {
                if (parseFloat(that.dediterowdata) - parseFloat($(jqInputs[0]).val()) < 0) {
                    if (parseFloat($(jqInputs[0]).val()) > (parseFloat(a) + parseFloat(that.dediterowdata))) {
                        cell.data(parseFloat(that.dediterowdata));
                    } else if (parseFloat($(jqInputs[0]).val()) < (parseFloat(a) + parseFloat(that.dediterowdata))) {
                        datatable.cell(':eq(' + ids + ')', 4, { search: 'applied' }).data((parseFloat(a) + parseFloat(that.dediterowdata)) - parseFloat($(jqInputs[0]).val()));
                    } else if (parseFloat($(jqInputs[0]).val()) == (parseFloat(a) + parseFloat(that.dediterowdata))) {
                        cell.data(parseFloat(a) + parseFloat(that.dediterowdata));
                        datatable.cell(':eq(' + ids + ')', 4, { search: 'applied' }).data(0)
                    }
                } else if ((parseFloat(that.dediterowdata) - parseFloat($(jqInputs[0]).val()) > 0)) {
                    datatable.cell(':eq(' + ids + ')', 4, { search: 'applied' }).data(parseFloat(that.dlist[0].Distribute_Count) + (parseFloat(that.dediterowdata) - parseFloat($(jqInputs[0]).val())));
                }
            } else if (that.dediterowdata < 0) {
                cell.data(0);
            }
            datatable.cell(':eq(' + cell.index().row + ')', 9, { search: 'applied' }).data(parseFloat(rowData.Distribute_Count) * parseFloat(rowData.Lastest_Price_Include_Tax));
            datatable.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' }).data(parseFloat(rowData.Distribute_Count) * parseFloat(rowData.Latest_Price_No_Include_Tax));
            datatable.cell(':eq(' + 0 + ')', 9, { search: 'applied' }).data(parseFloat(datatable.cell(':eq(' + 0 + ')', 4, { search: 'applied' }).data()) * parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Lastest_Price_Include_Tax));
            datatable.cell(':eq(' + 0 + ')', 10, { search: 'applied' }).data(parseFloat(datatable.cell(':eq(' + 0 + ')', 4, { search: 'applied' }).data()) * parseFloat(that.P_Purchase_Plan_Detail.P_Purchase_Plan_Distribute_List[0].Latest_Price_No_Include_Tax));
            PageCommon.RefreshTablePage("PurchasePlanDistributeList");
        },
        //获取合计列
        pagetotalback: function (i, pageTotal) {
            var that = this;
            if (i == 9) {
                that.P_Purchase_Plan_Detail.Include_Tax_Amount = pageTotal;
            } else if (i == 10) {
                that.P_Purchase_Plan_Detail.No_Include_Tax_Amount = pageTotal;
            }
        },
        //表格合计数字格式化
        pagetotalback2: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name === "Distribute_Count") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), that.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Include_Tax_Amount") {
                console.log(a)
                return [PageCommon.NumberDispose(a, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "No_Include_Tax_Amount") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Item_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            if (Field_Name == "Distribute_Count" || Field_Name == "Order_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Include_Tax_Amount" || Field_Name === "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "No_Include_Tax_Amount" || Field_Name === "Latest_Price_No_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name == "Standard_Price") {
                if (value) {
                    return PageCommon.NumberDispose(value, that.globalParameter.Price_Decimal, that.globalParameter.Money_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Latest_Price") {
                if (value) {
                    return PageCommon.NumberDispose(value, that.globalParameter.Cost_Decimal, that.globalParameter.Cost_Digital_Cut_Way);
                }
            }
        },
        //保存系统画面数据
        Save: function () {
            var that = this;
            //提交数据
            that.P_Purchase_Plan_Detail.Supplement_Count = that.dSupplement_Count;
            PageCommon.SubmitForm({
                url: "SubmitPurchasePlanDistribute",
                param: { purchasePlanDetail: that.P_Purchase_Plan_Detail },
                success: function () {
                    //关闭iframe窗并刷新列表
                    PageCommon.ModalClose();
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("PurchasePlanDetailList");
                }
            });
        }
    }
});