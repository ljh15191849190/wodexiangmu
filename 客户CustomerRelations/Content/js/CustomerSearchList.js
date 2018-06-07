
    var CustomerSearch_Vue= new Vue({
        el: '#apps',
        data: {
            //客户名称
            Customer_Id: '',
            //任务人
            Employee_Id: '',
            //创建日期
            Create_Time: '',
            //联系人
            Name:'',
            //行业
            Industry_Id: '',
            //所属行业下拉框查询条件
            IndustryWhere: [],
            //所属行业下拉框排序
            IndustryOrder: [{
                Field_Name: "Show_Order",
                Orderby: "ASC"
            }],
            //所属行业下拉框显示字段
            IndustryResult: ["Industry_Id", "Industry_Name"],
            //主营产品
            Major_Manage_Product:'',
            //客户状态
            Customer_Status:'',
            //审核状态
            Approval_Status:'',
            //客户类型
            Customer_Type:'',
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M000004",
                System_Key: "CustomerRelations"
            },
            //表格查询url
            tableUrl: "Seach",
            //表格查询条件
            searchModel: {},

            
        },
        mounted: function () {
            //控件拖动
            $('.drag_1').arrangeable({
                dragSelector: '.space'
            });
            $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
                
            });
            $('#orderForm tbody').on('dblclick', 'tr', function () {
                PageCommon.ModalOpen({
                    id: "Customer",
                    title: '客户资料',
                    width: "900px",
                    height: "600px",
                    btn: [],
                    url: '/CustomerRelations/CustomerSearch/Detail',
                    callBack: function (iframeId) {
                        PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                    }
                })
            })
        },
        methods: {
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                if (Field_Name === "Create_Time") {
                    return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }
            },
            CustomerBasiced: function () {
                //取得选择行数据
                var selectRow = PageCommon.GetTableSelectRow("CustomerSearchList");
                //画面选择一条数据
                if (selectRow.length != 1) {
                    PageCommon.ShowMessageRight("E2008");
                    return;
                }
                PageCommon.ModalOpen({
                    id: "Customer",
                    title: '客户资料',
                    width: "900px",
                    height: "600px",
                    btn: [],
                    url: '/CustomerRelations/CustomerSearch/Detail',
                    urlparameter: "keyValue=" + selectRow[0].Customer_Id,
                    callBack: function (iframeId) {
                    }
                })
            },

            //导出
            Export: function (obj) {
                CustomerSearch_Vue.Search();

                PageCommon.ModalExportOpen({
                    tableName: 'C_Customer',
                    menu_Id: 'M000004',
                    list_Id: 'CustomerSearchList',
                    systemKey: 'CustomerRelations',
                    vm: CustomerSearch_Vue
                })
            },
            //查询
            Search: function (obj) {
                CustomerSearch_Vue.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000004", List_Id: "CustomerSearchList" });
            },
            //清除
            mClear: function () {
                this.Customer_Id = '';
                this.Employee_Id = "";
                this.Create_Time = '';
                this.Industry_Id = '';
                this.Major_Manage_Product = '';
                this.Customer_Status = '';
                this.Approval_Status = '';
                $('#Approval_Status').val(null).trigger('change');
                this.Customer_Type = '';
            }
        }
    });
