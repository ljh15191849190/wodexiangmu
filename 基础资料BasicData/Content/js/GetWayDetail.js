
//主键
var keyValue = PageCommon.Request("keyValue");
var vmGetWay = new Vue({
    el: '#app',
    data: {
        B_Get_way: {
            //获取途径名称
            Get_Way_Name: "",
            //父途径
            Parent_Get_Way_Id: '',
            //备注
            Remark: ''
        },
        //获取途径下拉框显示字段
        GetWayResult: ["Get_Way_Id", "Get_Way_Name"],
        //获取途径下拉框查询条件
        GetWaySearch: ["Get_Way_Id", "Get_Way_Name"],
        //获取途径排序条件
        GetWayOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //获取途径下拉框检索字段
        GetWayField: ["Get_Way_Id", "Get_Way_Name"],
        GetWayWhere: [{}],
    },
    mounted: function () {
        //修改数据传过来的id
        if (keyValue) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: [keyValue] },
                success: function (data) {
                    vmGetWay.B_Get_way = data;
                }
            });
        }
    },
    methods: {
        //保存获取途径画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                param: {
                    "cutomerGetway": vmGetWay.B_Get_way
                },
                success: function () {
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("CustomerGetWayList");
                }
            });
        },
      
    }
})
