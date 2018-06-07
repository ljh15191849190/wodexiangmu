
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
    var vmPayment = new Vue({
        el: '#apps',
        data: {

            F_Pay_Bill: {
                //付款项目
                Pay_Item: '',
                //付款方式
                Payment_Method: '',
                //付款部门
                Pay_Department_Id: '',
                //供应商
                Supplier_Id: '',
                Supplier_Bank_Detail_Number:'',
                //删除原因
                Delete_Reason:'',
                //备注
                Remark:'',
                F_Pay_Bill_Detail_List: []
            },

            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000005",
                System_Key: "FinancialManage",
                List_Id: "PaymentFormDetail"
            },
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            Departmentresult: ["Department_Id", "Department_Name"],
            DepartmentFiledSearch: ["Department_Id", "Department_Name"],
            DepartmentInputField: ["Department_Id", "Department_Name"],
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
            $('#PaymentFormDetail').on('dblclick', 'tbody tr', function () {
                PageCommon.ModalOpen({
                    id: "PaymentFormSearch",
                    title: '货款单查询详细',
                    width: "900px",
                    height: "800px",
                    btn: ["添加"],
                    url: '/FinancialManage/PaymentForm/PaymentDetailSearch',
                    callBack: function (iframeId) {

                        var selectRow = PageCommon.ChildrenFrames(iframeId).vmPaymentSearch.SelectRow();
                        PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                        if (selectRow.length == 0) {
                            return;
                        }
                        var data = PageCommon.GetDataTableData("PaymentFormDetail");

                        $.each(selectRow, function (index, item) {
                               vm.F_Pay_Bill.F_Pay_Bill_Detail_List.push(item);

                        })

                        PageCommon.RefreshTablePage("PaymentFormDetail");
                    }


                })

            })
            var vm = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber }
                    , success: function (data) {
                        vmPayment.F_Pay_Bill = data;

                        //判断状态
                        PageCommon.EditStatus({
                            vm: vm,
                            approvalstatus: data.Approval_Status,

                        });
                        //点击保存
                        PageCommon.Clickbtn(vm, 'Save');

                    }
                });

            } else {
                vm.IsEdit = 1;
            }

        },
        methods: {
            //选择供应商
            TemplateSupplier:function(data){
                if (data) {
                    vmPayment.F_Pay_Bill.Supplier_Bank_Detail_Number = data.Bank_Detail_Number;
                } else {
                    vmPayment.F_Pay_Bill.Supplier_Bank_Detail_Number = '';
                }
            },
            //子表格数字合计
            totalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Should_Pay_Amount" || Field_Name === "Fact_Pay_Amount") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
            },
            //子表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Should_Pay_Amount" || Field_Name === "Fact_Pay_Amount") {
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

                    PageCommon.RefreshTablePage("PaymentFormDetail");
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
                else {

                    var jqInputs = $('input', cell.node());
                    //验证数据
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
                    } else {
                        //修改datatable 对应的值
                        cell.data($(jqInputs[0]).val());
                    }
                    PageCommon.RefreshTablePage("PaymentFormDetail");

                }
            },
            //设置控件属性
            Set: function () {

            },
            //保存菜单画面数据
            Save: function () {

                PageCommon.CheckDataTables({
                    tableId: "PaymentFormDetail",
                    Key: "Pay_Bill_Id",
                    columns: [

                         {
                             columnName: "Remark",
                             CheckLength: '500'
                         },

                    ],



                });


                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //获取grid数据
                var data = PageCommon.GetDataTableData("PaymentFormDetail");

                vmPayment.F_Pay_Bill.F_Pay_Bill_Detail_List = [];
                //寄售信息组织明细数据 过滤空行
                $.each(data, function (index, item) {
                    if (item.Fact_Pay_Amount != "") {
                        var obj = {};
                        for (var key in item) {
                            var keyTypes = typeof item[key];

                            if (keyTypes != 'object' && keyTypes != 'function') {
                                obj[key] = item[key];
                            }
                        }

                        if (obj.Fact_Pay_Amount != "") {
                            vmPayment.F_Pay_Bill.F_Pay_Bill_Detail_List.push(obj);
                        }


                    }
                });

                //验证至少输入一条明细
                if (!vmPayment.F_Pay_Bill.F_Pay_Bill_Detail_List.length > 0) {
                    PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                    PageCommon.Loading(false);
                    return;
                }
                //提交数据到后台
                PageCommon.SubmitForm({
                    url: "SavePayBill"
                 , param: { payBill: vmPayment.F_Pay_Bill }
                 , success: function (data) {

                     window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Pay_Bill_Id + '&save=1');
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
                 , param: { payBill: vmPayment.F_Pay_Bill },
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
                 , param: { payBill: vmPayment.F_Pay_Bill },
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
                PageCommon.BackFormMessge('List');
            }
        }
    });
