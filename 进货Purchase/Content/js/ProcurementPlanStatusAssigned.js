var AssignedStatus_vue = new Vue({
    el: '#app',
    data: {
        //表格是否可编辑
        isedittable: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000016",
            System_Key: "Purchase"
        },
        //采购计划详情
        P_Purchase_Plan_Detail: {},
        dCancel_Count: '',
        dNo_Sure_Count: '',
        dSure_Count: '',
        dOn_Sea_Count: '',
        dBond_Area_Count: '',
        //dcentercount: false,
        dNo_Sure_Count_change: true,
        dSure_Count_change: true,
        dBond_Area_Count_change: true,
        dpredata: '',
        dCancel_Count_edite: true,
        dSure_Count_edite: true,
        dOn_Sea_Count_edite: true,
        dCancel_Count_edite: true,
    },
    mounted: function () {
        var that = this;
        //控件拖动
        $('.drag_1').arrangeable({
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
        var RequestValue = PageCommon.Request();
        if (RequestValue.relevantnumber) {
            var relevantnumber = RequestValue.relevantnumber;
            if (relevantnumber.indexOf(',') != -1) {
                relevantnumber = relevantnumber.split(",");
            } else {
                relevantnumber = [relevantnumber];
            }
            PageCommon.GetFormData({
                url: "GetPurchasePlanStatusDetail",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Purchase_Plan_Detail = data;
                    that.dCancel_Count = data.Cancel_Count;
                    that.dNo_Sure_Count = data.No_Sure_Count;
                    that.dSure_Count = data.Sure_Count;
                    that.dOn_Sea_Count = data.On_Sea_Count;
                    that.dBond_Area_Count = data.Bond_Area_Count;
                }
            });
        }
    },
    watch: {
        dSure_Count: function (value, oldvalue) {
            var that = this;
            if (that.dSure_Count_edite) {
                if (that.dNo_Sure_Count_change) {
                    if (oldvalue !== "") {
                        if (parseFloat(value) < 0) {
                            that.dSure_Count = oldvalue;
                            that.dSure_Count_edite = false;
                        } else if (parseFloat(value) == 0) {
                            that.dNo_Sure_Count = parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue);
                        } else if (parseFloat(value) > 0) {
                            if (parseFloat(value) > parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue))) {
                                that.dSure_Count = oldvalue;
                                //that.dcentercount = true;
                                that.dSure_Count_edite = false;
                            } else if (parseFloat(value) == parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue))) {
                                that.dNo_Sure_Count = 0;
                            } else if (parseFloat(value) < parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue))) {
                                //if (that.dcentercount) {
                                //    that.dNo_Sure_Count = that.dNo_Sure_Count;
                                //    that.dcentercount = false;
                                //} else {
                                //that.dNo_Sure_Count = parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue)) - parseFloat(value);
                                //}
                                that.dNo_Sure_Count = parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue)) - parseFloat(value);
                            }
                        }
                        if (value === "") {
                            that.dSure_Count = oldvalue;
                            that.dSure_Count_edite = false;
                            //that.dcentercount = true;
                        }
                    }
                }
            }
        },
        dOn_Sea_Count: function (value, oldvalue) {
            var that = this;
            if (that.dOn_Sea_Count_edite) {
                if (that.dSure_Count_change) {
                    if (oldvalue !== "") {
                        if (parseFloat(value) < 0) {
                            that.dOn_Sea_Count = oldvalue;
                            that.dOn_Sea_Count_edite = false;
                        } else if (parseFloat(value) == 0) {
                            that.dSure_Count = parseFloat(that.dSure_Count) + parseFloat(oldvalue);
                        } else if (parseFloat(value) > 0) {
                            if (parseFloat(value) > parseFloat(parseFloat(that.dSure_Count) + parseFloat(oldvalue))) {
                                that.dOn_Sea_Count = oldvalue;
                                //that.dcentercount = true;
                                that.dOn_Sea_Count_edite = false;
                            } else if (parseFloat(value) == parseFloat(parseFloat(that.dSure_Count) + parseFloat(oldvalue))) {
                                that.dSure_Count = 0;
                            } else if (parseFloat(value) < parseFloat(parseFloat(that.dSure_Count) + parseFloat(oldvalue))) {
                                //if (that.dcentercount) {
                                //    that.dSure_Count = that.dSure_Count;
                                //    that.dcentercount = false;
                                //} else {
                                //    that.dSure_Count = (parseFloat(that.dSure_Count) + parseFloat(oldvalue)) - parseFloat(value);
                                //}
                                that.dSure_Count = (parseFloat(that.dSure_Count) + parseFloat(oldvalue)) - parseFloat(value);
                            }
                        }
                        if (value === "") {
                            that.dOn_Sea_Count = oldvalue;
                            //that.dcentercount = true;
                            that.dOn_Sea_Count_edite = false;
                        }
                    }
                }
                that.dNo_Sure_Count_change = false;
            }
        },
        dBond_Area_Count: function (value, oldvalue) {
            var that = this;
            if (that.dBond_Area_Count_edite) {
                if (that.dBond_Area_Count_change) {
                    if (oldvalue !== "") {
                        if (parseFloat(value) < 0) {
                            that.dBond_Area_Count = oldvalue;
                            that.dBond_Area_Count_edite = false;
                        } else if (parseFloat(value) == 0) {
                            that.dOn_Sea_Count = parseFloat(that.dOn_Sea_Count) + parseFloat(oldvalue);
                        } else if (parseFloat(value) > 0) {
                            if (parseFloat(value) > parseFloat(that.dOn_Sea_Count) + parseFloat(oldvalue)) {
                                that.dBond_Area_Count = oldvalue;
                                //that.dcentercount = true;
                                that.dBond_Area_Count_edite = false;
                            } else if (parseFloat(value) == parseFloat(that.dOn_Sea_Count) + parseFloat(oldvalue)) {
                                that.dOn_Sea_Count = 0;
                            } else if (parseFloat(value) < parseFloat(that.dOn_Sea_Count) + parseFloat(oldvalue)) {
                                //if (that.dcentercount) {
                                //    that.dOn_Sea_Count = that.dOn_Sea_Count;
                                //    that.dcentercount = false;
                                //} else {
                                //    that.dOn_Sea_Count = (parseFloat(that.dOn_Sea_Count) + parseFloat(oldvalue)) - parseFloat(value);
                                //}
                                that.dOn_Sea_Count = (parseFloat(that.dOn_Sea_Count) + parseFloat(oldvalue)) - parseFloat(value);
                            }
                        }
                        if (value === "") {
                            that.dBond_Area_Count = oldvalue;
                            //that.dcentercount = true;
                            that.dBond_Area_Count_edite = false;
                        }
                    }
                    that.dSure_Count_change = false;
                }
            }
        },
        dCancel_Count: function (value, oldvalue) {
            var that = this;
            if (oldvalue !== "") {
                if (that.dCancel_Count_edite) {
                    if (parseFloat(value) < 0 || value === "") {
                        that.dCancel_Count = oldvalue;
                        that.dCancel_Count_edite = false;
                    } else if (parseFloat(value) > 0) {
                        if (parseFloat(value) > parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue))) {
                            that.dCancel_Count = oldvalue;
                            that.dCancel_Count_edite = false;
                        } else if (parseFloat(value) == parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue))) {
                            that.dNo_Sure_Count = 0;
                        } else if (parseFloat(value) < parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue))) {
                            that.dNo_Sure_Count = parseFloat(parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue)) - parseFloat(value);
                        }
                    } else if (parseFloat(value) == 0) {
                        that.dNo_Sure_Count = parseFloat(that.dNo_Sure_Count) + parseFloat(oldvalue);
                    }
                }
            }
        }
    },
    methods: {
        //可操作数据
        mchange: function (index) {
            var that = this;
            if (index == 1) {
                that.dNo_Sure_Count_change = true;
                that.dBond_Area_Count_change = true;
                that.dSure_Count_edite = true;
            } else if (index == 2) {
                that.dSure_Count_change = true;
                that.dBond_Area_Count_change = true;
                that.dOn_Sea_Count_edite = true;
            } else if (index == 3) {
                that.dBond_Area_Count_change = true;
                that.dBond_Area_Count_edite = true;
            } else if (index == 4) {
                that.dCancel_Count_edite = true;
            }
        },
        //快速分配
        Qdistrust: function () {
            var that = this;
            that.dBond_Area_Count_change = false;
            that.dNo_Sure_Count = 0;
            that.dSure_Count = 0;
            that.dOn_Sea_Count = 0;
            that.dBond_Area_Count = parseFloat(that.P_Purchase_Plan_Detail.Final_Count) - parseFloat(that.dCancel_Count);
            that.dSure_Count_edite = false;
            that.dOn_Sea_Count_edite = false;
            that.dBond_Area_Count_edite = false;
        },
        //取消数量提交
        Cancel: function () {
            var that = this;
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData, datatable) {
            var that = this;
            var tdWidth = $(cell.node()).width();
            that.dpredata = cell.data();
            if (titleData.mData == "Predistribution_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Predistribution_Count").html();
                $("#div_temp_Predistribution_Count").attr("id", "div_temp_Predistribution_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Predistribution_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Predistribution_Count_" + cell.index().row + "_" + cell.index().column);
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
            var sum = 0;
            for (var i = 0; i < that.P_Purchase_Plan_Detail.M_Order_Apply_Detail_List.length; i++) {
                sum += parseFloat(that.P_Purchase_Plan_Detail.M_Order_Apply_Detail_List[i].Predistribution_Count);
            }
            if (cell.data() === "") {
                cell.data(that.dpredata);
            } else {
                var sum2 = parseFloat(that.dSure_Count) + parseFloat(that.dOn_Sea_Count) + parseFloat(that.dBond_Area_Count);
                if (parseFloat(sum) > parseFloat(sum2)) {
                    cell.data(that.dpredata);
                } else {
                    cell.data($(jqInputs[0]).val());
                }
            }
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
        //保存系统画面数据
        Save: function () {
            var that = this;
            //提交数据
            that.P_Purchase_Plan_Detail.No_Sure_Count = that.dNo_Sure_Count;
            that.P_Purchase_Plan_Detail.Sure_Count = that.dSure_Count;
            that.P_Purchase_Plan_Detail.On_Sea_Count = that.dOn_Sea_Count;
            that.P_Purchase_Plan_Detail.Bond_Area_Count = that.dBond_Area_Count;
            that.P_Purchase_Plan_Detail.Cancel_Count = that.dCancel_Count;
            PageCommon.SubmitForm({
                url: "PurchasePlanStatusPreDistribution",
                param: { purchasePlanDetail: that.P_Purchase_Plan_Detail },
                success: function () {
                    //关闭iframe窗并刷新列表
                    PageCommon.ModalClose();
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("PurchasePlanDetailStatusList");
                }
            });
        },
        //取消数量保存
        Cancel: function () {
            var that = this;
            //提交数据
            that.P_Purchase_Plan_Detail.No_Sure_Count = that.dNo_Sure_Count;
            that.P_Purchase_Plan_Detail.Cancel_Count = that.dCancel_Count;
            PageCommon.SubmitForm({
                url: "PurchasePlanModifyCancelCount",
                param: { purchasePlanDetail: that.P_Purchase_Plan_Detail },
                success: function () {

                }
            });
        }
    }
});