//联系人信息主键
var RequestValue = PageCommon.Request();
if (RequestValue.relevantnumber) {
    //判断传的参数的是2个还是1个
    var relevantnumber = RequestValue.relevantnumber;
    if (relevantnumber.indexOf(',') != -1) {
        relevantnumber = relevantnumber.split(",");
    } else {
        relevantnumber = [relevantnumber];
    }
}
//判断是点击了保存按钮
if (RequestValue.save) {
    var save = RequestValue.save;
}
var product_vue = new Vue({
    el: '#apps',
    data: {
        isdelete_img: true,
        formData: '',
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        InnerRadiusUnit: {
            floatvalue: '',
            unit: null
        },
        OuterRadiusUnit: {
            floatvalue: '',
            unit: null
        },
        LengthUnit: {
            floatvalue: '',
            unit: null
        },
        WidthUnit: {
            floatvalue: '',
            unit: null
        },
        ThicknessUnit: {
            floatvalue: '',
            unit: null
        },
        WeightUnit: {
            floatvalue: '',
            unit: null
        },
        RemainFlotsamWidthUnit: {
            floatvalue: '',
            unit: null
        },
        B_Product: {
            //型号规格
            Product_Name: '',
            //型号类型
            Product_Type: '',
            //分类
            Small_Classify_Id: '',
            Middle_Classify_Id: '',
            Big_Classify_Id: '',
            //产地
            Product_Area_Id: '',
            //油脂包装
            Package: '',
            //品牌
            Brand_Id: '',
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
            //剩余废料长度
            Remain_Flotsam_Width: "",
            //整箱数
            Box_Count: "",
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
            Inner_Radius_Unit: null,
            Outer_Radius_Unit: null,
            Length_Unit: null,
            Width_Unit: null,
            Thickness_Unit: null,
            Weight_Unit: null,
            Material_Id: "",
            B_Product_Package_Relation_List: [],
            //定价
            Product_Price: {
                Price_Value1: '',
                Price_Value2: '',
                Price_Value3: '',
                Price_Value4: '',
                Price_Value5: '',
                Coefficient_Value1: '',
                Coefficient_Value2: '',
                Coefficient_Value3: '',
                Coefficient_Value4: '',
                Coefficient_Value5: "",
                Price_Difference: ""
            },
            //用户头像
            //File_Dir: null,
            //File_Model_List: [{
            //    Base64_Imgage: ''
            //}],
            Delete_File_Model_List: []
        },
        linkage: {},
        linkdata: {},
        //价格标记
        PriceDictionaryKey: "PRICE_TAG",
        //型号类型
        ProductTypeDictionaryKey: "IS_PURCHASE",
        //分类下拉框排序
        BigOrder: [{}],
        BigResult: ["Product_Classify_Id", "Product_Classify_Name"],
        BigWhere: [{
            "Field_Name": "Parent_Product_Classify_Id", "Value1": null, "Expression": "03", "Query_Type": "01"
        }],

        MiddleOrder: [{}],
        MiddleResult: ["Product_Classify_Id", "Product_Classify_Name"],
        MiddleWhere: [{
            "Field_Name": "Parent_Product_Classify_Id", "Value1": "0", "Expression": "03", "Query_Type": "01"
        }],

        SmallOrder: [{}],
        SmallResult: ["Product_Classify_Id", "Product_Classify_Name"],
        SmallWhere: [{
            "Field_Name": "Parent_Product_Classify_Id", "Value1": "0", "Expression": "03", "Query_Type": "01"
        }],
        //产地下拉框排序
        AreaOrder: [{}],
        AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        AreaWhere: [],
        //品牌下拉框排序
        BrandOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        BrandResult: ["Brand_Id", "Brand_Name"],
        BrandField: ["Brand_Id", "Brand_Name"],
        BrandSearch: ["Brand_Id", "Brand_Name"],
        //单位下拉框排序
        UnitOrder: [{}],
        UnitResult: ["Unit_Id", "Unit_Name"],
        UnitWhere: [],
        //材质下拉框排序
        MaterialOrder: [{}],
        MaterialResult: ["Material_Id", "Material_Name"],
        MaterialWhere: [],

        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000025",
            System_Key: "BasicData",
            List_Id: ""
        },
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
        //位数cookie
        globalParameter: {}

    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $('.contact').arrangeable({
            dragSelector: '.space'
        });
        $('.contactprice').arrangeable({
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
            if ($(".down_2").is(".rotate")) {
                $(".BasicInformation").slideUp(500);
                $(".title1").addClass("boder");
                $(".down_tab").each(function () {
                    if ($(this).is(".rotate")) {

                    } else {
                        $(this).addClass("rotate");
                    }
                })

            } else {
                $(".BasicInformation").slideDown(500);
                $(".title1").removeClass("boder");
                $(".down_tab").each(function () {
                    if ($(this).is(".rotate")) {
                        $(this).removeClass("rotate");
                    }
                })
            }
        })

        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber }
                , success: function (data) {
                    product_vue.B_Product = data;
                    product_vue.File_Model_List = data.File_Model_List;
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
                    if (!product_vue.B_Product.Product_Price)
                        product_vue.B_Product.Product_Price = {};

                    var ee = product_vue.B_Product.Bar_Code;
                    if (ee)
                    {
                        $("#canvascode").JsBarcode(ee);
                    }
                    

                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        lookCallBack: function () {

                        }
                    });
                }
            });

        }
    },
    methods: {
        backfd: function (fd, deletedata) {
            var vm = this;
            if (deletedata) {
                vm.B_Product.Delete_File_Model_List = deletedata;
            }
            vm.formData = fd;
        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Length" || Field_Name === "Width" || Field_Name === "High") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Lenght_Decimal, this.globalParameter.Lenght_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Volume") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Volume_Decimal, this.globalParameter.Volume_Digital_Cut_Way);
                }
            }
        },
        ChangeSystemBc: function (value) {
            product_vue.linkage = {};
            product_vue.linkage.Field_Name = "Parent_Product_Classify_Id";
            product_vue.linkage.Value1 = value.id;
        },
        //根据linkage
        ChangeSystemMc: function (value) {
            product_vue.linkdata = {};
            product_vue.linkdata.Field_Name = "Parent_Product_Classify_Id";
            product_vue.linkdata.Value1 = value.id;
        },

        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Remark") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Remark").html();

                $("#div_temp_Remark").attr("id", "div_temp_Remark_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Remark_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });

                //设置控件在DataTables上
                var jqInputs = $('textarea', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
                $(".outer-lg", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Package_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Package_Count").html();
                $("#div_temp_Package_Count").attr("id", "div_temp_Package_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Package_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Package_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Package_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }

                //获取模板的html
                cell.node().innerHTML = $("#temp_Package_Name").html();
                $("#div_temp_Package_Name").attr("id", "div_temp_Package_Name_" + cell.index().row + "_" + cell.index().column);
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', 2, { search: 'applied' });
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Package_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Packageresult: ["Package_Number", "Package_Name", "Unit_Name", "Volume", "Length", "Width", "High"],
                        PackagefiledSearch: ["Package_Number", "Package_Name", "Unit_Id", "Unit_Name", "Volume", "Length", "Width", "High"],
                        PackagemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                        PackageinputField: ["Package_Number", "Package_Name"],
                        //通过ID带name(下拉框)
                        Packagechildtable: [
                            {
                                Table_Name: "B_Unit",
                                Primary_Key_Field: ["Unit_Id"],
                                Field_Name: ["Unit_Name"]
                            }
                        ],

                        Package_Name: ""
                    },
                    mounted: function () {
                        this.Package_Name = cell_active.data();
                        var jqInputs = $('select', cell.node());

                    },
                    methods: {
                        //下拉框显示
                        TemplateResult: function (rtn) {

                            return rtn.Package_Name + " " + rtn.Unit_Name + " " + rtn.Volume;

                        },
                        TemplateSelection: function (data) {
                            if (data) {
                                cell.Package_Number = data.id;
                                cell.Package_Name = data.name;

                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 12, { search: 'applied' });
                                lenght.data(data.Length);
                                var Volume = cell.cell(':eq(' + cell.index().row + ')', 11, { search: 'applied' });
                                Volume.data(data.Volume);
                                var Width = cell.cell(':eq(' + cell.index().row + ')', 13, { search: 'applied' });
                                Width.data(data.Width);
                                var High = cell.cell(':eq(' + cell.index().row + ')', 14, { search: 'applied' });
                                High.data(data.High);
                                var Unit_Name = cell.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' });
                                Unit_Name.data(data.Unit_Name);
                            } else {
                                cell.Package_Number = '';
                                cell.Package_Name = '';

                                var lenght = cell.cell(':eq(' + cell.index().row + ')', 12, { search: 'applied' });
                                lenght.data('');
                                var Volume = cell.cell(':eq(' + cell.index().row + ')', 11, { search: 'applied' });
                                Volume.data('');
                                var Width = cell.cell(':eq(' + cell.index().row + ')', 13, { search: 'applied' });
                                Width.data('');
                                var High = cell.cell(':eq(' + cell.index().row + ')', 14, { search: 'applied' });
                                High.data('');
                                var Unit_Name = cell.cell(':eq(' + cell.index().row + ')', 10, { search: 'applied' });
                                Unit_Name.data('');
                            }
                        }
                    }
                });
                $(".outer", cell.node()).width(tdWidth);
            }
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Remark") {
                var jqInputs = $('textarea', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            }
           
            else if (titleData.mData == "Package_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Package_Name_" + cell.index().row + "_" + cell.index().column);
                if (typeof (cell.Package_Name) == "undefined") {
                    cell.Package_Number = $(jqInputs).val();
                    cell.Package_Name = $(jqInputs).text();
                }

                //修改第2列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 2, { search: 'applied' });
                cell_active.data($(jqInputs[0]));
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Package_Number);
                        cell.data(cell.Package_Name);
                    } else {
                        cell.data("");
                    }

                }
            }
            else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }



        },
        //设置控件属性
        Set: function () {
            var productdata = PageCommon.GetDataTableData("ProductPackageList");
        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            $('#ProductPackageList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "ProductPackageList",
                Key: "Package_Count",
                columns: [
                     {
                         columnName: "Package_Name",
                         CheckEmpty: true
                     },

                    {
                        columnName: "Package_Count",
                        CheckEmpty: true,
                        CheckLength: '200'
                    },
                     {
                         columnName: "Remark",
                         CheckLength: '200'
                     }

                ],
            });
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var vm = this;
            //获取grid数据
            var productdata = PageCommon.GetDataTableData("ProductPackageList");
            product_vue.B_Product.B_Product_Package_Relation_List = [];
            //组织明细数据 过滤空行
            $.each(productdata, function (index, item) {
                if (item.Package_Count != "" && item.Package_Name != "") {
                    var obj = {};
                    obj.Package_Count = item.Package_Count;
                    obj.Bar_Code = item.Bar_Code;
                    obj.Remark = item.Remark;
                    obj.Package_Name = item.Package_Name;
                    obj.Package_Number = item.Package_Number;
                    product_vue.B_Product.B_Product_Package_Relation_List.push(obj);

                }
            });

            //验证至少输入一条明细
            if (!product_vue.B_Product.B_Product_Package_Relation_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
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
            vm.formData.delete('product');
            var data = JSON.stringify(product_vue.B_Product);
            vm.formData.append('product', data);
            PageCommon.SubmitForm({
                type: "2",
                url: "Save"
             , param: vm.formData
             , success: function () {
                 //判断编辑还是新增
                 if (!!!relevantnumber) {
                     PageCommon.Reload();
                 } else {
                     window.location.href = PageCommon.SetUrl("List");
                 }
             }
            });
        },
        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        }
    }
});