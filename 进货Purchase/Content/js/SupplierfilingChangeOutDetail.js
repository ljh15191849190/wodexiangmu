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
var NewSupplierfilingChange = new Vue({
    el: '#apps',
    data: {
        islistedite: false,
        isdelete_img: false,
        isApproval: false,
        formData: '',
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        Old_file_model_list: [{
            //Base64_Imgage: ''
        }],
        Supplier: {
            B_Supplier_Payway_List: [{}],
            B_Supplier_Bank_List: [{}],
            Delete_File_Model_List: [],
        },
        B_Supplier_Alter_Apply: {
            //供应商变更id
            Alter_Apply_Id: "",
            //供应商变更历史id
            Alter_History_Id: "",
            //供应商类型
            Is_Purchase: '1',//统购0 外购1
            //供应商id
            Supplier_Id: "",
            //供应商名称
            Supplier_Name: "",
            //供应商查询代码
            Query_Code: "",
            //父供应商名称
            Parent_Supplier_Id: null,
            //其他抬头
            Other_Name: "",
            //供应商网址
            Supplier_Website: "",
            //备注
            Remark: "",
            //总余额
            All_Balance: "0",
            //预付款
            Advance_Payment: "0",
            //贷款余额
            Goods_Payment_Balance: "0",
            //地址
            Supplier_Address: '',
            //详细地址
            Detail_Address: '',
            //地址编码集合
            Address_Code_Gather: '',
            //地址集合
            Address_Gather: '',
            B_Supplier_Payway_Alter_Apply_List: [{
                //结算方式
                Payway: '02',
                //日结天数
                Pay_Day_Count: '',
                //月结月数
                Pay_Month_Count: '',
                //分段日
                Subsrction_Day: '',
                //超期日
                Extended_Day: ''
            }],
            B_Supplier_Bank_Alter_Apply_List: [{
                //开户银行
                Bank: '',
                //银行账号
                Bank_Account: '',
                //供应商税号
                Supplier_Tax_Number: ''
            }],
            Delete_File_Model_List: [],
        },
        addressCommon: {
            //收件人省份
            province: ' ',
            //收件人城市
            city: ' ',
            //收件人区/县
            district: ' ',
            Address: '',
            //收件人详细地址
            DetailAddress: '',
            //坐标
            point_lng: '',
            point_lat: '',
            //地址集合
            Address_Gather: ''
        },
        oldAddressCommon: {},
        //结算方式
        PaywayDictionaryKey: "PAY_WAY",
        //是否显示日结天数
        Day_Count: true,
        //是否显示月结天数
        Month_Count: true,
        //是否只读
        readonly: false,
        //是否遮罩
        isshade_bg: false,
        //是否显示金额框的加减
        money: true,
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
    },
    mounted: function () {
        var that = this;
        that.isdelete_img = true;
        if (RequestValue.sourcelist == 1) {
            that.islistedite = true;
        }
        if (RequestValue.sourcetype == 1) {
            that.isApproval = true;
        }
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $('.drag_2').arrangeable({
            dragSelector: '.space'
        });
        $('.drag_3').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
        });
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
                    that.addressCommon.Address = data.SupplierNew.Address_Gather;
                    that.addressCommon.DetailAddress = data.SupplierNew.Detail_Address;
                    var addressArr = data.SupplierNew.Address_Code_Gather.split('-');
                    that.addressCommon.province = addressArr[0];
                    that.addressCommon.city = addressArr[1];
                    that.addressCommon.district = addressArr[2];
                    //判断状态
                    PageCommon.EditStatus({
                        vm: that,
                        approvalstatus: data.Approval_Status
                    });
                    if (that.isApproval) {
                        that.Supplier = data.Supplier;
                        that.oldAddressCommon = {
                            Address: data.Supplier.Address_Gather,
                            DetailAddress: data.Supplier.Detail_Address
                        }
                    }
                    that.B_Supplier_Alter_Apply = data.SupplierNew;
                    that.File_Model_List = data.SupplierNew.File_Model_List;
                    if (that.islistedite = true) {
                        that.Old_file_model_list = data.Supplier.File_Model_List;
                    }
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
                        that.btnBack = true;
                        that.btnSave = false;
                    }
                    //if (that.B_Supplier_Alter_Apply.B_Supplier_Payway_List[0].Payway == '01') {
                    //    that.Day_Count = true;
                    //    that.Month_Count = false;
                    //} else if (that.B_Supplier_Alter_Apply.B_Supplier_Payway_List[0].Payway == '02') {
                    //    that.Month_Count = true;
                    //    that.Day_Count = false;
                    //}
                }
            });
        } else {
            that.Month_Count = true;
            that.Day_Count = false;
        }
    },
    methods: {
        backfd: function (fd, deletedata) {
            var that = this;
            if (deletedata) {
                that.B_Supplier_Alter_Apply.Delete_File_Model_List = deletedata;
            }
            that.formData = fd;
        },
        //查询代码
        onchange: function (val) {
            this.B_Supplier_Alter_Apply.Query_Code = val;
        },
        //结算方式返回函数
        ChangePayway: function (val) {
            var that = this;
            if (val.id == '01') {
                that.Day_Count = true;
                that.Month_Count = false;
            } else if (val.id == '02') {
                that.Month_Count = true;
                that.Day_Count = false;
            } else {
                that.Month_Count = true;
                that.Day_Count = true;
            }
        },
        //保存
        Save: function () {
            this.aaaaaa = false;
            $(".down_tab").find("i").removeClass('rotate');
            $(".down_tab").parent().next().show();
            $(".down_tab").parent().removeClass("boder");
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var vm = this;
            vm.ConfirmSave();

        },
        ConfirmSave: function () {
            var vm = this;
            var addressArr = vm.addressCommon.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            vm.B_Supplier_Alter_Apply.Supplier_Address = address + vm.addressCommon.DetailAddress;
            vm.B_Supplier_Alter_Apply.Detail_Address = vm.addressCommon.DetailAddress;
            vm.B_Supplier_Alter_Apply.Address_Code_Gather = vm.addressCommon.province + '-' + vm.addressCommon.city + '-' + vm.addressCommon.district;
            vm.B_Supplier_Alter_Apply.Address_Gather = vm.addressCommon.Address;
            vm.formData.delete('supplierAlter');
            var data = JSON.stringify(vm.B_Supplier_Alter_Apply);
            vm.formData.append('supplierAlter', data);
            PageCommon.SubmitForm({
                url: "SaveSupplierAlter",
                param: vm.formData,
                type: '2',
                //, param: { supplier: vm.B_Supplier }
                success: function (data) {
                    //保存后根据返回值加载页面
                    var relevantnumber = data.Result_Model.Alter_Apply_Id;
                    window.location.href = PageCommon.SetUrlParameter("OutDetail", "relevantnumber=" + relevantnumber + '&save=1&sourcelist=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改                   
                }
            });
        },
        Edit: function () {
            var vm = this;
            //点击编辑按钮
            PageCommon.Clickbtn(vm, 'Edit');
            vm.isdelete_img = true;
            vm.isedittable = true;
        },
        //提交
        Submit: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "SubmitSupplierAlter",
                param: { supplierAlterApply: vm.B_Supplier_Alter_Apply },
                success: function (data) {
                    //点击提交按钮
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //审核
        Approval: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "ApprovalSupplierAlter",
                param: { supplierAlterApply: vm.B_Supplier_Alter_Apply }
            });
        },
        //审批意见
        ApprovalOpinion: function () {
            //PageCommon.ModalOpen({
            //    id: "SupplierInfo",
            //    title: '供应商资料',
            //    width: "900px",
            //    height: "600px",
            //    btn: [],
            //    url: '/Purchase/PurchaseSupplierSearch/SupplierInfo',
            //    callBack: function (iframeId) {
            //        PageCommon.ChildrenFrames(iframeId).vmImport.Import();
            //    }
            //})
        },
        //设置
        Set: function () {
            //$.ajax({
            //    url: "/SystemSet/SystemNotice/SeeDetail",
            //    data: {},
            //    type: "post",
            //    dataType: "json",
            //    //async:false,
            //    success: function (data) {

            //    }
            //});
            //PageCommon.Reload();
        },
        //供应商返回函数
        TemplateSelection: function (data) {
            var vm = this;
            if (data) {
                vm.B_Supplier_Alter_Apply.Supplier_Id = data.Supplier_Id;
                if (!vm.islistedite) {
                    PageCommon.GetFormData({
                        url: "ChackSeach",
                        param: { keyValue: vm.B_Supplier_Alter_Apply.Supplier_Id },
                        success: function (data) {
                            vm.B_Supplier_Alter_Apply = data;
                            vm.B_Supplier_Alter_Apply.Alter_Apply_Id = "";
                            vm.B_Supplier_Alter_Apply.B_Supplier_Payway_Alter_Apply_List = data.B_Supplier_Payway_List;
                            vm.B_Supplier_Alter_Apply.B_Supplier_Bank_Alter_Apply_List = data.B_Supplier_Bank_List;
                            vm.addressCommon.Address = data.Address_Gather;
                            vm.addressCommon.DetailAddress = data.Detail_Address;
                            var addressArr = data.Address_Code_Gather.split('-');
                            vm.addressCommon.province = addressArr[0];
                            vm.addressCommon.city = addressArr[1];
                            vm.addressCommon.district = addressArr[2];
                            vm.Old_file_model_list = data.File_Model_List;
                        }
                    });
                }
            }else {
                vm.B_Supplier_Alter_Apply = {
                    B_Supplier_Payway_Alter_Apply_List: [{}],
                    B_Supplier_Bank_Alter_Apply_List: [{}],
                    Delete_File_Model_List: [],
                };
                vm.addressCommon =  {
                    //收件人省份
                    province: ' ',
                    //收件人城市
                    city: ' ',
                    //收件人区/县
                    district: ' ',
                    Address: '',
                    //收件人详细地址
                    DetailAddress: '',
                    //坐标
                    point_lng: '',
                    point_lat: '',
                    //地址集合
                    Address_Gather: ''
                }
                vm.Old_file_model_list = [{}];
            }
           
        },
        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge("OutList", vm);
        }
    }
});