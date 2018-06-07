(function ($) {
    $.login = {
        formMessage: function (msg) {
            // 处理返回的消息
            $("#warningMsg").css("display", "block");
            $("#warningMsg").text(msg);
            //$("#userName").focus();
        },
        loginClick: function () {
            //登录时验证输入信息
            var $username = $("#User_Name");
            var $password = $("#Password");
            //var $code = $("#txt_code");
            if ($username.val() == "") {
                $username.focus();
                var msg = PageCommon.GetCodeMsgArray("E1001", new Array("用户名"));
                $.login.formMessage(msg);
                return false;
            } else if ($password.val() == "") {
                $password.focus();
                var msg = PageCommon.GetCodeMsgArray("E1001", new Array("用户名"));
                $.login.formMessage(msg);
                return false;
            }
                //else if ($code.val() == "") {
                //    $code.focus();
                //    $.login.formMessage('请输入验证码。');
                //    return false;
                //}
            else {
                $("#warningMsg").css("display", "none");
                $("#login_button").attr('disabled', 'disabled').find('span').html("loading...");
                $.ajax({
                    url: "/Login/UserLogin",
                    data: { User_Name: $.trim($username.val()), Password: $.trim($password.val()) },
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        //PageCommon.SetCookie("login_user", $.trim($username.val()), 1);
                        if (!_.isObject(data)) {
                            data = eval("(" + data + ")");
                        }
                        if (!data.Code) {
                            $("#login_button").find('span').html("登录成功，正在跳转...");
                            window.setTimeout(function () {
                                window.location.href = "../Home/Index";
                            }, 500);
                        } else {
                            $("#login_button").removeAttr('disabled').find('span').html("登录");
                            var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                            $.login.formMessage(msg);
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.login.formMessage("数据请求错误!" + errorThrown);
                        $("#login_button").removeAttr('disabled').find('span').html("登录");
                    }
                });
            }
        },
        init: function () {

            var login_error = $.cookie('rsberp_login_error');
            var login_user = $.cookie('ERP_LoginUser');

            if (login_error != null) {
                switch (login_error) {
                    case "overdue":
                        $.login.formMessage("系统登录已超时,请重新登录");
                        break;
                    case "OnLine":
                        $.login.formMessage("您的帐号已在其它地方登录,请重新登录");
                        break;
                    case "-1":
                        $.login.formMessage("系统未知错误,请重新登录");
                        break;
                }
                top.$.cookie('rsberp_login_error', '', { path: "/", expires: -1 });
            }
            $("#login_button").click(function () {
                $.login.loginClick();
            });
            document.onkeydown = function (e) {
                if (!e) e = window.event;
                if ((e.keyCode || e.which) == 13) {
                    document.getElementById("login_button").focus();
                    document.getElementById("login_button").click();
                }
            }
        }
    };
    $(function () {
        $.login.init();
    });
})(jQuery);