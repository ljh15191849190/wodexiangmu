var keyValue1 = PageCommon.Request("keyValue1");
var keyValue2 = PageCommon.Request("keyValue2");
var keyValue3 = PageCommon.Request("keyValue3");
var keyValue = new Array();
keyValue.push(keyValue1)
keyValue.push(keyValue2)
keyValue.push(keyValue3)
    var vmCustomTableField = new Vue({
        el: '#apps',
        data: {
            S_Custom_Table_Field:{
                //表名
                Table_Name: '',
                //字段名
                Field_Name: '',
                //字段表示名
                Field_Show: '',
                //字段类型
                Field_Type: '',
                //字段长度
                Field_Length: '',
                //控件ID
                Control_ID: '',
                //控件类型
                Control_Type: '',
                //验证类型
                Validation_Type: '',
                //是否启用
                Is_Activate: '0',
                //是否主键
                Is_PrimaryKey:'0',
                //字段值
                Field_Value: '',
                //关联表名
                Relation_Table_Name: '',
                //初始值
                Initial_Value: '',
                //日期时间格式化
                Date_Format: '',
                //时间格式
                Time_Format: '',
                //小时点位数
                Decimals: '',
                //绑定表
                Bind_Table: '',
                //绑定字段
                Bind_Field_Value: '',
                //表示字段
                Bind_Field_Key: '',
                //是否状态字典
                Is_Status_Dictionary: '0',
                //查询区分
                Bind_Query_Kb: '0',
                //排序字段
                Sort_Field: '',
                //排序方式
                Sort_Order: '',
                //是否数据字典
                Is_Data_Dictionary: '0',
                //条件字段1
                Condition_Field1: '',
                //条件值1
                Condition_Value1: '',
                //条件字段2
                Condition_Field2: '',
                //条件值2
                Condition_Value2: '',
                //条件字段3
                Condition_Field3: '',
                //条件值3
                Condition_Value3: '',
                //条件字段4
                Condition_Field4: '',
                //条件值4
                Condition_Value4: '',
                //条件字段5
                Condition_Field5: '',
                //条件值5
                Condition_Value5: '',
                DataBase_Name:'ERP'
            },
            filedSearch: ["Table_Name"],
            //表名称下拉框显示字段
            Tableresult: ["Table_Name"],
            //TableNameInputField: ["Table_Name", "name"],
            //绑定表联动条件
            linkage: null,
            //表名联动条件
            linkage1:null,
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
            //修改数据传过来的id
            if (keyValue.length > 0 && keyValue[0]) {
                PageCommon.GetFormData({
                    url: "EditSeach",
                    param: { keyValue: keyValue },
                    success: function (data) {
                        vmCustomTableField.S_Custom_Table_Field = data;
                    }
                });
            }
        },
        methods: {
           
            Save: function (obj) {
                //数据验证
                if (!PageCommon.CheckPageInput()) {
                    return;
                }
                //提交数据到后台
                PageCommon.SubmitForm({
                    url: "Save"
                 , param: { customTableField: vmCustomTableField.S_Custom_Table_Field,"keyValue":[keyValue] }
                 , success: function () {
                     //判断编辑还是新增
                     if (!!!keyValue) {
                         PageCommon.Reload();
                     } else {
                         window.location.href = PageCommon.SetUrl("List");
                     }
                 }
                });
            },
            Return: function (obj) {
                window.location.href = PageCommon.SetUrl("List");
            },
            //表名搜索补全
            TemplateSelection: function (data) {
                if (data) {
                    vmCustomTableField.linkage1 = data.id;
                } else {
                    vmCustomTableField.linkage1 = "";
                }
            },
            //绑定表搜索补全
            TemplateSelection1: function (data) {
                if (data) {
                    vmCustomTableField.linkage = data.id;
                } else {
                    vmCustomTableField.linkage = "";
                }
            }
        }
    })