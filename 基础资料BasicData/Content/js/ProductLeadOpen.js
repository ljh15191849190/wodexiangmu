    var keyValue = PageCommon.Request("keyValue");
    var searchData = {};
    var vmProduct = new Vue({
        el: '#app',
        data: {
            productrange: {
                first: "",
                second: ""
            },
            Create_Time:'',
            Brand_Name:'',
            Product_Name: "",
            Big_Classify_Id: "",
            Package: "",
            Material_Id: "",
            Product_Area_Id: "",
            Pc: "",
            Tm: "",
            Production_Month: "",
            Inner_Radius: "",
            Outer_Radius: "",
            Remark: "",
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
          
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000024",
                System_Key: "BasicData"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {
                "Where_Parameter_List": [{
                    Field_Name: "B_Product.Product_Id",
                    Condition_Value1: PageCommon.CurrentWindow().keyValue,
                    Expression: "03",
                    Module_Id: "Basicdata",
                    Query_Type: "01"
                }]
            },
            Outer: {
                first: "",
                second: ""
            },
            Inner: {
                first: "",
                second: ""
            }
        },
        mounted: function () {
            //修改数据传过来的id
            if (keyValue) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: [keyValue] },
                    success: function (data) {
                        //vmProduct = data;
                        console.log(data)
                    }
                });
            }
        },
        methods: {
            //保存菜单画面数据
            Add: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("ProductList");

                //画面选择一条数据
                if (!selectRow.length > 0) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                PageCommon.ModalClose()
                return selectRow;
             
            
            },
            mClear: function () {
                this.productrange.first = '';
                this.productrange.second = '';
                $('#Product_Name').val(null).trigger('change');
                $('#Big_Classify_Id').val(null).trigger('change');
                this.Package = '';
                $('#Material_Id').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                this.Pc = '';
                this.Tm = '';
                this.Production_Month = '';
                $('#Inner_Radius').val(null);
                $('#Inner_Radius_second').val(null);
                $('#Outer_Radius').val(null);
                $('#Outer_Radius_second').val(null);
                this.Brand_Name = '';
                this.Create_Time = '';
            },
        
            Search: function () {
                vmProduct.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000024", List_Id: "ProductList" });
            },
        }
    });