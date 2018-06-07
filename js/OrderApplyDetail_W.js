
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
var OrderApply_vue = new Vue({
    el: '#apps',
    data: {
        M_Order_Apply: {
            //申请对象编码
            Apply_Object_Code: '',
            //统购
            Is_Purchase: '0',
            //申请对象
            Object_Id: '',

            Employee_Id: '',
            //要求货期
            Command_Date: '',
            M_Order_Apply_Detail_List: []
        },
        Customer_Id: '',
        Object_Id_Employee: '',
        Object_Id_Department: '',
        Object_Id_Area: '',
        Object01: true,
        Object02: false,
        Object03: false,
        Object04: false,
        checkEmpty01: true,
        checkEmpty02: false,
        checkEmpty03: false,
        checkEmpty04: false,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000004",
            System_Key: "Sale",
            List_Id: "OrderApplyDetailEdit"
        },
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //区域查询条件
        AreaWhere: [{
            Field_Name: "Parent_Geography_Id",
            Value1: '-1',
            Expression: '02',
            Query_Type: '01',
        }],

        //区域排序
        AreaOrder: [{
            Field_Name: "Geography_Id",
            Orderby: "ASC"
        }],
        //区域显示字段
        AreaResult: ["Geography_Id", "Geography_Name"],
        //部门
        Departmentresult: ["Department_Id", "Department_Name"],
        DepartmentfiledSearch: ["Department_Id", "Department_Name"],
        DepartmentinputField: ["Department_Id", "Department_Name"],
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
        //任务人
        Employee_Id: '',
        Department_Id: '',
        //编辑表格id
        tableid: ['OrderApplyDetailEdit']
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
            $(this).parent().find(".title1").toggleClass("boder");
            $(this).toggleClass("rotate");
        })
        $(".down_2").click(function () {
            $(this).toggleClass("rotate");
            if ($(".down_2").is(".rotate")) {
                $(".BasicInformation").slideUp(500);
                $(".title1").addClass("boder");
                $(".down_tab").each(function () {
                    if ($(this).is(".rotate")) {

                    } else {
                        $(this).addClass("rotate");
                    }
                })

            } else {
                $(".BasicInformation").slideDown(500);
                $(".title1").removeClass("boder");
                $(".down_tab").each(function () {
                    if ($(this).is(".rotate")) {
                        $(this).removeClass("rotate");
                    }
                })
            }

        })
        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber }
                , success: function (data) {

                    vm.M_Order_Apply = data;
                        
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        approvalstatus: data.Approval_Status,

                    });
                    //点击保存
                    PageCommon.Clickbtn(vm, 'Save');
                    if (save) {
                        vm.isedittable = false;
                    }
                }
            });
        }else{
            vm.M_Order_Apply.Apply_Object_Code = '01';
        }

    },
    methods: {
        //客户选择
        TemplateSelectionCustomer: function (data) {
            var vm = this;
            if (data) {
                vm.Employee_Id = data.Employee_Id;
                vm.Department_Id = data.Department_Id;
            } else {
                vm.Employee_Id = '';
                vm.Department_Id = '';
            }
        },
        //子表格数字合计
        totalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Apply_Count" || Field_Name === "Cancel_Count" || Field_Name === "Predistribution_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
            //价税合计
            if (Field_Name === "Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Total_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Total_Decimal];
            }

            //价税总额
            if (Field_Name === "Total_Price_Tax_Sum") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Price_Sum_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Price_Sum_Decimal];
            }
            //CY利润率_库 CY利润率_期
            if (Field_Name === "CY_Profit_Rate_Apply" || Field_Name === "CY_Profit_Rate_Period") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
            }
            //税额
            if (Field_Name === "Tax") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Tax_Decimal, vm.globalParameter.Money_Digital_Cut_Way), vm.globalParameter.Tax_Decimal];
            }
            //申请成本 最新含税成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                return [PageCommon.NumberDispose(a, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Cost_Decimal, vm.globalParameter.Cost_Digital_Cut_Way), vm.globalParameter.Cost_Decimal];
            }
        },
        //子表格行初始化
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
                return '0';
            }
            //销售数量 退货数量
            if (Field_Name === "Apply_Count" || Field_Name === "Cancel_Count" || Field_Name === "Predistribution_Count") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                   
                }
            }

            //价税合计
            if (Field_Name === "Price_Tax_Sum") {
                if (value) {
                    
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Price_Total_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }

            //库存利润率 期货利润率
            if (Field_Name === "CY_Profit_Rate_Apply" || Field_Name === "CY_Profit_Rate_Period") {
                if (value) {
                  
                        return PageCommon.NumberDispose(value, this.globalParameter.Profit_Margin_Decimal, this.globalParameter.Profit_Margin_Digital_Cut_Way);
                   
                }
            }


            //税额
            if (Field_Name === "Tax") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Tax_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
            //申请成本 最新成本
            if (Field_Name === "Apply_Cost" || Field_Name === "Lastest_Price_Include_Tax") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Cost_Decimal, this.globalParameter.Cost_Digital_Cut_Way);
                   
                }
            }
            //单价
            if (Field_Name === "Price") {
                if (value) {
                   
                        return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
                   
                }
            }
        },
        //申请对象编码选择
       
        ApplyObject: function (val) {
            var vm = this;
            if (val.id == "01") {
                vm.Object01 = true;
                vm.Object02 = false;
                vm.Object03 = false;
                vm.Object04 = false;

            }
            else if (val.id == "02") {
                vm.Object01 = false;
                vm.Object02 = true;
                vm.Object03 = false;
                vm.Object04 = false;

            }
            else if (val.id == "03") {
                vm.Object01 = false;
                vm.Object02 = false;
                vm.Object03 = true;
                vm.Object04 = false;

            } else if (val.id == "04") {
                vm.Object01 = false;
                vm.Object02 = false;
                vm.Object03 = false;
                vm.Object04 = true;

            }
            setTimeout(function () {

                if (val.id == "01") {
                    vm.Customer_Id = vm.M_Order_Apply.Object_Id
                } else if (val.id == "02") {
                    vm.Object_Id_Employee = vm.M_Order_Apply.Object_Id
                } else if (val.id == "03") {
                    vm.Object_Id_Department = vm.M_Order_Apply.Object_Id
                } else if (val.id == "04") {
                    vm.Object_Id_Area = vm.M_Order_Apply.Object_Id
                }
            })
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            var whereParameterList = [];
            var searchparameter =  {};
            var seachType = "3";
            if (OrderApply_vue.Object01) {
                if (OrderApply_vue.Customer_Id == "") {

                    PageCommon.ShowMessageArrayRight("E1001", new Array("客户名称先"));
                    return;
                } else {
                    searchparameter = {
                        searchUrl: '../Sale/PriceApply/PriceApplyDetailSearch',
                        searchTitle: '价格申请查询',
                        inventoryId: 'PriceApplyDetail',
                    };
                    whereParameterList.push({
                        Field_Name: "B_Product.Customer_Id",
                        Condition_Value1: OrderApply_vue.Customer_Id,
                        Query_Type: "01",
                        Expression: "02"
                    });
                    seachType = "2";
                }
            } else if (OrderApply_vue.Object02) {
                if (OrderApply_vue.Object_Id_Employee == "") {
                    PageCommon.ShowMessageArrayRight("E1001", new Array("员工姓名先"));
                    return;
                } else {
                    seachType="3"
                }
            } else if (OrderApply_vue.Object03) {
                if (OrderApply_vue.Object_Id_Department == "") {

                    PageCommon.ShowMessageArrayRight("E1001", new Array("部门名称先"));
                    return;
                } else {
                    seachType = "3"
                }
            } else if (OrderApply_vue.Object04) {
                if (OrderApply_vue.Object_Id_Area == "") {

                    PageCommon.ShowMessageArrayRight("E1001", new Array("区域名称先"));
                    return;
                } else {
                    seachType = "3"
                }
            }


            if (titleData.mData == "Product_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Product_Name").html();
                $("#div_temp_Product_Name").attr("id", "div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column);

                //获取下C_CustomerId的下标
                var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Price_Apply_Id' });
                var productNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Name' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', productIdIndex, { search: 'applied' });
                var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', productNameIndex, { search: 'applied' });
                //cell.Product_Name = cell_active2.data();
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Product_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Product_Purchase: "",
                        where_parameter_list: whereParameterList,
                        searchparameter: searchparameter,
                        seachType:seachType,
                        input_field: ['Inventory_Distribute_Id']
                    },
                    mounted: function () {
                        console.log(cell_active.data())
                        this.Product_Purchase = cell_active.data();

                    },
                    methods: {
                        urlparameterback: function () {
                            if (OrderApply_vue.Customer_Id) {
                                var urlparameter = 'Customer_Id=' + OrderApply_vue.Customer_Id;
                                return urlparameter;
                            } else {
                                PageCommon.ShowMessageRight("E2008");
                            }
                        },
                        TemplateSelectionProduct: function (data) {
                            if (data) {
                                cell.New_Name = data.New_Name;
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

            else if (titleData.mData == "Apply_Count") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Apply_Count").html();
                $("#div_temp_Apply_Count").attr("id", "div_temp_Apply_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Apply_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Apply_Count_" + cell.index().row + "_" + cell.index().column);
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
                var jqInputs = $('textarea', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
                $(".outer-lg", cell.node()).width(tdWidth);
            }


        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }

            if (titleData.mData == "Product_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Product_Name_" + cell.index().row + "_" + cell.index().column);
                //var productIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Product_Id' });
                //var cell_active = cell.cell(':eq(' + ids + ')', productIdIndex, { search: 'applied' });
                //console.log($(jqInputs[0]))
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }
                else {
                    ////修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell.data(cell.New_Name);
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
                PageCommon.RefreshTablePage("OrderApplyDetailEdit");

            }
        },
        //设置控件属性
        Set: function () {

        },
        //保存菜单画面数据
        Save: function () {

            PageCommon.CheckDataTables({
                tableId: "OrderApplyDetailEdit",
                Key: "Product_Id",
                columns: [
                    {
                        columnName: "Product_Name",
                        CheckEmpty: true
                    },
                         {
                             columnName: "Apply_Count",
                             CheckEmpty: true,
                             CheckLength: '14'
                         },
                         
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
            var data = PageCommon.GetDataTableData("OrderApplyDetailEdit");

            OrderApply_vue.M_Order_Apply.M_Order_Apply_Detail_List = [];
            //联系人信息组织明细数据 过滤空行  && item.Predistribution_Count != ""
            $.each(data, function (index, item) {
                if (item.Product_Name != "" && item.Apply_Count != "") {
                    var obj = {};
                    for (var key in item) {
                        if (item.Product_Name.indexOf('@@') > -1) {
                            item.Product_Name = item.Product_Name.substring(0, item.Product_Name.indexOf('@@'));
                        }
                        var keyTypes = typeof item[key];
                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                            if (key == "Is_Include_Tax_Name") {
                                if (item.Is_Include_Tax_Name == '是') {
                                    obj.Is_include_Tax = "0";
                                } else {
                                    obj.Is_include_Tax = "1";
                                }
                            }
                        }

                    }
                    OrderApply_vue.M_Order_Apply.M_Order_Apply_Detail_List.push(obj);
                }
            });
            if (OrderApply_vue.M_Order_Apply.Apply_Object_Code == "01") {
                OrderApply_vue.M_Order_Apply.Object_Id = OrderApply_vue.Customer_Id;

                OrderApply_vue.M_Order_Apply.Employee_Id = OrderApply_vue.Employee_Id;
                OrderApply_vue.M_Order_Apply.Department_Id = OrderApply_vue.Department_Id;

            } else if (OrderApply_vue.M_Order_Apply.Apply_Object_Code == "02") {
                OrderApply_vue.M_Order_Apply.Object_Id = OrderApply_vue.Object_Id_Employee
            } else if (OrderApply_vue.M_Order_Apply.Apply_Object_Code == "03") {
                OrderApply_vue.M_Order_Apply.Object_Id = OrderApply_vue.Object_Id_Department
            } else if (OrderApply_vue.M_Order_Apply.Apply_Object_Code == "04") {
                OrderApply_vue.M_Order_Apply.Object_Id = OrderApply_vue.Object_Id_Area
            }


            //验证至少输入一条明细
            if (!OrderApply_vue.M_Order_Apply.M_Order_Apply_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            OrderApply_vue.M_Order_Apply.Is_Purchase = "1";

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { orderApply: OrderApply_vue.M_Order_Apply }
             , success: function (data) {

                 window.location.href = PageCommon.SetUrlParameter("Detail_W", "relevantnumber=" + data.Result_Model.Request_Object.Order_Apply_Id + '&save=1');
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
             , param: { OrderApply: OrderApply_vue.M_Order_Apply },
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
             , param: { OrderApply: OrderApply_vue.M_Order_Apply },
                success: function (data) {
                    window.location.href = PageCommon.SetUrlParameter("List_W");
                }
            });
        },
        //审批意见
        mApproval: function () {

        },

        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List_W', vm);
        }
    }
});
///计算单价 价税合计
//IsIncludeTax 是否含税
//含税时 Price=价税合计 不含税时 Price= 单价；
var CountPrice = function (IsIncludeTax, Price) {

    var obj = {};

    if (IsIncludeTax) {
        obj.Price = Price / 1.17;
        obj.Tax = Price - obj.Price;
        obj.Price_Tax_Sum = Price;
    } else {
        obj.Price = Price;
        obj.Price_Tax_Sum = Price * 1.17;
        obj.Tax = obj.Price_Tax_Sum - Price;

    }

    return obj;

}