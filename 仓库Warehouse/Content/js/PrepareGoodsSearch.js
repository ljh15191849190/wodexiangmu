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
var PrepareGoods_vue = new Vue({
    el: '#apps',
    data: {
        W_Prepare_Goods: {
            //入库
            Corporation_Id: '',
            Corporation_Name: '',
            Corporation_Object: "",
            Company_Id: '',
            Storeage_Id: '',
            Storeage_Name: '',
            Transportation_Way_Id: "",
            Transportation_Way_Name: "",
            Carrier_Id: '',
            Shipments_Notice: '',
            Other_Explain: '',
            Prepare_Goods_Employee_Id: '',
            Recheck_Employee_Id: '',
            Is_Replace_Cus_Deliver_Goods: '',
            Receiver_Detail_Number: '',
            W_Prepare_Goods_Detail_List: [],
        },
        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "Warehouse",
            List_Id: ""
        },
        //运输方式
        Transportation_WayOrder: [{}],
        Transportation_WayResult: ["Transportation_Way_Id", "Transportation_Way_Name"],
        Transportation_WayWhere: [{}],
        CarrierOrder: [{}],
        CarrierResult: ["Carrier_Id", "Carrier_Name"],
        CarrierWhere: [{}],
        Goods_EmployeeOrder: [{}],
        Goods_EmployeeResult: ["Employee_Id", "Name"],
        Goods_EmployeeWhere: [{}],
        RecheckOrder: [{}],
        RecheckResult: ["Employee_Id", "Name"],
        RecheckWhere: [{}],
        //客户
        CustomerfiledResult: ["Customer_Id", "Customer_Name"],
        CustomerfiledSearch: ["Customer_Id", "Customer_Name"],
        CustomermainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,

        //  deleteList: [],
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
                    PrepareGoods_vue.W_Prepare_Goods = data;
                    $.each(data.W_Prepare_Goods_Detail_List, function (index, item) {
                        item.Product_Name = item.Product_Name + "@@";
                    })
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
        //执行入库
        InStoreage: function () {
            var selectRow = PageCommon.GetDataTableData("PrepareGoodsNewList");
            PageCommon.SubmitForm({
                url: "ExcuteInStoreage",
                param: { inStoreage: selectRow[0] },
                success: function (data) {
                    PageCommon.RefreshTablePage("PrepareGoodsNewList");

                }
            });

        },
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "This_Prepare_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "This_Prepare_Count") {
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
            else if (titleData.mData == "This_Prepare_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Prepare_Count").html();
                $("#div_temp_Prepare_Count").attr("id", "div_temp_Prepare_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Prepare_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Prepare_Count: cell.data()
                    }

                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Prepare_Count_" + cell.index().row + "_" + cell.index().column);
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
            else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                    PageCommon.RefreshTablePage("PrepareGoodsNewList");
                }
            }



        },
        //调用弹出框数据
        ChangeValue: function (list) {
            console.log(list);
            PrepareGoods_vue.W_Prepare_Goods.Company_Object = list.Company_Object;
            PrepareGoods_vue.W_Prepare_Goods.Company_Id = list.Company_Id;
            PrepareGoods_vue.W_Prepare_Goods.Company_Name = list.Company_Name;
            PrepareGoods_vue.W_Prepare_Goods.Storeage_Id = list.Storeage_Id;
            PrepareGoods_vue.W_Prepare_Goods.Storeage_Name = list.Storeage_Name;
            PrepareGoods_vue.W_Prepare_Goods.Bill_Type = list.Bill_Type;



            $.each(list.W_Prepare_Goods_Detail_List, function (index, item) {
                var obj = {};
                //子表
                obj.Fact_Goods_Locate_Id = item.Fact_Goods_Locate_Id;
                obj.Fact_Goods_Locate_Name = item.Fact_Goods_Locate_Name;
                obj.This_Enter_Count = item.This_Enter_Count;

                obj.In_Storeage_Wait_Detail_Number = list.Detail_Number;
                obj.In_Storeage_Wait_Id = list.In_Storeage_Wait_Id;
                obj.In_Storeage_Status = list.In_Storeage_Status;
                obj.Product_Id = list.Product_Id;
                obj.Is_Purchase = list.Is_Purchase;
                obj.Is_Purchase_Name = list.Is_Purchase_Name;
                obj.Product_Name = list.Product_Name;
                obj.Product_Classify_Id = list.Product_Classify_Id;
                obj.Product_Classify_Name = list.Product_Classify_Name;
                obj.Brand_Id = list.Brand_Id;
                obj.Brand_Name = list.Brand_Name;
                obj.Package = list.Package;
                obj.Product_Area_Id = list.Product_Area_Id;
                obj.Product_Area_Name = list.Product_Area_Name;
                obj.Should_Enter_Count = list.Should_Enter_Count;
                obj.Entered_Count = list.Entered_Count;
                obj.Batch_Id = list.Batch_Id;
                obj.Refercnce_Goods_Locate_Id = list.Refercnce_Goods_Locate_Id;

                PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.push(obj);
            })


            PageCommon.RefreshTablePage("PrepareGoodsNewList");
        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            //$('#PrepareGoodsNewList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "PrepareGoodsNewList",
                Key: "Prepare_Count",
                columns: [
                     {
                         columnName: "Prepare_Count",
                         CheckEmpty: true,
                         CheckLength: '20'
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
            //验证至少输入一条明细
            if (!PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //获取grid数据
            var productdata = PageCommon.GetDataTableData("PrepareGoodsNewList");
            PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List = [];
            ////组织明细数据 过滤空行
            $.each(productdata, function (index, item) {
                if (item.This_Storeage_Count != "") {
                    PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.push(item);
                }

            });

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { prepareGoods: PrepareGoods_vue.W_Prepare_Goods }
             , success: function () {
                 //判断编辑还是新增
                 window.location.href = PageCommon.SetUrl("List");
             }
            });

        },
        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        },
        Set: function () { },

    }
});