
function changeskins() {

//框架皮肤更换
$(".header-scheme").click(function (e) {
    var v_id = $(e.target).attr("id");
    var flag = true;
    if (flag) {
        loadCss("../../Content/assets/css/vendor/skin/" + v_id + ".css");
    };
    function loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };
})



//页面皮肤更换
var skin = $(".header-scheme");
var skins = parent.skin;
$(skins).click(function (e) {
    var v_id = $(e.target).attr("id");
    var flag = true;
    if (flag) {
        loadCss("../../Content/assets/css/vendor/skin/" + v_id + ".css");

    };
    function loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };
})

}



//var cookie_style = $.cookie("mystyle");
//if (cookie_style == null) {
//    $("link[title='blue']").removeAttr("href");
//} else {
//    $(".skin").attr("href", "../../Content/assets/css/vendor/skin/" + v_id + ".css");
//    $("link[title='" + cookie_style + "']").removeAttr("href");
//}