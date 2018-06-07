
    //主键
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
    var vmReceiptRefund= new Vue({
        el: '#apps',
        data: {
            //客户和承兑汇票联动
            linkage: {},
            F_Receipt_Refund: {
                //客户
                Customer_Id:'',
                //承兑汇票号
                Accept_Bill_Id:'',
                //任务人
                Employee_Id: '',
                Employee_Name: '',
                //任务人部门Id
                Department_Id:'',
                //单据ID
                Bill_Id: '',
                //到账日期
                Out_Date: '',
                //是否含税
                Is_Include_Tax:'',
                //备注
                Remark: '',
                //收款退款类型
                Receipt_Refund_Type:'01',
                //退款方式
                Return_Way: '',
                //退款总额
                Receipt_Sum:'',
                //货款
                Goods_Pay: '',
                //定金
                Earnest:'',
                //运费
                Freight: '',
                //其他
                Other: '',

            },

            //不可编辑
            isshade_bg: false,
            //是否只读
            readonly: false,
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

            //是否可编辑
            isEdit01: false,
            isEdit02: true,
            
            IsEdit03: 0,
            //申请单号
            Apply_Num:'',
            //收款单号
            Refund_Num: '',
            //货款总额
            Goods_Pay_Sum: '',
            //运费余额
            Freight_Balance: '',
            //定金余额
            Earnest_Balance: '',
            //其他
            Other: '',

        },
        mounted: function () {
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $('.drag_2').arrangeable({
                dragSelector: '.space'
            });
            $('.form-group').arrangeable({
                dragSelector: '.shade_Bg'
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
                vm.F_Receipt_Refund.Receipt_Refund_Type = "";
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber }
                    , success: function (data) {
                        console.log(data)
                        vmReceiptRefund.F_Receipt_Refund = data;
                        if (vm.F_Receipt_Refund.Receipt_Refund_Type == "01") {
                            vm.Apply_Num = data.Bill_Id;
                        } else {
                            vm.Refund_Num = data.Bill_Id;
                        }

                        //判断状态
                        PageCommon.EditStatus({
                            vm: vm,
                            approvalstatus: data.Approval_Status,

                        });
                        //点击保存
                        PageCommon.Clickbtn(vm, 'Save');
                    }
                });
            } else {
                vm.IsEdit03 = 1;
            }

            $(".Apply").dblclick(function () {

                if (vm.isEdit01 == false) {
                    PageCommon.ModalOpen({
                        id: "PayRefundSearch01",
                        title: '收款退款详细查询',
                        width: "900px",
                        height: "800px",
                        btn: ["添加"],
                        url: '/FinancialManage/ReceiptRefund/SaleRefundApplySearch',
                        callBack: function (iframeId) {

                            var selectRow = PageCommon.ChildrenFrames(iframeId).vmRefund.SelectRow();
                            PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                            console.log(selectRow)
                            if (selectRow.length == 0) {
                                return;
                            }

                            
                            vm.F_Receipt_Refund.Bill_Id = selectRow[0].Sale_Refund_Apply_Id;
                            vm.F_Receipt_Refund.Accept_Bill_Id = selectRow[0].Accept_Bill_Id;
                            vm.Apply_Num = selectRow[0].Sale_Refund_Apply_Id;
                            vm.F_Receipt_Refund.Customer_Id = selectRow[0].Customer_Id;
                            vm.F_Receipt_Refund.Return_Way = selectRow[0].Refund_Method;
                            vm.F_Receipt_Refund.Goods_Pay = selectRow[0].Goods_Pay;
                            vm.F_Receipt_Refund.Receipt_Sum = selectRow[0].Refund_Amount;
                            vm.F_Receipt_Refund.Earnest = selectRow[0].Earnest;
                            vm.F_Receipt_Refund.Freight = selectRow[0].Freight;
                            vm.F_Receipt_Refund.Other = selectRow[0].Other;
                            vm.F_Receipt_Refund.Is_Include_Tax = selectRow[0].Is_Include_Tax;



                        }


                    })
                }

            })

            $(".Receipt").dblclick(function () {
                if (vm.isEdit02 == false) {
                    PageCommon.ModalOpen({
                        id: "PayRefundSearch02",
                        title: '收款退款详细查询',
                        width: "900px",
                        height: "800px",
                        url: '/FinancialManage/ReceiptRefund/ReceiptSearch',
                        callBack: function (iframeId) {

                            var selectRow = PageCommon.ChildrenFrames(iframeId).Receipt_vue.SelectRow();
                            PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();

                            if (selectRow.length == 0) {
                                return;
                            }
                            
                            vm.F_Receipt_Refund.Bill_Id = selectRow[0].Receipt_Id;
                            vm.F_Receipt_Refund.Accept_Bill_Id = selectRow[0].Accept_Bill_Id;
                            vm.F_Receipt_Refund.Customer_Id = selectRow[0].Customer_Id;
                            vm.Refund_Num = selectRow[0].Accept_Bill_Id;
                            vm.F_Receipt_Refund.Arrive_Account_Date = selectRow[0].Arrive_Account_Date;
                            vm.F_Receipt_Refund.Return_Way = selectRow[0].Receipt_Way;
                            vm.F_Receipt_Refund.Goods_Pay = selectRow[0].Goods_Pay;
                            vm.F_Receipt_Refund.Receipt_Sum = selectRow[0].Receipt_Sum;
                            vm.F_Receipt_Refund.Earnest = selectRow[0].Earnest;
                            vm.F_Receipt_Refund.Freight = selectRow[0].Freight;
                            vm.F_Receipt_Refund.Other = selectRow[0].Other;
                            vm.F_Receipt_Refund.Is_Include_Tax = selectRow[0].Is_Include_Tax;


                        }


                    })
                }

            })
        },
        methods: {
            //收款退款类型选择
            RefundChange: function (val) {

                var vm = this;
                if (val.id == "02") {
                    vm.isEdit01 = true;
                    vm.isEdit02 = false;

                } else {
                    vm.isEdit01 = false;
                    vm.isEdit02 = true;
                }
               
                vm.IsEdit03 = 1;
                if (vm.IsEdit03 > 0) {
                    $('#Customer_Id').val(null).trigger('change');
                    $('#Accept_Bill_Id').val(null).trigger('change');
                    $('#Return_Way').val(null).trigger('change');
                    
                    vm.F_Receipt_Refund.Customer_Id = "";
                    vm.F_Receipt_Refund.Accept_Bill_Id = "";
                    vm.F_Receipt_Refund.Employee_Id = "";
                    vm.F_Receipt_Refund.Employee_Name = "";
                    vm.F_Receipt_Refund.Department_Id = "";
                    vm.F_Receipt_Refund.Return_Way = "";
                    vm.F_Receipt_Refund.Bill_Id = "";
                    vm.F_Receipt_Refund.Arrive_Account_Date = "";
                    vm.F_Receipt_Refund.Is_Include_Tax = "";
                    vm.F_Receipt_Refund.Remark = "";
                    vm.F_Receipt_Refund.Receipt_Sum = "";
                    vm.F_Receipt_Refund.Goods_Pay = "";
                    vm.F_Receipt_Refund.Earnest = "";
                    vm.F_Receipt_Refund.Freight = "";
                    vm.F_Receipt_Refund.Other = "";
                    vm.Apply_Num = "";
                    vm.Refund_Num = "";
                    vm.Goods_Pay_Sum = "";
                    vm.Freight_Balance = "";
                    vm.Earnest_Balance = "";
                    vm.Other = "";
                }
                vm.IsEdit03++;
               
            },
            //客户选择
            TemplateSelectionCustomer: function (data) {
                if (data) {
                    vmReceiptRefund.linkage = data.Customer_Id;
                    vmReceiptRefund.F_Receipt_Refund.Employee_Id = data.Employee_Id;
                    vmReceiptRefund.F_Receipt_Refund.Employee_Name = data.Employee_Name;
                    vmReceiptRefund.F_Receipt_Refund.Department_Id = data.Department_Id;
                    vmReceiptRefund.Goods_Pay_Sum = data.Goods_Pay_Sum;
                    vmReceiptRefund.Freight_Balance = data.Freight_Balance;
                    vmReceiptRefund.Earnest_Balance = data.Earnest_Balance;
                    vmReceiptRefund.Other = data.Other;
                } else {
                    vmReceiptRefund.linkage = '';
                    vmReceiptRefund.F_Receipt_Refund.Employee_Id = '';
                    vmReceiptRefund.F_Receipt_Refund.Employee_Name = '';
                    vmReceiptRefund.F_Receipt_Refund.Department_Id = '';
                    vmReceiptRefund.Goods_Pay_Sum = '';
                    vmReceiptRefund.Freight_Balance = '';
                    vmReceiptRefund.Earnest_Balance = '';
                    vmReceiptRefund.Other = '';
                }
            },
            //保存菜单画面数据
            Save: function () {

                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                var sum = parseInt(vmReceiptRefund.F_Receipt_Refund.Goods_Pay) + parseInt(vmReceiptRefund.F_Receipt_Refund.Earnest) + parseInt(vmReceiptRefund.F_Receipt_Refund.Freight) + parseInt(vmReceiptRefund.F_Receipt_Refund.Other);


                if (sum > vmReceiptRefund.F_Receipt_Refund.Receipt_Sum) {
                    PageCommon.ShowMessageArrayRight("E1023", new Array("货款、定金、运费之和", "退款总额"));
                    return;
                }
                if (sum < vmReceiptRefund.F_Receipt_Refund.Receipt_Sum) {
                    PageCommon.ShowMessageArrayRight("E1024", new Array("货款、定金、运费之和", "退款总额"));
                    return;
                }
                //提交数据到后台
                PageCommon.SubmitForm({
                    url: "SaveReceiptRefund"
                 , param: { receiptRefund: vmReceiptRefund.F_Receipt_Refund }
                 , success: function (data) {

                     window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Receipt_Refund_Id + '&save=1');
                 }
                });
            },

            //设置
            Set: function () {

            },
            //编辑
            Edit: function () {
                var vm = this;
                PageCommon.Clickbtn(vm, 'Edit');
            },
            //执行
            Submit: function () {
                var vm = this;
                PageCommon.SubmitForm({
                    url: "Execution"
                 , param: { receiptRefund: vmReceiptRefund.F_Receipt_Refund },
                    success: function (data) {
                        PageCommon.Clickbtn(vm, 'Submit');
                    }
                });
            },
            //返回列表画面
            Back: function () {
                PageCommon.BackFormMessge('List');
            }
        }
    });
