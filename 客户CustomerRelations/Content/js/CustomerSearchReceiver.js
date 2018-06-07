 
    var Receiver = new Vue({
        el: '#app',
        data: {
            C_Customer: {
                C_Receiver_List: []
            },
            //表头查询条件
            columReceiverHeaderSeach: {
                Menu_Id: "M000002",
                System_Key: "CustomerRelations",
                List_Id:''
            },
            isedit:false
        },
        mounted: function () {
            this.C_Customer = parent.CustomerInfo.CustomerData;
        },
        methods: {
            columrenderReceiver: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Is_Default_Receiver_Name") {
                    var html = "<span class=\"label  label-default\">否</span>";
                    if (value == "") {
                        return html;
                    } else {
                        return false;
                    }
                }

                if (Field_Name === "Is_Default_Receiver") {
                    return '1';
                }
            },
        }
    });