var send_vue = new Vue({
    el: '#apps',
    data: {
        //创建日期
        Create_Time: '',
        //客户名称
        Customer_Id: '',
        //收票人
        Name: '',
        //手机
        Mobile_Phone: '',
        //邮编
        Post_Code: '',
        //客户名称
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerfiledSearch: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        //地址
        Address_Gather: '',
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //寄票信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "CustomerRelations",
            List_Id: ""
        },
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
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Create_Time") {
                return moment(value).format('YYYY-MM-DD hh:mm:ss');
            }
         },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SendInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //新增
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //作废
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SendInvoiceList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Invalid",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("SendInvoiceList");  //刷新数据
                },
                close: true
            })
        },
        //编辑
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SendInvoiceList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        },
        //导出
        Export: function (obj) {

            PageCommon.ModalExportOpen({
                tableName: 'C_Customer_Send_Invoice',
                menu_Id: 'M000003',
                list_Id: 'SendInvoiceList',
                systemKey: 'CustomerRelations',
                vm: send_vue
            })
        },
        //设置
        Set: function () {


        },
        //清空
        mClear: function () {
            send_vue.Create_Time = "";
            send_vue.Customer_Id = "";
            send_vue.Address_Gather = '';
            $('#Customer_Id').val(null).trigger('change');
            send_vue.Receiver_Name = "";
            send_vue.Mobile_Phone = "";
            send_vue.Post_Code = "";

        },

        //查询
        Search: function () {
            send_vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000003", List_Id: "SendInvoiceList" });
        }
    }
});
