
    //物流运费主键
    var keyValue = PageCommon.Request("keyValue");
    var logisticscarriage_vue = new Vue({
        el: '#app',
        data: {
            B_Logistics_Carriage: {
                //承运商名称
                Carrier_Id: "",
                //商品名称
                Product_Id: "",
                //起步重量
                Start_Weight: 0,
                //起步价格
                Start_Price: 0,
                //续重重量
                Add_Weight: 0,
                //续重价格
                Add_Weight_Price: 0,
                //续重折扣
                Add_Weight_Discount: "",
                //时效
                Time_Limit: "",
                //运输费
                Transport_Expense: 0,
                //附加费
                Addition_Expense: 0,
                //区域名称
                Area: "",
                //省名称
                Province: "",
                //备注
                Remark: ""
            },
            //承运商下拉框查询条件
            carrierWhere: [],
            //承运商下拉框排序
            carrierOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC"
            }],
            //承运商下拉框显示字段
            carrierResult: ["Carrier_Id", "Carrier_Name"],
            //商品下拉框查询条件
            productWhere: [],
            //商品下拉框排序
            productOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC"
            }],
            //商品下拉框显示字段
            productResult: ["Product_Id", "Product_Name"],
            //区域联动条件
            linkage: null,
            //区域下拉框查询条件
            areaWhere: [{
                Field_Name: "Area_Layer",
                Value1: "1",
                Expression: "03",
                Module_Id: "BasicData"
            }],
            //区域下拉框排序
            areaOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC"
            }],
            //区域下拉框显示字段
            areaResult: ["Geography_Id", "Geography_Name"],
            //省下拉框查询条件
            provenceWhere: [{
                Field_Name: "Area_Layer",
                Value1: "-2",
                Expression: "03",
                Module_Id: "BasicData"
            }],
            //省下拉框排序
            provenceOrder: [{
                Field_Name: "Create_Time",
                Orderby: "ASC"
            }],
            //省下拉框显示字段
            provenceResult: ["Geography_Id", "Geography_Name"]
        },
        mounted: function () {
            if (keyValue) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: [keyValue] },
                    success: function (data) {
                        logisticscarriage_vue.B_Logistics_Carriage = data;
                    }
                });
            }

            $("#Start_Weight").keyup(function () {
                logisticscarriage_vue.B_Logistics_Carriage.Transport_Expense = logisticscarriage_vue.B_Logistics_Carriage.Start_Weight * logisticscarriage_vue.B_Logistics_Carriage.Start_Price;
            })

            $("#Start_Price").keyup(function () {
                logisticscarriage_vue.B_Logistics_Carriage.Transport_Expense = logisticscarriage_vue.B_Logistics_Carriage.Start_Weight * logisticscarriage_vue.B_Logistics_Carriage.Start_Price;
            })
        },
        methods: {
            //保存物流运费画面数据
            Save: function () {
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //提交数据
                PageCommon.SubmitForm({
                    url: "Save",
                    param: { logisticscarriage: logisticscarriage_vue.B_Logistics_Carriage },
                    success: function () {
                        //判断编辑还是新增
                        if (!!!keyValue) {
                            PageCommon.Reload();
                        } else {
                            window.location.href = PageCommon.SetUrl("List");
                        }
                    }
                });
            },
            //根据区域查询省份
            ChangeArea: function (value) {
                if (value) {
                    logisticscarriage_vue.linkage = {};
                    logisticscarriage_vue.linkage.Field_Name = "Parent_Geography_Id";
                    logisticscarriage_vue.linkage.Value1 = value.id;
                } else {
                    logisticscarriage_vue.linkage = '';
                }
            },
            //返回列表画面
            Back: function () {
                PageCommon.BackFormMessge({})
            }
        }
    });
