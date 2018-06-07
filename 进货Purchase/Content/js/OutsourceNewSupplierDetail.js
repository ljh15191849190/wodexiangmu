var RequestValue = PageCommon.Request();
if (RequestValue.relevantnumber) {
    //判断传的参数的是2个还是1个
    var relevantnumber = RequestValue.relevantnumber;
    if (relevantnumber.indexOf(',') != -1) {
        relevantnumber = relevantnumber.split(",");
    } else {
        relevantnumber = [relevantnumber];
    }
} else if (RequestValue.Chackrelevantnumber) {
    //判断传的参数的是2个还是1个
    var Chackrelevantnumber = RequestValue.Chackrelevantnumber;
    if (Chackrelevantnumber.indexOf(',') != -1) {
        Chackrelevantnumber = Chackrelevantnumber.split(",");
    } else {
        Chackrelevantnumber = [Chackrelevantnumber];
    }
}
//判断是点击了保存按钮
if (RequestValue.save) {
    var save = RequestValue.save;
}
var Supplier_vue = new Vue({
    el: '#apps',
    data: {
        B_Supplier_Contacter_List: [],
        B_Supplier_Receiver_List: [],
        isdelete_img: false,
        formData: '',
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        B_Supplier: {
            //供应商类型
            Is_Purchase: '1',//统购0 外购1
            //供应商id
            Supplier_Id: "",
            //供应商名称
            Supplier_Name: "",
            //供应商查询代码
            Query_Code: "",
            //其他抬头
            Other_Name: "",
            //供应商网址
            Supplier_Website: "",
            //备注
            Remark: "",
            //总余额
            All_Balance: "0",
            //预付款
            Advance_Payment: "0",
            //贷款余额
            Goods_Payment_Balance: "0",
            //地址
            Supplier_Address: '',
            //详细地址
            Detail_Address: '',
            //地址编码集合
            Address_Code_Gather: '',
            //地址集合
            Address_Gather: '',
            //明细
            B_Supplier_Apply_List: [{
                ////备注
                //Remark: ""
            }],
            B_Supplier_Payway_List: [{
                //结算方式
                Payway: '02',
                //日结天数
                Pay_Day_Count: '',
                //月结月数
                Pay_Month_Count: '',
                //分段日
                Subsrction_Day: '',
                //超期日
                Extended_Day: ''
            }],
            B_Supplier_Bank_List: [{
                //开户银行
                Bank: '',
                //银行账号
                Bank_Account: '',
                //供应商税号
                Supplier_Tax_Number: ''
            }],
            B_Supplier_Contacter_List: [],
            B_Supplier_Receiver_List: [],
            Delete_File_Model_List: [],
        },
        addressCommon: {
            //收件人省份
            province: ' ',
            //收件人城市
            city: ' ',
            //收件人区/县
            district: ' ',
            Address: '',
            //收件人详细地址
            DetailAddress: '',
            //坐标
            point_lng: '',
            point_lat: '',
            //地址集合
            Address_Gather: ''
        },
        //联系人表头查询条件
        columContacterHeaderSeach: {
            Menu_Id: "M000017",
            System_Key: "Purchase",
            List_Id: ""
        },
        //收货人表头查询条件
        columReceiverHeaderSeach: {
            Menu_Id: "M000017",
            System_Key: "Purchase",
            List_Id: ""
        },
        //父供应商查询条件
        supplier: {
            Menuresult: ["Supplier_Id", "Supplier_Name"],
            filedSearch: ["Supplier_Id", "Supplier_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Supplier_Id", "Supplier_Name"]
        },
        //结算方式
        PaywayDictionaryKey: "PAY_WAY",
        //是否显示日结天数
        Day_Count: true,
        //是否显示月结天数
        Month_Count: true,
        //是否只读
        readonly: false,
        //是否遮罩
        isshade_bg: false,
        //表格是否可编辑
        isedittable: true,
        //是否显示金额框的加减
        money: true,
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
        //编辑表格id数组
        tableid: ['PurchaseProviderContacterList', 'PurchaseProviderReceiverList']
    },
    mounted: function () {
        var that = this;
        //控件拖动
        that.isdelete_img = true;;
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $('.drag_2').arrangeable({
            dragSelector: '.space'
        });
        $('.drag_3').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
        });
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
        $(".down_2").click(function () {
            $(this).find("i").toggleClass('rotate');
            $(".tile_body").toggle();
        })

        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    var addressArr = data.Address_Code_Gather.split('-');
                    that.addressCommon = {
                        Address: data.Address_Gather,
                        DetailAddress: data.Detail_Address,
                        province: addressArr[0],
                        city: addressArr[1],
                        district: addressArr[2],
                    }
                    that.B_Supplier_Contacter_List = data.B_Supplier_Contacter_List;
                    that.B_Supplier_Receiver_List = data.B_Supplier_Receiver_List;
                    //判断状态
                    PageCommon.EditStatus({
                        vm: that,
                        approvalstatus: data.Approval_Status
                    });

                    that.B_Supplier = data;
                    that.File_Model_List = data.File_Model_List;
                    //点击保存
                    PageCommon.Clickbtn(that, 'Save');

                    //如果是保存后加载的页面表格设为不可修改
                    if (save) {
                        that.isdelete_img = false;
                        that.isedittable = false;
                    }

                    if (RequestValue.sourcetype && RequestValue.sourcetype == 1) {
                        that.btnApproval = true;
                        that.btnBack = true;
                        that.btnSave = false;
                    }

                    if (that.B_Supplier.B_Supplier_Payway_List[0].Payway == '01') {
                        that.Day_Count = true;
                        that.Month_Count = false;
                    } else if (that.B_Supplier.B_Supplier_Payway_List[0].Payway == '02') {
                        that.Month_Count = true;
                        that.Day_Count = false;
                    }
                }
            });
        } else {
            that.Month_Count = true;
            that.Day_Count = false;
        }
        if (Chackrelevantnumber) {
            PageCommon.GetFormData({
                url: "ChackSeach",
                param: { keyValue: Chackrelevantnumber },
                success: function (data) {
                    that.B_Supplier = data.B_Supplier_Alter_History_List[0];
                    that.B_Supplier.B_Supplier_Payway_List = data.B_Supplier_Payway_Alter_History_List;
                    that.B_Supplier.B_Supplier_Bank_List = data.B_Supplier_Bank_Alter_History_List;
                    that.B_Supplier_Contacter_List = data.B_Supplier_Contacter_List;
                    that.B_Supplier_Receiver_List = data.B_Supplier_Receiver_List;

                    that.addressCommon.Address = that.B_Supplier.Address_Gather;
                    that.addressCommon.DetailAddress = that.B_Supplier.Detail_Address;
                    console.log(that.B_Supplier.Address_Code_Gather);
                    var addressArr = that.B_Supplier.Address_Code_Gather.split('-');
                    that.addressCommon.province = addressArr[0];
                    that.addressCommon.city = addressArr[1];
                    that.addressCommon.district = addressArr[2];
                    //判断状态
                    PageCommon.EditStatus({
                        vm: that,
                        approvalstatus: that.B_Supplier.Approval_Status
                    });
                    that.File_Model_List = data.File_Model_List;
                    //点击保存
                    PageCommon.Clickbtn(that, 'Save');

                    //如果是保存后加载的页面表格设为不可修改
                    if (save) {
                        //保存后图片不可删除和上传
                        that.isdelete_img = false;
                        that.isedittable = false;
                    }

                    if (RequestValue.sourcetype && RequestValue.sourcetype == 1) {
                        that.btnApproval = true;
                        that.btnBack = true;
                        that.btnSave = false;
                    }

                    if (that.B_Supplier.B_Supplier_Payway_List[0].Payway == '01') {
                        that.Day_Count = true;
                        that.Month_Count = false;
                    } else if (that.B_Supplier.B_Supplier_Payway_List[0].Payway == '02') {
                        that.Month_Count = true;
                        that.Day_Count = false;
                    }
                }
            });
        } else {
            that.Month_Count = true;
            that.Day_Count = false;
        }
    },
    methods: {
        backfd: function (fd, deletedata) {
            var that = this;
            if (deletedata) {
                that.FA_Accept_Bill_Apply.Delete_File_Model_List = deletedata;
            }
            that.formData = fd;
        },
        //查询代码
        onchange: function (val) {
            this.B_Supplier.Query_Code = val;
        },
        //结算方式返回函数
        ChangePayway: function (val) {
            if (val.id == '01') {
                Supplier_vue.Day_Count = true;
                Supplier_vue.Month_Count = false;
            } else if (val.id == '02') {
                Supplier_vue.Month_Count = true;
                Supplier_vue.Day_Count = false;
            } else {
                Supplier_vue.Month_Count = true;
                Supplier_vue.Day_Count = true;
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData) {
            if (Field_Name === "Is_Default_Name") {
                var html = "<span class=\"label  label-default\">否</span>";
                if (value == "") {
                    return html;
                } else {
                    return false;
                }
            }

            if (Field_Name === "Is_Default") {
                return '1';
            }
        },
        //编辑行回调
        rowEditCallback: function (cell, titleData, rowData) {
            var tdWidth = $(cell.node()).width();
            if (titleData.mData == "Name") {
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
            } else if (titleData.mData == "Department_Name") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Department_Name").html();
                $("#div_temp_Department_Name").attr("id", "div_temp_Department_Name_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Department_Name_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Department_Name_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Post_Code") {
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
            } else if (titleData.mData == "Telephone") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Telephone").html();
                $("#div_temp_Telephone").attr("id", "div_temp_Telephone_" + cell.index().row + "_" + cell.index().column);
                //初始化VUE模板
                var cheld = new Vue({
                    el: "#div_temp_Telephone_" + cell.index().row + "_" + cell.index().column,
                    data: {
                        vmodel: cell.data()
                    }
                });
                //设置控件在DataTables上
                var jqInputs = $('input', cell.node());
                $(jqInputs)[0].select();
                $(jqInputs).attr('id', "Telephone_" + cell.index().row + "_" + cell.index().column);
                $(".outer", cell.node()).width(tdWidth);
            } else if (titleData.mData == "Mobile_Phone") {
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
            } else if (titleData.mData == "Fax") {
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
            } else if (titleData.mData == "Qq") {
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
            } else if (titleData.mData == "Email") {
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
            } else if (titleData.mData == "Wechat") {
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
            } else if (titleData.mData == "Is_Default_Name") {
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
            } else if (titleData.mData == "Address_Gather") {
                //获取模板的html
                cell.node().innerHTML = $("#temp_Address").html();
                $("#div_temp_Address").attr("id", "div_temp_Address_" + cell.index().row + "_" + cell.index().column);

                //初始化VUE模板
                var cheld = new Vue({
                    el: '#div_temp_Address_' + cell.index().row + "_" + cell.index().column,
                    data: {
                        tableaddressCommon: {
                            //收件人省份
                            province: '',
                            //收件人城市
                            city: '',
                            //收件人区/县
                            district: '',
                            Address: cell.data(),
                            //收件人详细地址
                            DetailAddress: '',
                            //坐标
                            point_lng: '',
                            point_lat: ''
                        }
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
            } else if (titleData.mData == "Detail_Address") {
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
        },
        //行编辑失去焦点回调事件
        rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
            var ischeck = $(cell.node()).hasClass("render");
            if (ischeck) {
                $(cell.node()).removeClass("render");
            }
            if (titleData.mData == "Address_Gather") {
                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
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
                //修改第七列 隐藏列的值
                var cell_active = datatable.cell(':eq(' + ids + ')', 17, { search: 'applied' });
                cell_active.data($(jqInputs[0]).val());
                var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Default);
                //修改datatable 对应的值
                cell.data(value);
                if (value == '是') {
                    for (var i = 0; i < datatable.rows()[0].reverse().length ; i++) {
                        if (ids != i) {
                            var cell_index = datatable.cell(':eq(' + i + ')', cell.index().column, { search: 'applied' });
                            var cell_active2 = datatable.cell(':eq(' + i + ')', 17, { search: 'applied' });
                            cell_active2.data("1");
                            cell_index.data("否");
                        }

                    }
                }
            } else {
                var jqInputs = $('input', cell.node());
                //验证数据
                if (!PageCommon.CheckPageDetialInputBlur($(jqInputs), datatable) && ischeck) {
                    cell.focus();
                } else {
                    //修改datatable 对应的值
                    cell.data($(jqInputs[0]).val());
                }
            }
        },
        //保存
        Save: function () {
            $(".down_tab").find("i").removeClass('rotate');
            $(".down_tab").parent().next().show();
            $(".down_tab").parent().removeClass("boder");
            $('#PurchaseProviderContacterList').DataTable().cell.blur();
            $('#PurchaseProviderReceiverList').DataTable().cell.blur();
            PageCommon.CheckDataTables({
                tableId: "PurchaseProviderContacterList",
                Key: "Name",
                columns: [
                    {
                        columnName: "Name",
                        CheckEmpty: true,
                        CheckLength: '30'
                    },
                     {
                         columnName: "Department_Name",
                         CheckLength: '30'
                     },
                    {
                        columnName: "Post_Code",
                        CheckLength: '6'
                    },
                    {
                        columnName: "Telephone",
                        CheckTelephone: true,
                        CheckEmptyOneBetweenTwo: true,
                        RelationControl: "Mobile_Phone"
                    },
                    {
                        columnName: "Mobile_Phone",
                        CheckMobilPhone: true
                    },
                    {
                        columnName: "Fax",
                        CheckLength: '15'
                    },
                    {
                        columnName: "Qq",
                        CheckLength: '15'
                    },
                    {
                        columnName: "Email",
                        CheckLength: '50'
                    },
                    {
                        columnName: "Wechat",
                        CheckLength: '30'
                    },
                    {
                        columnName: "Address_Gather",
                    },
                    {
                        columnName: "Is_Default_Name",
                    }
                ]
            });
            PageCommon.CheckDataTables({
                tableId: "PurchaseProviderReceiverList",
                Key: "Name",
                columns: [
                    {
                        columnName: "Name",
                        CheckEmpty: true,
                        CheckLength: '30'
                    },
                     {
                         columnName: "Department_Name",
                         CheckLength: '30'
                     },
                    {
                        columnName: "Post_Code",
                        CheckLength: '6'
                    },
                    {
                        columnName: "Telephone",
                        CheckTelephone: true,
                        CheckEmptyOneBetweenTwo: true,
                        RelationControl: "Mobile_Phone"
                    },
                    {
                        columnName: "Mobile_Phone",
                        CheckMobilPhone: true,
                    },
                    {
                        columnName: "Fax",
                        CheckLength: '15'
                    },
                    {
                        columnName: "Qq",
                        CheckLength: '15'
                    },
                    {
                        columnName: "Email",
                        CheckLength: '50'
                    },
                    {
                        columnName: "Wechat",
                        CheckLength: '30'
                    },
                    {
                        columnName: "Address_Gather",
                        CheckEmpty: true,
                    },
                    {
                        columnName: "Is_Default_Name",
                    }
                ]
            });
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var vm = this;
            //获取联系人数据
            var contacterdata = PageCommon.GetDataTableData("PurchaseProviderContacterList");
            vm.B_Supplier.B_Supplier_Contacter_List = [];
            //组织明细数据 过滤空行
            $.each(contacterdata, function (index, item) {
                if (item.Name != "") {
                    var addressArrDetailRec = item.Address_Gather.split('-');
                    var addressDetailRec = '';
                    for (var i = 0; i < addressArrDetailRec.length; i++) {
                        addressDetailRec += addressArrDetailRec[i];
                    }
                    if (item.Telephone != "" || item.Mobile_Phone != "") {
                        var obj = {};
                        obj.Name = item.Name;
                        obj.Department_Name = item.Department_Name;
                        obj.Post_Code = item.Post_Code;
                        obj.Telephone = item.Telephone;
                        obj.Mobile_Phone = item.Mobile_Phone;
                        obj.Fax = item.Fax;
                        obj.Qq = item.Qq;
                        obj.Email = item.Email;
                        obj.Wechat = item.Wechat;
                        obj.Is_Default = item.Is_Default == "" ? 1 : item.Is_Default;
                        obj.Is_Default_Name = obj.Is_Default == "0" ? "是" : "否";
                        obj.Address = addressDetailRec + item.Detail_Address;
                        obj.Detail_Address = item.Detail_Address;
                        obj.Address_Gather = item.Address_Gather;
                        vm.B_Supplier.B_Supplier_Contacter_List.push(obj);
                    }
                }
            });
            //获取联系人数据
            var receiverdata = PageCommon.GetDataTableData("PurchaseProviderReceiverList");
            vm.B_Supplier.B_Supplier_Receiver_List = [];
            //组织明细数据 过滤空行
            $.each(receiverdata, function (index, item) {
                if (item.Name != "" && item.Address_Gather != "") {
                    var addressArrDetailCon = item.Address_Gather.split('-');
                    var addressDetailCon = '';
                    for (var i = 0; i < addressArrDetailCon.length; i++) {
                        addressDetailCon += addressArrDetailCon[i];
                    }
                    if (item.Telephone != "" || item.Mobile_Phone != "") {
                        var obj = {};
                        obj.Name = item.Name;
                        obj.Department_Name = item.Department_Name;
                        obj.Post_Code = item.Post_Code;
                        obj.Telephone = item.Telephone;
                        obj.Mobile_Phone = item.Mobile_Phone;
                        obj.Fax = item.Fax;
                        obj.Qq = item.Qq;
                        obj.Email = item.Email;
                        obj.Wechat = item.Wechat;
                        obj.Detail_Address = item.Detail_Address;
                        obj.Is_Default = item.Is_Default == "" ? 1 : item.Is_Default;
                        obj.Is_Default_Name = obj.Is_Default == "0" ? "是" : "否";
                        obj.Address = addressDetailCon + item.Detail_Address;
                        obj.Detail_Address = item.Detail_Address;
                        obj.Address_Gather = item.Address_Gather;
                        vm.B_Supplier.B_Supplier_Receiver_List.push(obj);
                    }
                }
            });
            //判断联系人和收货人是否录入
            if (vm.B_Supplier.B_Supplier_Contacter_List.length < 1 || vm.B_Supplier.B_Supplier_Receiver_List.length < 1) {
                PageCommon.WebFormMessage({
                    msgcode: "I3049",
                    success: function () {
                        //提交数据到后台
                        vm.ConfirmSave();
                    }
                })
            } else {
                vm.ConfirmSave();
            }
        },
        ConfirmSave: function () {
            var vm = this;
            var addressArr = vm.addressCommon.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            vm.B_Supplier.Supplier_Address = address + vm.addressCommon.DetailAddress;
            vm.B_Supplier.Detail_Address = vm.addressCommon.DetailAddress;
            vm.B_Supplier.Address_Code_Gather = vm.addressCommon.province + '-' + vm.addressCommon.city + '-' + vm.addressCommon.district;
            vm.B_Supplier.Address_Gather = vm.addressCommon.Address;
            vm.formData.delete('supplier');
            var data = JSON.stringify(vm.B_Supplier);
            vm.formData.append('supplier', data);
            PageCommon.SubmitForm({
                url: "SaveSupplier",
                //param: { supplier: vm.B_Supplier },
                param: vm.formData,
                type: '2',
                success: function (data) {
                    //保存后根据返回值加载页面
                    var relevantnumber = data.Result_Model.Supplier_Id + ',' + data.Result_Model.B_Supplier_Apply_List[0].Apply_Bill_Id;
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + relevantnumber + '&save=1');//SourceType：列表0、审核1、提醒2   IsModfiy：0可修改 1不可修改
                }
            });
        },
        Edit: function () {
            var vm = this;
            //点击编辑按钮
            PageCommon.Clickbtn(vm, 'Edit');
            vm.isdelete_img = true;
            vm.isedittable = true;
        },
        //提交
        Submit: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "SubmitSupplier"
             , param: { supplier: vm.B_Supplier },
                success: function (data) {
                    //点击提交按钮
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        //审核
        Approval: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "ApprovalSupplier"
             , param: { supplier: vm.B_Supplier }
            });
        },
        //审批意见
        ApprovalOpinion: function () {
            //PageCommon.ModalOpen({
            //    id: "SupplierInfo",
            //    title: '供应商资料',
            //    width: "900px",
            //    height: "600px",
            //    btn: [],
            //    url: '/Purchase/PurchaseSupplierSearch/SupplierInfo',
            //    callBack: function (iframeId) {
            //        PageCommon.ChildrenFrames(iframeId).vmImport.Import();
            //    }
            //})
        },
        //设置
        Set: function () {
            //$.ajax({
            //    url: "/SystemSet/SystemNotice/SeeDetail",
            //    data: {},
            //    type: "post",
            //    dataType: "json",
            //    //async:false,
            //    success: function (data) {

            //    }
            //});
            //PageCommon.Reload();
        },
        //父供应商返回函数
        TemplateSelection: function (data) {
            this.B_Supplier.Supplier_Id = data.id;
        },
        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge("List", vm);
        }
    }
});