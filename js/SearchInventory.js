  var vmDistributed = new Vue({
        el: '#app',
        data: {
            //型号规格
            Product_Name: '',
            productrange: {
                first: "",
                second: ""
            },
            //产品分类名称
            Product_Classify_Id:'',
            //品牌
            Brand_Name:'',
            //产地名称
            Product_Area_Id:'',
            //油脂包装
            Package: '',
            //单据类型
            Bill_Type:'',

            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            Arearesult: ["Product_Area_Id", "Product_Area_Name"],
            AreaFiledSearch: ["Product_Area_Id", "Product_Area_Name"],
            AreaInputField: ["Product_Area_Id", "Product_Area_Name"],
            //对象类型
            Apply_Object_Code: '',
            //对象名称
            Object_Id:'',
            //客户名称
            Customer_Id:'',
            //员工名称
            Employee_Id:'',
            //部门名称
            Department_Id:'',
            //区域名称
            Geography_Id:'',
            mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
            //区域查询条件
            AreaWhere: [{
                Field_Name: "Parent_Geography_Id",
                Value1: '-1',
                Expression: '02',
                Query_Type: '01',
            }],

            //区域排序
            AreaOrder: [{
                Field_Name: "Geography_Id",
                Orderby: "ASC"
            }],
            //区域显示字段
            AreaResult: ["Geography_Id", "Geography_Name"],
            //部门
            Departmentresult: ["Department_Id", "Department_Name"],
            DepartmentfiledSearch: ["Department_Id", "Department_Name"],
            DepartmentinputField: ["Department_Id", "Department_Name"],
            //表头查询条件
            columHeaderSeach: {
                Menu_Id: "M0000010",
                System_Key: "Sale"
            },
            //表格查询url
            tableUrl: "InventorySeach",
            //表格查询条件
            searchModel: {

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
            //申请对象编码选择
            ApplyObject: function (val) {

                if (val.id == "01") {
                    $(".Customer").show();
                    $(".Department").hide();
                    $(".Applier").hide();
                    $(".Area").hide();

                }
                else if (val.id == "03") {
                    $(".Customer").hide();
                    $(".Department").show();
                    $(".Applier").hide();
                    $(".Area").hide();

                }
                else if (val.id == "02") {
                    $(".Customer").hide();
                    $(".Department").hide();
                    $(".Applier").show();
                    $(".Area").hide();

                } else if (val.id == "04") {
                    $(".Customer").hide();
                    $(".Department").hide();
                    $(".Applier").hide();
                    $(".Area").show();

                }
            },
            //数字合计
            totalback: function (Field_Name, a, b) {
                var vm = this;
                if (Field_Name === "Distribute_Count" || Field_Name === "Distribute_Handle_Count") {

                    return [PageCommon.NumberDispose(a, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), PageCommon.NumberDispose(b, vm.globalParameter.Count_Decimal, vm.globalParameter.Count_Digital_Cut_Way), vm.globalParameter.Count_Decimal];
                }
               

            },
            //表格行初始化
            columrender: function (Field_Name, value, type, rowData, rowSetting) {
                //销售数量 退货数量
                if (Field_Name === "Distribute_Count" || Field_Name === "Distribute_Handle_Count") {
                    if (!value) {
                        value = 0;
                    }
                    return PageCommon.NumberDispose(value, this.globalParameter.Count_Decimal, this.globalParameter.Count_Digital_Cut_Way);
                }


            },

            //查询
            Search: function () {
                if (vmDistributed.Apply_Object_Code == "01") {
                    vmDistributed.Object_Id = vmDistributed.Customer_Id;
                }else if(vmDistributed.Apply_Object_Code == "02"){
                    vmDistributed.Object_Id = vmDistributed.Employee_Id;
                }else if(vmDistributed.Apply_Object_Code == "03"){
                    vmDistributed.Object_Id = vmDistributed.Department_Id;
                } else if (vmDistributed.Apply_Object_Code == "04") {
                    vmDistributed.Object_Id = vmDistributed.Geography_Id;
                }
                vmDistributed.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M0000010", List_Id: "DistributedList" });
            },
            //清除
            mClear: function () {
                this.productrange.first = '';
                this.productrange.second = '';
                this.Product_Classify_Id = '';
                this.Apply_Object_Code = '';
                this.Brand_Name = '';
                this.Customer_Id = '';
                this.Employee_Id = '';
                this.Department_Id = '';
                this.Geography_Id = '';
                this.Package = '';
                this.Product_Area_Id = '';
                this.Bill_Type = '';
                $('#Product_Name').val(null).trigger('change');
                $('#Product_Classify_Id').val(null).trigger('change');
                $('#Brand_Id').val(null).trigger('change');
                $('#Product_Area_Id').val(null).trigger('change');
                $('#Apply_Object_Code').val(null).trigger('change');
                $('#Customer_Id').val(null).trigger('change');
                $('#Employee_Id').val(null).trigger('change');
                $('#Department_Id').val(null).trigger('change');
                $('#Geography_Id').val(null).trigger('change');
                $('#Bill_Type').val(null).trigger('change');
                PageCommon.TableDefaultSort("DistributedList");
            }
        }
    });
