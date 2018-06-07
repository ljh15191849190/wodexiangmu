﻿  //联系人信息主键
    var RequestValue = PageCommon.Request();
    if (RequestValue.relevantnumber) {
        //判断传的参数的是2个还是1个
        var relevantnumber = RequestValue.relevantnumber;
        if (relevantnumber.indexOf(',') != -1) {
            relevantnumber = relevantnumber.split(",");
        } else {
            relevantnumber = [relevantnumber];
        }
    }
    //判断是点击了保存按钮
    if (RequestValue.save) {
        var save = RequestValue.save;
    }
    var Sale_Invoice_RedRushApply_vue = new Vue({
        el: '#apps',
        data: {
            isedittable: true,
            Invoice_InvalidApply: {
                Red_Flush_Invoice_Number:'',
                Sale_Invoice_Id: '',
                Reason: "",
                FA_Exception_Invoice_A_Detail_List: [],
            },
           //表格
            //第二张表 销售表
            FA_Sale_Invoice_List: [],

            //联系人信息表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000010",
                System_Key: "FinancialApplication",
                List_Id: "SaleInvoiceRedRushApplyDetailList"
            },
            //销售
            columHeaderSeach2: {
                Menu_Id: "M000002",
                System_Key: "FinancialApplication",
                List_Id: "SaleOrderDetail"
            },
            //是否只读
            readonly: false,
            //是否遮罩
            isshade_bg: false,
       
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
            //客户返回数据
            SelectionData: {},

        },
        mounted: function () {
            var vm = this;
            vm.globalParameter = PageCommon.GlobalParameter();
            //控件拖动
            $('.base').arrangeable({
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
                $(this).parent().find(".title").toggleClass("boder");
                $(this).toggleClass("rotate");
            })
            $(".down_2").click(function () {
                $(this).toggleClass("rotate");
                $(".BasicInformation").slideToggle();
                $(".title1").toggleClass("boder");
                $(".down_tab").toggleClass("rotate");
            })
            var vm = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber }
                    , success: function (data) {
                        vm.isedittable = false;
                        Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply = data;
                        //判断状态
                        PageCommon.EditStatus({
                            vm: vm,
                            approvalstatus: data.Approval_Status,
                        });
                        //点击保存
                        PageCommon.Clickbtn(vm, 'Save');
                        if (RequestValue.sourcetype && RequestValue.sourcetype == 1) {
                            vm.btnApproval = true;
                        }
                    }
                });
            }
        },
        methods: {
            TemplateSelectionCustomer: function (result) {
                var vm = this;
                if (result) {
                    if (!relevantnumber) {
                        PageCommon.GetFormData({
                            url: "SeachSaleInvoiceByInvoiceNumber",
                            param: { keyValue: [result.Invoice_Number] },
                            success: function (data) {
                                vm.Invoice_InvalidApply.FA_Exception_Invoice_A_Detail_List = data.DataContext;
                            }
                        });
                    }
                    PageCommon.GetFormData({
                        url: "SaleBillDetailSeach",
                        param: { keyValue: [result.Invoice_Number] },
                        success: function (data) {
                            if (relevantnumber) {
                                vm.isshade_bg = true;
                            }
                            Sale_Invoice_RedRushApply_vue.FA_Sale_Invoice_List = data.DataContext;
                        }
                    });
                } else {
                    if (!relevantnumber) {
                        vm.Invoice_InvalidApply.FA_Exception_Invoice_A_Detail_List = [];
                    }
                    Sale_Invoice_RedRushApply_vue.FA_Sale_Invoice_List = [];
                }
            },
            totalback: function (Field_Name, a, b) {
                var vm = this;
                //数量
                if (Field_Name === "Count" || Field_Name === "This_Red_Flush") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }

                //价税合计
                if (Field_Name === "Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                //单价总额
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //单价
                if (Field_Name === "Price") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
                //税额
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
            },
            columrender: function (Field_Name, value, type, rowData, rowSetting) {

                if (Field_Name === "Count" || Field_Name === "This_Red_Flush") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Tax_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Tax_Rate") {
                    if (value) {

                        return PageCommon.NumberDispose(value, 6, 1);

                    }
                }
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
            },
            totalback2: function (Field_Name, a, b) {
                var vm = this;
                //数量
                if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }

                //价税合计
                if (Field_Name === "Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                //单价总额
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //单价
                if (Field_Name === "Price") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
                //税额
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
                //YJ
                if (Field_Name === "Commission") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
                }
                //申请成本 最新成本
                if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
                }
            },
            columrender2: function (Field_Name, value, type, rowData, rowSetting) {

                if (Field_Name === "Sale_Count" || Field_Name === "Return_Goods_Count") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                    }
                }
                if (Field_Name === "Price") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Tax_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                //YJ
                if (Field_Name === "Commission") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);

                    }
                }
                //申请成本 最新成本
                if (Field_Name === "Apply_Cost" || Field_Name === "Latest_Cost") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Tax_Rate") {
                    if (value) {

                        return PageCommon.NumberDispose(value, 6, 1);

                    }
                }
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
            },
            //保存菜单画面数据
            Save: function () {
                var vm = this;
                $(".BasicInformation").slideDown(300);
                $(".title1").removeClass("boder");
                $(".down_tab").removeClass("rotate");
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                if (Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply.FA_Exception_Invoice_A_Detail_List.length > 0) {
                    //提交数据到后台
                    $.each(Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply.FA_Exception_Invoice_A_Detail_List, function (index, item) {
                        if (item.Count != "") {
                            item.This_Red_Flush = item.Count;
                            item.Sale_Invoice_Detail_Number = item.Detail_Number;
                        }
                    });
                    Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply.Sale_Invoice_Id = Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply.FA_Exception_Invoice_A_Detail_List[0].Sale_Invoice_Id;
                    PageCommon.SubmitForm({
                        url: "Save"
                     , param: { exceptionInvoiceApply: Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply }
                     , success: function (data) {
                         //SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                         window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Exception_Invoice_Apply_Id + "," + data.Result_Model.Sale_Invoice_Id + '&save=1');
                     }
                    });
                } else {
                    PageCommon.ShowMessageRight("E2069");
                    return;
                }


            },
            //编辑行回调
            rowEditCallback: function (cell, titleData, rowData) {
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
                else if (titleData.mData == "This_Red_Flush") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Count").html();
                    $("#div_temp_Count").attr("id", "div_temp_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Count: cell.data()
                        },
                        methods: {
                            EnterCountonchange: function (value) { }
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Count_" + cell.index().row + "_" + cell.index().column);
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
                else {
                    var jqInputs = $('input', cell.node());

                    //验证数据
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
                    } else {
                        //修改datatable 对应的值
                        cell.data($(jqInputs[0]).val());
                        PageCommon.RefreshTablePage("SaleInvoiceRedRushApplyDetailList");
                    }
                }



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
                    url: "SubmitApply",
                    param: { exceptionInvoiceApply: Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply },
                    success: function (data) {
                        PageCommon.Clickbtn(vm, 'Submit');
                        //vm.btnApproval = "true";
                    }
                });
            },
            //审核
            Approval: function () {
                var vm = this;
                PageCommon.SubmitForm({
                    url: "ReviewApply",
                    param: { exceptionInvoiceApply: Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + Sale_Invoice_RedRushApply_vue.Invoice_InvalidApply.Exception_Invoice_Apply_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                    }
                });
            },
            //审批意见
            mApproval: function () {

            },
            //返回
            Back: function () {
                PageCommon.BackFormMessge("List");
            },
            Set: function () { },

        }
    });