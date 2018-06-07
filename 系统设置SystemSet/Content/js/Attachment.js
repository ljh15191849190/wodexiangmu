
var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //附件名称
        Attachment_Name: '',
        //上传时间
        Create_Time: '',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000017",
            System_Key: "SystemSet"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach'
    },
    mounted: function () {
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
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel();
        }
    }
})

