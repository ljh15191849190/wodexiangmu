    //联系人信息主键
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
    var Purchace_InvoiceRegister_vue = new Vue({
        el: '#apps',
        data: {
            isedittable: false,
            isdelete_img: true,
            formData: '',
            File_Model_List: [{
                //Base64_Imgage: ''
            }],
            F_Purchase_Invoice_Register: {
                Invoice_Number:"",
                Invoice_Amount: '',
                Supplier_Id: '',
                Invoice_Date: '',
                Is_Exception: "1",
                Exception_Reason: '',
                Invoice_Type: '',
                Tax_Rate_Id: '',
                Tax_Rate:'',
                F_Purchase_Invoice_R_Detail_List: [],
                Delete_File_Model_List: []
            },
         
            //联系人信息表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000015",
                System_Key: "FinancialApplication",
                List_Id: "PurchaseInvoiceRegisterNewList"
            },
            //销售
            columHeaderSeach2: {
                Menu_Id: "M000002",
                System_Key: "FinancialApplication",
                List_Id: "SaleOrderDetail"
            },
            Tax_RateOrder: [{}],
            Tax_RateResult: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
            Tax_RateWhere: [{}],
            //是否只读
            readonly: false,
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
            //是否显示导入按钮
            btnImport: true,
            //位数cookie
            globalParameter: {},
            //客户返回数据
            SelectionData: {},
            //是否显示原因
            ExceptionReason: '',
            //合计
            pageTotal:''
        },
        mounted: function () {
            var vm = this;
            vm.globalParameter = PageCommon.GlobalParameter();
            //控件拖动
            $('.base').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
               
            });
            $('#PurchaseInvoiceRegisterNewList').on('dblclick', 'tbody tr', function () {
                PageCommon.ModalOpen({
                    id: "PurchasePackage",
                    title: '进货单引入',
                    width: "960px",
                    height: "600px",
                    btn: ['加入'],
                    url: '/FinancialApplication/PurchaseInvoiceRegister/InvoiceInfo',
                    urlparameter: 'Supplier_Id=' + Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.Supplier_Id,
                    callBack: function (iframeId) {
                        var list = PageCommon.ChildrenFrames(iframeId).vmSaleInvoiceRegister.Add();
                        if (list) {
                            $.each(list, function (index, item) {
                                var obj = {};
                                for (var key in item) {
                                    var keyTypes = typeof item[key];
                                    if (keyTypes != 'object' && keyTypes != 'function') {
                                        obj[key] = item[key];
                                    }
                                }
                                obj.Sure_Invoice_Count = item.This_Invoice_Count;
                                obj.Tax_Sum = item.Tax;
                                Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.F_Purchase_Invoice_R_Detail_List.push(obj);
                            })
                        }
                    }
                });
            });
            //页签折叠
            $(".title1").click(function () {
                $(this).parent().find(".BasicInformation").slideToggle();
                $(this).parent().find(".down_tab").toggleClass("rotate");
                $(this).toggleClass("boder");
            })
            $(".down_tab").click(function () {
                $(this).parent().find(".BasicInformation").slideToggle();
                $(this).parent().find(".title").toggleClass("boder");
                $(this).toggleClass("rotate");
            })
            $(".down_2").click(function () {
                $(this).toggleClass("rotate");
                $(".BasicInformation").slideToggle();
                $(".title1").toggleClass("boder");
                $(".down_tab").toggleClass("rotate");
            })
            var vm = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: relevantnumber }
                    , success: function (data) {
                        vm.File_Model_List = data.File_Model_List;
                        Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register = data;
                        //判断状态
                        PageCommon.EditStatus({
                            vm: vm,
                            approvalstatus: data.Approval_Status,

                        });
                        //点击保存
                        PageCommon.Clickbtn(vm, 'Save');
                        if (RequestValue.sourcetype && RequestValue.sourcetype == 1) {
                            vm.btnApproval = true;
                        }
                       
                    }
                });
            }

        },
        methods: {
            onchange: function (value) {
                var vm = this;
                if (value == 0) {
                    vm.ExceptionReason = true;
                } else {
                    vm.ExceptionReason = false;
                }
            },
            pagetotalback: function (i, pageTotal) {
                var vm = this;
                if (i == 22) {
                    vm.pageTotal = pageTotal;
                }
            },
            totalback: function (Field_Name, a, b) {
                var vm = this;
                //数量
                if (Field_Name === "Sure_Invoice_Count" || Field_Name === "This_Invoice_Count") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }

                //价税合计
                if (Field_Name === "Price_Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
                }
                //单价总额
                if (Field_Name === "Price_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Sum_Decimal];
                }
                //价税总额
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
                }
                //单价
                if (Field_Name === "Price") {
                    return [PageCommon.NumberDispose(a, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Price_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Price_Decimal];
                }
                //税额
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
                }
              
            },
            columrender: function (Field_Name, value, type, rowData, rowSetting) {

                if (Field_Name === "Sure_Invoice_Count" || Field_Name === "This_Invoice_Count") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Tax_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount" || Field_Name === "Tax_Rate") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Sum_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
                if (Field_Name === "Tax_Rate") {
                    if (value) {

                        return PageCommon.NumberDispose(value, 6, 1);

                    }
                }
                if (Field_Name === "Tax" || Field_Name === "Tax_Sum") {
                    if (value) {

                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);

                    }
                }
            },
            //保存菜单画面数据
            Save: function () {
                var vm = this;
                $(".BasicInformation").slideDown(300);
                $(".title1").removeClass("boder");
                $(".down_tab").removeClass("rotate");
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                if (this.pageTotal != Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.Invoice_Amount) {
                    PageCommon.ModalConfirm("金额不一致是否保存？", function (rtn) {
                        if (rtn) {
                            if (Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.F_Purchase_Invoice_R_Detail_List.length > 0) {
                                $.each(Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.F_Purchase_Invoice_R_Detail_List, function (index, item) {
                                    item.edit = "";
                                })
                                vm.formData.delete('purchaseInvoiceApply');
                                var data = JSON.stringify(vm.F_Purchase_Invoice_Register);
                                console.log(data);
                                vm.formData.append('purchaseInvoiceApply', data);
                                PageCommon.SubmitForm({
                                    url: "Save",
                                    param: vm.formData,
                                    type: '2',
                                    success: function (data) {
                                     //SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                                     window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Purchase_Invoice_Register_Id + '&save=1');
                                 }
                                });
                            } else {
                                PageCommon.ShowMessageRight("E2069");
                                return;
                            }
                        }
                    });
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
                else if (titleData.mData == "This_Invoice_Count") {
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Count").html();
                    $("#div_temp_Count").attr("id", "div_temp_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Count: cell.data()
                        },
                        methods: {
                            EnterCountonchange: function (value) {
                                var Price_SumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Sum' });  //单价总额
                                var Price_Sumcell_active = cell.cell(':eq(' + cell.index().row + ')', Price_SumIndex, { search: 'applied' });

                                var Price_TaxIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Amount' });  //价税总额
                                var Price_TaxIndexcell_active = cell.cell(':eq(' + cell.index().row + ')', Price_TaxIndex, { search: 'applied' });
                                
                                var PriceIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price' });  //单价
                                var Pricecell_active = cell.cell(':eq(' + cell.index().row + ')', PriceIndex, { search: 'applied' });

                                var Price_Tax_SumIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Tax_Sum' });  //价税合计
                                var Price_Tax_Sumcell_active = cell.cell(':eq(' + cell.index().row + ')', Price_Tax_SumIndex, { search: 'applied' });

                                if (Price_Sumcell_active.data() != "" && Price_TaxIndexcell_active.data() != "") {
                                    Price_Sumcell_active.data(parseFloat(Pricecell_active.data()) * parseFloat(value));
                                    Price_TaxIndexcell_active.data(parseFloat(Price_Tax_Sumcell_active.data()) * parseFloat(value)/100);
                                }

                            }
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "Count_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
              
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
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
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
                        PageCommon.RefreshTablePage("PurchaseInvoiceRegisterNewList");
                    }
                }



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
                    url: "SubmitApply",
                    param: { purchaseInvoiceRegister: Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register },
                    success: function (data) {
                        PageCommon.Clickbtn(vm, 'Submit');
                        //vm.btnApproval = "true";
                    }
                });
            },
            //审核
            Approval: function () {
                var vm = this;
                PageCommon.SubmitForm({
                    url: "ReviewApply",
                    param: { purchaseInvoiceRegister: Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register },
                    success: function (data) {
                        window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + Purchace_InvoiceRegister_vue.F_Purchase_Invoice_Register.Purchase_Invoice_Register_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                    }
                });
            },
            //审批意见
            mApproval: function () {

            },
            //返回
            Back: function () {
                var vm = this;
                PageCommon.BackFormMessge("List", vm);
            },
            TemplateData: function (data) {
                this.F_Purchase_Invoice_Register.Tax_Rate = data.Tax_Rate;
                this.F_Purchase_Invoice_Register.Invoice_Type = data.text;
            },
            Set: function () { },
          
            backfd: function (fd, deletedata) {
                var that = this;
                if (deletedata) {
                    that.F_Purchase_Invoice_Register.Delete_File_Model_List = deletedata;
                }
                that.formData = fd;
            },
        }
    });