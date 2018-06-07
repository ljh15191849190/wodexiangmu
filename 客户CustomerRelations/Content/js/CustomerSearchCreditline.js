 var Customer_vue = new Vue({
        el: '#app',
        data: {
            C_Customer: {
                C_Payway_List: [{
                    //信用额度
                    Credit_Name: '',
                    //首次销售日期
                    First_Sale_Date: '',
                    //结算方式
                    Payway: '',
                    //日结天数
                    Pay_Day_Count: '',
                    //月结天数
                    Pay_Month_Count: '',
                    //分段日
                    Subsrction_Day: '',
                    //超期日
                    Extended_Day: '',
                }],
            },


        },
        mounted: function () {
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
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
            this.C_Customer = parent.CustomerInfo.CustomerData;
            
           
        },
        methods: {
            //结算方式
            ChangePayway: function (val) {
                if (val.id == "01") {
                    $(".Day").show();
                    $(".Month").hide();
                } else {
                    $(".Day").hide();
                    $(".Month").show();
                }
            },
        }
    });