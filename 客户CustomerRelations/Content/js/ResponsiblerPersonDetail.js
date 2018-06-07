
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
var HandOverDetail_Vue = new Vue({
    el: '#apps',
    data: {
        C_Hand_Over_Apply_Bill: {
            //移交申请ID
            Hand_Over_Bill_Id: '',
            //移交原因
            Hand_Over_Reason: '',
            //移交事项
            Hand_Over_Item: "",
            //申请日期
            Create_Time: '',
            C_Hand_Over_Apply_Bill_Detail_List: []
        },
        //联系人信息表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000008",
            System_Key: "CustomerRelations",
            List_Id: "HandOverDetailListEdit"
        },
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
        //编辑表格id
        tableid: ['HandOverDetailListEdit']
    },
    mounted: function () {
        $('.form-group').arrangeable({
            dragSelector: '.shade_Bg'
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
                    
                    vm.C_Hand_Over_Apply_Bill = data;
                    var rtnData = eval("(" + data.C_Hand_Over_Apply_Bill_Detail_Json + ")");
                    
                    vm.C_Hand_Over_Apply_Bill.C_Hand_Over_Apply_Bill_Detail_List = rtnData;
                    
                    //判断状态
                    PageCommon.EditStatus({  
                        vm: vm,  
                        approvalstatus: data.Approval_Status,
                        lookCallBack: function () {
                            vm.btnImport = false;
                        },
                        editCallBack: function () {
                            vm.btnImport = false;
                        }
                    });
                    //点击保存
                    PageCommon.Clickbtn(vm, 'Save');
                    //如果是保存后加载的页面表格设为不可修改
                    if (save) {
                        vm.isedittable = false;
                    }


                }
            });
        }
    },
    methods: {
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData, table) {
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
                                for (var key in data) {
                                    if (key != "Customer_Name") {
                                        var tindexs = _.findLastIndex(cell.settings()[0].aoColumns, { mData: key });
                                        var tcell = cell.cell(':eq(' + cell.index().row + ')', tindexs, { search: 'applied' });
                                        tcell.data(data[key]);
                                        var EmployeeIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Employee_Id_Name' });
                                        var cell_active_employee = cell.cell(':eq(' + cell.index().row + ')', EmployeeIndex, { search: 'applied' });
                                        cell_active_employee.data(data.Employee_Name);

                                        var DepartmentIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Department_Id_Name' });
                                        var cell_active_department = cell.cell(':eq(' + cell.index().row + ')', DepartmentIndex, { search: 'applied' });
                                        cell_active_department.data(data.Department_Name);
                                    }

                                }
                            }
                        }
                    }
                });
                $(".outer", cell.node()).width(tdWidth);

            }
            else if (titleData.mData == "Now_Employee_Id_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Now_Employee_Id_Name").html();

                $("#div_temp_Now_Employee_Id_Name").attr("id", "div_temp_Now_Employee_Id_Name_" + cell.index().row + "_" + cell.index().column);
                //var cell_active = cell.cell(':eq(' + cell.index().row + ')',8, { search: 'applied' });
                //获取焦点后给将表格数据赋给控件
                var employeeIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Now_Employee_Id' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', employeeIdIndex, { search: 'applied' });
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Now_Employee_Id_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Now_Employee_Id_Name: "",
                    },
                    mounted: function () {
                        console.log(cell_active.data())
                        this.Now_Employee_Id_Name = cell_active.data();
                        var jqInputs = $('select', cell.node());
                    },
                    methods: {
                        TemplateSelectionEmployee: function (data) {
                            var departmentIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Now_Department_Id' });
                            var departmentNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Now_Department_Id_Name' });
                            var cell_Id = cell.cell(':eq(' + cell.index().row + ')', departmentIdIndex, { search: 'applied' });
                            var cell_Name = cell.cell(':eq(' + cell.index().row + ')', departmentNameIndex, { search: 'applied' });
                            if (data) {
                                cell_Id.data(data.Department_Id);
                                cell_Name.data(data.Department_Name);

                                cell.Employee_Id = data.id;
                                cell.Name = data.name;
                            } else {
                                cell.Employee_Id = '';
                                cell.Name = '';
                            }
                        }
                    }
                });
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
            if (titleData.mData == "Customer_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Customer_Name_" + cell.index().row + "_" + cell.index().column);
                //修改第2列 隐藏列的值
                var customerIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Id' });
                var cell_active = cell.cell(':eq(' + cell.index().row + ')', customerIdIndex, { search: 'applied' });

                var customerNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Name' });
                var cell_active_Name = cell.cell(':eq(' + cell.index().row + ')', customerNameIndex, { search: 'applied' });
                    
                    
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
                if (cell_active_Name.data() == "") {

                    var customerNameIndex1 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Employee_Id_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex1, { search: 'applied' }).data("");

                    var customerNameIndex2 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Department_Id_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex2, { search: 'applied' }).data("");

                    var customerNameIndex3 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Other_Customer_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex3, { search: 'applied' }).data("");

                    var customerNameIndex4 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Type_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex4, { search: 'applied' }).data("");

                    var customerNameIndex5 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Status_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex5, { search: 'applied' }).data("");

                    var customerNameIndex6 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Major_Manage_Product' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex6, { search: 'applied' }).data("");

                    var customerNameIndex7 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_WebSite' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex7, { search: 'applied' }).data("");

                    var customerNameIndex8 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Importance_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex8, { search: 'applied' }).data("");

                    var customerNameIndex9 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Industry_Id_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex9, { search: 'applied' }).data("");

                    var customerNameIndex10 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Customer_Address' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex10, { search: 'applied' }).data("");

                    var customerNameIndex11 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Detail_Address' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex11, { search: 'applied' }).data("");

                    var customerNameIndex12 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Send_Goods_Bill_Sign_Way_Name' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex12, { search: 'applied' }).data("");

                    var customerNameIndex13 = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Remark' });
                    cell.cell(':eq(' + cell.index().row + ')', customerNameIndex13, { search: 'applied' }).data("");

                }
            }
            if (titleData.mData == "Now_Employee_Id_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;
                $(jqInputs).attr('id', "Now_Employee_Id_Name_" + cell.index().row + "_" + cell.index().column);
                //if (typeof (cell.Name) == "undefined") {
                //    cell.Employee_Id = $(jqInputs).val();
                //    cell.Name = $(jqInputs).text();
                //}

                //修改第2列 隐藏列的值
                //var cell_active = datatable.cell(':eq(' + ids + ')',8, { search: 'applied' });
                var employeeIdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Now_Employee_Id' });

                var cell_active = cell.cell(':eq(' + cell.index().row + ')', employeeIdIndex, { search: 'applied' });

                var employeeNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Now_Employee_Id_Name' });

                var cell_active2 = cell.cell(':eq(' + cell.index().row + ')', employeeNameIndex, { search: 'applied' });
                    
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                    return;
                }

                else {
                    //修改datatable 对应的值
                    if ($(jqInputs[0]).val()) {
                        cell_active.data(cell.Employee_Id);
                        cell.data(cell.Name);
                    } else {
                        cell.data("");
                    }

                }
                if (cell_active2.data() == "") {
                    var departmentNameIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Now_Department_Id_Name' });

                    cell.cell(':eq(' + cell.index().row + ')', departmentNameIndex, { search: 'applied' }).data("");
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
        //设置控件属性
        Set: function () {

        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(500);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");

            PageCommon.CheckDataTables({
                tableId: "HandOverDetailListEdit",
                Key: "Customer_Name",
                columns: [
                    {
                        columnName: "Customer_Name",
                        CheckEmpty: 'true'
                    },
                     {
                         columnName: "Now_Employee_Id_Name",
                         CheckEmpty: 'true'
                     }

                ],



            });

            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //获取grid数据
            var data = PageCommon.GetDataTableData("HandOverDetailListEdit");

            HandOverDetail_Vue.C_Hand_Over_Apply_Bill.C_Hand_Over_Apply_Bill_Detail_List = [];
            //联系人信息组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Customer_Name != "" && item.Now_Employee_Id_Name != '') {
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];
                        
                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }
                    }

                    if (obj.Customer_Name != "") {
                        HandOverDetail_Vue.C_Hand_Over_Apply_Bill.C_Hand_Over_Apply_Bill_Detail_List.push(obj);
                    }

                }
            });

            //验证至少输入一条明细
            if (!HandOverDetail_Vue.C_Hand_Over_Apply_Bill.C_Hand_Over_Apply_Bill_Detail_List.length > 0) {
                PageCommon.ShowMessageArrayRight("E2027");
                PageCommon.Loading(false);
                return;
            }
            console.log(HandOverDetail_Vue.C_Hand_Over_Apply_Bill)
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { handOverApply: HandOverDetail_Vue.C_Hand_Over_Apply_Bill }
             , success: function (data) {

                 window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Hand_Over_Bill_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
             }
            });
        },
        //编辑
        Edit: function () {
            var vm = this;
            PageCommon.Clickbtn(vm, 'Edit');
        },
        //导入
        Import: function (obj) {
            console.log(1);
            PageCommon.ModalImportOpen({
                tableName: "C_Hand_Over_Apply_Bill_Detail",
                systemKey: "CustomerRelations",
                vm: HandOverDetail_Vue,
            })
        },
        //导入结果
        ImportResult: function (objectModel, objectModelList) {
            var rtnData = eval("(" + objectModel + ")");
            var tableData = PageCommon.GetDataTableData("HandOverDetailListEdit");

            $.each(tableData, function (index, rowdata) {
                if (rowdata.Customer_Name != "") {
                    if (_.findLastIndex(rtnData, { Customer_Name: rowdata.Customer_Name }) > 0) {
                        return true;
                    } else {
                        rtnData.push(rowdata);
                    }
                }


            });

            HandOverDetail_Vue.C_Hand_Over_Apply_Bill.C_Hand_Over_Apply_Bill_Detail_List = rtnData;
            return true;
        },
        //提交
        Submit: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Submit"
             , param: { handOverApply: HandOverDetail_Vue.C_Hand_Over_Apply_Bill },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
           
        //返回列表画面
        Back: function () {
            PageCommon.BackFormMessge('List');
        }

    }
});
