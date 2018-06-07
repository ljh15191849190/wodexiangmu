var vmPosition = new Vue({
    el: '#app',
    data: {
        //树形的高度
        treeheight: "",
        //树形url
        treeurl: "GeographySeach",
        //树id
        trrid01: [],
        //部门id
        isshowloading: false,
    },
    mounted: function () {
        this.trrid01 = ['', '01'],
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //关闭loading
        Floadingback: function () {
            this.isshowloading = false;
        },
        //开启loading
        Tloadingback: function () {
            this.isshowloading = true;
        },
    }
})
