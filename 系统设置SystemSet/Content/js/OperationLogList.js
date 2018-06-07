
var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //操作用户
        Create_User: '',
        //操作时间
        Create_Time: '',

        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000030",
            System_Key: "SystemSet"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach'      
    },mounted:function(){
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
        //导出
        Export: function (obj) {
            app.Search();
            PageCommon.ModalOpen({
                id: "OperationLog",
                title: '导出操作日志列表',
                width: "270px",
                height: "200px",
                btn: ['导出', '关闭'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=S_Operation_Log&formID=searchForm&List_Id=OperationLogList&Menu_Id=M000030&SystemKey=SystemSet",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export()
                }
            })
        },
        //设置
        Set: function (obj) {
        },
        //查询
        Search: function (obj) {
            app.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000030", List_Id: "OperationLogList" });
        }
    }
})
