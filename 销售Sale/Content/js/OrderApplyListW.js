var searchData = {};
searchData.Where_Parameter_List = [];
var postdata = {};
postdata.Field_Name = "Is_Purchase";
postdata.Query_Type = "01";
postdata.Expression = "02";
postdata.Condition_Value1 = "1";
searchData.Where_Parameter_List.push(postdata);
var vmOrderApply = new Vue({
    el: '#apps',
    data: {
        //商品名称
        Product_Id: '',
        Productresult: ["Product_Id", "Product_Name"],
        ProductFiledSearch: ["Product_Id", "Product_Name"],
        ProductInputField: ["Product_Id", "Product_Name"],
        //品牌
        Brand_Name: '',
        Brandresult: ["Brand_Id", "Brand_Name"],
        BrandFiledSearch: ["Brand_Id", "Brand_Name"],
        BrandInputField: ["Brand_Id", "Brand_Name"],
        //任务人
        Employee_Id: '',
        Employeeresult: ["Employee_Id", "Name"],
        EmployeFiledSearch: ["Employee_Id", "Name"],
        EmployeInputField: ["Employee_Id", "Name"],
        //归属部门
        Department_Name: '',
        DepartmentdFiledSearch: ["Department_Id", "Department_Name"],
        Departmentdresult: ["Department_Id", "Department_Name"],
        DepartmentdInputField: ["Department_Id", "Department_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //创建人
        Create_User: '',
        //审核状态
        Approval_Status: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000004",
            System_Key: "Sale"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        childSearchModel: [{
            //子表关联主表的外键
            Field_Name: ["M_Order_Apply_Detail.Order_Apply_Id"],
            //父表主键
            Parent_Key: ["Order_Apply_Id"],
            //子表格id
            Child_List: 'OrderApplyDetail',
            //子表格查询地址
            Detail_Seach: 'DetailSeach',
            //默认显示在第3列
            Default_Child: "true"
        }],

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
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail_W");
        },
        //编辑
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OrderApplyList");
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

            window.location.href = PageCommon.SetUrlParameter("Detail_W", "relevantnumber=" + selectRow[0].Order_Apply_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                
        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("OrderApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Invalid",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("OrderApplyList");  //刷新数据
                },
                close: true
            })
        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OrderApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail_W", "relevantnumber=" + selectRow[0].Order_Apply_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        },
        //审批意见
        mApproval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OrderApplyList");
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
        //打印
        Print: function () {

        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'M_Order_Apply',
                menu_Id: 'M000004',
                list_Id: 'OrderApplyList',
                systemKey: 'Sale',
                vm: vmOrderApply
            })
        },
        //设置
        Set: function () {

        },
        //查询
        Search: function () {
            var postdata = {};
            postdata.Field_Name = "Is_Purchase";
            postdata.Query_Type = "01";
            postdata.Expression = "02";
            postdata.Condition_Value1 = "1";
            var searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000004", List_Id: "OrderApplyList" });
            searchModel.Where_Parameter_List.push(postdata);
            vmOrderApply.searchModel = searchModel;
        },
        //清除
        mClear: function () {
            this.Product_Id = '';
            this.Brand_Name = '';
            this.Employee_Id = '';
            this.Approval_Status = '';
            this.Create_User = '';
            this.Department_Name = '';
            $('#Product_Id').val(null).trigger('change');
            $('#Brand_Name').val(null).trigger('change');
            $('#Employee_Id').val(null).trigger('change');
            $('#Department_Name').val(null).trigger('change');
            $('#Approval_Status').val(null).trigger('change');
        }
    }
});
