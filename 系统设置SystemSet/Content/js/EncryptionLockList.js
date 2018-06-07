var searchData = {};
var vmEncryptionLock = new Vue({
    el: '#apps',
    data: {
        //秘钥Code
        Secret_Code: '',
        //员工姓名
        Name: '',
        //是否启用
        Is_Activate: "",
        //启用查询条件
        IsActiveDictionaryKey: "IS_ACTIVATE",
        //表格查询url
        tableurl: 'Seach',
        //表格查询条件
        searchModel: searchData,
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000005",
            System_Key: "SystemSet"
        }
    },
    mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            
        });
    },
    methods: {
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "EncryptionLockDetail",
                title: '加密锁',
                width: "300px",
                height: "250px",
                url: '/SystemSet/EncryptionLock/Detail',
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).EncryptionLockDiv.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("EncryptionLockList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type:'0',
                success: function () {
                    PageCommon.RefreshTablePage("EncryptionLockList");  //刷新数据
                },
                close: true
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("EncryptionLockList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
           
            //弹出框修改
            PageCommon.ModalOpen({
                id: "EncryptionLockDetail",
                title: '加密锁',
                width: "300px",
                height: "250px",
                url: "/SystemSet/EncryptionLock/Detail",
                urlparameter: "keyValue=" + selectRow[0].Secret_Code,
                callBack: function (iframeId) {
                    //调用加密锁详情页保存方法
                    
                    PageCommon.ChildrenFrames(iframeId).EncryptionLockDiv.Save()
                }
            })
        },
       
        //禁用
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("EncryptionLockList");
           
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
                    PageCommon.RefreshTablePage("EncryptionLockList");
                }
            });
        },
        //启用
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("EncryptionLockList");

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
                    PageCommon.RefreshTablePage("EncryptionLockList");
                }
            });
        },
        //设置
        Setit: function (obj) {

        },
        //查询
        Search: function (obj) {
            vmEncryptionLock.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000005", List_Id: "EncryptionLockList" });
        },
        //清空
        mClear: function (obj) {
            vmEncryptionLock.Secret_Code = "";
            vmEncryptionLock.Name = "";
            vmEncryptionLock.Is_Activate = "";
        }
    }
})

