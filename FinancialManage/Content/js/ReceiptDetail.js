
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
    var vmReceipt= new Vue({
        el: '#apps',
        data: {
            //客户和承兑汇票联动
            linkage: "",
            F_Receipt: {
                //客户
                Customer_Id:'',
                //承兑汇票号
                Accept_Bill_Id:'',
                //任务人
                Employee_Id: '',
                Employee_Name: '',
                //任务人部门
                Department_Id:'',
                //到账日期
                Arrive_Account_Date:'',
                //是否含税
                Is_Include_Tax:'1',
                //备注
                Remark: '',
                //收款方式
                Receipt_Way: '',
                //退款总额
                Receipt_Sum:'',
                //货款
                Goods_Pay: 0,
                //定金
                Earnest:0,
                //运费
                Freight: 0,
                //其他
                Other: 0,
                
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
            isEdit: false,
            //承兑汇票金额
            BillData: '',
            //货款总额
            Goods_Pay_Sum: '',
            //运费余额
            Freight_Balance: '',
            //定金余额
            Earnest_Balance: '',
            //其他
            Other: '',
            //承兑汇票验证
            BillCheck:false

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
                        vmReceipt.F_Receipt = data;
                        //vmReceipt.linkage.Customer_Id = data.Customer_Id;
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


        },
        methods: {
            //客户选择
            TemplateSelectionCustomer: function (data) {
                if (data) {
                    vmReceipt.linkage = data.Customer_Id;
                    vmReceipt.F_Receipt.Employee_Id = data.Employee_Id;
                    vmReceipt.F_Receipt.Employee_Name = data.Employee_Name;
                    vmReceipt.F_Receipt.Department_Id = data.Department_Id;
                    vmReceipt.Goods_Pay_Sum = data.Goods_Pay_Sum;
                    vmReceipt.Freight_Balance = data.Freight_Balance;
                    vmReceipt.Earnest_Balance = data.Earnest_Balance;
                    vmReceipt.Other = data.Other;
                } else {
                    vmReceipt.linkage = '';
                    vmReceipt.F_Receipt.Employee_Id = '';
                    vmReceipt.F_Receipt.Employee_Name = '';
                    vmReceipt.F_Receipt.Department_Id = '';
                    vmReceipt.Goods_Pay_Sum = '';
                    vmReceipt.Freight_Balance = '';
                    vmReceipt.Earnest_Balance = '';
                    vmReceipt.Other = '';
                }
            },
            //承兑汇票选择
            TemplateSelectionBill: function (data) {
                if (data) {
                    vmReceipt.BillData = data.Accept_Bill_Account;
                    vmReceipt.F_Receipt.Receipt_Sum = data.Accept_Bill_Account;
                } else {
                    vmReceipt.BillData = '';
                    vmReceipt.F_Receipt.Receipt_Sum = '';
                }
            },
            //收款方式
            PayWay: function (val) {
                if (val.id == "03") {
                    vmReceipt.isEdit = true;
                    vmReceipt.F_Receipt.Receipt_Sum = vmReceipt.BillData;
                    $(".Accept").show();
                    vmReceipt.BillCheck = true;
                } else {
                    vmReceipt.isEdit = false;
                    $(".Accept").hide();
                    vmReceipt.BillCheck = false;
                    vmReceipt.F_Receipt.Receipt_Sum = 0;
                    vmReceipt.F_Receipt.Goods_Pay = 0;
                    vmReceipt.F_Receipt.Earnest = 0;
                    vmReceipt.F_Receipt.Freight = 0;
                    vmReceipt.F_Receipt.Other = 0;
                }
            },
            //保存菜单画面数据
            Save: function () {

                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                var sum = parseInt(vmReceipt.F_Receipt.Goods_Pay) + parseInt(vmReceipt.F_Receipt.Earnest )+ parseInt(vmReceipt.F_Receipt.Freight) + parseInt(vmReceipt.F_Receipt.Other);
                
                
                    if (sum >vmReceipt.F_Receipt.Receipt_Sum) {
                        PageCommon.ShowMessageArrayRight("E1023", new Array("货款、定金、运费之和", "退款总额"));
                        return;
                    }
                    if (sum < vmReceipt.F_Receipt.Receipt_Sum) {
                        PageCommon.ShowMessageArrayRight("E1024", new Array("货款、定金、运费之和", "退款总额"));
                        return;
                    }
               
                
                //提交数据到后台
                PageCommon.SubmitForm({
                    url: "SaveReceipt"
                 , param: { receipt: vmReceipt.F_Receipt }
                 , success: function (data) {
                     
                     window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Receipt_Id + '&save=1');
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
                 , param: { receipt: vmReceipt.F_Receipt },
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
