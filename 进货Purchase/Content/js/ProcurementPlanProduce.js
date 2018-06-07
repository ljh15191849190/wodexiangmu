var Produce_vue = new Vue({
    el: '#app',
    data: {
        P_Purchase_Plan_Detail: {
            //型号
            Product_Purchase: '',
            Product_Id: '',
            //品牌
            Brand_Id: "",
            //产地
            Product_Area_Id: "",
            //TM
            Tm: "",
        },
        //产地查询条件
        address: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
        //品牌查询条件
        brand: {
            Menuresult: ["Brand_Id", "Brand_Name"],
            filedSearch: ["Brand_Id", "Brand_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Brand_Id", "Brand_Name"]
        },
        dequry_id: ''
    },
    mounted: function () {
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm7").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //保存
        save: function () {
            var that = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            if (that.P_Purchase_Plan_Detail.Product_Id || that.P_Purchase_Plan_Detail.Brand_Id || that.P_Purchase_Plan_Detail.Product_Area_Id || that.P_Purchase_Plan_Detail.Tm) {
                var searchModel = $("#searchForm7").GetSearchModel();
                searchModel.Where_Parameter_List.push({
                    "Field_Name": "B_Product.Product_Id",
                    "Contorl_Id": "Product_Id",
                    "Module_Id": "searchForm",
                    "Query_Type": "01",
                    "Expression": "04",
                    "Date_Format": null,
                    "Time_Format": null,
                    "Condition_Value1": "''" + that.P_Purchase_Plan_Detail.Product_Id + "''"
                });
                PageCommon.SubmitForm({
                    url: "SaveProcurementPlan",
                    param: { seachModel: searchModel },
                    success: function (data) {
                        that.dequry_id = data.Result_Model.Request_Object.Purchase_Plan_Id;
                        //关闭iframe窗
                        PageCommon.ModalClose();
                        //刷新表格数据
                        PageCommon.CurrentWindow().ProcurementPlan_vue.P_Purchase_Plan_Detail.Purchase_Plan_Id = that.dequry_id;
                        PageCommon.CurrentWindow().ProcurementPlan_vue.Search();
                    }
                });
            } else {
                PageCommon.ShowMessageRight("E2086");
                PageCommon.ModalClose();
            }
        },
        TemplateSelectionProduct: function (data) {
            var that = this;
            if (data) {
                that.P_Purchase_Plan_Detail.Product_Id = data.Product_Id;
            } else {
                that.P_Purchase_Plan_Detail.Product_Id = '';
            }
        }
    }
});