var searchData = {};
var vmCompany = new Vue({
    el: '#apps',
    data: {
        //公司名称
        Company_Name: '',
        //公司简称
        Company_Short_Name: '',
        //公司地址
        Company_Address: '',
        Create_Time:"",
        
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000019",
            System_Key: "BasicData"
        },
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableUrl: 'Seach',

    },
    methods: {
        //新增
        New: function (obj) {
            PageCommon.ModalOpen({
                id: "CompanyDetail",
                title: '公司新增',
                width: "555px",
                height: "250px",
                url: '/BasicData/Company/Detail',
                callBack: function (iframeId) {
                    //调用地理关系详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmCompany.Save()
                }
            })
        },
        //删除
        Delete: function (obj) {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("CompanyList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("CompanyList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function (obj) {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("CompanyList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "CompanyDetail",
                title: '公司修改',
                width: "555px",
                height: "250px",
                url: "/BasicData/Company/Detail",
                urlparameter: "keyValue=" + selectRow[0].Company_Id,
                callBack: function (iframeId) {
                    //调用地理关系详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmCompany.Save()
                }
            })
        },
        //导入
        Import: function (obj) {
            PageCommon.ModalImportOpen({
                tableName: "B_Company",
                systemKey: "BasicData",
                vm: vmCompany
            })
        },
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Company',
                menu_Id: 'M000019',
                list_Id: 'CompanyList',
                systemKey: 'BasicData',
                vm: vmCompany
            })
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            vmCompany.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000019", List_Id: "CompanyList" });


        },
        Clear: function () {
            this.Company_Name = '';
            this.Company_Short_Name = '';
            this.Company_Address = '';

        }
    }
})