//寄票信息主键

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
var SendInvoice_vue = new Vue({
    el: '#apps',
    data: {
        C_Customer: {
            //客户名称
            Customer_Id: '',
            //寄票信息
            C_Send_Invoice_List: '',

        },
        //寄票信息表头查询条件
        columHeaderSeach01: {
            Menu_Id: "M000003",
            System_Key: "CustomerRelations",
            List_Id: "SendInvoiceListEdit"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {
            Where_Parameter_List: [{
                Field_Name: "C_Customer_Send_Invoice.Customer_Id",
                Query_Type: "01",
                Expression: "02",
                Condition_Value1: "-1",
                Contorl_Id: "Customer_Id"
            }]
        },
        //寄票信息表头查询条件
        columHeaderSeach02: {
            Menu_Id: "M000003",
            System_Key: "CustomerRelations",
            List_Id: "HistorySendInvoiceList"
        },
        //是否只读
        readonly: false,
        //是否遮罩
        isshade_bg: false,
        //表格是否可编辑
        isedittable: true,
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
        //是否编辑
        IsEdit: 0,
        //编辑表格id
        tableid: ['SendInvoiceListEdit'],
        EditTable: true,
        //判断是否有客户id
        customerCheck: true
    },
    mounted: function () {
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $('.form-group').arrangeable({
            dragSelector: '.shade_Bg'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

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
            vm.C_Customer.Customer_Id = relevantnumber[0];
            //判断状态
            PageCommon.EditStatus({
                vm: vm,
                lookCallBack: function () {
                    vm.EditTable = false;
                },
            });
        }

    },
    methods: {

        //客户选择
        TemplateCustomer: function (data) {
            var vm = this;
            if (data) {
                if (relevantnumber) {
                    if (vm.customerCheck) {
                        vm.customerCheck = false;
                        return;
                    }
                }
                vm.searchModel = {
                    Where_Parameter_List: [{
                        Field_Name: "C_Customer_Send_Invoice.Customer_Id",
                        Query_Type: "01",
                        Expression: "02",
                        Condition_Value1: data.Customer_Id,
                        Contorl_Id: "Customer_Id"
                    }],
                   
                }
            } else {
                vm.searchModel = {
                    Where_Parameter_List: [{
                        Field_Name: "C_Customer_Send_Invoice.Customer_Id",
                        Query_Type: "01",
                        Expression: "02",
                        Condition_Value1: "-1",
                        Contorl_Id: "Customer_Id"
                    }]
                }
            }
        },
        initcomplete: function () {
            if (relevantnumber) {
                this.searchModel = {
                    Where_Parameter_List: [{
                        Field_Name: "C_Customer_Send_Invoice.Customer_Id",
                        Query_Type: "01",
                        Expression: "02",
                        Condition_Value1: relevantnumber[0],
                        Contorl_Id: "Customer_Id"
                    }],
                   
                }
            }

        },
        //审核意见
        mApproval: function () {

        },
        //审核
        mReviewed: function () {

        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Is_Default_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }

            if (Field_Name === "Is_Default") {
                return '0';
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
            else if (titleData.mData == "Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Name").html();
                $("#div_temp_Name").attr("id", "div_temp_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Apply_Reason") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Apply_Reason").html();

                $("#div_temp_Apply_Reason").attr("id", "div_temp_Apply_Reason_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Apply_Reason_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });

                //设置控件在DataTables上
                var jqInputs = $('textarea', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Apply_Reason_" + cell.index().row + "_" + cell.index().column);
                $(".outer-lg", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Position") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Position").html();
                $("#div_temp_Position").attr("id", "div_temp_Position_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Position_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Position_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Post_Code") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Post_Code").html();
                $("#div_temp_Post_Code").attr("id", "div_temp_Post_Code_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Post_Code_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Post_Code_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Tel") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Tel").html();
                $("#div_temp_Tel").attr("id", "div_temp_Tel_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Tel_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Tel_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Mobile_Phone") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Mobile_Phone").html();
                $("#div_temp_Mobile_Phone").attr("id", "div_temp_Mobile_Phone_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Mobile_Phone_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Mobile_Phone_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Fax") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Fax").html();
                $("#div_temp_Fax").attr("id", "div_temp_Fax_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Fax_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Fax_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Qq") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Qq").html();
                $("#div_temp_Qq").attr("id", "div_temp_Qq_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Qq_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Qq_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Email") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Email").html();
                $("#div_temp_Email").attr("id", "div_temp_Email_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Email_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Email_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Wechat") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Wechat").html();
                $("#div_temp_Wechat").attr("id", "div_temp_Wechat_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Wechat_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Wechat_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Detail_Address") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Detail_Address").html();
                $("#div_temp_Detail_Address").attr("id", "div_temp_Detail_Address_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Detail_Address_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Detail_Address_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Address_Gather") {

                //获取模板的html
                cell.node().innerHTML = $("#temp_Address_Gather").html();
                $("#div_temp_Address_Gather").attr("id", "div_temp_Address_Gather_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Address_Gather_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        SendaddressCommon: {
                            //收件人省份
                            province: '',
                            //收件人城市
                            city: '',
                            //收件人区/县
                            district: '',
                            //Send_Invoice_Address: cell.data(),
                            Address: cell.data(),
                            //坐标
                            point_lng: '',
                            point_lat: ''
                        },

                    },
                    methods: {
                        backdata: function (data) {
                            var index = _.findLastIndex(cell.settings()[0].aoColumns, { mData: 'Address_Code_Gather' });
                            var cell_active = cell.cell(':eq(' + cell.index().row + ')', index, { search: 'applied' });

                            cell_active.data(data.province + '-' + data.city + '-' + data.district);
                        }
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Address_Gather_" + cell.index().row + "_" + cell.index().column);
                $(".outer-lg", cell.node()).width(tdWidth);
            }
            else if (titleData.mData == "Is_Default_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Is_Default").html();
                $("#div_temp_Is_Default").attr("id", "div_temp_Is_Default_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Is_Default_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        Is_Default: cell.data() == '是' ? '0' : '1'
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

            }
            if (titleData.mData == "Apply_Reason") {
                var jqInputs = $('textarea', cell.node());

                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
                    $(jqInputs).focus();
                    return;
                }
                //修改datatable 对应的值
                cell.data($(jqInputs[0]).val());

            }
            if (titleData.mData == "Address_Gather") {
                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }

            }
            if (titleData.mData == "Is_Default_Name") {
                //取得行号
                var jqInputs = $('input', cell.node());
                var ids = cell.index().row;

                //隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 15, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Default);

                //修改datatable 对应的值
                cell.data(value);

                if (value == '是') {
                    for (var i = 0; i < datatable.rows()[0].reverse().length ; i++) {
                        if (ids != i) {
                            var cell_index = datatable.cell(':eq(' + i + ')', cell.index().column, { search: 'applied' });
                            var cell_active2 = datatable.cell(':eq(' + i + ')', 15, { search: 'applied' });
                            cell_active2.data("1");
                            cell_index.data("否");
                        }

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
                }

            }

        },
        //保存菜单画面数据
        Save: function () {
            $(".BasicInformation").slideDown(500);
            $(".title1").removeClass("boder");
            $(".down_tab").removeClass("rotate");

            PageCommon.CheckDataTables({
                tableId: "SendInvoiceListEdit",
                Key: "Name",
                columns: [
                    {
                        columnName: "Name",
                        CheckLength: '30'
                    },
                      {
                          columnName: "Post_Code",
                          CheckLength: '6',

                      }, {
                          columnName: "Tel",
                          CheckTelephone: true,

                      }, {
                          columnName: "Mobile_Phone",
                          CheckMobilPhone: true,
                          CheckLength: '15'
                      },
                      {
                          columnName: "Detail_Address",

                          CheckLength: '300'
                      }
                ],



            });
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }

            //获取grid数据
            var data = PageCommon.GetDataTableData("SendInvoiceListEdit");
            SendInvoice_vue.C_Customer.C_Send_Invoice_List = [];

            //组织明细数据 过滤空行
            $.each(data, function (index, item) {

                if (item.Name != "" && item.Address_Gather != "") {
                    var addressArrDetailCon = item.Address_Gather.split('-');
                    var addressDetailCon = '';
                    for (var i = 0; i < addressArrDetailCon.length; i++) {
                        addressDetailCon += addressArrDetailCon[i];
                    }
                    var obj = {};
                    for (var key in item) {
                        var keyTypes = typeof item[key];

                        if (keyTypes != 'object' && keyTypes != 'function') {
                            obj[key] = item[key];
                        }
                    }

                    if (obj.Name != "") {
                        obj.Send_Invoice_Address = addressDetailCon + item.Detail_Address;
                        obj.Detail_Address = item.Detail_Address;
                        obj.Address_Gather = item.Address_Gather;
                        obj.Address_Code_Gather = item.Address_Code_Gather;
                        SendInvoice_vue.C_Customer.C_Send_Invoice_List.push(obj);
                    }

                }
            });

            //验证至少输入一条明细
            if (!SendInvoice_vue.C_Customer.C_Send_Invoice_List.length > 0) {

                PageCommon.ShowMessageArrayRight("E2027", new Array("1"));
                PageCommon.Loading(false);
                return;
            }
            //提交数据到后台
            PageCommon.SubmitForm({
                url: "Save"
             , param: { customer: SendInvoice_vue.C_Customer }
             , success: function () {
                 //判断新增还是修改
                 if (!!!relevantnumber) {
                     SendInvoice_vue.C_Customer = "";
                     PageCommon.Reload();
                 } else {
                     window.location.href = PageCommon.SetUrl("List");
                 }
             }
            });
        },

        //设置
        Set: function () {

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
             , param: { customer: SendInvoice_vue.C_Customer },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //返回列表画面
        Back: function () {
            PageCommon.BackFormMessge('List');
        },

    }
});