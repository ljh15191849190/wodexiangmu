
    var HandOver_Vue = new Vue({
        el: '#apps',
        data: {
            //申请日期
            Create_Time: '',
            //客户名称
            Customer_Id: '',
            //现任务人
            Now_Assigner: '',
            //现任务人部门
            Now_Assigner_Department: '',

            //审核状态
            Approval_Status: '',
            //客户重要度
            Customer_Importance: '',
            //客户类型
            Customer_Type: '',
            //客户状态
            Customer_Status:'',
            //移交申请ID
            Hand_Over_Bill_Id: '',
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000008",
                System_Key: "CustomerRelations"
            },
            childSearchModel: [
                {
                    Field_Name:[ "C_Hand_Over_Apply_Bill_Detail.Hand_Over_Bill_Id"],
                    Parent_Key: ["Hand_Over_Bill_Id"],
                    Child_List: 'HandOverDetailList',
                    Detail_Seach: 'DetailSeach',
                    Default_Child: "true"
                }
            ],

        },
        mounted: function () {
            //控件拖动
            $('.form-group').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
                //console.log(b)
                //console.log(c);
            });
        },
        methods: {
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Create_Time") {
                    return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }
            },
            //新增
            New: function () {
                window.location.href = PageCommon.SetUrl("Detail");
            },
            //修改

            Update: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("HandOverList");
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

                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Hand_Over_Bill_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
                //window.location.href = PageCommon.SetUrlParameter("Detail");

            },
            //删除
            Delete: function () {
                //获取选中行数据
                var selectRow = PageCommon.GetTableSelectRow("HandOverList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                //调用删除共同方法
                PageCommon.SubmitDetialForm({
                    url: "Delete",
                    param: selectRow,
                    type:'0',
                    success: function () {
                        PageCommon.RefreshTablePage("HandOverList");  //刷新数据
                    },
                    close: true
                })
            },
            //查看
            CheckLook: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("HandOverList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Hand_Over_Bill_Id + ',' + selectRow[0].Customer_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //审批意见
            ApprovalOpinion: function () {

            },
            //审核
            Approval: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("HandOverList");
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
                window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Hand_Over_Bill_Id + ',' + selectRow[0].Customer_Id + ',' + '&sourcetype=1&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改
            },
            //导出
            Export: function (obj) {

                PageCommon.ModalExportOpen({
                    tableName: 'C_Hand_Over_Apply_Bill',
                    menu_Id: 'M000008',
                    list_Id: 'HandOverList',
                    systemKey: 'CustomerRelations',
                    vm: HandOver_Vue
                })
            },
            //设置
            Set: function () {


            },
            //查询
            Search: function (obj) {
                HandOver_Vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000008", List_Id: "HandOverList" });
            },
            //清空
            mClear: function () {
                this.Create_Time = '';
                this.Customer_Id = '';
                this.Now_Assigner = '';
                this.Now_Assigner_Department = '';
                this.Approval_Status = '';
                this.Hand_Over_Bill_Id = '';
                this.Customer_Type = '';
                this.Customer_Status = '';
                this.Customer_Importance = '';
                $('#Customer_Id').val(null).trigger('change');
                $('#Customer_Type').val(null).trigger('change');
                $('#Now_Department_Id').val(null).trigger('change');
                $('#Now_Employee_Id').val(null).trigger('change');
                $('#Customer_Status').val(null).trigger('change');
                $('#Approval_Status').val(null).trigger('change');
                $('#Customer_Importance').val(null).trigger('change');

            }
        }
    });
