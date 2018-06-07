 var OutInboundFormCancel_vue = new Vue({
        el: '#apps',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            globalParameter: PageCommon.GlobalParameter(),
            //子表格
            childSearchModel: [
               {
                   Field_Name: ["P_Purchase_Return.Purchase_Return_Id"],
                   Parent_Key: ["Purchase_Return_Id"],
                   Child_List: 'OutInboundFormCancelDetailList',
                   Detail_Seach: 'DetailSeach',
                   Default_Child: "true",
               }
            ],
            //是否显示生成采购按钮
            btnNew: true,
            //是否显示修改按钮
            btnEdit: true,
            //是否显示审核按钮
            btnApproval: true,
            //是否显示删除按钮
            btnDelete: true,
            //是否显示审批意见按钮
            btnApprovalOpinion: false,
            //是否显示设置按钮
            btnSet: true,
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000011",
                System_Key: "Purchase"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //表格查询条件
            P_Purchase_Return: {
                //单号
                Purchase_Return_Id: "",
                //日期
                Create_Time: "",
                //供应商
                Supplier_Name: "",
                //审核状态
                Approval_Status: "",
                //创建员工
                Create_Employee_Name: "",
                //部门
                Create_Department_Name: "",
                //型号
                Product_Name: "",
                //库房
                Storeage_Name: "",
                //品牌
                Brand_Name: "",
                //油脂包装
                Package: "",
                //品名
                Product_Classify_Name: '',
                //产地
                Product_Area_Id: "",
                //进货单号
                Purchase_Bill_Id: ""
            },
            //产地查询条件
            area: {
                Menuresult: ["Product_Area_Id", "Product_Area_Name"],
                filedSearch: ["Product_Area_Id", "Product_Area_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Product_Area_Id", "Product_Area_Name"]
            },
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
            //子表格合计数字格式化
            childtotalback: function (Field_Name, a, b) {
                if (Field_Name == "Return_Goods_Count" || Field_Name == "This_Return_Goods_Count") {
                    return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
                }
            },
            //子表格行初始化事件
            childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name == "Return_Goods_Count" || Field_Name == "This_Return_Goods_Count") {
                    if (parseInt(value) == 0) {
                        return '0';
                    } else if (!value) {
                        return '';
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            },
            //导出
            Export: function (obj) {
                //PageCommon.ModalExportOpen({
                //    tableName: 'S_Menu',
                //    menu_Id: 'M000001',
                //    list_Id: 'MenuList',
                //    systemKey: 'SystemSet',
                //    vm: Orderform_vue
                //})
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //编辑
            Edit: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("OutInboundFormCancelList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Return_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("OutInboundFormCancelList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Purchase_Return_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //删除
            Delete: function () {
                var that = this;
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("OutInboundFormCancelList");
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
                        PageCommon.RefreshTablePage("OutInboundFormCancelList");  //刷新数据
                    },
                    close: true
                })
            },
            //设置
            Set: function () {

            },
            //查询
            Search: function () {
                var that = this;
                that.searchModel = $("#searchForm").GetSearchModel();
            },
            //清除
            mClear: function () {
                this.P_Purchase_Return.Purchase_Return_Id = "";
                this.P_Purchase_Return.Purchase_Bill_Id = "";
                this.P_Purchase_Return.Create_Time = "";
                this.P_Purchase_Return.Supplier_Name = "";
                this.P_Purchase_Return.Approval_Status = "";
                this.P_Purchase_Return.Create_Employee_Name = "";
                this.P_Purchase_Return.Create_Department_Name = "";
                this.P_Purchase_Return.Product_Name = "";
                this.P_Purchase_Return.Brand_Name = "";
                this.P_Purchase_Return.Package = "";
                this.P_Purchase_Return.Product_Area_Id = "";
                this.P_Purchase_Return.Storeage_Name = "";
                this.P_Purchase_Return.Product_Classify_Name = "";
                $('#Approval_Status').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                PageCommon.TableDefaultSort("OutInboundFormCancelList");
            },
        }
    });