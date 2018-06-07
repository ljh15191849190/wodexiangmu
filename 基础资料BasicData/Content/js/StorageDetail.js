
//主键
var keyValue = PageCommon.Request("keyValue");
var storeage_vue = new Vue({
    el: '#app',
    data: {
        B_Storeage: {
            //仓库名称
            Storeage_Name: "",
            Storeage_Code:'',
            //仓库地址
            Address: '',
            //详细地址
            Detail_Address: '',
            //归属部门
            Department_Id: '',
            //仓库拼音首字母
            Storeage_Spell_First_Alphabet: '',
            //地址集合
            Address_Gather: "",
            //地址集合编码
            Address_Code_Gather:'',
            //表示顺
            Show_Order: "",
            Employee_Id:'',
            //经纬度
            Latitude: '',
            Longitude:"",
            //备注
            Remark: '',
           
        },
        receiveCommon: {
            //收件人省份
            province: ' ',
            //收件人城市
            city: ' ',
            //收件人区/县
            district: ' ',
            Address: '',
            //收件人详细地址
            DetailAddress: '',
            point_lng: '',
            point_lat: '',
            //地址集合
            Address_Gather: '',
        },
        addressArr:'',
        //部门下拉框显示字段
        DepartmentResult: ["Department_Id", "Department_Name"],
        //部门下拉框查询条件
        DepartmentSearch: ["Department_Id", "Department_Name"],
        //部门排序条件
        DepartmentOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //部门下拉框检索字段
        DepartmentField: ["Department_Id", "Department_Name", "Department_Short_Name"],
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    storeage_vue.B_Storeage = data;
                    storeage_vue.receiveCommon.Address = data.Address_Gather;
                    storeage_vue.receiveCommon.DetailAddress = data.Detail_Address;
                    storeage_vue.addressArr = data.Address_Code_Gather;
                }
            });
        }
    },
    computed:{
        Address_Gather: function () {
            return this.receiveCommon.Address;
        },
        Address: function () {
            return this.receiveCommon.Address;
        },
        Detail_Address: function () {
            return this.receiveCommon.DetailAddress;
        },
        Address_Code_Gather: function () {
            return this.receiveCommon.province + '-' + this.receiveCommon.city + '-' + this.receiveCommon.district;
        },
       Longitude: function () {
            return this.receiveCommon.point_lng;
        },
        Latitude: function () {
            return this.receiveCommon.point_lat;
        },
    },
    methods: {
        onchange: function (val) {
            storeage_vue.B_Storeage.Storeage_Code = val;
            storeage_vue.B_Storeage.Storeage_Spell_First_Alphabet = val.substring(0, 1).toUpperCase();
        },
        //保存仓库详情画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var addressArr = this.receiveCommon.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            storeage_vue.B_Storeage.Address = address + this.Detail_Address;
            storeage_vue.B_Storeage.Detail_Address = this.Detail_Address;
            storeage_vue.B_Storeage.Address_Gather = this.Address_Gather;
            if (this.addressArr == "") {
                storeage_vue.B_Storeage.Address_Code_Gather = this.Address_Code_Gather;
            } else {
                storeage_vue.B_Storeage.Address_Code_Gather = this.addressArr;
            }
            storeage_vue.B_Storeage.Longitude = this.Longitude;
            storeage_vue.B_Storeage.Latitude = this.Latitude;
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "storage": storeage_vue.B_Storeage
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("StoreageList");
                }
            });
        },

    }
})
