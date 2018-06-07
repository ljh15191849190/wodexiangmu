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
var In_Storeage_vue = new Vue({
    el: '#apps',
    data: {
        W_In_Storeage: {
            //入库
            Storeage_Id: '',
            Storeage_Name: '',
            Corporation_Id: '',
            Corporation_Name: '',
            Remark: '',
            W_In_Storeage_Detail_List: [],
        },
        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "Warehouse",
            List_Id: ""
        },
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
        btnInStoreage: true,
        //是否遮罩
        isshade_bg: false,
        //位数cookie
        globalParameter: {},
        //  deleteList: [],

    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        $('#InStoreageNewList').on('dblclick', 'tbody tr', function () {
            if (vm.W_In_Storeage.Storeage_Id) {
                PageCommon.ModalOpen({
                    id: "ProductPackage",
                    title: '待入库查询引入',
                    width: "960px",
                    height: "600px",
                    btn: ['修改'],
                    url: '/Warehouse/InStoreage/Search',
                    callBack: function (iframeId) {
                        var list = PageCommon.ChildrenFrames(iframeId).vmInStoreage.Add();
                        console.log(list);
                    }
                })
            } else {
                PageCommon.ShowMessageRight("I3070");
            }

        })
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
                    In_Storeage_vue.W_In_Storeage = data;
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        lookCallBack: function () {
                            vm.btnInStoreage = false;
                        }
                    });
                    vm.isshade_bg = true;
                }
            });
        }

    },
    methods: {
        //执行入库
        InStoreage: function () {
            //var selectRow = PageCommon.GetDataTableData("InStoreageNewList");
            //验证至少输入一条明细
            if (!In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                return;
            }
            In_Storeage_vue.W_In_Storeage.Execute_InStoreage_Flag = 0;
            PageCommon.SubmitForm({
                url: "ExcuteInStoreage",
                param: { inStoreage: In_Storeage_vue.W_In_Storeage },
                success: function (data) {
                    //PageCommon.RefreshTablePage("InStoreageNewList");
                    window.location.href = PageCommon.SetUrl("List");
                }
            });

        },
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Should_Enter_Count" || Field_Name === "Entered_Count" || Field_Name === "This_Enter_Count" || Field_Name === "On_Shelf_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }

        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Should_Enter_Count" || Field_Name === "Entered_Count" || Field_Name === "This_Enter_Count" || Field_Name === "On_Shelf_Count") {
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
            else if (titleData.mData == "This_Enter_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_This_Enter_Count").html();
                $("#div_temp_This_Enter_Count").attr("id", "div_temp_This_Enter_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_This_Enter_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        This_Enter_Count: cell.data()
                    },
                    methods: {
                        EnterCountonchange: function (value) { }
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "This_Enter_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Fact_Goods_Locate_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Fact_Goods_Locate_Name").html();

                $("#div_temp_Fact_Goods_Locate_Name").attr("id", "div_temp_Fact_Goods_Locate_Name_" + cell.index().row + "_" + cell.index().column);
                //获取焦点后给将表格数据赋给控件
                var IdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Fact_Goods_Locate_Id' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', IdIndex, { search: 'applied' });
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Fact_Goods_Locate_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Fact_Goods_Locate_Name: "",
                        linkage: ''
                    },
                    mounted: function () {
                        this.linkage = In_Storeage_vue.W_In_Storeage.Storeage_Id;
                        this.Fact_Goods_Locate_Name = cell_active.data();

                    },
                    methods: {
                        TemplateSelection: function (data) {
                            if (data) {
                                cell.Goods_Locate_Id = data.id;
                                cell.Goods_Locate_Name = data.name;
                            } else {
                                cell.Goods_Locate_Id = '';
                                cell.Goods_Locate_Name = '';
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
            else if (titleData.mData == "Fact_Goods_Locate_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Fact_Goods_Locate_Name_" + cell.index().row + "_" + cell.index().column);
                if (typeof (cell.Goods_Locate_Name) == "undefined") {
                    cell.Goods_Locate_Id = $(jqInputs).val();
                    cell.Goods_Locate_Name = $(jqInputs).text();
                }

                //修改第2列 隐藏列的值
                //var cell_active = datatable.cell(':eq(' + ids + ')',8, { search: 'applied' });
                var IdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Fact_Goods_Locate_Id' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', IdIndex, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }

                else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Goods_Locate_Id);
                        cell.data(cell.Goods_Locate_Name);
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
                    PageCommon.RefreshTablePage("InStoreageNewList");
                }
            }



        },
        //调用弹出框数据
        ChangeValue: function (list) {
            console.log(list);
            In_Storeage_vue.W_In_Storeage.Corporation_Object = list.Corporation_Object;
            In_Storeage_vue.W_In_Storeage.Corporation_Id = list.Corporation_Id;
            In_Storeage_vue.W_In_Storeage.Corporation_Name = list.Corporation_Name;
            //In_Storeage_vue.W_In_Storeage.Storeage_Id = list.Storeage_Id;
            //In_Storeage_vue.W_In_Storeage.Storeage_Name = list.Storeage_Name;
            In_Storeage_vue.W_In_Storeage.Bill_Type = list.Bill_Type;

            $.each(list.W_In_Storeage_Detail_List, function (index, item) {
                var obj = {};
                for (var key in list) {
                    var keyTypes = typeof list[key];
                    if (keyTypes != 'object' && keyTypes != 'function') {
                        obj[key] = list[key];
                    }
                }
                obj.In_Storeage_Wait_Time = list.Create_Time;
                obj.In_Storeage_Wait_Detail_Number = list.Detail_Number;

                //子表
                obj.This_Enter_Count = item.This_Enter_Count;
                obj.Fact_Goods_Locate_Id = item.Fact_Goods_Locate_Id;
                obj.Fact_Goods_Locate_Name = item.Fact_Goods_Locate_Name;
                In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List.push(obj);
            })


            PageCommon.RefreshTablePage("InStoreageNewList");
        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            //$('#InStoreageNewList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "InStoreageNewList",
                Key: "This_Storeage_Count",
                columns: [
                     {
                         columnName: "This_Storeage_Count",
                         CheckEmpty: true,
                         CheckLength: '20'
                     },
                     {
                         columnName: "Fact_Goods_Locate_Id",
                         CheckEmpty: true,
                     },
                    {
                        columnName: "Fact_Goods_Locate_Name",
                        CheckEmpty: true,
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
            if (!In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //获取grid数据
            var productdata = PageCommon.GetDataTableData("InStoreageNewList");
            In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List = [];
            ////组织明细数据 过滤空行

            $.each(productdata, function (index, item) {
                if (item.This_Enter_Count != "") {
                    In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List.push(item);

                }

            });

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { inStoreage: In_Storeage_vue.W_In_Storeage }
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
        Set: function () { }

    }
});