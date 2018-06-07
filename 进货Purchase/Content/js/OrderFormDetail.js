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
var NewOrderform_vue = new Vue({
    el: '#apps',
    data: {
        globalParameter: PageCommon.GlobalParameter(),
        //页面URL参数
        relevantnumber: relevantnumber,
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
        //编辑表格id数组
        tableid: ['PurchaseOrderDetaiEditlList', 'PurchasePreOrderDetaiEditlList'],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000002",
            System_Key: "Purchase"
        },
        //定单信息
        P_Purchase_Order: {
            //定货单号
            Purchase_Order_Id: "",
            //定货日期
            Purchase_Order_Date: "",
            //是否统购
            Is_Purchase: "1",
            //定货单类型
            Purchase_Order_Type: "01",
            //审核状态
            Approval_Status: "",
            //供应商
            Supplier_Id: "",
            //付款方式
            Payment_Method: "",
            //发票类型
            Invoice_Type: "",
            //运输公司
            Carrier_Id: "",
            //运输方式
            Transportation_Way_Id: "",
            //备注
            Remark: "",
            //明细列表
            P_Purchase_Order_Detail_List: []
        },
        //承运商
        carrier: {
            Menuresult: ["Carrier_Id", "Carrier_Name"],
            filedSearch: ["Carrier_Id", "Carrier_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Carrier_Id", "Carrier_Name"]
        },
        //发票类型
        invoice: {
            Menuresult: ["Tax_Rate_Id", "Invoice_Type"],
            filedSearch: ["Tax_Rate_Id", "Invoice_Type"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Tax_Rate_Id", "Invoice_Type"]
        },
        //运输方式查询条件
        transportation: {
            Menuresult: ["Transportation_Way_Id", "Transportation_Way_Name"],
            filedSearch: ["Transportation_Way_Id", "Transportation_Way_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Transportation_Way_Id", "Transportation_Way_Name"]
        },
        btn: true
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
            that.btn = false;
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Purchase_Order = data;
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
        $('#PurchaseOrderDetaiEditlList').on('dblclick', 'tbody tr', function () {
            PageCommon.ModalOpen({
                id: "OrderImport",
                title: '外购定货申请单引入',
                width: "960px",
                height: "600px",
                btn: ["确定"],
                url: '/Purchase/OrderForm/SalesContract',
                callBack: function (iframeId) {
                    var list = PageCommon.ChildrenFrames(iframeId).Orderimport_vue.Add();
                    $.each(list, function (index, item) {
                        item.Apply_Count = item.Apply_Count;
                        item.Is_Purchase = "1";
                        item.Purchase_Order_Id = "";
                        item.Detail_Number = "";
                        item.Purchase_Apply_Detail_Number = "";
                        item.Final_Price = "";
                        item.Predict_Arrival_Date = "";
                        item.Command_Date = "";
                        item.Customer_Type = "";
                        item.Purchase_Order_Status = "";
                        item.Customer_Type_Name = "";
                        item.Order_Status_Name = "";
                        item.Purchase_Order_Status = "";
                        that.P_Purchase_Order.P_Purchase_Order_Detail_List.push(item);
                    })
                    PageCommon.RefreshTablePage("PurchaseOrderDetaiEditlList");
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
            if (Field_Name === "Purchase_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
            if (Field_Name === "Price_Tax_Sum") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way), this.globalParameter.Tax_Price_Total_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "First_Consult_Price" || Field_Name == "Final_Price" || Field_Name == "Price") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Purchase_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
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
        //表格合计数字格式化
        pagetotalback2: function (Field_Name, a, b) {
            if (Field_Name === "Purchase_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //表格行初始化事件
        columrender2: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Final_Price") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Purchase_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
        },
        ChangeType: function (val) {
            PageCommon.RefreshTablePage("PurchaseOrderDetaiEditlList");
            PageCommon.RefreshTablePage("PurchasePreOrderDetaiEditlList");
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var that = this;
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
            } else if (titleData.mData == "Purchase_Count") {
                //获取模板的html
                that.count = cell.data();
                cell.node().innerHTML = $("#temp_Purchase_Count").html();
                $("#div_temp_Purchase_Count").attr("id", "div_temp_Purchase_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Purchase_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Purchase_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Final_Price") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Final_Price").html();
                $("#div_temp_Final_Price").attr("id", "div_temp_Final_Price_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Final_Price_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Final_Price_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Predict_Arrival_Date") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Predict_Arrival_Date").html();
                $("#div_temp_Predict_Arrival_Date").attr("id", "div_temp_Predict_Arrival_Date_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Predict_Arrival_Date_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: ''
                    },
                    mounted: function () {
                        this.vmodel = cell.data();
                    },
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Predict_Arrival_Date_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);

            } else if (titleData.mData == "Command_Date") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Command_Date").html();
                $("#div_temp_Command_Date").attr("id", "div_temp_Command_Date_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Command_Date_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: ''
                    },
                    mounted: function () {
                        this.vmodel = cell.data();
                    },
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Command_Date_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Product_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Product_Name").html();
                $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);

                //获取下C_CustomerId的下标
                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                var productNameIndex2 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Is_Purchase' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });
                var cell_active3 = cell.cell(':eq(' + cell.index().row + ')', productNameIndex2, { search: 'applied' });

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Product_Purchase: ''
                    },
                    mounted: function () {
                        this.Product_Purchase = cell_active.data() + cell_active3.data();
                    },
                    methods: {
                        TemplateSelectionProduct: function (data) {
                            if (data) {
                                cell.Product_Name = data.Product_Name;
                                for (var key in data) {
                                    if (key != "Product_Name" && key != "ROWNUM") {
                                        var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                                        var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                                        tcell.data(data[key]);
                                    }
                                }
                            }
                        },
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
            if (titleData.mData == "Product_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Product_Name_" + cell.index().row + "_" + cell.index().column);
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
                    ////修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell.data(cell.Product_Name);
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
            } else {
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
        //编辑
        Edit: function () {
            var that = this;
            //点击编辑按钮
            PageCommon.Clickbtn(that, 'Edit');
        },
        //保存
        Save: function () {
            var that = this;
            var P_Purchase_Order_Detail_List = [];
            if (that.P_Purchase_Order.Purchase_Order_Type == '01') {
                $('#PurchaseOrderDetaiEditlList').DataTable().cell.blur();
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //获取定单明细表数据
                var detaildata = PageCommon.GetDataTableData("PurchaseOrderDetaiEditlList");
                //组织明细数据 过滤空行
                $.each(detaildata, function (index, item) {
                    if (item.Product_Id) {
                        item.Order_Status_Name == "未定货" ? item.Purchase_Order_Status = "01" :
                        item.Order_Status_Name == "全部定货" ? item.Purchase_Order_Status = "02" :
                        item.Order_Status_Name == "部分定货" ? item.Purchase_Order_Status = "03" : item.Purchase_Order_Status = ""
                        var obj = {};
                        obj.Purchase_Order_Id = item.Purchase_Order_Id;
                        obj.Detail_Number = item.Detail_Number;
                        obj.Order_Apply_Id = item.Order_Apply_Id;
                        obj.Purchase_Apply_Detail_Number = item.Purchase_Apply_Detail_Number;
                        obj.Price_Apply_Detail_Number = item.Price_Apply_Detail_Number;
                        obj.Product_Price_Id = item.Product_Price_Id;
                        obj.Product_Price_Detail_Number = item.Product_Price_Detail_Number;
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
                        obj.Purchase_Count = item.Purchase_Count;
                        obj.First_Consult_Supplier_Id = item.First_Consult_Supplier_Id;
                        obj.Supplier_Name = item.Supplier_Name;
                        obj.First_Consult_Price = item.First_Consult_Price;
                        obj.Final_Price = item.Final_Price;
                        obj.Predict_Arrival_Date = item.Predict_Arrival_Date;
                        obj.Storeage_Id = item.Storeage_Id;
                        obj.Storeage_Name = item.Storeage_Name;
                        obj.Apply_Object_Code = item.Apply_Object_Code;
                        obj.Object_Id = item.Object_Id;
                        obj.Object_Type = item.Object_Type;
                        obj.Object_Name = item.Object_Name;
                        obj.Customer_Type = item.Customer_Type;
                        obj.Customer_Type_Name = item.Customer_Type_Name;
                        obj.Employee_Id = item.Employee_Id;
                        obj.Employee_Name = item.Employee_Name;
                        obj.Department_Name = item.Department_Name;
                        obj.Is_Include_Tax = item.Is_Include_Tax;
                        obj.Is_Tax_Name = item.Is_Tax_Name;
                        obj.Price = item.Price;
                        obj.Tax = item.Tax;
                        obj.Price_Tax_Sum = item.Price_Tax_Sum;
                        obj.Command_Date = item.Command_Date;
                        obj.Apply_Cost = item.Apply_Cost;
                        obj.CY_Profit_Rate_Storeage = item.CY_Profit_Rate_Storeage;
                        obj.Lastest_Price_Include_Tax = item.Lastest_Price_Include_Tax;
                        obj.Purchase_Order_Status = item.Purchase_Order_Status;
                        obj.Order_Status_Name = item.Order_Status_Name;
                        obj.Remark = item.Remark;
                        obj.Row_Version = item.Row_Version;
                        obj.Is_Delete = item.Is_Delete;
                        obj.Create_Time = item.Create_Time;
                        obj.Create_User = item.Create_User;
                        obj.Create_Department_Id = item.Create_Department_Id;
                        obj.Create_Employee_Id = item.Create_Employee_Id;
                        P_Purchase_Order_Detail_List.push(obj);
                    }
                });
            } else if (that.P_Purchase_Order.Purchase_Order_Type == '02') {
                $('#PurchasePreOrderDetaiEditlList').DataTable().cell.blur();
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //获取定单明细表数据
                var detaildata = PageCommon.GetDataTableData("PurchasePreOrderDetaiEditlList");
                $.each(detaildata, function (index, item) {
                    if (item.Product_Id) {
                        var obj = {};
                        obj.Product_Id = item.Product_Id;
                        obj.Product_Name = item.Product_Name.substring(0, item.Product_Name.length - 1);
                        obj.Brand_Id = item.Brand_Id;
                        obj.Brand_Name = item.Brand_Name;
                        obj.Command_Date = item.Command_Date;
                        obj.Create_Department_Id = item.Create_Department_Id;
                        obj.Create_Employee_Id = item.Create_Employee_Id;
                        obj.Create_Time = item.Create_Time;
                        obj.Create_User = item.Create_User;
                        obj.Detail_Number = item.Detail_Number;
                        obj.Final_Price = item.Final_Price;
                        obj.Is_Delete = item.Is_Delete;
                        obj.Is_Purchase = item.Is_Purchase;
                        obj.Order_Apply_Id = item.Order_Apply_Id;
                        obj.Order_Status_Name = item.Order_Status_Name;
                        obj.Package = item.Package;
                        obj.Predict_Arrival_Date = item.Predict_Arrival_Date;
                        obj.Price_Apply_Detail_Number = item.Price_Apply_Detail_Number;
                        obj.Product_Area_Id = item.Product_Area_Id;
                        obj.Product_Area_Name = item.Product_Area_Name;
                        obj.Product_Classify_Id = item.Product_Classify_Id;
                        obj.Product_Classify_Name = item.Product_Classify_Name;
                        obj.Product_Price_Detail_Number = item.Product_Price_Detail_Number;
                        obj.Product_Price_Id = item.Product_Price_Id;
                        obj.Purchase_Apply_Detail_Number = item.Purchase_Apply_Detail_Number;
                        obj.Purchase_Count = item.Purchase_Count;
                        obj.Purchase_Order_Id = item.Purchase_Order_Id;
                        obj.Purchase_Order_Status = item.Purchase_Order_Status;
                        obj.Remark = item.Remark;
                        obj.Row_Version = item.Row_Version;
                        P_Purchase_Order_Detail_List.push(obj);
                    }
                });
            }
            that.P_Purchase_Order.P_Purchase_Order_Detail_List = P_Purchase_Order_Detail_List;
            //验证至少输入一条明细
            if (!that.P_Purchase_Order.P_Purchase_Order_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                //PageCommon.Loading(false);
                return;
            }
            PageCommon.SubmitForm({
                url: "Save",
                param: { purchaseOrder: that.P_Purchase_Order },
                success: function (data) {
                    //保存后根据返回值加载页面
                    var relevantnumber = data.Result_Model.Purchase_Order_Id;
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                }
            });
        },
        //提交
        Submit: function () {
            var that = this;
            //暂未地址赋值
            PageCommon.SubmitForm({
                url: "Submit",
                param: { PurchaseOrder: that.P_Purchase_Order },
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
                param: { PurchaseOrder: that.P_Purchase_Order },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + that.P_Purchase_Order.Purchase_Order_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
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
        //父供应商返回函数
        template_selection: function (data) {
            var that = this;
            that.P_Purchase_Order.Invoice_Type = data.text;
        },
    }
});