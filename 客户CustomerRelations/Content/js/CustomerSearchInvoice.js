
    var Invoice_vue = new Vue({
        el: '#app',
        data: {
            Customer_Invoice: {
                   
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
           
            
        },
        mounted: function () {
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
            vm.Customer_Invoice = parent.CustomerInfo.CustomerData.C_Invoice_List[0];
           
            vm.BillingCommon.Address = parent.CustomerInfo.CustomerData.C_Invoice_List[0].Address_Gather;
            vm.BillingCommon.DetailAddress = parent.CustomerInfo.CustomerData.C_Invoice_List[0].Detail_Address;
           
            
           
        },
        methods: {
            
        }
    });
