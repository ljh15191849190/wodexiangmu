
    var searchData = {};
searchData.Where_Parameter_List = [];
var postdata = {};
postdata.Field_Name = "M_Order_Apply.Is_Purchase";
postdata.Query_Type = "01";
postdata.Expression = "02";
postdata.Condition_Value1 = "1";
searchData.Where_Parameter_List.push(postdata);
var vmOrderApply = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        //型号规格
        Product_Name: '',
        //品牌
        Brand_Name: '',
        //产品分类
        Product_Classify_Id: '',
        //产地名称
        Product_Area_Id: '',
        Arearesult: ["Product_Area_Id", "Product_Area_Name"],
        AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
        AreaInputField: ["Product_Area_Id", "Product_Area_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //油脂包装
        Package: '',
        //任务人
        Employee_Id: '',

        //归属部门
        Department_Name: '',

        //审核状态
        Approval_Status: '',
        //创建日期
        Create_Time:'',
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
        //位数cookie
        globalParameter: {}
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
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
                if (value) {
                    return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }
            }
        },
        //子表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            //销售数量 退货数量
            if (Field_Name === "Apply_Count" || Field_Name === "Cancel_Count" || Field_Name === "Predistribution_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }

            //价税合计
            if (Field_Name === "Price_Tax_Sum") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }

            //库存利润率 期货利润率
            if (Field_Name === "CY_Profit_Rate_Apply" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }


            //税额
            if (Field_Name === "Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
            }
            //单价
            if (Field_Name === "Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //子表格数字合计
        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Apply_Count" || Field_Name === "Cancel_Count" || Field_Name === "Predistribution_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            //价税合计
            if (Field_Name === "Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }

            //价税总额
            if (Field_Name === "Total_Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
            }
            //CY利润率_库 CY利润率_期
            if (Field_Name === "CY_Profit_Rate_Apply" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            //申请成本 最新含税成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }

        },
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
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03' || selectRow[0].Approval_Status == '04') {
                PageCommon.ShowMessageRight("E2084");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: '0',
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
        ApprovalOpinion: function () {

        },
        //审核
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("OrderApplyList");
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
            window.location.href = PageCommon.SetUrlParameter("Detail_W", "relevantnumber=" + selectRow[0].Order_Apply_Id + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
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
            postdata.Field_Name = "M_Order_Apply.Is_Purchase";
            postdata.Query_Type = "01";
            postdata.Expression = "02";
            postdata.Condition_Value1 = "1";
            var searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000004", List_Id: "OrderApplyList" });
            searchModel.Where_Parameter_List.push(postdata);
            vmOrderApply.searchModel = searchModel;
        },
        //清除
        mClear: function () {
            this.productrange.first = '';
            this.productrange.second = '';
            this.Employee_Id = '';
            this.Approval_Status = '';
            this.Department_Name = '';
            this.Package = '';
            this.Brand_Name = '';
            this.Product_Classify_Id = '';
            this.Product_Area_Id = '';
            this.Create_Time = '';
            $('#Product_Area_Id').val(null).trigger('change');
            $('#Product_Id').val(null).trigger('change');
            $('#Brand_Name').val(null).trigger('change');
            $('#Employee_Id').val(null).trigger('change');
            $('#Department_Name').val(null).trigger('change');
            $('#Approval_Status').val(null).trigger('change');
            PageCommon.TableDefaultSort("OrderApplyList");
        }
    }
});
