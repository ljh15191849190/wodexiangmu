    var This_Count = 0;
    var In_Storeage_vue = new Vue({
        el: '#app',
        data: {
            This_Enter_Count: '',
            Should_Enter_Count: '',
            Entered_Count: '',
            Corporation_Id: "",
            Bill_Type: '',
            Storeage_Name: '',
            Corporation_Name: "",
            Product_Name:"",
            W_In_Storeage: {
                //入库
                W_In_Storeage_Detail_List: [],
            },
            //联系人信息表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000005",
                System_Key: "Warehouse",
                List_Id: ""
            },
            //是否显示保存按钮
            btnSave: true,
            //是否显示返回按钮
            btnBack: true,
            //是否显示设置按钮
            btnSet: true,
            pageTotal:'',
            linkageData: ''
        },
      
        mounted: function () {
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
            var array = PageCommon.CurrentWindow().PageCommon.ChildrenFrames("ProductPackage").vmInStoreage.selectRows;
            this.W_In_Storeage = array[0];
            this.W_In_Storeage.W_In_Storeage_Detail_List = [];
            this.Should_Enter_Count = array[0].Should_Enter_Count;
            this.Entered_Count = array[0].Entered_Count;
            this.Corporation_Id = array[0].Corporation_Id;
            this.Bill_Type = array[0].Bill_Type;
            this.Storeage_Name = array[0].Storeage_Name;
            this.linkageData = array[0].Storeage_Id;
            this.Corporation_Name = array[0].Corporation_Name;
            if (array[0].Is_Purchase == '1') {
                this.Product_Name = array[0].Product_Name + '@';
            } else {
                this.Product_Name = array[0].Product_Name;
            }
            PageCommon.GetFormData({
                url: "GetNonInStoreageNumber",
                param: { inStoreageWaitDetail: array[0] }
                   , success: function (data) {
                       This_Count = data;
                       In_Storeage_vue.This_Enter_Count = data;
                   }
            });

        },
        methods: {
            pagetotalback: function (i, pageTotal) {
                this.pageTotal = pageTotal;
            },
            ThisCountonchange: function (value) {
                This_Count = value;

            },
            //编辑行回调
            rowEditCallback: function (cell, titleData, rowData) {
                if (titleData.mData == "This_Enter_Count") {
                    var tdWidth = $(cell.node()).width();
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_This_Enter_Count").html();
                    $("#div_temp_This_Enter_Count").attr("id", "div_temp_This_Enter_Count_" + cell.index().row + "_" + cell.index().column);
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_This_Enter_Count_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            This_EnterCount: cell.data()
                        }
                    });
                    //设置控件在DataTables上
                    var jqInputs = $('input', cell.node());
                    $(jqInputs)[0].select();
                    $(jqInputs).attr('id', "This_Enter_Count_" + cell.index().row + "_" + cell.index().column);
                    $(".outer", cell.node()).width(tdWidth);
                }
                else if (titleData.mData == "Fact_Goods_Locate_Name") {
                    var tdWidth = $(cell.node()).width();
                    //获取模板的html
                    cell.node().innerHTML = $("#temp_Fact_Goods_Locate_Name").html();

                    $("#div_temp_Fact_Goods_Locate_Name").attr("id", "div_temp_Fact_Goods_Locate_Name_" + cell.index().row + "_" + cell.index().column);
                    //获取焦点后给将表格数据赋给控件
                    var IdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Fact_Goods_Locate_Id' });

                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', IdIndex, { search: 'applied' });
                    //初始化VUE模板
                    var cheld = new Vue({
                        el: "#div_temp_Fact_Goods_Locate_Name_" + cell.index().row + "_" + cell.index().column,
                        data: {
                            Fact_Goods_Locate_Name: "",
                            linkage:''
                        },
                        mounted: function () {
                            this.linkage = In_Storeage_vue.linkageData;
                            this.Fact_Goods_Locate_Name = cell_active.data();
                        },
                        methods: {
                            TemplateSelection: function (data) {
                                if (data) {
                                    cell.Goods_Locate_Id = data.id;
                                    cell.Goods_Locate_Name = data.name;
                                } else {
                                    cell.Goods_Locate_Id = '';
                                    cell.Goods_Locate_Name = '';
                                }
                            }
                        }
                    });
                    $(".outer", cell.node()).width(tdWidth);
                }
            },
            //行编辑失去焦点回调事件
            rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
                var ischeck = $(cell.node()).hasClass("render");
                if (ischeck) {
                    $(cell.node()).removeClass("render");
                }
                if (titleData.mData == "Fact_Goods_Locate_Name") {
                    //取得行号
                    var jqInputs = $('select', cell.node());
                    var ids = cell.index().row;
                    $(jqInputs).attr('id', "Fact_Goods_Locate_Name_" + cell.index().row + "_" + cell.index().column);
                    if (typeof (cell.Goods_Locate_Name) == "undefined") {
                        cell.Goods_Locate_Id = $(jqInputs).val();
                        cell.Goods_Locate_Name = $(jqInputs).text();
                    }

                    //修改第2列 隐藏列的值
                    //var cell_active = datatable.cell(':eq(' + ids + ')',8, { search: 'applied' });
                    var IdIndex = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Fact_Goods_Locate_Id' });
                    var cell_active = cell.cell(':eq(' + cell.index().row + ')', IdIndex, { search: 'applied' });
                    cell_active.data($(jqInputs[0]).val());
                    if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                        cell.focus();
                        return;
                    }

                    else {
                        //修改datatable 对应的值
                        if ($(jqInputs[0]).val()) {
                            cell_active.data(cell.Goods_Locate_Id);
                            cell.data(cell.Goods_Locate_Name);
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
                        PageCommon.RefreshTablePage("InStoreageChangeList");
                        //失去焦点重新计算本次入库数量
                        var Include = In_Storeage_vue.pageTotal;
                        In_Storeage_vue.This_Enter_Count = This_Count - Include;
                    }
                }



            },
            //设置控件属性
            Set: function () {



            },
            //保存菜单画面数据
            Save: function () {
                $('#InStoreageChangeList').DataTable().cell.blur();
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                if (this.This_Enter_Count > parseFloat(this.Should_Enter_Count) - parseFloat(this.Entered_Count)) {
                    top.PageCommon.ShowMessageRight("E2048");
                    return;
                }
                var productdata = PageCommon.GetDataTableData("InStoreageChangeList");
              
                In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List = [];
                ////组织明细数据 过滤空行
                var COUNT = 0;
                var msg = this.W_In_Storeage.Product_Name;
                $.each(productdata, function (index, item) {
                    if (item.This_Enter_Count != "") {
                        In_Storeage_vue.W_In_Storeage.W_In_Storeage_Detail_List.push(item);
                        COUNT = COUNT + parseFloat(item.This_Enter_Count);
                    }

                });
                if (this.pageTotal > This_Count) {
                    top.PageCommon.ShowMessageArrayRight("E2045", new Array(msg));
                    return ;
                }
                if (!(PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Corporation_Id && PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Corporation_Object) == "" || (PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Bill_Type) == "") {
                    if ((PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Corporation_Id != In_Storeage_vue.Corporation_Id && PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Corporation_Object != In_Storeage_vue.Corporation_Object) || PageCommon.CurrentWindow().In_Storeage_vue.W_In_Storeage.Bill_Type != In_Storeage_vue.Bill_Type) {
                        top.PageCommon.ShowMessageRight("E2043");
                        return;
                    }

                }
                PageCommon.ModalClose();

                PageCommon.CurrentWindow().In_Storeage_vue.ChangeValue(this.W_In_Storeage)
            },


            //返回
            Back: function () {
                PageCommon.BackFormMessge("List");
            }
        }
    });