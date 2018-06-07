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
var customer_vue = new Vue({
    el: '#apps',
    data: {
        isdelete_img: true,
        formData: '',
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        C_Customer_Apply: {
            Customer: {
                Customer_Name: '',
                //客户名称
                Customer_Id: '',
                //父客户名称
                Parent_Customer_Id: null,
                //其他抬头
                Other_Customer_Name: '',
                //任务人
                Employee_Id: '',
                //人工勾兑方式
                Is_Labour_Blend_Pay: '',
                //合同签订方式
                Contract_Sign_Way: '',
                //企业化方式
                Enterprise_Way: '',
                //送货单签收方式
                Send_Goods_Bill_Sign_Way: '',
                //合同类型
                Contract_Type: '',
                //获取途径
                Get_Way_Id: '',
                //客户类型
                Customer_Type: '',
                //行业
                Industry_Id: '',
                Industry_Id2: '',
                //企业性质
                Enterprise_Property: '',
                //主营产品
                Major_Manage_Product: '',
                //客户重要度
                Customer_Importance: '',
                //客户年用量
                Customer_Annual_Consumption: '',
                //公司主页
                Customer_WebSite: '',
                //应用行业
                Application_Industry: '',
                //原供应商
                Old_Supplier: '',
                //备注
                Remark: '',
                //营业执照
                // Business_License:'',
                //机构代码
                // Organization_Code:'',
                //基本情况
                // Base_Case: '',
                //超期天数
                Overdue_Days: '',
                //订单下达方式
                Order_Transmit_Way: '',
                //订单下达方式
                Order_Transmit_Way: '',
                //平台系统网址
                Platform_System_Website: '',
                //合同版本
                Contract_Version: '',
                //订单版本
                Order_Version: '',
                //送货单版本
                Send_Goods_Bill_Version: '',
                //送货单项目
                Send_Goods_Bill_Item: '',
                //送货单其他内容
                Send_Goods_Other_Content: '',
                //送货单张数
                Send_Goods_Bill_Count: '',
                //凭送货单签收
                Is_SG_Bill_Receipt_Money: '',
                First_Sale_Date: ''
            },
            //联系人信息
            C_Contacts_List: [{
                //联系人
                Name: '',
                //联系电话
                Telephone: '',
                //传真
                Fax: '',
                //手机
                Mobile_Phone: '',
                //QQ
                Qq: '',
            }],
            //信用额度信息
            C_Payway_List: [{
                //账期方式
                Account_Period_Way: '',
                //超期时间段
                Overdue_Period: '',
                //信用额度
                Credit_Name: '',
                //结算方式
                Payway: '01',
                //日结天数
                Pay_Day_Count: '',
                //月结天数
                Pay_Month_Count: '',
                //分段日
                Subsrction_Day: '',
                //超期日
                Extended_Day: '',
            }],
            // 开票信息
            C_Invoice_List: [{
                //开票名称
                Invoice_Name: '',
                //税号
                Taxpayer_Id: '',
                //开票电话
                Tel: '',
                //开票银行
                Bank: '',
                //账号
                Account: '',
                //申请理由
                Apply_Reason: ''
            }],
            //寄票信息
            //C_Send_Invoice_List: [],
            //收货人信息
            //C_Receiver_List: [],
            //联系人信息
            //C_Contacts_List: [],
            /// 客户产品分类
            C_Product_CLassify_List: [],
            /// 客户事业部
            C_Business_Department_List: [],

            Apply_Bill_Id: '',
            Customer_Id: '',
            Approval_Status: '',
            Remark: '',
            Is_Delete: 0,
            Delete_File_Model_List: []
        },
        //客户地址
        Customer_Address: {
            //客户地址省份
            province: ' ',
            //客户地址城市
            city: ' ',
            //客户地址区/县
            district: ' ',
            Address: '',
            //客户地址详细地址
            DetailAddress: '',
            point_lng: '',
            point_lat: ''
        },
        //开票地址
        BillingCommon: {
            //开票地址省份
            province: ' ',
            //开票地址城市
            city: ' ',
            //开票地址区/县
            district: ' ',
            Address: '',
            //开票地址详细地址
            DetailAddress: '',
            point_lng: '',
            point_lat: ''
        },

        Industryresult: ["Industry_Id", "Industry_Name", "Industry_Short_Name", "Parent_Industry_Id", "Customer_Type"],
        IndustryfiledSearch: ["Industry_Id", "Industry_Name", "Industry_Short_Name", "Parent_Industry_Id", "Customer_Type"],
        IndustryinputField: ["Industry_Id", "Industry_Name"],
        IndustryWhere: [
        {
            Condition_Value1: "",
            Expression: "02",
            Field_Name: "Industry_Id2",
            Query_Type: "01"
        }
        ],
        GetWayresult: ["Get_Way_Id", "Get_Way_Name"],
        GetWayfiledSearch: ["Get_Way_Id", "Get_Way_Name"],
        GetWayinputField: ["Get_Way_Id", "Get_Way_Name"],

        //事业部查询条件
        Business_DepartmentWhere: [],
        //事业部排序
        Business_DepartmentOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //事业部显示字段
        Business_DepartmentResult: ["Business_Department_Id", "Business_Department_Name"],
        //产品分类查询条件
        Product_ClassifyWhere: [{
            Field_Name: 'Parent_Product_Classify_Id',
            Expression: "03",
            Value1: ""
        }],
        //产品分类排序
        Product_ClassifyOrder: [{
            Field_Name: "Show_Order",
            Orderby: "ASC"
        }],
        //产品分类显示字段
        Product_ClassifyResult: ["Product_Classify_Id", "Product_Classify_Name"],
        //联系人信息表头查询条件
        columHeaderSeach01: {
            Menu_Id: "M000001",
            System_Key: "CustomerRelations",
            List_Id: ""
        },
        //收货人信息表头查询条件
        columHeaderSeach02: {
            Menu_Id: "M000002",
            System_Key: "CustomerRelations",
            List_Id: ""
        },
        //寄票信息表头查询条件
        columHeaderSeach03: {
            Menu_Id: "M000003",
            System_Key: "CustomerRelations",
            List_Id: ""
        },
        Customereresult: ["Customer_Id", "Customer_Name"],
        CustomereFiledSearch: ["Customer_Id", "Customer_Name"],
        Employeeresult: ["Employee_Id", "Name"],
        EmployeFiledSearch: ["Employee_Id", "Name"],
        EmployeInputField: ["Employee_Id", "Name"],
        CustomereInputField: ["Customer_Id", "Customer_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //送货其他内容是否可以编辑
        SendContent: "true",
        //送货单其他内容验证
        checkempty: '',
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
        //是否显示日结天数
        Day_Count: true,
        //是否显示月结天数
        Month_Count: false,
        //是否触发checkBox组件选择事件
        IsCheckEvent: false,
        IsCheckEvent2: false,
        //是否触发checkBox组件选择事件
        IsCheckBusiness: true,
        IsCheckClassify: true,
        //选择产品分类返回的事业部数据
        linkBusiness: [],
        //选择事业部返回的产品分类数据
        linkClassify: [],
    },

    mounted: function () {

        //控件拖动
        $('.ContractInformation').arrangeable({
            dragSelector: '.space'
        });
        $('.EdInformation').arrangeable({
            dragSelector: '.space'
        });
        $('.NameInformation').arrangeable({
            dragSelector: '.space'
        });
        $('.ClassInformation').arrangeable({
            dragSelector: '.space'
        });
        $('.SendInformation').arrangeable({
            dragSelector: '.space'
        });
        $('.InvoiceInformation').arrangeable({
            dragSelector: '.space'
        });
        $('.form-group').arrangeable({
            dragSelector: '.shade_bg'
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
        //var value = PageCommon.GetDictionarry("IS_ACTIVATE");
        //customer_vue.Customer.C_Payway_List[0].Overdue_Period = value;
        //var $this = this;
        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    if (data.C_Invoice_List.length == 0) {
                        data.C_Invoice_List = vm.C_Customer_Apply.C_Invoice_List;
                    }
                    vm.File_Model_List = data.File_Model_List;
                    //客户地址回传
                    var addressArr = data.Customer.Address_Code_Gather.split('-');
                    vm.Customer_Address = {
                        Address: data.Customer.Address_Gather,
                        DetailAddress: data.Customer.Detail_Address,
                        province: addressArr[0],
                        city: addressArr[1],
                        district: addressArr[2]
                    }
                    //开票地址回传
                    //if (data.C_Invoice_List[0]) {
                    //    vm.BillingCommon.Address = data.C_Invoice_List[0].Address;
                    //    vm.BillingCommon.DetailAddress = data.C_Invoice_List[0].Detail_Address;
                    //}


                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        approvalstatus: data.Approval_Status
                    });

                    //if (!data.C_Invoice_List[0]) {
                    //    data.C_Invoice_List = vm.C_Customer_Apply.C_Invoice_List;
                    //}

                    //if (!data.C_Payway_List[0]) {
                    //    data.C_Payway_List = vm.C_Customer_Apply.C_Payway_List;
                    //}
                    //if (!data.C_Contacter_List[0]) {
                    //    data.C_Contacter_List = vm.C_Customer_Apply.C_Contacter_List;
                    //}

                    vm.C_Customer_Apply = data;
                    vm.linkBusiness = data.C_Business_Department_List;
                    //选择事业部返回的产品分类数据
                    vm.linkClassify = data.C_Product_CLassify_List;
                    PageCommon.Clickbtn(vm, 'Save');
                    //如果是保存后加载的页面表格设为不可修改
                    if (save) {
                        //保存后图片不可删除和上传
                        vm.isdelete_img = false;

                        vm.isedittable = false;
                    }
                }
            });
        }
        //else {
        //    vm.C_Customer_Apply.C_Contacts_List = [{
        //        "Is_Default_Contacter_Name": "",
        //        "Customer_Id": "",
        //        "Detail_Number": 1,
        //        "Name": "未知",
        //        "Position": "",
        //        "Department_Name": "",
        //        "Post_Code": "",
        //        "Birthday": null,
        //        "Telephone": "",
        //        "Fax": "",
        //        "Mobile_Phone": "",
        //        "Qq": "",
        //        "Email": "",
        //        "Wechat": "",
        //        "Address": null,
        //        "Detail_Address": "",
        //        "Address_Code_Gather": null,
        //        "Address_Gather": null,
        //        "Remark": "",
        //        "Is_Default_Contacter": "是",
        //        "Is_Delete": "0",
        //        "Create_Time": "",
        //        "Create_User": "",
        //        "Update_Time": "",
        //        "Update_User": ""
        //    }]
        //}
    },
    methods: {
        backBusiness: function (data) {
            var vm = this;
            if (relevantnumber) {
                if (!this.IsCheckEvent) {
                    this.IsCheckEvent = true;
                    return;
                }
            }

            if (!customer_vue.IsCheckBusiness) {
                customer_vue.IsCheckBusiness = true;
                return;
            }
            if (data.length > 0) {
                var mainWhere = [];
                var valueArry = [];
                for (var i = 0; i < data.length; i++) {
                    valueArry.push(data[i].Business_Department_Id);
                }

                var obj = {
                    Field_Name: "Business_Department_Id",
                    Value1: valueArry.toString(),
                    Expression: "06"
                };

                mainWhere.push(obj);

                var tableSearch = {
                    tableName: "B_Business_Department_Pc",
                    systemKey: "BasicData",
                    mainWhere: mainWhere,
                    filedSeach: ["Product_Classify_Id"],
                    success: function (data) {
                        vm.linkClassify = data;
                    }
                };
                PageCommon.GetSeachTableData(tableSearch);
            } else {
                vm.linkClassify = [];
            }
            vm.IsCheckClassify = false;
        },
        backClassify: function (data) {
            var vm = this;
            if (relevantnumber) {
                if (!this.IsCheckEvent2) {
                    this.IsCheckEvent2 = true;
                    return;
                }
            }

            if (!customer_vue.IsCheckClassify) {
                customer_vue.IsCheckClassify = true;
                return;
            }
            if (data.length > 0) {
                var mainWhere = [];
                var valueArry = [];
                for (var i = 0; i < data.length; i++) {
                    valueArry.push(data[i].Product_Classify_Id);
                }
                var obj = {
                    Field_Name: "Product_Classify_Id",
                    Value1: valueArry.toString(),
                    Expression: "06"
                };

                mainWhere.push(obj);
                var tableSearch = {
                    tableName: "B_Business_Department_Pc",
                    systemKey: "BasicData",
                    mainWhere: mainWhere,
                    filedSeach: ["Business_Department_Id"],
                    success: function (data) {
                        vm.linkBusiness = data;
                    }
                };
                PageCommon.GetSeachTableData(tableSearch);
            } else {
                vm.linkBusiness = [];
            }
            vm.IsCheckBusiness = false;
        },
        //行业选择
        TemplateIndustry: function (data) {
            
            if (data) {
                customer_vue.C_Customer_Apply.Customer.Industry_Id2 = data.Parent_Industry_Id;
                customer_vue.C_Customer_Apply.Customer.Customer_Type = data.Customer_Type;
            } else {
                customer_vue.C_Customer_Apply.Customer.Industry_Id2 = '';
                customer_vue.C_Customer_Apply.Customer.Customer_Type = '';
            }
        },
        //结算方式
        PayWayChange: function (val) {
            var vm=this;
            if (val.id == '01') {
                vm.Day_Count = true;
                vm.Month_Count = false;
            } else if (val.id == '02') {
                vm.Month_Count = true;
                vm.Day_Count = false;
            } else {
                vm.Month_Count = true;
                vm.Day_Count = true;
            }
        },
        //选择账期方式
        ChangeAccount: function (val) {
            if (val.id == "01") {
                $(".Date").show();

            } else if (val.id == "02") {
                $(".Date").hide();
            }

        },
        //选择合同签订方式
        ContracWaytChange: function (val) {
            if (val.id == "01") {
                $(".OrderWay").show();
            } else {
                $(".OrderWay").hide();
            }
        },
        //选择订单签收方式
        OrderWayChange: function (val) {
            if (val.id == "04") {
                $(".SystemWeb").show();
            } else {
                $(".SystemWeb").hide();
            }
        },
        //选择送货单版本
        SendOrderChange: function (val) {
            if (val.id == "02") {
                $(".SendOrder").show();
                this.SendContent = false;
            } else {
                $(".SendOrder").hide();
                this.SendContent = true;
            }
        },
        //选择送货单项目
        SendObjectChange: function (val) {
            if (val.id == "05") {
                this.checkempty = true;
            } else {
                this.checkempty = false;
            }

        },
        //行初始化事件
        //columrender: function (Field_Name, value, type, rowData, rowSetting) {
        //    if (Field_Name === "Is_Default_Contacter_Name") {
        //        var html = "<span class=\"label  label-default\">否</span>";
        //        if (value == "") {
        //            return html;
        //        } else {
        //            return false;
        //        }
        //    }
        //    if (Field_Name === "Is_Default_Receiver_Name") {
        //        var html = "<span class=\"label  label-default\">否</span>";
        //        if (value == "") {
        //            return html;
        //        } else {
        //            return false;
        //        }
        //    }
        //    if (Field_Name === "Is_Default_Name") {
        //        var html = "<span class=\"label  label-default\">否</span>";
        //        if (value == "") {
        //            return html;
        //        } else {
        //            return false;
        //        }
        //    }


        //    if (Field_Name === "Is_Default_Contacter") {
        //        return '0';
        //    }
        //    if (Field_Name === "Is_Default_Receiver") {
        //        return '0';
        //    }
        //    if (Field_Name === "Is_Default") {
        //        return '0';
        //    }

        //},
        //编辑行回调
        //rowEditCallback: function (cell, titleData, rowData) {
        //    var tdWidth = $(cell.node()).width();
        //    if (titleData.mData == "Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Name").html();
        //        $("#div_temp_Name").attr("id", "div_temp_Name_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Name_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Name_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Remark") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Remark").html();

        //        $("#div_temp_Remark").attr("id", "div_temp_Remark_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Remark_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });

        //        //设置控件在DataTables上
        //        var jqInputs = $('textarea', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Remark_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer-lg", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Apply_Reason") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Apply_Reason").html();

        //        $("#div_temp_Apply_Reason").attr("id", "div_temp_Apply_Reason_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Apply_Reason_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });

        //        //设置控件在DataTables上
        //        var jqInputs = $('textarea', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Apply_Reason_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer-lg", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Position") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Position").html();
        //        $("#div_temp_Position").attr("id", "div_temp_Position_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Position_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Position_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Receiver_Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Receiver_Name").html();
        //        $("#div_temp_Receiver_Name").attr("id", "div_temp_Receiver_Name_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Receiver_Name_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Receiver_Name_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Menu_Group_Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Menu_Group_Name").html();
        //        $("#div_temp_Menu_Group_Name").attr("id", "div_temp_Menu_Group_Name_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Menu_Group_Name_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Menu_Group_Name_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Department_Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Department_Name").html();
        //        $("#div_temp_Department_Name").attr("id", "div_temp_Department_Name_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Department_Name_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Department_Name_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Post_Code") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Post_Code").html();
        //        $("#div_temp_Post_Code").attr("id", "div_temp_Post_Code_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Post_Code_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Post_Code_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Telephone") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Telephone").html();
        //        $("#div_temp_Telephone").attr("id", "div_temp_Telephone_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Telephone_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Telephone_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Tel") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Tel").html();
        //        $("#div_temp_Tel").attr("id", "div_temp_Tel_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Tel_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Tel_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Mobile_Phone") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Mobile_Phone").html();
        //        $("#div_temp_Mobile_Phone").attr("id", "div_temp_Mobile_Phone_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Mobile_Phone_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Mobile_Phone_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Fax") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Fax").html();
        //        $("#div_temp_Fax").attr("id", "div_temp_Fax_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Fax_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Fax_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Qq") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Qq").html();
        //        $("#div_temp_Qq").attr("id", "div_temp_Qq_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Qq_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Qq_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Email") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Email").html();
        //        $("#div_temp_Email").attr("id", "div_temp_Email_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Email_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Email_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Wechat") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Wechat").html();
        //        $("#div_temp_Wechat").attr("id", "div_temp_Wechat_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Wechat_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Wechat_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Detail_Address") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Detail_Address").html();
        //        $("#div_temp_Detail_Address").attr("id", "div_temp_Detail_Address_" + cell.index().row + "_" + cell.index().column);
        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: "#div_temp_Detail_Address_" + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                vmodel: cell.data()
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Detail_Address_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Is_Default_Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Is_Default").html();
        //        $("#div_temp_Is_Default").attr("id", "div_temp_Is_Default_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: '#div_temp_Is_Default_' + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                Is_Default: cell.data() == '是' ? '0' : '1'
        //            }
        //        });
        //    }
        //    else if (titleData.mData == "Is_Default_Receiver_Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Is_Default_Receiver").html();
        //        $("#div_temp_Is_Default_Receiver").attr("id", "div_temp_Is_Default_Receiver_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: '#div_temp_Is_Default_Receiver_' + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                Is_Default_Receiver: cell.data() == '是' ? '0' : '1'
        //            }
        //        });
        //    }
        //    else if (titleData.mData == "Is_Default_Contacter_Name") {
        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Is_Default_Contacter").html();
        //        $("#div_temp_Is_Default_Contacter").attr("id", "div_temp_Is_Default_Contacter_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: '#div_temp_Is_Default_Contacter_' + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                Is_Default_Contacter: cell.data() == '是' ? '0' : '1'
        //            }
        //        });
        //    }
        //    else if (titleData.mData == "Address") {

        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Address").html();
        //        $("#div_temp_Address").attr("id", "div_temp_Address_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: '#div_temp_Address_' + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                ReceiverAddress: {
        //                    //收件人省份
        //                    province: '',
        //                    //收件人城市
        //                    city: '',
        //                    //收件人区/县
        //                    district: '',
        //                    Address: cell.data(),
        //                    //收件人详细地址
        //                    DetailAddress: '',
        //                    //坐标
        //                    point_lng: '',
        //                    point_lat: ''
        //                }
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "Address_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer-lg", cell.node()).width(tdWidth);
        //    }
        //    else if (titleData.mData == "Send_Invoice_Address") {

        //        //获取模板的html
        //        cell.node().innerHTML = $("#temp_Send_Invoice_Address").html();
        //        $("#div_temp_Send_Invoice_Address").attr("id", "div_temp_Send_Invoice_Address_" + cell.index().row + "_" + cell.index().column);

        //        //初始化VUE模板
        //        var cheld = new Vue({
        //            el: '#div_temp_Send_Invoice_Address_' + cell.index().row + "_" + cell.index().column,
        //            data: {
        //                SendaddressCommon: {
        //                    //收件人省份
        //                    province: '',
        //                    //收件人城市
        //                    city: '',
        //                    //收件人区/县
        //                    district: '',
        //                    Address: cell.data(),
        //                    //收件人详细地址
        //                    DetailAddress: '',
        //                    //坐标
        //                    point_lng: '',
        //                    point_lat: ''
        //                }
        //            }
        //        });
        //        //设置控件在DataTables上
        //        var jqInputs = $('input', cell.node());
        //        $(jqInputs)[0].select();
        //        $(jqInputs).attr('id', "SendAddress_" + cell.index().row + "_" + cell.index().column);
        //        $(".outer-lg", cell.node()).width(tdWidth);
        //    }
        //},
        //行编辑失去焦点回调事件
        //rowEditBlurCallback: function (cell, datatable, titleData, rowData) {
        //    var ischeck = $(cell.node()).hasClass("render");
        //    if (ischeck) {
        //        $(cell.node()).removeClass("render");
        //    }
        //    if (titleData.mData == "Address") {
        //        var jqInputs = $('input', cell.node());
        //        if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
        //            cell.focus();
        //        } else {
        //            //修改datatable 对应的值
        //            cell.data($(jqInputs[0]).val());
        //        }

        //    }
        //    if (titleData.mData == "Remark") {
        //        var jqInputs = $('textarea', cell.node());

        //        //验证数据
        //        if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable)) {
        //            cell.focus();
        //            return;
        //        }
        //        //修改datatable 对应的值
        //        cell.data($(jqInputs[0]).val());

        //    }
        //    if (titleData.mData == "Apply_Reason") {
        //        var jqInputs = $('textarea', cell.node());

        //        //验证数据
        //        if (!PageCommon.CheckPageDetialInputBlur($(jqInputs))) {
        //            $(jqInputs).focus();
        //            return;
        //        }
        //        //修改datatable 对应的值
        //        cell.data($(jqInputs[0]).val());

        //    }
        //    if (titleData.mData == "Send_Invoice_Address") {
        //        var jqInputs = $('input', cell.node());
        //        //验证数据
        //        if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
        //            cell.focus();
        //        } else {
        //            //修改datatable 对应的值
        //            cell.data($(jqInputs[0]).val());
        //        }

        //    }
        //    if (titleData.mData == "Is_Default_Name") {
        //        //取得行号
        //        var jqInputs = $('input', cell.node());
        //        var ids = cell.index().row;

        //        //修改第七列 隐藏列的值
        //        var cell_active = datatable.cell(':eq(' + ids + ')', 16, { search: 'applied' });
        //        cell_active.data($(jqInputs[0]).val());

        //        var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Default);
        //        //修改datatable 对应的值
        //        cell.data(value);
        //        if (value == '是') {
        //            for (var i = 0; i < datatable.rows()[0].reverse().length ; i++) {
        //                if (ids != i) {
        //                    var cell_index = datatable.cell(':eq(' + i + ')', cell.index().column, { search: 'applied' });
        //                    var cell_active2 = datatable.cell(':eq(' + i + ')', 16, { search: 'applied' });
        //                    cell_active2.data("1");
        //                    cell_index.data("否");
        //                }

        //            }

        //        }
        //    }
        //    if (titleData.mData == "Is_Default_Contacter_Name") {
        //        //取得行号
        //        var jqInputs = $('input', cell.node());
        //        var ids = cell.index().row;

        //        //修改第七列 隐藏列的值
        //        var cell_active = datatable.cell(':eq(' + ids + ')', 21, { search: 'applied' });
        //        cell_active.data($(jqInputs[0]).val());

        //        var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Default_Contacter);
        //        //修改datatable 对应的值
        //        cell.data(value);
        //        if (value == '是') {
        //            for (var i = 0; i < datatable.rows()[0].reverse().length ; i++) {
        //                if (ids != i) {
        //                    var cell_index = datatable.cell(':eq(' + i + ')', cell.index().column, { search: 'applied' });
        //                    var cell_active2 = datatable.cell(':eq(' + i + ')', 21, { search: 'applied' });
        //                    cell_active2.data("1");
        //                    cell_index.data("否");
        //                }

        //            }

        //        }

        //    }
        //    if (titleData.mData == "Is_Default_Receiver_Name") {
        //        //取得行号
        //        var jqInputs = $('input', cell.node());
        //        var ids = cell.index().row;

        //        //修改第七列 隐藏列的值
        //        var cell_active = datatable.cell(':eq(' + ids + ')', 21, { search: 'applied' });
        //        cell_active.data($(jqInputs[0]).val());
        //        var value = PageCommon.GetDictionarry("IS_ENABLE", rowData.Is_Default_Receiver);
        //        //修改datatable 对应的值
        //        cell.data(value);


        //        if (value == '是') {
        //            for (var i = 0; i < datatable.rows()[0].reverse().length ; i++) {
        //                if (ids != i) {
        //                    var cell_index = datatable.cell(':eq(' + i + ')', cell.index().column, { search: 'applied' });
        //                    var cell_active2 = datatable.cell(':eq(' + i + ')', 21, { search: 'applied' });
        //                    cell_active2.data("1");
        //                    cell_index.data("否");
        //                }

        //            }

        //        }


        //    }
        //    else {
        //        var jqInputs = $('input', cell.node());
        //        //验证数据
        //        if (!PageCommon.CheckPageDetialInputBlur($(jqInputs[0]), datatable) && ischeck) {
        //            cell.focus();
        //        } else {
        //            //修改datatable 对应的值
        //            cell.data($(jqInputs[0]).val());
        //        }

        //    }
        //},
        //设置控件属性
        Set: function () {
        },
        //保存菜单画面数据
        Save: function () {
            var vm = this;
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //if (vm.C_Customer_Apply.C_Business_Department_List == "") {
            //    PageCommon.ShowMessageRight("E2095");
            //    return;
            //}
            //if (vm.C_Customer_Apply.C_Product_CLassify_List == "") {
            //    PageCommon.ShowMessageRight("E2096");
            //    return;
            //}
            
            //if (!relevantnumber) {
            //    if (!vm.formData.get('files')) {
            //        PageCommon.ShowMessageArrayRight("E1039", new Array('三证'));
            //        return;
            //    }
            //}
            //$(".BasicInformation").slideDown(500);
            //$(".title1").removeClass("boder");
            //$(".down_tab").removeClass("rotate");
            //if (!(customer_vue.C_Customer_Apply.C_Product_CLassify_List.length > 0)) {
            //    PageCommon.ShowMessageArrayRight("E2038", new Array("客户产品分类"));
            //    return;
            //}
            //if (!(customer_vue.C_Customer_Apply.C_Business_Department_List).length > 0) {
            //    PageCommon.ShowMessageArrayRight("E2038", new Array("客户事业部"));
            //    return;
            //}

            //PageCommon.CheckDataTables({
            //    tableId: "ContacterList",
            //    Key: "Name",
            //    columns: [
            //        {
            //            columnName: "Name",
            //            CheckLength: '30'
            //        },
            //         {
            //             columnName: "Position",
            //             CheckLength: '30'
            //         },
            //        {
            //            columnName: "Department_Name",
            //            CheckLength: '30'
            //        }, {
            //            columnName: "Post_Code",
            //            CheckLength: '6'
            //        }, {
            //            columnName: "Telephone",
            //            CheckTelephone: true,
            //            CheckEmptyOneBetweenTwo: true,
            //            CheckLength: '15',
            //            RelationControl: "Mobile_Phone"
            //        }, {
            //            columnName: "Fax",
            //            CheckLength: '15'
            //        }, {
            //            columnName: "Mobile_Phone",
            //            CheckMobilPhone: true,
            //            CheckLength: '15'
            //        }, {
            //            columnName: "Qq",
            //            CheckLength: '15'
            //        }
            //    ],



            //});
            //PageCommon.CheckDataTables({
            //    tableId: "ReceiverList",
            //    Key: "Name",
            //    columns: [
            //        {
            //            columnName: "Name",
            //            CheckLength: '30'
            //        },
            //         {
            //             columnName: "Position",
            //             CheckLength: '30'
            //         },
            //        {
            //            columnName: "Department_Name",
            //            CheckLength: '30'
            //        }, {
            //            columnName: "Post_Code",
            //            CheckLength: '6'
            //        }, {
            //            columnName: "Telephone",
            //            CheckTelephone: true,
            //            CheckEmptyOneBetweenTwo: true,
            //            CheckLength: '15',
            //            RelationControl: "Mobile_Phone"
            //        }, {
            //            columnName: "Fax",
            //            CheckLength: '15'
            //        }, {
            //            columnName: "Mobile_Phone",
            //            CheckMobilPhone: true,
            //            CheckLength: '15'
            //        }, {
            //            columnName: "Qq",
            //            CheckLength: '15'
            //        }
            //    ],



            //});
            //PageCommon.CheckDataTables({
            //    tableId: "SendInvoiceList",
            //    Key: "Receiver_Name",
            //    columns: [
            //        {
            //            columnName: "Receiver_Name",
            //            CheckLength: '30'
            //        },
            //          {
            //              columnName: "Post_Code",
            //              CheckLength: '6',
            //              CheckLength: '15'
            //          }, {
            //              columnName: "Telephone",
            //              CheckTelephone: true,
            //              CheckEmptyOneBetweenTwo: true,
            //              RelationControl: "Mobile_Phone"
            //          }, {
            //              columnName: "Mobile_Phone",
            //              CheckMobilPhone: true,
            //              CheckLength: '15'
            //          }
            //    ],



            //});
            //数据验证

            //获取grid数据
            //var Contacts_data = PageCommon.GetDataTableData("ContacterList");
            //var Receiver_data = PageCommon.GetDataTableData("ReceiverList");
            //var Send_Ticket_data = PageCommon.GetDataTableData("SendInvoiceList");
            //console.log(Contacts_data);
            //console.log(Receiver_data);
            //console.log(Send_Ticket_data);
            //customer_vue.C_Customer_Apply.C_Contacts_List = [];
            //customer_vue.C_Customer_Apply.C_Receiver_List = [];
            //customer_vue.C_Customer_Apply.C_Send_Invoice_List = [];
            //联系人信息组织明细数据 过滤空行
            //$.each(Contacts_data, function (index, item) {
            //    if (item.Telephone != "" || item.Mobile_Phone != "") {
            //        var obj = {};
            //        obj.Name = item.Name;
            //        obj.Position = item.Position;
            //        obj.Department_Name = item.Department_Name;
            //        obj.Post_Code = item.Post_Code;
            //        obj.Menu_Group_Name = item.Menu_Group_Name;
            //        obj.Birthday = item.Birthday;
            //        obj.Telephone = item.Telephone;
            //        obj.Detail_Address = item.Detail_Address;
            //        obj.Address = item.Address;
            //        obj.Address_Gather = item.Detail_Address + item.Address;
            //        obj.Fax = item.Fax;
            //        obj.Mobile_Phone = item.Mobile_Phone;
            //        obj.Qq = item.Qq;
            //        obj.Email = item.Email;
            //        obj.Wechat = item.Wechat;
            //        obj.Remark = item.Remark;
            //        obj.Is_Default_Contacter = item.Is_Default_Contacter;

            //        customer_vue.C_Customer_Apply.C_Contacts_List.push(obj);
            //    }
            //});
            //收货人信息组织明细数据
            //$.each(Receiver_data, function (index, item) {
            //    if (item.Name != "") {
            //        var obj = {};
            //        obj.Name = item.Name;
            //        obj.Position = item.Position;
            //        obj.Department_Name = item.Department_Name;
            //        obj.Post_Code = item.Post_Code;
            //        obj.Menu_Group_Name = item.Menu_Group_Name;
            //        obj.Birthday = item.Birthday;
            //        obj.Telephone = item.Telephone;
            //        obj.Detail_Address = item.Detail_Address;
            //        obj.Address = item.Address;
            //        obj.Address_Gather = item.Detail_Address + item.Address;
            //        obj.Fax = item.Fax;
            //        obj.Mobile_Phone = item.Mobile_Phone;
            //        obj.Qq = item.Qq;
            //        obj.Email = item.Email;
            //        obj.Wechat = item.Wechat;
            //        obj.Remark = item.Remark;
            //        obj.Is_Default_Receiver = item.Is_Default_Receiver;

            //        customer_vue.C_Customer_Apply.C_Receiver_List.push(obj);
            //    }
            //});
            //寄票信息组织明细数据
            //$.each(Send_Ticket_data, function (index, item) {
            //    if (item.Receiver_Name != "") {
            //        var obj = {};
            //        obj.Customer_Id = item.Customer_Id;
            //        obj.Receiver_Name = item.Receiver_Name;
            //        obj.Detail_Address = item.Detail_Address;
            //        obj.Post_Code = item.Post_Code;
            //        obj.Tel = item.Tel;
            //        obj.Apply_Reason = item.Apply_Reason;
            //        obj.Remark = item.Remark;
            //        obj.Is_Default = item.Is_Default;
            //        obj.Send_Invoice_Address = item.Send_Invoice_Address;
            //        //obj.Address_Code_Gather = item.SendaddressCommon.province + '|' + item.SendaddressCommon.city + '|' + item.SendaddressCommon.district;
            //        obj.Address_Gather = item.Send_Invoice_Address + item.Detail_Address;
            //        customer_vue.C_Customer_Apply.C_Send_Invoice_List.push(obj);
            //    }
            //});
            //验证至少输入一条明细
            //if (!customer_vue.C_Customer_Apply.C_Contacts_List.length > 0) {
            //    PageCommon.ShowMessageArrayRight("E2027", new Array("联系人信息"));
            //    PageCommon.Loading(false);
            //    return;
            //}

            //customer_vue.C_Customer_Apply.Customer.Customer_Address = customer_vue.Customer_Address.Address;
            //customer_vue.C_Customer_Apply.Customer.Detail_Address = customer_vue.Customer_Address.DetailAddress;
            //customer_vue.C_Customer_Apply.Customer.Address_Code_Gather = customer_vue.Customer_Address.province + '-' + customer_vue.Customer_Address.city + '-' + customer_vue.Customer_Address.district;
            //customer_vue.C_Customer_Apply.Customer.Address_Gather = customer_vue.Customer_Address.Address + customer_vue.Customer_Address.DetailAddress;

            var addressArr = customer_vue.Customer_Address.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            customer_vue.C_Customer_Apply.Customer.Customer_Address = address + customer_vue.Customer_Address.DetailAddress;
            customer_vue.C_Customer_Apply.Customer.Detail_Address = customer_vue.Customer_Address.DetailAddress;
            customer_vue.C_Customer_Apply.Customer.Address_Code_Gather = customer_vue.Customer_Address.province + '-' + customer_vue.Customer_Address.city + '-' + customer_vue.Customer_Address.district;
            customer_vue.C_Customer_Apply.Customer.Address_Gather = customer_vue.Customer_Address.Address;


            if (customer_vue.C_Customer_Apply.C_Invoice_List.length > 0) {
                if (customer_vue.BillingCommon.Address) {
                    var addressArr1 = customer_vue.BillingCommon.Address.split('-');
                    var address = '';
                    for (var i = 0; i < addressArr1.length; i++) {
                        address += addressArr1[i];
                    }
                    customer_vue.C_Customer_Apply.Customer.BillingCommon = address + customer_vue.BillingCommon.DetailAddress;
                    customer_vue.C_Customer_Apply.Customer.Detail_Address = customer_vue.BillingCommon.DetailAddress;
                    customer_vue.C_Customer_Apply.Customer.Address_Code_Gather = customer_vue.BillingCommon.province + '-' + customer_vue.BillingCommon.city + '-' + customer_vue.BillingCommon.district;
                    customer_vue.C_Customer_Apply.Customer.Address_Gather = customer_vue.BillingCommon.Address;

                }
            }
            vm.C_Customer_Apply.C_Business_Department_List = vm.linkBusiness;
            vm.C_Customer_Apply.C_Product_CLassify_List = vm.linkClassify;

            vm.formData.delete('customerApply');
            var data = JSON.stringify(customer_vue.C_Customer_Apply);
            vm.formData.append('customerApply', data);
            PageCommon.SubmitForm({
                url: "Save",
                //, param: { customerApply: customer_vue.C_Customer_Apply },
                param: vm.formData,
                type: '2',
                success: function (data) {

                    //PageCommon.Clickbtn(vm, 'Submit');
                    window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Apply_Bill_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');

                }
            });
            //提交数据到后台
            //PageCommon.SubmitForm({
            //    url: "Save"
            // , param: { customerApply: customer_vue.C_Customer_Apply }
            // , success: function (data) {

            //     window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + data.Result_Model.Request_Object.Apply_Bill_Id + "," + data.Result_Model.Request_Object.Customer_Id + '&save=1');
            // }
            //});
        },

        Edit: function () {
            var vm = this;
            //vm.editimg = 'true2';
            vm.isdelete_img = true;
            PageCommon.Clickbtn(vm, 'Edit');
        },
        //提交
        Submit: function () {
            var vm = this;
            PageCommon.SubmitForm({
                url: "Submit"
             , param: { customerApply: customer_vue.C_Customer_Apply },
                success: function (data) {
                    PageCommon.Clickbtn(vm, 'Submit');
                }
            });
        },
        backfd: function (fd, deletedata) {

            if (deletedata) {
                this.C_Customer_Apply.Delete_File_Model_List = deletedata;
            }

            this.formData = fd;
        },
        //审核
        Approval: function () {
            PageCommon.SubmitForm({
                url: "Approval"
             , param: { customerApply: customer_vue.C_Customer_Apply },
                success: function (data) {
                window.location.href = PageCommon.SetUrlParameter("List");
            }
            });
        },
        //审批意见
        mApproval: function () {

        },

        //返回列表画面
        Back: function () {
            var vm = this;
            PageCommon.BackFormMessge('List', vm);
        }
    }
});