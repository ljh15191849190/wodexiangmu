//用户主键
var tableName = PageCommon.Request("tableName");
var systemKey = PageCommon.Request("systemKey");
var searchData = {};
var vmImport = new Vue({
    el: '#app',
    data: {
        parameter:
            {
                System_Key: systemKey,
                Export_Type: "01",
                Table_Name: tableName
            },
    },
    methods: {
        //导入
        Import: function (vm) {
            $(".errorMessage").hide();
            var paramModel = JSON.stringify(vmImport.parameter);
            //文件上传
            PageCommon.Loading(true, "处理中...");
            $.ajaxFileUpload({
                url: 'ImportData',//后台请求地址
                type: 'post',//请求方式 当要提交自定义参数时，这个参数要设置成post
                secureuri: false,//是否启用安全提交，默认为false
                data: [{ "parameter": paramModel }],
                fileElementId: 'upload',// 需要上传的文件域的ID
                dataType: 'json',//服务器返回的数据类型  可以为xml,script,json,html。如果不填写，jQuery会自动判断。如果json返回的带pre,这里修改为json即可解决。
                success: function (data, status) {//提交成功后自动执行的处理函数，参数data就是服务器返回的数据。  

                    if (data.Message_Result_List && data.Message_Result_List.constructor == Array) {
                        var message = "";
                        if (data.Message_Result_List[0].Result == "0") {
                            top.parent.PageCommon.ShowMessageRight(data.Message_Result_List[0].Code);
                            if (vm.ImportResult) {
                                vm.ImportResult(data.Object_Model, data.Object_Model_List)
                            }
                        } else {
                            $.each(data.Message_Result_List, function (index, item) {
                                var text = "";
                                if (item.Message) {
                                    text = item.Message.split(",");
                                }
                                message += (index + 1) + '.' + PageCommon.GetCodeMsgArray(item.Code, text) + "<br\>";
                            });
                            $(".errorMessage").show();
                            $("#resultMessage").html(message).css("color", "#F00");
                        }
                    } else if (data.Code != "") {
                        var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                        $(".errorMessage").show();
                        $("#resultMessage").html(msg).css("color", "#F00");
                        //$("#resultMessage").html(msg).css("color", "#F00");
                        // top.parent.PageCommon.ShowMessageArrayRight("I3007", new Array(msg));
                        //return;
                    } else {
                        var result = JSON.parse(data);
                        if (result.Code != "") {
                            var msg = PageCommon.GetCodeMsgArray(result.Code, new Array(result.Message));
                            $(".errorMessage").show();
                            $("#resultMessage").html(msg).css("color", "#F00");
                            // top.parent.PageCommon.ShowMessageArrayRight("I3007", new Array(msg));
                        } else {
                            var message = "";
                            if (data.Message_Result_List[0].Result == "0") {
                                top.parent.PageCommon.ShowMessageRight(result[0].Code);
                            } else {
                                $.each(result, function (index, item) {
                                    var text = "";
                                    if (item.Message) {
                                        text = item.Message.split(",");
                                    }
                                    message += (index + 1) + '.' + PageCommon.GetCodeMsgArray(item.Code, text) + "<br\>";
                                });
                                $(".errorMessage").show();
                                $("#resultMessage").html(message).css("color", "#F00");
                            }
                        }
                    }
                    PageCommon.Loading(false);
                },
                error: function (data, status, e) {//提交失败自动执行的处理函数。
                    PageCommon.Loading(false);
                    PageCommon.ShowMessageArrayRight("S4012", e);
                }
            });

        },
        chkit: function () {
            var bank = $('.Emportchange').attr('data-id');
            var type = $('.Emportchange').attr('data-value');
            bank.checked = "checked";
            vmImport.parameter.Export_Type = type;
            var param = JSON.stringify(vmImport.parameter);
            $("input[name='parameter']").val(param);
            $("#importDataForm").attr("action", "ExportTemplate");
            $("#importDataForm").submit();
        }
    }
})
