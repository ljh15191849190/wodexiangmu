var SupplierfilingChange = new Vue({
    el: '#apps',
    data: {
        //供应商变更单号
        Alter_Apply_Id: "",
        //供应商名称
        Supplier_Name: "",
        //审核状态
        Approval_Status: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000017",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "SeachAlter",
        //表格查询条件
        searchModel: {
            Where_Parameter_List: [{
                Field_Name: "B_Supplier_Alter_Apply.Is_Purchase",
                Contorl_Id: "Is_Purchase",
                Module_Id: "searchForm",
                Query_Type: "01",
                Expression: "02",
                Condition_Value1: "0"
            }]
        },
        //子表格
        childSearchModel: [
           {
               Field_Name: ["B_Supplier_Alter_History.Alter_History_Id"],
               Parent_Key: ["Alter_History_Id"],
               Child_List: 'SupplierAlterHistoryList',
               Detail_Seach: 'SeachAlterHistory',
               Default_Child: "true",
           }
        ],
        //审核状态
        ExamineDictionaryKey: "APPROVAL_STATUS",
        globalParameter: PageCommon.GlobalParameter()
    },
    mounted: function () {
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });

        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //父表格合计数字格式化
        pagetotalback: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name === "Goods_Payment_Balance" || Field_Name === "All_Balance" || Field_Name === "Advance_Payment") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Money_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            if (Field_Name === "Goods_Payment_Balance" || Field_Name === "All_Balance" || Field_Name === "Advance_Payment") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //查看历史
        LookHistroy: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SupplierAlterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "SupplierHistroyChangeInfo",
                title: '供应商历史更改信息',
                width: "900px",
                height: "600px",
                btn: [],
                url: '/Purchase/SupplierfilingChange/Histroy',
                urlparameter: "keyValue=" + selectRow[0].Supplier_Id,
                callBack: function (iframeId) {
                }
            })
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SupplierAlterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Alter_Apply_Id + '&sourcetype=0&isedit=1&sourcelist=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SupplierAlterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == "01" || selectRow[0].Approval_Status == "03") {
                PageCommon.ShowMessageRight("E2083");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Alter_Apply_Id + '&sourcetype=1&isedit=1&sourcelist=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面更新跳转
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SupplierAlterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03') {
                PageCommon.ShowMessageRight("E2041");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Alter_Apply_Id + '&sourcetype=0&isedit=0&sourcelist=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //删除
        Delete: function () {
            var that = this;
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("SupplierAlterList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03' || selectRow[0].Approval_Status == '04') {
                PageCommon.ShowMessageRight("E2084");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: "0",
                success: function () {
                    PageCommon.RefreshTablePage("SupplierAlterList");  //刷新数据
                },
                close: true
            })
        },
        ApprovalOpinion: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("SupplierAlterList");
            console.log(selectRow)
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '01') {
                PageCommon.ShowMessageRight("E2042");
                return;
            }
        },
        Search: function (obj) {
            SupplierfilingChange.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000009", List_Id: "PurchaseSupplierApplyList" });
        },
        mClear: function () {
            //供应商申请单号
            this.Alter_Apply_Id = '';
            this.Approval_Status = '';
            this.Supplier_Name = '';
            $('#Approval_Status').val(null).trigger('change');
            PageCommon.TableDefaultSort("SupplierAlterList");
        }
    }
});