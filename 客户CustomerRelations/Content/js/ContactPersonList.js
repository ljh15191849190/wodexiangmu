
var vm_Contact = new Vue({
    el: '#apps',
    data: {
        //客户名称
        Customer_Id: '',
        //姓名
        Name: '',
        //联系方式
        Telephone: '',
        //手机
        Mobile_Phone: '',
        //地址
        Address_Gather: '',
        //邮箱
        Post_Code: '',
        //创建日期
        Create_Time:'',
        //客户名称查询显示
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerSearch: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //寄票信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000001",
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
        //设为默认
        Default: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ContacterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //判断是否为默认
            if (selectRow[0].Is_Default == '0') {
                PageCommon.ShowMessageRight("E2092");
                return;
            }
            PageCommon.SubmitForm({
                url: "SerDefault",
                param: { keyValue: [selectRow[0].Customer_Id, selectRow[0].Detail_Number] },
                success: function () {
                    PageCommon.RefreshTablePage("ContacterList");  //刷新数据
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
            var selectRow = PageCommon.GetTableSelectRow("ContacterList");
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
        ///作废
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ContacterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Is_Default == '0') {
                PageCommon.ShowMessageRight("E2090");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Invalid",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("ContacterList");  //刷新数据
                },
                close: true
            })
        },
        //编辑
        //Update: function () {
        //    //取得选择行数据
        //    var selectRow = PageCommon.GetTableSelectRow("ContacterList");
        //    //画面选择一条数据
        //    if (selectRow.length != 1) {
        //        PageCommon.ShowMessageRight("E2008");
        //        return;
        //    }
        //    if (selectRow[0].Is_Default != '0') {
        //        PageCommon.ShowMessageRight("E2089");
        //        return;
        //    }
        //    //详细画面更新跳转
        //    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        //},
        //导出
        Export: function (obj) {

            PageCommon.ModalExportOpen({
                tableName: 'C_Customer_Contacter',
                menu_Id: 'M000001',
                list_Id: 'ContacterList',
                systemKey: 'CustomerRelations',
                vm: vm_Contact
            })
        },
        //设置
        Set: function () {

        },
        //清空
        mClear: function () {
            vm_Contact.Customer_Id = "";
            $('#Customer_Id').val(null).trigger('change');
            vm_Contact.Name = "";
            vm_Contact.Telephone = "";
            vm_Contact.Mobile_Phone = "";
            vm_Contact.Address_Gather = "";
            vm_Contact.Post_Code = "";
            vm_Contact.Create_Time = "";

        },
        //查询
        Search: function (obj) {
            vm_Contact.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000001", List_Id: "ContacterList" });
        },
        //客户名称查询
        TemplateSelection01: function (data) {
            this.Customer_Id = data.Customer_Id;
        }
    }
});