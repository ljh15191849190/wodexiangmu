
var keyValue = PageCommon.Request("keyValue");
var UserPermission_vue = new Vue({
    el: '#app',
    data: {
        //树形的高度
        treeheight: "350",
        //树形url
        treeurl: PageCommon.SetUrl("/SystemSet/UserPermission/SearchTreeData"),
        //修改树形状态url
        tree_statue_url: PageCommon.SetUrl("/SystemSet/UserPermission/SaveUserAuthority"),
        //页签从外部传入的数据
        tabs: [{ System_Id: '01', System_Name: '角色' },
            { System_Id: '02', System_Name: '部门' },
            { System_Id: '03', System_Name: '事业部' },
            { System_Id: '04', System_Name: '品牌' },
            { System_Id: '05', System_Name: '仓库' },
            { System_Id: '06', System_Name: '工具栏' },
            { System_Id: '07', System_Name: '首页统计' }],
        //树id
        trrid: [],
        //角色id
        roleid: "",
        //页签id
        tabsid: "",
        isshowloading: false
    },
    methods: {
        //关闭loading
        Floadingback: function () {
            this.isshowloading = false;
        },
        //开启loading
        Tloadingback: function () {
            this.isshowloading = true;
        },
        //获取页签id
        tab: function (tabsid) {
            var trr = []
            this.tabsid = tabsid;

            if (keyValue) {
                this.roleid = keyValue;
            }
            trr[0] = this.roleid;
            trr[1] = this.tabsid;
            this.trrid = trr;
        }
    }
});
