
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
    var NewAdjustAccountApplyList_vue = new Vue({
        el: '#apps',
        data: {
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
            //单据信息
            FA_Cus_Adjust_Account_Apply: {
                //单号
                Cus_Adjust_Account_Apply_Id: "",
                //审核状态
                Approval_Status: "",
                //客户
                Customer_Id: "",
                //任务人 
                Employee_Id: "",
                //部门
                Department_Id: "",
                //调账原因
                Adjust_Account_Reason: "",
                //货款
                Goods_Pay: "",
                //定金
                Earnest: "",
                //运费
                Freight: "",
                //其它
                Other: "",
                //调账总额
                Adjust_Account_Sum: "",
            },
            //公司条件
            customer: {
                Menuresult: ["Customer_Id", "Customer_Name"],
                filedSearch: ["Customer_Id", "Customer_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Customer_Id", "Customer_Name"]
            },
            customerinfo: {
                Goods_Pay_Sum: 0,
                Freight_Balance: 0,
                Earnest_Balance: 0,
                Other: 0,
            }
        },
        mounted: function () {
            var that = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber },
                    success: function (data) {
                        that.FA_Cus_Adjust_Account_Apply = data;
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
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

            });
        },
        methods: {
            //客户回调
            Template_selection: function (data) {
                var that = this;
                if (data) {
                    that.customerinfo = data;
                    that.FA_Cus_Adjust_Account_Apply.Employee_Id = data.Employee_Id;
                    that.FA_Cus_Adjust_Account_Apply.Department_Id = data.Department_Id;
                } else {
                    that.customerinfo.Goods_Pay_Sum =0;
                    that.customerinfo.Freight_Balance = 0;
                    that.customerinfo.Earnest_Balance =0;
                    that.customerinfo.Other = 0;
                    that.FA_Cus_Adjust_Account_Apply.Employee_Id = '';
                    that.FA_Cus_Adjust_Account_Apply.Department_Id = '';
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
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                that.FA_Cus_Adjust_Account_Apply.Adjust_Account_Sum = parseFloat(that.FA_Cus_Adjust_Account_Apply.Goods_Pay) + parseFloat(that.FA_Cus_Adjust_Account_Apply.Earnest) + parseFloat(that.FA_Cus_Adjust_Account_Apply.Freight) + parseFloat(that.FA_Cus_Adjust_Account_Apply.Other)
                PageCommon.SubmitForm({
                    url: "Save"
                         , param: { cusAdjustAccountApply: that.FA_Cus_Adjust_Account_Apply }
                         , success: function (data) {
                             //保存后根据返回值加载页面
                             var relevantnumber = data.Result_Model.Cus_Adjust_Account_Apply_Id;
                             window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                         }
                });
            },
            //提交
            Submit: function () {
                var that = this;
                that.FA_Cus_Adjust_Account_Apply.Adjust_Account_Sum = parseFloat(that.FA_Cus_Adjust_Account_Apply.Goods_Pay) + parseFloat(that.FA_Cus_Adjust_Account_Apply.Earnest) + parseFloat(that.FA_Cus_Adjust_Account_Apply.Freight) + parseFloat(that.FA_Cus_Adjust_Account_Apply.Other)
                PageCommon.SubmitForm({
                    url: "Submit",
                    param: { cusAdjustAccountApply: that.FA_Cus_Adjust_Account_Apply },
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
                    param: { cusAdjustAccountApply: that.FA_Cus_Adjust_Account_Apply },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + that.FA_Cus_Adjust_Account_Apply.Cus_Adjust_Account_Apply_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                    }
                });
            },
            //审批意见
            ApprovalOpinion: function () {

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
