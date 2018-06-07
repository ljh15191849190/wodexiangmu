
var searchData = {};
var app = new Vue({
    el: '#apps',
    data: {
        //部门
        //Department_Id: '',
        Department_Name:'',
        //账号
        User_Name: '',
        //用户姓名
        Name: '',
        //表格查询条件
        searchModel: searchData,
        //表格查询url
        tableurl: 'SeachUser',
        //表头查询条件
        ColumHeaderSeach: {
            Menu_Id: "M000019",
            System_Key: "SystemSet"
        },
        //Departmentresult: ["Department_Id", "Department_Name"],
        //filedSearch: ["Department_Id", "Department_Name"],
        //mainOrderBy: [{ Field_Name: "Create_Time", Orderby: "Desc" }],
        //inputField: ["Department_Id", "Department_Name"],
        //手风琴数据
        //tabdatas:[
        //    { System_Id: '01', System_Name: '部门', UserAuthorityList: 'UserAuthorityList01', trrid: 'trrid01' },
        //    { System_Id: '02', System_Name: '事业部', UserAuthorityList: 'UserAuthorityList02', trrid: 'trrid02' },
        //    { System_Id: '03', System_Name: '库房', UserAuthorityList: 'UserAuthorityList03', trrid: 'trrid03' },
        //    { System_Id: '04', System_Name: '行业', UserAuthorityList: 'UserAuthorityList04', trrid: 'trrid04' },
        //    { System_Id: '05', System_Name: '地区', UserAuthorityList: 'UserAuthorityList05', trrid: 'trrid05' },
        //    { System_Id: '06', System_Name: '品牌', UserAuthorityList: 'UserAuthorityList06', trrid: 'trrid06' },
        //],
        tabdata01: {System_Id: '01', System_Name: '部门'},
        tabdata02: { System_Id: '02', System_Name: '事业部'},
        tabdata03: { System_Id: '03', System_Name: '库房' },
        tabdata04: { System_Id: '04', System_Name: '行业' },
        tabdata05: { System_Id: '05', System_Name: '地区' },
        tabdata06: { System_Id: '06', System_Name: '品牌' },
        //树形的高度
        treeheight: "",
        //树形url
        treeurl: "SearchTreeData",
        //修改树形状态url
        tree_statue_url: "SaveUserAuthority",
        //树id
        trrid01: [],
        trrid02: [],
        trrid03: [],
        trrid04: [],
        trrid05: [],
        trrid06: [],
        //部门id
        selectRow_UserId: "",
        //手风琴id
        selectTabsid:'01',
        isshowloading: false,
        message:'员工信息'
    },
    mounted: function () {
        this.trrid01 = ['', '01'];
        //页签高度设置
        $(".BasicInformation").height($(window).outerHeight() - $(".per_tit").height() - $(".per_search").height() - 218);
        var height = $(".BasicInformation").height($(window).outerHeight() - $(".per_tit").height() - $(".per_search").height() - 218);
        $(".BasicInformation").css("overflow-y", "scroll");
        if ($("#UserAuthorityList01,#UserAuthorityList02,#UserAuthorityList03,#UserAuthorityList04,#UserAuthorityList05,#UserAuthorityList01").height() > height) {
            $(".BasicInformation").attr("overflow-y", "scroll");
        }
        //页签折叠
        var vm = this;
        $('.BasicInformation').eq(0).slideDown();
        $(".title1").click(function () {
            app.selectTabsid = $(this).attr('tabsid');
            if ($(this).parent().find(".BasicInformation").css("display") == "none") {
                if (app["trrid" + app.selectTabsid][1] != app.selectTabsid || app["trrid" + app.selectTabsid][0] != app.selectRow_UserId) {
                    app["trrid" + app.selectTabsid] = [app.selectRow_UserId, app.selectTabsid];
                }
            }

            $(this).siblings(".BasicInformation").slideToggle();
            $(this).parent().siblings().find(".BasicInformation").slideUp();
            $(this).toggleClass("boder");
            $(this).parent().siblings().find("p").addClass("boder");
            $(this).parent().find("i").toggleClass("rotate");
            $(this).parent().siblings().find("i").addClass("rotate");

        })
        $(".Down").click(function () {
            var p=$(this).parent().find(".title1");
            app.selectTabsid = p.attr('tabsid');
            if ($(this).parent().find(".BasicInformation").css("display") == "none") {
                if (app["trrid" + app.selectTabsid][1] != app.selectTabsid || app["trrid" + app.selectTabsid][0] != app.selectRow_UserId) {
                    app["trrid" + app.selectTabsid] = [app.selectRow_UserId, app.selectTabsid];

                }
            }
            $(this).siblings(".BasicInformation").slideToggle();
            $(this).parent().siblings().find(".BasicInformation").slideUp();
            $(this).parent().find(".title1").toggleClass("boder");
            $(this).parent().siblings().find("p").addClass("boder");
            $(this).toggleClass("rotate");
            $(this).parent().siblings().find("i").addClass("rotate");
            
        })
        //控件拖动
        $('.form-group').arrangeable({
            dragSelector: '.space'
        });
        $("#searchForm").on("drag.end.arrangeable", function (sender, dragElement) {
            
        });
        this.selectRow()
       
    },
    methods: {
        //树的高度
        treeHeight: function () {
            //var treeHeight = $(window).outerHeight() - $("#UserAuthorityList01,#UserAuthorityList02,#UserAuthorityList03,#UserAuthorityList04,#UserAuthorityList05,#UserAuthorityList06").offset().top - 50;
            //this.treeheight = treeHeight;
            /*根据搜索区域显示隐藏变化树的高度*/
            $(".down")[0].addEventListener("click", function () {
                if ($(this).find("i").hasClass('rotate')) {
                    //app.treeheight = treeHeight;
                } else {
                    //app.treeheight = $(window).outerHeight() - $(".tile-body").outerHeight() - 80;
                }
            })
        },
        //关闭loading
        Floadingback: function () {
            this.isshowloading = false;
        },
        //开启loading
        Tloadingback: function () {
            this.isshowloading = true;
        },

        //选择行数据
        selectRow: function () {
            $("#UserAuthList").on("click", "tr", function () {
                var trr =[];

                if ($(this).hasClass("selected")) {
                    app.selectRow_UserId = "";
                } else {
                    //获取选中行数据
                    var selectRow = $.fn.dataTable.Api("#UserAuthList").row(this).data();
                    app.selectRow_UserId = selectRow.User_Id;
                }


                if (app["trrid" + app.selectTabsid][1] != app.selectTabsid || app["trrid" + app.selectTabsid][0] != app.selectRow_UserId) {
                    app["trrid" + app.selectTabsid] = [app.selectRow_UserId, app.selectTabsid];
                }


            })
        },
        //查询
        Search: function (obj) {
           app.searchModel = $("#searchForm").GetSearchModel();
            //app["trrid" + app.selectTabsid] = ['', app.selectTabsid];
        },
        //清空
        mClear: function () {
            app.User_Name = "";
            app.Name = "";
            //console.log($(".select2-selection__choice").html())
            //$(".select2-selection__choice").remove();
            app.Department_Name = "";
            //$('#Department_Id').val(null).trigger('change');
        },
        //复制
        mCopy: function () {
            var selectRow = PageCommon.GetTableSelectRow("UserAuthList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
          PageCommon.ModalOpen({
                id: "Copy",
                title: '用户数据权限',
                width: "950px",
                height: "580px",
                url: '/SystemSet/UserPermission/Clone',
                callBack: function (iframeId) {
                    //调用首页表示详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).vmClone.Save()
                }
            })
        },
        TemplateSelection: function (data) {
           
            this.Department_Id = data.Department_Id;
        }
    }
})
