var searchData = {};
var SupplierContacter = new Vue({
    el: '#app',
    data: {
        B_Supplier: {
            B_Supplier_Contacter_List: []
        },
        //表头查询条件
        columContacterHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "Purchase",
            List_Id: ''
        },
        isedit: false
    },
    mounted: function () {
        this.B_Supplier = parent.SupplierInfo.SupplierData;
    },
    methods: {
        //行初始化事件
        columrenderContacter: function (Field_Name, value, type, rowData, rowSetting) {
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