//菜单主键
var keyValue = PageCommon.Request("keyValue");
var menu_vue = new Vue({
    el: '#apps',
    data: {
        S_Menu: {
            Menu_Id: "",
            //系统名称
            System_Id: "",
            //菜单分组名称
            Menu_Group_Id: "",
            //菜单名称
            Menu_Name: "",
            //表示顺
            Show_Order: "",
            //菜单地址
            Menu_Address: "",
            //菜单地址
            Button_Name: "",
            //菜单样式
            Menu_Image: "",
            //菜单层级
            Menu_Layer: "",
            //是否审批显示
            Is_Approval_Show: "1",
            //是否启用
            Is_Activate: "0",
            //备注
            Remark: "",
            //用户显示
            Is_Show: "0",
            S_Button_List: []
        },
        //系统分组联动条件
        linkage: {},
        //系统下拉框排序
        systemOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //系统下拉框显示字段
        systemResult: ["System_Id", "System_Name"],
        //系统下拉框查询条件
        systemWhere: [],
        //菜单分组下拉查询条件
        menuGroupWhere: [],
        //菜单分组排序条件
        menuGroupOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //菜单分组下拉显示字段
        menuGroupResult: ["Menu_Group_Id", "Menu_Group_Name"],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "SystemSet",
            List_Id: ""
        },
        n: [],
        sortType:'1'
    },
    mounted: function () {
        var vm = this;
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm_detail").on("drag.end.arrangeable", function (sender, dragElement) {
            var child = $(this).children('.show-order');
            vm.n = [];
            $(child).each(function (i) {
                vm.n.push($(this).attr('drag-id'))
            })
            console.log(vm.n)
        });
        vm.n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
        //vm.dragSort();
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] }
                , success: function (data) {
                    console.log(data)
                    menu_vue.S_Menu = data;
                }
            });
        }
    },
    methods: {
        dragSort: function () {
            var vm = this;
            if (vm.sortType == '1') {
                $('#searchForm_detail .show-order').each(function (i) {
                    $(this).attr('drag-id', vm.n[i])
                })
                var $trs = $('#searchForm_detail .show-order');
                $trs.sort(function (a, b) {
                    var valveNumOfa = $(a).attr('drag-id');
                    var valveNumOfb = $(b).attr('drag-id');
                    if (parseInt(valveNumOfa) < parseInt(valveNumOfb)) return -1;
                    else return 1;
                });
                $trs.detach().appendTo('#searchForm_detail');
            } else {
                var $trs = $('#searchForm_detail .show-order');
                $trs.sort(function (a, b) {
                    var valveNumOfa = $(a).attr('data-id');
                    var valveNumOfb = $(b).attr('data-id');
                    if (parseInt(valveNumOfa) < parseInt(valveNumOfb)) return -1;
                    else return 1;
                });
                $trs.detach().appendTo('#searchForm_detail');
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Activate_Name") {
                var html = "<span class=\"label  label-success\">启用</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            } else if (Field_Name === "Is_Frame_Show_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }

            if (Field_Name === "Is_Activate") {
                return '0';
            } else if (Field_Name === "Is_Frame_Show") {
                return '1';
            }
        },
        //根据系统查询菜单分组
        ChangeSystem: function (value) {
            if (value) {
                menu_vue.linkage = {};
                menu_vue.linkage.Field_Name = "System_Id";
                menu_vue.linkage.Value1 = value.id;
            } else {
                menu_vue.linkage = '';
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
            else if (titleData.mData == "Is_Activate_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Is_Activate").html();
                $("#div_temp_Is_Activate").attr("id", "div_temp_Is_Activate_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Is_Activate_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Is_Activate: rowData.Is_Activate == '' ? '0' : rowData.Is_Activate
                    }
                });
            }
            else if (titleData.mData == "Button_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Button_Name").html();
                $("#div_temp_Button_Name").attr("id", "div_temp_Button_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Button_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Button_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Button_Frame_Id") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Button_Frame_Id").html();
                $("#div_temp_Button_Frame_Id").attr("id", "div_temp_Button_Frame_Id_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Button_Frame_Id_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Button_Frame_Id_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Frame_Menu_Address") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Frame_Menu_Address").html();
                $("#div_temp_Frame_Menu_Address").attr("id", "div_temp_Frame_Menu_Address_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Frame_Menu_Address_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Frame_Menu_Address: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Frame_Menu_Address_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Is_Frame_Show_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Is_Frame_Show").html();
                $("#div_temp_Is_Frame_Show").attr("id", "div_temp_Is_Frame_Show_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Is_Frame_Show_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Is_Frame_Show: rowData.Is_Frame_Show == '' ? '1' : rowData.Is_Frame_Show
                    }
                });
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
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
                    $(jqInputs).focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            } else if (titleData.mData == "Is_Frame_Show_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 7, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Frame_Show);
                //修改datatable 对应的值
                cell.data(value);
            } else if (titleData.mData == "Is_Activate_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 10, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ACTIVATE", rowData.Is_Activate);
                //修改datatable 对应的值
                cell.data(value);

            } else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs)) && ischeck) {
                    $(jqInputs).focus();

                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }

            }
        },
        //设置控件属性
        Set: function () {

            $.ajax({
                url: "/SystemSet/SystemNotice/SeeDetail",
                data: {},
                type: "post",
                dataType: "json",
                //async:false,
                success: function (data) {


                }


            });

            PageCommon.Reload();
        },
        //保存菜单画面数据
        Save: function () {

            //console.log($.fn.dataTable.Api('#ButtonList').rows());
            //console.log($.fn.dataTable.Api('#ButtonList').columns(':eq(' + 1+ ')'));

            PageCommon.CheckDataTables({
                tableId: "ButtonList",
                Key: "Button_Name",
                columns: [
                    {
                        columnName: "Frame_Menu_Address",
                        CheckLength: '200'
                    },
                     {
                         columnName: "Button_Name",
                         CheckLength: '200'
                     },
                    {
                        columnName: "Button_Frame_Id",
                        CheckEmpty: true,
                        CheckLength: '200'
                    }, {
                        columnName: "Remark",
                        CheckLength: '500'
                    }
                ],



            });


            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }


            //获取grid数据
            var data = PageCommon.GetDataTableData("ButtonList");
            menu_vue.S_Menu.S_Button_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Button_Name != "" && item.Button_Frame_Id != "") {
                    var obj = {};
                    obj.Button_Frame_Id = item.Button_Frame_Id;
                    obj.Button_Name = item.Button_Name;
                    obj.Detail_Number = item.Detail_Number;
                    obj.Is_Activate = item.Is_Activate == "" ? 0 : item.Is_Activate;
                    obj.Is_Activate_Name = obj.Is_Activate == "0" ? "启用" : "禁用";
                    obj.Is_Frame_Show = item.Is_Frame_Show == "" ? 1 : item.Is_Frame_Show;
                    obj.Is_Frame_Show_Name = obj.Is_Frame_Show == "0" ? "是" : "否";
                    obj.Frame_Menu_Address = item.Frame_Menu_Address;
                    obj.Menu_Id = menu_vue.S_Menu.Menu_Id;
                    obj.Remark = item.Remark;
                    menu_vue.S_Menu.S_Button_List.push(obj);
                }
            });



            //验证至少输入一条明细
            if (!menu_vue.S_Menu.S_Button_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }



            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { menu: menu_vue.S_Menu }
             , success: function () {
                 //判断编辑还是新增
                 if (!!!keyValue) {
                     PageCommon.Reload();
                 } else {
                     window.location.href = PageCommon.SetUrl("List");
                 }
             }
            });
        },
        //返回列表画面
        Back: function () {
            window.location.href = PageCommon.SetUrl("List");
        }
    }
});