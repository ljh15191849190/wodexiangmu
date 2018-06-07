
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
    var NewGoodsPayApplyBill_vue = new Vue({
        el: '#apps',
        data: {
            acceptBill: {
                inputField: ["Accept_Bill_Id"]
            },
            globalParameter: PageCommon.GlobalParameter(),
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
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000008",
                System_Key: "FinancialApplication"
            },
            //单据信息
            FA_Goods_Pay_Apply_Bill: {
                //定货取消单号
                Goods_Pay_Apply_Bill_Id: "",
                //审核状态
                Approval_Status: "",
                //付款项目
                Pay_Item: "01",
                //采购单位
                Supplier_Id: "",
                //付款单位
                Payment_Supplier_Id: "",
                //承兑汇票ID
                Accept_Bill_Id: "",
                //供应商银行
                Supplier_Bank_Detail_Number: "",
                //备注
                Remark: "",
                //付款方式
                Payment_Method: "",
                //付款账号
                Supplier_Id: "",
                //付款部门
                Pay_Department_Id: "",
                //实付金额
                Fact_Pay_Amount: "",
                //已冲抵金额
                Charged_Aganist_Amount: "",
                //未冲抵金额
                No_Charge_Aganist_Amount: "",
                //贷款余额
                Goods_Payment_Balance: "",
                //实付金额百分比
                Fact_Pay_Amount_Percent:"",
                //明细列表
                FA_Goods_Pay_Apply_Bill_Detail_List: []
            },
            //供应商查询条件
            supplier: {
                Menuresult: ["Supplier_Id", "Supplier_Name"],
                filedSearch: ["Supplier_Id", "Supplier_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Supplier_Id", "Supplier_Name"]
            },
            //付款公司查询条件
            company: {
                Menuresult: ["Company_Id", "Company_Name"],
                filedSearch: ["Company_Id", "Company_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Company_Id", "Company_Name"]
            },
            //付款部门查询条件
            department: {
                Menuresult: ["Department_Id", "Department_Name"],
                filedSearch: ["Department_Id", "Department_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Department_Id", "Department_Name"]
            },
            //编辑表格id数组
            tableid: ['GoodsPayApplyBillDetailEditList'],
        },
        mounted: function () {
            var that = this;
            //页签折叠
            $(".title1").click(function () {
                $(this).siblings('.down_tab').find("i").toggleClass('rotate');
                $(this).parent().next().toggle();
                $(this).parent().toggleClass("boder");
            })
            $(".down_tab").click(function () {
                $(this).find("i").toggleClass('rotate');
                $(this).parent().next().toggle();
                $(this).parent().toggleClass("boder");
            })
            $(".down_2").click(function () {
                $(this).find("i").toggleClass('rotate');
                $(".tile_body").toggle();
            })
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber },
                    success: function (data) {
                        that.FA_Goods_Pay_Apply_Bill = data;
                        //判断状态
                        PageCommon.EditStatus({
                            vm: that,
                            approvalstatus: data.Approval_Status
                        });
                        //点击保存
                        PageCommon.Clickbtn(that, 'Save');
                        //如果是保存后加载的页面表格设为不可修改
                        if (save) {
                            that.isedittable = false;
                        }

                        if (RequestValue.sourcetype && RequestValue.sourcetype == 1) {
                            that.btnApproval = true;
                        }
                    }
                });
            }
            $('#GoodsPayApplyBillDetailEditList').on('dblclick', 'tbody tr', function () {
                PageCommon.ModalOpen({
                    id: "PaymentImport",
                    title: '待付款引入',
                    width: "960px",
                    height: "600px",
                    btn: ["确定"],
                    url: '/FinancialApplication/Payment/PaymentImport',
                    callBack: function (iframeId) {
                        var list = PageCommon.ChildrenFrames(iframeId).PaymentImport_vue.Add();
                        $.each(list, function (index, item) {
                            item.This_Pay_Amount = "";
                            that.FA_Goods_Pay_Apply_Bill.FA_Goods_Pay_Apply_Bill_Detail_List.push(item);
                        })
                        PageCommon.RefreshTablePage("GoodsPayApplyBillDetailEditList");
                    }
                })
            })
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

            });
        },
        methods: {
            PaymentMethod: function (val) {
                if (val.id == "03") {
                    $(".AcceptBill").show();
                }
                else {
                    $(".AcceptBill").hide();
                }
            },
            //父表格合计数字格式化
            pagetotalback: function (Field_Name, a, b) {
                var that = this;
                if (Field_Name === "Total_Pay_Amount" || Field_Name === "Completion_Payment_Amount" || Field_Name === "This_Pay_Amount") {
                    return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Sum_Decimal];
                }
            },
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name === "Price_Tax_Sum") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
                if (Field_Name === "Total_Pay_Amount" || Field_Name === "Completion_Payment_Amount" || Field_Name === "This_Pay_Amount") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
            },
            //编辑行回调
            rowEditCallback: function (cell, titleData, rowData) {
                var that = this;
                var tdWidth = $(cell.node()).width();
                if (titleData.mData == "This_Pay_Amount") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_This_Pay_Amount").html();
                    $("#div_temp_This_Pay_Amount").attr("id", "div_temp_This_Pay_Amount_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_This_Pay_Amount_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            This_Pay_Amount: cell.data(),
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "This_Pay_Amount_" + cell.index().row + "_" + cell.index().column);
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
                    if (rowData.Product_Id) {
                        cell.data($(jqInputs[0]).val());
                    } else {
                        cell.data("");
                    }
                }
            },
            //编辑
            Edit: function () {
                var that = this;
                //点击编辑按钮
                PageCommon.Clickbtn(that, 'Edit');
            },
            //保存
            Save: function () {
                var that = this;
                $('#GoodsPayApplyBillDetailEditList').DataTable().cell.blur();
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //获取定单明细表数据
                var detaildata = PageCommon.GetDataTableData("GoodsPayApplyBillDetailEditList");
                var FA_Goods_Pay_Apply_Bill_Detail_List = [];
                //组织明细数据 过滤空行
                $.each(detaildata, function (index, item) {
                    if (item.Product_Id) {
                        item.Product_Name = item.Product_Name.substring(0, item.Product_Name.length - 1);
                        FA_Goods_Pay_Apply_Bill_Detail_List.push(item);
                    }
                });
                that.FA_Goods_Pay_Apply_Bill.FA_Goods_Pay_Apply_Bill_Detail_List = FA_Goods_Pay_Apply_Bill_Detail_List;
                PageCommon.SubmitForm({
                    url: "Save"
                         , param: { goodsPayApplyBill: that.FA_Goods_Pay_Apply_Bill }
                         , success: function (data) {
                             //保存后根据返回值加载页面
                             var relevantnumber = data.Result_Model.Goods_Pay_Apply_Bill_Id;
                             window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                         }
                });
            },
            //提交
            Submit: function () {
                var that = this;
                PageCommon.SubmitForm({
                    url: "Submit",
                    param: { goodsPayApplyBill: that.FA_Goods_Pay_Apply_Bill },
                    success: function (data) {
                        //点击提交按钮
                        PageCommon.Clickbtn(that, 'Submit');
                    }
                });
            },
            //审核
            Approval: function () {
                var that = this;
                PageCommon.SubmitForm({
                    url: "Approve",
                    param: { goodsPayApplyBill: that.FA_Goods_Pay_Apply_Bill },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + that.FA_Goods_Pay_Apply_Bill.Goods_Pay_Apply_Bill_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                    }
                });
            },
            //审批意见
            ApprovalOpinion: function () {

            },
            Template_selection: function (data) {
                var that = this;
                if (data) {
                    that.FA_Goods_Pay_Apply_Bill.Goods_Payment_Balance = data.Goods_Payment_Balance;
                    that.FA_Goods_Pay_Apply_Bill.Payment_Supplier_Id = data.Supplier_Id;
                    that.FA_Goods_Pay_Apply_Bill.Supplier_Bank_Detail_Number = data.Bank_Detail_Number;
                } else {
                    that.FA_Goods_Pay_Apply_Bill.Goods_Payment_Balance = '';
                    that.FA_Goods_Pay_Apply_Bill.Payment_Supplier_Id = '';
                    that.FA_Goods_Pay_Apply_Bill.Supplier_Bank_Detail_Number = '';
                }
            },
            TemplateSelectionCustomer: function (data) {
                var that = this;
                if (data) {
                    that.FA_Goods_Pay_Apply_Bill.Supplier_Bank_Detail_Number = data.Bank_Detail_Number;
                } else {
                    that.FA_Goods_Pay_Apply_Bill.Supplier_Bank_Detail_Number = '';
                }
            },
            //返回列表画面
            Back: function () {
                var vm = this;
                PageCommon.BackFormMessge("List", vm);
            },
            //设置
            Set: function () {

            }
        }
    });
