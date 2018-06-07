//联系人信息主键
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
var Register_vue = new Vue({
    el: '#app',
    data: {
        isdelete_img: true,
        formData: '',
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        InvoiceNumberRegister: {
            Invoice_Number: "",
            Invoice_Date: '',
            Remark: "",
            Delete_File_Model_List: []
        },
        //是否只读
        readonly: false,
        //是否遮罩
        isshade_bg: false,
    },
    mounted: function () {
        var vm = this;
        
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    vm.File_Model_List = data.File_Model_List;
                    data.Invoice_Date = moment(new Date().getTime()).format("YYYY-MM-DD");
                    Register_vue.InvoiceNumberRegister = data;
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
        //保存系统画面数据
        Save: function (selectRow) {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //vm.InvoiceNumberRegister = $.extend(vm.InvoiceNumberRegister, selectRow);
            selectRow = $.extend(selectRow, vm.InvoiceNumberRegister);
            vm.formData.delete('saleInvoice');
            var data = JSON.stringify(selectRow);
            vm.formData.append('saleInvoice', data);
            PageCommon.SubmitForm({
                url: "InvoiceRegistration",
                param: vm.formData,
                type: '2',
                //param: { saleInvoice: selectRow },
                success: function (data) {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("SaleInvoiceRegisterList");


                }
            });

        },
        backfd: function (fd, deletedata) {
            var vm = this;
            if (deletedata) {
                vm.InvoiceNumberRegister.Delete_File_Model_List = deletedata;
            }
            vm.formData = fd;
        },

    }
})