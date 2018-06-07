
//主键
var keyValue = PageCommon.Request("keyValue");
var geography_vue = new Vue({
    el: '#app',
    data: {
        B_Geography: {
            Geography_Id:'',
            //地理名称
            Geography_Name: "",
            //地理简称
            Geography_Short_Name: '',
            //地理缩写
            Search_First_Alphabet: '',
            //地理全拼
            Search_Full_Spell: '',
            //父地理
            Parent_Geography_Id:'',
            //区域层级
            Area_Layer: '',
            //备注
            Remark: '',
            //是否常用
            Is_Often_Use: "1",
            //直辖市
            Is_Dcm: "1",
        },
        mswitch:false,
        AreaLayerDictionaryKey: 'AREA_LAYER',
        //父地理下拉框显示字段
        GeographyResult: ["Geography_Id", "Geography_Name"],
        //父地理下拉框查询条件
        GeographySearch: ["Geography_Id", "Geography_Name"],
        //父地理排序条件
        GeographyOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //父地理下拉框检索字段
        GeographyField: ["Geography_Id", "Geography_Name"],
        GeographyWhere: [{}],
        //地理层级联动
        linkage: {},
    },      
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    geography_vue.B_Geography = data;
                }
            });
        }
    },
    watch:{
        "B_Geography.Geography_Name": function (value) {
            var Full_Spell = makePy(value, true);
            var Short_Name = makePy(value);
            this.B_Geography.Search_Full_Spell = Full_Spell;
            this.B_Geography.Geography_Short_Name = Short_Name;
            this.B_Geography.Search_First_Alphabet = Short_Name.substring(0, 1);
        }
    },
    methods: {
        //保存地理关系画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: { geography: geography_vue.B_Geography },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("GeographyList");
                }
            });
        },
        //根据地理层级查询地理
        ChangeGeography: function (value) {
            if (this.B_Geography.Area_Layer == "2" || this.B_Geography.Area_Layer == '3') {
                this.mswitch = true;
            } else {
                this.mswitch = false;
            }
            this.linkage = {};
            this.linkage.Field_Name = "Area_Layer";
            this.linkage.Value1 = parseInt(value.id - 1);
        }
    }
})

