
//员工主键
var keyValue = PageCommon.Request("keyValue1");
var Department_Name = PageCommon.Request("keyValue2");
var Department_NameDetail = PageCommon.Request("keyValue3");
var Field_Name = PageCommon.Request("keyValue4");
var employeeListDetail = new Vue({
    el: '#app',
    data: {
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000014",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: {
            "Where_Parameter_List": [{
                Field_Name: Field_Name,
                Condition_Value1: keyValue,
                Expression: "02",
                Module_Id: "SystemSet",
                Query_Type: "01"
            }]
        },
        Department_Name: Department_Name,
        Department_NameDetail: Department_NameDetail
    }
});

