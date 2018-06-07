//初始化加载报表处理
window.onload = function () {
    setTimeout(function () {
        $("input[name='print_browser']").hide();
        $("input[name='print_pdf']").hide();
        //$("input[name='export_pdf']").attr("value", "PDF");
        $("input[name='export_excel2007']").attr("value", "Excel");
        $("input[name='export_word2007']").attr("value", "Word");
        $("input[name='export_pp2007']").attr("value", "Power Point");
        $(".round").css("border", "none");
        //console.log($("input[name='print_browser']").attr("value"));
        //$(".frtoolbar").hide()
        $(".print_button").click(function () {
            $("input[name='print_pdf']").trigger('click')
        })
    }, 1000)
}