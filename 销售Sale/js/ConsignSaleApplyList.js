
    var vmConsignSaleApply = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            //型号规格
            Product_Name: '',
            //客户名称
            Customer_Id: '',
            //审批状态
            Approval_Status: '',
            //发票类型
            Invoice_Type: '',
            //税率
            Tax_Rate_Id: '',
            Tax_Rate: '',
            //合同日期
            Contract_Date: '',
            //运费支付
            Freight_Pay: '',
            //投保状态
            Insure_Status: '',
            //承运商
            Carrier_Id: '',
            //任务人
            Employee_Id: '',
            //任务人部门
            Department_Id: '',
            //运输方式
            Transportation_Way_Id: '',
            //品牌
            Brand_Name: '',
            //产品分类
            Product_Classify_Id: '',
            //产地名称
            Product_Area_Id: '',
            //油脂包装
            Package: '',
            //创建日期
            Create_Time:'',
            Arearesult: ["Product_Area_Id", "Product_Area_Name"],
            AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
            AreaInputField: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],



            //发票下拉框查询条件
            TaxWhere: [],
            //发票下拉框排序
            TaxOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC"
            }],
            //发票下拉框显示字段
            TaxResult: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
            //承运商下拉框查询条件
            CarrierWhere: [],
            //承运商下拉框排序
            CarrierOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC"
            }],
            //承运商下拉框显示字段
            CarrierResult: ["Carrier_Id", "Carrier_Name"],

            linkageTransportation: true,

            //运输方式下拉框显示字段
            TransportationResult: ["Transportation_Way_Id", "Transportation_Way_Name"],
            //运输方式下拉框查询条件
            TransportationWhere: [

            ],
            //运输方式字表查询条件
            TransportChild: [{
                Table_Name: "B_Transportation_Way",
                Primary_Key_Field: ["id"],
                Field_Name: ["Transportation_Way_Name"],
                Is_Name: "0",
                System_Key: "Sale"
            }],
            //运输方式下拉框排序
            TransportationOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC",
            }],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000008",
                System_Key: "Sale"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            childSearchModel: [{
                //子表关联主表的外键
                Field_Name: ["M_Consign_Sale_Apply_Detail.Consign_Sale_Apply_Id"],
                //父表主键
                Parent_Key: ["Consign_Sale_Apply_Id"],
                //子表格id
                Child_List: 'ConsignSaleApplyDetail',
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
            //承运商、运输方式联动选择
            ChangeCarrier: function (value) {
                if (value) {
                    vmConsignSaleApply.linkageTransportation = {};
                    vmConsignSaleApply.linkageTransportation.Field_Name = "Carrier_Id";
                    vmConsignSaleApply.linkageTransportation.Value1 = value.id;
                } else {
                    vmConsignSaleApply.linkageTransportation ='';
                }
            },
            pagetotalback: function (Field_Name, a, b) {

                //var vm = this;
                // if (Field_Name === "Tax_Rate") {
                //    return [PageCommon.NumberDispose(a, 6, 1), PageCommon.NumberDispose(b, 6, 1), 6];
                //}


            },
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Contract_Date") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
                if (Field_Name === "Create_Time") {
                   return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }
                if (Field_Name === "Tax_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, 6, 1);

                }

            },
            //子表格数字合计
            childtotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Consign_Sale_Count" || Field_Name === "Sale_Count" || Field_Name === "Turned_Sale_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }

                if (Field_Name === "Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Price_Tax_Amount") {

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
                if (Field_Name === "Storeage_Cost" || Field_Name === "Latest_Cost") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
                }
            },
            //子表格行初始化
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Delivery_Date") {
                    if (value) {
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
                //数量
                if (Field_Name === "Consign_Sale_Count" || Field_Name === "Sale_Count" || Field_Name === "Turned_Sale_Sum") {
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
                //YJ率
                if (Field_Name === "Commission_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.YJ_Rate_Decimal, this.globalParameter.TY_Digital_Cut_Way);
                }
                //库存利润率 期货利润率
                if ( Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
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
                if (Field_Name === "Price_Tax_Amount") {
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
                if (Field_Name === "Storeage_Cost" || Field_Name === "Latest_Cost") {
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
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //编辑
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ConsignSaleApplyList");
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

                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Consign_Sale_Apply_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("ConsignSaleApplyList");
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
                        PageCommon.RefreshTablePage("ConsignSaleApplyList");  //刷新数据
                    },
                    close: true
                })
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ConsignSaleApplyList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Consign_Sale_Apply_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

            },
            //审批意见
            ApprovalOpinion: function () {

            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ConsignSaleApplyList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Consign_Sale_Apply_Id + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //打印
            Print: function () {

            },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'M_Consign_Sale_Apply',
                    menu_Id: 'M000008',
                    list_Id: 'ConsignSaleApplyList',
                    systemKey: 'Sale',
                    vm: vmConsignSaleApply
                })
            },
            //设置
            Set: function () {

            },
            //查询
            Search: function () {

                vmConsignSaleApply.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000008", List_Id: "ConsignSaleApplyList" });

            },
            //清除
            mClear: function () {
                this.Customer_Id = '';
                this.Tax_Rate_Id = '';
                this.productrange.first = '';
                this.productrange.second = '';
                this.Invoice_Type = '';
                this.Employee_Id = '';
                this.Approval_Status = '';
                this.Contract_Date = '';
                this.Department_Id = '';
                this.Transportation_Way_Id = '';
                this.Freight_Pay = '';
                this.Carrier_Id = '';
                this.Insure_Status = '';
                this.Package = '';
                this.Brand_Name= '';
                this.Product_Classify_Id = '';
                this.Product_Area_Id = '';
                this.Create_Time = '';
                $('#Product_Area_Id').val(null).trigger('change');
          
                $('#Tax_Rate_Id').val(null).trigger('change');
                
                $('#Approval_Status').val(null).trigger('change');
                $('#Transportation_Way_Id').val(null).trigger('change');
                $('#Freight_Pay').val(null).trigger('change');
                $('#Carrier_Id').val(null).trigger('change');
                $('#Insure_Status').val(null).trigger('change');
                $('#Tax_Rate_Id').val(null).trigger('change');
                PageCommon.TableDefaultSort("ConsignSaleApplyList");
            }
        }
    });
