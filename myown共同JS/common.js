var SysMessage_ZHCN;
var srcdiv = null;
var jsVersion = "1.1.0";
//禁用右键、文本选择功能、复制按键
//$(document).bind("contextmenu", function () { return false; });
//$(document).bind("selectstart", function () { return false; });
//$(document).keydown(function () { return PageCommon.key(arguments[0]) });

$(document).ready(function () {
    if (window.location.href.indexOf("/Login") > -1) {
        //防止页面后退
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    }
    //alert(window.location.href);
    //画面权限设定
    //PageCommon.ButtonPrivileges("M0000001");

    //errormessage加载
    PageCommon.GetCodeMsgInfo();

    //共同验证控件属性
    PageCommon.CheckPageInputBlur();

    //显示菜单别名
    if (PageCommon.GetMenu()) {
        if ($("#T_Menu_Alias")) {
            $("#T_Menu_Alias").html(PageCommon.GetMenu().Menu_Alias);
        }
    }

    /*文本框聚焦事件*/
    $("#autocomplete-dynamic").focus(function () {
        $(this).parent().parent().parent().addClass('border-color');
    });
    $("#autocomplete-dynamic").blur(function () {
        $(this).parent().parent().parent().removeClass('border-color');
    });
    $(".datetime").focus(function () {
        $(this).parent().parent().parent().addClass('border-color');
    })
    $(".datetime").blur(function () {
        $(this).parent().parent().parent().removeClass('border-color');
    })
    $(".textarea").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".textarea").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    $("#demo").focus(function () {
        $(this).parent().parent().parent().parent().parent().addClass('border-color');
    })
    $("#demo").blur(function () {
        $(this).parent().parent().parent().parent().parent().removeClass('border-color');
    })
    $(".normalText").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".normalText").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    $(".numberText").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".numberText").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    $(".touchspin").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".touchspin").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    $(".datepicker").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".datepicker").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    $(".dateText").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".dateText").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    $(".normalSelect").focus(function () {
        $(this).parent().parent().addClass('border-color');
    })
    $(".normalSelect").blur(function () {
        $(this).parent().parent().removeClass('border-color');
    })
    //导入导出选择导出类型
    $(".EmportType").click(function () {
        $(this).addClass("Emportchange");
        $(this).parent().siblings().find(".EmportType").removeClass("Emportchange");
    })
    //导入错误提示框
    $(function () {
        if ($(".errorMessage").height() > 35) {
            $(".errorMessage").attr("overflow-y", "scroll");
        }
    })
    /*搜索区域显示隐藏*/
    $(".tit_down").click(function () {
        $(".tile_body").toggle();
        $(".tile_body_detail").toggle();
        $(this).find("i").toggleClass('rotate');
        var tables = $(".dataTables_scrollBody");
        for (var i = 0; i < tables.length; i++) {
            var tableid = tables.eq(i).find("table").attr("id")
            if ($("#div_table_" + tableid + " .dataTables_scrollBody").hasClass("pd_40")) {
                $("#div_table_" + tableid + " .dataTables_scrollBody").height($(window).outerHeight() - $("#div_table_" + tableid + " .dataTables_scrollBody").offset().top - $("#div_table_" + tableid + " .tableBottom").outerHeight() - 45);
            } else {
                $("#div_table_" + tableid + " .dataTables_scrollBody").height($(window).outerHeight() - $("#div_table_" + tableid + " .dataTables_scrollBody").offset().top - $("#div_table_" + tableid + " .tableBottom").outerHeight() - 5);
            }
            PageCommon.RefreshTablePage(tableid);
        }
    })
    ScreenWidth();
    //根据分辨率调整搜索区域
    function ScreenWidth() {
        if (screen.width >= 1366) {
            $('#searchForm').css('width', '89%');
            var childLength = $('#searchForm').children().length;
            if (childLength < 5) {
                $('.moreSearch').hide();
            }
        } else if (screen.width >= 1280) {
            $('#searchForm').css('width', '88%');
            var childLength = $('#searchForm').children().length;
            if (childLength < 5) {
                $('.moreSearch').hide();
            }
        } else if (screen.width >= 1024) {
            $('#searchForm').css('width', '85%');
            var childLength = $('#searchForm').children().length;
            if (childLength < 4) {
                $('.moreSearch').hide();
            }
        }
        $('.moreSearch').click(function () {
            $('.tile_body').toggleClass('searchHide');
            $(this).find("i").toggleClass('rotate');
            var tables = $(".dataTables_scrollBody");
            for (var i = 0; i < tables.length; i++) {
                var tableid = tables.eq(i).find("table").attr("id")
                if ($("#div_table_" + tableid + " .dataTables_scrollBody").hasClass("pd_40")) {
                    $("#div_table_" + tableid + " .dataTables_scrollBody").height($(window).outerHeight() - $("#div_table_" + tableid + " .dataTables_scrollBody").offset().top - $("#div_table_" + tableid + " .tableBottom").outerHeight() - 45);
                } else {
                    $("#div_table_" + tableid + " .dataTables_scrollBody").height($(window).outerHeight() - $("#div_table_" + tableid + " .dataTables_scrollBody").offset().top - $("#div_table_" + tableid + " .tableBottom").outerHeight() - 5);
                }
                PageCommon.RefreshTablePage(tableid);
            }
        })
    }
})
//表格高度随窗口变化
$(window).resize(function () {
    //location.reload();
    //$(".dataTables_scrollBody").height($("#mains").outerHeight() - $(".dataTables_scrollBody").offset().top - $(".bottom").outerHeight() - 30);

});

