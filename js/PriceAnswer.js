
var RequestValue = PageCommon.Request();
    var vmPriceanswer = new Vue({
        el: '#apps',
        data: {
            //表格查询url
            tableUrl: "PriceAnswerSeach",
            //表格查询条件
            searchModel: {
                Where_Parameter_List: [
                    {
                 Field_Name: "M_Consult_Price_Bill_Detail.Customer_Id",
                Query_Type:"01",
                Expression:"02",
                Condition_Value1: RequestValue.customerid
            }, {
                Field_Name: "M_Consult_Price_Bill_Detail.Is_Purchase",
                Query_Type: "01",
                Expression: "02",
                Condition_Value1: RequestValue.ispurchase
            },
            {
                Field_Name: "M_Consult_Price_Bill_Detail.Product_Id",
                Query_Type: "01",
                Expression: "02",
                Condition_Value1: RequestValue.productid
            }]
            },
            columHeaderSeach: {
                Menu_Id: "M000003",
                System_Key: "Sale",
                List_Id: ""
            },
            //行数据
            selectRow: []
        },
        methods: {
            SelectRow: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("PriceConsultAnswer");
                return selectRow;
            },

        }

    });
