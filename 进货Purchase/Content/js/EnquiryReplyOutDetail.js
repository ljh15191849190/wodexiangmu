var RequestValue = PageCommon.Request();
if (RequestValue.relevantnumber) {
    var relevantnumber = RequestValue.relevantnumber;
    if (relevantnumber.indexOf(',') != -1) {
        relevantnumber = relevantnumber.split(",");
    } else {
        relevantnumber = [relevantnumber];
    }
}
var OutenquiryReply_vue = new Vue({
    el: '#app',
    data: {
        enquiryReply: false,
        //是否查看
        dIslook: "",
        //询价单部分信息
        P_Consult_Price_Answer: {
            //询价单号
            Consult_Price_Bill_Id: "",
            //询价单明细号
            Detail_Number: "",
            //型号
            Product_Purchase: '',
            Product_Id: '',
            //品名ID
            Product_Classify_Id: '01',
            //品名
            Product_Classify_Name: '',
            //供应商
            Supplier_Id: '',
            //品牌
            Brand_Name: '',
            //产地
            Product_Area_Name: '',
            //发票类型
            Invoice_Type: '',
            //油脂包装
            Package: '',
            //数量
            Answer_Count: '',
            //价格
            Answer_Price: '',
            //货期
            Goods_Period: '',
            //有效期
            Period_Validity: '',
            //询价状态
            Enquiry_Price_Status: '',
            //备注
            Remark: '',

        },
        //货期
        Goods_Period: '',
        //有效期
        Period_Validity: '',
        //提问对象
        P_Consult_Price_Answer_Mess: {
            //回复单号
            Consult_Price_Answer_Id: '',
            //提问
            Answer_Content: ""
        },
        //型号查询条件
        model: {
            Menuresult: ["Product_Id", "Product_Name"],
            filedSearch: ["Product_Id", "Product_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Id", "Product_Name"]
        },
        //发票类型查询条件
        invoice: {
            Menuresult: ["Tax_Rate_Id", "Invoice_Type"],
            filedSearch: ["Tax_Rate_Id", "Invoice_Type"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Tax_Rate_Id", "Invoice_Type"]
        },
        //供应商查询条件
        supplier: {
            Menuresult: ["Supplier_Id", "Supplier_Name"],
            filedSearch: ["Supplier_Id", "Supplier_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Supplier_Id", "Supplier_Name"],
            mainWhere: [{
                Field_Name: "Supplier_Type",
                Value1: "01",
                Expression: "03",
                Module_Id: ""
            }]
        },
        //询价信息
        EnquiryInfo: {},
        //回复信息
        RelyInfos: [],
        //历史回复列表
        dHistorylist: [],
        //关联型号回复列表
        dModellist: []
    },
    mounted: function () {
        //修改数据传过来的id
        var that = this;
        that.Getpagedata();
        that.dIslook = RequestValue.islook;
        $("#tab").on("click", 'li', function () {
            $(this).addClass("tabactive").siblings().removeClass("tabactive");
            var index = $(this).index();
            $(".replyType").find('.type').eq(index).show().siblings().hide();
        })
        $(".replymessage").height($(window).outerHeight() - $(".replymessage").offset().top - 6)
        $(".down1").click(function () {
            $(".tile-body").toggle();
            $(this).find("i").toggleClass('rotate');
            $(".dataTables_scrollBody").height($(window).outerHeight() - $(".dataTables_scrollBody").offset().top - $(".tableBottom").outerHeight() - 20 - $(".dataTables_scrollFootInner").outerHeight());

            var tableid = $(".dataTables_scrollBody").find("table").attr("id")
            PageCommon.RefreshTablePage(tableid)
        })
        $(".down4").click(function () {
            $(this).find("i").toggleClass('rotate');
            $(".isenquiryinfo").toggleClass("isenquiryinfo2");
            $(".replymessage").height($(window).outerHeight() - $(".replymessage").offset().top - 6)
        })
    },
    watch: {
        Goods_Period: function (value) {
            var that = this;
            that.P_Consult_Price_Answer.Goods_Period = value;
            that.Goods_Period = value;
            var a = new Date(value);
            a = +a + 1000 * 60 * 60 * 24 * (that.EnquiryInfo.ValidDay);
            a = new Date(a);
            that.Period_Validity = moment(a).format("YYYY-MM-DD");
            that.P_Consult_Price_Answer.Period_Validity = moment(a).format("YYYY-MM-DD");
        }
    },
    methods: {
        Getanswerlist: function (i) {
            var that = this;
            if (i == 0) { that.Getpagedata(); }
            else if (i == 1) {
                that.Gethistorylist();
            } else if (i == 2) {
                that.Getmodellist();
            }
        },
        //获取历史回复数据
        Gethistorylist: function () {
            var that = this;
            var historyparam = that.EnquiryInfo.Consult_Price_Bill_Id + "," + that.EnquiryInfo.Product_Id;
            if (historyparam.indexOf(',') != -1) {
                historyparam = historyparam.split(",");
            } else {
                historyparam = [historyparam];
            }
            window.top.PageCommon.GetFormData({
                url: "../Purchase/EnquiryReply/GetHistoryConsultPriceAnswer",
                param: { keyValue: historyparam },
                success: function (data) {
                    that.dHistorylist = data;
                }
            });
        },
        //获取关联型号回复数据
        Getmodellist: function () {
            var that = this;
            window.top.PageCommon.GetFormData({
                url: "../Purchase/EnquiryReply/GetSameConsultPriceAnswer",
                param: { keyValue: that.EnquiryInfo.Product_Id },
                success: function (data) {
                    that.dModellist = data;
                }
            });
        },
        //获取页面询价数据
        Getpagedata: function () {
            var that = this;
            if (relevantnumber) {
                PageCommon.GetFormData({
                    url: "GetConsultPriceAnswer",
                    param: { keyValue: relevantnumber },
                    success: function (data) {
                        that.EnquiryInfo = data;
                        that.RelyInfos = data.P_Consult_Price_Answer_List;
                    }
                });
            }
        },
        //作废
        Delete: function (index) {
            var that = this;
            if (that.RelyInfos.length) {
                for (var i = 0; i < that.RelyInfos.length; i++) {
                    if (index == i) {
                        window.top.PageCommon.SubmitDetialForm({
                            url: "../Purchase/EnquiryReply/Delete",
                            param: that.RelyInfos[i],
                            success: function () {
                                that.Getpagedata();
                            },
                            close: false
                        })
                    }
                }
            }
        },
        //刷新
        Update: function (index) {
            var that = this;
            that.Getpagedata();
        },
        //回复
        Reply: function () {
            this.enquiryReply = !this.enquiryReply;
            $("#enquiryReply").toggle();
            $(".replymessage").height($(window).outerHeight() - $(".replymessage").offset().top);
        },
        //复制
        Copy: function () {
            var that = this;
            that.P_Consult_Price_Answer = $.extend(that.P_Consult_Price_Answer, that.EnquiryInfo);
            that.P_Consult_Price_Answer.Product_Id = that.EnquiryInfo.Product_Id
            that.P_Consult_Price_Answer.Product_Purchase = that.EnquiryInfo.Product_Id + that.EnquiryInfo.Is_Purchase;
        },
        //提交问题
        Refer_Question: function (i, index, id) {
            var that = this;
            var obj = {
                Consult_Price_Answer_Id: id,
                Answer_Content: that.P_Consult_Price_Answer_Mess.Answer_Content
            }
            if (that.P_Consult_Price_Answer_Mess.Answer_Content) {
                window.top.PageCommon.SubmitForm({
                    url: "../Purchase/EnquiryReply/SaveConsultPriceAnswerMess",
                    param: { consultPriceAnswerMess: obj },
                    success: function () {
                        if (i == 1) {
                            that.Getpagedata();
                        } else if (i == 2) {
                            that.Gethistorylist();
                        } else if (i == 3) {
                            that.Getmodellist();
                        }
                        that.P_Consult_Price_Answer_Mess.Answer_Content = "";
                    }
                })
            }
        },
        //保存回复信息
        Save: function () {
            var that = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            that.P_Consult_Price_Answer.Consult_Price_Bill_Id = that.EnquiryInfo.Consult_Price_Bill_Id;
            that.P_Consult_Price_Answer.Detail_Number = that.EnquiryInfo.Detail_Number;
            console.log(that.P_Consult_Price_Answer);
            //提交数据
            window.top.PageCommon.SubmitForm({
                url: "../Purchase/EnquiryReply/SaveConsultPriceAnswer",
                param: { consultPriceAnswer: that.P_Consult_Price_Answer },
                success: function () {
                    that.Getpagedata();
                }
            });
        },
        TemplateSelectionProduct: function (data) {
            var that = this;
            if (data) {
                that.P_Consult_Price_Answer.Product_Id = data.Product_Id;
                that.P_Consult_Price_Answer.Product_Purchase = data.Product_Id + data.Is_Purchase;
                that.P_Consult_Price_Answer.Product_Classify_Id = data.Product_Classify_Id;
                that.P_Consult_Price_Answer.Product_Classify_Name = data.Product_Classify_Name;
                that.P_Consult_Price_Answer.Brand_Name = data.Brand_Name;
                that.P_Consult_Price_Answer.Product_Area_Name = data.Product_Area_Name;
                that.P_Consult_Price_Answer.Package = data.Package;
            } else {
                that.P_Consult_Price_Answer.Product_Id = '';
                that.P_Consult_Price_Answer.Product_Purchase = '';
                that.P_Consult_Price_Answer.Product_Classify_Id = '';
                that.P_Consult_Price_Answer.Product_Classify_Name = '';
                that.P_Consult_Price_Answer.Brand_Name = '';
                that.P_Consult_Price_Answer.Product_Area_Name = ''
                that.P_Consult_Price_Answer.Package = '';
            }
        }
    }
});