
    var Contacter = new Vue({
        el: '#app',
        data: {
            C_Customer:{
                C_Contacts_List: []
            },
            //表头查询条件
            columContacterHeaderSeach: {
                Menu_Id: "M000001",
                System_Key: "CustomerRelations",
                List_Id: ''
            },
            isedit:false
        },
        mounted: function () {
            this.C_Customer = parent.CustomerInfo.CustomerData;
        },
        methods: {
            //行初始化事件
            columrenderContacter: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Is_Default_Contacter_Name") {
                    var html = "<span class=\"label  label-default\">否</span>";
                    if (value == "") {
                        return html;
                    } else {
                        return false;
                    }
                }

                if (Field_Name === "Is_Default_Contacter") {
                    return '1';
                }
            },
        }
    });