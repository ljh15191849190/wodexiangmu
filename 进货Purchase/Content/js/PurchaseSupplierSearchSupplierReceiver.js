var searchData = {};
var SupplierReceiver = new Vue({
    el: '#app',
    data: {
        B_Supplier: {
            B_Supplier_Receiver_List: []
        },
        //表头查询条件
        columReceiverHeaderSeach: {
            Menu_Id: "M000009",
            System_Key: "Purchase",
            List_Id: ''
        },
        isedit: false
    },
    mounted: function () {
        this.B_Supplier = parent.SupplierInfo.SupplierData;
    },
    methods: {
        columrenderReceiver: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Default_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }

            if (Field_Name === "Is_Default") {
                return '1';
            }
        },
    }
});