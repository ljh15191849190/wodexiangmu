//菜单主键
var keyValue = PageCommon.Request("keyValue");
var vmStorageAreaBatch = new Vue({
    el: '#apps',
    data: {
        B_Storeage_Area: {
            //仓库
            Storeage_Id: '',
            //编辑表格
            B_Storeage_Area_List: []
        },
        Storageresult: ["Storeage_Id", "Storeage_Name"],
        filedSearch: ["Storeage_Id", "Storeage_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Storeage_Id", "Storeage_Name"],
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000017",
            System_Key: "BasicData",
            List_Id: ""
        }
    },
    mounted: function () {
       
    },
    methods: {
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {

            if (Field_Name === "Storeage_Area_Name") {

            }
            if (Field_Name === "Storeage_Area_Short_Name") {
                
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
           
            else if (titleData.mData == "Storage_Area_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Storage_Area_Name").html();
                $("#div_temp_Storage_Area_Name").attr("id", "div_temp_Storage_Area_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Storage_Area_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        Storage_Area_Name: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Storage_Area_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Storage_Area_Short_Name") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Storage_Area_Short_Name").html();
                $("#div_temp_Storage_Area_Short_Name").attr("id", "div_temp_Storage_Area_Short_Name_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Storage_Area_Short_Name_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Storage_Area_Short_Name: cell.data()
                    }
                });
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
        //设置控件属性
        Set: function () {
            PageCommon.Reload();
        },
        //保存仓库区域画面数据
        Save: function () {

            //console.log($.fn.dataTable.Api('#ButtonList').rows());
            //console.log($.fn.dataTable.Api('#ButtonList').columns(':eq(' + 1+ ')'));

            PageCommon.CheckDataTables({
                tableId: "StorageAreaList",
                Key: "Storage_Area_Name",
                columns: [
                    {
                        columnName: "Storage_Area_Name",
                        CheckLength: '200',
                        CheckEmpty: true,
                    },
                     {
                         columnName: "Storage_Area_Short_Name",
                         CheckLength: '200',
                         CheckEmpty: true,
                     },
                    {
                        columnName: "Remark",
                        CheckLength: '500',
                        
                    }
                ],



            });


            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }


            //获取grid数据
            var data = PageCommon.GetDataTableData("StorageAreaList");
            vmStorageAreaBatch.B_Storage_Area.B_Storage_Area_List = [];
            //组织明细数据 过滤空行
            $.each(data, function (index, item) {
                if (item.Storage_Area_Name != "" && item.Storage_Area_Short_Name != "") {
                    var obj = {};
                    obj.Storage_Id = vmStorageAreaBatch.B_Storage_Area.Storage_Id;
                    obj.Storage_Area_Name = item.Storage_Area_Name;
                    obj.Storage_Area_Short_Name = item.Storage_Area_Short_Name;
                    obj.Remark = item.Remark;
                    vmStorageAreaBatch.B_Storage_Area.B_Storage_Area_List.push(obj);
                }
            });



            //验证至少输入一条明细
            if (!vmStoreageAreaBatch.B_Storeage_Area.B_Storeage_Area_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }



            //提交数据到后台
            PageCommon.SubmitForm({
                url: "BatchSave"
             , param: { "storageAreaList": vmStoreageAreaBatch.B_Storeage_Area.B_Storeage_Area_List }
             , success: function () {
                 //判断编辑还是新增
                 if (!!!keyValue) {
                     PageCommon.Reload();
                 } else {
                     window.location.href = PageCommon.SetUrl("List");
                 }
             }
            });
        },
        TemplateSelection: function (data) {
            this.B_Storeage_Area.Storeage_Id = data.id;
            this.B_Storeage_Area.Storeage_Name = data.Storeage_Name || data.text;
        },
        //返回列表画面
        Back: function () {
            PageCommon.BackFormMessge({})
        }
    }
});