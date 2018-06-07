var vmDeleteReason = new Vue({
    el: '#app',
    data: {
        deleteReason: '',
    },
    methods: {
        Save: function () {
            var vm = this;
            //数据验证
            if (!PageCommon.CheckPageInput()) {
                return;
            } else {
                return vm.deleteReason;
            }
        }
    }
})
