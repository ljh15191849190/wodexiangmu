var searchData = {};
//var table = $('#example').DataTable({
//    colReorder: true
//});

//table.on('column-reorder', function (e, settings, details) {

//    var headerCell = $(table.column(details.to).header());

//    headerCell.addClass('reordered');

//    setTimeout(function () {
//        headerCell.removeClass('reordered');
//    }, 2000);
//});
var vmMenu = new Vue({
    el: '#apps',
    data: {
        //系统名称
        System_Name: "",
        //菜单分组名称
        Menu_Group_Name: "",
        //菜单名称
        Menu_Name: "",
        //菜单地址
        Menu_Address: "",
        //菜单地址
        Button_Name: "",
        //是否启用
        Is_Activate:"",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000001",
            System_Key: "SystemSet"
        },
        childSearchModel: [
            {
            //子表关联主表的外键
            Field_Name: "S_Button.Menu_Id",
            //父表主键
            Parent_Key: "Menu_Id",
            //子表格id
            Child_List: 'ButtonList',
            //子表格查询地址
            Detail_Seach: 'DetailSeach',
            //默认显示在第3列
            Default_Child: "true"
            },
            {
                Field_Name: "S_Button.Menu_Id",
                Parent_Key: "Menu_Id",
                Child_List: 'ButtonList',
                Detail_Seach: 'DetailSeach',
                //默认显示在指定列
                Default_Child: "false"
            }
        ],
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //系统下拉框查询条件
         systemWhere: [],
        //系统下拉框排序
        systemOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //系统下拉框显示字段
        systemResult: ["System_Id", "System_Name"],
        //菜单分组下拉查询条件
         menuGroupWhere: [],
        //菜单分组排序条件
         menuGroupOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
         }],
        //菜单分组下拉显示字段
         menuGroupResult: ["Menu_Group_Id", "Menu_Group_Name"],
        //启用查询条件
         IsActiveDictionaryKey: "IS_ACTIVATE",
    },
    mounted: function () {
        var that = this;
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
        initcomplete: function (aoColumns, tableid,table ) {
            //console.log(tableid)
            //$('.dataTables_scrollHeadInner').css('position', 'relative');
            //var parentid = $('#' + tableid).closest('.table').attr('id');
            //$.each(aoColumns, function (i,item) {
            //    if (item.mData == 'Menu_Alias') {
            //        var btn = true;
            //        $(".addselect_Menu_Alias").on('click', function (event) {
            //            event.stopPropagation();
            //            if (btn) {
            //                var w = $(this).closest('th').innerWidth();
            //                var t = $(this).closest('th').position().top + 25;
            //                var l = $(this).closest('th').position().left + 10;
                           
            //                //$('<input id="search_Menu_Alias" style="position:absolute;width:' + (w - 20) + 'px;left:' + l + 'px;top:' + t + 'px;" type="text"/>').appendTo($('#' + parentid + ' .dataTables_scrollHeadInner'))
            //                $('#' + parentid + ' .dataTables_scrollHeadInner').append($("#temp_searchtext").html())
            //                $("#searchtext").attr("id", "searchtext_Menu_Alias");
            //                $('#searchtext_Menu_Alias').css({
            //                    'position': 'absolute',
            //                    'width': (w - 20)+'px',
            //                    'left': l+'px',
            //                    'top': t+'px',
            //                })
            //                //初始化VUE模板
            //                var cheld = new Vue({
            //                    el: "#searchtext_Menu_Alias",
            //                    data: {
            //                        vmodel: ''
            //                    }
            //                });
            //                $('.table thead th').css('padding', '6px 18px 38px 18px');
            //                $('.table thead tr').css('height', '60px');
            //                btn = false;
            //            } else {
            //                $("#searchtext_Menu_Alias").detach();
            //                $('.table thead th').css('padding', '6px 18px');
            //                $('.table thead tr').css('height', '31px');
            //                btn = true;
            //            }
            //            PageCommon.RefreshTablePage("MenuList");
            //        });
            //    }
            //})
        },
        //详细画面新增跳转
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        ///菜单删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("MenuList");
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("MenuList");  //刷新数据
                },
                close: true
            })
        },
        //详细画面更新跳转
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("MenuList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }

            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "keyValue=" + selectRow[0].Menu_Id);
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName:"S_Menu",
                systemKey: "SystemSet",
                vm: vmMenu
            })
        },
        //导入结果
        ImportResult: function (objectModel, objectModelList) {
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'S_Menu',
                menu_Id: 'M000001',
                list_Id: 'MenuList',
                systemKey: 'SystemSet',
                vm: vmMenu
            })
        },
        //禁用菜单
        Dissable: function () {
            //获取选中行
            var selectRow = PageCommon.GetTableSelectRow("MenuList");

            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }

            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index, obj) {
                if (obj.Is_Activate == "0") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 1;
                    newSelectRow.push(newobj);
                }
            });

            if (newSelectRow.length == 0) return;

            //调用提交数据
            PageCommon.SubmitForm({
                url: "UpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("MenuList");
                }
            });

        },
        //启用菜单
        Enable: function () {
            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("MenuList");

            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }

            //过滤数据
            var newSelectRow = [];
            $.each(selectRow, function (index,obj) {
                if (obj.Is_Activate == "1") {
                    var newobj = _.clone(obj);
                    newobj.Is_Activate = 0;
                    newSelectRow.push(newobj);
                }
            });


            if (newSelectRow.length == 0) return;

            //调用提交数据
            PageCommon.SubmitForm({
                url: "UpdateActivate",
                param: { objList: newSelectRow },
                success: function (data) {
                    PageCommon.RefreshTablePage("MenuList");
                }
            });
        },
        //设置条件
        Print: function () {

            //获取数据
            var selectRow = PageCommon.GetTableSelectRow("MenuList");

            //取得选择报表的数据
            if (selectRow.length === 0) {
                PageCommon.ShowMessageRight("E2009");
                return;
            }

            //取得选择的数据值
            var selectValueList = [];
            $.each(selectRow, function (index, obj) {
                selectValueList.push(obj.Menu_Id);
            });

            //报表数据取得
            PageCommon.ModalReportOpen({
                reportId: 'R0000001',
                selectValueList: selectValueList,
                searchModel:$("#searchForm").GetSearchModel()
               
            });
        },
        //设置条件
        Set: function () {
        },
        Search: function () {
            vmMenu.searchModel = $("#searchForm").GetSearchModel({
                Menu_Id: "M000001",
                List_Id: "MenuList"
            });
        },
        mClear: function () {
            //系统名称
            this.System_Name = "";
            //菜单分组名称
            this.Menu_Group_Name = "";
            //菜单名称
            this.Menu_Name = "";
            //菜单地址
            this.Menu_Address = "";
            //菜单地址
            this.Button_Name = "";
            //是否启用
            this.Is_Activate = "";
            $('#Menu_Group_Name').val(null).trigger('change');
            PageCommon.TableDefaultSort("MenuList");
        }
    }
});