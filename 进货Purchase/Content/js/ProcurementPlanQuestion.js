var RequestValue = PageCommon.Request();
var relevantnumber = RequestValue.Purchase_Plan_Id + "," + RequestValue.Detail_Number;
if (relevantnumber.indexOf(',') != -1) {
    relevantnumber = relevantnumber.split(",");
} else {
    relevantnumber = [relevantnumber];
}
var question_vue = new Vue({
    el: '#app',
    data: {
        dIslook: "",
        dAnswer_Content: "",
        dReplyList1: [],
        dReplyList2: []
    },
    mounted: function () {
        //修改数据传过来的id
        var that = this;
        that.dIslook = RequestValue.islook;
        that.Getanswerlist1();
        $("#tab").on("click", 'li', function () {
            $(this).addClass("tabactive").siblings().removeClass("tabactive");
            var index = $(this).index();
            $(".replyType").find('.type').eq(index).show().siblings().hide();
        })
    },
    watch: {

    },
    methods: {
        //获取回复列表1
        Getanswerlist1: function () {
            var that = this;
            window.top.PageCommon.GetFormData({
                url: "../Purchase/ProcurementPlan/GetPurchaseQuestionByProduct",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.dReplyList1 = data.P_Purchase_Question_List;
                }
            });
        },
        //获取回复列表2
        Getanswerlist2: function () {
            var that = this;
            window.top.PageCommon.GetFormData({
                url: "../Purchase/ProcurementPlan/GetPurchaseQuestionById",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    that.dReplyList2 = data.P_Purchase_Question_List;
                }
            });
        },
        //提交问题
        Refer_Question: function (index) {
            var that = this;
            var obj = {
                Purchase_Plan_Id: RequestValue.Purchase_Plan_Id,
                Purchase_Plan_Detail_Number: RequestValue.Detail_Number,
                Answer_Content: that.dAnswer_Content
            }
            if (that.dAnswer_Content) {
                window.top.PageCommon.SubmitForm({
                    url: "../Purchase/ProcurementPlan/SavePurchaseQuestion",
                    param: { purchaseQuestion: obj },
                    success: function () {
                        that.dAnswer_Content = "";
                        that.Getanswerlist1();
                    }
                })
            }
        },
        TemplateSelection: function (data) {
            //this.S_User.Employee_Id = data.id;
            //this.S_User.Name = data.name || data.text;
        },
    }
});