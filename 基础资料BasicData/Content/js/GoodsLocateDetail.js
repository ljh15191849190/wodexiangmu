//员工主键
var keyValue = PageCommon.Request("keyValue");
var GoodsLocate_vue = new Vue({
    el: '#apps',
    data: {
        B_Goods_Locate: {
            //货位ID
            Goods_Locate_Id: "",
            //货位名称
            Goods_Locate_Name: "",
            //货位类型
            Goods_Locate_Type: "01",
            //仓库ID
            Storeage_Id: "",
            //仓库区域ID
            Storeage_Area_Id:"",
            //仓库储区ID
            Storeage_Region_Id: "",
            //货位层数
            Goods_Locate_Layer: "",
            //备注
            Remark: "",
            //坐标X
            Coordinate_X: "",
            //坐标Y
            Coordinate_Y: "",
        },
        //货位类型
        GoodsLocateTypeDictionaryKey: "GOODS_LOCATE_TYPE",
        //仓库区域ID下拉框排序
        StoreageAreaOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库区域ID下拉框显示字段
        StoreageAreaResult: ["Storeage_Area_Id", "Storeage_Area_Name"],
        //仓库区域ID下拉框查询条件
        StoreageAreaWhere: [],

        //仓库储区ID下拉框排序
        StoreageRegionOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库储区ID下拉框显示字段
        StoreageRegionResult: ["Storeage_Region_Id", "Storeage_Region_Name"],
        //仓库储区ID下拉框查询条件
        StoreageRegionWhere: [],
        linkage: {},
        linkage1: {},
        WeightUnit: {
            floatvalue: '',
            unit: ''
        },
        LengthUnit: {
            floatvalue: '',
            unit: '02'
        },
        WidthUnit: {
            floatvalue: '',
            unit: '02'
        },
        HighUnit: {
            floatvalue: '',
            unit: '02'
        },
        Locate_VUnit: {
            floatvalue: '',
            unit: '03'
        },
        Goods_Locate_Id:'',
    },
    watch: {
        "HighUnit.floatvalue": function () {
            if (this.HighUnit.floatvalue > 0 && this.WidthUnit.floatvalue > 0 && this.LengthUnit.floatvalue > 0) {
                this.Locate_VUnit.floatvalue = this.HighUnit.floatvalue * this.WidthUnit.floatvalue * this.LengthUnit.floatvalue;
            } else {
                return ""
            }
        },
        "WidthUnit.floatvalue": function () {
            if (this.HighUnit.floatvalue > 0 && this.WidthUnit.floatvalue > 0 && this.LengthUnit.floatvalue > 0) {
                this.Locate_VUnit.floatvalue = this.HighUnit.floatvalue * this.WidthUnit.floatvalue * this.LengthUnit.floatvalue;
            } else {
                return ""
            }
        },
        "LengthUnit.floatvalue": function () {
            if (this.HighUnit.floatvalue > 0 && this.WidthUnit.floatvalue > 0 && this.LengthUnit.floatvalue > 0) {
                this.Locate_VUnit.floatvalue = this.HighUnit.floatvalue * this.WidthUnit.floatvalue * this.LengthUnit.floatvalue;
            } else {
                return ""
            }
        },
    },
    mounted: function () {
     
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
        //修改数据传过来的id
       
        
    },
    created:function(){
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    console.log(data)
                    GoodsLocate_vue.B_Goods_Locate = data;
                    GoodsLocate_vue.WeightUnit.floatvalue = data.Goods_Locate_Load;
                    GoodsLocate_vue.WeightUnit.unit = data.Goods_Locate_Load_Unit;
                    GoodsLocate_vue.HighUnit.floatvalue = data.Goods_Locate_High;
                    GoodsLocate_vue.HighUnit.unit = data.Goods_Locate_High_Unit;
                    GoodsLocate_vue.LengthUnit.floatvalue = data.Goods_Locate_Length;
                    GoodsLocate_vue.LengthUnit.unit = data.Goods_Locate_Length_Unit;
                    GoodsLocate_vue.WidthUnit.floatvalue = data.Goods_Locate_Width;
                    GoodsLocate_vue.WidthUnit.unit = data.Goods_Locate_Width_Unit;
                    GoodsLocate_vue.Locate_VUnit.floatvalue = data.Goods_Locate_Volume;
                    GoodsLocate_vue.Locate_VUnit.unit = data.Goods_Locate_Volume_Unit;
                }
            });
        }
    },
    methods: {
        //根据linkage
        TemplateSelectionCustomer: function (data) {
            if (data) {
                GoodsLocate_vue.linkage = {};
                GoodsLocate_vue.linkage.Field_Name = "Storeage_Id";
                GoodsLocate_vue.linkage.Value1 = data.Storeage_Id;
            } else {
                GoodsLocate_vue.linkage = '';
            }
        },
        //根据linkage1
        ChangeSystem1: function (value) {
            if (value) {
                GoodsLocate_vue.linkage1 = {};
                GoodsLocate_vue.linkage1.Field_Name = "Storeage_Area_Id";
                GoodsLocate_vue.linkage1.Value1 = value.id;
            } else {
                GoodsLocate_vue.linkage1 ='';
            }
        },
        //保存员工画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Load = this.WeightUnit.floatvalue;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Load_Unit = this.WeightUnit.unit;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_High = this.HighUnit.floatvalue;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_High_Unit = this.HighUnit.unit;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Length = this.LengthUnit.floatvalue;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Length_Unit = this.LengthUnit.unit;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Width = this.WidthUnit.floatvalue;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Width_Unit = this.WidthUnit.unit;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Volume = this.Locate_VUnit.floatvalue;
            GoodsLocate_vue.B_Goods_Locate.Goods_Locate_Volume_Unit = this.Locate_VUnit.unit;
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { goodsLocate: GoodsLocate_vue.B_Goods_Locate },
                success: function () {
                    //判断新增还是修改
                    if (!!!keyValue) {
                        PageCommon.Reload();
                    } else {
                        window.location.href = PageCommon.SetUrl("List");
                    }
                }
            });
        },
    
        Set:function(){

        },
        //返回列表画面
        Back: function () {
            //window.location.href = PageCommon.SetUrl("List");
            PageCommon.BackFormMessge('list');
        }
    }
});

