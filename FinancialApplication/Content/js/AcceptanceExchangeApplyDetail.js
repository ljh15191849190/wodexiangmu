
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
    var NewAcceptBillApply_vue = new Vue({
        el: '#apps',
        data: {
            CustomerObj: false,
            SupplierObj: false,
            isdelete_img: false,
            formData: '',
            File_Model_List: [{
                //Base64_Imgage: ''
            }],
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
                Menu_Id: "M000013",
                System_Key: "FinancialApplication"
            },
            //单据信息
            FA_Accept_Bill_Apply: {
                //单号
                Accept_Bill_Apply_Id: "",
                //承兑归属任务人
                Accept_Bill_Belong_Employee_Id: "",
                //部门
                Department_Id: "",
                //审核状态
                Approval_Status: "",
                //承兑申请对象
                Object_Type: "",
                //对象名称
                Object_Id: "",
                //备注
                Remark: "",
                //是否贴现
                Is_Discount: "",
                //贴现出票银行
                Bank_Id: "",
                //不可贴现出票银行
                No_Discount_Bank: "",
                //原约定付款方式
                Old_Appoint_Pay_Way: "",
                //承兑方式
                Accept_Way: "",
                //汇票号码
                Accept_Bill_Number: "",
                //汇票金额
                Accept_Bill_Account: "",
                //已背书次数
                Endorsement_Count: "",
                //贴息起计日期
                Discount_Start_Count_Date: "",
                //承兑到期日期
                Accept_End_Date: "",
                //背书公司
                Company_Id: "",
                //客户承担费用
                Customer_Undertake_Charge: "",
                //公司预估承担费用
                Company_Undertake_Charge: "",
                //费用承担对象
                Charge_Undertake_Object: "",
                //贴息费用
                Discount_Charge: "",
                Delete_File_Model_List: [],
            },
            Object_Id_Customer: "",
            Object_Id_employee: "",
            Object_Id_Supplier: "",
            //客户查询条件
            customer: {
                Menuresult: ["Customer_Id", "Customer_Name"],
                filedSearch: ["Customer_Id", "Customer_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Customer_Id", "Customer_Name"]
            },
            //供应商查询条件
            supplier: {
                Menuresult: ["Supplier_Id", "Supplier_Name"],
                filedSearch: ["Supplier_Id", "Supplier_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Supplier_Id", "Supplier_Name"]
            },
            //任务人查询条件
            employee: {
                Menuresult: ["Employee_Id", "Name"],
                filedSearch: ["Employee_Id", "Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Employee_Id", "Name"]
            },
            //部门条件
            department: {
                Menuresult: ["Department_Id", "Department_Name"],
                filedSearch: ["Department_Id", "Department_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Department_Id", "Department_Name"]
            },
            //银行查询条件
            bank: {
                Menuresult: ["Bank_Id", "Bank_Name"],
                filedSearch: ["Bank_Id", "Bank_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Bank_Id", "Bank_Name"]
            },
            //公司条件
            company: {
                Menuresult: ["Company_Id", "Company_Name"],
                filedSearch: ["Company_Id", "Company_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Company_Id", "Company_Name"]
            },
            //不贴现银行编辑
            noisedite: false,
            //贴现银行编辑
            isedite: true
        },
        mounted: function () {
            var that = this;
            that.isdelete_img = true;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber },
                    success: function (data) {
                        that.FA_Accept_Bill_Apply = data;
                       
                        that.File_Model_List = data.File_Model_List;
                        //判断状态
                        PageCommon.EditStatus({
                            vm: that,
                            approvalstatus: data.Approval_Status
                        });
                        //点击保存
                        PageCommon.Clickbtn(that, 'Save');
                        //如果是保存后加载的页面表格设为不可修改
                        if (save) {
                            //保存后图片不可删除和上传
                            that.isdelete_img = false;
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
            ObjectType: function (val) {
                var that = this;
                if (val.id == "01") {
                    that.CustomerObj = true;
                    that.SupplierObj = false;

                }
                else if (val.id == "02") {
                    that.CustomerObj = false;
                    that.SupplierObj = true;
                }
                setTimeout(function () {
                    if (val.id == "01") {
                        that.Object_Id_Customer = that.FA_Accept_Bill_Apply.Object_Id
                    } else if (val.id == "02") {
                        that.Object_Id_Supplier = that.FA_Accept_Bill_Apply.Object_Id
                    }
                })
            },
            TemplateSelection: function (data) {
                var that = this;
                data.text == "是" ? that.isedite = true : that.isedite = false;
                data.text == "否" ? that.noisedite = true : that.noisedite = false;
            },
            backfd: function (fd, deletedata) {
                var that = this;
                if (deletedata) {
                    that.FA_Accept_Bill_Apply.Delete_File_Model_List = deletedata;
                }
                that.formData = fd;
            },
            //编辑
            Edit: function () {
                var that = this;
                that.isdelete_img = true;
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
                if (that.FA_Accept_Bill_Apply.Object_Type == "01") {
                    that.FA_Accept_Bill_Apply.Object_Id = that.Object_Id_Customer;
                } else if (that.FA_Accept_Bill_Apply.Object_Type == "02") {
                    that.FA_Accept_Bill_Apply.Object_Id = that.Object_Id_Supplier;
                }
                that.formData.delete('acceptBillApply');
                var data = JSON.stringify(that.FA_Accept_Bill_Apply);
                that.formData.append('acceptBillApply', data);
                PageCommon.SubmitForm({
                    url: "Save",
                    param: that.formData,
                    type: '2',
                    success: function (data) {
                             //保存后根据返回值加载页面
                             var relevantnumber = data.Result_Model.Accept_Bill_Apply_Id;
                             window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                    }
                });
            },
            //提交
            Submit: function () {
                var that = this;
                PageCommon.SubmitForm({
                    url: "Submit",
                    param: { acceptBillApply: that.FA_Accept_Bill_Apply },
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
                    param: { acceptBillApply: that.FA_Accept_Bill_Apply },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + that.FA_Accept_Bill_Apply.Accept_Bill_Apply_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                    }
                });
            },
            //付款单位回调
            Template_selection: function (data) {
                var that = this;
                if (data) {
                    that.FA_Accept_Bill_Apply.Accept_Bill_Belong_Employee_Id = data.Employee_Id;
                    that.FA_Accept_Bill_Apply.Department_Id = data.Department_Id;
                } else {
                    that.FA_Accept_Bill_Apply.Accept_Bill_Belong_Employee_Id = '';
                    that.FA_Accept_Bill_Apply.Department_Id = '';
                }
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
