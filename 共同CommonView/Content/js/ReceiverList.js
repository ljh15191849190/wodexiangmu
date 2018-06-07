var RequestValue = PageCommon.Request();
if (RequestValue.object_id) {
    var object_id = RequestValue.object_id;
}
if (RequestValue.receiver_type) {
    var receiver_type = RequestValue.receiver_type;
}
var vmReceiver = new Vue({
    el: '#app',
    data: {
        receivertype: receiver_type,
        receiver_Seach: {
            Customer_Receiver: {
                //姓名
                Name: '',
                //联系电话
                Telephone: '',
                //客户id
                Customer_Id: object_id,
                //手机
                Mobile_Phone: '',
                //传真
                Fax: '',
                //QQ
                Qq: '',
                //微信
                Wechat: '',
                //邮箱
                Email: '',
                //出生日期
                Birthday: '',
                //邮政编码
                Post_Code: '',
                //部门名称
                Department_Name: '',
                //职位
                Position: '',
                //是否默认
                Is_Default: '1',
                //地址
                Address: '',
                //备注
                Remark: '',
                //详细地址
                Detail_Address: '',
                //地址编码集合
                Address_Code_Gather: '',
                //地址集合
                Address_Gather: '',
            },
            Supplier_Receiver: {
                //姓名
                Name: '',
                //联系电话
                Telephone: '',
                //供应商id
                Supplier_Id: object_id,
                //手机
                Mobile_Phone: '',
                //传真
                Fax: '',
                //QQ
                Qq: '',
                //微信
                Wechat: '',
                //邮箱
                Email: '',
                //邮政编码
                Post_Code: '',
                //部门名称
                Department_Name: '',
                //是否默认
                Is_Default: '1',
                //地址
                Address: '',
                //详细地址
                Detail_Address: '',
                //地址编码集合
                Address_Code_Gather: '',
                //地址集合
                Address_Gather: '',
            },
            Customer_Send_Invoice: {
                //姓名
                Name: '',
                //联系电话
                Tel: '',
                //客户id
                Customer_Id: object_id,
                //手机
                Mobile_Phone: '',
                //邮政编码
                Post_Code: '',
                //是否默认
                Is_Default: '1',
                //寄票地址
                Send_Invoice_Address: '',
                //申请理由
                Apply_Reason: '',
                //备注
                Remark: '',
                //详细地址
                Detail_Address: '',
                //地址编码集合
                Address_Code_Gather: '',
                //地址集合
                Address_Gather: '',
            },
            Object_Id: object_id,
            Receiver_Type: receiver_type,
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
    },
    mounted: function () {
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $('.contact').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //保存菜单画面数据
        Save: function (parent_vm) {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var addressArr = vmReceiver.addressCommon.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            if (receiver_type == '0') {
                vmReceiver.receiver_Seach.Customer_Receiver.Address = address + vmReceiver.addressCommon.DetailAddress;
                vmReceiver.receiver_Seach.Customer_Receiver.Detail_Address = vmReceiver.addressCommon.DetailAddress;
                vmReceiver.receiver_Seach.Customer_Receiver.Address_Code_Gather = vmReceiver.addressCommon.province + '-' + vmReceiver.addressCommon.city + '-' + vmReceiver.addressCommon.district;
                vmReceiver.receiver_Seach.Customer_Receiver.Address_Gather = vmReceiver.addressCommon.Address;
            } else if (receiver_type == '1') {
                vmReceiver.receiver_Seach.Supplier_Receiver.Address = address + vmReceiver.addressCommon.DetailAddress;
                vmReceiver.receiver_Seach.Supplier_Receiver.Detail_Address = vmReceiver.addressCommon.DetailAddress;
                vmReceiver.receiver_Seach.Supplier_Receiver.Address_Code_Gather = vmReceiver.addressCommon.province + '-' + vmReceiver.addressCommon.city + '-' + vmReceiver.addressCommon.district;
                vmReceiver.receiver_Seach.Supplier_Receiver.Address_Gather = vmReceiver.addressCommon.Address;
            }
            else if (receiver_type == '2') {
                vmReceiver.receiver_Seach.Customer_Send_Invoice.Send_Invoice_Address = address + vmReceiver.addressCommon.DetailAddress;
                vmReceiver.receiver_Seach.Customer_Send_Invoice.Detail_Address = vmReceiver.addressCommon.DetailAddress;
                vmReceiver.receiver_Seach.Customer_Send_Invoice.Address_Code_Gather = vmReceiver.addressCommon.province + '-' + vmReceiver.addressCommon.city + '-' + vmReceiver.addressCommon.district;
                vmReceiver.receiver_Seach.Customer_Send_Invoice.Address_Gather = vmReceiver.addressCommon.Address;
            }
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "CreateReceiver"
             , param: { receiverSeach: vmReceiver.receiver_Seach }
             , success: function (data) {
                 console.log(data)
                 if (receiver_type == '0' || receiver_type == '2') {
                     PageCommon.CurrentWindow()[parent_vm].linkage = data.Result_Model;
                     PageCommon.CurrentWindow()[parent_vm].linkage = {
                         id: data.Result_Model.Customer_Id,
                         Detail_Number: data.Result_Model.Detail_Number
                     };
                 } else if (receiver_type == '1') {
                     PageCommon.CurrentWindow()[parent_vm].linkage = {
                         id: data.Result_Model.Supplier_Id,
                         Detail_Number: data.Result_Model.Detail_Number
                     };
                 }
                 PageCommon.ModalClose();
             }
            });
        },
    }
});