var PageCommon = {
    key: function key(e) {
        var keynum;
        if (window.event) {
            keynum = e.keyCode; // IE
        } else if (e.which) {
            keynum = e.which; // Netscape/Firefox/Opera
        }
        if (keynum == 17) {
            //alert("禁止复制内容！");
            return false;
        }
    },
    GetCodeMsgInfo: function () {
        if (SysMessage_ZHCN == null) {
            $.ajax({
                type: "GET",
                async: false,
                url: "../../../Content/Json/SYSMessage_zh-cn.json",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    data = eval(data);
                    SysMessage_ZHCN = data
                }
            });
        }
    },

    //取得错误MSG信息，带参数
    GetCodeMsgArray: function (msgCode, parameter) {
        var msgContent = "";
        msgContent = SysMessage_ZHCN['' + msgCode + ''];

        for (var i = 0; i < parameter.length; i++) {
            msgContent = msgContent.replace("{" + i + "}", parameter[i]);
        }
        return msgContent;
    },
    //取得错误MSG信息
    GetCodeMsg: function (msgCode) {
        var msgContent = "";
        msgContent = SysMessage_ZHCN['' + msgCode + ''];
        return msgContent;
    },
    //共同验证方法注册方法
    CheckPageInputBlur: function () {
        //var vInput = $(":input");
        //vInput.each(function (i, n) {
        //    if ($(n).attr("noblur") == null) {
        //        $(n).on('blur', function () {
        //            var isCheck = true;
        //            //必输验证
        //            var vCheckEmpty = $(this).attr("CheckEmpty");
        //            if (vCheckEmpty != null) {
        //                if (vCheckEmpty.toLowerCase() == "true" && PageCommon.IsNullOrEmpty($(this)) == false) {
        //                    PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1001', new Array(PageCommon.GetLabelIdName($(this)))));
        //                    isCheck = false
        //                    return isCheck;
        //                } else {
        //                    $(this).jCallout('hideMsg');
        //                }
        //            }

        //            //长度验证两者之间
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckLength = $(this).attr("CheckBetweenLength");
        //                    if (vCheckLength != null) {
        //                        vCheckArray = vCheckLength.split(",");
        //                        if (vCheckArray.length == 2) {
        //                            if (PageCommon.IsByteBetweenLength($(this), vCheckArray[0], vCheckArray[1]) == false) {
        //                                PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1032', new Array(PageCommon.GetLabelIdName($(this)), vCheckArray[0], vCheckArray[1])));
        //                                isCheck = false
        //                                return isCheck;
        //                            } else {
        //                                $(this).jCallout('hideMsg');
        //                            }
        //                        }
        //                    }
        //                }
        //            }

        //            //长度验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckLength = $(this).attr("CheckLength");
        //                    if (vCheckLength != null) {
        //                        vCheckArray = vCheckLength.split(",");
        //                        if (vCheckArray.length == 1) {
        //                            if (PageCommon.IsByteLength($(this), vCheckArray[0]) == false) {
        //                                PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1022', new Array(PageCommon.GetLabelIdName($(this)), vCheckArray[0])));
        //                                isCheck = false
        //                                return isCheck;
        //                            } else {
        //                                $(this).jCallout('hideMsg');
        //                            }
        //                        } else if (vCheckArray.length == 2) {
        //                            if (PageCommon.IsIntegerOrDecimal($(this), vCheckArray[0], vCheckArray[1]) == false) {
        //                                PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1009', new Array(PageCommon.GetLabelIdName($(this)), vCheckArray[0], vCheckArray[1])));
        //                                isCheck = false
        //                                return isCheck;
        //                            } else {
        //                                $(this).jCallout('hideMsg');
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //            //用户名验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckUserName = $(this).attr("CheckUserName");
        //                    if (vCheckUserName != null) {
        //                        if (vCheckUserName.toLowerCase() == "true" && PageCommon.IsUserName($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1021', new Array(PageCommon.GetLabelIdName($(this)))));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //密码验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckPassword = $(this).attr("CheckPassword");
        //                    if (vCheckPassword != null) {
        //                        if (vCheckPassword.toLowerCase() == "true" && PageCommon.IsPassword($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsg('E1033'));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //电话号码验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckTelephone = $(this).attr("CheckTelephone");
        //                    if (vCheckTelephone != null) {
        //                        if (vCheckTelephone.toLowerCase() == "true" && PageCommon.IsTelephone($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsg('E1025'));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //手机号码验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckMobilPhone = $(this).attr("CheckMobilPhone");
        //                    if (vCheckMobilPhone != null) {
        //                        if (vCheckMobilPhone.toLowerCase() == "true" && PageCommon.IsMobilPhone($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsg('E1037'));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //身份证验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckCardNo = $(this).attr("CheckCardNo");
        //                    if (vCheckCardNo != null) {
        //                        if (vCheckCardNo.toLowerCase() == "true" && PageCommon.IsCardNo($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsg('E1034'));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //车牌号验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckBusNumVerify = $(this).attr("CheckBusNumVerify");
        //                    if (vCheckBusNumVerify != null) {
        //                        if (vCheckBusNumVerify.toLowerCase() == "true" && PageCommon.IsBusNumVerify($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsg('E1029'));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }

        //                    }
        //                }
        //            }

        //            //判断字符串是否是英文或数字
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckNumberOrEngish = $(this).attr("CheckNumberOrEngish");
        //                    if (vCheckNumberOrEngish != null) {
        //                        if (vCheckNumberOrEngish.toLowerCase() == "true" && PageCommon.IsNumberOrEngish($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1002', new Array(PageCommon.GetLabelIdName($(this)))));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //验证是否大于或小于或等于系统日期
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckSytemDateCompare = $(this).attr("CheckSytemDateCompare");
        //                    if (vCheckSytemDateCompare != null) {
        //                        if ((vCheckSytemDateCompare == ">=" || vCheckSytemDateCompare == "<=") && PageCommon.IsSytemDateCompare($(this), vCheckSytemDateCompare) == false) {
        //                            if (vCheckSytemDateCompare == ">=") {
        //                                PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1015', new Array(PageCommon.GetLabelIdName($(this)))));
        //                                isCheck = false;
        //                                return isCheck;
        //                            } else if (vCheckSytemDateCompare == "<=") {
        //                                PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1016', new Array(PageCommon.GetLabelIdName($(this)))));
        //                                isCheck = false;
        //                                return isCheck;
        //                            }
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //邮箱验证 IsEmial
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckEmialCompare = $(this).attr("CheckEmialCompare");
        //                    if (vCheckEmialCompare != null) {
        //                        if (vCheckEmialCompare.toLowerCase() == "true" && PageCommon.IsEmial($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsg('E1028'));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(this).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //判断字符串是否是数字
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckNumber = $(this).attr("CheckNumber");
        //                    if (vCheckNumber != null) {
        //                        if (vCheckNumber.toLowerCase() == "true" && PageCommon.IsNumber($(this)) == false) {
        //                            PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1008', new Array(PageCommon.GetLabelIdName($(this)))));
        //                            isCheck = false;
        //                            return isCheck;
        //                        } else {
        //                            $(n).jCallout('hideMsg');
        //                        }
        //                    }
        //                }
        //            }
        //            //值两者之间验证
        //            if (isCheck == true) {
        //                if (PageCommon.IsNullOrEmpty($(this)) == true) {
        //                    var vCheckLength = $(this).attr("CheckBetweenValue");
        //                    if (vCheckLength != null) {
        //                        vCheckArray = vCheckLength.split(",");
        //                        if (vCheckArray.length == 2) {
        //                            if (PageCommon.IsBetweenValue($(this), vCheckArray[0], vCheckArray[1]) == false) {
        //                                PageCommon.ShowErrorMsgContorl($(this), PageCommon.GetCodeMsgArray('E1036', new Array(PageCommon.GetLabelIdName($(this)), vCheckArray[0], vCheckArray[1])));
        //                                isCheck = false
        //                                return isCheck;
        //                            } else {
        //                                $(this).jCallout('hideMsg');
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        });
        //    }
        //});
    },
    //共同验证方法注册方法
    CheckPageDetialInputBlur: function (contorl, datatable) {

        var isCheck = true;

        //必输验证
        var vCheckEmpty = contorl.attr("CheckEmpty");

        if (vCheckEmpty != null) {
            if (vCheckEmpty.toLowerCase() == "true" && PageCommon.IsNullOrEmpty(contorl) == false) {
                //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1001', new Array(PageCommon.GetLabelIdName(contorl))));
                isCheck = false
                return isCheck;
            }
        }

        //两者之间必须输入一个
        if (isCheck == true) {
            var vCheckEmptyOneBetweenTwo = contorl.attr("CheckEmptyOneBetweenTwo");
            var vRelationControl = contorl.attr("RelationControl");
            if (vCheckEmptyOneBetweenTwo != null && vRelationControl != null) {
                var vObjectControlValue = PageCommon.GetDetialRelationControl(contorl, vRelationControl, datatable)
                if (vCheckEmptyOneBetweenTwo.toLowerCase() == "true") {
                    if (PageCommon.IsCellNullOrEmpty(vObjectControlValue) == false && PageCommon.IsNullOrEmpty(contorl) == false) {
                        PageCommon.GetDetialControlShowName(contorl, vRelationControl, datatable);
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1035', new Array("bbbbb","aaa")));
                        isCheck = false
                        return isCheck;
                    }
                }
            }
        }

        //长度验证两者之间
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckLength = contorl.attr("CheckBetweenLength");
                if (vCheckLength != null) {
                    vCheckArray = vCheckLength.split(",");
                    if (vCheckArray.length == 2) {
                        if (PageCommon.IsByteBetweenLength(contorl, vCheckArray[0], vCheckArray[1]) == false) {
                            //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1032', new Array(PageCommon.GetLabelIdName(contorl), vCheckArray[0], vCheckArray[1])));
                            isCheck = false
                            return isCheck;
                        }
                    }
                }
            }
        }

        //长度验证
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckLength = contorl.attr("CheckLength");
                if (vCheckLength != null) {
                    vCheckArray = vCheckLength.split(",");
                    if (vCheckArray.length == 1) {
                        if (PageCommon.IsByteLength(contorl, vCheckArray[0]) == false) {
                            //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1022', new Array(PageCommon.GetLabelIdName(contorl), vCheckArray[0])));
                            isCheck = false
                            return isCheck;
                        }
                    } else if (vCheckArray.length == 2) {
                        if (PageCommon.IsIntegerOrDecimal(contorl, vCheckArray[0], vCheckArray[1]) == false) {
                            //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1009', new Array(PageCommon.GetLabelIdName(contorl), vCheckArray[0], vCheckArray[1])));
                            isCheck = false
                            return isCheck;
                        }
                    }
                }
            }
        }
        //电话号码验证
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckTelephone = contorl.attr("CheckTelephone");
                if (vCheckTelephone != null) {
                    if (vCheckTelephone.toLowerCase() == "true" && PageCommon.IsTelephone(contorl) == false) {
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsg('E1025'));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }
        //手机验证
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckMobilPhone = contorl.attr("CheckMobilPhone");
                if (vCheckMobilPhone != null) {
                    if (vCheckMobilPhone.toLowerCase() == "true" && PageCommon.IsMobilPhone(contorl) == false) {
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsg('E1037'));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }
        //身份证验证
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckCardNo = contorl.attr("CheckCardNo");
                if (vCheckCardNo != null) {
                    if (vCheckCardNo.toLowerCase() == "true" && PageCommon.IsCardNo(contorl) == false) {
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsg('E1034'));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }
        //车牌号验证
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckBusNumVerify = contorl.attr("CheckBusNumVerify");
                if (vCheckBusNumVerify != null) {
                    if (vCheckBusNumVerify.toLowerCase() == "true" && PageCommon.IsBusNumVerify(contorl) == false) {
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsg('E1029'));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }

        //判断字符串是否是英文或数字
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckNumberOrEngish = contorl.attr("CheckNumberOrEngish");
                if (vCheckNumberOrEngish != null) {
                    if (vCheckNumberOrEngish.toLowerCase() == "true" && PageCommon.IsNumberOrEngish(contorl) == false) {
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1002', new Array(PageCommon.GetLabelIdName(contorl))));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }
        //验证是否大于或小于或等于系统日期
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckSytemDateCompare = contorl.attr("CheckSytemDateCompare");
                if (vCheckSytemDateCompare != null) {
                    if ((vCheckSytemDateCompare == ">=" || vCheckSytemDateCompare == "<=") && PageCommon.IsSytemDateCompare(contorl, vCheckSytemDateCompare) == false) {
                        if (vCheckSytemDateCompare == ">=") {
                            //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1015', new Array(PageCommon.GetLabelIdName(contorl))));
                            isCheck = false;
                            return isCheck;
                        } else if (vCheckSytemDateCompare == "<=") {
                            // PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1016', new Array(PageCommon.GetLabelIdName(contorl))));
                            isCheck = false;
                            return isCheck;
                        }
                    }

                }
            }
        }
        //邮箱验证 IsEmial
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckEmialCompare = contorl.attr("CheckEmialCompare");
                if (vCheckEmialCompare != null) {
                    if (vCheckEmialCompare.toLowerCase() == "true" && PageCommon.IsEmial(contorl) == false) {
                        // PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsg('E1028'));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }
        //判断字符串是否是数字
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckNumber = contorl.attr("CheckNumber");
                if (vCheckNumber != null) {
                    if (vCheckNumber.toLowerCase() == "true" && PageCommon.IsNumber(contorl) == false) {
                        //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1008', new Array(PageCommon.GetLabelIdName(contorl))));
                        isCheck = false;
                        return isCheck;
                    }
                }
            }
        }

        //值两者之间验证
        if (isCheck == true) {
            if (PageCommon.IsNullOrEmpty(contorl) == true) {
                var vCheckLength = contorl.attr("CheckBetweenValue");
                if (vCheckLength != null) {
                    vCheckArray = vCheckLength.split(",");
                    if (vCheckArray.length == 2) {
                        if (PageCommon.IsBetweenValue(contorl, vCheckArray[0], vCheckArray[1]) == false) {
                            //PageCommon.ShowErrorMsgContorl(contorl, PageCommon.GetCodeMsgArray('E1036', new Array(PageCommon.GetLabelIdName(contorl), vCheckArray[0], vCheckArray[1])));
                            isCheck = false
                            return isCheck;
                        }
                    }
                }
            }
        }
        return isCheck;

    },
    /*取得明细的关联控件对象*/
    GetDetialRelationControl: function (contorl, relationControlName, datatable) {
        var contorlId = contorl.attr("id");
        var contorlX;
        var value;
        if (contorlId.lastIndexOf("_") >= 0) {
            contorlId = contorlId.substr(0, contorlId.lastIndexOf("_"));
        }
        if (contorlId.lastIndexOf("_") >= 0) {
            contorlX = contorlId.substr(contorlId.lastIndexOf("_") + 1, contorlId.length);
        }
        var columns = datatable.columns();
        for (var i = 0; i < columns[0].length; i++) {
            var cell = datatable.cell(':eq(' + contorlX + ')', i);
            if (cell.settings()[0].aoColumns[i].mData == relationControlName) {
                value = cell.data();
            }
        }
        return value;
    },
    /*取得对应MSG列名称*/
    GetDetialControlShowName: function (contorl, relationControlName, datatable) {
        var contorlId = contorl.attr("id");
        var contorlX;
        var contorlY
        if (contorlId.lastIndexOf("_") >= 0) {
            contorlY = contorlId.substr(contorlId.lastIndexOf("_") + 1, contorlId.length);
            contorlId = contorlId.substr(0, contorlId.lastIndexOf("_"));
        }
        if (contorlId.lastIndexOf("_") >= 0) {
            contorlX = contorlId.substr(contorlId.lastIndexOf("_") + 1, contorlId.length);
            contorlId = contorlId.substr(0, contorlId.lastIndexOf("_"));
        }
        var contorlIdArray = new Array();
        contorlIdArray[0] = contorlId;
        contorlIdArray[1] = relationControlName;
        var controlShowName = new Array()
        for (var i = 0; i < contorlIdArray.length; i++) {
            var contorlColumns = contorlIdArray[i];
            if (contorlColumns != null) {
                for (var j = 0; j < datatable.settings()[0].aoColumns.length; j++) {
                    if (contorlColumns == datatable.settings()[0].aoColumns[j].mData) {

                        controlShowName[i] = PageCommon.RemoveHTMLTag(datatable.settings()[0].aoColumns[j].sTitle)
                    }
                }
            }
        }
        if (controlShowName.length == 2) {
            var cell = datatable.cell(':eq(' + contorlX + ')', contorlY);
            $(cell.node()).attr("detialcheckresult", "1," + controlShowName[0] + "," + controlShowName[1]);
        }
    },
    RemoveHTMLTag: function (str) {
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str = str.replace(/ /ig, '');//去掉
        str = str.replace('*', '');//*去掉
        return str;
    },
    //共同验证
    CheckValue: function (obj, rowData) {

        //必输验证
        if (obj) {
            if (obj.CheckEmpty == true) {
                if (!PageCommon.IsNullOrEmpty(obj.value)) {
                    return false;
                }
            }
        }

        //两者之间必须输入一个
        if (obj) {
            if (obj.CheckEmptyOneBetweenTwo == true) {
                var vRelationControl = obj.RelationControl;
                if (vRelationControl != null) {
                    var value2 = rowData[vRelationControl];
                    if (PageCommon.IsNullOrEmpty(obj.value) == false && PageCommon.IsNullOrEmpty(value2) == false) {
                        return false;
                    }
                }
            }
        }

        //长度验证两者之间
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckBetweenLength) {
                    var vCheckArray = obj.CheckLength.split(",");
                    if (vCheckArray.length == 2) {
                        if (PageCommon.IsByteBetweenLength(obj.value, vCheckArray[0], vCheckArray[1]) == false) {
                            return false;
                        }
                    }
                }
            }
        }

        //长度验证
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckLength) {
                    var vCheckArray = obj.CheckLength.split(",");
                    if (vCheckArray.length == 1) {
                        if (PageCommon.IsByteLength(obj.value, vCheckArray[0]) == false) {
                            return false;
                        }
                    } else if (vCheckArray.length == 2) {
                        if (PageCommon.IsIntegerOrDecimal(obj.value, vCheckArray[0], vCheckArray[1]) == false) {
                            return false;
                        }
                    }
                }

                //if (!PageCommon.IsByteLength(obj.value, obj.maxLength)) {
                //    return false;
                //}
            }
        }
        //电话号码验证
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckTelephone == true) {
                    if (!PageCommon.IsTelephone(obj.value)) {
                        return false;
                    }
                }
            }
        }
        //手机验证
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckMobilPhone == true) {
                    if (!PageCommon.IsMobilPhone(obj.value)) {
                        return false;
                    }
                }
            }
        }
        //身份证验证
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckCardNo == true) {
                    if (!PageCommon.IsCardNo(obj.value)) {
                        return false;
                    }
                }
            }
        }
        //车牌号验证
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckBusNumVerify == true) {
                    if (!PageCommon.IsBusNumVerify(obj.value)) {
                        return false;
                    }
                }
            }
        }
        //判断字符串是否是英文或数字
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckNumberOrEngish == true) {
                    if (!PageCommon.IsNumberOrEngish(obj.value)) {
                        return false;
                    }
                }
            }
        }
        //验证是否大于或小于或等于系统日期
        //else if (obj.CheckSytemDateCompare == true) {
        //    var vCheckSytemDateCompare = obj.CheckSytemDateCompare;
        //        if ((vCheckSytemDateCompare == ">=" || vCheckSytemDateCompare == "<=") && PageCommon.IsSytemDateCompare(obj.value, vCheckSytemDateCompare) == false) {
        //            if (vCheckSytemDateCompare == ">=") {
        //                isCheck = false;
        //                return isCheck;
        //            } else if (vCheckSytemDateCompare == "<=") {
        //                isCheck = false;
        //                return isCheck;
        //            }
        //        }
        //}
        //邮箱验证 IsEmial
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckEmialCompare == true) {
                    if (!PageCommon.IsEmial(obj.value)) {
                        return false;
                    }
                }
            }
        }
        //判断字符串是否是数字
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckNumber == true) {
                    if (!PageCommon.IsNumber(obj.value)) {
                        return false;
                    }
                }
            }
        }

        //值两者之间验证
        if (obj) {
            if (PageCommon.IsNullOrEmpty(obj.value) == true) {
                if (obj.CheckBetweenValue) {
                    var vCheckArray = obj.CheckLength.split(",");
                    if (vCheckArray.length == 2) {
                        if (PageCommon.IsBetweenValue(obj.value, vCheckArray[0], vCheckArray[1]) == false) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },
    //验证编辑表格
    CheckDataTables: function (dataTableCheck) {

        var $table = $.fn.dataTable.Api('#' + dataTableCheck.tableId);

        var columns = $table.columns();

        $.each($table.rows()[0].reverse(), function (index, item) {
            var rowData = $table.row(':eq(' + item + ')').data();

            if (rowData[dataTableCheck.Key]) {
                if (dataTableCheck.columns) {
                    for (var i = 0; i < dataTableCheck.columns.length; i++) {
                        var $obj = dataTableCheck.columns[i];
                        var ispuss = true;
                        $obj.value = rowData[$obj.columnName];
                        ispuss = PageCommon.CheckValue($obj, rowData);

                        if (!ispuss) {
                            for (var i = 0; i < columns[0].length; i++) {
                                var cell = $table.cell(':eq(' + item + ')', i);
                                var tdWidth = $(cell.node()).width();
                                if (cell.settings()[0].aoColumns[i].mData == $obj.columnName) {
                                    //获取模板的html
                                    cell.focus();
                                    $(cell.node()).addClass("render");
                                    $table.cell.blur();
                                    //cell.node().innerHTML = $("#" + $obj.templateId).html();

                                    //var divid = $obj.divId + "_" + cell.index().row + "_" + cell.index().column;

                                    //var erp_tem = $("#" + $obj.divId).children();

                                    //var v_id = erp_tem.attr("v_id");

                                    //v_id = v_id + "_" + cell.index().row + "_" + cell.index().column;
                                    //erp_tem.attr("v_id", v_id);

                                    //$("#" + $obj.divId).attr("id", divid);

                                    ////初始化VUE模板
                                    //var cheld = new Vue({
                                    //    el: "#" + divid,
                                    //    data: {
                                    //        vmodel: cell.data()
                                    //    }
                                    //});
                                    ////设置控件在DataTables上
                                    //var control = $("#" + v_id);
                                    ////jqInputs.attr("CheckEmpty", 'true');
                                    //control[0].select();
                                    ////control.attr('id', $obj.controlId + "_" + cell.index().row + "_" + cell.index().column);
                                    //$(".outer", cell.node()).width(tdWidth);
                                    //$(".outer-lg", cell.node()).width(tdWidth);
                                    return;
                                }

                            }
                        }
                    }
                }

            }
        });


    },
    //共同验证方法
    CheckPageInput: function () {
        //校验页面必输
        var isCheckArray = new Array();
        var isCheck = true;
        var vInput = $(":input");
        vInput.each(function (i, n) {
            isCheckArray[i] = true;
            //必输验证
            var vCheckEmpty = $(n).attr("CheckEmpty");
            if (vCheckEmpty != null) {
                if (vCheckEmpty.toLowerCase() == "true" && PageCommon.IsNullOrEmpty($(n)) == false) {
                    PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1001', new Array(PageCommon.GetLabelIdName($(n)))));
                    isCheckArray[i] = false;
                } else {
                    $(n).jCallout('hideMsg');

                }
            }

            //两者之间必须输入一个
            if (isCheckArray[i] == true) {
                var vCheckEmptyOneBetweenTwo = $(n).attr("CheckEmptyOneBetweenTwo");
                if (vCheckEmptyOneBetweenTwo != null) {
                    if (vCheckEmptyOneBetweenTwo.toLowerCase() == "true") {
                        if ($(n).parents('td') && $(n).parents('td').attr("detialcheckresult")) {
                            //明细验证方法
                            var detialCheckResult = $(n).parents('td').attr("detialcheckresult");
                            $(n).parents('td').removeAttr("detialcheckresult")
                            detialCheckResult = detialCheckResult.split(",");
                            if (detialCheckResult.length = 3) {
                                if (detialCheckResult[0] == "1") {
                                    PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1035', new Array(detialCheckResult[1], detialCheckResult[2]))); isCheckArray[i] = false;
                                    isCheckArray[i] = false;
                                } else {
                                    $(n).jCallout('hideMsg');
                                }
                            }
                        } else {
                            var vRelationControl = $(n).attr("RelationControl");
                            var vObjectControl = $('#' + vRelationControl)
                            if (vObjectControl != null) {
                                if (PageCommon.IsNullOrEmpty(vObjectControl) == false && PageCommon.IsNullOrEmpty($(n)) == false) {
                                    PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1035', new Array(PageCommon.GetLabelIdName($(n)), PageCommon.GetLabelIdName(vObjectControl))));
                                    PageCommon.ShowErrorMsgContorl(vObjectControl, PageCommon.GetCodeMsgArray('E1035', new Array(PageCommon.GetLabelIdName($(n)), PageCommon.GetLabelIdName(vObjectControl))));
                                    isCheckArray[i] = false;
                                } else {
                                    $(n).jCallout('hideMsg');
                                    vObjectControl.jCallout('hideMsg');
                                }
                            }
                        }
                    }
                }
            }

            //长度之间验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckLength = $(n).attr("CheckBetweenLength");
                    if (vCheckLength != null) {
                        vCheckArray = vCheckLength.split(",");
                        if (vCheckArray.length == 2) {
                            if (PageCommon.IsByteBetweenLength($(n), vCheckArray[0], vCheckArray[1]) == false) {
                                PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1032', new Array(PageCommon.GetLabelIdName($(n)), vCheckArray[0], vCheckArray[1])));
                                isCheckArray[i] = false;
                            } else {
                                $(n).jCallout('hideMsg');
                            }
                        }
                    }
                }
            }

            //长度验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckLength = $(n).attr("CheckLength");
                    if (vCheckLength != null) {
                        vCheckArray = vCheckLength.split(",");
                        if (vCheckArray.length == 1) {
                            if (PageCommon.IsByteLength($(n), vCheckArray[0]) == false) {
                                PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1022', new Array(PageCommon.GetLabelIdName($(n)), vCheckArray[0])));
                                isCheckArray[i] = false;
                            } else {
                                $(n).jCallout('hideMsg');
                            }
                        } else if (vCheckArray.length == 2) {
                            if (PageCommon.IsIntegerOrDecimal($(n), vCheckArray[0], vCheckArray[1]) == false) {
                                PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1009', new Array(PageCommon.GetLabelIdName($(n)), vCheckArray[0], vCheckArray[1])));
                                isCheckArray[i] = false;
                            } else {
                                $(n).jCallout('hideMsg');
                            }
                        }
                    }
                }
            }

            //用户名验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckUserName = $(n).attr("CheckUserName");
                    if (vCheckUserName != null) {
                        if (vCheckUserName.toLowerCase() == "true" && PageCommon.IsUserName($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1021', new Array(PageCommon.GetLabelIdName($(n)))));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //密码验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckPassword = $(n).attr("CheckPassword");
                    if (vCheckPassword != null) {
                        if (vCheckPassword.toLowerCase() == "true" && PageCommon.IsPassword($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsg('E1033'));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }

            //电话号码验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckTelephone = $(n).attr("CheckTelephone");
                    if (vCheckTelephone != null) {
                        if (vCheckTelephone.toLowerCase() == "true" && PageCommon.IsTelephone($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsg('E1025'));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }

            //手机验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckMobilPhone = $(n).attr("CheckMobilPhone");
                    if (vCheckMobilPhone != null) {
                        if (vCheckMobilPhone.toLowerCase() == "true" && PageCommon.IsMobilPhone($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsg('E1037'));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //固定数字位数验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckNumberLength = $(n).attr("CheckNumberLength");
                    if (vCheckNumberLength != null) {
                        if (PageCommon.IsNumberLength($(n), vCheckNumberLength) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E2070', new Array(PageCommon.GetLabelIdName($(n)), vCheckNumberLength)));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //身份证验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckCardNo = $(n).attr("CheckCardNo");
                    if (vCheckCardNo != null) {
                        if (vCheckCardNo.toLowerCase() == "true" && PageCommon.IsCardNo($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsg('E1034'));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //车牌号验证
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckBusNumVerify = $(n).attr("CheckBusNumVerify");
                    if (vCheckBusNumVerify != null) {
                        if (vCheckBusNumVerify.toLowerCase() == "true" && PageCommon.IsBusNumVerify($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsg('E1029'));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }

            //判断字符串是否是英文或数字
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckNumberOrEngish = $(n).attr("CheckNumberOrEngish");
                    if (vCheckNumberOrEngish != null) {
                        if (vCheckNumberOrEngish.toLowerCase() == "true" && PageCommon.IsNumberOrEngish($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1002', new Array(PageCommon.GetLabelIdName($(n)))));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //验证是否大于或小于或等于系统日期
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckSytemDateCompare = $(n).attr("CheckSytemDateCompare");
                    if (vCheckSytemDateCompare != null) {
                        if ((vCheckSytemDateCompare == ">=" || vCheckSytemDateCompare == "<=") && PageCommon.IsSytemDateCompare($(n), vCheckSytemDateCompare) == false) {
                            if (vCheckSytemDateCompare == ">=") {

                                PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1015', new Array(PageCommon.GetLabelIdName($(n)))));
                                isCheckArray[i] = false;
                            } else if (vCheckSytemDateCompare == "<=") {
                                PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1016', new Array(PageCommon.GetLabelIdName($(n)))));
                                isCheckArray[i] = false;
                            }
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //邮箱验证 IsEmial
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckEmialCompare = $(n).attr("CheckEmialCompare");
                    if (vCheckEmialCompare != null) {
                        if (vCheckEmialCompare.toLowerCase() == "true" && PageCommon.IsEmial($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsg('E1028'));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }
            //判断字符串是否是数字
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckNumber = $(n).attr("CheckNumber");
                    if (vCheckNumber != null) {
                        if (vCheckNumber.toLowerCase() == "true" && PageCommon.IsNumber($(n)) == false) {
                            PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1008', new Array(PageCommon.GetLabelIdName($(n)))));
                            isCheckArray[i] = false;
                        } else {
                            $(n).jCallout('hideMsg');
                        }
                    }
                }
            }

            //必须输入之间的值。
            if (isCheckArray[i] == true) {
                if (PageCommon.IsNullOrEmpty($(n)) == true) {
                    var vCheckLength = $(n).attr("CheckBetweenValue");
                    if (vCheckLength != null) {
                        vCheckArray = vCheckLength.split(",");
                        if (vCheckArray.length == 2) {
                            if (PageCommon.IsBetweenValue($(n), vCheckArray[0], vCheckArray[1]) == false) {
                                PageCommon.ShowErrorMsgContorl($(n), PageCommon.GetCodeMsgArray('E1036', new Array(PageCommon.GetLabelIdName($(n)), vCheckArray[0], vCheckArray[1])));
                                isCheckArray[i] = false;
                            } else {
                                $(n).jCallout('hideMsg');
                            }
                        }
                    }
                }
            }
        });
        for (var j = 0; j < isCheckArray.length; j++) {
            if (isCheckArray[j] == false) {
                vInput[j].focus();
                isCheck = false;
                break;
            }
        }
        return isCheck;
    },

    /*取得控件的ID的名称*/
    GetIdName: function () {
        var vInput = $("input");
        var showIdName = vInput.attr("id");
        for (var i = 0; i < vInput.length; i++) {
            if (showIdName.indexOf("_") > 0) {
                showIdName = showIdName.substr(showIdName.indexOf("_") + 1);
            }
            return ('#Txt_' + showIdName);
        }
    },

    /**
     * 验证必须输入带参数
     * @param contorlName 控件
      * @param msg 错误信息
     * @return
   */
    ShowErrorMsgContorl: function (contorlName, msg) {
        contorlName.jCallout('init', {
            message: msg,
            showEffect: "fade",
            showSpeed: 300,
            hideEffect: "fade",
            hideSpeed: 300
        });
    },
    /**
    * 验证必须输入
    * @param contorlName 控件
    * @return
    */
    IsNullOrEmpty: function (contorlName) {

        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        return !(!contorlName && contorlName !== 0 && typeof contorlName !== "boolean" ? true : false);

        //if (contorlName.val() == null || contorlName.val() == "" || contorlName == "" || contorlName == null) {
        //    return false;
        //}
        //return true;
    },
    /**
    /**
    * 验证必须输入
    * @param contorlName 控件
    * @return
    */
    IsCellNullOrEmpty: function (value) {

        return !(!value && value !== 0 && typeof value !== "boolean" ? true : false);

        //if (contorlName.val() == null || contorlName.val() == "" || contorlName == "" || contorlName == null) {
        //    return false;
        //}
        //return true;
    },
    /**
* 判断字符串长度
* @param contorlName 控件
* @return 是数字返回true，否则返回false
*/
    IsByteLength: function (contorlName, maxLength) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var value = contorlName;
        var w = 0;
        if (value == "") return true;
        //判断字节数大小
        for (var i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            //汉字加2
            if (PageCommon.IsFull(c)) {

                w += 2;
            }
            else {  //单字节加1

                w++;
            }
        }
        if (w > maxLength) {
            return false;
        }
        return true;
    },
    /**
    * 判断数字在两个值者之间
    * @param contorlName 控件
    *@param minValue 最小值
    *@param maxValue 最大值
    * @return 是数字返回true，否则返回false
   */
    IsBetweenValue: function (contorlName, minValue, maxValue) {
        if (!contorlName) {
            return false;
        }
        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var value = contorlName;
        minValue = parseFloat(minValue)
        maxValue = parseFloat(maxValue)
        value = parseFloat(value)
        if (minValue <= value && value <= maxValue) {
            return true;
        }
        return false;
    },
    /**
    * 判断字符串长度在两者之间
   * @param contorlName 控件
   * @return 是数字返回true，否则返回false
    */
    IsByteBetweenLength: function (contorlName, minLength, maxLength) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var value = contorlName;
        var w = 0;
        if (value == "") return true;
        //判断字节数大小
        for (var i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            //汉字加2
            if (PageCommon.IsFull(c)) {

                w += 2;
            }
            else {  //单字节加1

                w++;
            }
        }

        if (minLength <= w && w <= maxLength) {
            return true;
        }
        return false;
    },
    /**
    * 判断是否为全角
    * @param pChar:长度为1的字符串
    * return: tbtrue:全角
    *          false:半角
    */
    IsFull: function (pChar) {
        var reg = /[^\x00-\xff]/g;
        if (reg.test(pChar)) {
            return true;
        } else {
            return false;
        }
    },

    /**
    * 验证是不是电话号码的格式，例如：029-87669987
    * @param contorlName 控件
    * @return
    */
    IsTelephone: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var value = contorlName;
        var reg = /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    /**
    * 验证是手机格式，例如：13572577838
    * @param contorlName 控件
    * @return
    */
    IsMobilPhone: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var value = contorlName;
        var reg = /^1(3|4|5|7|8)\d{9}$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    /**
* 验证是数字格式，例如：13572577838
* @param contorlName 控件
* @return
*/
    IsNumberLength: function (contorlName, Length) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var value = contorlName;
        var reg = /^[0-9]*$/;
        if (reg.test(value)) {
            if (Length == value.length) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    /**
     * 验证邮箱是否正确
     * @param contorlName 控件
     * @return
    */
    IsEmial: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }

        var value = contorlName;
        var reg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        if (!reg.test(value) || value.indexOf('.') == -1) {
            return false;
        } else {
            return true;
        }
    },
    /**
    * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    * @param contorlName 控件
    * @return
    */
    IsCardNo: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }

        var value = contorlName;
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value) === false) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 车牌号校验
     * @param contorlName
     * @returns {Boolean}
   */
    IsBusNumVerify: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }

        var value = contorlName;
        var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/g;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断字符串是否是英文或数字
     * @param contorlName 控件
      * @return
    */
    IsNumberOrEngish: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }

        var value = contorlName;
        var reg = /^[a-zA-Z0-9]+$/g;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    /**
    * 验证是否大于或小于或等于系统日期
    * @param contorlName 控件
    * @return
    */
    IsSytemDateCompare: function (contorlName, expression) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }
        var nowdDate = contorlName;
        var systemDate = moment(new Date()).format("YYYY-MM-DD");
        if (expression == ">=") {
            if (nowdDate < systemDate) {
                return false;
            }
        } else if (expression == "<=") {
            if (nowdDate > systemDate) {
                return false;
            }
        } else if (expression == "=") {
            if (nowdDate != systemDate) {
                return false;
            }
        }
        return true;
    },

    /**
     * 判断字符串是否数字
     * @param contorlName 控件
     * @return 是数字返回true，否则返回false
    */
    IsNumber: function (contorlName) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }

        var value = contorlName;

        var reg = /^[0-9]*$/g;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    /**
    * 判断字符串是否数字
    * @param contorlName 控件
    * @return 是数字返回true，否则返回false
   */
    IsNumberB: function (value) {
        var reg = /^[0-9]*$/g;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    IsUserName: function (contorlName) {
        var value = contorlName.val();
        var reg = /^[a-zA-Z]\w{5,14}$/g;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    IsPassword: function (contorlName) {
        var value = contorlName.val();
        var reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,20}$/g;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    /*取得控件的Label名称*/
    GetLabelIdName: function (contorlName) {
        var showName = contorlName.attr("id");
        //if (showName.indexOf("_") > 0) {
        //    var showName = showName.substr(showName.indexOf("_") + 1);
        //}
        return $('#Lbl_' + showName).text().replace("*", "");
    },
    /**
    * 验证数字的整数部分和小数部分
    * @param contorlName 原数字字符参数
    * @param x 整数位数
    * @param y 小数位数
    * @return true:格式正确,false:格式错误
    */
    IsIntegerOrDecimal: function (contorlName, integerLength, decimallength) {
        if (!contorlName) {
            return false;
        }

        if (contorlName.val) {
            contorlName = contorlName.val();
        }

        var value = contorlName;
        var xx = [];
        if ("" != value && value.length != 0) {
            if (value.indexOf(".") != -1) {
                xx = value.split(".");
                if (xx.length != 2) {
                    if (PageCommon.IsNumberB(xx[0])) {
                        if (xx[0].length > integerLength) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
                if (PageCommon.IsNumberB(xx[0]) && IsNumberB(xx[1])) {
                    if (xx[0].length <= integerLength && xx[1].length == decimallength) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                if (PageCommon.IsNumberB(value)) {
                    if (value.length > integerLength) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        } else {
            if (IsNumberB(value)) {
                if (value.length <= integerLength + decimallength + 1) {
                    return true;
                }
            }
        }
        return false;
    },
    // Page Specific Scripts拖动
    AllowDrop: function (ev) {
        ev.preventDefault();
    },
    //拖动控件
    Drag: function (ev, divdom) {
        srcdiv = divdom;
        ev.dataTransfer.setData("text/html", divdom.innerHTML);
    },
    //控件移动
    Drop: function (ev, divdom) {
        ev.preventDefault();
        if (srcdiv != divdom) {
            var srcwidth = $(srcdiv)[0].style.width;
            var domwidth = $(divdom)[0].style.width;
            var originalSelect = $('#' + srcdiv.id).find('select');
            var newSelect = $('#' + divdom.id).find('select');
            if (originalSelect.length >= 0 && newSelect.length == 0) {
                $(originalSelect[0]).select2('destroy');
                var cloneHtml = $('#' + srcdiv.id).clone(true);
                srcdiv.innerHTML = divdom.innerHTML;
                $('#' + divdom.id).html(cloneHtml);
                cloneHtml.find('select').select2();
            }
            else if (originalSelect.length == 0 && newSelect.length > 0) {
                $(newSelect[0]).select2('destroy');
                var cloneHtml = $('#' + divdom.id).clone(true);
                $('#' + srcdiv.id).html(cloneHtml);
                cloneHtml.find('select').select2();
                divdom.innerHTML = ev.dataTransfer.getData("text/html");

            } else if (originalSelect.length > 0 && newSelect.length > 0) {
                $(originalSelect[0]).select2('destroy');
                $(newSelect[0]).select2('destroy');
                var cloneHtmlSrcdiv = $('#' + srcdiv.id).clone(true);
                var cloneHtmlDivdom = $('#' + divdom.id).clone(true);
                $('#' + srcdiv.id).html(cloneHtmlDivdom);
                cloneHtmlSrcdiv.find('select').select2();
                $('#' + divdom.id).html(cloneHtmlSrcdiv);
                cloneHtmlDivdom.find('select').select2();
            }
            else {
                srcdiv.innerHTML = divdom.innerHTML;
                divdom.innerHTML = ev.dataTransfer.getData("text/html");
            }
            $(srcdiv)[0].style.width = domwidth;
            $(divdom)[0].style.width = srcwidth;
        }
    },
    //提示弹出框，通过传入的ID和类型判断是那种提示类型，并替换里面的多个内容
    ShowMessageArrayRight: function (vCodeID, vArray) {
        var vText = "";
        vText = PageCommon.GetCodeMsgArray(vCodeID, vArray)
        $.extend($.gritter.options, {
            position: 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
            fade_in_speed: 'medium', // how fast notifications fade in (string or int)
            fade_out_speed: 2000,
            time: 3000
        });

        $.gritter.add({
            title: "提示",
            text: vText,
            class_name: 'ShowMessageBackground'
        });
        return false;
    },
    //提示弹出框，通过传入的ID和类型判断是那种提示类型，并替换里面的多个内容
    ShowMessageRight: function (vCodeID) {
        var vText = "";
        vText = PageCommon.GetCodeMsg(vCodeID)
        $.extend($.gritter.options, {
            position: 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
            fade_in_speed: 'medium', // how fast notifications fade in (string or int)
            fade_out_speed: 2000,
            time: 3000
        });
        $.gritter.add({
            title: "提示",
            text: vText,
            class_name: 'ShowMessageBackground'
        });
        return false;
    },
    //不带参数的URL设定
    SetUrl: function (url) {
        try {
            if (top.GlobalParameter.Root_Path != null) {
                return top.GlobalParameter.Root_Path + url;
            } else {
                return url;
            }
        } catch (e) {
            return url;
        }

        //if (vProjectName != "" && vProjectName != "undefined") {
        //    var vSuffix = url.substr(url.lastIndexOf("."));
        //    var vNewUrl = url.substr(0, url.lastIndexOf("."));
        //    var vUrl = vNewUrl + "_" + vProjectName + vSuffix;
        //    if (PageCommon.Checkurl(vUrl)) {lastIndexOf
        //        return vUrl;
        //    } else {
        //        return url;
        //    }
        //} else {
        //    return url;
        //}
    },
    //带参数的URL设定
    SetUrlParameter: function (url, parameter) {
        //escape外面编码
        //if (vProjectName != "" && vProjectName != "undefined") {
        //    var vSuffix = url.substr(url.lastIndexOf("."));
        //    var vNewUrl = url.substr(0, url.lastIndexOf("."));

        //    var vUrl = vNewUrl + "_" + vProjectName + vSuffix;
        //    if (PageCommon.Checkurl(vUrl)) {
        //        vUrl = vUrl + "?" + parameter;
        //        return encodeURI(vUrl);
        //    } else {
        //        url = url + "?" + parameter;
        //        return encodeURI(url);
        //    }
        //} else {
        if (top.GlobalParameter.Root_Path != null) {
            url = top.GlobalParameter.Root_Path + url + "?" + parameter;
        } else {
            url = url + "?" + parameter;
        }
        return encodeURI(url);
        //}
    },
    //获取当前打开的tab页
    CurrentWindow: function () {
        var iframeId = top.$(".Tab_iframe:visible").attr("id");
        return top.frames[iframeId];
    },
    ///获取reques请求参数
    Request: function (name) {
        var search = decodeURI(location.search.slice(1));
        var arr = search.split("&");
        if (name) {
            for (var i = 0; i < arr.length; i++) {
                var ar = arr[i].split("=");
                if (ar[0] == name) {
                    if (unescape(ar[1]) == 'undefined') {
                        return "";
                    } else {
                        return unescape(ar[1]);
                    }
                }
            }
            return "";
        } else {
            var requestModel = {};
            for (var i = 0; i < arr.length; i++) {
                var ar = arr[i].split("=");
                requestModel[ar[0]] = unescape(ar[1]);
            }
            return requestModel;
        }

    },

    ///刷新当前页面
    Reload: function () {
        //console.log(.);
        this.CurrentWindow().location.reload();
        return false;
    },

    //Loading: function (bool, text) {
    //    if (bool) {
    //        $.blockUI({
    //            message: text
    //        });
    //    } else {
    //        $.unblockUI();
    //    }
    //},
    Loading: function (bool, text) {
        if (bool) {
            top.layer.load(1, {
                shade: [0.3, '#000']
            });
        } else {
            top.layer.closeAll("loading");
        }
    },
    //获取当前浏览器类型
    Browser: function () {
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        };
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        }
        if (userAgent.indexOf("Chrome") > -1) {
            if (window.navigator.webkitPersistentStorage.toString().indexOf('DeprecatedStorageQuota') > -1) {
                return "Chrome";
            } else {
                return "360";
            }
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        }
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        };
    },
    //打开弹出窗口
    ModalOpen: function (options) {
        var defaults = {
            id: null,
            title: '系统窗口',
            width: "100px",
            height: "100px",
            url: '',
            urlparameter: '',
            maxmin: false,
            shade: 0.3,
            btn: ['保存'],
            btnid: ["btnSave", "btnClose"],
            btnclass: ['btn btn-primary', 'btn btn-danger'],
            callBack: null,
            callBack2: null,
            cancelBack:null
        };
        var options = $.extend(defaults, options);
        var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
        var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
        top.layer.open({
            id: options.id,
            type: 2,
            shade: options.shade,
            title: options.title,
            fix: false,
            resize: false,
            maxmin: options.maxmin,
            area: [_width, _height],
            content: options.urlparameter === '' ? PageCommon.SetUrl(options.url) : PageCommon.SetUrlParameter(options.url, options.urlparameter),
            btn: options.btn,
            btnclass: options.btnclass,
            btnid: options.btnid,
            yes: function (layero) {
                options.callBack(options.id)
            },
            btn2: function () {
                if (options.callBack2) {
                    options.callBack2(options.id);
                    return false;
                } else {
                    return true;
                }
            },
            cancel: function () {
                if (options.cancelBack) {
                    options.cancelBack();
                }
                return true;
            }
            //,zIndex: layer.zIndex //重点1
            // , success: function (layero) {
            //      layer.setTop(layero); //重点2
            //  }
        });
    },
    //导入
    ModalImportOpen: function (options) {
        var defaults = {
            id: 'Import',
            title: '导入',
            width: "340px",
            height: "300px",
            btn: ['下载模板', '导入'],
            btnid: ["btnTemplate", "btnImports"],
            btnclass: ['btn btn-primary', 'btn btn-primary'],
            url: '/CommonView/ImportExport/Import',
            urlparameter: '',
            maxmin: false,
            shade: 0.3,
            callBack: null,
            tableName: "",
            systemKey: "",
            vm: null
        };
        var options = $.extend(defaults, options);
        options.urlparameter = "tableName=" + options.tableName + "&systemKey=" + options.systemKey;
        var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
        var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
        top.layer.open({
            id: options.id,
            type: 2,
            shade: options.shade,
            title: options.title,
            fix: false,
            resize: false,
            maxmin: options.maxmin,
            area: [_width, _height],
            content: options.urlparameter === '' ? PageCommon.SetUrl(options.url) : PageCommon.SetUrlParameter(options.url, options.urlparameter),
            btn: options.btn,
            btnclass: options.btnclass,
            btnid: options.btnid,
            yes: function (layero) {
                PageCommon.ChildrenFrames(options.id).vmImport.chkit();
            },
            btn2: function () {
                PageCommon.ChildrenFrames(options.id).vmImport.Import(options.vm);
                return false;
            },
            cancel: function () {
                return true;
            }
        });
    },
    //导出
    ModalExportOpen: function (options) {
        var defaults = {
            id: 'Export',
            title: '导出',
            width: "280px",
            height: "150px",
            btn: ['导出'],
            btnid: ["btnExports"],
            btnclass: ['btn btn-primary'],
            url: '/CommonView/ImportExport/Export',
            urlparameter: '',
            maxmin: false,
            shade: 0.3,
            formID: 'searchForm',
            tableName: '',
            menu_Id: '',
            list_Id: '',
            systemKey: '',
            vm: null,
            callBack: null
        };
        var options = $.extend(defaults, options);
        if (options.vm) {
            if (options.vm.Search) {
                options.vm.Search();
                options.urlparameter = "tableName=" + options.tableName + "&menu_Id=" + options.menu_Id + "&list_Id=" + options.list_Id + "&systemKey=" + options.systemKey;
                var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
                var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
                top.layer.open({
                    id: options.id,
                    type: 2,
                    shade: options.shade,
                    title: options.title,
                    fix: false,
                    resize: false,
                    maxmin: options.maxmin,
                    area: [_width, _height],
                    content: options.urlparameter === '' ? PageCommon.SetUrl(options.url) : PageCommon.SetUrlParameter(options.url, options.urlparameter),
                    btn: options.btn,
                    btnclass: options.btnclass,
                    btnid: options.btnid,
                    yes: function (layero) {
                        PageCommon.ChildrenFrames(options.id).vmExport.Export(options.vm.searchModel);
                    }, cancel: function () {
                        $.ajax({
                            url: '/CommonView/ImportExport/ClearCache',
                            data: { seachModel: options.vm.searchModel },
                            type: 'post',
                            dataType: "text",
                            sucess: function (data) {
                            },
                            error: function (e) { console.log(e); }
                        })
                        return true;
                    }
                });
            }
        }

    },

    //打开弹出报表窗口
    ModalReportOpen: function (options) {
        var defaults = {
            reportId: null,
            reportModel: {},
            selectValueList: [],
            searchModel: {},
            title: '报表打印',
            width: "800px",
            height: "600px",
            url: '/CommonView/Report/Print',
            maxmin: false,
            shade: 0.3,
            callBack: null
        };
        var options = $.extend(defaults, options);
        options.searchModel.Select_Value_List = options.selectValueList;
        options.reportModel.Seach_Model = options.searchModel;
        options.reportModel.Report_Id = options.reportId;

        //调用自己的打印按钮
        $.ajax({
            url: PageCommon.SetUrl('ReportGuid'),
            type: "post",
            dataType: "text",
            data: options.reportModel,
            success: function (data) {
                var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
                var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
                //打开报表画面
                top.layer.open({
                    id: options.reportId,
                    type: 2,
                    shade: options.shade,
                    title: options.title,
                    fix: false,
                    resize: false,
                    maxmin: options.maxmin,
                    area: [_width, _height],
                    content: PageCommon.SetUrlParameter(options.url, 'reportKey=' + data),
                    yes: function () {
                    }, cancel: function () {
                        return true;
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                PageCommon.Loading(false);
                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
            },
            beforeSend: function () {
                PageCommon.Loading(true, options.loading);
            },
            complete: function () {
                PageCommon.Loading(false);
            }
        });
    },
    //点击弹出自己画面DIV窗口
    ModalOpenDiv: function (options) {
        var defaults = {
            id: null,
            content: null,
            title: '系统窗口',
            width: "700px",
            height: "600px",
            btn: ['保存', '关闭'],
            btnid: ["btnExportImport", "btnClose"],
            btnclass: ['btn btn-primary', 'btn btn-danger'],
            callBack: null
        };
        var options = $.extend(defaults, options);
        var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
        var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
        layer.open({
            type: 1,
            shade: 0.3,
            title: options.title,
            id: options.id,
            area: [_width, _height],
            content: options.content, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            btn: options.btn,
            btnclass: options.btnclass,
            btnid: options.btnid,
            resize: false,
            //shadeClose: true,//开启遮罩关闭
            yes: function () {
                options.callBack()
            }, cancel: function () {
                return true;
            }
        });
    },
    //点击按钮弹出窗口
    OpenWindowDiv: function (options) {
        var defaults = {
            id: null,
            content: null,
            title: '系统窗口',
            width: "100px",
            height: "100px",
            height: "600px",
            btn: ['保存', '关闭'],
            btnid: ["btnExportImport", "btnClose"],
            btnclass: ['btn btn-primary', 'btn btn-danger'],
            callBack: null
        };
        var options = $.extend(defaults, options);
        var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
        var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
        var index = layer.open({
            type: 1,
            shadeClose: true,//开启遮罩关闭
            shade: 0.3,
            title: options.title,
            area: [_width, _height],
            content: options.content,
            btn: options.btn,
            btnclass: options.btnclass,
            btnid: options.btnid,
            yes: function () {
                options.callBack()
            }, cancel: function () {
                return true;
            }
        });
        return index;
    },
    //打开confirm提示窗口
    ModalConfirm: function (content, callBack, close) {

        var index = top.layer.confirm(content, {
            icon: "fa-exclamation-circle",
            title: "系统提示",
            btn: ['确认', '取消'],
            btnclass: ['btn btn-primary', 'btn btn-danger'],
        }, function () {


            if (!close) {
                top.layer.closeAll();
            } else {
                top.layer.close(index);
            }
            callBack(true);
        }, function () {
            callBack(false)
        });
    },
    //打开confirm提示窗口
    ModalAlert: function (content, type, callback) {
        var icon = "";
        if (type == 'success') {
            icon = "fa-check-circle";
        }
        if (type == 'error') {
            icon = "fa-times-circle";
        }
        if (type == 'warning') {
            icon = "fa-exclamation-circle";
        }
        top.layer.msg(content, {
            icon: icon,
            title: "系统提示",
            btn: ['确认'],
            btnclass: ['btn btn-primary'],

        }, function () {
            if (callback) {
                callback();
            }
        });
    },
    //关闭当前iframe中的弹出窗口
    ModalClose: function () {
        var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        var $IsdialogClose = top.$("#layui-layer" + index).find('.layui-layer-btn').find("#IsdialogClose");
        var IsClose = $IsdialogClose.is(":checked");
        if ($IsdialogClose.length == 0) {
            IsClose = true;
        }
        if (IsClose) {
            top.layer.close(index);
        } else {
            location.reload();
        }
    },
    //提交form表单
    SubmitForm: function (options) {
        var defaults = {
            url: "",
            param: [],
            loading: "正在处理数据...",
            success: null,
            err: null,
            close: false,
            type: '0', //0 代表页面没有上传 1代表上传 2代表多图上传
            errorMessageCode: null,
            successMessageCode: null
        };
        var options = $.extend(defaults, options);
        this.Loading(true);
        window.setTimeout(function () {
            if (options.type == '0') {
                $.ajax({
                    url: options.url,
                    data: options.param,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (!_.isObject(data)) {
                            data = eval("(" + data + ")");
                        }
                        if (data.Result == "0") {
                            window.parent.window.PageCommon.ShowMessageRight(data.Code);

                        } else {
                            if (options.errorMessageCode == null) {
                                if (data.Message == "" || data.Message == null) {
                                    var msg = PageCommon.GetCodeMsg(data.Code);
                                    window.parent.window.PageCommon.ShowMessageArrayRight("I3007", new Array(msg))
                                } else {
                                    var msg = PageCommon.GetCodeMsgArray(data.Code, data.Message.split("|"));
                                    window.parent.window.PageCommon.ShowMessageArrayRight("I3007", new Array(msg));
                                }
                            } else {

                                if (data.Message == "" || data.Message == null) {
                                    var msg = PageCommon.GetCodeMsg(data.Code);
                                    window.parent.window.PageCommon.ShowMessageArrayRight(options.errorMessageCode, new Array(msg))
                                } else {
                                    var msg = PageCommon.GetCodeMsgArray(data.Code, data.Message.split("|"));
                                    window.parent.window.PageCommon.ShowMessageArrayRight(options.errorMessageCode, new Array(msg));
                                }
                            }

                            if (options.err) {
                                options.err();
                            }
                            return;
                        }

                        if (options.success) {
                            window.setTimeout(function () { options.success(data); }, 1000)
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (options.close) {
                            //关闭iframe窗
                            PageCommon.ModalClose();
                            PageCommon.Loading(false);
                        } else {
                            PageCommon.Loading(false);
                        }
                        window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
                        if (options.err) {
                            options.err();
                        }
                    },
                    //beforeSend: function () {
                    //    PageCommon.Loading(true, options.loading);
                    //},
                    complete: function () {
                        if (options.close) {
                            //关闭iframe窗
                            PageCommon.ModalClose();
                            PageCommon.Loading(false);
                        } else {
                            window.setTimeout(function () { PageCommon.Loading(false); }, 1000);
                        }
                    }
                });
            } else if (options.type == '2') {
                $.ajax({
                    url: options.url,
                    data: options.param,
                    type: "post",
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (!_.isObject(data)) {
                            data = eval("(" + data + ")");
                        }
                        if (data.Result == "0") {
                            window.parent.window.PageCommon.ShowMessageRight(data.Code);

                        } else {
                            if (options.errorMessageCode == null) {
                                if (data.Message == "" || data.Message == null) {
                                    var msg = PageCommon.GetCodeMsg(data.Code);
                                    window.parent.window.PageCommon.ShowMessageArrayRight("I3007", new Array(msg))
                                } else {
                                    var msg = PageCommon.GetCodeMsgArray(data.Code, data.Message.split("|"));
                                    window.parent.window.PageCommon.ShowMessageArrayRight("I3007", new Array(msg));
                                }
                            } else {

                                if (data.Message == "" || data.Message == null) {
                                    var msg = PageCommon.GetCodeMsg(data.Code);
                                    window.parent.window.PageCommon.ShowMessageArrayRight(options.errorMessageCode, new Array(msg))
                                } else {
                                    var msg = PageCommon.GetCodeMsgArray(data.Code, data.Message.split("|"));
                                    window.parent.window.PageCommon.ShowMessageArrayRight(options.errorMessageCode, new Array(msg));
                                }
                            }

                            if (options.err) {
                                options.err();
                            }
                            return;
                        }

                        if (options.success) {
                            window.setTimeout(function () { options.success(data); }, 1000)
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (options.close) {
                            //关闭iframe窗
                            PageCommon.ModalClose();
                            PageCommon.Loading(false);
                        } else {
                            PageCommon.Loading(false);
                        }
                        window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
                        if (options.err) {
                            options.err();
                        }
                    },
                    //beforeSend: function () {
                    //    PageCommon.Loading(true, options.loading);
                    //},
                    complete: function () {
                        if (options.close) {
                            //关闭iframe窗
                            PageCommon.ModalClose();
                            PageCommon.Loading(false);
                        } else {
                            window.setTimeout(function () { PageCommon.Loading(false); }, 1000);
                        }
                    }
                });
            }
            else {
                var fileId = [];
                for (var i = 0; i < $("input[type='file']").length; i++) {
                    fileId.push($("input[type='file']").eq(i).attr('id'))
                }
                $.ajaxFileUpload({
                    url: options.url,
                    type: 'post',//请求方式 当要提交自定义参数时，这个参数要设置成post
                    secureuri: false,//是否启用安全提交，默认为false
                    data: options.param,
                    fileElementId: fileId,// 需要上传的文件域的ID
                    dataType: 'json',//服务器返回的数据类型  可以为xml,script,json,html。如果不填写，jQuery会自动判断。如果json返回的带pre,这里修改为json即可解决。
                    success: function (data) {
                        if (!_.isObject(data)) {
                            data = eval("(" + data + ")");
                        }
                        if (data.Result == "0") {
                            window.parent.window.PageCommon.ShowMessageRight(data.Code);

                        } else {
                            var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                            window.parent.window.PageCommon.ShowMessageArrayRight("I3007", new Array(msg));
                            if (options.err) {
                                options.err();
                            }
                            return;
                        }

                        if (options.success) {
                            window.setTimeout(function () { options.success(data); }, 1000)
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (options.close) {
                            //关闭iframe窗
                            PageCommon.ModalClose();
                            PageCommon.Loading(false);
                        } else {
                            PageCommon.Loading(false);
                        }
                        window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
                        if (options.err) {
                            options.err();
                        }
                    },
                    //beforeSend: function () {
                    //    PageCommon.Loading(true, options.loading);
                    //},
                    complete: function () {
                        if (options.close) {
                            //关闭iframe窗
                            PageCommon.ModalClose();
                            PageCommon.Loading(false);
                        } else {
                            window.setTimeout(function () { PageCommon.Loading(false); }, 1000);
                        }
                    }
                });
            }
        }, 500);
    },
    //返回MESSGE设定
    BackFormMessge: function (url, vm) {
        if (vm) {
            if (vm.btnSave) {
                PageCommon.WebFormMessage(
                    {
                        msgcode: "I3042",
                        url: url
                    }
                 );
            } else if (vm.btnSubmit) {
                PageCommon.WebFormMessage(
                 {
                     msgcode: "I3048",
                     url: url
                 }
                );
            } else {
                var urlNew = window.location.href;
                urlNew = urlNew.substring(0, location.href.lastIndexOf("/") + 1);
                window.location.href = PageCommon.SetUrl(url);
            }
        } else {
            PageCommon.WebFormMessage(
                    {
                        msgcode: "I3042",
                        url: url
                    }
                 );
        }

    },
    //alertMsg表示
    WebFormMessage: function (options) {
        var defaults = {
            msgcode: "",
            param: [],
            url: "",
            success: null
        };
        var options = $.extend(defaults, options);
        var promptMsg = PageCommon.GetCodeMsg(options.msgcode)
        this.ModalConfirm(promptMsg, function (r) {
            if (r) {
                if (options.success) {
                    options.success();
                } else {
                    var urlNew = window.location.href;
                    urlNew = urlNew.substring(0, location.href.lastIndexOf("/") + 1);
                    window.location.href = PageCommon.SetUrl(urlNew + options.url);
                }
            }
        });
    },
    //提交明细数据
    SubmitDetialForm: function (options) {
        var promptCode = options.promptCode || "I3001";
        var defaults = {
            errorCode: "I3003",
            prompt: PageCommon.GetCodeMsg(promptCode),
            url: "",
            param: [],
            loading: "正在处理数据...",
            success: null,
            close: true,
            type: '1'//1代表普通删除 0代表带原因的删除
        };
        var options = $.extend(defaults, options);
        if (options.param.length === 0) {
            window.parent.window.PageCommon.ShowMessageRight("E2009");
            return;
        }
        if (options.type == '0') {
            PageCommon.ModalOpen({
                id: "DeleteReasonList",
                title: '删除原因',
                width: "500px",
                height: "250px",
                btn: ['确定', '取消'],
                url: '../../CommonView/BusinessSeach/DeleteReasonList',
                callBack: function (iframeId) {
                    var deleteReason = PageCommon.ChildrenFrames(iframeId).vmDeleteReason.Save();
                    if (deleteReason) {
                        var Delete_Reason = deleteReason;
                        $.each(options.param, function (i, item) {
                            item.Delete_Reason = Delete_Reason;
                        })
                        $.ajax({
                            url: PageCommon.SetUrl(options.url),
                            data: { "objList": options.param },
                            type: "post",
                            dataType: "json",
                            success: function (data) {
                                //关闭iframe窗
                                PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();

                                if (data.Result == "0") {
                                    window.parent.window.PageCommon.ShowMessageRight(data.Code);
                                    if (options.success) {
                                        options.success(data);
                                    }
                                    PageCommon.Loading(false);
                                } else {
                                    var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                                    window.parent.window.PageCommon.ShowMessageArrayRight(options.errorCode, new Array(msg));
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                PageCommon.Loading(false);
                                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
                            },
                            beforeSend: function () {
                                PageCommon.Loading(true, options.loading);
                            },
                            complete: function () {
                                PageCommon.Loading(false);
                            }
                        });
                    }
                }
            })
        } else {
            this.ModalConfirm(options.prompt, function (r) {
                if (r) {
                    PageCommon.Loading(true, options.loading);
                    window.setTimeout(function () {
                        $.ajax({
                            url: PageCommon.SetUrl(options.url),
                            data: { "objList": options.param },
                            type: "post",
                            dataType: "json",
                            success: function (data) {

                                if (data.Result == "0") {
                                    window.parent.window.PageCommon.ShowMessageRight(data.Code);
                                    if (options.success) {
                                        options.success(data);
                                    }
                                    PageCommon.Loading(false);
                                } else {
                                    var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                                    window.parent.window.PageCommon.ShowMessageArrayRight(options.errorCode, new Array(msg));
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                PageCommon.Loading(false);
                                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
                            },
                            beforeSend: function () {
                                PageCommon.Loading(true, options.loading);
                            },
                            complete: function () {
                                PageCommon.Loading(false);
                            }
                        });
                    }, 500);
                }
            }, (!options.close));
        }
    },
    //获取datatable选中行
    GetTableSelectRow: function (tableid) {
        var rowSelect = [];
        $('#' + tableid + ' tbody tr').each(function (i) {
            if ($(this).hasClass("selected")) {
                var item = $.fn.dataTable.Api('#' + tableid).row(this).data();
                rowSelect.push(item);
            }
        });


        return rowSelect;
    },
    //刷新当前页
    RefreshTablePage: function (tableId) {
        var table = new $.fn.dataTable.Api('#' + tableId);
        table.draw(false)
        $(".checkTitle_" + tableId).addClass("checkbox-custom-alt1");

        $(".select-all_" + tableId).attr("ckd") === "false";
        //$(".select-all_" + tableId).trigger("onchange");

    },
    //表格恢复默认排序
    TableDefaultSort:function(tableId){
         var table = $('#'+tableId).dataTable();
         table.fnSortNeutral();
    },
    GetDataTableData: function (tableId) {
        var table = new $.fn.dataTable.Api('#' + tableId);
        return table.data();
    },
    //刷新树table页
    RefreshTreeTablePage: function (tableId) {
        var grows = $.fn.DataTable.TreeGrid.prototype.treeGridRows;
        var dtSettings = new $.fn.dataTable.Api("#" + tableId).settings()[0];
        $.fn.DataTable.TreeGrid.prototype.resetTreeGridRows(dtSettings, null, grows);
        PageCommon.RefreshTablePage(tableId);
    },
    //按钮权限控制
    ButtonPrivileges: function (menuId) {

        $('button[authorize=yes]').attr('authorize', 'no');
        $.ajax({
            url: "ButtonPrivileges",
            data: { "menuId": menuId },
            type: "post",
            dataType: "json",
            success: function (dataJson) {

                // dataJson = eval("'" + dataJson + "'");
                if (dataJson != undefined) {
                    $.each(dataJson, function (i, item) {
                        $("#" + item.Button_Frame_Id).attr('authorize', 'yes');
                    });
                }
                $('[authorize=no]').remove();
            }
        });
    },
    //获取数据
    GetFormData: function (options) {
        //options参数： 请求路径   请求参数  回调函数
        //              { url: "", param = {},success:function(){} };

        var defaults = {
            url: "",
            param: [],
            loading: "正在加载请稍后...",
            success: null,
            close: true
        };
        var options = $.extend(defaults, options);

        $.ajax({
            url: options.url,
            data: options.param,
            type: "post",
            dataType: "json",
            //async:false,
            success: function (data) {
                if (!_.isObject(data)) {
                    data = eval("(" + data + ")");
                }

                if (data.Result == "2") {
                    var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                    window.parent.window.PageCommon.ShowMessageArrayRight("I3034", new Array(msg));
                    window.setTimeout(function () {
                        window.history.go(-1);
                    }, 2000)

                    return;
                } else if (data.Result == "1") {

                    window.parent.window.PageCommon.ShowMessageRight(data.Code);
                    window.setTimeout(function () {
                        window.history.go(-1);
                    }, 2000)
                    return;
                }

                PageCommon.Loading(false);
                if (options.success) {
                    options.success(data);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                PageCommon.Loading(false);
                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
            },
            beforeSend: function () {
                PageCommon.Loading(true, options.loading);
            },
            complete: function () {
                PageCommon.Loading(false);
            }
        });

    },
    //普通自定义数据取得
    GetSeachTableData: function (options) {
        var defaults = {
            tableName: "",
            systemKey: "",
            isCache: "",
            mainWhere: null,
            mainOrderby: null,
            filedSeach: null,
            filedType: null,
            childTable: null,
            searchData: {},
            url: "GetSeachTableData",
            success: null
        };
        var options1 = $.extend(defaults, options);
        options1.searchData.Main_Where_List = options.mainWhere;
        options1.searchData.Main_OrderBy_List = options.mainOrderby;
        options1.searchData.Table_Name = options.tableName;
        options1.searchData.System_Key = options.systemKey;
        options1.searchData.Filed_Type = options.filedType;
        options1.searchData.Filed_Seach = options.filedSeach;
        options1.searchData.Is_Cache = options.isCache;
        options1.searchData.Child_Table_List = options.childTable;
        $.ajax({
            url: options1.url,
            data: options1.searchData,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data && data != "null") {
                } else {
                    data = [];
                }
                if (data.Result == "2") {
                    var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                    window.parent.window.PageCommon.ShowMessageArrayRight("I3034", new Array(msg));
                    return;
                } else if (data.Result == "1") {
                    window.parent.window.PageCommon.ShowMessageRight(data.Code);
                    return;
                }
                //回调取得数据
                if (options.success) {
                    options.success(data.dt);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
    },
    //业务参数取得
    GetBusinessRule: function (options) {
        var defaults = {
            systemBusinessObject: null,
            detailNumbers: null,
            url: "GetBusinessRule",
            success: null
        };
        var options1 = $.extend(defaults, options);
        var searchData = {};
        searchData.System_Business_Object = "";
        searchData.Detail_Numbers = "";
        options1.searchData = searchData;
        options1.searchData.System_Business_Object = options.systemBusinessObject;
        options1.searchData.Detail_Numbers = options.detailNumbers;
        $.ajax({
            url: options1.url,
            data: options1.searchData,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data && data != "null") {
                } else {
                    data = [];
                }
                if (data.Result == "2") {
                    var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                    window.parent.window.PageCommon.ShowMessageArrayRight("I3034", new Array(msg));
                    return;
                } else if (data.Result == "1") {
                    window.parent.window.PageCommon.ShowMessageRight(data.Code);
                    return;
                }
                //回调取得数据
                if (options.success) {
                    options.success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
    },
    //克隆一个jqury对象
    Clone: function (obj) {
        var o, obj;
        if (obj.constructor == Object) {
            o = new obj.constructor();
        } else {
            o = new obj.constructor(obj.valueOf());
        }
        for (var key in obj) {
            if (o[key] != obj[key]) {
                if (typeof (obj[key]) == 'object') {
                    o[key] = clone2(obj[key]);
                } else {
                    o[key] = obj[key];
                }
            }
        }
        o.toString = obj.toString;
        o.valueOf = obj.valueOf;
        return o;
    },
    //获取数据字典
    GetDictionarry: function (key, code) {
        var value = "";
        $.ajax({
            url: "GetDataDictionaryByCode",
            data: { statusDictionaryKey: key, code: code },
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                value = data.value;

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error:" + errorThrown);
            }
        });

        return value;
    },
    ChildrenFrames: function (iframeId) {
        return $(top.frames[iframeId]).children()[0].contentWindow;
    },
    //16进制字符串转2进制数组
    Str2Bytes: function (str) {
        var pos = 0;

        var len = str.length;

        if (len % 2 != 0) {

            return null;

        }

        len /= 2;

        var hexA = new Array();

        for (var i = 0; i < len; i++) {

            var s = str.substr(pos, 2);

            var v = parseInt(s, 16);

            hexA.push(v);

            pos += 2;

        }

        return hexA;


    }
    //退出登录
    , LoginOut: function () {
        PageCommon.ModalConfirm("确定要退出系统吗？", function (rtn) {
            if (rtn) {
                window.location.href = PageCommon.SetUrl("/Login/Index");
            }


        });
        //$.ajax({
        //    url: "/Login/LoginOut",
        //    data: {},
        //    type: "post",
        //    dataType: "json",
        //    success: function (data) {
        //        window.location.href = PageCommon.SetUrl("/Login/Index");
        //    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        //        window.location.href = PageCommon.SetUrl("/Login/Index");
        //    }
        //});
    }
    //获取当前打开的页面的 menuid
    , GetMenuId: function () {
        return top.$(".Tab_iframe:visible").attr("data-menuid");

    },
    //获取当前打开的页面的 menu对象
    GetMenu: function () {
        if (top.MenuData) {
            var menu = _.find(top.MenuData.S_Menu_List, function (m) {
                return m.Menu_Id == PageCommon.GetMenuId();
            });

            return menu;
        }

    },
    //设置缓存Cookie（ 缓存名称，值，过期时间）
    SetCookie: function (c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(JSON.stringify(value)) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    },
    //获取缓存Cookie （缓存名称）
    GetCookie: function (c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return JSON.parse(unescape(document.cookie.substring(c_start, c_end)))
            }
        }
        return ""
    },
    GlobalParameter: function () {
        return PageCommon.GetCookie('ERP_GlobalParameter');
    },
    //删除Cookie
    clearCookie: function (c_name) {
        if (c_name) {
            PageCommon.SetCookie(c_name, "", -1);
        } else {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;)
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    },
    //数字处理
    NumberDispose: function (number, fractiondigits, Mathtype) {  //number传过来的数字  fractiondigits小数位 Mathtype数字处理类型
        with (Math) {
            if (Mathtype == 'float' || Mathtype == '1') {//小数点位数切割
                //判断是正数还是负数
                if (number == abs(number)) {
                    //正数
                    return PageCommon.ToDecimal(floor(number * pow(10, fractiondigits)) / pow(10, fractiondigits), fractiondigits);
                } else {
                    //负数
                    return PageCommon.ToDecimal(ceil(number * pow(10, fractiondigits)) / pow(10, fractiondigits), fractiondigits);
                }
            } else if (Mathtype == 'round' || Mathtype == '0') {//四舍五入
                return PageCommon.ToDecimal(round(number * pow(10, fractiondigits)) / pow(10, fractiondigits), fractiondigits);
            }
        }
    },
    //小数相加处理
    addNum: function (num1, num2,y) {
        var sq1, sq2, m;
        try {
            sq1 = num1.toString().split(".")[1].length;
        }
        catch (e) {
            sq1 = 0;
        }
        try {
            sq2 = num2.toString().split(".")[1].length;
        }
        catch (e) {
            sq2 = 0;
        }
        m = Math.pow(10, Math.max(sq1, sq2));
        return PageCommon.ToDecimal((num1 * m + num2 * m) / m,y);
    },
    ToDecimal: function (x, y) {
        var s = x.toString();
        if (y == '0') {
            return s;
        }
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + Number(y)) {
            s += '0';
        }
        return s;
    },
    //点击按钮
    Clickbtn: function (vm, btntype) {
        var RequestValue = PageCommon.Request();
        if (RequestValue.save) {
            var save = RequestValue.save;
        }

        if (vm.btnSave != null) {
            if (btntype == 'Edit') {
                vm.btnSave = true;
            } else if ((btntype == 'Save' && save == '1') || btntype == 'Submit') {
                vm.btnSave = false;
            }
        }
        if (vm.btnSubmit != null) {
            if (btntype == 'Save' && save == '1') {
                vm.btnSubmit = true;
            } else if (btntype == 'Edit' || btntype == 'Submit') {
                vm.btnSubmit = false;
            }
        }
        if (vm.btnEdit != null) {
            if (btntype == 'Save' && save == '1') {
                vm.btnEdit = true;
            } else if (btntype == 'Edit' || btntype == 'Submit') {
                vm.btnEdit = false;
            }
        }
        if (vm.readonly != null) {
            if (btntype == 'Edit') {
                vm.readonly = false;
            } else if ((btntype == 'Save' && save == '1') || btntype == 'Submit') {
                vm.readonly = true;
            }
        }
        if (vm.isshade_bg != null) {
            if (btntype == 'Edit') {
                vm.isshade_bg = false;
            } else if ((btntype == 'Save' && save == '1') || btntype == 'Submit') {
                vm.isshade_bg = true;
            }
        }
        if (vm.isedittable != null) {
            if (btntype == 'Save' && save == '1') {
                //vm.isedittable = false;
            }
        }
        if (vm.money != null) {
            if (btntype == 'Edit') {
                vm.money = true;
            } else if ((btntype == 'Save' && save == '1') || btntype == 'Submit') {
                vm.money = false;
            }
        }
        if (vm.btnSet != null) {
            if (btntype == 'Submit') {
                vm.btnSet = false;
            }
            if (btntype == 'Save' && save == '1') {
                vm.btnSet = false;
            }
            if (btntype == 'Edit') {
                vm.btnSet = true;
            }
        }
        if (vm.tableid != null) {
            if (btntype == 'Edit') {
                $.each(vm.tableid, function (i, n) {
                    var table = $('#' + n).DataTable();
                    table.column(1).visible(true);
                    table.keys.enable();
                    //$.each($('.edit-control'),function(i,item){
                    //    if ($(item).text() == '操作') {
                    $('#edit_table_' + n + ' .edit-control').eq(0).html('<a class="add btn-info btn-sm" href="#"><i class="glyphicon glyphicon-plus"></i></a>')
                    //}
                    //})
                });
            }
            if (btntype == 'Submit') {
                $.each(vm.tableid, function (i, n) {
                    var table = $('#' + n).DataTable();
                    table.column(1).visible(false);
                    table.keys.disable();
                });
            }
        }
    },

    //业务共同处理
    //判断单据的状态
    EditStatus: function (options) {
        var defaults = {
            vm: '',
            //审核状态
            approvalstatus: '',
            //编辑
            editCallBack: null,
            //查看
            lookCallBack: null,
            //提醒
            remindCallBack: null,
            //审核
            approvalCallBack: null
        };
        var options = $.extend(defaults, options);
        //获取url地址
        var RequestValue = PageCommon.Request();
        if (RequestValue.sourcetype) {
            var sourcetype = RequestValue.sourcetype;
        }
        if (RequestValue.isedit) {
            var isedit = RequestValue.isedit;
        }
        if (sourcetype == '0' && isedit == '0') {
            //修改
            options.vm.readonly = false;
            options.vm.isshade_bg = false;
            //修改过来的审核状态
            if (options.approvalstatus == '04') {
                options.vm.btnApprovalOpinion = true;
            }
            if (options.editCallBack) {
                options.editCallBack();
            }
        } else if (sourcetype == '0' && isedit == '1') {
            //查看
            options.vm.readonly = true;
            options.vm.isshade_bg = true;
            options.vm.isedittable = false;
            options.vm.money = false;
            options.vm.btnSave = false;
            options.vm.btnSet = false;
            if (options.vm.isdelete_img != null) {
                options.vm.isdelete_img = false;
            }
            //查看过来的审核状态
            if (options.approvalstatus !== '01') {//未提交
                options.vm.btnApprovalOpinion = true;
            }
            if (options.lookCallBack) {
                options.lookCallBack();
            }
        } else if (sourcetype == '2' && isedit == '0') {
            //提醒
            if (options.approvalstatus == '02' || options.approvalstatus == '03') {//待审核//已审核
                options.vm.readonly = true;
                options.vm.isshade_bg = true;
                options.vm.isedittable = false;
                options.vm.money = false;
                options.vm.btnSave = false;
                options.vm.btnBack = false;
                options.vm.btnSet = false;
                if (options.vm.isdelete_img != null) {
                    options.vm.isdelete_img = false;
                }
                options.vm.btnApprovalOpinion = true;
            } else if (options.approvalstatus == '04') { //已驳回
                options.vm.btnApprovalOpinion = true;
            }
            if (options.remindCallBack) {
                options.remindCallBack();
            }
        } else if (sourcetype == '1' && isedit == '1') {
            //审核
            options.vm.readonly = true;
            options.vm.isshade_bg = true;
            options.vm.isedittable = false;
            options.vm.money = false;
            options.vm.btnSave = false;
            options.vm.btnBack = false;
            options.vm.btnSet = false;
            if (options.vm.isdelete_img != null) {
                options.vm.isdelete_img = false;
            }
            if (options.approvalstatus == '02') {
                //待审核
                options.vm.btnApproval = true;
            } else if (options.approvalstatus == '03') {
                //已审核
                options.vm.btnApprovalOpinion = true;
            }
            if (options.approvalCallBack) {
                options.approvalCallBack();
            }
        }
    },
    //判断附件上传超期日判断
    IsCustomerSaleOverdue: function (options) {
        var defaults = {
            customerId: "",
            systemKey: "",
            saleDate: "",
            saleSeach: {},
            url: "../../CommonView/BusinessHandle/IsCustomerSaleOverdue",
            success: null
        };
        var options1 = $.extend(defaults, options);
        options1.saleSeach.Customer_Id = options.customerId;
        options1.saleSeach.System_Key = options.systemKey;
        options1.saleSeach.Sale_Date = options.saleDate;

        $.ajax({
            url: options1.url,
            data: options1.saleSeach,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data && data != "null") {
                } else {
                    data = [];
                }
                if (data.Result == "2") {
                    var msg = PageCommon.GetCodeMsgArray(data.Code, new Array(data.Message));
                    window.parent.window.PageCommon.ShowMessageArrayRight("I3034", new Array(msg));
                    return;
                } else if (data.Result == "1") {
                    window.parent.window.PageCommon.ShowMessageRight(data.Code);
                    return;
                }
                //三证上传超期
                if (data.Is_Sale_Overdue == '1') {
                    window.parent.window.PageCommon.ShowMessageRight("E2062");
                    return false;
                } else {
                    return true;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.parent.window.PageCommon.ShowMessageArrayRight("S4012", errorThrown);
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
    },
    //金额计算共同处理
    AmountCalculateCommon: function (options) {
        var defaults = {
            priceTaxSum: null, //价税合计
            taxRate: null,    //税率
            tax: null,    //税额
            price: null,  //单价
            count: null,  //数量
            amount: null,  //金额
            priceTaxSumTotal: null, //价税总计
            taxSumTotal: null,  //总税额
            weightingAverCost: null, //加权平均成本
            lastestPriceIncludeTax: null, //最新成本价(含税)
            cyProfitRateStoreage: null,//CY利润率_库
            cyProfitRatePeriod: null,//CY利润率_期
            commission: null,        //佣金
            commissionRate: null,    //佣金率
            priceCommission: null  //含佣单价
        };

        //小数位数取得
        globalParameter = PageCommon.GlobalParameter();

        var options1 = $.extend(defaults, options);

        //已知单品价税合计，求单品单价
        if (options1.priceTaxSum != null && options1.taxRate != null) {
            options1.priceTaxSum = PageCommon.NumberDispose(options1.priceTaxSum, globalParameter.Tax_Price_Total_Decimal, globalParameter.Money_Digital_Cut_Way);
            options1.taxRate = PageCommon.NumberDispose(options1.taxRate, globalParameter.Tax_Decimal, globalParameter.Money_Digital_Cut_Way);

            //单价 = 价税合计 /税率
            if (options1.taxRate > 0) {
                options1.price = options1.priceTaxSum / options1.taxRate;
                options1.price = PageCommon.NumberDispose(options1.price, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);
            }

            //税额 = 价税合计 - 单价
            tax = options1.priceTaxSum - options1.price;
            options1.tax = PageCommon.NumberDispose(options1.tax, globalParameter.Tax_Decimal, globalParameter.Money_Digital_Cut_Way);
        } else if (options1.price != null && options1.taxRate != null) {
            options1.price = PageCommon.NumberDispose(options1.price, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);
            options1.taxRate = PageCommon.NumberDispose(options1.taxRate, globalParameter.Tax_Decimal, globalParameter.Money_Digital_Cut_Way);

            //价税合计 = 单价*税率
            options1.priceTaxSum = options1.price * options1.taxRate;
            options1.priceTaxSum = PageCommon.NumberDispose(options1.priceTaxSum, globalParameter.Tax_Price_Total_Decimal, globalParameter.Money_Digital_Cut_Way);

            //税额 = 价税合计 - 单价
            tax = options1.priceTaxSum - options1.price;
            options1.tax = PageCommon.NumberDispose(options1.tax, globalParameter.Tax_Decimal, globalParameter.Money_Digital_Cut_Way);
        }

        //金额，价税总计，总税额计算
        if (options1.price != null && options1.tax != null && options1.count != null) {
            options1.price = PageCommon.NumberDispose(options1.price, globalParameter.Price_Decimal, globalParameter.Money_Digital_Cut_Way);
            options1.count = PageCommon.NumberDispose(options1.count, globalParameter.Count_Decimal, globalParameter.Count_Digital_Cut_Way);

            //金额 = 单价 * 数量
            options1.amount = options1.price * options1.count;
            options1.amount = PageCommon.NumberDispose(options1.amount, globalParameter.Price_Sum_Decimal, globalParameter.Money_Digital_Cut_Way);
            //价税总计 = (单价 + 税额) * 数量
            options1.priceTaxSumTotal = (options1.price + options1.tax) * options1.count;
            options1.priceTaxSumTotal = PageCommon.NumberDispose(options1.priceTaxSumTotal, globalParameter.Tax_Price_Sum_Decimal, globalParameter.Money_Digital_Cut_Way);
            //总税额 = 价税总计 - 金额
            options1.taxSumTotal = options1.priceTaxSumTotal - options1.amount;
            options1.taxSumTotal = PageCommon.NumberDispose(options1.taxSumTotal, globalParameter.Tax_Decimal, globalParameter.Money_Digital_Cut_Way);
        }

        //利润率_库,利润率_期的计算
        if (options1.priceTaxSum != null && options1.weightingAverCost != null) {
            options1.priceTaxSum = PageCommon.NumberDispose(options1.priceTaxSum, globalParameter.Tax_Price_Total_Decimal, globalParameter.Money_Digital_Cut_Way);
            //利润率_库=（价税合计-库存平均成本）/价税合计*100   取2位小数
            options1.cyProfitRateStoreage = (options1.priceTaxSum - options1.weightingAverCost) / options1.priceTaxSum * 100;
            options1.cyProfitRateStoreage = PageCommon.NumberDispose(options1.cyProfitRateStoreage, 2, 'round');
            //利润率_期=（价税合计-采购定价表最低计算后RMB含税单价）/价税合计*100   取2位小数
            options1.cyProfitRatePeriod = (options1.priceTaxSum - options1.lastestPriceIncludeTax) / options1.priceTaxSum * 100;
            options1.cyProfitRatePeriod = PageCommon.NumberDispose(options1.cyProfitRatePeriod, 2, 'round');
        }

        //税前佣金率 税后佣金率 计算方法
        if (options1.priceCommission != null && options1.commissionRate != null) {
            options1.priceCommission = PageCommon.NumberDispose(options1.priceCommission, 4, 'round');
            options1.commissionRate = PageCommon.NumberDispose(options1.commissionRate, 2, 'round');
            //佣金 = 含佣单价*(佣金率/100） 保留6位小数
            options1.commission = options1.priceCommission * (options1.commissionRate / 100);
            options1.commission = PageCommon.NumberDispose(options1.commission, 6, 'round');
        } else if (options1.commission != null && options1.priceCommission != null) {
            //佣金率= 佣金/含佣单价（保留4位小数）*100
            if (options1.priceCommission > 0) {
                options1.commission = PageCommon.NumberDispose(options1.commission, 6, 'round');
                options1.priceCommission = PageCommon.NumberDispose(options1.priceCommission, 4, 'round');
                options1.commissionRate = (options1.commission / options1.priceCommission) * 100 //（保留2位小数）
                options1.commissionRate = PageCommon.NumberDispose(options1.commissionRate, 2, 'round');
            }
        }
        return options1;
    }
}

//获取查询对象
$.fn.GetSearchModel = function (options) {
    var defaults = {
        Sort_Field: "Create_Time",
        Sort_Direction: "DESC",
        Query_Kb: "01",
        Procedure_Index: "1",
        System_Key: "",
        Menu_Id: "",
        List_Id: ""
    }
    var Pagination_Info = $.extend(defaults, options);
    var searchModel = {};
    searchModel.Where_Parameter_List = [];
    searchModel.Child_Where_Parameter_List = [];
    searchModel.Pagination_Info = Pagination_Info;
    searchModel.Menu_Id = Pagination_Info.Menu_Id;
    searchModel.List_Id = Pagination_Info.List_Id;

    var element = $(this);
    element.find('input,select,textarea').each(function (r) {
        var $this = $(this);
        var id = $this.attr('id');
        var type = $this.attr('type');
        var postdata = {};
        if ($this.attr("Field_Name") != null) {
            postdata.Field_Name = !$this.attr("Field_Name") ? null : $this.attr("field_name");
            postdata.Contorl_Id = !$this.attr("id") ? null : $this.attr("id");
            postdata.Module_Id = !element.attr("id") ? null : element.attr("id");
            postdata.Query_Type = !$this.attr("Query_Type") ? null : $this.attr("query_type");
            postdata.Expression = !$this.attr("Expression") ? null : $this.attr("expression");
            postdata.Date_Format = !$this.attr("Date_Format") ? null : $this.attr("date_format");
            postdata.Time_Format = !$this.attr("Time_Format") ? null : $this.attr("time_format");
            if (id.indexOf("_SearchEnd") < 0) {
                switch (type) {
                    case "checkbox":
                        postdata.Condition_Value1 = $this.is(":checked");
                        break;
                    default:
                        var value = $this.val() == "" ? "&nbsp;" : $this.val();
                        if ($this.val() != null && $this.val() != "") {
                            if ($this.attr("date_format")) {
                                if ($this.attr("date_format") == 'ym') {
                                    postdata.Condition_Value1 = value.substring(0, 7);
                                    postdata.Condition_Value2 = value.substring(10, 17);
                                    postdata.Date_Format = '02';
                                } else if ($this.attr("date_format") == 'ymd') {
                                    postdata.Condition_Value1 = value.substring(0, 10);
                                    postdata.Condition_Value2 = value.substring(13, 23);
                                    postdata.Date_Format = '01';
                                    console.log(111)
                                    console.log(postdata)
                                } else if ($this.attr("date_format") == 'ymdhm') {
                                    postdata.Condition_Value1 = value.substring(0, 16);
                                    postdata.Condition_Value2 = value.substring(19, 35);
                                } else if ($this.attr("date_format") == 'ymdhms') {
                                    postdata.Condition_Value1 = value.substring(0, 19);
                                    postdata.Condition_Value2 = value.substring(22, 41);
                                    postdata.Date_Format = '01';
                                    postdata.Time_Format = '01';
                                }
                            } else if ($this.attr("multiple") === "multiple") {
                                var condition = "";
                                if ($this.attr("autocomplete") === "autocomplete") {
                                    condition += value;
                                } else {
                                    for (var i = 0; i < value.length; i++) {
                                        condition += "''" + value[i] + "'',";
                                    }
                                    condition = condition.substring(0, condition.length - 1);
                                }
                                postdata.Condition_Value1 = condition;
                            }
                            else {
                                postdata.Condition_Value1 = value;
                            }
                        }
                        break;
                }
            } else {
                var start = id.slice(0, id.indexOf("_SearchEnd")) + '_SearchStart';
                postdata.Condition_Value1 = $('#' + start).val();
                postdata.Condition_Value2 = $('#' + id).val();
            }
            //放入条件
            if ($this.attr("child") === 'true') {
                searchModel.Child_Where_Parameter_List.push(postdata);
            } else {
                searchModel.Where_Parameter_List.push(postdata);
            }
        }

    });
    return searchModel;
}




