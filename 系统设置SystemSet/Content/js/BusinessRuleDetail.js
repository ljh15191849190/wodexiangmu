
var keyValue = PageCommon.Request("keyValue");
var vm_rule = new Vue({
    el: '#apps',
    data: {
        S_Business_Rule: {
            //对象类型
            Business_Rule_Object: '',
            //菜单名称
            Menu_Id: '',
            //表示顺
            Show_Order: '',
            //标题
            Title: '',
            //控件类型
            Control_Type: '',
            //备注
            Remark: '',
            //启用
            Is_Activate: '0',
            //编辑表格
            S_Business_Rule_Detail_List: []
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000039",
            System_Key: "SystemSet",
            List_Id: ""
        },
        //菜单查询条件
        Menuresult: ["Menu_Id", "Menu_Name"],
        filedSearch: ["Menu_Id", "Menu_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Menu_Id", "Menu_Name"],
        mainWhere: [{
            Field_Name: "Menu_Layer",
            Value1: "0",
            Expression: "04",
            Module_Id: "SystemSet"
        }],
        shade: false
    },
    mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        if (keyValue) {
            this.shade = true
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] }
                , success: function (data) {
                    vm_rule.S_Business_Rule = data;
                }
            });
        }
    },
    methods: {
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Activate_Name") {
                var html = "<span class=\"label  label-success\">启用</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }
            if (Field_Name === "Control_Type_Name") {

            }
            if (Field_Name === "Is_Activate") {
                return '0';
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Detail_Number") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Detail_Number").html();

                $("#div_temp_Detail_Number").attr("id", "div_temp_Detail_Number_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Detail_Number_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Detail_Number: cell.data()
                    }
                });

                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Detail_Number_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }

            else if (titleData.mData == "Rule_Small_Title") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Rule_Small_Title").html();
                $("#div_temp_Rule_Small_Title").attr("id", "div_temp_Rule_Small_Title_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Rule_Small_Title_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Rule_Small_Title: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Rule_Small_Title_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
             else if (titleData.mData == "Control_Id") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Control_Id").html();
                $("#div_temp_Control_Id").attr("id", "div_temp_Control_Id_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Control_Id_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Control_Id: cell.data()

                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Control_Id_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Control_Type_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Control_Type").html();
                $("#div_temp_Control_Type").attr("id", "div_temp_Control_Type_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Control_Type_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        dictionary_key: "CONTORL_TYPE",
                        Control_Type: rowData.Control_Type
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Control_Type_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
           
            else if (titleData.mData == "Code") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Code").html();
                $("#div_temp_Code").attr("id", "div_temp_Code_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Code_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Code: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Code_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Value") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Value").html();
                $("#div_temp_Value").attr("id", "div_temp_Value_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Value_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Value: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Value_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Selected_Code") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Selected_Code").html();
                $("#div_temp_Selected_Code").attr("id", "div_temp_Selected_Code_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Selected_Code_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Selected_Code: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Selected_Code_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Selected_Value") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Selected_Value").html();
                $("#div_temp_Selected_Value").attr("id", "div_temp_Selected_Value_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Selected_Value_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Selected_Value: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Selected_Value_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
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
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Is_Activate_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 13, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ACTIVATE", rowData.Is_Activate);
                //修改datatable 对应的值
                cell.data(value);

            } else if (titleData.mData == "Control_Type_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 7, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                console.log($(jqInputs[0]).val());
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                } else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).find("option:selected").html()) {
                        cell.data($(jqInputs[0]).find("option:selected").html());
                    } else {
                        cell.data("");
                    }
                }
            }else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]),datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }
        },
        //保存业务规则画面数据
        Save: function () {
            PageCommon.CheckDataTables({
                tableId: "BusinessRuleDetailList",
                Key: "Rule_Small_Title",
                columns: [
                    {
                        columnName: "Rule_Small_Title",
                        CheckEmpty: true,
                        CheckLength: '200'
                    },
                      {
                         columnName: "Control_Id",
                         CheckEmpty: true,                     
                         CheckLength: '200'
                      },
                      {
                          columnName: "Control_Type_Name",
                          CheckEmpty: true
                      },
                    {
                        columnName: "Control_Type",
                        CheckEmpty: true,
                    },
                    {
                        columnName: "Code",
                        CheckEmpty: true,
                        CheckLength: '200'

                    }, 
                    {
                        columnName: "Value",
                        CheckEmpty: true,
                        CheckLength: '200'

                    }
                ],
            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }

            //获取grid数据
            var data = PageCommon.GetDataTableData("BusinessRuleDetailList");

            vm_rule.S_Business_Rule.S_Business_Rule_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Rule_Small_Title != "" && item.Control_Id && item.Control_Type != "" && item.Code != "" && item.Value != "") {
                    var obj = {};
                    obj.Detail_Number = item.Detail_Number;
                    obj.Rule_Small_Title = item.Rule_Small_Title;
                    obj.Control_Type = item.Control_Type;
                    obj.Control_Type_Name = item.Control_Type_Name;
                    obj.Code = item.Code;
                    obj.Value = item.Value;
                    obj.Selected_Code = item.Selected_Code;
                    obj.Selected_Value = item.Selected_Value;
                    obj.Business_Rule_Id = vm_rule.S_Business_Rule.Business_Rule_Id;
                    obj.Is_Activate = item.Is_Activate == "" ? 0 : item.Is_Activate;
                    obj.Is_Activate_Name = obj.Is_Activate == "0" ? "启用" : "禁用";
                    obj.Control_Id = item.Control_Id;//vm_rule.S_Business_Rule_Detail.Control_Id;
                    vm_rule.S_Business_Rule.S_Business_Rule_Detail_List.push(obj);
                }
            });

            //验证至少输入一条明细
            if (!vm_rule.S_Business_Rule.S_Business_Rule_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save",
                param: { "businessRule": vm_rule.S_Business_Rule, "keyValue": [keyValue] },
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
        //返回列表画面
        Back: function (obj) {
            PageCommon.BackFormMessge("List");
            //window.location.href = PageCommon.SetUrl("List");
        },
    }
})
