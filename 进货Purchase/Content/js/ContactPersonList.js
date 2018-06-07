
var vm_Contact = new Vue({
    el: '#apps',
    data: {
        //供应商
        Supplier_Id: '',
        //姓名
        Name: '',
        //联系方式
        Telephone: '',
        //手机
        Mobile_Phone: '',
        //地址
        Address_Gather: '',
        //邮箱
        Email: '',
        //创建日期
        Create_Time:'',
        //供应商查询显示
        Supplierresult: ["Supplier_Id", "Supplier_Name"],
        SupplierSearch: ["Supplier_Id", "Supplier_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        SupplierinputField: ["Supplier_Id", "Supplier_Name"],
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {
            Where_Parameter_List: [{
                Field_Name: "B_Supplier.Is_Purchase",
                Contorl_Id: "Is_Purchase",
                Module_Id: "searchForm",
                Query_Type: "01",
                Expression: "02",
                Condition_Value1: "0"
            }]
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000017",
            System_Key: "Purchase"
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
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierContacterList");
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
                param: { keyValue: [selectRow[0].Supplier_Id, selectRow[0].Detail_Number] },
                success: function () {
                    PageCommon.RefreshTablePage("PurchaseSupplierContacterList");  //刷新数据
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
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierContacterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Supplier_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        ///作废
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierContacterList");
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
                url: "Delete",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("PurchaseSupplierContacterList");  //刷新数据
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
                tableName: 'B_Supplier_Contacter',
                menu_Id: 'M000008',
                list_Id: 'PurchaseSupplierContacterList',
                systemKey: 'Purchase',
                vm: vm_Contact
            })
        },
        //设置
        Set: function () {

        },
        //清空
        mClear: function () {
            vm_Contact.Supplier_Id = "";
            $('#Supplier_Id').val(null).trigger('change');
            vm_Contact.Name = "";
            vm_Contact.Telephone = "";
            vm_Contact.Mobile_Phone = "";
            vm_Contact.Address_Gather = "";
            vm_Contact.Email = "";
            vm_Contact.Create_Time = "";
            PageCommon.TableDefaultSort("PurchaseSupplierContacterList");
        },
        //查询
        Search: function (obj) {
            vm_Contact.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000017", List_Id: "PurchaseSupplierContacterList" });
            var postdata = {};
            postdata.Field_Name = "B_Supplier.Is_Purchase";
            postdata.Contorl_Id = "Is_Purchase";
            postdata.Module_Id = "searchForm";
            postdata.Query_Type = "01";
            postdata.Expression = "02";
            postdata.Condition_Value1 = "0";
            vm_Contact.searchModel.Where_Parameter_List.push(postdata);
        },
        //供应商名称查询
        TemplateSelection01: function (data) {
            this.Supplier_Id = data.Supplier_Id;
        }
    }
});