var searchData = {};
var SupplierSearch = new Vue({
    el: '#apps',
    data: {
        globalParameter: PageCommon.GlobalParameter(),
        //供应商id
        Supplier_Name: "",
        //其他抬头id
        Other_Name: "",
        //结算方式
        Payway_Way: '',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000011",
            System_Key: "Purchase"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        //结算方式key
        PaywayDictionaryKey: "PAY_WAY",
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
        $('#orderForm tbody').on('dblclick', 'tr', function () {
            PageCommon.ModalOpen({
                id: "SupplierInfo",
                title: '供应商资料',
                width: "900px",
                height: "600px",
                btn: [],
                url: '/Purchase/OutsourceSupplierSearch/SupplierInfo',
                callBack: function (iframeId) {
                    PageCommon.ChildrenFrames(iframeId).vmImport.Import();
                }
            })
        })
    },
    methods: {
        //表格合计数字格式化
        pagetotalback: function (Field_Name, a, b) {
            var that = this;
            if (Field_Name == "Goods_Payment_Balance" || Field_Name === "All_Balance" || Field_Name === "Advance_Payment") {
                return [PageCommon.NumberDispose(a, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), PageCommon.NumberDispose(b, that.globalParameter.Other_Money_Decimal, that.globalParameter.Money_Digital_Cut_Way), that.globalParameter.Tax_Price_Sum_Decimal];
            }
        },
        //行初始化事件
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Goods_Payment_Balance" || Field_Name === "All_Balance" || Field_Name === "Advance_Payment") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Other_Money_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        SupplierInfo: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierDetailList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            PageCommon.ModalOpen({
                id: "SupplierInfo",
                title: '外购供应商资料',
                width: "900px",
                height: "600px",
                btn: [],
                url: '/Purchase/OutsourceSupplierSearch/SupplierInfo',
                urlparameter: "keyValue=" + selectRow[0].Supplier_Id,
                callBack: function (iframeId) {
                }
            })
        },
        //CostsSet: function () {
        //    //取得选择行数据
        //    var selectRow = PageCommon.GetTableSelectRow("PurchaseSupplierDetailList");
        //    //画面选择一条数据
        //    if (selectRow.length != 1) {
        //        PageCommon.ShowMessageRight("E2008");
        //        return;
        //    }
        //    PageCommon.ModalOpen({
        //        id: "SupplierCostManage",
        //        title: '供应商费用管理',
        //        width: "600px",
        //        height: "450px",
        //        btn: ['保存', '取消'],
        //        url: '/Purchase/PurchaseSupplierSearch/SupplierCostManagement',
        //        urlparameter: "keyValue=" + selectRow[0].Supplier_Id,
        //        callBack: function (iframeId) {
        //            PageCommon.ChildrenFrames(iframeId).SupplierCostManage.Save()
        //        }
        //    })
        //},
        //导出
        Export: function (obj) {
            PageCommon.ModalExportOpen({
                tableName: 'B_Supplier',
                menu_Id: 'M000001',
                list_Id: 'PurchaseSupplierDetailList',
                systemKey: 'Purchase',
                vm: SupplierSearch
            })
        },
        Search: function (obj) {
            SupplierSearch.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000001", List_Id: "PurchaseSupplierDetailList" });
        },
        mClear: function () {
            //供应商申请单号
            this.Supplier_Name = '';
            this.Other_Name = '';
            this.Payway_Way = '';
            PageCommon.TableDefaultSort("PurchaseSupplierDetailList");
        }
    }
});