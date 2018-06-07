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
            Prepare_Goods_Employee_Id: "",
            Recheck_Employee_Id: '',
            Receiver_Detail_Number: '',
            W_Prepare_Goods_Detail_List: [],
        },
        ProductfiledResult: ["Employee_Id", "Name"],
        ProductfiledSearch: ["Employee_Id", "Name"],
        ProductmainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        ProductinputField: ["Employee_Id", "Name"],
        //第一张表
        ColumHeaderSeach: {
            Menu_Id: "M000009",
            System_Key: "Warehouse",
            List_Id: ""
        },
        tableurl: '../OutStoreageWait/CompanySeach',
        searchModel: {},
        //第二张表
        columHeaderSeach1: {
            Menu_Id: "M000006",
            System_Key: "Warehouse",
            List_Id: ""
        },
        //表格查询url
        tableUrl1: '../OutStoreageWait/IntroduceOutstoreageWait',
        //表格查询条件
        searchModel1: {
            "Where_Parameter_List": [{
                Field_Name: "W_Out_Storeage_Wait.Corporation_Id",
                Condition_Value1: "0",
                Expression: "02",
                Module_Id: "Warehouse",
                Query_Type: "01"
            },
            {
                Field_Name: "W_Out_Storeage_Wait.Corporation_Object",
                Condition_Value1: "0",
                Expression: "02",
                Module_Id: "Warehouse",
                Query_Type: "01"
            }]
        },
        childSearchModel: [
                       {
                           Field_Name: ["W_Out_Storeage_Wait_Detail.Out_Storeage_Wait_Id"],
                           Parent_Key: ["Out_Storeage_Wait_Id"],
                           Child_List: 'OutStoreageWaitDetailList',
                           Detail_Seach: '../OutStoreageWait/IntroduceOutstoreageWaitDetail',
                           Default_Child: "true"
                       }
        ],
        //第三张表
        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "Warehouse",
            List_Id: ""
        },
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
        isshade_bg: false,
        OutStoreageWaitRowList: {},
        AddressList: [],
        //位数cookie
        globalParameter: {},
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
                    PrepareGoods_vue.W_Prepare_Goods = data;
                    $.each(data.W_Prepare_Goods_Detail_List, function (index, item) {
                        item.Product_Name = item.Product_Name;
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
        GroupListRowClick: function (row) {
            if ($(row.node()).hasClass("selected")) {
                PrepareGoods_vue.searchModel1 = {
                    "Where_Parameter_List": [{
                        Field_Name: "W_Out_Storeage_Wait.Corporation_Id",
                        Condition_Value1: "0",
                        Expression: "02",
                        Module_Id: "Warehouse",
                        Query_Type: "01"
                    },
                               {
                                   Field_Name: "W_Out_Storeage_Wait.Corporation_Object",
                                   Condition_Value1: "0",
                                   Expression: "02",
                                   Module_Id: "Warehouse",
                                   Query_Type: "01"
                               }]
                }
            } else {
                if (row.data()) {
                    PrepareGoods_vue.W_Prepare_Goods.Receiver_Detail_Number = row.data().Receiver_Detail_Number;
                    PrepareGoods_vue.searchModel1 = {
                        "Where_Parameter_List": [{
                            Field_Name: "W_Out_Storeage_Wait.Corporation_Id",
                            Condition_Value1: row.data().Corporation_Id,
                            Expression: "02",
                            Module_Id: "Warehouse",
                            Query_Type: "01"
                        },
                        {
                            Field_Name: "W_Out_Storeage_Wait.Corporation_Object",
                            Condition_Value1: row.data().Corporation_Object,
                            Expression: "02",
                            Module_Id: "Warehouse",
                            Query_Type: "01"
                        }]
                    }
                }
            }
            if (!relevantnumber) {
                PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List = [];
                PrepareGoods_vue.AddressList = [];
            }
        },
        OutStoreageWaitRowClick: function (row) {
            if (!row.data()) {
                return;
            }
            this.OutStoreageWaitRowList = row.data();
            var obj = {};
            obj = {
                "Where_Parameter_List": [{
                    Field_Name: "W_Out_Storeage_Wait_Detail.Out_Storeage_Wait_Id",
                    Condition_Value1: row.data().Out_Storeage_Wait_Id,
                    Expression: "02",
                    Module_Id: "Warehouse",
                    Query_Type: "01"
                }],
                "Pagination_Info": { Page_Size: 100 }
            }
            if ($(row.node()).hasClass("selected")) {
                for (var index = PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.length - 1; index >= 0; index--) {
                    var item = PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List[index];
                    if (item.Out_Storeage_Wait_Id == row.data().Out_Storeage_Wait_Id) {
                        PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.splice(index, 1);
                    }
                }

                for (var i = PrepareGoods_vue.AddressList.length - 1; i >= 0; i--) {
                    var item = PrepareGoods_vue.AddressList[i];
                    if (item.Out_Storeage_Wait_Id == row.data().Out_Storeage_Wait_Id) {
                        PrepareGoods_vue.AddressList.splice(index, 1);
                    }
                }

                PageCommon.RefreshTablePage("PrepareGoodsNewList");
            } else {
                PageCommon.GetFormData({
                    url: "../OutStoreageWait/IntroduceOutstoreageWaitDetail",
                    param: { searchModel: obj },
                    success: function (data) {
                        var address = {};
                        address.Address_Code_Gather = row.data().Address_Code_Gather;
                        address.Transportation_Way_Id = row.data().Transportation_Way_Id;
                        address.Out_Storeage_Wait_Id = row.data().Out_Storeage_Wait_Id;
                        address.Is_Replace_Cus_Deliver_Goods = row.data().Is_Replace_Cus_Deliver_Goods;
                        PrepareGoods_vue.AddressList.push(address);

                        $.each(data.data, function (index, item) {
                            var obj = {};
                            for (var key in item) {
                                var keyTypes = typeof item[key];
                                if (keyTypes != 'object' && keyTypes != 'function') {
                                    obj[key] = item[key];
                                }
                            }
                            //obj.Product_Name = item.Product_Name + "@@";
                            obj.Should_Prepare_Count = item.Should_Out_Count;
                            obj.This_Prepare_Count = parseFloat(item.Should_Out_Count) - parseFloat(item.Return_Goods_Count) - parseFloat(item.Cancel_Count) - parseFloat(item.Total_Prepared_Count);
                            obj.Out_Storeage_Wait_Detail_Number = item.Detail_Number;
                            obj.Total_Prepared_Count = item.Total_Prepared_Count ? item.Total_Prepared_Count : 0;
                            PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.push(obj);
                            PageCommon.RefreshTablePage("PrepareGoodsNewList");
                        });

                    }
                });

            }
        },
        Search: function () {
            PrepareGoods_vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000009", List_Id: "CorporationList" });
        },
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

        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            //$('#PrepareGoodsNewList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "PrepareGoodsNewList",
                Key: "This_Prepare_Count",
                columns: [
                     {
                         columnName: "This_Prepare_Count",
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
            if (PrepareGoods_vue.AddressList.length > 1) {
                for (var i = PrepareGoods_vue.AddressList.length - 1; i > 0; i--) {
                    if (PrepareGoods_vue.AddressList[i].Receiver_Detail_Number != PrepareGoods_vue.AddressList[i - 1].Receiver_Detail_Number && PrepareGoods_vue.AddressList[i].Transportation_Way_Id != PrepareGoods_vue.AddressList[i - 1].Transportation_Way_Id && PrepareGoods_vue.AddressList[i].Is_Replace_Cus_Deliver_Goods != PrepareGoods_vue.AddressList[i - 1].Is_Replace_Cus_Deliver_Goods) {
                        PageCommon.ShowMessageRight("E2054");
                        return
                    }
                }
            }



            //获取grid数据
            var productdata = PageCommon.GetDataTableData("PrepareGoodsNewList");
            PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List = [];
            ////组织明细数据 过滤空行
            var COUNT = 0;
            var flag = false;
            $.each(productdata, function (index, item) {
                if (item.This_Prepare_Count > item.Should_Prepare_Count - item.Total_Prepared_Count) {
                    PageCommon.ShowMessageArrayRight("E2053", new Array(item.Product_Name));
                    flag = true;
                }
                if (item.This_Prepare_Count != "") {
                    item.Prepared_Count = parseInt(item.Total_Prepared_Count);
                    COUNT = COUNT + parseInt(item.This_Prepare_Count);
                    if (item.Product_Name.indexOf("@@") > -1) {
                        item.Product_Name = item.Product_Name.substring(0, item.Product_Name.indexOf("@@"));
                    }
                    PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List.push(item);

                }
            });

            if (flag) {
                return;
            }

            for (var key in PrepareGoods_vue.OutStoreageWaitRowList) {
                var keyTypeof = typeof PrepareGoods_vue.OutStoreageWaitRowList[key];
                if (keyTypeof != 'object' && keyTypeof != 'function') {
                    PrepareGoods_vue.W_Prepare_Goods[key] = PrepareGoods_vue.OutStoreageWaitRowList[key];
                }
            }
            PrepareGoods_vue.W_Prepare_Goods.Sum_Count = COUNT;
            PrepareGoods_vue.W_Prepare_Goods.Storeage_Id = PrepareGoods_vue.W_Prepare_Goods.W_Prepare_Goods_Detail_List[0].Storeage_Id;
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { prepareGoods: PrepareGoods_vue.W_Prepare_Goods }
             , success: function () {
                 PageCommon.RefreshTablePage("CorporationList");
                 //判断编辑还是新增
                 window.location.href = PageCommon.SetUrl("List");
             }
            });

        },
        TemplateSelectionProduct: function (data) {
            this.W_Prepare_Goods.Prepare_Goods_Employee_Id = data.id;
        },
        TemplateSelectionRecheck: function (data) {
            this.W_Prepare_Goods.Recheck_Employee_Id = data.id;
        },
        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        },
        Set: function () { },


    }
});