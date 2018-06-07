
    //主键
    var RequestValue = PageCommon.Request();
if (RequestValue.relevantnumber) {
    var relevantnumber = RequestValue.relevantnumber;
    if (relevantnumber.indexOf(',') != -1) {
        relevantnumber = relevantnumber.split(",");
    } else {
        relevantnumber = [relevantnumber];
    }
}
if (RequestValue.save) {
    var save = RequestValue.save;
}
var ConsignSaleCancel_vue = new Vue({
    el: '#apps',
    data: {
        M_Consign_Sale_Apply_Cancel: {
            //取消日期
            Cancel_Date: '',
            //客户名称
            Customer_Id:'',
            //备注
            Remark:'',
            M_Consign_Sale_Apply_C_Detail_List: []
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000009",
            System_Key: "Sale",
            List_Id: "ConsignSaleCancelDetail"
        },
        Customerresult: ["Customer_Id", "Customer_Name"],
        CustomerSearch: ["Customer_Id", "Customer_Name"],
        CustomerinputField: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],


        //是否只读
        readonly: false,
        //是否遮罩
        isshade_bg: false,
        //表格是否可编辑
        isedittable: true,
        //是否显示审核按钮
        btnApproval: false,
        //是否显示审批意见按钮
        btnApprovalOpinion: false,
        //是否显示保存按钮
        btnSave: true,
        //是否显示提交按钮
        btnSubmit: false,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
        //是否显示编辑按钮
        btnEdit: false,
        //位数cookie
        globalParameter: {},
        //是否编辑
        IsEdit: 0,
        //编辑表格id
        tableid: ['ConsignSaleCancelDetail']
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

        });
        //页签折叠
        $(".title1").click(function () {
            $(this).parent().find(".BasicInformation").slideToggle();
            $(this).parent().find(".down_tab").toggleClass("rotate");
            $(this).toggleClass("boder");
        })
        $(".down_tab").click(function () {
            $(this).parent().find(".BasicInformation").slideToggle();
            $(this).parent().find(".title1").toggleClass("boder");
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
                    ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel = data;
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        approvalstatus: data.Approval_Status,

                    });
                    //点击保存
                    PageCommon.Clickbtn(vm, 'Save');
                    if (save) {
                        vm.isedittable = false;
                    }

                }
            });
        } else {
            vm.IsEdit = 1;

        }
        $('#ConsignSaleCancelDetail').on('dblclick', 'tbody tr', function () {
            if (vm.M_Consign_Sale_Apply_Cancel.Customer_Id == "") {

                PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                return;
            }
            PageCommon.ModalOpen({
                id: "SearchDetail",
                title: '寄售申请取消详细',
                width: "900px",
                height: "800px",
                btn: ["添加"],
                url: '/Sale/ConsignSaleCancel/ConsignDetailSearch?CustomerId=' + ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Customer_Id,
                callBack: function (iframeId) {

                    var selectRow = PageCommon.ChildrenFrames(iframeId).vmConsignSaleSearch.SelectRow();
                    PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();

                    if (selectRow.length == 0) {
                        return;
                    }
                    var data = PageCommon.GetDataTableData("ConsignSaleCancelDetail");

                    $.each(selectRow, function (index, item) {
                        vm.F_Pay_Bill.F_Pay_Bill_Detail_List.push(item);

                    })

                    PageCommon.RefreshTablePage("ConsignSaleCancelDetail");
                }
            })
        })
    },
    methods: {
        //客户选择
        TemplateSelectionCustomer: function (data) {
            if (data) {
                ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Employee_Id = data.Employee_Id;
                ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Department_Name = data.Department_Name;

                if (ConsignSaleCancel_vue.IsEdit > 0) {
                    ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.M_Consign_Sale_Apply_C_Detail_List = [];

                }
                ConsignSaleCancel_vue.IsEdit=1;
            } else {
                ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Employee_Id = '';
                ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Department_Name = '';
                ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.M_Consign_Sale_Apply_C_Detail_List = [];
            }
        },
        //数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;

            if (Field_Name === "Allow_Cancel_Count" || Field_Name === "This_Cancel_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            //税额
            if (Field_Name === "Tax") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum" || Field_Name === "Cancel_Sum") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Purchase_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }

            }

            if (Field_Name === "Is_Purchase") {
                return '0';
            }
            //数量
            if (Field_Name === "Allow_Cancel_Count" || Field_Name === "This_Cancel_Count") {
                if (value) {
                   
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
               
                }
            }

            //价税合计
            if (Field_Name === "Price_Tax_Sum" || Field_Name === "Cancel_Sum") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }

            //税额
            if (Field_Name === "Tax") {
                if (value) {
                   
                return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
               
                }
            }
            //单价
            if (Field_Name === "Price") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Customer_Id == "") {

                PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                return;
            } else {

                if (titleData.mData == "Receive_Storeage_Id_Name") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Receive_Storeage_Id").html();
                    $("#div_temp_Receive_Storeage_Id").attr("id", "div_temp_Receive_Storeage_Id_" + cell.index().row + "_" + cell.index().column);
                    var storageaIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Receive_Storeage_Id' });
                    var storageaNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Receive_Storeage_Id_Name' });

                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', storageaIdIndex, { search: 'applied' });
                    var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', storageaNameIndex, { search: 'applied' });
                    cell.Receive_Storeage_Id_Name = cell_active2.data();

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Receive_Storeage_Id_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Receive_Storeage_Id: "",
                        },
                        mounted: function () {
                            this.Receive_Storeage_Id = cell_active.data();
                        },
                        methods: {
                            TemplateSelectionStoragea: function (data) {
                                if (data) {
                                    cell.Receive_Storeage_Id = data.Storeage_Id;
                                    cell.Receive_Storeage_Id_Name = data.Storeage_Name;
                                } else {
                                    cell.Receive_Storeage_Id = '';
                                    cell.Receive_Storeage_Id_Name = '';
                                }
                            }
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    //$(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Receive_Storeage_Id_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "This_Cancel_Count") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_This_Cancel_Count").html();
                    $("#div_temp_This_Cancel_Count").attr("id", "div_temp_This_Cancel_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_This_Cancel_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "This_Cancel_Count_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Cancel_Reason_Name") {
                    if ($('select', cell.node()).length > 0) {
                        return;
                    }
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Cancel_Reason").html();
                    $("#div_temp_Cancel_Reason").attr("id", "div_temp_Cancel_Reason_" + cell.index().row + "_" + cell.index().column);

                    var OtherIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Other_Reason' });
                    var Othervalue = cell.cell(':eq(' + cell.index().row + ')', OtherIndex, { search: 'applied' });

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Cancel_Reason_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Cancel_Reason: rowData.Cancel_Reason
                        },
                        methods: {
                            ReasonChange: function (val) {
                                if (val.id != "05") {
                                    Othervalue.data("");
                                }
                            }
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('select', cell.node());

                    $(jqInputs).attr('id', "Cancel_Reason_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Other_Reason") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Other_Reason").html();

                    $("#div_temp_Other_Reason").attr("id", "div_temp_Other_Reason_" + cell.index().row + "_" + cell.index().column);
                    var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Cancel_Reason_Name' });
                    var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();

                    cell.isshade_bg = false;
                    cell.readonly = false;

                    if (value == "其他原因") {
                        cell.isshade_bg = false
                        cell.readonly = false
                    } else {
                        cell.isshade_bg = true
                        cell.readonly = true
                    }

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Other_Reason_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data(),
                            isshade_bg: cell.isshade_bg,
                            readonly: cell.readonly
                        }
                    });

                    //设置控件在DataTables上
                    var jqInputs = $('textarea', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
                    $(".outer-lg", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Remark") {
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
            }

        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Product_Name") {
                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' }).data();

                cell.data(cell_active);
            }
            if (titleData.mData == "This_Cancel_Count") {
                var cancelIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Allow_Cancel_Count' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', cancelIndex, { search: 'applied' }).data();
                Returncount = parseFloat(cell_active);
                var jqInputs = $('input', cell.node());
                var RelCount = parseFloat($(jqInputs[0]).val());
                //本次取消数量验证
                if (RelCount > Returncount) {
                    PageCommon.ShowMessageArrayRight("E1014", new Array("本次取消数量", "可取消数量"));
                    cell.data("");
                    return;
                }
                //取消总金额计算
                var cancelSumindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: "Cancel_Sum" });
                var tcellcancelSum = cell.cell(':eq(' + cell.index().row + ')', cancelSumindexs, { search: 'applied' });

                var pricesumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });
                var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', pricesumIndex, { search: 'applied' }).data();

                var cancelSum = cell_active2 * $(jqInputs[0]).val();
                tcellcancelSum.data(cancelSum);
            }
            if (titleData.mData == "Receive_Storeage_Id_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Receive_Storeage_Id_Name_" + cell.index().row + "_" + cell.index().column);
                var storageaIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Receive_Storeage_Id' });
                var cell_active = cell.cell(':eq(' + ids + ')', storageaIdIndex, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                if ($(jqInputs[0]).val()) {
                    cell_active.data(cell.Receive_Storeage_Id);
                    cell.data(cell.Receive_Storeage_Id_Name);

                }

                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }

            }
            if (titleData.mData == "Other_Reason") {
                var jqInputs = $('textarea', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
                    $(jqInputs).focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            }
            if (titleData.mData == "Cancel_Reason_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var goodsApplyIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Cancel_Reason' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', goodsApplyIndex, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());

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
            else {

                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
                PageCommon.RefreshTablePage("ConsignSaleCancelDetail");

            }
        },
        //设置控件属性
        //保存菜单画面数据
        Set: function () {

        },
        Save: function () {

            PageCommon.CheckDataTables({
                tableId: "ConsignSaleCancelDetail",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty: true
                    },
                     {
                         columnName: "This_Cancel_Count",
                         CheckEmpty:true,
                         CheckLength: '14'
                     },

                     {
                         columnName: "Cancel_Reason",
                         CheckEmpty: true
                     },
                     {
                         columnName: "Other_Reason",
                         CheckLength: '500'
                     },
                ],



            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("ConsignSaleCancelDetail");

            ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.M_Consign_Sale_Apply_C_Detail_List = [];

            //设置统购外购
            ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.Is_Purchase = "0";


            //销售退货信息组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Product_Name != "" && item.This_Cancel_Count != "" && item.Cancel_Reason != "") {
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];

                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }
                    }

                    if (obj.Product_Name != "") {
                        ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.M_Consign_Sale_Apply_C_Detail_List.push(obj);
                    }

                }
            });

            //验证至少输入一条明细
            if (!ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel.M_Consign_Sale_Apply_C_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { ConsignSaleApplyCancel: ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel }
             , success: function (data) {
                 window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Consign_Sale_Apply_Cancel_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
             }
            });
        },
        //编辑
        Edit: function () {
            var vm = this;
            PageCommon.Clickbtn(vm, 'Edit');
        },

        //提交
        Submit: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Submit"
             , param: { ConsignSaleApplyCancel: ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //审核
        Approval: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Approval"
             , param: { ConsignSaleApplyCancel: ConsignSaleCancel_vue.M_Consign_Sale_Apply_Cancel },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("List");
                }
            });
        },
        //审批意见
        mApproval: function () {

        },

        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List', vm);
        }
    }
});
