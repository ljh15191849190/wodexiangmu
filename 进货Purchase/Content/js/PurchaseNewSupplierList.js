var searchData = {};
var newSupplierSearch = new Vue({
    el: '#apps',
    data: {
        //供应商申请单号
        Apply_Bill_Id: "",
        //供应商名称
        Supplier_Name: "",
        //审核状态
        Approval_Status: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000010",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //审核状态
        ExamineDictionaryKey: "APPROVAL_STATUS",
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
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "Chackrelevantnumber=" + selectRow[0].Supplier_Id + ',' + selectRow[0].Apply_Bill_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        ////提醒
        //Remind: function () {
        //    //取得选择行数据
        //    var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
        //    //画面选择一条数据
        //    if (selectRow.length != 1) {
        //        PageCommon.ShowMessageRight("E2008");
        //        return;
        //    }
        //    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Supplier_Id + ',' + selectRow[0].Apply_Bill_Id + '&sourcetype=2&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        //},
        ////审核
        //Check: function () {
        //    //取得选择行数据
        //    var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
        //    //画面选择一条数据
        //    if (selectRow.length != 1) {
        //        PageCommon.ShowMessageRight("E2008");
        //        return;
        //    }
        //    console.log(selectRow)
        //    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Supplier_Id + ',' + selectRow[0].Apply_Bill_Id + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        //},
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Supplier_Id + ',' + selectRow[0].Apply_Bill_Id + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面更新跳转
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Supplier_Id + ',' + selectRow[0].Apply_Bill_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //删除
        Delete: function () {
            var that = this;
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
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
                    PageCommon.RefreshTablePage("PurchaseSupplierApplyList");  //刷新数据
                },
                close: true
            })
        },
        ApprovalOpinion: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierApplyList");
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
            //PageCommon.ModalOpen({
            //    id: "SupplierInfo",
            //    title: '供应商资料',
            //    width: "900px",
            //    height: "600px",
            //    btn: [],
            //    url: '/Purchase/PurchaseSupplierSearch/SupplierInfo',
            //    callBack: function (iframeId) {
            //        PageCommon.ChildrenFrames(iframeId).vmImport.Import();
            //    }
            //})
        },
        Search: function (obj) {
            newSupplierSearch.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000009", List_Id: "PurchaseSupplierApplyList" });
        },
        mClear: function () {
            //供应商申请单号
            this.Apply_Bill_Id = '';
            this.Approval_Status = '';
            this.Supplier_Name = '';
            $('#Approval_Status').val(null).trigger('change');
            PageCommon.TableDefaultSort("PurchaseSupplierApplyList");
        }
    }
});