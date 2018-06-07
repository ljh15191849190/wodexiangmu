var keyValue = PageCommon.Request("keyValue");
var SupplierHistroyInfo = new Vue({
    el: '#app',
    data: {
        //历史信息
        SupplierHistroyData: [{
            B_Supplier_Payway_Alter_Apply_List: [{}],
            B_Supplier_Bank_Alter_Apply_List: [{}],
        }],
         //是否显示日结天数
        Day_Count: false,
        //是否显示月结天数
        Month_Count: true,
    },
    mounted: function () {
        var that = this;
        if (keyValue) {
            PageCommon.GetFormData({
                url: "HistorySeachAlter",
                param: { keyValue: keyValue },
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].B_Supplier_Payway_Alter_Apply_List[0].Payway == '01') {
                            that.Day_Count = true;
                            that.Month_Count = false;
                            data[i].B_Supplier_Payway_Alter_Apply_List[0].Payway = '日结';
                        } else if (data[i].B_Supplier_Payway_Alter_Apply_List[0].Payway == '02') {
                            that.Month_Count = true;
                            that.Day_Count = false;
                            data[i].B_Supplier_Payway_Alter_Apply_List[0].Payway = '月结'
                        } else {
                            that.Month_Count = true;
                            that.Day_Count = false;
                            data[i].B_Supplier_Payway_Alter_Apply_List[0].Payway = '月结';
                        }
                    }
                    that.SupplierHistroyData = data;
                    console.log(data);
                }
            });
        }
    },
    methods: {
        getuploadimgs: function (index) {
            return "uploadimgs" + index;
        },
    }
});