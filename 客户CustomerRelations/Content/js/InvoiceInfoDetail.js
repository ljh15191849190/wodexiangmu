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
var Invoice_vue = new Vue({
    el: '#apps',
    data: {
        C_Customer_Invoice_Apply: {
            //客户名称
            Customer_Id: '',

            //开票信息
            Customer_Invoice: {
                //申请日期
                Create_Time: '',
                //任务人
                Employee_Id: '',
                //开票信息
                C_Invoice_List: '',
                //开票名称
                Invoice_Name: '',
                //税号
                Taxpayer_Id: '',
                //开票电话
                Tel: '',
                //开票银行
                Bank: '',
                //账号
                Account: '',
                //申请理由
                Apply_Reason: ''

            }
        },
        //开票地址
        BillingCommon: {
            //开票地址省份
            province: ' ',
            //开票地址城市
            city: ' ',
            //开票地址区/县
            district: ' ',
            Address: '',
            //开票地址详细地址
            DetailAddress: '',
            point_lng: '',
            point_lat: ''
        },
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],

        //任务人查询显示
        Employeeresult: ["Employee_Id", "Name"],
        EmployeFiledSearch: ["Employee_Id", "Name"],
        EmployeInputField: ["Employee_Id", "Name"],
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
        //是否编辑
        IsEdit: 0

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
                    Invoice_vue.C_Customer_Invoice_Apply = data;
                    var addressArr = data.Customer_Invoice.Address_Code_Gather.split('-');
                    vm.BillingCommon = {
                        Address: data.Customer_Invoice.Address_Gather,
                        DetailAddress: data.Customer_Invoice.Detail_Address,
                        province: addressArr[0],
                        city: addressArr[1],
                        district: addressArr[2]
                    }
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        approvalstatus: data.Approval_Status,

                    });
                    //点击保存
                    PageCommon.Clickbtn(vm, 'Save');
                    //如果是保存后加载的页面表格设为不可修改
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
        //审核意见
        mApproval: function () { },
        //审核
        mReviewed: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Approval"
             , param: { customerInvoice: Invoice_vue.C_Customer_Invoice_Apply },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("List",vm);
                }
            });
            
        },
        //客户选择事件
        TemplateCustomer: function (customerdata) {
            if (customerdata) {
                if (Invoice_vue.IsEdit > 0) {
                    PageCommon.GetFormData({
                        url: "EditSeach",
                        param: { keyValue: ["", customerdata.Customer_Id] }
                      , success: function (data) {

                          if (!data.Customer_Invoice) {
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Create_Time = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Employee_Id = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.C_Invoice_List = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Invoice_Name = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Taxpayer_Id = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Tel = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Bank = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Account = '';
                              Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Apply_Reason = '';

                          } else {

                              Invoice_vue.C_Customer_Invoice_Apply = data;

                              Invoice_vue.BillingCommon.Address = data.Customer_Invoice.Address_Gather;
                              Invoice_vue.BillingCommon.DetailAddress = data.Customer_Invoice.Detail_Address;
                              var addressArr = data.Customer_Invoice.Address_Code_Gather.split('-');
                              Invoice_vue.BillingCommon.province = addressArr[0];
                              Invoice_vue.BillingCommon.city = addressArr[1];
                              Invoice_vue.BillingCommon.district = addressArr[2];

                              if (data.Approval_Status == "03" || data.Approval_Status == "02") {
                                  PageCommon.ModalAlert('该客户已有正式或待审核开票信息', 'warning', function () {
                                      Invoice_vue.readonly = true;
                                      Invoice_vue.isshade_bg = true;

                                      Invoice_vue.btnSave = false;

                                  });

                              } else {
                                  Invoice_vue.readonly = false;
                                  Invoice_vue.isshade_bg = false;

                                  Invoice_vue.btnSave = true;
                              }




                              //if (data.Approval_Status == "03") {
                              //    PageCommon.ModalAlert('该客户已有正式开票信息', 'warning', function () {
                              //        location.reload();
                              //    })
                              //} else {
                              //    //Invoice_vue.C_Customer_Invoice_Apply = data.Customer_Invoice;
                              //    Invoice_vue.C_Customer_Invoice_Apply = data;
                              //    Invoice_vue.BillingCommon.Address = data.Customer_Invoice.Address;
                              //    Invoice_vue.BillingCommon.DetailAddress = data.Customer_Invoice.Detail_Address;
                              //}

                          }



                          //Invoice_vue.Approval_Status = newInvoiceList.Approval_Status;
                          //console.log(Invoice_vue.Approval_Status)
                          //vm.isshade_bg = true;
                          //console.log(vm.isshade_bg)
                          ////判断状态
                          //PageCommon.EditStatus({
                          //    vm: vm,
                          //    approvalstatus: data.Approval_Status,

                          //});
                          ////点击保存
                          //PageCommon.Clickbtn(vm, 'Save');
                          //如果是保存后加载的页面表格设为不可修改
                          //if (save) {
                          //    vm.isedittable = false;
                          //}


                      }
                    });

                }
                Invoice_vue.IsEdit = 1;
            } else {
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Create_Time = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Employee_Id = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.C_Invoice_List = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Invoice_Name = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Taxpayer_Id = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Tel = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Bank = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Account = '';
                Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Apply_Reason = '';

                Invoice_vue.BillingCommon.Address = '';
                Invoice_vue.BillingCommon.DetailAddress = '';
                Invoice_vue.BillingCommon.province = '';
                Invoice_vue.BillingCommon.city = ' ';
                Invoice_vue.BillingCommon.district = ' ';
            }
        },
        //保存菜单画面数据
        Save: function () {

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }


            //审核状态判断
            //if (Invoice_vue.C_Customer.C_Invoice_List[0].Approval_Status != '01') {
            //    PageCommon.ShowMessageArrayRight("I3007", new Array("已审核不可保存"));
            //    $("#btnSave").attr("disabled", true);
            //    return;
            //}



            //Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Address = Invoice_vue.BillingCommon.Address;
            //Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Detail_Address = Invoice_vue.BillingCommon.DetailAddress;
            //Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Address_Code_Gather = Invoice_vue.BillingCommon.province + '-' + Invoice_vue.BillingCommon.city + '-' + Invoice_vue.BillingCommon.district;
            //Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Address_Gather = Invoice_vue.BillingCommon.Address + Invoice_vue.BillingCommon.DetailAddress;


            var addressArr = Invoice_vue.BillingCommon.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Address = address + Invoice_vue.BillingCommon.DetailAddress;
            Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Detail_Address = Invoice_vue.BillingCommon.DetailAddress;
            Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Address_Code_Gather = Invoice_vue.BillingCommon.province + '-' + Invoice_vue.BillingCommon.city + '-' + Invoice_vue.BillingCommon.district;
            Invoice_vue.C_Customer_Invoice_Apply.Customer_Invoice.Address_Gather = Invoice_vue.BillingCommon.Address;

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { customerInvoice: Invoice_vue.C_Customer_Invoice_Apply }
             , success: function (data) {

                 window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Apply_Bill_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
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
             , param: { customerInvoice: Invoice_vue.C_Customer_Invoice_Apply },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List',vm);
        }
    }
});