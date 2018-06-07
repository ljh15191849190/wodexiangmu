  var vmProductPrice = new Vue({
        el: '#apps',
        data: {
            //成本价
            Latest_Price:"",
            Product_Id:"",
            Product_Name: "",
            Brand_Name: "",
            Brand_Short_Name:"",
            Product_Classify_Name: "",
            Package: "",
            Material_Id: "",
            Product_Area_Id: "",
            Pc: "",
            Tm: "",
            Production_Month: "",
            Standard_Price: '',
            Price_Difference:'',
            //分类下拉框排序
            ClassifyOrder: [{ }],
            ClassifyResult: ["Product_Classify_Id", "Product_Classify_Name"],
            ClassifyWhere: [],
            //产地下拉框排序
            AreaOrder: [{ }],
            AreaResult: ["Product_Area_Id", "Product_Area_Name"],
            AreaWhere: [],
            //材质下拉框排序
            MaterialOrder: [{}],
            MaterialResult: ["Material_Id", "Material_Name"],
            MaterialWhere: [],
            //品牌规格
            Brandresult: ["Brand_Id", "Brand_Name"],
            BrandfiledSearch: ["Brand_Id", "Brand_Name"],
            BrandmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            BrandinputField: ["Brand_Id", "Brand_Name"],

         
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000025",
                System_Key: "BasicData"
            },
            //表格查询url
            tableUrl: "Seach",
            //价格区分
            Price_DifferenceDictionaryKey:"PRICE_TAG",
            //表格查询条件
            searchModel: {},
            Inner: {
                first: "",
                second: ""
            },
            productrange: {
                first: "",
                second: ""
            },
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
            pagetotalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Order_Count") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
                if (Field_Name === "Price" || Field_Name === "Standard_Price" || Field_Name === "Latest_Price" || Field_Name === "Price_Value1" || Field_Name === "Price_Value2" || Field_Name === "Price_Value3" || Field_Name === "Price_Value4" || Field_Name === "Price_Value5") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
                if (Field_Name === "Lastest_Price_Include_Tax" || Field_Name === "Latest_Price_No_Include_Tax") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                if (Field_Name === "Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                if (Field_Name === "Custom" || Field_Name === "Customs_Duty" || Field_Name === "Exponse") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Other_Money_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Other_Money_Decimal];
                }
              
                if (Field_Name === "Coefficient_Value1" || Field_Name === "Coefficient_Value2" || Field_Name === "Coefficient_Value3" || Field_Name === "Coefficient_Value4" || Field_Name === "Coefficient_Value5") {
                    return [PageCommon.NumberDispose(a, 2, 1) , PageCommon.NumberDispose(b, 2, 1)];
                }
            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Tax_Rate") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, 6, 1);

                }
                if (Field_Name === "Order_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }

                if (Field_Name === "Price" || Field_Name === "Standard_Price" || Field_Name === "Latest_Price" || Field_Name === "Price_Value1" || Field_Name === "Price_Value2" || Field_Name === "Price_Value3" || Field_Name === "Price_Value4" || Field_Name === "Price_Value5") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Lastest_Price_Include_Tax" || Field_Name === "Latest_Price_No_Include_Tax") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Price_Tax_Sum") {

                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
                if (Field_Name === "Custom" || Field_Name === "Customs_Duty" || Field_Name === "Exponse") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
              
                if (Field_Name === "Coefficient_Value1" || Field_Name === "Coefficient_Value2" || Field_Name === "Coefficient_Value3" || Field_Name === "Coefficient_Value4" || Field_Name === "Coefficient_Value5") {
                    return PageCommon.NumberDispose(value, 2, 1);
                }
            },
            //详细画面新增跳转
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
          
            //删除员工
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("ProductPriceDetailList");

                //调用删除共同方法
                PageCommon.SubmitDetialForm({
                    url: "Delete",
                    param: selectRow,
                    success: function () {
                        PageCommon.RefreshTablePage("ProductPriceDetailList");  //刷新数据
                    },
                    close: true
                })
            },
            //修改部门名称
            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ProductPriceDetailList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //详细画面更新跳转
                window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + selectRow[0].Product_Id);
            },
            //导出
            Export: function (obj) {
                PageCommon.ModalExportOpen({
                    tableName: 'B_Product_Price',
                    menu_Id: 'M000025',
                    list_Id: 'ProductPriceDetailList',
                    systemKey: 'BasicData',
                    vm: vmProductPrice
                })
            },
            //部门设置
            Set: function () {

            },
            MUpdate: function () {

                var selectRow = PageCommon.GetTableSelectRow("ProductPriceDetailList");
                if (selectRow.length == 0) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                if (selectRow) {
                    var index = PageCommon.OpenWindowDiv({
                        id: 'deletereason',
                        content: $("#deletereason"),
                        title: '批量修改成本价',
                        width: "340px",
                        height: "200px",
                        btn: ["确定", "关闭"],
                        callBack: function () {
                            $.each(selectRow, function (index, item) {
                                item.Latest_Price = parseFloat(item.Latest_Price) * (1 + parseFloat(vmProductPrice.Latest_Price)/100);

                            })
                            PageCommon.SubmitForm({
                                url: "BatchEditProductPriceDetail",
                                param: {objList: selectRow},
                                success: function () {
                                    layer.close(index);
                                    PageCommon.RefreshTablePage("ProductPriceDetailList");  //刷新数据
                                },
                             //   close: true
                            })
                        }
                    })

                }
            },
            //查询部门名称
            Search: function () {
                vmProductPrice.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000025", List_Id: "ProductPriceDetailList" });
            },
            mClear: function () {
                this.productrange.first = '';
                this.productrange.second = '';
                $('#Big_Classify_Name').val(null).trigger('change');
                $('#Brand_Name').val(null).trigger('change');
                $('#Material_Id').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                this.Package = '';
                $('#Price_Difference').val(null).trigger('change');
                this.Production_Month = '';
                this.Pc = '';
                this.Tm = '';
                $('#Product_Name').val(null);
                $('#Product_Name_second').val(null);
                $('#Standard_Price_SearchStart').val(null);
                $('#Standard_Price_SearchEnd').val(null);
                this.Brand_Name = '';
            },
         
      
        }
    });