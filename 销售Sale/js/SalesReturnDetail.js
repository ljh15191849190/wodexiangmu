
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
var SalesReturn_vue = new Vue({
    el: '#apps',
    data: {
        M_Sale_Return_Goods: {
            //退货日期
            Return_Goods_Date: '',
            //客户名称
            Customer_Id: '',
            //是否开票
            Is_Invoice: '0',
            //是否退款
            Is_Collect_Money: '0',
            //是否提佣金
            Is_Take_Commission: '0',
            //任务人
            Employee_Id: '',
            //任务人部门
            Department_Id: '',
            //退货备注
            Remark: '',
            M_Sale_Return_Goods_Detail_List: []
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000007",
            System_Key: "Sale",
            List_Id: "SaleReturnDetailEdit"
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
        tableid: ['SaleReturnDetailEdit']
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
                    SalesReturn_vue.M_Sale_Return_Goods = data;
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
        $('#SaleReturnDetailEdit').on('dblclick', 'tbody tr', function () {
            if (vm.M_Sale_Return_Goods.Customer_Id == "") {

                PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                return;
            } else {
                PageCommon.ModalOpen({
                    id: "SearchDetail",
                    title: '销售退货取消',
                    width: "900px",
                    height: "800px",
                    btn: ["添加"],
                    url: '/Sale/SalesReturn/SaleDetailSearch?CustomerId=' + SalesReturn_vue.M_Sale_Return_Goods.Customer_Id,
                    callBack: function (iframeId) {

                        var selectRow = PageCommon.ChildrenFrames(iframeId).vmSaleOrderDetail.SelectRow();
                        PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();

                        if (selectRow.length == 0) {
                            return;
                        }
                        $.each(selectRow, function (index, item) {
                            vm.M_Sale_Return_Goods.M_Sale_Return_Goods_Detail_List.push(item);

                        })

                        PageCommon.RefreshTablePage("SaleReturnDetailEdit");

                    }
                })
            }
        })

    },
    methods: {
        //客户选择
        TemplateSelectionCustomer: function (data) {
            if (data) {
                SalesReturn_vue.M_Sale_Return_Goods.Employee_Id = data.Employee_Id;
                SalesReturn_vue.M_Sale_Return_Goods.Department_Id = data.Department_Id;

                if (SalesReturn_vue.IsEdit > 0) {
                    SalesReturn_vue.M_Sale_Return_Goods.M_Sale_Return_Goods_Detail_List = [];
                }
                SalesReturn_vue.IsEdit = 1;
            } else {
                SalesReturn_vue.M_Sale_Return_Goods.Employee_Id = '';
                SalesReturn_vue.M_Sale_Return_Goods.Department_Id = '';
                SalesReturn_vue.M_Sale_Return_Goods.M_Sale_Return_Goods_Detail_List = [];
            }
        },
        //数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;

            if (Field_Name === "This_Return_Count" || Field_Name === "Allow_Return_Goods_Count") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
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
            if (Field_Name === "This_Return_Count" || Field_Name === "Allow_Return_Goods_Count") {
                if (value) {
                   
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
               
                }
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (SalesReturn_vue.M_Sale_Return_Goods.Customer_Id == "") {

                PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                return;
            } else {
                //if (titleData.mData == "Product_Name") {

                //    //获取模板的html
                //    cell.node().innerHTML = $("#temp_Product_Name").html();
                //    $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);
                //    //初始化VUE模板
                //    var cheld = new Vue({
                //        el: "#div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column,
                //        data: {
                //            vmodel: cell.data()
                //        },
                //        mounted: function () {
                //            $("#Product_Name").dblclick(function () {

                //            })
                //        }
                //    });
                //    //设置控件在DataTables上
                //    var jqInputs = $('input', cell.node());
                //    $(jqInputs)[0].select();
                //    $(jqInputs).attr('id', "Product_Name_" + cell.index().row + "_" + cell.index().column);
                //    $(".outer", cell.node()).width(tdWidth);

                //}
                if (titleData.mData == "This_Return_Count") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_This_Return_Count").html();
                    $("#div_temp_This_Return_Count").attr("id", "div_temp_This_Return_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_This_Return_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "This_Return_Count_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Return_Goods_Reason_Name") {
                    if ($('select', cell.node()).length > 0) {
                        return;
                    }
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Return_Goods_Reason").html();
                    $("#div_temp_Return_Goods_Reason").attr("id", "div_temp_Return_Goods_Reason_" + cell.index().row + "_" + cell.index().column);

                    var OtherIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Other_Reason' });
                    var Othervalue = cell.cell(':eq(' + cell.index().row + ')', OtherIndex, { search: 'applied' });

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Return_Goods_Reason_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Return_Goods_Reason: rowData.Return_Goods_Reason
                        },
                        methods: {
                            ReasonChange: function (val) {
                                if (val.id != "03") {
                                    Othervalue.data("");
                                }
                            }
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('select', cell.node());

                    $(jqInputs).attr('id', "Return_Goods_Reason_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Other_Reason") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Other_Reason").html();

                    $("#div_temp_Other_Reason").attr("id", "div_temp_Other_Reason_" + cell.index().row + "_" + cell.index().column);
                    var Index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Return_Goods_Reason_Name' });
                    var value = cell.cell(':eq(' + cell.index().row + ')', Index, { search: 'applied' }).data();

                    cell.isshade_bg = false;
                    cell.readonly = false;

                    if (value == "其他") {
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
            }

        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            //if (titleData.mData == "Product_Name") {
            //    var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });
            //    var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' }).data();

            //    cell.data(cell_active);
            //}
            if (titleData.mData == "This_Return_Count") {
                var returnIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Allow_Return_Goods_Count' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', returnIndex, { search: 'applied' }).data();
                Returncount = parseFloat(cell_active);
                var jqInputs = $('input', cell.node());
                var RelCount = parseFloat($(jqInputs[0]).val());
                if (RelCount > Returncount) {
                    PageCommon.ShowMessageArrayRight("E1014", new Array("本次退货数量", "可退货数量"));
                    cell.data("");
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

            if (titleData.mData == "Return_Goods_Reason_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var goodsApplyIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Return_Goods_Reason' });

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
            else {

                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
                PageCommon.RefreshTablePage("SaleReturnDetailEdit");

            }
        },
        //设置控件属性
        Set: function () {

        },
        //保存菜单画面数据
        Save: function () {

            PageCommon.CheckDataTables({
                tableId: "SaleReturnDetailEdit",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty: true
                    },
                     {
                         columnName: "This_Return_Count",
                         CheckEmpty: true,
                         CheckLength: '14'
                     },

                     {
                         columnName: "Return_Goods_Reason",
                         CheckEmpty: true,
                          CheckLength: '14'
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
            var data = PageCommon.GetDataTableData("SaleReturnDetailEdit");

            SalesReturn_vue.M_Sale_Return_Goods.M_Sale_Return_Goods_Detail_List = [];

            //设置统购外购
            SalesReturn_vue.M_Sale_Return_Goods.Is_Purchase = "0";


            //销售退货信息组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Product_Name != "" && item.This_Return_Count != "" && item.Return_Goods_Reason != "") {
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];

                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }

                        if (key == "Is_Collect_Money_Name" || key == "Is_Take_Commission_Name" || key == "Is_Invoice_Name") {
                            switch (key) {
                                case "Is_Collect_Money_Name":
                                    if (item[key] == "是") {
                                        obj["Is_Collect_Money"] = "0";
                                    } else {
                                        obj["Is_Collect_Money"] = "1";

                                    }
                                    break;
                                case "Is_Take_Commission_Name":
                                    if (item[key] == "是") {
                                        obj["Is_Take_Commission"] = "0";
                                    } else {
                                        obj["Is_Take_Commission"] = "1";

                                    }
                                    break;
                                case "Is_Invoice_Name":
                                    if (item[key] == "是") {
                                        obj["Is_Invoice"] = "0";
                                    } else {
                                        obj["Is_Invoice"] = "1";

                                    }
                                    break;


                            }
                        }
                    }

                    if (obj.Product_Name != "" && item.This_Return_Count != "" && item.Return_Goods_Reason != "") {
                        SalesReturn_vue.M_Sale_Return_Goods.M_Sale_Return_Goods_Detail_List.push(obj);
                    }

                }
            });

            //验证至少输入一条明细
            if (SalesReturn_vue.M_Sale_Return_Goods.M_Sale_Return_Goods_Detail_List.length == 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { saleReturnGoods: SalesReturn_vue.M_Sale_Return_Goods }
             , success: function (data) {
                 window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Sale_Return_Goods_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
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
             , param: { saleReturnGoods: SalesReturn_vue.M_Sale_Return_Goods },
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
             , param: { saleReturnGoods: SalesReturn_vue.M_Sale_Return_Goods },
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
            PageCommon.BackFormMessge('List',vm);
        }
    }
});

