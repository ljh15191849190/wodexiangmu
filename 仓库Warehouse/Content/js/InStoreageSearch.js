var vmInStoreage = new Vue({
    el: '#app',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        Storeage_Name: '',
        In_Storeage_Id: "",
        Product_Name: "",
        Refercnce_Goods_Locate_Id: "",
        Storeage_Id: "",
        Bill_Type: "",
        Create_Time: "",
        Corporation_Id: "",
        Corporation_Name: '',
        //型号规格
        Specificationresult: ["Product_Id", "Product_Name"],
        SpecificationfiledSearch: ["Product_Id", "Product_Name"],
        SpecificationmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        SpecificationinputField: ["Product_Id", "Product_Name"],
        //仓库
        Storeageresult: ["Storeage_Id", "Storeage_Name"],
        StoreagefiledSearch: ["Storeage_Id", "Storeage_Name"],
        StoreagemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        StoreageinputField: ["Storeage_Id", "Storeage_Name"],
        //公司
        Commanyresult: ["Company_Id", "Company_Name"],
        CommanyfiledSearch: ["Company_Id", "Company_Name"],
        CommanymainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CommanyinputField: ["Company_Id", "Company_Name"],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000004",
            System_Key: "Warehouse",
        },
        //表格查询url
        tableUrl: "../InStoreageWait/IntroduceInstoreageWait",
        //表格查询条件
        searchModel: {
            "Where_Parameter_List": [{
                Field_Name: "W_In_Storeage_Wait.Storeage_Id",
                Condition_Value1: PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Storeage_Id,
                Expression: "02",
                Module_Id: "Warehouse",
                Query_Type: "01"
            }]
        },
        selectRows: {},
        Changedata: {}
    },
    methods: {

        //保存菜单画面数据
        Add: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("IntroduceInStoreageList");
            vmInStoreage.selectRows = selectRow;
            //画面选择一条数据
            if (!selectRow.length > 0) {
                top.PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "Productupdata",
                title: '入库数量修改',
                width: "600px",
                height: "400px",
                btn: ['确定'],
                url: '/Warehouse/InStoreage/Change',
                callBack: function (iframeId) {
                    var changedata = PageCommon.ChildrenFrames(iframeId).In_Storeage_vue.Save();
                    console.log(changedata);
                    vmInStoreage.Changedata = changedata;
                }
            })



            //var flag = false;
            //if (selectRow.length > 1) {

            //    if (PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Commany_Id && PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Bill_Type) {

            //        for (var index = 0; index < selectRow.length; index++) {
            //            if (!(selectRow[index].Company_Id == PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Commany_Id && selectRow[index].Bill_Type == PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Bill_Type)) {
            //                flag = true;
            //            }
            //        }
            //    } else {
            //        for (var index = 1; index < selectRow.length; index++) {
            //            if (selectRow[index].Company_Id != selectRow[index - 1].Company_Id || selectRow[index].Bill_Type != selectRow[index - 1].Bill_Type) {
            //                flag = true;
            //            }

            //        }
            //    }

            //} else {
            //    if (PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Commany_Id && PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Bill_Type) {
            //        if (!(selectRow[0].Company_Id == PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Commany_Id && selectRow[0].Bill_Type == PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Bill_Type)) {
            //            flag = true;
            //        }

            //    } 
            //}
            //if (flag)
            //{
            //    top.PageCommon.ShowMessageRight("E2043");
            //    return false;
            //}
            //PageCommon.ModalClose()
            //return selectRow;

        },
        //查询部门名称
        Search: function () {

            vmInStoreage.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "InStoreageList" });
        },
        mClear: function () {
            this.productrange.first = '';
            this.productrange.second = '';
            $('#Big_Classify_Id').val(null).trigger('change');
            this.Package = '';
            $('#Material_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            this.Create_Time = '';
            this.Bill_Type = '';
            this.Storeage_Name = '';
            this.Refercnce_Goods_Locate_Id = '';
            this.Corporation_Name = '';
            $('#Inner_Radius').val(null);
            $('#Inner_Radius_second').val(null);
            $('#Outer_Radius').val(null);
            $('#Outer_Radius_second').val(null);
        },
    }
});