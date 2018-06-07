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
var Sale_Invoice_Apply_vue = new Vue({
    el: '#apps',
    data: {
        C_Send_Invoice_Detail_Number: '',
        FA_Sale_Invoice_Apply: {
            //入库
            Customer_Id: '',
            Customer_Name: "",
            Employee_Id: '',
            C_Send_Invoice_Detail_Number: '',
            Tax_Rate_Id: '',
            Invoice_Type: '',
            Tax_Rate: '',
            Invoice_Apply_Type: '01',
            Latest_Invoice_Time: '',
            Remark: '',
            FA_Sale_Invoice_Apply_Detail_List: [],
        },
        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "FinancialApplication",
            List_Id: ""
        },
        Tax_RateOrder: [{}],
        Tax_RateResult: ["Tax_Rate_Id", "Invoice_Type", "Tax_Rate"],
        Tax_RateWhere: [{}],
        EmployeefiledResult: ["Employee_Id", "Name"],
        EmployeefiledSearch: ["Employee_Id", "Name"],
        EmployeemainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        EmployeeinputField: ["Employee_Id", "Name"],
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
        //是否显示导入按钮
        btnImport: true,
        //位数cookie
        globalParameter: {},
        //客户返回数据
        SelectionData: {},
        //发票类型
        SelectionTaxRateData: {},
        //系统联动条件
        linkage: {},
    },
    mounted: function () {
        $('#SaleInvoiceApplyNewList').on('dblclick', 'tbody tr', function () {
            PageCommon.ModalOpen({
                id: "ProductPackage",
                title: '销售单引入',
                width: "960px",
                height: "600px",
                btn: ['加入'],
                url: '/FinancialApplication/SaleInvoiceApply/Search',
                callBack: function (iframeId) {
                    var list = PageCommon.ChildrenFrames(iframeId).vmSaleInvoiceApply.Add();
                    if (list) {
                        $.each(list, function (index, item) {
                            var obj = {};
                            for (var key in item) {
                                var keyTypes = typeof item[key];
                                if (keyTypes != 'object' && keyTypes != 'function') {
                                    obj[key] = item[key];
                                }
                            }
                            obj.Tax_Sum = item.Tax;
                            obj.Product_Name = item.Product_Name + " " + item.Package;
                            obj.Count = item.This_Invoice_Count;
                            obj.Goods_Or_Taxable_Service = item.Product_Classify_Name + " " + item.Brand_Name;
                            Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.FA_Sale_Invoice_Apply_Detail_List.push(obj);
                        })
                    }

                }
            })
        })

        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
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
                    Sale_Invoice_Apply_vue.linkage = data;
                    Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply = data;
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        approvalstatus: data.Approval_Status,
                        lookCallBack: function () {
                            //回调添加按钮
                        }
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
        ReceivePerson: function (value) {
            console.log(value);
        },
        TemplateSelection: function (data) {
            var vm = this;
            if (data) {
                vm.SelectionData = data;
                Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Employee_Id = data.Employee_Id;
                vm.linkage = {
                    id: data.Customer_Id,
                    Detail_Number: Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.C_Send_Invoice_Detail_Number
                }
            } else {
                vm.SelectionData = '';
                Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Employee_Id = '';
                vm.linkage = ''
            }
        },
        totalback: function (Field_Name, a, b) {
            var vm = this;
            //数量
            if (Field_Name === "Count") {
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
            if (Field_Name === "Count" || Field_Name === "Red_Flush_Count") {
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
            if (Field_Name === "Price_Tax_Sum_Amount" || Field_Name === "Price_Tax_Amount") {
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
            else if (titleData.mData == "Count") {
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
                        EnterCountonchange: function (value) { }
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
                    PageCommon.RefreshTablePage("SaleInvoiceApplyNewList");
                }
            }
        },

        //保存菜单画面数据
        Save: function () {
            var vm = this;
            $(".BasicInformation").slideDown(300);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");
            //$('#SaleInvoiceApplyNewList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "SaleInvoiceApplyNewList",
                Key: "Count",
                columns: [
                     {
                         columnName: "Count",
                         CheckEmpty: true,
                         CheckLength: '20'
                     },
                     {
                         columnName: "Remark",
                         CheckLength: '200'
                     }

                ],
            });
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            if (Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Customer_Id) {
                Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Customer_Name = vm.SelectionData.Customer_Name;
                Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Employee_Id = vm.SelectionData.Employee_Id;
                Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Customer_Invoice_Detail_Number = vm.SelectionData.Invoice_Detail_Number;
                Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Department_Id = vm.SelectionData.Department_Id;
            }
            //验证至少输入一条明细
            if (!Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.FA_Sale_Invoice_Apply_Detail_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //获取grid数据
            var productdata = PageCommon.GetDataTableData("SaleInvoiceApplyNewList");
            Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.FA_Sale_Invoice_Apply_Detail_List = [];
            ////组织明细数据 过滤空行
            $.each(productdata, function (index, item) {
                if (item.Count != "") {
                    Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.FA_Sale_Invoice_Apply_Detail_List.push(item);
                }
            });
            Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.C_Send_Invoice_Detail_Number = vm.C_Send_Invoice_Detail_Number;
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save",
                param: { saleInvoiceApply: Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply },
                success: function (data) {
                    console.log(data)
                    //保存后根据返回值加载页面
                    //SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Sale_Invoice_Apply_Id + "," + data.Result_Model.Customer_Id + '&save=1');
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
                url: "SubmitApply"
             , param: { saleInvoiceApply: Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //审核
        Approval: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "ReviewApply",
                param: { saleInvoiceApply: Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + Sale_Invoice_Apply_vue.FA_Sale_Invoice_Apply.Sale_Invoice_Apply_Id + ',' + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                }
            });
        },
        //审批意见
        mApproval: function () {

        },
        //返回
        Back: function () {
            PageCommon.BackFormMessge("List");
        },
        Set: function () { },

        //原发票类型
        TemplateData: function (data) {
            this.SelectionTaxRateData = data;
            this.FA_Sale_Invoice_Apply.Tax_Rate_Id = data.id;
            this.FA_Sale_Invoice_Apply.Tax_Rate = data.Tax_Rate;
            this.FA_Sale_Invoice_Apply.Invoice_Type = data.text;
        },

    }
});