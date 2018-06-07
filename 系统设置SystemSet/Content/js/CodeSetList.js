var searchData = {};
var vmCodeSet = new Vue({
    el: '#apps',
    data: {
        //表名
        Table_Name: "",
        //字段名称
        Field_Name: "",
        Is_Activate:"",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000009",
            System_Key: "SystemSet"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //表名联动条件
        linkage: {},
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE"
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
        //选择的行数据
        GetSelectRow: function (datas) {
            this.selectRow = datas;
        },
        New: function () {
            PageCommon.ModalOpen({
                id: "CodeSetNew",
                title: '编码设置详细',
                width: "500px",
                height: "350px",
                url: '/SystemSet/CodeSet/Detail',           
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).codeset_vue.Save()
                }
            })
        },
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("CodeSetList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("CodeSetList");  //刷新数据
                },
                close: true
            })
        },
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CodeSetList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }        
            PageCommon.ModalOpen({
                id: "CodeSetUpdate",
                title: '系统详情',
                width: "500px",
                height: "350px",
                url: "/SystemSet/CodeSet/Detail",
                urlparameter:"keyValue=" + selectRow[0].Table_Name + "&keyValue1=" + selectRow[0].Field_Name,
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).codeset_vue.Save()
                }
            })
        },    
        Set: function () {

        },
        Install: function () {

        },
        TemplateSelection: function (data) {
            if (data) {
                this.linkage = data.id;
            } else {
                this.linkage = "";
            }
        },
        Search: function () {
            vmCodeSet.searchModel = $("#searchForm").GetSearchModel();
        }
    }
});
