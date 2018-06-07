var searchData = {};
var vmUserNoticeRemind = new Vue({
    el: '#apps',
    data: {
        //公告标题
        Title: '',
        //用户账号
        User_Name: '',
        //查看日期
        Create_Time:'',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000018",
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
        //导出
        Export: function (obj) {
            vmUserNoticeRemind.Search();
            PageCommon.ModalOpen({
                id: "UserSystemNoticeRemindExport",
                title: '导出用户系统公告查看列表',
                width: "270px",
                height: "200px",
                btn: ['导出', '关闭'],
                url: '/CommonView/ImportExport/Export',
                urlparameter: "tableName=S_User_System_Notice_Remind&formID=searchForm&List_Id=UserSystemNoticeRemindList&Menu_Id=M000018&SystemKey=SystemSet",
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmExport.Export();
                }
            })
        },
        //查询
        Search: function (obj) {
            vmUserNoticeRemind.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000018", List_Id: "UserSystemNoticeRemindList" });
        }
    }
})

