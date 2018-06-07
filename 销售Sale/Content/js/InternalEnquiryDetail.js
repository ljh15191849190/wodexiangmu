
    //主键
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
var ConsultPrice_vue = new Vue({
    el: '#apps',
    data: {
        M_Consult_Price_Bill: {
            M_Consult_Price_Bill_Detail_List: []
        },
        //内部询价单表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000001",
            System_Key: "Sale",
            List_Id: "ConsultPriceBillListEdit"
        },
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
        //是否遮罩
        isshade_bg: false,
        //表格是否可编辑
        isedittable: true,
        //是否显示编辑按钮
        btnEdit: false,
        //位数cookie
        globalParameter: {},
        //编辑表格id
        tableid: ['ConsultPriceBillListEdit']
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $('.form-group').arrangeable({
            dragSelector: '.shade_bg'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber }
                , success: function (data) {
                    vm.M_Consult_Price_Bill = data;
                   //判断状态
                        PageCommon.EditStatus({
                            vm: vm,
                            approvalstatus: data.Approval_Status,

                        });
                }
            });

        }
    },
    methods: {
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Enquery_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_include_Tax_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }
            if (Field_Name === "Is_include_Tax") {
                return '0';
            }

            if (Field_Name === "Enquery_Count") {
                if (value) {
                   
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                
                }
            }


            if (Field_Name === "Receive_Price") {
                if (value) {
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
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
            else if (titleData.mData == "Customer_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Customer_Name").html();
                $("#div_temp_Customer_Name").attr("id", "div_temp_Customer_Name_" + cell.index().row + "_" + cell.index().column);

                //获取下C_CustomerId的下标
                var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Id' });
                var customerNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Name' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });
                var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', customerNameIndex, { search: 'applied' });
                cell.Customer_Id = cell_active.data();
                cell.Customer_Name = cell_active2.data();
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Customer_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Customer_Name: '',

                    },
                    mounted: function () {
                        this.Customer_Name = cell.Customer_Id;

                    },
                    methods: {
                        TemplateSelectionCustomer: function (data) {
                            if (data) {
                                cell.Customer_Id = data.Customer_Id;
                                cell.Customer_Name = data.Customer_Name;

                                var customeridIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Id' });
                                cell.cell(':eq(' + cell.index().row + ')', customeridIndex, { search: 'applied' }).data(data.Customer_Id);

                                var employeeIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Employee_Id' });
                                cell.cell(':eq(' + cell.index().row + ')', employeeIdIndex, { search: 'applied' }).data(data.Employee_Id);

                                var departmentIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Department_Id' });
                                cell.cell(':eq(' + cell.index().row + ')', departmentIdIndex, { search: 'applied' }).data(data.Department_Id);

                                var employeeName = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Employee_Name' });
                                cell.cell(':eq(' + cell.index().row + ')', employeeName, { search: 'applied' }).data(data.Employee_Name);

                                var departmentName = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Department_Name' });
                                cell.cell(':eq(' + cell.index().row + ')', departmentName, { search: 'applied' }).data(data.Department_Name);
                            } else {
                                cell.Customer_Id = '';
                                cell.Customer_Name = '';

                                var customeridIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Id' });
                                cell.cell(':eq(' + cell.index().row + ')', customeridIndex, { search: 'applied' }).data('');

                                var employeeIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Employee_Id' });
                                cell.cell(':eq(' + cell.index().row + ')', employeeIdIndex, { search: 'applied' }).data('');

                                var departmentIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Department_Id' });
                                cell.cell(':eq(' + cell.index().row + ')', departmentIdIndex, { search: 'applied' }).data('');

                                var employeeName = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Employee_Name' });
                                cell.cell(':eq(' + cell.index().row + ')', employeeName, { search: 'applied' }).data('');

                                var departmentName = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Department_Name' });
                                cell.cell(':eq(' + cell.index().row + ')', departmentName, { search: 'applied' }).data('');
                            }
                        }
                    }
                });
                $(".outer", cell.node()).width(tdWidth);

            }
            else if (titleData.mData == "Product_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Product_Name").html();
                $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);

                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                var productNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });
                var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', productNameIndex, { search: 'applied' });

                var purchaseIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Purchase' });
                var cell_active3 = cell.cell(':eq(' + cell.index().row + ')', purchaseIndex, { search: 'applied' });



                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Product_Purchase: "",

                    },
                    mounted: function () {
                        this.Product_Purchase = cell_active.data()+cell_active3.data();
                    },
                    methods: {
                        TemplateSelectionProduct: function (data) {
                            if (data) {
                                cell.New_Name = data.New_Name;
                                for (var key in data) {
                                    if (key != "Product_Name" && key != "ROWNUM") {
                                        var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                                        if (tindexs > 0) {
                                            var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                                            tcell.data(data[key]);
                                        }
                                    }
                                }
                            } 
                        },
                    }
                });
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Enquery_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Enquery_Count").html();
                $("#div_temp_Enquery_Count").attr("id", "div_temp_Enquery_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Enquery_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Enquery_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Count_Tag_Name") {
                if ($('select', cell.node()).length > 0) {
                    return;
                }
                //获取模板的html
                cell.node().innerHTML = $("#temp_Count_Tag").html();
                $("#div_temp_Count_Tag").attr("id", "div_temp_Count_Tag_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Count_Tag_" + cell.index().row + "_" + cell.index().column,
                    data: {

                        Count_Tag: rowData.Count_Tag
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());

                $(jqInputs).attr('id', "Count_Tag_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Receive_Price") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Receive_Price").html();
                $("#div_temp_Receive_Price").attr("id", "div_temp_Receive_Price_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Receive_Price_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Receive_Price_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Is_include_Tax_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Is_include_Tax").html();
                $("#div_temp_Is_include_Tax").attr("id", "div_temp_Is_include_Tax_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Is_include_Tax_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Is_include_Tax: cell.data() == '是' ? '0' : '1'
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

            }
            if (titleData.mData == "Count_Tag_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var countTagIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Count_Tag' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', countTagIndex, { search: 'applied' });
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
            if (titleData.mData == "Product_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Product_Name_" + cell.index().row + "_" + cell.index().column);
                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                var cell_active = cell.cell(':eq(' + ids + ')', productIdIndex, { search: 'applied' });
                console.log($(jqInputs[0]).val())
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
                    ////修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {

                        cell.data(cell.New_Name);

                    } else {
                        for (var key in rowData) {
                            if (key != "ROWNUM" && key != "edit") {
                                var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                                var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                                tcell.data("");
                            }
                        }
                    }
                }
            }
            if (titleData.mData == "Customer_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Customer_Name_" + cell.index().row + "_" + cell.index().column);
                //修改第2列 隐藏列的值
                var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Id' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Customer_Id);
                        cell.data(cell.Customer_Name);
                    } else {
                        cell.data("");
                    }
                }
            }
            if (titleData.mData == "Is_include_Tax_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var isIncludeIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_include_Tax' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', isIncludeIndex, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_include_Tax);
                //修改datatable 对应的值
                cell.data(value);
            }
            else {

                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
                PageCommon.RefreshTablePage("ConsultPriceBillListEdit");

            }
        },
        //保存菜单画面数据
        Save: function () {
            PageCommon.CheckDataTables({
                tableId: "ConsultPriceBillListEdit",
                Key: "Product_Name",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty: true
                    },
                     {
                         columnName: "Count_Tag",
                         CheckEmpty:true,
                         CheckLength:"30"
                     },
                    {
                        columnName: "Customer_Name",
                        CheckEmpty: true
                    }, {
                        columnName: "Receive_Price",
                        CheckEmpty: true,
                        CheckLength:'28'
                    }, {
                        columnName: "Enquery_Count",
                        CheckEmpty: true,
                        CheckLength: '14'

                    }, {
                        columnName: "Remark",
                        CheckLength: "500"
                    }
                ],
            });
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("ConsultPriceBillListEdit");
            ConsultPrice_vue.M_Consult_Price_Bill.M_Consult_Price_Bill_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Product_Name != "" && item.Customer_Name != "") {
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];
                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }
                    }


                    if (obj.Product_Name != "") {
                        ConsultPrice_vue.M_Consult_Price_Bill.M_Consult_Price_Bill_Detail_List.push(obj);
                    }

                }
            });

            //验证至少输入一条明细
            if (!ConsultPrice_vue.M_Consult_Price_Bill.M_Consult_Price_Bill_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            ConsultPrice_vue.M_Consult_Price_Bill.Is_Purchase = 0;
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { consultPriceBill: ConsultPrice_vue.M_Consult_Price_Bill }
             , success: function (data) {
                 //判断新增还是修改
                 if (!!!relevantnumber) {
                     ConsultPrice_vue.M_Consult_Price_Bill = '';
                     PageCommon.Reload();
                 } else {
                     window.location.href = PageCommon.SetUrl("List");
                 }

             }
            });
        },
        //编辑
        Edit: function () {
            var vm = this;
            PageCommon.Clickbtn(vm, 'Edit');
        },
        //设置
        Set: function () {

        },
        //返回列表画面
        Back: function () {
            PageCommon.BackFormMessge('List');
        },
    }
});
