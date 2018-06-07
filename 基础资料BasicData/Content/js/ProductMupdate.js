//用户主键
var keyValue = PageCommon.Request("keyValue");
var mupdata_vue = new Vue({
    el: '#app',
    data: function () {
        return {
            oldevalue: "",
            newvalue: "",
            mupdata: ""
        }

    },

    mounted: function () {
        $("#typeSpecification").select2({
            placeholder: "请选择",
            allowClear: true,//删除x图标Production_Month
            minimumResultsForSearch: Infinity,
            templateSelection: function formatRepoSelection(repo) {
                if ($(repo.element).attr("value") == "Production_Month") {
                    return "生产月";
                }
                var ee = $(repo.element).attr("value");
                return ee;

            }
        });

        $("#typeSpecification").on("change", function () {
            mupdata_vue.mupdata = $(this).val();

        });
    },
    methods: {
        //保存系统画面数据
        Save: function () {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            }

            var array = [];

            array.push(vm.mupdata);
            array.push(vm.oldevalue);
            array.push(vm.newvalue);
            console.log(array)
            PageCommon.SubmitForm({
                url: "BatchEditProduct",
                param: { parameter: array },
                success: function (data) {
                    console.log(data)
                    //关闭iframe窗
                    PageCommon.ModalClose()
                    //刷新表格数据
                    PageCommon.CurrentWindow().PageCommon.RefreshTablePage("ProductList");


                }
            });
        },

    }
})