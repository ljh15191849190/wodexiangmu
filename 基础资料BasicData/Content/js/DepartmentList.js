
var searchData = {};
var vmDepartment = new Vue({
    el: '#apps',
    data: {
        //部门名称
        Department_Name: "",
        //部门简称
        Department_short_Name: "",
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000001",
            System_Key: "BasicData"
        },
        //表格查询url
        tableUrl: "Seach",
        //表格查询条件
        searchModel: searchData,
        chartmodel: {},
        seachData : []
        
    },
    mounted:function(){
        this.linkClick();
        this.Getdata();
        $("#chart-container").height($(window).outerHeight()-50);
      
        
    },

    methods: {
        linkClick: function () {
            $('#chart-container').on('dblclick', '.node', function () {
                var index = $(this).parents("tr").index();
                var Department_Name = "部门名称";
                var Department_NameDetail = $(this).children(".title").text() +'('+ $(this).children(".content").text()+')';
                var Field_Name = "B_Employee.Department_Id";
                //弹出部门员工详情iframe窗
                PageCommon.ModalOpen({
                    id: "EmployeeListDetail",
                    title: '员工信息',
                    width: "900px",
                    height: "600px",
                    url: '/BasicData/Employee/EmployeeListDetail',
                    urlparameter: "keyValue1=" + vmDepartment.chartmodel.Department_Id + "&keyValue2=" + Department_Name + "&keyValue3=" + Department_NameDetail + "&keyValue4=" + Field_Name,
                    btn: [''],
                    btnclass: [''],
                    callBack: function (iframeId) {
                        //关闭弹窗
                        PageCommon.CurrentWindow().PageCommon.ChildrenFrames(iframeId).PageCommon.ModalClose();
                    }
                })
            })
        },

        Getdata: function () {
            var seachdata = { Pagination_Info: { Page_Size: 10 } }; 
            //数据返回
            var that = this;
            $.ajax({
                url: "../../BasicData/Department/Seach",
                type: 'post',
                dataType: 'json',
                data: { "searchModel": seachdata },
                success: function (result) {
                    var datascource = result.data[0];
                    vmDepartment.seachData = result.data;
                    $('#chart-container').html("");
                    $('#chart-container').orgchart({
                        'data': datascource,
                        'nodeTitle': 'Department_Name',
                        'nodeContent': 'Department_Short_Name',
                        'nodeId': 'Department_Id',
                          //'exportButton': true,
                          //'exportFilename': 'MyOrgChart'
                    });
                    $('#chart-container').on("click", ".node", function () {
                        vmDepartment.chartmodel.Department_Id = $(this).attr("id");
                        vmDepartment.chartmodel.Department_Name = $(this).children(".title").text();
                    });
                },
                error: function (e) {
                    console.log(e);
                }
            });

        },
        //新增部门名称
        New: function () {
            var that = this;
            if (that.seachData.length > 0)
                if (!$("#chart-container .node").hasClass("focused")) {               
                {
                    PageCommon.ShowMessageRight("I3068");
                    return;
                }               
            }

            //弹出部门详情iframe窗
            PageCommon.ModalOpen({
                id: "DepartmentDetailNew",
                title: '部门详细',
                width: "555px",
                height: "210px",
                url: '/BasicData/Department/Detail',
                callBack: function (iframeId) {
                    //调用部门详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).department_vue.Save();
                }
            })
            
          

        },
        //删除部门名称
        Delete: function () {
            var that = this;
            //获取选中行数据
            if (!$("#chart-container .node").hasClass("focused")) {
                PageCommon.ShowMessageRight("I3068");
                return;
            } else {
                  //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: [vmDepartment.chartmodel],
                success: function () {
                    that.Getdata();
                },
                close: true
            })
            }
          
        },
        //修改部门名称
        Update: function () {
            var that = this;
            //画面选择一条数据
            if (!$("#chart-container .node").hasClass("focused")) {
                PageCommon.ShowMessageRight("I3068");
                return;
            } else {
                //弹出部门详情iframe窗
                PageCommon.ModalOpen({
                    id: "DepartmentDetailUpdate",
                    title: '部门详细',
                    width: "555px",
                    height: "210px",
                    url: "/BasicData/Department/Detail",
                    urlparameter: "keyValue=" + vmDepartment.chartmodel.Department_Id,
                    callBack: function (iframeId) {
                        //调用部门详情页保存方法
                        PageCommon.ChildrenFrames(iframeId).department_vue.Save();
                    }
                })
            }
          
        },
      
        //部门设置
        Set: function () {

        },

    }
});