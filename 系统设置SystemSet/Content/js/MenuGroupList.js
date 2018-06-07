
var searchData = {};
var vmMenuGroupList = new Vue({
    el: '#apps',
    data: {
        //系统名称
        System_Id: '',
        //菜单分组名称
        Menu_Group_Name: '',
        //是否启用
        Is_Activate: "",
       //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE",
        //系统名称搜索下拉框查询条件
        systemwhere: [],
        //系统名称下拉框显示字段
        systemresult: ["System_Id", "System_Name"],
        //系统名称下拉框排序
        systemorder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000013",
            System_Key: "SystemSet"
        },
        //系统分组联动条件
        linkage: null,
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'Seach',
        //选择的行数据
        selectRow: [],
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
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "MenuGroupDetail",
                title: '菜单分组详情',
                width: "488px",
                height: "250px",
                url: '/SystemSet/MenuGroup/Detail',
                callBack: function (iframeId) {
                    //调用菜单分组管理详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).MenuGroupDetailDiv.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("MenuGroupList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("MenuGroupList");  //刷新数据
                },
                close: true
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("MenuGroupList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "MenuGroupDetail",
                title: '菜单分组详情',
                width: "488px",
                height: "250px",
                url: "/SystemSet/MenuGroup/Detail",
                urlparameter:"keyValue=" + selectRow[0].Menu_Group_Id,
                callBack: function (iframeId) {
                    //调用系统管理详情页保存方法           
                    PageCommon.ChildrenFrames(iframeId).MenuGroupDetailDiv.Save()
                }
            })
        },
       
        //启用
        Enable: function (obj) {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("MenuGroupList");
            console.log(selectRow);
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
                url: "UpdtateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("MenuGroupList");
                }
            });
        },
        //禁用
        Dissable: function (obj) {
            ///获取选中行
            var selectRow = PageCommon.GetTableSelectRow("MenuGroupList");
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
                url: "UpdtateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("MenuGroupList");
                }
            });
        },
        //设置
        Set: function (obj) {

        },
        //根据系统查询菜单分组
        ChangeSystem: function (value) {
            vmMenuGroupList.linkage = {};
            vmMenuGroupList.linkage.Field_Name = "System_Id";
            vmMenuGroupList.linkage.Value1 = value;
        },
        //查询
        Search: function (obj) {
            vmMenuGroupList.searchModel = $("#searchForm").GetSearchModel();
        }
    }
})