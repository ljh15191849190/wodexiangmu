
    var Customer_vue = new Vue({
        el: '#app',
        data: {
            isdelete_img: true,
            formData: '',
            File_Model_List: [{
                //Base64_Imgage: ''
            }],
            C_Customer: {
                //客户名称
                Customer_Name: '',
                //父客户
                Parent_Customer_Id:'',
                //其他抬头
                Other_Customer_Name:'',
                //任务人
                Employee_Id:'',
                //客户地址
                Customer_Address: '',
                //获取途径
                Get_Way_Id:'',
                //主营产品
                Major_Manage_Product:'',
                //客户类型
                Customer_Type:'',
                //所属行业
                Industry_Id:'',
                //企业性质
                Enterprise_Property:'',
                //客户状态
                Customer_Status:'',
                //公司主页
                Customer_WebSite:"",
                //应用行业
                Application_Industry:'',
                //原供应商
                Old_Supplier:'',
                //税务登记
                Tax_Register:'',
                //营业执照
                Business_License:'',
                //机构代码
                Organization_Code:'',
                //备注
                Remark:'',
                //基本情况
                Base_Case:'',
                //欠款总额
                Goods_Pay_Sum: '',
                //运费余额
                Freight_Balance: '',
                //定金余额
                Earnest_Balance: '',
                //其他余额
                Other:'',
                //合同签订方式
                Contract_Sign_Way:'',
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
                Delete_File_Model_List: []
                
            },
            addressCommon: {
                //收件人省份
                province: '',
                //收件人城市
                city: '',
                //收件人区/县
                district: '',
                Address: '',
                //收件人详细地址
                DetailAddress: '',
                //坐标
                point_lng: '',
                point_lat: ''
            },
            //所属行业下拉框查询条件
            EmployeeWhere: [],
            //所属行业下拉框排序
            EmployeeOrder: [{
                Field_Name: "Show_Order",
                Orderby: "ASC"
            }],
            //所属行业下拉框显示字段
            EmployeeResult: ["Employee_Id", "Name"],
            Industryresult: ["Industry_Id", "Industry_Name"],
            IndustryfiledSearch: ["Industry_Id", "Industry_Name"],
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
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            
        },
        mounted: function () {
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $('.drag_2').arrangeable({
                dragSelector: '.space'
            });
            $('.drag_3').arrangeable({
                dragSelector: '.space'
            });
            $('.drag_4').arrangeable({
                dragSelector: '.space'
            });
            $('.SendInformation').arrangeable({
                dragSelector: '.space'
            });
            $('.InvoiceInformation').arrangeable({
                dragSelector: '.space'
            });
            $('.drag_1').arrangeable({
                dragSelector: '.shade_bg'
            });
            $('.SendInformation').arrangeable({
                dragSelector: '.shade_bg'
            });
            $('.InvoiceInformation').arrangeable({
                dragSelector: '.shade_bg'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
              
            });
            
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
            var vm = this;
            vm.C_Customer = parent.CustomerInfo.CustomerData;
            //vm.C_Customer.Address = parent.CustomerInfo.CustomerData.Customer_Address;
            //vm.addressCommon.DetailAddress = parent.CustomerInfo.CustomerData.Detail_Address;
            vm.File_Model_List = parent.CustomerInfo.CustomerData.File_Model_List;
            
            this.isdelete_img = false;
        },
        methods: {
           
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
                } else {
                    $(".SendOrder").hide();
                }
            }
        }
    });
