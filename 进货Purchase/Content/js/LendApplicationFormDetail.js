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
var NewLendApplicationFrom_vue = new Vue({
    el: '#apps',
    data: {
        Receiver_Detail_Number: '',
        //客户和收货人联动
        linkage: {},
        globalParameter: PageCommon.GlobalParameter(),
        //表格是否可编辑
        isedittable: true,
         //是否遮罩
        isshade_bg: false,
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
            Menu_Id: "M000023",
            System_Key: "Purchase"
        },
        //单据信息
        P_Lend_Apply: {
            Is_Purchase: "",
            //单号
            Lend_Apply_Id: "",
            //审核状态
            Approval_Status: "",
            //供应商
            Supplier_Id: "",
            //客户
            Customer_Id: "",
            //借货对象
            Lend_Goods_Object: "",
            //借货对象_Id
            Lend_Goods_Object_Id: "",
            //经手人
            Lend_Employee_Id: "",
            //运输方式
            Transportation_Way_Id: "",
            //承运商
            Carrier_Id: "",
            //收货备注
            Receiver_Ramark: "",
            //投保备注
            Insure_Remark: "",
            //运费支付
            Freight_Pay: "",
            //投保状态
            Insure_Status: "",
            //收货人明细号
            Receiver_Detail_Number: '',
            //明细列表
            P_Lend_Apply_Detail_List: []
        },
        //编辑表格id数组
        tableid: ['LendApplyDetailEditList'],
        //借入对象为供应商
        lend_supplier:false,
        //借入对象为客户
        lend_customer: false,
        //运输方式下拉框显示字段
        TransportationResult: ["Transportation_Way_Id", "Transportation_Way_Name"],
        //运输方式下拉框查询条件
        TransportationWhere: [

        ],
        //运输方式字表查询条件
        TransportChild: [{
            Table_Name: "B_Transportation_Way",
            Primary_Key_Field: ["id"],
            Field_Name: ["Transportation_Way_Name"],
            Is_Name: "0",
            System_Key: "Sale"
        }],
        //运输方式下拉框排序
        TransportationOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC",
        }],
        //承运商下拉框查询条件
        CarrierWhere: [],
        //承运商下拉框排序
        CarrierOrder: [{
            Field_Name: "Create_Time",
            Orderby: "ASC"
        }],
        linkageTransportation: true,
        //承运商下拉框显示字段
        CarrierResult: ["Carrier_Id", "Carrier_Name"],
    },
    mounted: function () {
        var that = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Lend_Apply = data;
                    that.linkage = data;
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
                        that.btnSave = false;
                        that.btnBack = true;
                    }
                }
            });
        }
        $('#LendApplyDetailEditList').on('dblclick', 'tbody tr', function () {
            PageCommon.ModalOpen({
                id: "LendOrderLead",
                title: '库房分配引入',
                width: "960px",
                height: "600px",
                btn: ["确定"],
                url: '/Purchase/LendApplicationForm/Lead',
                callBack: function (iframeId) {
                    var list = PageCommon.ChildrenFrames(iframeId).LendOrderLead_vue.Add();
                    $.each(list, function (index, item) {
                        item.Is_Purchase = "";
                        item.Lend_Apply_Id = "";
                        item.Lend_Count = "";
                        item.Order_Apply_Detail_Number = "";
                        item.Create_User = "";
                        item.Create_Time = "";
                        item.Create_Department_Id = "";
                        item.Create_Employee_Id = "";
                        item.Create_Time = "";
                        that.P_Lend_Apply.P_Lend_Apply_Detail_List.push(item);
                    })
                    PageCommon.RefreshTablePage("LendApplyDetailEditList");
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
            if (Field_Name == "Lend_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Lend_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
            if (Field_Name === "Weighting_Average_Cost") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
                }
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var that = this;
            var tdWidth = $(cell.node()).width(); 
            if (titleData.mData == "Lend_Count") {
                //获取模板的html
                that.p_count = cell.data();
                cell.node().innerHTML = $("#temp_Lend_Count").html();
                $("#div_temp_Lend_Count").attr("id", "div_temp_Lend_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Lend_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Lend_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Return_Date") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Return_Date").html();
                $("#div_temp_Return_Date").attr("id", "div_temp_Return_Date_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Return_Date_" + cell.index().row + "_" + cell.index().column,
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
                $(jqInputs).attr('id', "Return_Date_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Material_Code") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Material_Code").html();

                $("#div_temp_Material_Code").attr("id", "div_temp_Material_Code_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Material_Code_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Material_Code_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Order_Key") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Order_Key").html();

                $("#div_temp_Order_Key").attr("id", "div_temp_Order_Key_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Order_Key_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Order_Key_" + cell.index().row + "_" + cell.index().column);
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
             //验证数据
            if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                   cell.focus();
               } else {
                   //修改datatable 对应的值
                   cell.data($(jqInputs[0]).val());
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
            if (that.P_Lend_Apply.Lend_Goods_Object == "01" || that.P_Lend_Apply.Lend_Goods_Object == "02") {
                that.P_Lend_Apply.Lend_Goods_Object_Id = that.P_Lend_Apply.Supplier_Id;
            }
            else if (that.P_Lend_Apply.Lend_Goods_Object == "03") {
                that.P_Lend_Apply.Lend_Goods_Object_Id = that.P_Lend_Apply.Customer_Id;
            }
            $('#LendApplyDetailEditList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "LendApplyDetailEditList",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Lend_Count",
                        CheckEmpty: true,
                    },
                    {
                        columnName: "Return_Date",
                        CheckEmpty: true,
                    }
                ]
            });
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取定单明细表数据
            var detaildata = PageCommon.GetDataTableData("LendApplyDetailEditList");
            var P_Lend_Apply_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(detaildata, function (index, item) {
                if (item.Product_Id) {
                    var obj = {};
                    obj.Lend_Apply_Id = item.Lend_Apply_Id;
                    obj.Detail_Number = item.Detail_Number;
                    obj.Batch_Id = item.Batch_Id;
                    obj.Is_Purchase = item.Is_Purchase;
                    obj.Product_Id = item.Product_Id;
                    obj.Product_Name = item.Product_Name;
                    obj.Product_Classify_Id = item.Product_Classify_Id;
                    obj.Product_Classify_Name = item.Product_Classify_Name;
                    obj.Package = item.Package;
                    obj.Brand_Id = item.Brand_Id;
                    obj.Brand_Name = item.Brand_Name;
                    obj.Product_Area_Id = item.Product_Area_Id;
                    obj.Product_Area_Name = item.Product_Area_Name;
                    obj.Lend_Count = item.Lend_Count;
                    obj.Storeage_Id = item.Storeage_Id;
                    obj.Storeage_Name = item.Storeage_Name;
                    obj.Material_Code = item.Material_Code;
                    obj.Order_Key = item.Order_Key;
                    obj.Weighting_Average_Cost = item.Weighting_Average_Cost;
                    obj.Return_Date = item.Return_Date;
                    obj.Inventry_Type = item.Inventry_Type;
                    obj.Inventry_Type_Name = item.Inventry_Type_Name;
                    obj.Remark = item.Remark;
                    obj.Create_User = item.Create_User;
                    obj.Create_Time = item.Create_Time;
                    obj.Row_Version = item.Row_Version;
                    obj.Is_Delete = item.Is_Delete;
                    obj.Create_Department_Id = item.Create_Department_Id;
                    obj.Create_Department_Name = item.Create_Department_Name;
                    obj.Create_Employee_Id = item.Create_Employee_Id;
                    obj.Create_Employee_Name = item.Create_Employee_Name;
                    P_Lend_Apply_Detail_List.push(obj);
                }
            });
            that.P_Lend_Apply.P_Lend_Apply_Detail_List = P_Lend_Apply_Detail_List;
            //验证至少输入一条明细
            if (!that.P_Lend_Apply.P_Lend_Apply_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            that.P_Lend_Apply.Receiver_Detail_Number = that.Receiver_Detail_Number;
            PageCommon.SubmitForm({
                url: "Save"
                     , param: { lendApply: that.P_Lend_Apply }
                     , success: function (data) {
                         //保存后根据返回值加载页面
                         var relevantnumber = data.Result_Model.Lend_Apply_Id;
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
                param: { lendApply: that.P_Lend_Apply },
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
                param: { lendApply: that.P_Lend_Apply },
                success: function (data) {
                    var relevantnumber = data.Result_Model.Lend_Apply_Id;
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
        //借货对象返回函数
        Template_selection: function (data) {
            var that = this;
            if (data.id == "01") {
                that.lend_supplier = true;
                that.lend_customer = false;
                that.P_Lend_Apply.Is_Purchase = "0";
            }
            if (data.id == "02") {
                that.lend_supplier = true;
                that.lend_customer = false;
                that.P_Lend_Apply.Is_Purchase = "1";
            }
            if (data.id == "03") {
                that.lend_supplier = false;
                that.lend_customer = true;
                that.P_Lend_Apply.Is_Purchase = "";
            }
            setTimeout(function () {
                if (data.id == "01" || data.id == "02") {
                    that.P_Lend_Apply.Supplier_Id = that.P_Lend_Apply.Lend_Goods_Object_Id;
                } else if (data.id == "03") {
                    that.P_Lend_Apply.Customer_Id = that.P_Lend_Apply.Lend_Goods_Object_Id;
                }
            })
        },
        ChangeCarrier: function (value) {
            var that = this;
            if (value) {
                that.linkageTransportation = {};
                that.linkageTransportation.Field_Name = "Carrier_Id";
                that.linkageTransportation.Value1 = value.id;
            } else {
                that.linkageTransportation == '';
            }
        },
        //客户选择情况
        TemplateSelectionCustomer: function (data) {
            var that = this;
            console.log("=c==>>");
            console.log(data);
            if (data) {
                that.P_Lend_Apply.P_Lend_Apply_Detail_List = [];
                that.linkage = {
                    id: data.Customer_Id,
                    Detail_Number: that.P_Lend_Apply.Receiver_Detail_Number
                }
            } else {
                that.P_Lend_Apply.P_Lend_Apply_Detail_List = [];
                that.linkage = '';
            }
            console.log(that.linkage);
        },
        //供应商选择情况
        TemplateSelectionSupplier: function (data) {
            var that = this;
            console.log("=s==>>");
            console.log(data);
            if (data) {
                that.P_Lend_Apply.P_Lend_Apply_Detail_List = [];
                that.linkage = {
                    id: data.Supplier_Id,
                    Detail_Number: that.P_Lend_Apply.Receiver_Detail_Number
                }
            } else {
                that.P_Lend_Apply.P_Lend_Apply_Detail_List = [];
                that.linkage = '';
            }
        },
    }
});