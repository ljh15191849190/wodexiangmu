
var Receiver_vue = new Vue({
    el: '#apps',
    data: {
        //客户名称
        Customer_Id: '',
        //姓名
        Name: '',
        //联系方式
        Telephone: '',
        //电话
        Mobile_Phone: '',
        //地址
        Address_Gather: '',
        //创建时间
        Create_Time:"",

        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "CustomerRelations",
            List_Id: ""
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
       //设为默认
        Default: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ReceiverList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //判断是否为默认
            if (selectRow[0].Is_Default == '0') {
                PageCommon.ShowMessageRight("E2093");
                return;
            }
            PageCommon.SubmitForm({
                url: "SerDefault",
                param: { keyValue: [selectRow[0].Customer_Id, selectRow[0].Detail_Number] },
                success: function () {
                    PageCommon.RefreshTablePage("ReceiverList");  //刷新数据
                },
               
            })

        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Create_Time") {
                return moment(value).format('YYYY-MM-DD hh:mm:ss');
            }
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ReceiverList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        ///删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ReceiverList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Is_Default == '0') {
                PageCommon.ShowMessageRight("E2088");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Invalid",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("ReceiverList");  //刷新数据
                },
                close: true
            })
        },
        //编辑
        //Update: function () {
        //    //取得选择行数据
        //    var selectRow = PageCommon.GetTableSelectRow("ReceiverList");

        //    //画面选择一条数据
        //    if (selectRow.length != 1) {
        //        PageCommon.ShowMessageRight("E2008");
        //        return;
        //    }
        //    if (selectRow[0].Is_Default == '0') {
        //        PageCommon.ShowMessageRight("E2091");
        //        return;
        //    }
        //    //详细画面更新跳转
        //    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        //},
        //导出
        Export: function (obj) {

            PageCommon.ModalExportOpen({
                tableName: 'C_Customer_Receiver',
                menu_Id: 'M000002',
                list_Id: 'ReceiverList',
                systemKey: 'CustomerRelations',
                vm: Receiver_vue
            })
        },
        //设置
        Set: function () {

        },
        //查询
        Search: function (obj) {
             Receiver_vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "ReceiverList" });
        },
        //清空
        mClear: function () {
            Receiver_vue.Customer_Id = "";
            $('#Customer_Id').val(null).trigger('change');
            Receiver_vue.Name = "";
            Receiver_vue.Telephone = "";
            Receiver_vue.Mobile_Phone = "";
            Receiver_vue.Address = "";
            Receiver_vue.Create_Time = "";

        },

    }
});