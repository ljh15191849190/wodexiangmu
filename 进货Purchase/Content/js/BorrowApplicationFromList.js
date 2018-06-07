var BorrowApplicationFrom_vue = new Vue({
    el: '#apps',
    data: {
        productrange: {
            first: "",
            second: ""
        },
        globalParameter: PageCommon.GlobalParameter(),
        //子表格
        childSearchModel: [
           {
               Field_Name: ["P_Borrow_Apply.Borrow_Apply_Id"],
               Parent_Key: ["Borrow_Apply_Id"],
               Child_List: 'BorrowApplyDetailList',
               Detail_Seach: 'DetailSeach',
               Default_Child: "true",
           }
        ],
        //借入对象为供应商
        lend_supplier: false,
        //借入对象为客户
        lend_customer: false,
        //是否统购
        Is_Purchase: "",
        //是否显示生成采购按钮
        btnNew: true,
        //是否显示审核按钮
        btnApproval: true,
        //是否显示修改按钮
        btnEdit: true,
        //是否显示删除按钮
        btnDelete: true,
        //是否显示审批意见按钮
        btnApprovalOpinion: false,
        //是否显示设置按钮
        btnSet: true,
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000020",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {},
        //表格查询条件
        P_Borrow_Apply: {
            //申请单号
            Borrow_Apply_Id: "",
            //进货日期
            Create_Time: "",
            //供应商
            Supplier_Name: "",
            //审核状态
            Approval_Status: "",
            //制单人
            Create_Employee_Name: "",
            //型号
            Product_Name: "",
            //品牌
            Brand_Name: "",
            //客户
            Customer_Id: "",
            //借货对象
            Lend_Goods_Object_Id: "",
        }
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
        //子表格合计数字格式化
        childtotalback: function (Field_Name, a, b) {
            if (Field_Name == "Borrow_Count") {
                return [PageCommon.NumberDispose(a, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way), this.globalParameter.Count_Decimal];
            }
        },
        //子表格行初始化事件
        childcolumrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name == "Borrow_Count") {
                if (value) {
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            }
        },
        //新增
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //编辑
        Edit: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("BorrowApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03') {
                PageCommon.ShowMessageRight("E2041");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Borrow_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //删除
        Delete: function () {
            var that = this;
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("BorrowApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == '02' || selectRow[0].Approval_Status == '03' || selectRow[0].Approval_Status == '04') {
                PageCommon.ShowMessageRight("E2084");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                type: "0",
                success: function () {
                    PageCommon.RefreshTablePage("BorrowApplyList");  //刷新数据
                },
                close: true
            })
        },
        //审核
        Approval: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("BorrowApplyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            if (selectRow[0].Approval_Status == "01" || selectRow[0].Approval_Status == "03") {
                PageCommon.ShowMessageRight("E2083");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Borrow_Apply_Id + ',' + selectRow[0].Is_Purchase + ',' + '&sourcetype=1&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
        },
        //设置
        Set: function () {

        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'P_Borrow_Apply',
                menu_Id: 'M000011',
                list_Id: 'BorrowApplyList',
                systemKey: 'Purchase',
                vm: BorrowApplicationFrom_vue
            })
        },
        //查询
        Search: function () {
            var that = this;
            that.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000020", List_Id: "BorrowApplyList" });
        },
        //清除
        mClear: function () {
            this.P_Borrow_Apply.Borrow_Apply_Id = "";
            this.P_Borrow_Apply.Create_Time = "";
            this.P_Borrow_Apply.Supplier_Name = "";
            this.P_Borrow_Apply.Approval_Status = "";
            this.P_Borrow_Apply.Create_Employee_Name = "";
            this.P_Borrow_Apply.Product_Name = "";
            this.P_Borrow_Apply.Brand_Name = "";
            this.P_Borrow_Apply.Lend_Goods_Object_Id = "";
            this.P_Borrow_Apply.Customer_Id = "";
            $('#Approval_Status').val(null).trigger('change');
            $('#Lend_Goods_Object_Id').val(null).trigger('change');
            PageCommon.TableDefaultSort("BorrowApplyList");
        },
         //借货对象返回函数
        Template_selection: function (data) {
            var that = this;
            if (data.id == "01") {
                that.lend_supplier = true;
                that.lend_customer = false;
                that.Is_Purchase = "0";
            }
            if (data.id == "02") {
                that.lend_supplier = true;
                that.lend_customer = false;
                that.Is_Purchase = "1";
            }
            if (data.id == "03") {
                that.lend_supplier = false;
                that.lend_customer = true;
                that.Is_Purchase = "";
            }
            console.log("that.lend_supplier=========>>" + that.lend_supplier);
            console.log("that.lend_customer=========>>" + that.lend_customer);
        }
    }
});