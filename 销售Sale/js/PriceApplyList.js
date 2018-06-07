
    //var searchData = {};
    //searchData.Where_Parameter_List = [];
    //var postdata = {};
    //postdata.Field_Name = "Is_Purchase";
    //postdata.Query_Type = "01";
    //postdata.Expression = "02";
    //postdata.Condition_Value1 = "1";
    //searchData.Where_Parameter_List.push(postdata);

    var vmPriceApply = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            productrange2: {
                first: "",
                second: ""
            },
            //型号规格
            Product_Name: '',

            //用户询价商品名
            User_Enqueriy_Product_Name: '',
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
            //客户
            Customer_Id: '',

            //任务人
            Employee_Id: '',

            //审核状态
            Approval_Status: '',
            //货源
            Goods_Apply: '',
            //运输方式
            Transportation_Way: '',
            //创建日期
            Create_Time: '',
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000002",
                System_Key: "Sale"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: { Where_Parameter_List: [{ Field_Name: "M_Price_Apply.Is_Purchase", Query_Type: "01", Expression: "02", Condition_Value1: "0" }] },
            childSearchModel: [{
                //子表关联主表的外键
                Field_Name: ["M_Price_Apply_Detail.Price_Apply_Id"],
                //父表主键
                Parent_Key: ["Price_Apply_Id"],
                //子表格id
                Child_List: 'PriceApplyDetail',
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
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if ( Field_Name === "Create_Time") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD hh:mm:ss');
                    }
                }
            },
            childtotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Apply_Count") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
                
                if (Field_Name === "Price_Tax_Sum" || Field_Name === "Total_Price" || Field_Name === "Customer_Receive_Price") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                if (Field_Name === "Price_Sum" ) {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Total_Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //YJ
                if (Field_Name === "Commission") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.YJ_Decimal, vm.globalParameter.TY_Digital_Cut_Way), vm.globalParameter.YJ_Decimal];
                }
                //税额
                if (Field_Name === "Tax") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
                //申请成本 最新成本
                if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
                }
                //净价
                if (Field_Name === "Net_Price") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
         
                }
            },
            //表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Delivery_Date") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
                //销售数量 退货数量
                if (Field_Name === "Apply_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
               
                //价税合计
                if (Field_Name === "Price_Tax_Sum" || Field_Name === "Total_Price" || Field_Name === "Customer_Receive_Price") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //YJ率
                if (Field_Name === "Commission_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.YJ_Rate_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                }
                //库存利润率 期货利润率
                if (Field_Name === "Storage_Rate" || Field_Name === "Futures_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
                }
                //单价总额
                if (Field_Name === "Price_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //价税总额
                if (Field_Name === "Total_Price_Tax_Sum") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                //YJ
                if (Field_Name === "Commission") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.YJ_Decimal, this.globalParameter.TY_Digital_Cut_Way);
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
                if (Field_Name === "Price"  || Field_Name === "Net_Price") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //编辑
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PriceApplyList");
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

                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Price_Apply_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                //window.location.href = PageCommon.SetUrlParameter("Detail");
            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("PriceApplyList");
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
                        PageCommon.RefreshTablePage("PriceApplyList");  //刷新数据
                    },
                    close: true
                })
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PriceApplyList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Price_Apply_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //审批意见
            ApprovalOpinion: function () {

            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PriceApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Price_Apply_Id + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //打印
            Print: function () {

            },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'M_Price_Apply',
                    menu_Id: 'M000002',
                    list_Id: 'PriceApplyList',
                    systemKey: 'Sale',
                    vm: vmPriceApply
                })
            },
            //设置
            Set: function () {

            },
            //查询
            Search: function () {
                var searchData = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "PriceApplyList" });
                searchData.Where_Parameter_List.push({ Field_Name: "M_Price_Apply.Is_Purchase", Query_Type: "01", Expression: "02", Condition_Value1: "0" });
                vmPriceApply.searchModel = searchData;
            },
            //清除
            mClear: function () {
                this.productrange.first = '';
                this.productrange.second = '';
                this.Customer_Id = '';
                this.productrange2.first = '';
                this.productrange2.second = '';
                this.Employee_Id = '';
                this.Approval_Status = '';
                this.Create_User = '';
                this.Goods_Apply = '';
                this.Apply_Price = '';
                this.Package = '';
                this.Brand_Name = '';
                this.Product_Classify_Id = '';
                this.Product_Area_Id = '';
                this.Create_Time = '';
                $('#Product_Name').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                $('#Customer_Id').val(null).trigger('change');
                $('#Quote_Product_Name').val(null).trigger('change');
                $('#Brand_Name').val(null).trigger('change');
                $('#User_Enqueriy_Product_Name').val(null).trigger('change');
                $('#Employee_Id').val(null).trigger('change');
                $('#Goods_Apply').val(null).trigger('change');
                $('#Approval_Status').val(null).trigger('change');
                PageCommon.TableDefaultSort("PriceApplyList");
            }
        }
    });
