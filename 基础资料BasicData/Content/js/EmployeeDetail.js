//员工主键
var RequestValue = PageCommon.Request();
if (RequestValue.relevantnumber) {
    //判断传的参数的是2个还是1个
    var relevantnumber = RequestValue.relevantnumber;
    if (relevantnumber.indexOf(',') != -1) {
        relevantnumber = relevantnumber.split(",");
    } else {
        relevantnumber = [relevantnumber];
    }
}
//判断是点击了保存按钮
if (RequestValue.save) {
    var save = RequestValue.save;
}
var employee_vue = new Vue({
    el: '#apps',
    data: {
        isdelete_img: true,
        formData: '',
        File_Model_List: [{
            //Base64_Imgage: ''
        }],
        B_Employee: {
            //员工id
            Employee_Id: "",
            Query_Code: "",
            //员工照片
            Employee_Photo:"",
            //员工姓名
            Name: "",
            //员工性别
            Sex: "",
            //员工工龄
            //Work_Age:"",
            //部门id
            Department_Id: "",
            //事业部id
            Business_Department_Id: "",
            //员工类型
            Employee_Type: "",
            //员工出生日期
            Birthday: "",
            //员工入职日期
            Entry_Date: "",
            //员工离职日期
            Leave_Date: "",
            //员工电话
            Cellphone: "",
            //员工邮箱
            Email: "",
            //员工传真
            Fax: "",
            //员工办公电话
            Office_Telephone: "",
            //员工微信号
            Wechat: "",
            //是否启用
            Is_Activate: "0",
            //备注
            Remark: "",
             //员工家庭地址
            Address: "",
            //地址集合编码
            Address_Code_Gather: '',
            Address_Gather: "",
            //员工所在地区
            Area: "",
            //员工所在省/直辖市
            Province: "",
            //员工所在城市
            City: "",
            //员工所在区县
            District_County: "",
            //家庭地址
            Home_Address: '',
            Position_Id:"",
            //员工详细地址
            Detail_Address: "",
            //员工头像
            Delete_File_Model_List:[]

        },
        receiveCommon: {
            //收件人省份
            province: ' ',
            //收件人城市
            city: ' ',
            //收件人区/县
            district: ' ',
            Address: '',
            //收件人详细地址
            DetailAddress: '',
            point_lng: '',
            point_lat: '',
        },
        //地址code
        addressCodegather: '',
        param: true,
        param1: true,
        //职位
         PositionResult: ["Position_Id", "Position_Name"],
        PositionSearch: ["Position_Id", "Position_Name"],
        PositionOrder: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        PositionField: ["Position_Id", "Position_Name"],
        //部门下拉框显示字段
        DepartmentResult: ["Department_Id", "Department_Name"],
        //部门下拉框查询条件
        DepartmentSearch: ["Department_Id", "Department_Name"],
        //部门排序条件
        DepartmentOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //部门下拉框检索字段
        DepartmentField: ["Department_Id", "Department_Name", "Department_Short_Name"],
        //事业部下拉框显示字段
        Business_DepartmentResult: ["Business_Department_Id", "Business_Department_Name"],
        //事业部下拉框查询条件
        Business_DepartmentSearch: ["Business_Department_Id", "Business_Department_Name"],
        //事业部排序条件
        Business_DepartmentOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //事业部下拉框检索字段
        Business_DepartmentField: ["Business_Department_Id", "Business_Department_Name"],
        //员工类型下拉框
        EmployeeDictionaryKey: "DEPADEPARTMENT_TYPE",
        //性别下拉框
        SexDictionaryKey: "SEX",
        //是否显示保存按钮
        btnSave: true,
        //是否显示返回按钮
        btnBack: true,
        //是否显示设置按钮
        btnSet: true,
    },
    computed: {
        Address_Gather: function () {
            return this.receiveCommon.Address;
        },
        Home_Address: function () {
            return this.receiveCommon.Address;
        },
        Detail_Address: function () {
            return this.receiveCommon.DetailAddress;
        },
        Address_Code_Gather: function () {
            return this.receiveCommon.province + '-' + this.receiveCommon.city + '-' + this.receiveCommon.district;
        },
        Longitude: function () {
            return this.receiveCommon.point_lng;
        },
        Latitude: function () {
            return this.receiveCommon.point_lat;
        },
        Age: function () {
            if (this.B_Employee.Birthday) {
                var nowYear = new Date().getFullYear();
                var nowMonth = new Date().getMonth() + 1;
                var nowDay = new Date().getDate();
                var year = this.B_Employee.Birthday.substring(0, 4);
                var month = this.B_Employee.Birthday.substring(5, 7);
                var day = this.B_Employee.Birthday.substring(8, 10);
                var Age = new Date().getFullYear() - year;
                if (Age >= 0) {
                    if (month <= nowMonth && day <= nowDay) {
                        Age++;
                    }
                    return Age.toString();

                } else {
                    return "0";
                }
            }
        },
        Work_Age: function () {
            if (this.B_Employee.Entry_Date) {

                var UToTime = this.B_Employee.Entry_Date;
                var aDate = UToTime.split("-");
                var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                var myDate = new Date();
                //时间相减得到毫秒值
                var dif = myDate.getTime() - NewDate.getTime();
                myDate.setTime(dif);
                if (dif >= 0) {
                    return myDate.getFullYear() - 1970 + "年" + myDate.getMonth() + "月" + (myDate.getDate() - 1) + "日";
                } else {
                    return  "0";
                }
            }
        }
    },
    mounted: function () {
     
        //控件拖动
        $('.base').arrangeable({
            dragSelector: '.space'
        });
        $('.contact').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            //console.log(b)
            //console.log(c);
        });
        //修改数据传过来的id
        var vm = this;
        if (relevantnumber) {
            PageCommon.GetFormData({
                url: "EditSeach",
                param: { keyValue: relevantnumber },
                success: function (data) {
                    employee_vue.B_Employee = data;
                    employee_vue.File_Model_List = data.File_Model_List;
                    var addressArr = data.Address_Code_Gather.split('-');
                    employee_vue.receiveCommon = {
                        Address: data.Address_Gather,
                        DetailAddress: data.Detail_Address,
                        province: addressArr[0],
                        city: addressArr[1],
                        district: addressArr[2],
                    }
                    if (employee_vue.B_Employee.Birthday) {
                        employee_vue.B_Employee.Birthday = moment(employee_vue.B_Employee.Birthday).format("YYYY-MM-DD")
                    }
                    if (employee_vue.B_Employee.Entry_Date) {
                        employee_vue.B_Employee.Entry_Date = moment(employee_vue.B_Employee.Entry_Date).format("YYYY-MM-DD")
                    }
                    if (employee_vue.B_Employee.Leave_Date) {
                        employee_vue.B_Employee.Leave_Date = moment(employee_vue.B_Employee.Leave_Date).format("YYYY-MM-DD")
                    }
                    //判断状态
                    PageCommon.EditStatus({
                        vm: vm,
                        lookCallBack: function () {

                        }
                    });

                }
            });
        }
        
    },
    methods: {
        backfd: function (fd, deletedata) {
            var vm = this;
            if (deletedata) {
                vm.B_Employee.Delete_File_Model_List = deletedata;
            }
            vm.formData = fd;
        },
        onchange: function (val) {
            this.B_Employee.Query_Code = val;
        },
        TemplateSelectionEmployee_Type: function (data) {
            this.B_Employee.Employee_Type = data.id;
        },
        //保存员工画面数据
        Save: function () {
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }
            var vm = this;
            var addressArr = this.receiveCommon.Address.split('-');
            var address = '';
            for (var i = 0; i < addressArr.length; i++) {
                address += addressArr[i];
            }
            employee_vue.B_Employee.Home_Address = address + this.Detail_Address;
            employee_vue.B_Employee.Detail_Address = this.Detail_Address;
            employee_vue.B_Employee.Address_Gather = this.Address_Gather;
            employee_vue.B_Employee.Address_Code_Gather = this.Address_Code_Gather;
            employee_vue.B_Employee.Longitude = this.Longitude;
            employee_vue.B_Employee.Latitude = this.Latitude;

            //提交数据到后台
            vm.formData.delete('employee');
            //employee_vue.B_Employee.Delete_File_Model_List = [];
            var data = JSON.stringify(employee_vue.B_Employee);
            vm.formData.append('employee', data);
            //提交数据
            PageCommon.SubmitForm({
                url: "Save",
                type: "2",
                 param: vm.formData,
                success: function () {
                    //判断新增还是修改
                    if (!!!relevantnumber) {
                        PageCommon.Reload();
                    } else {
                        window.location.href = PageCommon.SetUrl("List");
                    }
                }
            });
        },
        Set:function(){

        },
        //返回列表画面
        Back: function () {
            //window.location.href = PageCommon.SetUrl("List");
            PageCommon.BackFormMessge("List");
        },
    }
});

