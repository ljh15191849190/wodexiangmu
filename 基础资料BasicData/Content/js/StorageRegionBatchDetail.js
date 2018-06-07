
var keyValue = PageCommon.Request("keyValue");
var vmStorageRegionBatch = new Vue({
    el: '#apps',
    data: {
        B_Storage_Region: {
            //仓库名称
            Storage_Id: '',
            //仓库区域名称
            Storage_Area_Id: '',
            //编辑表格
            B_Storage_Region_List: []

        },
        //仓库区域下拉查询条件
        StorageAreaWhere: [],
        //仓库区域排序条件
        StorageAreaOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //仓库区域下拉显示字段
        StorageAreaResult: ["Storage_Area_Id", "Storage_Area_Name"],
        //仓库区域联动条件
        linkage: null,
        Storageresult: ["Storage_Id", "Storage_Name"],
        filedSearch: ["Storage_Id", "Storage_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Storage_Id", "Storage_Name"],
        columHeaderSeach: {
            Menu_Id: "M000020",
            System_Key: "BasicData"
          , List_Id: ""
        }

    },
    mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });


    

    },
    methods: {
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            
            if (Field_Name === "Storage_Region_Name") {

            }
            if (Field_Name === "Storage_Region_Short_Name") {
               
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
                        Remark: cell.data()
                    }
                });

                //设置控件在DataTables上
                var jqInputs = $('textarea', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
                $(".outer-lg", cell.node()).width(tdWidth);
            }
            
            else if (titleData.mData == "Storage_Region_Name") {
                
                //获取模板的html
                cell.node().innerHTML = $("#temp_Storage_Region_Name").html();
                $("#div_temp_Storage_Region_Name").attr("id", "div_temp_Storage_Region_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Storage_Region_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Storage_Region_Name: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Storage_Region_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Storage_Region_Short_Name") {
                
                //获取模板的html
                cell.node().innerHTML = $("#temp_Storage_Region_Short_Name").html();
                $("#div_temp_Storage_Region_Short_Name").attr("id", "div_temp_Storage_Region_Short_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模
                var cheld = new Vue({
                    el: "#div_temp_Storage_Region_Short_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Storage_Region_Short_Name: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Storage_Region_Short_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Storage_Region_Type_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Storage_Region_Type").html();
                $("#div_temp_Storage_Region_Type").attr("id", "div_temp_Storage_Region_Type_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Storage_Region_Type_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Storage_Region_Type: cell.data(),
                        //储区类型下拉查询条件
                        StorageRegionTypeWhere: [],
                        //储区类型排序条件
                        StorageRegionTypeOrder: [{
                            Field_Name: "Show_Order",
                            Orderby: "ASC"
                        }],
                        //储区类型下拉显示字段
                        StorageRegionTypeResult: ["Storage_Region_Id", "Storage_Region_Type"],
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('select', cell.node());
               // $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Storage_Region_Type_" + cell.index().row + "_" + cell.index().column);
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
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
                    $(jqInputs).focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            } else if (titleData.mData == "Storage_Region_Type_Name") {
                //取得行号
                var jqInputs = $('select', cell.node());
                var ids = cell.index().row;

                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')',9, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("STORAGE_REGION_TYPE", rowData.Storage_Region_Type);
                //修改datatable 对应的值
                cell.data(value);

            } else {
                var jqInputs = $('input', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs)) && ischeck) {
                    $(jqInputs).focus();

                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }
        },
        //保存数据字典画面数据
        Save: function (obj) {
            PageCommon.CheckDataTables({
                tableId: "StorageRegionList",
                Key: "Storage_Region_Name",
                columns: [
                    {
                        columnName: "Storage_Region_Name",
                        CheckLength: '200',
                        CheckEmpty: true,
                    },
                     {
                         columnName: "Storage_Region_Short_Name",
                         CheckLength: '200',
                         CheckEmpty: true,
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

            //获取grid数据
            var data = PageCommon.GetDataTableData("StorageRegionList");

            vmStorageRegionBatch.B_Storage_Region.B_Storage_Region_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Storage_Region_Name != "" && item.Storage_Region_Short_Name != "") {
                    var obj = {};
                    obj.Storage_Id = vmStorageRegionBatch.B_Storage_Region.Storage_Id;
                    obj.Storage_Area_Id = vmStorageRegionBatch.B_Storage_Region.Storage_Area_Id;
                    obj.Storage_Region_Name = item.Storage_Region_Name;
                    obj.Storage_Region_Short_Name = item.Storage_Region_Short_Name;
                    obj.Storage_Region_Type = item.Storage_Region_Type;
                    obj.Remark = item.Remark;
                    vmStorageRegionBatch.B_Storage_Region.B_Storage_Region_List.push(obj);
                }

            });

            //验证至少输入一条明细
            if (!vmStorageRegionBatch.B_Storage_Region.B_Storage_Region_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }

            //提交数据到后台
            PageCommon.SubmitForm({
                url: "BatchSave"
             , param: { "storageRegionList":  vmStorageRegionBatch.B_Storage_Region.B_Storage_Region_List }
             , success: function () {
                     window.location.href = PageCommon.SetUrl("List");
             }
            });
        },
        //返回列表画面
        Back: function (obj) {
            PageCommon.BackFormMessge({})
        },
        TemplateSelection: function (data) {
            vmStorageRegionBatch.linkage = {};
            vmStorageRegionBatch.linkage.Field_Name = "Storage_Id";
            vmStorageRegionBatch.linkage.Value1 = data.id;
        },

        //根据仓库查询仓库区域
        ChangeStorage: function (value) {
            vmStorageRegionBatch.linkage = {};
            vmStorageRegionBatch.linkage.Field_Name = "Storage_Id";
            vmStorageRegionBatch.linkage.Value1 = value;
        },
    },


})
