
var searchData = {};
var vmSystem_Notice = new Vue({
    el: '#apps',
    data: {
        //公告标题
        Title: "",
        //创建时间
        Create_Time: "",
        //创建用户
        Create_User: "",
        //是否启用
        Is_Activate: "",
        //部门名称
        Department_Name: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "SystemSet"
        },
        //发布查询条件
        IsActivateDictionaryKey: "IS_ENABLE",
        //部门名称下拉框查询条件
        systemnoticeWhere: [],
        //部门名称下拉框排序
        systemnoticeOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //部门名称下拉框显示字段
        systemnoticeResult: ["Department_Id", "Department_Name"],
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
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
        //选择的行数据
        GetSelectRow: function (datas) {
            this.selectRow = datas;
        },
        New: function () {
            //window.location.href = "Detail"
            PageCommon.ModalOpen({
                id: "System_NoticeNew",
                title: '系统公告详细',
                width: "620px",
                height: "580px",
                url: '/SystemSet/SystemNotice/Detail',               
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).systemnotice_vue.Save()
                }
            })
        },
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SystemNoticeList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("SystemNoticeList");  //刷新数据
                },
                close: true
            })
        },
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SystemNoticeList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "SystemDetailUpdate",
                title: '系统公告详细',
                width: "620px",
                height: "580px",
                url: "/SystemSet/SystemNotice/Detail",
                urlparameter:"keyValue=" + selectRow[0].System_Notice_Id,
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).systemnotice_vue.Save();
                }
            })
        },
        Search: function () {
            vmSystem_Notice.searchModel = $("#searchForm").GetSearchModel();
        },
        mClear: function () {
            //公告标题
            this.Title = '';
            //创建时间
            this.Create_Time = '';
            //创建用户
            this.Create_User = '';
            $('#Create_User').val(null).trigger('change');
            //是否启用
            this.Is_Activate = '';
            //部门名称
            this.Department_Name = '';
            PageCommon.TableDefaultSort("SystemNoticeList");
        }
    }
})
