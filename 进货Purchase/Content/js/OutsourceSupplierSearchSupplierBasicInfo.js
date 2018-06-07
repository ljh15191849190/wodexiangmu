var Supplier_vue = new Vue({
    el: '#app',
    data: {
        isdelete_img: true,
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        B_Supplier: {
            Delete_File_Model_List: [],
            //供应商类型
            Supplier_Type: '0',//统购0 外购1
            //供应商id
            Supplier_Id: "",
            //供应商名称
            Supplier_Name: "",
            //其他抬头
            Other_Name: "",
            //供应商网址
            Supplier_Website: "",
            //备注
            Remark: "",
            //总余额
            All_Balance: "",
            //预付款
            Advance_Payment: "",
            //贷款余额
            Goods_Payment_Balance: "",
            //地址
            Supplier_Address: '',
            //详细地址
            Detail_Address: '',
            //地址编码集合
            Address_Code_Gather: '',
            //地址集合
            Address_Gather: '',
            //明细
            B_Supplier_Apply_List: [{
                //备注
                Remark: ""
            }],
            B_Supplier_Bank_List: [{
                //开户银行
                Bank: '',
                //银行账号
                Bank_Account: '',
                //供应商税号
                Supplier_Tax_Number: ''
            }],
            B_Supplier_Payway_List: [{
                //结算方式
                Payway: '01',
                //日结天数
                Pay_Day_Count: '',
                //月结月数
                Pay_Month_Count: '',
                //分段日
                Subsrction_Day: '',
                //超期日
                Extended_Day: ''
            }]
        },
        addressCommon: {
            //收件人省份
            province: '',
            //收件人城市
            city: '',
            //收件人区/县
            district: '',
            Address: '',
            //收件人详细地址
            DetailAddress: '',
            //坐标
            point_lng: '',
            point_lat: ''
        },
        //父供应商查询条件
        Menuresult: ["Supplier_Id", "Supplier_Name"],
        filedSearch: ["Supplier_Id", "Supplier_Name"],
        mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        inputField: ["Supplier_Id", "Supplier_Name"],
        //结算方式
        PaywayDictionaryKey: "PAY_WAY",
        Day_Count: true,
        Month_Count: true,
        isshade: true
    },
    mounted: function () {
        this.isdelete_img = false;
        //控件拖动
        $('.drag_1').arrangeable({
            dragSelector: '.space'
        });
        $('.drag_2').arrangeable({
            dragSelector: '.space'
        });
        $('.drag_3').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        $(".down_tab").click(function () {
            $(this).find("i").toggleClass('rotate');
            $(this).parent().next().toggle();
            $(this).parent().toggleClass("boder");
        })
        this.B_Supplier = parent.SupplierInfo.SupplierData;
        this.addressCommon.Address = parent.SupplierInfo.SupplierData.Supplier_Address;
        this.addressCommon.DetailAddress = parent.SupplierInfo.SupplierData.Detail_Address;
        this.File_Model_List = parent.SupplierInfo.SupplierData.File_Model_List;
        if (this.B_Supplier.B_Supplier_Payway_List[0].Payway == '01') {
            this.Day_Count = true;
            this.Month_Count = false;
        } else if (this.B_Supplier.B_Supplier_Payway_List[0].Payway == '02') {
            this.Month_Count = true;
            this.Day_Count = false;
        }
    },
    methods: {
        //结算方式返回函数
        ChangePayway: function (val) {
            if (val.id == '01') {
                Supplier_vue.Day_Count = true;
                Supplier_vue.Month_Count = false;
            } else if (val.id == '02') {
                Supplier_vue.Month_Count = true;
                Supplier_vue.Day_Count = false;
            } else {
                Supplier_vue.Month_Count = true;
                Supplier_vue.Day_Count = true;
            }
        },
        //父供应商返回函数
        TemplateSelection: function (data) {
            this.B_Supplier.Supplier_Id = data.id;
        }
    }
});
