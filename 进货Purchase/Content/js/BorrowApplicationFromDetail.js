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
var NewBorrowApplicationFrom_vue = new Vue({
    el: '#apps',
    data: {
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
            Menu_Id: "M000021",
            System_Key: "Purchase"
        },
        //单据信息
        P_Borrow_Apply: {
            Is_Purchase: "",
            //单号
            Borrow_Apply_Id: "",
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
            Handle_Employee_Id:"",
            //运输方式
            Transportation_Way_Id: "",
            //承运商
            Carrier_Id: "",
            //备注
            Remark: "",
            //明细列表
            P_Borrow_Apply_Detail_List: []
        },
        //编辑表格id数组
        tableid: ['BorrowApplyDetailEditList'],
        //借入对象为供应商
        lend_supplier:false,
        //借入对象为客户
        lend_customer: false,
        //承运商
        carrier: {
            Menuresult: ["Carrier_Id", "Carrier_Name"],
            filedSearch: ["Carrier_Id", "Carrier_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Carrier_Id", "Carrier_Name"]
        },
        //运输方式查询条件
        transportation: {
            Menuresult: ["Transportation_Way_Id", "Transportation_Way_Name"],
            filedSearch: ["Transportation_Way_Id", "Transportation_Way_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Transportation_Way_Id", "Transportation_Way_Name"]
        },
    },
    mounted: function () {
        var that = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.P_Borrow_Apply = data;
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
        $('#BorrowApplyDetailEditList').on('dblclick', 'tbody tr', function () {
            PageCommon.ModalOpen({
                id: "OrderLead",
                title: '定货单引入',
                width: "960px",
                height: "600px",
                btn: ["确定"],
                url: '/Purchase/BorrowApplicationFrom/Lead',
                callBack: function (iframeId) {
                    var list = PageCommon.ChildrenFrames(iframeId).OrderLead_vue.Add();
                    $.each(list, function (index, item) {
                        item.Is_Purchase = "";
                        item.Borrow_Apply_Id = "";
                        item.Borrow_Count = "";
                        item.Order_Apply_Detail_Number = "";
                        item.Customer_Id = "";
                        item.Customer_Name = "";
                        item.Create_User = "";
                        item.Create_Time = "";
                        item.Create_Department_Id = "";
                        item.Create_Employee_Id = "";
                        item.Create_Time = "";
                        that.P_Borrow_Apply.P_Borrow_Apply_Detail_List.push(item);
                    })
                    PageCommon.RefreshTablePage("BorrowApplyDetailEditList");
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
            if (Field_Name == "Borrow_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Borrow_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var that = this;
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Customer_Name") {
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
                            } else {
                                cell.Customer_Id = '';
                                cell.Customer_Name = '';
                            }
                        }
                    }
                });
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Borrow_Count") {
                //获取模板的html
                that.p_count = cell.data();
                cell.node().innerHTML = $("#temp_Borrow_Count").html();
                $("#div_temp_Borrow_Count").attr("id", "div_temp_Borrow_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Borrow_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Borrow_Count: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Borrow_Count_" + cell.index().row + "_" + cell.index().column);
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
        },
        //保存
        Save: function () {
            var that = this;
            if (that.P_Borrow_Apply.Lend_Goods_Object == "01" || that.P_Borrow_Apply.Lend_Goods_Object == "02") {
                that.P_Borrow_Apply.Lend_Goods_Object_Id = that.P_Borrow_Apply.Supplier_Id;
            }
            else if (that.P_Borrow_Apply.Lend_Goods_Object == "03") {
                that.P_Borrow_Apply.Lend_Goods_Object_Id = that.P_Borrow_Apply.Customer_Id;
            }
            $('#BorrowApplyDetailEditList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "BorrowApplyDetailEditList",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Customer_Id",
                        CheckEmpty: true,
                    },
                    {
                        columnName: "Borrow_Count",
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
            var detaildata = PageCommon.GetDataTableData("BorrowApplyDetailEditList");
            var P_Borrow_Apply_Detail_List = [];
            //组织明细数据 过滤空行
            $.each(detaildata, function (index, item) {
                if (item.Product_Id) {
                    var obj = {};
                    obj.Borrow_Apply_Id = item.Borrow_Apply_Id;
                    obj.Detail_Number = item.Detail_Number;
                    obj.Order_Apply_Id = item.Order_Apply_Id;
                    obj.Order_Apply_Detail_Number = item.Order_Apply_Detail_Number;
                    obj.Customer_Id = item.Customer_Id;
                    obj.Customer_Name = item.Customer_Name;
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
                    obj.Borrow_Count = item.Borrow_Count;
                    obj.Storeage_Id = item.Storeage_Id;
                    obj.Storeage_Name = item.Storeage_Name;
                    obj.Row_Version = item.Row_Version;
                    obj.Is_Delete = item.Is_Delete;
                    obj.Remark = item.Remark;
                    P_Borrow_Apply_Detail_List.push(obj);
                }
            });
            that.P_Borrow_Apply.P_Borrow_Apply_Detail_List = P_Borrow_Apply_Detail_List;
            //验证至少输入一条明细
            if (!that.P_Borrow_Apply.P_Borrow_Apply_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            PageCommon.SubmitForm({
                url: "Save"
                     , param: { borrowApply: that.P_Borrow_Apply }
                     , success: function (data) {
                         //保存后根据返回值加载页面
                         var relevantnumber = data.Result_Model.Borrow_Apply_Id;
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
                param: { borrowApply: that.P_Borrow_Apply },
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
                param: { borrowApply: that.P_Borrow_Apply },
                success: function (data) {
                    var relevantnumber = data.Result_Model.Borrow_Apply_Id;
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
                that.P_Borrow_Apply.Is_Purchase = "0";
            }
            if (data.id == "02") {
                that.lend_supplier = true;
                that.lend_customer = false;
                that.P_Borrow_Apply.Is_Purchase = "1";
            }
            if (data.id == "03") {
                that.lend_supplier = false;
                that.lend_customer = true;
                that.P_Borrow_Apply.Is_Purchase = "";
            }

            setTimeout(function () {
                if (data.id == "01" || data.id == "02") {
                    that.P_Borrow_Apply.Supplier_Id = that.P_Borrow_Apply.Lend_Goods_Object_Id;
                } else if (data.id == "03") {
                    that.P_Borrow_Apply.Customer_Id = that.P_Borrow_Apply.Lend_Goods_Object_Id;
                }
            })
        }
    }
});