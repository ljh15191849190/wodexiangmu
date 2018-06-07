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
var OutStoreage_vue = new Vue({
    el: '#apps',
    data: {
        W_Out_Storeage: {
            //入库
            Address: "",
            Storeage_Id: '',
            Prepare_Goods_Id: '',
            Prepare_Goods_Name: '',
            Send_Storeage_Id: '',
            Employee_Id: '',
            Name: '',
            Carrier_Id: '',
            Carrier_Name: '',
            Corporation_Id: '',
            Corporation_Name: '',
            Receiver: '',
            Transportation_Way_Id: '',
            Transportation_Way_Name: '',
            Freight_Pay: '',
            Insure_Status: '',
            Send_Out_Goods_Notice: '',
            Insure_Remark: '',
            Receiver_Detail_Number: '',
            Prepare_Goods_Employee_Id: "",
            Recheck_Employee_Id: '',
            Is_Replace_Cus_Deliver_Goods: '',
            W_Out_Storeage_Detail_List: [],
        },
        StoreageOrder: [{}],
        StoreageResult: ["Storeage_Id", "Storeage_Name"],
        StoreageWhere: [{}],
        SendStoreageOrder: [{}],
        SendStoreageResult: ["Storeage_Id", "Storeage_Name"],
        SendStoreageWhere: [{}],
        CarrierOrder: [{}],
        CarrierResult: ["Carrier_Id", "Carrier_Name"],
        CarrierWhere: [{}],
        Transportation_WayOrder: [{}],
        Transportation_WayResult: ["Transportation_Way_Id", "Transportation_Way_Name"],
        Transportation_WayWhere: [{}],
        //第三张表
        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000011",
            System_Key: "Warehouse",
            List_Id: ""
        },
        btnOutStoreage: true,
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
        isshade_bg: false,
        OutStoreageWaitRowList: {},
        AddressList: [],
        globalParameter: {}
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.base').arrangeable({
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
                    OutStoreage_vue.W_Out_Storeage = data;
                    $.each(data.W_Out_Storeage_Detail_List, function (index, item) {
                        item.Is_Purchase_Name = item.Is_Purchase == "0" ? "是" : "否";
                        item.Product_Name = item.Product_Name + "@@";
                    })
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        lookCallBack: function () {
                            //回调添加按钮
                            vm.btnOutStoreage = false;
                        }
                    });
                }
            });
        }

    },
    methods: {
        //执行出库
        OutStoreage: function () {
            if (!OutStoreage_vue.W_Out_Storeage.W_Out_Storeage_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                return;
            }
            OutStoreage_vue.W_Out_Storeage.Execute_OutStoreage_Flag = 0;
            PageCommon.SubmitForm({
                url: "ExcuteOutStoreage",
                param: { OutStoreage: OutStoreage_vue.W_Out_Storeage },
                success: function (data) {
                    //PageCommon.RefreshTablePage("OutStoreageNewList");
                    window.location.href = PageCommon.SetUrl("List");
                }
            });

        },
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Should_Out_Count" || Field_Name === "Out_Count" || Field_Name === "This_Out_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Should_Out_Count" || Field_Name === "Out_Count" || Field_Name === "This_Out_Count") {
                if (value) {

                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);

                }
            }
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
            else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                    PageCommon.RefreshTablePage("OutStoreageNewList");
                }
            }



        },

        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            //$('#OutStoreageNewList').DataTable().cell.blur();

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //验证至少输入一条明细
            if (!OutStoreage_vue.W_Out_Storeage.W_Out_Storeage_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //获取grid数据
            var productdata = PageCommon.GetDataTableData("OutStoreageNewList");
            OutStoreage_vue.W_Out_Storeage.W_Out_Storeage_Detail_List = [];
            ////组织明细数据 过滤空行
            $.each(productdata, function (index, item) {
                if (item.This_Out_Count != "") {
                    OutStoreage_vue.W_Out_Storeage.W_Out_Storeage_Detail_List.push(item);

                }
            });
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { outStoreage: OutStoreage_vue.W_Out_Storeage }
             , success: function () {
                 //PageCommon.RefreshTablePage("OutStoreageNewList");
                 //判断编辑还是新增
                 window.location.href = PageCommon.SetUrl("List");
             }
            });

        },


        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        },
        TemplateSelectionProduct: function (data) {
            this.W_Out_Storeage.Prepare_Goods_Employee_Id = data.id;
        },
        TemplateSelectionRecheck: function (data) {
            this.W_Out_Storeage.Recheck_Employee_Id = data.id;
        },
        Set: function () { },


    }
});