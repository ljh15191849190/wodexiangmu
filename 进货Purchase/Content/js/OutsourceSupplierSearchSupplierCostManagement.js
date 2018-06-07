var keyValue = PageCommon.Request("keyValue");
var searchData = {};
var SupplierCostManage = new Vue({
    el: '#app',
    data: {
        //编辑表格
        B_Supplier_Charge_List: [],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000012",
            System_Key: "Purchase",
            List_Id: ""
        }
    },
    mounted: function () {
        if (keyValue) {
            PageCommon.GetFormData({
                url: "SeachSupplierCharge",
                param: { keyValue: keyValue }
                , success: function (data) {
                    console.log(data)
                    SupplierCostManage.B_Supplier_Charge_List = data;
                }
            });
        }
    },
    methods: {
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Charge") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Charge") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Charge").html();

                $("#div_temp_Charge").attr("id", "div_temp_Charge_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Charge_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Charge: cell.data()
                    }
                });

                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Charge_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Currency_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Currency_Name").html();
                $("#div_temp_Currency_Name").attr("id", "div_temp_Currency_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Currency_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Currency_Id: rowData.Currency_Id,
                        //系统下拉框查询条件
                        systemWhere: [],
                        //系统下拉框排序
                        systemOrder: [{
                            Field_Name: "Show_Order",
                            Orderby: "ASC"
                        }],
                        //系统下拉框显示字段
                        systemResult: ["Currency_Id", "Currency_Name"],
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Currency_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Currency_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 3, { search: 'applied' });
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
            }
            else {
                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                    cell.focus();

                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }
        },
        //保存
        Save: function () {
            $('#PurchaseSupplierChargeList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "PurchaseSupplierChargeList",
                Key: "Currency_Name",
                columns: [
                    {
                        columnName: "Currency_Name",
                        CheckEmpty: true,
                        CheckLength: '200'
                    },
                      {
                          columnName: "Charge",
                          CheckEmpty: true,
                          CheckLength: '200'
                      }
                ]
            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }

            //获取grid数据
            var data = PageCommon.GetDataTableData("PurchaseSupplierChargeList");

            SupplierCostManage.B_Supplier_Charge_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Currency_Id != "" && item.Currency_Name != "") {
                    var obj = {};
                    obj.Currency_Id = item.Currency_Id;
                    obj.Currency_Name = item.Currency_Name;
                    obj.Charge = item.Charge;
                    obj.Supplier_Id = keyValue;
                    SupplierCostManage.B_Supplier_Charge_List.push(obj);
                }
            });

            //验证至少输入一条明细
            if (!SupplierCostManage.B_Supplier_Charge_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "SaveSupplierCharge",
                param: { "supplierChargeList": SupplierCostManage.B_Supplier_Charge_List },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("PurchaseSupplierDetailList");
                }
            });
        },
        //统一费用
        FlatRate: function () {

        }
    }
});