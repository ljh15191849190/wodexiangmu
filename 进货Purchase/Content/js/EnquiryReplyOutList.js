var OutenquiryReply = new Vue({
    el: '#apps',
    data: {
        Parent_Company_Id: '',
        Companyresult: ["Company_Id", "Company_Name", "Parent_Company_Id"],
        filedSearch: ["Company_Id", "Company_Name", "Parent_Company_Id"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Company_Id", "Company_Name", "Parent_Company_Id"],
        productrange: {
            first: "",
            second: ""
        },
        P_Consult_Price_Answer: {
            //询价单号
            Consult_Price_Bill_Id: '',
            //型号
            Product_Name: '',
            //询价日期
            Create_Time: '',
            //品牌
            Brand_Name: '',
            //客户名称
            Customer_Name: '',
            //创建员工
            Create_Employee_Name: '',
            //产地
            Product_Area_Name: "",
            //油脂包装
            Package: '',
            //品名
            Product_Classify_Name: ''
        },
        //产地查询条件
        area: {
            Menuresult: ["Product_Area_Id", "Product_Area_Name"],
            filedSearch: ["Product_Area_Id", "Product_Area_Name"],
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            inputField: ["Product_Area_Id", "Product_Area_Name"]
        },
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000003",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "OutSeach",
        //表格查询条件
        searchModel: {},
        globalParameter: PageCommon.GlobalParameter()
    },
    mounted: function () {
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
    },
    methods: {
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
             if (Field_Name === "Enquery_Count") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
            }
            //单价
            if (Field_Name === "Receive_Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //查看
        Look: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("EnquiryReplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //打开回复详细窗口
            PageCommon.ModalOpen({
                id: "EnquiryReplyDetail",
                title: "回复详细",
                width: "850px",
                height: "800px",
                url: '/Purchase/EnquiryReply/OutDetail',
                urlparameter: "relevantnumber=" + selectRow[0].Consult_Price_Bill_Id + "," + selectRow[0].Detail_Number + "&islook=" + "true",
                btn: ["关闭"],
                btnid: ["btnClose"],
                btnclass: ['btn btn-danger'],
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                }
            })
        },
        //回复
        Reply: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("EnquiryReplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //打开回复详细窗口
            PageCommon.ModalOpen({
                id: "EnquiryReplyDetail",
                title: "回复详细",
                width: "850px",
                height: "800px",
                url: '/Purchase/EnquiryReply/OutDetail',
                urlparameter: "relevantnumber=" + selectRow[0].Consult_Price_Bill_Id + ',' + selectRow[0].Detail_Number + "&islook=" + "false",
                btn: ["关闭"],
                btnid: ["btnClose"],
                btnclass: ['btn btn-danger'],
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                }
            })

        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'M_Consult_Price_Bill',
                menu_Id: 'M000002',
                list_Id: 'EnquiryReplyList',
                systemKey: 'Purchase',
                vm: OutenquiryReply
            })
        },
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000002", List_Id: "EnquiryReplyList" });
        },
        mClear: function () {
            this.P_Consult_Price_Answer.Consult_Price_Bill_Id = "";
            this.P_Consult_Price_Answer.Product_Name = "";
            this.P_Consult_Price_Answer.Create_Time = "";
            this.P_Consult_Price_Answer.Brand_Name = "";
            this.P_Consult_Price_Answer.Customer_Name = "";
            this.P_Consult_Price_Answer.Create_Employee_Name = "";
            this.P_Consult_Price_Answer.Product_Classify_Name = "";
            this.P_Consult_Price_Answer.Product_Area_Name = "";
            this.P_Consult_Price_Answer.Package = "";
            $('#Product_Area_Name').val(null).trigger('change');
            PageCommon.TableDefaultSort("EnquiryReplyList");
        },
        //父供应商返回函数
        TemplateSelection: function (data) {
            //this.B_Supplier.Supplier_Id = data.id;
        }
    }
});