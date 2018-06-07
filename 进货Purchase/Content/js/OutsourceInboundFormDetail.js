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
    var OutInboundFormDetail_vue = new Vue({
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
                Menu_Id: "M000008",
                System_Key: "Purchase"
            },
            //单据信息
            P_Purchase: {
                Is_Purchase: "1",
                //单号
                Purchase_Id:"",
                //审核状态
                Approval_Status: "",
                //供应商
                Supplier_Id: "",
                //币种
                Currency_Id: "",
                //备注
                Remark: "",
                //发票类型ID
                Tax_Rate_Id: "",
                //发票类型
                Invoice_Type: "",
                //明细列表
                P_Purchase_Detail_List: []
            },
            //发票类型查询条件
            invoice: {
                Menuresult: ["Tax_Rate_Id", "Invoice_Type"],
                filedSearch: ["Tax_Rate_Id", "Invoice_Type"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Tax_Rate_Id", "Invoice_Type"]
            },
            //供应商查询条件
            supplier: {
                Menuresult: ["Supplier_Id", "Supplier_Name"],
                filedSearch: ["Supplier_Id", "Supplier_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Supplier_Id", "Supplier_Name"]
            },
            //币种查询条件
            currency: {
                Menuresult: ["Currency_Id", "Currency_Name"],
                filedSearch: ["Currency_Id", "Currency_Name"],
                mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
                inputField: ["Currency_Id", "Currency_Name"]
            },
            //编辑表格id数组
            tableid: ['OutInboundFormDetailEditList'],
            //编辑表格初始编辑进货数量
            p_count: ""
        },
        mounted: function () {
            var that = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber },
                    success: function (data) {
                        that.P_Purchase = data;
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
            $('#OutInboundFormDetailEditList').on('dblclick', 'tbody tr', function () {
                PageCommon.ModalOpen({
                    id: "PurchaseLead",
                    title: '定货单引入',
                    width: "960px",
                    height: "600px",
                    btn: ["确定"],
                    url: '/Purchase/OutsourceInboundForm/PurchasePlan',
                    callBack: function (iframeId) {
                        var list = PageCommon.ChildrenFrames(iframeId).OutPurchasePlanlead_vue.Add();
                        $.each(list, function (index, item) {
                            item.Purchase_Id = "";
                            item.Is_Purchase = "1";
                            item.Wait_In_Storeage_Id = "";
                            item.Storeage_Name = "";
                            item.Create_User = "";
                            item.Create_Time = "";
                            item.Create_Department_Id = "";
                            item.Create_Employee_Id = "";
                            item.Create_Time = "";
                            item.Create_Time = "";
                            that.P_Purchase.P_Purchase_Detail_List.push(item);
                        })
                        PageCommon.RefreshTablePage("OutInboundFormDetailEditList");
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
                if (Field_Name == "Purchase_Count" || Field_Name == "Return_Goods_Count") {
                    return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
                }
                if (Field_Name === "Price_Tax_Sum") {
                    return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
                }
            },
            //行初始化事件
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name == "Purchase_Count" || Field_Name == "Return_Goods_Count") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                    }
                }
                if (Field_Name == "Exchange_Rate") {
                    if (value) {
                         return PageCommon.NumberDispose(value, 2, '1');
                     } 
                }
                if (Field_Name === "Price_Tax_Sum") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
                if (Field_Name === "Tax") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
                if (Field_Name == "Final_Price" || Field_Name == "Price") {
                    if (value) {
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                    }
                }
                if (Field_Name === "Is_Include_Tax_Name") {
                    var html = "<span class=\"label  label-default\">否</span>";
                    if (value == "") {
                        return html;
                    } else {
                        return false;
                    }
                }
                if (Field_Name === "Is_Include_Tax") {
                    return '0';
                }
            },
            //编辑行回调
            rowEditCallback: function (cell, titleData, rowData) {
                var that = this;
                var tdWidth = $(cell.node()).width();
                if (titleData.mData == "Supplier_Contract_Number") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Supplier_Contract_Number").html();

                    $("#div_temp_Supplier_Contract_Number").attr("id", "div_temp_Supplier_Contract_Number_" + cell.index().row + "_" + cell.index().column);

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Supplier_Contract_Number_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Supplier_Contract_Number: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Supplier_Contract_Number_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Delivery_Bill_Number") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Delivery_Bill_Number").html();

                    $("#div_temp_Delivery_Bill_Number").attr("id", "div_temp_Delivery_Bill_Number_" + cell.index().row + "_" + cell.index().column);

                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Delivery_Bill_Number_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Delivery_Bill_Number: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Delivery_Bill_Number_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Purchase_Count") {
                    //获取模板的html
                    that.p_count = cell.data();
                    cell.node().innerHTML = $("#temp_Purchase_Count").html();
                    $("#div_temp_Purchase_Count").attr("id", "div_temp_Purchase_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Purchase_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Purchase_Count: cell.data(),
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Purchase_Count_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Final_Price") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Final_Price").html();
                    $("#div_temp_Final_Price").attr("id", "div_temp_Final_Price_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Final_Price_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Final_Price: cell.data(),
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Final_Price_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Storeage_Name") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Storeage_Name").html();
                    $("#div_temp_Storeage_Name").attr("id", "div_temp_Storeage_Name_" + cell.index().row + "_" + cell.index().column);

                    //获取下C_CustomerId的下标
                    var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Wait_In_Storeage_Id' });
                    var customerNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storeage_Name' });

                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });
                    var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', customerNameIndex, { search: 'applied' });
                    cell.Wait_In_Storeage_Id = cell_active.data();
                    cell.Storeage_Name = cell_active2.data();
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Storeage_Name_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Storeage_Name: '',
                        },
                        mounted: function () {
                            this.Storeage_Name = cell.Wait_In_Storeage_Id;
                        },
                        methods: {
                            TemplateSelectionCustomer: function (data) {
                                if (data) {
                                    cell.Wait_In_Storeage_Id = data.Storeage_Id;
                                    cell.Storeage_Name = data.Storeage_Name;
                                } else {
                                    cell.Wait_In_Storeage_Id = '';
                                    cell.Storeage_Name = '';
                                }
                            }
                        }
                    });
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
                if (titleData.mData == "Storeage_Name") {
                    //取得行号
                    var jqInputs = $('select', cell.node());
                    var ids = cell.index().row;
                    $(jqInputs).attr('id', "Storeage_Name_" + cell.index().row + "_" + cell.index().column);
                    //修改第2列 隐藏列的值
                    var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Wait_In_Storeage_Id' });
                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
                        return;
                    }
                    else {
                        //修改datatable 对应的值
                        if ($(jqInputs[0]).val()) {
                            cell_active.data(cell.Wait_In_Storeage_Id);
                            cell.data(cell.Storeage_Name);
                        } else {
                            cell.data("");
                        }
                    }
                }
                else if (titleData.mData == "Purchase_Count") {
                    var jqInputs = $('input', cell.node());
                    //验证数据
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
                    } else {
                        //修改datatable 对应的值
                        cell.data($(jqInputs[0]).val());
                    }
                    if (rowData.Final_Count) {
                        if (parseFloat($(jqInputs[0]).val()) == 0 || parseFloat($(jqInputs[0]).val()) < 0) {
                            cell.data(that.p_count);
                        } else if (parseFloat($(jqInputs[0]).val()) > 0) {
                            if (parseFloat($(jqInputs[0]).val()) > parseFloat(rowData.Final_Count)) {
                                cell.data(that.p_count);
                            } else if ((parseFloat($(jqInputs[0]).val()) == parseFloat(rowData.Final_Count)) || (parseFloat($(jqInputs[0]).val()) < parseFloat(rowData.Final_Count))) {
                                cell.data($(jqInputs[0]).val());
                            }
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
                $('#OutInboundFormDetailEditList').DataTable().cell.blur();
                PageCommon.CheckDataTables({
                    tableId: "OutInboundFormDetailEditList",
                    Key: "Product_Id",
                    columns: [
                        {
                            columnName: "Purchase_Count",
                            CheckEmpty: true,
                        }
                    ]
                });

                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //获取定单明细表数据
                var detaildata = PageCommon.GetDataTableData("OutInboundFormDetailEditList");
                var P_Purchase_Detail_List = [];
                //组织明细数据 过滤空行
                $.each(detaildata, function (index, item) {
                    if (item.Product_Id) {
                        var obj = {};
                        obj.Purchase_Id = item.Purchase_Id;
                        obj.Detail_Number = item.Detail_Number;
                        obj.Bill_Id = item.Bill_Id;
                        obj.Bill_Detail_Number = item.Bill_Detail_Number;
                        obj.Is_Purchase = item.Is_Purchase;
                        obj.Product_Id = item.Product_Id;
                        obj.Product_Name = item.Product_Name.substring(0, item.Product_Name.length - 1);
                        obj.Product_Classify_Id = item.Product_Classify_Id;
                        obj.Product_Classify_Name = item.Product_Classify_Name;
                        obj.Package = item.Package;
                        obj.Brand_Id = item.Brand_Id;
                        obj.Brand_Name = item.Brand_Name;
                        obj.Product_Area_Id = item.Product_Area_Id;
                        obj.Product_Area_Name = item.Product_Area_Name;
                        obj.Supplier_Contract_Number = item.Supplier_Contract_Number;
                        obj.Delivery_Bill_Number = item.Delivery_Bill_Number;
                        obj.Coder = item.Coder;
                        obj.Final_Customer_Id = item.Final_Customer_Id;
                        obj.Customer_Name = item.Customer_Name;
                        obj.Final_Coder = item.Final_Coder;
                        obj.Purchase_Count = item.Purchase_Count;
                        obj.Return_Goods_Count = item.Return_Goods_Count;
                        obj.Final_Price = item.Final_Price;
                        obj.Final_Currency_Id = item.Final_Currency_Id;
                        obj.Currency_Name = item.Currency_Name;
                        obj.Exchange_Rate = item.Exchange_Rate;
                        obj.Is_Include_Tax = item.Is_Include_Tax;
                        obj.Is_Include_Tax_Name = item.Is_Include_Tax_Name;
                        obj.Price = item.Price;
                        obj.Tax = item.Tax;
                        obj.Price_Tax_Sum = item.Price_Tax_Sum;
                        obj.Wait_In_Storeage_Id = item.Wait_In_Storeage_Id;
                        obj.Storeage_Name = item.Storeage_Name;
                        obj.Remark = item.Remark;
                        obj.Row_Version = item.Row_Version;
                        obj.Is_Delete = item.Is_Delete;
                        P_Purchase_Detail_List.push(obj);
                    }
                });
                that.P_Purchase.P_Purchase_Detail_List = P_Purchase_Detail_List;
                //验证至少输入一条明细
                if (!that.P_Purchase.P_Purchase_Detail_List.length > 0) {
                    PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                    PageCommon.Loading(false);
                    return;
                }
                PageCommon.SubmitForm({
                    url: "Save"
                         , param: { purchase: that.P_Purchase }
                         , success: function (data) {
                             //保存后根据返回值加载页面
                             var relevantnumber = data.Result_Model.Purchase_Id + "," + data.Result_Model.Is_Purchase;
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
                    param: { purchase: that.P_Purchase },
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
                    param: { purchase: that.P_Purchase },
                    success: function (data) {
                        var relevantnumber = data.Result_Model.Purchase_Id + "," + data.Result_Model.Is_Purchase;
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

            },
            //发票类型返回函数
            template_selection: function (data) {
                var that = this;
                if (data) {
                    that.P_Purchase.Invoice_Type = data.text;
                } else {
                    that.P_Purchase.Invoice_Type = '';
                }
            }
        }
    });