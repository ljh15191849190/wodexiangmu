
var searchData = {};
var vmHomeShow = new Vue({
    el: '#apps',
    data: {
        //表示名称
        Home_Show_Name: '',
        //是否启用
        Is_Activate: "",
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE",
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000012",
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
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "HomeShowDetail",
                title: '首页表示详情',
                width: "488px",
                height: "300px",
                url: '/SystemSet/HomeShow/Detail',
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).HomeShowDiv.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("HomeShowList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("HomeShowList");  //刷新数据
                },
                close: true
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("HomeShowList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }        
            //弹出框修改
            PageCommon.ModalOpen({
                id: "HomeShowDetail",
                title: '首页表示详情',
                width: "488px",
                height: "300px",
                url: "/SystemSet/HomeShow/Detail",
                urlparameter:"keyValue=" + selectRow[0].Home_Show_Id,
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).HomeShowDiv.Save()
                }
            })
        },
        
        //禁用
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("HomeShowList");
            console.log(selectRow);
            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }

            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index, obj) {
                if (obj.Is_Activate == "0") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 1;
                    newSelectRow.push(newobj);
                }
            });

            if (newSelectRow.length == 0) return;


            //调用提交数据
            PageCommon.SubmitForm({
                url: "UpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("HomeShowList");
                }
            });
        },
        //启用
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("HomeShowList");

            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }

            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index, obj) {
                if (obj.Is_Activate == "1") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 0;
                    newSelectRow.push(newobj);
                }
            });

            if (newSelectRow.length == 0) return;

            //调用提交数据
            PageCommon.SubmitForm({
                url: "UpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("HomeShowList");
                },

            });
        },
        //设置
        Setit: function (obj) {

        },
        //查询
        Search: function (obj) {
            vmHomeShow.searchModel = $("#searchForm").GetSearchModel();
        }
    }
})
