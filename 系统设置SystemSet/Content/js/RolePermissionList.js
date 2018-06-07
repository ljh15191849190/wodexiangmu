
var keyValue = PageCommon.Request("keyValue");
var permission_vue = new Vue({
    el: '#app',
    data: {
        //树形的高度
        treeheight: "350",
        //树形url
        treeurl: PageCommon.SetUrl("/SystemSet/RolePermission/RolePermissionAllSearch"),
        //修改树形状态url
        tree_statue_url: PageCommon.SetUrl("/SystemSet/RolePermission/SaveRolePermission"),
        //页签url
        tabs_url:  PageCommon.SetUrl("/SystemSet/RolePermission/SystemSearch"),
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
