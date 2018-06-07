
var keyValue = PageCommon.Request("keyValue");
var dataDictionary_vm = new Vue({
    el: '#apps',
    data: {
        S_Data_Dictionary_Group: {
            //对象类型
            Object_Type: '',
            //对象名称
            Object_Name: '',
            //编辑表格
            S_Data_Dictionary_List: []

        },
        columHeaderSeach: {
            Menu_Id: "M000040",
            System_Key: "SystemSet",
            List_Id: ""
        },
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
                    dataDictionary_vm.S_Data_Dictionary_Group = data;
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
            if (Field_Name === "Is_Activate") {
                return '0';
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
                        Remark: cell.data()
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
            else if (titleData.mData == "Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Name").html();
                $("#div_temp_Name").attr("id", "div_temp_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Name: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Show_Order") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Show_Order").html();
                $("#div_temp_Show_Order").attr("id", "div_temp_Show_Order_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Show_Order_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Show_Order: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Show_Order_" + cell.index().row + "_" + cell.index().column);
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

            } else if (titleData.mData == "Is_Activate_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 8, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ACTIVATE", rowData.Is_Activate);
                //修改datatable 对应的值
                cell.data(value);

            } else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck ){
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }
        },
        //保存数据字典画面数据
        Save: function () {
            PageCommon.CheckDataTables({
                tableId: "DataDictionaryList",
                Key: "Code",
                columns: [
                    {
                        columnName: "Code",
                        CheckEmpty: true,
                        CheckLength: '200'
                    },
                     {
                         columnName: "Name",
                         CheckEmpty: true,
                         CheckLength: '200'
                     },
                    {
                        columnName: "Show_Order",
                        CheckEmpty: true,
                        CheckLength: '200'
                    }, {
                        columnName: "Remark",
                        CheckLength: '200'
                    }
                ]
            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("DataDictionaryList");
            dataDictionary_vm.S_Data_Dictionary_Group.S_Data_Dictionary_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Code != "" && item.Name != "" && item.Show_Order != "") {
                    var obj = {};
                    obj.Object_Type = dataDictionary_vm.S_Data_Dictionary_Group.Object_Type;
                    obj.Code = item.Code;
                    obj.Name = item.Name;
                    obj.Show_Order = item.Show_Order;
                    obj.Remark = item.Remark;
                    obj.Is_Activate = item.Is_Activate == "" ? 0 : item.Is_Activate;
                    obj.Is_Activate_Name = obj.Is_Activate == "0" ? "启用" : "禁用";
                    dataDictionary_vm.S_Data_Dictionary_Group.S_Data_Dictionary_List.push(obj);
                }
            });

            //验证至少输入一条明细
            if (!dataDictionary_vm.S_Data_Dictionary_Group.S_Data_Dictionary_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { "dataDictionaryGroup": dataDictionary_vm.S_Data_Dictionary_Group, "keyValue": [keyValue] }
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
        Back: function (obj) {
            PageCommon.BackFormMessge("List");
            //window.location.href = PageCommon.SetUrl("List");
        }
    }
})
