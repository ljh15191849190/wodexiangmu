//菜单主键
var keyValue = PageCommon.Request("keyValue");
var product_vue = new Vue({
    el: '#apps',
    data: {
        InnerRadiusUnit: {
            floatvalue: '',
            unit: ''
        },
        OuterRadiusUnit: {
            floatvalue: '',
            unit: ''
        },
        LengthUnit: {
            floatvalue: '',
            unit: ''
        },
        WidthUnit: {
            floatvalue: '',
            unit: ''
        },
        ThicknessUnit: {
            floatvalue: '',
            unit: ''
        },
        WeightUnit: {
            floatvalue: '',
            unit: ''
        },
        RemainFlotsamWidthUnit: {
            floatvalue: '',
            unit: ''
        },
        B_Product: {
            //型号规格
            Product_Name: '',
            //型号类型
            Product_Type: '',
            //分类
            Small_Classify_Name: '',
            Middle_Classify_Name: '',
            Big_Classify_Name: '',
            //产地
            Product_Area_Name: '',
            //油脂包装
            Package: '',
            //品牌
            Brand_Name: '',

            //关税
            Custom: '',
            Pc: '',
            Production_Month: '',
            Tm: '',
            The_Highest_Store: '',
            The_Lowest_Store: '',
            Bar_Code: '',
            Remark: '',
            Unit_Id: "",
            Unit_Name: "",
            //内径
            Inner_Radius: '',
            //外径
            Outer_Radius: '',
            //长度
            Length: '',
            //宽度
            Width: '',
            //厚度
            Thickness: '',
            //重
            Weight: '',
            Material_Name: "",
            B_Product_List: [],
            B_Relation_Product_List: [],
            //用户头像
            File_Dir: null,
            File_Model_List: [{
                Base64_Imgage: ''
            }]
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000024",
            System_Key: "BasicData",
            List_Id: ""
        },
        //表格查询url
        tableUrl: "Seach",
        ////表格查询条件
        //searchModel: {},
        relationList: [],

        deleteList: [],
        //位数cookie
        globalParameter: {}

    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        $('#ProductList').on('dblclick', 'tbody tr', function () {
            //product_vue.B_Product.B_Product_List = [];
            PageCommon.ModalOpen({
                id: "ProductPackage",
                title: '关联型号',
                width: "960px",
                height: "600px",
                btn: ['加入'],
                url: '/BasicData/Product/LeadOpen',
                callBack: function (iframeId) {
                    product_vue.B_Product.B_Product_List = [];
                    var selectRow = PageCommon.GetDataTableData("ProductList");
                    $.each(selectRow, function (index, item) {
                        if (item.Product_Id) {
                            product_vue.B_Product.B_Product_List.push(item);
                        }
                    });
                    //if (!product_vue.B_Product.B_Product_List) {
                    //    product_vue.B_Product.B_Product_List = new Array();
                    //}
                    var list = PageCommon.ChildrenFrames(iframeId).vmProduct.Add();
                    $.each(list, function (index, item) {
                        var result = product_vue.IsInArray(item, product_vue.B_Product.B_Product_List);
                        if (!result) {
                            product_vue.B_Product.B_Product_List.push(item);
                        }
                    })
                    PageCommon.RefreshTablePage("ProductList");
                }
            })
        })
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $('.contact').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        //页签折叠
        $(".title1").click(function () {
            $(this).parent().find(".BasicInformation").slideToggle();
            $(this).parent().find(".down_tab").toggleClass("rotate");
            $(this).toggleClass("boder");
        })
        $(".down_tab").click(function () {
            $(this).parent().find(".BasicInformation").slideToggle();
            $(this).parent().find(".title").toggleClass("boder");
            $(this).toggleClass("rotate");
        })
        $(".down_2").click(function () {
            $(this).toggleClass("rotate");
            $(".BasicInformation").slideToggle();
            $(".title1").toggleClass("boder");
            $(".down_tab").toggleClass("rotate");
        })
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    console.log(data)
                    if (!data.B_Product_List)
                        data.B_Product = [];
                    product_vue.B_Product = data;
                    product_vue.InnerRadiusUnit.floatvalue = data.Inner_Radius;
                    product_vue.InnerRadiusUnit.unit = data.Inner_Radius_Unit;
                    product_vue.OuterRadiusUnit.floatvalue = data.Outer_Radius;
                    product_vue.OuterRadiusUnit.unit = data.Outer_Radius_Unit;
                    product_vue.LengthUnit.floatvalue = data.Length;
                    product_vue.LengthUnit.unit = data.Length_Unit;
                    product_vue.WidthUnit.floatvalue = data.Width;
                    product_vue.WidthUnit.unit = data.Width_Unit;
                    product_vue.ThicknessUnit.floatvalue = data.Thickness;
                    product_vue.ThicknessUnit.unit = data.Thickness_Unit;
                    product_vue.WeightUnit.floatvalue = data.Weight;
                    product_vue.WeightUnit.unit = data.Weight_Unit;
                    product_vue.RemainFlotsamWidthUnit.floatvalue = data.Remain_Flotsam_Width;
                    product_vue.RemainFlotsamWidthUnit.unit = data.Remain_Flotsam_Width_Unit;
                    var ee = product_vue.B_Product.Bar_Code;
                    if (ee)
                    {
                        $("#canvascode").JsBarcode(ee)
                    }
                    
                }
            });
        }

    },
    methods: {
        //删除行
        deletesback: function (rowdata) {
            if (rowdata.Sku) {
                product_vue.deleteList.push({ Sku: rowdata.Sku, Spu: rowdata.Product_Id, Delete_Flag: 1 });
            }
            //var productdata = PageCommon.GetDataTableData("ProductPackageList");
            //$.each(productdata, function (index,item) {
            //    if (rowdata.Sku) {
            //        item.Delete_Flag = 1;
            //    }
            //})
            //if (rowdata.Sku) {
            //    //var obj = {};
            //    //obj.Spu = rowdata.Product_Id;
            //    //obj.Sku = rowdata.Sku;
            //    //obj.Delete = 1;
            //    //PageCommon.SubmitDetialForm({
            //    //    url: "DeleteProductRelation",
            //    //    param: [obj],
            //    //    success: function () {
            //    //        PageCommon.RefreshTablePage("ProductList");  //刷新数据
            //    //    },
            //    //    close: true
            //    //})
            //} 

        },
        IsInArray: function (obj, arrayData) {
            var flag = false;
            $.each(arrayData, function (index, item) {
                if (obj.Product_Id == item.Product_Id) {
                    flag = true;
                    return false;
                }
            });
            return flag;
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "The_Highest_Store" || Field_Name === "Box_Count" || Field_Name === "The_Lowest_Store") {
                if (value) {
   
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                  
                }
            }
            if (Field_Name === "Price_Value1" || Field_Name === "Price_Value2" || Field_Name === "Price_Value3" || Field_Name === "Price_Value4" || Field_Name === "Price_Value5") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
            if (Field_Name === "Custom" || Field_Name === "Tax_Rate" || Field_Name === "Customs_Duty") {
                if (value) {
                  
                    return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                  
                }
            }
            if (Field_Name === "Coefficient_Value1" || Field_Name === "Coefficient_Value2" || Field_Name === "Coefficient_Value3" || Field_Name === "Coefficient_Value4" || Field_Name === "Coefficient_Value5") {
                if (value) {
                  
                        return PageCommon.NumberDispose(value, 2, 1);
                  
                }
            }

        },
        //设置控件属性
        Set: function () {
            var productdata = PageCommon.GetDataTableData("ProductPackageList");
            console.log(productdata);
        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            $('#ProductPackageList').DataTable().cell.blur();

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var relationList = [];
            relationList.push({ Spu: keyValue });
            var selectRow = PageCommon.GetDataTableData("ProductList");
            $.each(selectRow, function (index, item) {
                if (item.Product_Id) {
                    var obj = {};
                    obj.Spu = item.Product_Id;
                    relationList.push(obj);
                }
            });
            if (product_vue.deleteList.length > 0) {
                product_vue.B_Product.B_Relation_Product_List = relationList.concat(product_vue.deleteList);
            } else {
                product_vue.B_Product.B_Relation_Product_List = relationList
            }

            product_vue.B_Product.Inner_Radius = product_vue.InnerRadiusUnit.floatvalue;
            product_vue.B_Product.Inner_Radius_Unit = product_vue.InnerRadiusUnit.unit;
            product_vue.B_Product.Outer_Radius = product_vue.OuterRadiusUnit.floatvalue;
            product_vue.B_Product.Outer_Radius_Unit = product_vue.OuterRadiusUnit.unit;
            product_vue.B_Product.Length = product_vue.LengthUnit.floatvalue;
            product_vue.B_Product.Length_Unit = product_vue.LengthUnit.unit;
            product_vue.B_Product.Width = product_vue.WidthUnit.floatvalue;
            product_vue.B_Product.Width_Unit = product_vue.WidthUnit.unit;
            product_vue.B_Product.Thickness = product_vue.ThicknessUnit.floatvalue;
            product_vue.B_Product.Thickness_Unit = product_vue.ThicknessUnit.unit;
            product_vue.B_Product.Weight = product_vue.WeightUnit.floatvalue;
            product_vue.B_Product.Weight_Unit = product_vue.WeightUnit.unit;
            product_vue.B_Product.Remain_Flotsam_Width = product_vue.RemainFlotsamWidthUnit.floatvalue;
            product_vue.B_Product.Remain_Flotsam_Width_Unit = product_vue.RemainFlotsamWidthUnit.unit;
            //提交数据到后台
            PageCommon.SubmitForm({
                type: "1",
                url: "SaveProductRelation"
             , param: { product: product_vue.B_Product }
             , success: function () {

                 //刷新表格数据
                 PageCommon.RefreshTablePage("ProductList");
             }
            });

        },


        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        }
    }
});