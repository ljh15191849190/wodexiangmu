var searchData = {};
var vmCondition = new Vue({
    el: '#apps',
    data: {
        //用户名
        User_Name: '',
        //菜单名称
        Menu_Name: '',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000032",
            System_Key: "SystemSet"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach',
        //菜单下拉框查询条件
        menuwhere: ["Menu_Id"],
        //菜单下拉框显示字段
        menuresult: ["Menu_Id", "Menu_Name"],
        //菜单下拉框排序
        menurorder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }]
    },
    mounted:function(){
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
            vmCondition.searchModel = $("#searchForm").GetSearchModel();
        }
    }
})

