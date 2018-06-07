var ProcurementPlanStatus_vue = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        //是否显示分配按钮
        btnDistribute: true,
        //是否显示设置按钮
        btnSet: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000015",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "SeachStatusDetail",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        P_Purchase_Plan_Detail: {
            //单号
            Purchase_Plan_Id: '',
            //制单日期
            Create_Time: '',
            //创建员工
            Create_Employee_Name: '',
            //型号
            Product_Name: '',
            //品牌
            Brand_Name: '',
            //产地
            Product_Area_Name: "",
            //油脂包装
            Package: '',
            //品名
            Product_Classify_Name: '',
            //终定数
            Final_Count: ''
        },
        //产地查询条件
        area: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
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
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            if (Field_Name == "No_Sure_Count" || Field_Name == "Sure_Count" || Field_Name == "Bond_Area_Count" || Field_Name == "On_Sea_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way);
            }
        },
        //状态修改
        Distribute: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchasePlanDetailStatusList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "Distribute",
                title: '采购计划状态修改',
                width: "850px",
                height: "610px",
                btn: ["保存"],
                url: '/Purchase/ProcurementPlanStatus/Assigned?relevantnumber=' + selectRow[0].Purchase_Plan_Id + "," + selectRow[0].Detail_Number,
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).AssignedStatus_vue.Save()
                }
            })
        },
        //设置
        Set: function () {

        },
        //查询
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel();
            if (ProcurementPlanStatus_vue.P_Purchase_Plan_Detail.Final_Count) {
                var postdata = {};
                postdata.Field_Name = "P_Purchase_Plan_Detail.Final_Count";
                postdata.Contorl_Id = "Final_Count";
                postdata.Module_Id = "searchForm";
                postdata.Query_Type = "01";
                if (ProcurementPlanStatus_vue.P_Purchase_Plan_Detail.Final_Count == "01")
                    postdata.Expression = "08";
                else
                    postdata.Expression = "02";
                postdata.Condition_Value1 = "0";
                that.searchModel.Where_Parameter_List.push(postdata);
            }
        },
        //清除
        mClear: function () {
            this.P_Purchase_Plan_Detail.Purchase_Plan_Id = "";
            this.P_Purchase_Plan_Detail.Create_Time = "";
            this.P_Purchase_Plan_Detail.Create_Employee_Name = "";
            this.P_Purchase_Plan_Detail.Product_Name = "";
            this.P_Purchase_Plan_Detail.Brand_Name = "";
            this.P_Purchase_Plan_Detail.Final_Count = "";
            this.P_Purchase_Plan_Detail.Product_Classify_Name = "";
            this.P_Purchase_Plan_Detail.Product_Area_Name = "";
            this.P_Purchase_Plan_Detail.Package = "";
            $('#Product_Area_Name').val(null).trigger('change');
            PageCommon.TableDefaultSort("PurchasePlanDetailStatusList");
        },
        //父供应商返回函数
        TemplateSelection: function (data) {
            //this.B_Supplier.Supplier_Id = data.id;
        }
    }
});