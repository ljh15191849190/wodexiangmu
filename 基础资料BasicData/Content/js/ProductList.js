var vmProduct = new Vue({
    el: '#apps',
    data: {
        Delete_Reason: '',
        productrange: {
            first: "",
            second: ""
        },
        productrange2: '',
        Brand_Name: '',
        Create_Time: "",
        Product_Name: "",
        Big_Classify_Name: "",
        Package: "",
        Material_Id: "",
        Product_Area_Id: "",
        Pc: "",
        Tm: "",
        Production_Month: "",
        Inner_Radius: "",
        Outer_Radius: "",
        //产地下拉框排序
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        //材质下拉框排序
        MaterialOrder: [{}],
        MaterialResult: ["Material_Id", "Material_Name"],
        MaterialWhere: [],
        //型号规格
        Specificationresult: ["Product_Id", "Product_Name"],
        SpecificationfiledSearch: ["Product_Id", "Product_Name"],
        SpecificationmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        SpecificationinputField: ["Product_Id", "Product_Name"],
        childSearchModel: [
            {
                Field_Name: ["B_Product_Package_Relation.Product_Id"],
                Parent_Key: ["Product_Id"],
                Detail_Seach: 'DetailSeach',
                Child_List: 'ProductPackageRelationList',
                Default_Child: "false"
            }
        ],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000024",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        Outer: {
            first: "",
            second: ""
        },
        Inner: {
            first: "",
            second: ""
        },
        selectRow: [],
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
        childtotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Length" || Field_Name === "Width" || Field_Name === "High" || Field_Name === "Volume") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Lenght_Decimal, vm.globalParameter.Lenght_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Lenght_Decimal, vm.globalParameter.Lenght_Digital_Cut_Way), vm.globalParameter.Lenght_Decimal];
            }
            if (Field_Name === "Volume") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Volume_Decimal, vm.globalParameter.Volume_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Volume_Decimal, vm.globalParameter.Volume_Digital_Cut_Way), vm.globalParameter.Volume_Decimal];
            }
        },
        //表格行初始化
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Length" || Field_Name === "Width" || Field_Name === "High") {
                if (value) {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Lenght_Decimal, this.globalParameter.Lenght_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Volume") {
                if (value) {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Volume_Decimal, this.globalParameter.Volume_Digital_Cut_Way);
                }
            }
        },
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "The_Highest_Store" || Field_Name === "Box_Count" || Field_Name === "The_Lowest_Store") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way)];
            }
            if (Field_Name === "Price_Value1" || Field_Name === "Price_Value2" || Field_Name === "Price_Value3" || Field_Name === "Price_Value4" || Field_Name === "Price_Value5") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way)];
            }
            if (Field_Name === "Custom" || Field_Name === "Tax_Rate" || Field_Name === "Customs_Duty") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way)];
            }
            if (Field_Name === "Coefficient_Value1" || Field_Name === "Coefficient_Value2" || Field_Name === "Coefficient_Value3" || Field_Name === "Coefficient_Value4" || Field_Name === "Coefficient_Value5") {
                return [PageCommon.NumberDispose(a, 2, 1), PageCommon.NumberDispose(b, 2, 1)];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "The_Highest_Store" || Field_Name === "Box_Count" || Field_Name === "The_Lowest_Store") {
                if (value) {
                    if (value.toString().charAt(0) == '0') {
                        return '0';
                    } else {
                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                    }
                }
            }
            if (Field_Name === "Price_Value1" || Field_Name === "Price_Value2" || Field_Name === "Price_Value3" || Field_Name === "Price_Value4" || Field_Name === "Price_Value5") {
                if (value) {
                    if (value.toString().charAt(0) == '0') {
                        return '0';
                    } else {
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
            }
            if (Field_Name === "Custom" || Field_Name === "Tax_Rate" || Field_Name === "Customs_Duty") {
                if (value) {
                    if (value.toString().charAt(0) == '0') {
                        return '0';
                    } else {
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
            }
            if (Field_Name === "Coefficient_Value1" || Field_Name === "Coefficient_Value2" || Field_Name === "Coefficient_Value3" || Field_Name === "Coefficient_Value4" || Field_Name === "Coefficient_Value5") {
                if (value) {
                    if (value.toString().charAt(0) == '0') {
                        return '0';
                    } else {
                        return PageCommon.NumberDispose(value, 2, 1);
                    }
                }
            }

        },
        //查看
        CheckLook: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ProductList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Product_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        Relation: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ProductList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("LeadInQuery", "keyValue=" + selectRow[0].Product_Id);
        },
        //删除员工
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ProductList");
            //画面选择一条数据
            if (selectRow.length == 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: "0",
                success: function () {
                    PageCommon.RefreshTablePage("ProductList");  //刷新数据
                },
                close: true
            })
        },
        //修改部门名称
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ProductList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Product_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        Import: function () { },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Product',
                menu_Id: 'M000024',
                list_Id: 'ProductList',
                systemKey: 'BasicData',
                vm: vmProduct
            })
        },
        //部门设置
        Set: function () {

        },
        MUpdate: function () {
            PageCommon.ModalOpen({
                id: "ProductPackage",
                title: '批量修改',
                width: "285px",
                height: "250px",
                btn: ['修正'],
                url: '/BasicData/Product/Mupdate',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).mupdata_vue.Save();
                }
            })

        },
        Priceupdata: function () {
            //取得选择行数据
            vmProduct.selectRow = PageCommon.GetTableSelectRow("ProductList");
            //画面选择一条数据
            if (vmProduct.selectRow.length == 0) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            PageCommon.ModalOpen({
                id: "ProductPackage",
                title: '批量修改',
                width: "300px",
                height: "250px",
                btn: ['修正'],
                url: '/BasicData/Product/Priceupdata',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).Priceupdata_vue.Save();
                }
            })
        },
        //查询部门名称
        Search: function () {
            vmProduct.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000024", List_Id: "ProductList" });
        },
        mClear: function () {
            this.productrange.first = '';
            this.productrange.second = '';
            $('#Big_Classify_Name').val(null).trigger('change');
            this.Package = '';
            $('#Material_Id').val(null).trigger('change');
            $('#Product_Area_Id').val(null).trigger('change');
            this.Pc = '';
            this.Tm = '';
            this.Brand_Name = '';
            this.Production_Month = '';
            this.Create_Time = '';
            $('#Inner_Radius_SearchStart').val(null);
            $('#Inner_Radius_SearchEnd').val(null);
            $('#Outer_Radius_SearchStart').val(null);
            $('#Outer_Radius_SearchEnd').val(null);
        },
        TemplateSelection: function (data) {
            this.Product_Id = data.id;
            this.Product_Name = data.Product_Name || data.text;

        },
    }
});