var searchData = {};
var vmGeography = new Vue({
    el: '#apps',
    data: {
        Create_Time:'',
        //地理名称
        Geography_Name: '',
        //地理简称
        Geography_Short_Name: '',
        //地理层级
        Search_First_Alphabet: '',
        //地理全拼
        Search_Full_Spell:'',
        //表头查询条件
        columHeaderSeach: {
            Menu_Id: "M000007",
            System_Key: "BasicData"
        },
        //表格查询条件
        searchModel: {},
        //表格查询url
        tableUrl: 'Seach',
        //AreaLayerDictionaryKey: 'AREA_LAYER'

    },
    mounted: function () {
        //大写换小写
        $("#Search_Full_Spell").keyup(function () {
            //判断是否为英文
            if (!/^([A-Za-z]+\s?)*[A-Za-z]$/.test($(this).val())) {
                $(this).val("");
            } else {
                //大写转小写
                var lower = $(this).val().toLowerCase();
                $(this).val(lower);
            }
        })
        //小写换大写
        $("#Search_First_Alphabet").keyup(function () {
            //判断是否为英文
            if (!/^([A-Za-z]+\s?)*[A-Za-z]$/.test($(this).val())) {
                $(this).val("");
            } else {
                //小写换大写
                var lower = $(this).val().toUpperCase();
                $(this).val(lower);
            }
        })

    },
    methods: {
        //新增
        New: function () {
            PageCommon.ModalOpen({
                id: "GeographyDetail",
                title: '地理关系新增',
                width: "555px",
                height: "280px",
                url: '/BasicData/Geography/Detail',
                callBack: function (iframeId) {
                    //调用地理关系详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).geography_vue.Save()
                }
            })
        },
        //删除
        Delete: function () {
            //获取选中行数据
            var selectRow = PageCommon.GetTableSelectRow("GeographyList");

            //调用删除共同方法
            PageCommon.SubmitDetialForm({
                url: "Delete",
                param: selectRow,
                success: function () {
                    PageCommon.RefreshTablePage("GeographyList");  //刷新数据
                },
                close: true,
            })
        },
        //修改
        Update: function () {
            //取得选择行数据
            var selectRow = PageCommon.GetTableSelectRow("GeographyList");
            //画面选择一条数据
            if (selectRow.length != 1) {
                PageCommon.ShowMessageRight("E2008");
                return;
            }
            //弹出框修改
            PageCommon.ModalOpen({
                id: "GeographyDetailUpdate",
                title: '地理关系修改',
                width: "555px",
                height: "280px",
                url: "/BasicData/Geography/Detail",
                urlparameter: "keyValue=" + selectRow[0].Geography_Id,
                callBack: function (iframeId) {
                    //调用地理关系详情页保存方法
                    PageCommon.ChildrenFrames(iframeId).geography_vue.Save()
                }
            })
        },
        //设置
        Set: function (obj) {

        },
        //查询
        Search: function (obj) {
            vmGeography.searchModel = $("#searchForm").GetSearchModel({ Menu_Id: "M000007", List_Id: "GeographyList" });
        },
        Clear: function () {
            this.Geography_Name = '';
            this.Search_Full_Spell = '';
            this.Search_First_Alphabet = '';
            this.Geography_Short_Name = '';
            this.Create_Time = '';
        }
    }
})