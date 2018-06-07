
    var vmSaleReturnOrder = new Vue({
        el: '#apps',
        data: {
            //任务人
            Employee_Id: '',
            //任务人部门
            Department_Name: '',
            //退货日期
            Return_Goods_Date: '',
            //入库状态
            Out_Storeage_Status: '',
            //审批状态
            Approval_Status: '',
            //客户
            Customer_Id: '',
            //品牌
            Brand_Name: '',
            //产品分类
            Product_Classify_Id: '',
            //产地名称
            Product_Area_Id: '',
            //油脂包装
            Package: '',
            //创建日期
            Create_Time: '',
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            Arearesult: ["Product_Area_Id", "Product_Area_Name"],
            AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
            AreaInputField: ["Product_Area_Id", "Product_Area_Name"],
            productrange: {
                first: "",
                second: ""
            },
            //型号规格
            Product_Name: '',

            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000007",
                System_Key: "Sale"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            childSearchModel: [{
                //子表关联主表的外键
                Field_Name: ["M_Sale_Return_Goods_Detail.Sale_Return_Goods_Id"],
                //父表主键
                Parent_Key: ["Sale_Return_Goods_Id"],
                //子表格id
                Child_List: 'SaleReturnDetail',
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
            //子表格数字合计
            childtotalback: function (Field_Name, a, b) {
                var vm = this;

                if (Field_Name === "This_Return_Count" || Field_Name === "Allow_Return_Goods_Count") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
            },
            //子表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                
                if (Field_Name === "This_Return_Count" || Field_Name === "Allow_Return_Goods_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }

            },
            //数字合计
            pagetotalback: function (Field_Name, a, b) {
                
                var vm = this;
                if (Field_Name === "Return_Goods_Sum_Count") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }

            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Return_Goods_Date") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
                if (Field_Name === "Create_Time") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD hh:mm:ss');
                    }
                }
                if (Field_Name === "Return_Goods_Sum_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }

            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //编辑
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleReturnList");
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

                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Return_Goods_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleReturnList");
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
                        PageCommon.RefreshTablePage("SaleReturnList");  //刷新数据
                    },
                    close: true
                })
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleReturnList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Return_Goods_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //审批意见
            ApprovalOpinion: function () {

            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("SaleReturnList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Sale_Return_Goods_Id + ',' + selectRow[0].Customer_Id + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //打印
            Print: function () {

            },
            //导入
            Import: function (obj) {
                PageCommon.ModalImportOpen({
                    tableName: "M_Sale_Return_Goods",
                    systemKey: "Sale",
                    vm: vmSaleReturnOrder
                })
            },
            //导入结果
            ImportResult: function (objectModel, objectModelList) {
            },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'M_Sale_Return_Goods',
                    menu_Id: 'M000007',
                    list_Id: 'SaleReturnList',
                    systemKey: 'Sale',
                    vm: vmSaleReturnOrder
                })
            },
            //设置
            Set: function () {

            },
            //查询
            Search: function () {
                vmSaleReturnOrder.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000007", List_Id: "SaleReturnList" });
            },
            //清除
            mClear: function () {
                this.productrange.first = '';
                this.productrange.second = '';
                this.Department_Name = '';
                this.Employee_Id = '';
                this.Approval_Status = '';
                this.Customer_Id = '';
                this.Return_Goods_Date = '';
                this.Out_Storeage_Status = '';
                this.Package = '';
                this.Brand_Name = '';
                this.Product_Classify_Id = '';
                this.Product_Area_Id = '';
                this.Create_Time = '';
                $('#Product_Name').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                $('#Department_Name').val(null).trigger('change');
                $('#Employee_Id').val(null).trigger('change');
                $('#Approval_Status').val(null).trigger('change');
                $('#Customer_Id').val(null).trigger('change');
                $('#Out_Storeage_Status').val(null).trigger('change');
                PageCommon.TableDefaultSort("SaleReturnList");

            }
        }
    });
