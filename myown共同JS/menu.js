/*鼠标放到导航上显示二级菜单*/
function naviga() {
    $("#navigation li").click(function () {
        $(".second-menu").eq($(this).index()).show();
        $(this).find(".selected-arrow").show();
        $("#navigation > li a").eq($(this).index()).css({ "backgroundColor": "rgba(0, 0, 0, 0.2)", "color": "white" });

        $(".second-menu").eq($(this).index()).siblings(".second-menu").hide();
        $(this).siblings().find(".selected-arrow").hide();
        var skincolorr = $("#navigation li").css("background-color");
        $(this).siblings().find("a").css({ "backgroundColor": skincolorr, "color": "rgba(255, 255, 255, 0.5)" });

    })
   
    $("#navigation li").hover(function () {
        $("#navigation > li a").eq($(this).index()).css({ "backgroundColor": "rgba(0, 0, 0, 0.2)", "color": "white" });
    }, function () {
        var skincolorr = $("#navigation li").css("background-color");
        $("#navigation > li a").eq($(this).index()).css({ "backgroundColor": skincolorr, "color": "rgba(255, 255, 255, 0.5)" });
    })
  

        $(".second-menu").hover(function () {
            $(this).show();
            $(".selected-arrow").eq($(this).index() - 1).show();
            $("#navigation > li a").eq($(this).index() - 1).css({ "backgroundColor": "rgba(0, 0, 0, 0.2)", "color": "white" })
        }, function () {
            $(this).hide();     
            $(".selected-arrow").eq($(this).index()-1).hide();
            var skincolor = $("#navigation li").css("background-color");
            $("#navigation > li a").eq($(this).index() - 1).css({ "backgroundColor": skincolor, "color": "rgba(255, 255, 255, 0.5)" });
        })

}
/*框架布局跳页*/
$(".transverse").click(function () {

    window.location.href = $(this).attr("href");
})
/*页面顶部小图标*/
$(".top-down").click(function () {
    $(".nav-down").fadeToggle(300);
    $(this).find("i").toggleClass('rotate');
})


