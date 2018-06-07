function mDetail(Purchase_Plan_Id, Detail_Number) {
    PageCommon.ModalOpen({
        id: "question_detail",
        title: '问题信息',
        width: "600px",
        height: "450px",
        btn: [],
        url: '/Purchase/ProcurementPlan/Question?islook=true' + '&Purchase_Plan_Id=' + Purchase_Plan_Id + '&Detail_Number=' + Detail_Number,
        callBack: function (iframeId) {

        }
    })
}
var ProcurementPlan_vue = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        //子表格
        childSearchModel: [
           {
               Field_Name: ["P_Order_Apply_Purchase_Plan.Purchase_Plan_Id", "P_Order_Apply_Purchase_Plan.Purchase_Plan_Detail_Number"],
               Parent_Key: ["Purchase_Plan_Id", "Detail_Number"],
               Child_List: 'PurchasePlanApplyDetailList',
               Detail_Seach: 'SeachApplyCount',
               Default_Child: "false",
           },
           {
               Field_Name: ["P_Purchase_Plan_Distribute.Purchase_Plan_Id", "P_Purchase_Plan_Distribute.Purchase_Plan_Detail_Number"],
               Parent_Key: ["Purchase_Plan_Id", "Detail_Number"],
               Child_List: 'PurchasePlanDistributeDetailList',
               Detail_Seach: 'SeachFinaCount',
               Default_Child: "false",
           }
        ],
        //是否显示生成采购按钮
        btnNew: true,
        //是否显示分配按钮
        btnDistribute: true,
        //是否显示删除按钮
        btnDelete: true,
        //是否显示提交按钮
        btnSubmit: true,
        //是否显示审核按钮
        btnApproval: true,
        //是否显示审批意见按钮
        btnApprovalOpinion: false,
        //是否显示设置按钮
        btnSet: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000013",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "Seach",
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
            //终定数
            Final_Count: '',
            //产地
            Product_Area_Name: "",
            //油脂包装
            Package: '',
            //品名
            Product_Classify_Name: ''
        },
        //产地查询条件
        area: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
        //生成采购计划
        dmake: false,
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
            if (Field_Name === "Apply_Count" || Field_Name === "Supplement_Count" || Field_Name === "Final_Count") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), that.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Include_Tax_Amount") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "No_Include_Tax_Amount") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Item_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting, Child_List) {
            var that = this;
            var html = "<a type ='button' href='javascript:;' onclick=\"mDetail('" + rowData.Purchase_Plan_Id + "','" + rowData.Detail_Number + "')\">查看</a>"
            if (Field_Name == "Problem_Explanation") {
                return html;
            }
            if (Field_Name == "Supplement_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name === "Include_Tax_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "No_Include_Tax_Amount") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name == "Apply_Count" || Field_Name == "Final_Count") {
                if (Child_List) {
                    if (value.charAt(0) == '0' || value == '') {
                        return '0' + '<span class="details-control pull-right" Child_List="' + Child_List + '"></span>';
                    } else {
                        return PageCommon.NumberDispose(value, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way) + '<span class="details-control pull-right" Child_List="' + Child_List + '"></span>';
                    }
                }
            }
        },
        //子表格合计数字格式化
        childtotalback: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name === "Apply_Count" || Field_Name === "Distribute_Count") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way), that.globalParameter.Count_Decimal];
            }
            if (Field_Name == "Price_Tax_Sum" || Field_Name === "Include_Tax_Amount") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
            if (Field_Name === "No_Include_Tax_Amount") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Other_Item_Decimal];
            }
        },
        //子表格行初始化事件
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            if (Field_Name == "Latest_Price" || Field_Name == "Standard_Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name == "Apply_Count" || Field_Name == "Distribute_Count" || Field_Name == "Order_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Count_Decimal, that.globalParameter.Count_Digital_Cut_Way);
            }
            if (Field_Name == "Price_Tax_Sum" || Field_Name === "Include_Tax_Amount" || Field_Name == "Lastest_Price_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Tax_Price_Total_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
            if (Field_Name === "No_Include_Tax_Amount"|| Field_Name == "Latest_Price_No_Include_Tax") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, that.globalParameter.Other_Item_Decimal, that.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //生成采购计划
        New: function () {
            var that = this;
            that.dmake = true;
            PageCommon.ModalOpen({
                id: "MakePlan",
                title: '生成采购计划',
                width: "550px",
                height: "400px",
                btn: ["确定"],
                url: '/Purchase/ProcurementPlan/Produce',
                callBack: function (iframeId) {
                    //调用系统管理详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).Produce_vue.save();
                }
            })
        },
        //分配
        Distribute: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchasePlanDetailList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "Distribute",
                title: '供应商分配',
                width: "900px",
                height: "500px",
                btn: ["保存"],
                url: '/Purchase/ProcurementPlan/Assigned?relevantnumber=' + selectRow[0].Purchase_Plan_Id + "," + selectRow[0].Detail_Number,
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).Assigned_vue.Save()
                }
            })
        },
        //删除
        Delete: function () {
            var that = this;
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchasePlanDetailList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03' || selectRow[0].Approval_Status == '04') {
                PageCommon.ShowMessageRight("E2084");
                return;
            }
            PageCommon.SubmitDetialForm({
                url: "DeletePurchasePlanDetail",
                param: selectRow,
                type: "0",
                success: function () {
                    PageCommon.RefreshTablePage("PurchasePlanDetailList");  //刷新数据
                },
                close: true
            })
        },
        //提交
        Submit: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchasePlanDetailList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            if (selectRow[0].Approval_Status == "02") {
                PageCommon.ShowMessageRight("E2082");
                return;
            }
            if (parseFloat(selectRow[0].Final_Count) < 0 || parseFloat(selectRow[0].Final_Count) == 0) {
                PageCommon.ShowMessageRight("I3076");
                return;
            }
            PageCommon.SubmitForm({
                url: "SubmitPurchasePlanDetail",
                param: selectRow[0],
                success: function () {
                    PageCommon.RefreshTablePage("PurchasePlanDetailList");  //刷新数据
                },
                close: true
            })
        },
        //审核
        Approval: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchasePlanDetailList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            if (selectRow[0].Approval_Status == "01" || selectRow[0].Approval_Status == "03") {
                PageCommon.ShowMessageRight("E2083");
                return;
            }

            PageCommon.SubmitForm({
                url: "ApprovePurchasePlanDetail",
                param: selectRow[0],
                success: function () {
                    PageCommon.RefreshTablePage("PurchasePlanDetailList");  //刷新数据
                },
                close: true
            })
        },
        //审批意见
        ApprovalOpinion: function () {

        },
        //设置
        Set: function () {

        },
        //查询
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel();
            if (ProcurementPlan_vue.P_Purchase_Plan_Detail.Final_Count) {
                var postdata = {};
                postdata.Field_Name = "P_Purchase_Plan_Detail.Final_Count";
                postdata.Contorl_Id = "Final_Count";
                postdata.Module_Id = "searchForm";
                postdata.Query_Type = "01";
                if (ProcurementPlan_vue.P_Purchase_Plan_Detail.Final_Count == "01")
                    postdata.Expression = "08";
                else
                    postdata.Expression = "02";
                postdata.Condition_Value1 = "0";
                that.searchModel.Where_Parameter_List.push(postdata);
            }
            if (that.dmake && that.P_Purchase_Plan_Detail.Purchase_Plan_Id) {
                var postdata = {};
                postdata.Field_Name = "P_Purchase_Plan_Detail.Purchase_Plan_Id";
                postdata.Contorl_Id = "Purchase_Plan_Id";
                postdata.Module_Id = "searchForm";
                postdata.Query_Type = "01";
                postdata.Expression = "01";
                postdata.Condition_Value1 = that.P_Purchase_Plan_Detail.Purchase_Plan_Id;
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
            PageCommon.TableDefaultSort("PurchasePlanDetailList");
        }
    }
});