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
    var NewOrdercancelform_vue = new Vue({
        el: '#apps',
        data: {
            globalParameter: PageCommon.GlobalParameter(),
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
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000004",
                System_Key: "Purchase"
            },
            //定单信息
            P_Purchase_Order_Cancel: {
                //定货取消单号
                Purchase_Order_Cancel_Id:"",
                //审核状态
                Approval_Status: "",
                //供应商
                Supplier_Id: "",
                //备注
                Remark: "",
                //明细列表
                P_Purchase_Order_Cancel_Detail_List: []
            },
            //供应商查询条件
            supplier: {
                Menuresult: ["Supplier_Id", "Supplier_Name"],
                filedSearch: ["Supplier_Id", "Supplier_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Supplier_Id", "Supplier_Name"]
            },
            //编辑表格id数组
            tableid: ['PurchaseOrderDetaiCancelEditlList'],
            //编辑列表取消数量修改前值
            precancelcount:0
        },
        mounted: function () {
            var that = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber },
                    success: function (data) {
                        that.P_Purchase_Order_Cancel = data;
                        //判断状态
                        PageCommon.EditStatus({
                            vm: that,
                            approvalstatus: data.Approval_Status
                        });
                        //点击保存
                        PageCommon.Clickbtn(that, 'Save');
                        //如果是保存后加载的页面表格设为不可修改
                        if (save) {
                            that.isedittable = false;
                        }

                        if (RequestValue.sourcetype && RequestValue.sourcetype == 1) {
                            that.btnApproval = true;
                        }
                    }
                });
            }
            $('#PurchaseOrderDetaiCancelEditlList').on('dblclick', 'tbody tr', function () {
                PageCommon.ModalOpen({
                    id: "OrderformImport",
                    title: '定货单引入',
                    width: "960px",
                    height: "600px",
                    btn: ["确定"],
                    url: '/Purchase/OrderFormCancel/StockEnquiries',
                    callBack: function (iframeId) {
                        var list = PageCommon.ChildrenFrames(iframeId).Orderformimport_vue.Add();
                        $.each(list, function (index, item) {
                            item.Order_Goods_Count = item.Purchase_Count;
                            item.Cancel_Count = "";
                            item.Purchase_Order_Cancel_Id = "";
                            item.Purchase_Order_Detail_Number = "";
                            item.Cancel_Reason = "";
                            item.Other_Reason = "";
                            that.P_Purchase_Order_Cancel.P_Purchase_Order_Cancel_Detail_List.push(item);
                        })
                        PageCommon.RefreshTablePage("PurchaseOrderDetaiCancelEditlList");
                    }
                })
            })
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

            });
        },
        methods: {
            //表格合计数字格式化
            pagetotalback: function (Field_Name, a, b) {
                if (Field_Name == "Cancel_Count" || Field_Name == "Order_Goods_Count") {
                    return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
                }
            },
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                var that = this;
                if (Field_Name == "Cancel_Count" || Field_Name == "Order_Goods_Count") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                    }
                }
            },
            //编辑行回调
            rowEditCallback: function (cell, titleData, rowData) {
                var that = this;
                var tdWidth = $(cell.node()).width();
                if (titleData.mData == "Cancel_Count") {
                    //获取模板的html
                    that.precancelcount = cell.data();
                    cell.node().innerHTML = $("#temp_Cancel_Count").html();
                    $("#div_temp_Cancel_Count").attr("id", "div_temp_Cancel_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Cancel_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            vmodel: cell.data(),
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Cancel_Count_" + cell.index().row + "_" + cell.index().column);
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
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Other_Reason_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
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
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
            },
            //行编辑失去焦点回调事件
            rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
                var that = this;
                var ischeck = $(cell.node()).hasClass("render");
                if (ischeck) {
                    $(cell.node()).removeClass("render");
                }
                var jqInputs = $('input', cell.node());
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
                else if (titleData.mData == "Other_Reason") {
                    var jqInputs = $('input', cell.node());

                    //验证数据
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
                        $(jqInputs).focus();
                        return;
                    }
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
                else if (titleData.mData == "Cancel_Count") {
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                        cell.focus();
                    } else {
                        if (rowData.Order_Goods_Count) {
                            if (parseFloat($(jqInputs[0]).val()) > 0) {
                                if (parseFloat($(jqInputs[0]).val()) > parseFloat(rowData.Order_Goods_Count)) {
                                    cell.data(that.precancelcount);
                                } else {
                                    cell.data($(jqInputs[0]).val());
                                }
                            } else {
                                cell.data(that.precancelcount);
                            }
                        } else {
                            cell.data(that.precancelcount);
                        }
                    }
                }
                else {
                    //验证数据
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                        cell.focus();
                    } else {
                        //修改datatable 对应的值
                        if (rowData.Product_Id) {
                            cell.data($(jqInputs[0]).val());
                        }else{
                            cell.data("");
                        }
                    }
                }
            },
            //行初始化事件
           
            //编辑
            Edit: function () {
                var that = this;
                //点击编辑按钮
                PageCommon.Clickbtn(that, 'Edit');
            },
            //保存
            Save: function () {
                var that = this;
                $('#PurchaseOrderDetaiCancelEditlList').DataTable().cell.blur();
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //获取定单明细表数据
                var detaildata = PageCommon.GetDataTableData("PurchaseOrderDetaiCancelEditlList");
                var P_Purchase_Order_Cancel_Detail_List = [];
                //组织明细数据 过滤空行
                $.each(detaildata, function (index, item) {
                    if (item.Product_Id) {
                        item.Product_Name = item.Product_Name.substring(0, item.Product_Name.length - 1);
                        P_Purchase_Order_Cancel_Detail_List.push(item);
                    }
                });
                that.P_Purchase_Order_Cancel.P_Purchase_Order_Cancel_Detail_List = P_Purchase_Order_Cancel_Detail_List;
                //验证至少输入一条明细
                if (!that.P_Purchase_Order_Cancel.P_Purchase_Order_Cancel_Detail_List.length > 0) {

                    PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                    PageCommon.Loading(false);
                    return;
                }
                PageCommon.SubmitForm({
                    url: "Save"
                         , param: { purchaseOrderCancel: that.P_Purchase_Order_Cancel }
                         , success: function (data) {
                             //保存后根据返回值加载页面
                             var relevantnumber = data.Result_Model.Purchase_Order_Cancel_Id;
                             window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                         }
                });
            },
            //提交
            Submit: function () {
                var that = this;
               
                PageCommon.SubmitForm({
                    url: "Submit",
                    param: { purchaseOrderCancel: that.P_Purchase_Order_Cancel },
                    success: function (data) {
                        //点击提交按钮
                        PageCommon.Clickbtn(that, 'Submit');
                    }
                });
            },
            //审核
            Approval: function () {
                var that = this;
                PageCommon.SubmitForm({
                    url: "Approve",
                    param: { purchaseOrderCancel: that.P_Purchase_Order_Cancel },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + that.P_Purchase_Order_Cancel.Purchase_Order_Cancel_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                    }
                });
            },
            //审批意见
            ApprovalOpinion: function () {

            },
            //返回列表画面
            Back: function () {
                var vm = this;
                PageCommon.BackFormMessge("List", vm);
            },
            //设置
            Set: function () {

            }
        }
    });