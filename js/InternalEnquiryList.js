
var Enqury_vue = new Vue({
    el: '#apps',
    data: {
        //客户
        Customer_Id: "",
        //商品名称
        Product_Name: '',
        productrange: {
            first: "",
            second: ""
        },
        //品牌
        Brand_Name: '',

        //任务人
        Employee_Id: '',

        //创建用户
        Create_User: '',
        //创建时间
        Create_Time: '',
        //归属部门
        Department_Id: '',
        //产品分类
        Product_Classify_Name: '',
        //产地名称
        Product_Area_Id: '',
        //油脂包装
        Package: '',
        Arearesult: ["Product_Area_Id", "Product_Area_Name"],
        AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
        AreaInputField: ["Product_Area_Id", "Product_Area_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //询价状态
        Enquiry_Price_Status: '',
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: { Where_Parameter_List: [{ Field_Name: "M_Consult_Price_Bill.Is_Purchase", Query_Type: "01", Expression: "02", Condition_Value1: "0" }] },
        columHeaderSeach: {
            Menu_Id: "M000001",
            System_Key: "Sale",
            List_Id: ""
        },
        //位数cookie
        globalParameter: {}
    },
    mounted: function () {
        var vm = this;
        vm.globalParameter = PageCommon.GlobalParameter();
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {

        });

    },
    methods: {
        //数字合计
        pagetotalback: function (Field_Name, a, b) {
            var vm = this;
            if (Field_Name === "Enquery_Count") {

                return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
            }
        },
        //表格行初始化
        columrender: function (Field_Name, value, type, rowData, rowSetting) {
            if (Field_Name === "Create_Time") {
                if (value) {
                    return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }
            }
            if (Field_Name === "Enquery_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }
            

            if (Field_Name === "Receive_Price") {
                if (!value) {
                    value = 0;
                }
                return PageCommon.NumberDispose(value, this.globalParameter.Price_Decimal, this.globalParameter.Money_Digital_Cut_Way);
            }
        },
        //查看
        CheckLook: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ConsultPriceBillList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Consult_Price_Bill_Id + '&sourcetype=0&isedit=1');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        },
        //新增
        New: function () {
            window.location.href = PageCommon.SetUrl("Detail");
        },
        //修改
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("ConsultPriceBillList");

            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //详细画面更新跳转
            window.location.href = PageCommon.SetUrlParameter("Detail", "relevantnumber=" + selectRow[0].Consult_Price_Bill_Id + '&sourcetype=0&isedit=0');//sourcetype：列表0、审核1、提醒2   isedit：0可修改 1不可修改

        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ConsultPriceBillList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Invalid",
                param: selectRow,
                type: '0',
                success: function () {
                    PageCommon.RefreshTablePage("ConsultPriceBillList");  //刷新数据
                },
                close: true
            })
        },
        //回复
        Reply: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("ConsultPriceBillList");
            console.log(selectRow);
            ////画面选择一条数据
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
                url: '/Sale/InternalEnquiry/InternalEnquiryReply',
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
        Export: function () {
            PageCommon.ModalExportOpen({
                tableName: 'M_Consult_Price_Bill_Detail',
                menu_Id: 'M000001',
                list_Id: 'ConsultPriceBillList',
                systemKey: 'Sale',
                vm: Enqury_vue
            })
        },
        //打印
        Print: function () {
        },
        //设置
        Set: function () {

            },
            //查询
            Search: function () {
                var searchData = $("#searchForm").GetSearchModel({ Menu_Id: "M000001", List_Id: "ConsultPriceBillList" });
                searchData.Where_Parameter_List.push({ Field_Name: "M_Consult_Price_Bill.Is_Purchase", Query_Type: "01", Expression: "02", Condition_Value1: "0" });
                Enqury_vue.searchModel = searchData;
            },
            //清除
            mClear: function () {
                this.Create_Time = '';
                this.Customer_Id = '';
                this.productrange.first = '';
                this.productrange.second = '';
                this.Brand_Name = '';
                this.Enquiry_Price_Status = '';
                this.Employee_Id = '';
                this.Department_Id = '';
                this.Create_User = '';
                this.Enquiry_Price_Status = '';
                this.Package = '';
                this.Brand_Name = '';
                this.Product_Classify_Name = '';
                this.Product_Area_Id = '';
                this.Create_Time = '';
                $('#Product_Area_Id').val(null).trigger('change');
                $('#Customer_Name').val(null).trigger('change');
                $('#Product_Name').val(null).trigger('change');
                $('#Brand_Name').val(null).trigger('change');
                $('#Employee_Id').val(null).trigger('change');
                $('#Department_Id').val(null).trigger('change');
                $('#Enquiry_Price_Status').val(null).trigger('change');
                PageCommon.TableDefaultSort("ConsultPriceBillList");
            }
        }
    });
