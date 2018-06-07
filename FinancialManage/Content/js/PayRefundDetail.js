
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
    var vmPayRefund= new Vue({
        el: '#apps',
        data: {
            F_Pay_Refund: {
                //供应商
                Supplier_Id: '',
                Supplier_Name: '',
                //开户银行
                Bank:'',
                //银行账号
                Bank_Account: '',
                //供应商税号
                Supplier_Tax_Number: '',
                //单据编号
                Bill_Id:'',
                //付款退款类型
                Pay_Refund_Type: '01',
                //退款方式
                Return_Way: "",
                //入账日期
                Enter_Account_Date: '',
                //应退款金额
                Should_Return_Amount:'',
                //本次退款金额
                This_Refund_Amount: '',
                //备注
                Remark:'',
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
            isEdit:false,

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
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber }
                    , success: function (data) {

                        vmPayRefund.F_Pay_Refund = data;


                        //判断状态
                        PageCommon.EditStatus({
                            vm: vm,
                            approvalstatus: data.Approval_Status,

                        });
                        //点击保存
                        PageCommon.Clickbtn(vm, 'Save');


                    }
                });
            }

            $(".Bill").dblclick(function () {
                PageCommon.ModalOpen({
                            id: "PayRefundSearch",
                            title: '付款退款详细查询',
                            width: "900px",
                            height: "800px",
                            btn: ["添加"],
                            url: '/FinancialManage/PayRefund/PayRefundDetailSearch',
                            callBack: function (iframeId) {

                                var selectRow = PageCommon.ChildrenFrames(iframeId).vmPayRefundSearch.SelectRow();
                                PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();

                                if (selectRow.length == 0) {
                                    return;
                                }
                                vm.F_Pay_Refund.Supplier_Id = selectRow[0].Supplier_Id;
                                vm.F_Pay_Refund.Supplier_Name = selectRow[0].Supplier_Name;
                                vm.F_Pay_Refund.Bank = selectRow[0].Bank;
                                vm.F_Pay_Refund.Bank_Account = selectRow[0].Bank_Account;
                                vm.F_Pay_Refund.Supplier_Tax_Number = selectRow[0].Supplier_Tax_Number;
                                vm.F_Pay_Refund.Bill_Id = selectRow[0].Pay_Bill_Id;
                                vm.F_Pay_Refund.Return_Way = selectRow[0].Return_Way;
                                if (vm.F_Pay_Refund.Pay_Refund_Type == "02") {
                                    vm.isEdit = true;
                                } else {
                                    vm.isEdit = false;
                                    vm.F_Pay_Refund.Should_Return_Amount = 0;
                                    vm.F_Pay_Refund.This_Refund_Amount = "";
                                    vm.F_Pay_Refund.Return_Way = "";
                                }
                            }


                        })
            })
        },
        methods: {

            //付款退款类型
            PayRefundType: function (val) {

                if (val.id == "02") {
                    vmPayRefund.isEdit = true;
                } else {
                    vmPayRefund.isEdit = false;
                    vmPayRefund.F_Pay_Refund.Should_Return_Amount = 0;
                    vmPayRefund.F_Pay_Refund.This_Refund_Amount = "";
                    vmPayRefund.F_Pay_Refund.Return_Way = "";
                }
            },
            //审核意见
            mApproval: function () { },
            //审核
            mReviewed: function () {
                var vm = this;
                PageCommon.SubmitForm({
                    url: "Approval"
                 , param: { payRefund: vmPayRefund.F_Pay_Refund },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("List");
                    }
                });
            },

            //保存菜单画面数据
            Save: function () {

                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //提交数据到后台
                PageCommon.SubmitForm({
                    url: "SavePayRefund"
                 , param: { payRefund: vmPayRefund.F_Pay_Refund }
                 , success: function (data) {

                     window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Pay_Refund_Id + '&save=1');
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
            //提交
            Submit: function () {
                var vm = this;
                PageCommon.SubmitForm({
                    url: "Submit"
                 , param: { payRefund: vmPayRefund.F_Pay_Refund },
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
