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
var Scan_Plan_vue = new Vue({
    el: '#apps',
    data: {
        W_Scan_Plan: {
            //入库
            Storeage_Id: '',
            Storeage_Name: '',
            Corporation_Id: '',
            Corporation_Name: '',
            Product_Name: '',
            Product_Id: '',
            Bill_Type: '',
            Is_Purchase: '',
            Product_Classify_Id: "",
            Package: '',
            Recheck_Count: '',
            Scan_Count: '',
            Should_Scan_Count: '',
            Product_Area_Id: "",
            Goods_Locate_Id: '',
        },
        StoreageOrder: [{}],
        StoreageResult: ["Storeage_Id", "Storeage_Name"],
        StoreageWhere: [{}],
        Transportation_WayOrder: [{}],
        Transportation_WayResult: ["Product_Classify_Id", "Product_Classify_Name"],
        Transportation_WayWhere: [{}],
        Goods_LocateOrder: [{}],
        Goods_LocateResult: ["Goods_Locate_Id", "Goods_Locate_Name"],
        Goods_LocateWhere: [{}],
        Product_AreaOrder: [{}],
        Product_AreaResult: ["Product_Area_Id", "Product_Area_Name"],
        Product_AreaWhere: [{}],
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,

        //  deleteList: [],

    },
    mounted: function () {
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $('.content').arrangeable({
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
        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber }
                , success: function (data) {
                    console.log(data)
                    Scan_Plan_vue.W_Scan_Plan = data;
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        lookCallBack: function () {
                            //回调添加按钮
                        }
                    });
                }
            });
        }

    },
    methods: {
        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        }

    }
});