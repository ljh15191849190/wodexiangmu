/*设置iframe的高度*/
$(function () {
    $('#content').css("cssText", "top:107px !important;");
    $("#content").find('#content-main').height(window.innerHeight - 145);
    $(window).resize(function (e) {
        $("#content").find('#content-main').height(window.innerHeight - 145);
    });
    /*菜单竖向布局跳页*/
    $(".transverse").click(function () {
        window.location.href = $(this).attr("href");
    })
    
    
    $("#navigation li").click(function () {
        $(".second-list").eq($(this).index()).show();
       
        $(this).find(".nav_tit").css({ "backgroundColor": "rgba(0, 0, 0, 0.2)", "color": "white" });

        $(this).siblings().find(".second-list").hide();
        
        var skincolorr = $("#navigation li").css("background-color");
        $(this).siblings().find(".nav_tit").css({ "backgroundColor": skincolorr, "color": "rgba(255, 255, 255, 0.5)" });
    })
    $(".second-list").hover(function () {
        $(this).show();
        $(this).parent("li").find(".nav_tit").css({ "backgroundColor": "rgba(0, 0, 0, 0.2)", "color": "white" })
    }, function () {
        $(this).hide();
        var skincolor = $("#navigation li").css("background-color");
        $(this).parent("li").find(".nav_tit").css({ "backgroundColor": skincolor, "color": "rgba(255, 255, 255, 0.5)" });
    })

    
})
