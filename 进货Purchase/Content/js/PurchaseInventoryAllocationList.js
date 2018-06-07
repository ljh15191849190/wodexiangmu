var InventoryAllocation_vue = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        refreshtable2: false,
        refreshtable3: false,
        globalParameter: PageCommon.GlobalParameter(),
        //是否遮罩
        isshade_bg: false,
        //表格是否可编辑
        isedittable: true,
        //编辑表格id数组
        tableid: ['PurchaseInventoryList', 'PurchaseInventoryAlloctionList'],
        //是否显示分配按钮
        btnDistribute: true,
        //是否显示分配取消按钮
        btnDistributeCancel: false,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000013",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "InventorySeach",
        //表格2查询url
        table2Url: "Seach",
        //表格3查询url
        table3Url: "InventoryAllocationSeach",
        //表格查询条件
        searchModel: {
            Where_Parameter_List: [{
                Field_Name:"B_Product.Inventory_Free_Count",
                Contorl_Id:"Inventory_Free_Count",
                Module_Id:"searchForm",
                Query_Type:"01",
                Expression:"08",
                Condition_Value1:"0"
            }]
        },
        //表格查询条件
        searchModel2: {
            Pagination_Info: {},
            Where_Parameter_List: []
        },
        //表格查询条件
        searchModel3: {},
        //表格查询条件
        P_Inventory_Distribute: {
            //型号
            Product_Name: "",
            //库房
            Storeage_Name: "",
            //品牌
            Brand_Name: "",
            //对象类型
            Object_Type: "",
            //客户
            Customer_Name: '',
            //员工
            Employee_Name: '',
            //部门
            Department_Name: '',
            //区域
            Geography_Id: '',
        },
        //表格查询条件
        P_Inventory_Distribute2: {
            //型号
            Product_Name: "",
            //品牌
            Brand_Name: "",
            //对象类型
            Object_Type: "",
            //客户
            Customer_Name: '',
            //员工
            Employee_Name: '',
            //部门
            Department_Name: '',
            //区域
            Geography_Id: '',
        },
        //区域查询条件
        geography: {
            Menuresult: ["Geography_Id", "Geography_Name"],
            filedSearch: ["Geography_Id", "Geography_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Geography_Id", "Geography_Name"]
        },
        selectRow: [],
        precancelcount: ''
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
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $(".replyType").find('.type').eq(0).show();
        $(".replyType").find('.type').eq(1).hide();
        $("#searchForm_detail").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        $("#tab").on("click", 'li', function () {
            var index = $(this).index();
            if (index == 0) {
                $(".replyType").find('.type').eq(0).show();
                $(".replyType").find('.type').eq(1).hide();
                that.btnDistribute = true;
                that.btnDistributeCancel = false;
                that.refreshtable2 = !that.refreshtable2;
            } else if (index == 1) {
                $(".replyType").find('.type').eq(0).hide();
                $(".replyType").find('.type').eq(1).show();
                that.btnDistribute = false;
                that.btnDistributeCancel = true;
                that.refreshtable3 = !that.refreshtable3;
            }
            PageCommon.RefreshTablePage("InventorySummaryList");
            PageCommon.RefreshTablePage("PurchaseInventoryList");
            PageCommon.RefreshTablePage("PurchaseInventoryAlloctionList");
            $(this).addClass("tabactive").siblings().removeClass("tabactive");
        })
    },
    methods: {
        ObjectType: function (val) {
            if (val.id == "01") {
                $(".Customer").show();
                $(".Department").hide();
                $(".Applier").hide();
                $(".Area").hide();
            }
            else if (val.id == "03") {
                $(".Customer").hide();
                $(".Department").show();
                $(".Applier").hide();
                $(".Area").hide();
            }
            else if (val.id == "02") {
                $(".Customer").hide();
                $(".Department").hide();
                $(".Applier").show();
                $(".Area").hide();
            } else if (val.id == "04") {
                $(".Customer").hide();
                $(".Department").hide();
                $(".Applier").hide();
                $(".Area").show();
            }
        },
        ObjectType2: function (val) {
            if (val.id == "01") {
                $(".Customer2").show();
                $(".Department2").hide();
                $(".Applier2").hide();
                $(".Area2").hide();
            }
            else if (val.id == "03") {
                $(".Customer2").hide();
                $(".Department2").show();
                $(".Applier2").hide();
                $(".Area2").hide();
            }
            else if (val.id == "02") {
                $(".Customer2").hide();
                $(".Department2").hide();
                $(".Applier2").show();
                $(".Area2").hide();
            } else if (val.id == "04") {
                $(".Customer2").hide();
                $(".Department2").hide();
                $(".Applier2").hide();
                $(".Area2").show();
            }
        },
        GroupListRowClick: function (row) {
            var that = this;
            that.selectRow = [];
            that.selectRow.push(row.data());
            that.searchModel2.Where_Parameter_List = [];
            var Product_Ids = "";
            var select_arr = [];
            if (that.selectRow.length) {
                $.each(that.selectRow, function (index, item) {
                    if (item) {
                        Product_Ids += "''" + item.Product_Id + "'',";
                        select_arr.push(item);
                    }
                })
            }

            Product_Ids = Product_Ids.substring(0, Product_Ids.length - 1);
            if (that.selectRow[0].Product_Id) {
                that.searchModel2 = {
                    Where_Parameter_List: [{
                        Field_Name: "M_Order_Apply_Detail.Product_Id",
                        Contorl_Id: "Product_Id_arr",
                        Condition_Value1: Product_Ids,
                        Expression: "04",
                        Module_Id: "Purchase",
                        Query_Type: "01"
                    }]
                }
            }
            that.selectRow = select_arr;
        },
        //查询
        SearchM: function () {
            var that = this;
            var model = {};
            model = $(".form_base2").GetSearchModel();
            if (that.searchModel2.Where_Parameter_List[0] && that.searchModel2.Where_Parameter_List[0].Contorl_Id == "Product_Id_arr") {
                model.Where_Parameter_List.push(that.searchModel2.Where_Parameter_List[0]);
            }
            that.searchModel2 = model;
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var that = this;
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Current_Distribute_Count") {
                //获取模板的html
                //that.precancelcount = cell.data();
                cell.node().innerHTML = $("#temp_Current_Distribute_Count").html();
                $("#div_temp_Current_Distribute_Count").attr("id", "div_temp_Current_Distribute_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Current_Distribute_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Current_Distribute_Count_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            if (titleData.mData == "Current_Cancel_Count") {
                //获取模板的html
                that.precancelcount = cell.data();
                cell.node().innerHTML = $("#temp_Current_Cancel_Count").html();
                $("#div_temp_Current_Cancel_Count").attr("id", "div_temp_Current_Cancel_Count_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Current_Cancel_Count_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data(),
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Current_Cancel_Count_" + cell.index().row + "_" + cell.index().column);
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
            if (titleData.mData == "Current_Cancel_Count") {
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                    cell.focus();
                } else {
                    if (rowData.Distribute_Count) {
                        if (parseFloat($(jqInputs[0]).val()) > 0) {
                            if (rowData.Distribute_Handle_Count) {
                                if (parseFloat($(jqInputs[0]).val()) > parseFloat(rowData.Distribute_Count) - parseFloat(rowData.Distribute_Handle_Count)) {
                                    cell.data(that.precancelcount);
                                } else {
                                    cell.data($(jqInputs[0]).val());
                                }
                            } else {
                                if (parseFloat($(jqInputs[0]).val()) > parseFloat(rowData.Distribute_Count)) {
                                    cell.data(that.precancelcount);
                                } else {
                                    cell.data($(jqInputs[0]).val());
                                }
                            }
                        } else {
                            cell.data(that.precancelcount);
                        }
                    } else {
                        cell.data(that.precancelcount);
                    }
                }
            }
            else {
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    if (rowData.Product_Id) {
                        cell.data($(jqInputs[0]).val());
                    } else {
                        cell.data("");
                    }
                }
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            var that = this;
            if (Field_Name == "Allocated_Count" || Field_Name == "Inventory_Free_Count" || Field_Name == "Apply_Count" || Field_Name == "Cancel_Count" || Field_Name == "Current_Distribute_Count" || Field_Name == "Distribute_Handle_Count" || Field_Name == "Distribute_Count" || Field_Name == "Current_Cancel_Count") {
                if (parseInt(value) == 0) {
                    return '0';
                } else if (!value) {
                    return '';
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
        },
        //父表格合计数字格式化
        pagetotalback: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name == "Allocated_Count" || Field_Name == "Inventory_Free_Count" || Field_Name == "Current_Distribute_Count" || Field_Name == "Distribute_Handle_Count" || Field_Name == "Current_Cancel_Count" || Field_Name == "Distribute_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //分配
        Distribute: function () {
            var that = this;
            var list = [];
            var Storeage_Id = "", Inventry_Type = "", Distribute = true;
            if (that.selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            } else {
                Storeage_Id = that.selectRow[0].Storeage_Id;
                Inventry_Type = that.selectRow[0].Inventry_Type;
                if (Storeage_Id && Distribute) {
                    if (that.selectRow[0].Inventory_Free_Count == 0) {
                        PageCommon.ShowMessageRight("E2087");
                        return;
                    }
                    $('#PurchaseInventoryList tbody tr').each(function (i) {
                        var item = $.fn.dataTable.Api('#PurchaseInventoryList').row(this).data();
                        list.push(item);
                    });
                    if (list.length) {
                        $.each(list, function (index, item) {
                            item.Current_Storeage_Id = Storeage_Id;
                            item.Inventry_Type = Inventry_Type;
                        });
                        PageCommon.SubmitForm({
                            url: "InventoryAllocation",
                            param: { orderApplyDetailList: list },
                            success: function (data) {
                                PageCommon.RefreshTablePage("InventorySummaryList");
                                that.refreshtable2 = !that.refreshtable2;
                            }
                        });
                    }
                }
            }
        },
        //分配取消
        DistributeCancel: function () {
            var that = this;
            var list = [];
            $('#PurchaseInventoryAlloctionList tbody tr').each(function (i) {
                var item = $.fn.dataTable.Api('#PurchaseInventoryAlloctionList').row(this).data();
                list.push(item);
            });
            if (list.length) {
                PageCommon.SubmitForm({
                    url: "InventoryAllocationCancel",
                    param: { inventoryDistributeList: list },
                    success: function (data) {
                        that.refreshtable3 = !that.refreshtable3;
                    }
                });
            }
        },
        //查询
        Search: function () {
            var that = this;
            if (that.btnDistributeCancel) {
                that.searchModel3 = $(".form_base1").GetSearchModel();
            } else if (that.btnDistribute) {
                that.searchModel = $(".form_base1").GetSearchModel({ Menu_Id: "M000013", List_Id: "InventorySummaryList" });
                var postdata = {};
                postdata.Field_Name = "B_Product.Inventory_Free_Count";
                postdata.Contorl_Id = "Inventory_Free_Count";
                postdata.Module_Id = "searchForm";
                postdata.Query_Type = "01";
                postdata.Expression = "08";
                postdata.Condition_Value1 = "0";
                that.searchModel.Where_Parameter_List.push(postdata);
            }
        },
        //清除
        mClear: function () {
            this.P_Inventory_Distribute.Product_Name = "";
            this.P_Inventory_Distribute.Brand_Name = "";
            this.P_Inventory_Distribute.Storeage_Name = "";
            this.P_Inventory_Distribute.Object_Type = "";
            this.P_Inventory_Distribute.Customer_Name = "";
            this.P_Inventory_Distribute.Employee_Name = "";
            this.P_Inventory_Distribute.Department_Name = "";
            this.P_Inventory_Distribute.Geography_Id = "";
            $('#Object_Type').val(null).trigger('change');
            $('#Geography_Id').val(null).trigger('change');
            PageCommon.TableDefaultSort("InventorySummaryList");
        },
        //清除
        mClear2: function () {
            this.P_Inventory_Distribute2.Product_Name = "";
            this.P_Inventory_Distribute2.Brand_Name = "";
            this.P_Inventory_Distribute2.Storeage_Name = "";
            this.P_Inventory_Distribute2.Object_Type = "";
            this.P_Inventory_Distribute2.Customer_Name = "";
            this.P_Inventory_Distribute2.Employee_Name = "";
            this.P_Inventory_Distribute2.Department_Name = "";
            this.P_Inventory_Distribute2.Geography_Id = "";
            $('#Geography_Id2').val(null).trigger('change');
            $('#Object_Type2').val(null).trigger('change');
            PageCommon.TableDefaultSort("PurchaseInventoryList");
        },
    }
});