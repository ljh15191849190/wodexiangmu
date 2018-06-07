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
var OutInboundFormDetailCancel_vue = new Vue({
    el: '#apps',
    data: {
        Receiver_Detail_Number: '',
        globalParameter: PageCommon.GlobalParameter(),
        //供应商和收货人联动
        linkage: {},
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
            Menu_Id: "M000012",
            System_Key: "Purchase"
        },
        //单据信息
        P_Purchase_Return: {
            Is_Purchase: "1",
            //单号
            Purchase_Return_Id: "",
            //审核状态
            Approval_Status: "",
            //供应商
            Supplier_Id: "",
            //投保状态
            Insure_Status: "",
            //运费支付
            Freight_Pay: "",
            //运输公司
            Carrier_Id: "",
            //运输方式
            Transportation_Way_Id: "",
            //收货人
            Receiver_Detail_Number: "",
            //地址
            Address: '',
            //手机
            Mobile_Phone: "",
            //电话
            Telephone: "",
            //日期
            Return_Date: "",
            //备注
            Return_Remark: "",
            //其他说明
            Other_Explain: "",
            //明细列表
            P_Purchase_Return_Detail_List: []
        },
        //运输方式查询条件
        transportation: {
            Menuresult: ["Transportation_Way_Id", "Transportation_Way_Name"],
            filedSearch: ["Transportation_Way_Id", "Transportation_Way_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Transportation_Way_Id", "Transportation_Way_Name"]
        },
        //承运商
        carrier: {
            Menuresult: ["Carrier_Id", "Carrier_Name"],
            filedSearch: ["Carrier_Id", "Carrier_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Carrier_Id", "Carrier_Name"]
        },
        //供应商查询条件
        supplier: {
            Menuresult: ["Supplier_Id", "Supplier_Name"],
            filedSearch: ["Supplier_Id", "Supplier_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Supplier_Id", "Supplier_Name"]
        },
        //编辑表格id数组
        tableid: ['OutInboundFormCancelDetailList'],
        //其他原因不可编辑
        noedite: true,
    },
    mounted: function () {
        var that = this;
        //页签折叠
        $(".title1").click(function () {
            $(this).siblings('.down_tab').find("i").toggleClass('rotate');
            $(this).parent().next().toggle();
            $(this).parent().toggleClass("boder");
        })
        $(".down_tab").click(function () {
            $(this).find("i").toggleClass('rotate');
            $(this).parent().next().toggle();
            $(this).parent().toggleClass("boder");
        })
        $(".down_2").click(function () {
            $(this).find("i").toggleClass('rotate');
            $(".tile_body").toggle();
        })
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Purchase_Return = data;
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
        $('#OutInboundFormCancelDetailList').on('dblclick', 'tbody tr', function () {
            PageCommon.ModalOpen({
                id: "PurchaseLead",
                title: '进货单引入',
                width: "960px",
                height: "600px",
                btn: ["确定"],
                url: '/Purchase/OutsourceInboundFormCancel/StockEnquiries',
                callBack: function (iframeId) {
                    var list = PageCommon.ChildrenFrames(iframeId).OutPurchaseleadCancel_vue.Add();
                    $.each(list, function (index, item) {
                        item.Purchase_Return_Id = "";
                        item.Is_Purchase = "1";
                        item.Other_Reason = "";
                        item.Return_Goods_Reason = "";
                        item.Create_User = "";
                        item.Create_Time = "";
                        item.Create_Department_Id = "";
                        item.Create_Employee_Id = "";
                        that.P_Purchase_Return.P_Purchase_Return_Detail_List.push(item);
                    })
                    PageCommon.RefreshTablePage("OutInboundFormCancelDetailList");
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
            var that = this;
            if (Field_Name == "Return_Goods_Count" || Field_Name == "This_Return_Goods_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Return_Goods_Count" || Field_Name == "This_Return_Goods_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
            if (Field_Name == "Price") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            }
            if (Field_Name === "CY_Profit_Rate_Storeage" || Field_Name === "CY_Profit_Rate_Period") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Tax") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Price_Tax_Sum") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
                }
            }
        },
        TemplateSelectionCustomer: function (data) {
            var that = this;
            if (data) {
                that.linkage = {
                    id: data.Supplier_Id,
                    Detail_Number: that.P_Purchase_Return.Receiver_Detail_Number
                }
            } else {
                that.linkage = '';
            }
        },
        Template_selection: function (data) {
            var that = this;
            if (data) {
                that.P_Purchase_Return.Address = data.Address;
                that.P_Purchase_Return.Mobile_Phone = data.Mobile_Phone;
                that.P_Purchase_Return.Telephone = data.Telephone;
                that.P_Purchase_Return.Receiver_Detail_Number = data.Detail_Number;
            } else {
                that.P_Purchase_Return.Address ='';
                that.P_Purchase_Return.Mobile_Phone = '';
                that.P_Purchase_Return.Telephone = '';
                that.P_Purchase_Return.Receiver_Detail_Number = '';
            }
        },
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Include_Tax_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }
            if (Field_Name === "Is_Include_Tax") {
                return '1';
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var that = this;
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "This_Return_Goods_Count") {
                //获取模板的html
                that.count = cell.data();
                cell.node().innerHTML = $("#temp_This_Return_Goods_Count").html();
                $("#div_temp_This_Return_Goods_Count").attr("id", "div_temp_This_Return_Goods_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_This_Return_Goods_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        This_Return_Goods_Count: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "This_Return_Goods_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Return_Goods_Reason_Name") {
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
            if (titleData.mData == "Return_Goods_Reason_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第2列 隐藏列的值
                var goodsApplyIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Return_Goods_Reason' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', goodsApplyIndex, { search: 'applied' });
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
            else {
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }
        },
        //编辑
        Edit: function () {
            var that = this;
            //点击编辑按钮
            PageCommon.Clickbtn(that, 'Edit');
        },
        //保存
        Save: function () {
            var that = this;
            $('#OutInboundFormCancelDetailList').DataTable().cell.blur();
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取定单明细表数据
            var detaildata = PageCommon.GetDataTableData("OutInboundFormCancelDetailList");
            var P_Purchase_Return_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(detaildata, function (index, item) {
                if (item.Product_Id) {
                    item.Product_Name = item.Product_Name.substring(0, item.Product_Name.length - 1);
                    P_Purchase_Return_Detail_List.push(item);
                }
            });
            that.P_Purchase_Return.P_Purchase_Return_Detail_List = P_Purchase_Return_Detail_List;
            //验证至少输入一条明细
            if (!that.P_Purchase_Return.P_Purchase_Return_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                //PageCommon.Loading(false);
                return;
            }
            PageCommon.SubmitForm({
                url: "Save"
                     , param: { purchaseReturn: that.P_Purchase_Return }
                     , success: function (data) {
                         //保存后根据返回值加载页面
                         var relevantnumber = data.Result_Model.Purchase_Return_Id + "," + data.Result_Model.Is_Purchase;
                         relevantnumber = relevantnumber.split(",");
                         window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                     }
            });
        },
        //提交
        Submit: function () {
            var that = this;
            PageCommon.SubmitForm({
                url: "Submit",
                param: { purchaseReturn: that.P_Purchase_Return },
                success: function (data) {
                    //点击提交按钮
                    PageCommon.Clickbtn(that, 'Submit');
                }
            });
        },
        //审核
        Approve: function () {
            var that = this;
            PageCommon.SubmitForm({
                url: "Approve",
                param: { purchaseReturn: that.P_Purchase_Return },
                success: function (data) {
                    var relevantnumber = data.Result_Model.Purchase_Return_Id + "," + data.Result_Model.Is_Purchase;
                    relevantnumber = relevantnumber.split(",");
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
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