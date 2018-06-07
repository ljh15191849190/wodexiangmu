
var searchData = {};
var vm = new Vue({
    el: '#apps',
    data: {
        //用户账号
        User_Name: '',
        //登录类型
        Log_In_Out_Type: '',
        //登陆日期
        Create_Time:'',
        //登陆类型下拉框查询条件
        LogInOutTypeWhere: [],
        //登陆类型下拉框排序
        LogInOutTypeOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //登陆类型下拉框显示字段
        LogInOutTypeResult: ["Log_In_Out_Type"],
        //表格查询url
        tableurl: "Seach",
        //表格查询条件
        searchModel: searchData,
        ColumHeaderSeach: {
            Menu_Id: "M000004",
            System_Key: "SystemSet"
        }
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
            vm.searchModel = $("#searchForm").GetSearchModel();
        }
    }
})

