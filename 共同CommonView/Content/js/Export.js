//用户主键
var tableName = PageCommon.Request("tableName");
var formID = PageCommon.Request("formID");
var Menu_Id = PageCommon.Request("menu_Id");
var List_Id = PageCommon.Request("list_Id");
var systemKey = PageCommon.Request("systemKey");
// var searchData = {};
var vmExport = new Vue({
    el: '#app',
    data: {
        parameter:
            {
                System_Key: "",
                Export_Type: "01",
                Table_Name: "",
                seachModel: {}
            }
    },
    mounted: function () {
        this.parameter.Table_Name = tableName;
        this.parameter.System_Key = systemKey;
    },
    methods: {
        //导出
        Export: function (searchModel) {
            var bank = $('.Emportchange').attr('data-id');
            var type = $('.Emportchange').attr('data-value');
            bank.checked = "checked";
            vmExport.parameter.Export_Type = type;
            vmExport.parameter.seachModel = searchModel;
            var param = JSON.stringify(vmExport.parameter);
            $("input[name='parameter']").val(param);
            $("#ExportDataForm").submit();
        }
    }
})
