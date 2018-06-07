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
var NewSampleApply_vue = new Vue({
    el: '#apps',
    data: {
        globalParameter: PageCommon.GlobalParameter(),
        //统购是否可触发监听
        isPS_watch:false,
        //统购是否可编辑
        isPS_Eatie: false,
        //是否遮罩
        isshade_bg: false,
        //是否统购
        Is_Purchase:"",
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
            Menu_Id: "M000019",
            System_Key: "Purchase"
        },
        //单据信息
        P_Sample_Purchase_Apply: {
            Is_Purchase: "",
            //单号
            Sample_Purchase_Apply_Id: "",
            //审核状态
            Approval_Status: "",
            //供应商
            Supplier_Id: "",
            //申请日期
            Apply_Date: "",
            //备注
            Remark: "",
            //客户
            Customer_Id: "",
            //明细列表
            P_Sample_Purchase_Apply_Detail_List: []
        },
        //编辑表格id数组
        tableid: ['SamplePurchaseApplyDetailEditList'],
    },
    mounted: function () {
        var that = this;
        if (RequestValue.isPS_Eatie == "1") {
            that.isPS_Eatie = true;
        }
        if (RequestValue.isPS_watch == "1") {
            that.isPS_watch = true;
        }
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Sample_Purchase_Apply = data;
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
                    if (that.P_Sample_Purchase_Apply.Is_Purchase == "0") {
                        that.Is_Purchase = "01"
                    } else if (that.P_Sample_Purchase_Apply.Is_Purchase == "1") {
                        that.Is_Purchase = "02"
                    }
                }
            });
        }
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
            if (Field_Name == "Apply_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Apply_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var that = this;
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Apply_Count") {
                //获取模板的html
                that.p_count = cell.data();
                cell.node().innerHTML = $("#temp_Apply_Count").html();
                $("#div_temp_Apply_Count").attr("id", "div_temp_Apply_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Apply_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Apply_Count: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Apply_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Product_Name") {

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
                        Product_Purchase: '',
                        is_purchase: that.P_Sample_Purchase_Apply.Is_Purchase
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
            else if (titleData.mData == "Storeage_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Storeage_Name").html();
                $("#div_temp_Storeage_Name").attr("id", "div_temp_Storeage_Name_" + cell.index().row + "_" + cell.index().column);

                //获取下C_CustomerId的下标
                var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storeage_Id' });
                var customerNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storeage_Name' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });
                var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', customerNameIndex, { search: 'applied' });
                cell.Storeage_Id = cell_active.data();
                cell.Storeage_Name = cell_active2.data();
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Storeage_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Storeage_Name: '',
                    },
                    mounted: function () {
                        this.Storeage_Name = cell.Storeage_Id;
                    },
                    methods: {
                        TemplateSelectionCustomer: function (data) {
                            if (data) {
                                cell.Storeage_Id = data.Storeage_Id;
                                cell.Storeage_Name = data.Storeage_Name;
                            } else {
                                cell.Storeage_Id = '';
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
            }
            else if (titleData.mData == "Storeage_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Storeage_Name_" + cell.index().row + "_" + cell.index().column);
                //修改第2列 隐藏列的值
                var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Storeage_Id' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Storeage_Id);
                        cell.data(cell.Storeage_Name);
                    } else {
                        cell.data("");
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
            that.isPS_Eatie = true;
        },
        //保存
        Save: function () {
            var that = this;
            $('#SamplePurchaseApplyDetailEditList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "SamplePurchaseApplyDetailEditList",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Apply_Count",
                        CheckEmpty: true,
                    },
                     {
                         columnName: "Storeage_Id",
                         CheckEmpty: true,
                     }
                ]
            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取定单明细表数据
            var detaildata = PageCommon.GetDataTableData("SamplePurchaseApplyDetailEditList");
            var P_Sample_Purchase_Apply_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(detaildata, function (index, item) {
                if (item.Product_Id) {
                    var obj = {};
                    obj.Sample_Purchase_Apply_Id = item.Sample_Purchase_Apply_Id;
                    obj.Detail_Number = item.Detail_Number;
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
                    obj.Apply_Count = item.Apply_Count;
                    obj.Storeage_Id = item.Storeage_Id;
                    obj.Storeage_Name = item.Storeage_Name;
                    obj.Row_Version = item.Row_Version;
                    obj.Is_Delete = item.Is_Delete;
                    obj.Create_User = item.Create_User;
                    obj.Create_Time = item.Create_Time;
                    obj.Create_Department_Id = item.Create_Department_Id;
                    obj.Create_Department_Name = item.Create_Department_Name;
                    obj.Create_Employee_Id = item.Create_Employee_Id;
                    obj.Create_Employee_Name = item.Create_Employee_Name;
                    P_Sample_Purchase_Apply_Detail_List.push(obj);
                }
            });
            that.P_Sample_Purchase_Apply.P_Sample_Purchase_Apply_Detail_List = P_Sample_Purchase_Apply_Detail_List;
            //验证至少输入一条明细
            if (!that.P_Sample_Purchase_Apply.P_Sample_Purchase_Apply_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            PageCommon.SubmitForm({
                url: "Save"
                     , param: { samplePurchaseApply: that.P_Sample_Purchase_Apply }
                     , success: function (data) {
                         //保存后根据返回值加载页面
                         var relevantnumber = data.Result_Model.Sample_Purchase_Apply_Id + "," + data.Result_Model.Is_Purchase;
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
                param: { samplePurchaseApply: that.P_Sample_Purchase_Apply },
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
                param: { samplePurchaseApply: that.P_Sample_Purchase_Apply },
                success: function (data) {
                    var relevantnumber = data.Result_Model.Sample_Purchase_Apply_Id + "," + data.Result_Model.Is_Purchase;
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
        //是否统购
        Template_selection: function (data) {
            var that = this;
             if (data.id == "01") {
                    that.P_Sample_Purchase_Apply.Is_Purchase = "0";
                }
                else if (data.id == "02") {
                    that.P_Sample_Purchase_Apply.Is_Purchase = "1";
            }
            if (that.isPS_watch) {
                that.P_Sample_Purchase_Apply.Supplier_Id = "";
                that.P_Sample_Purchase_Apply.P_Sample_Purchase_Apply_Detail_List = [];
            }
        }
    }
});