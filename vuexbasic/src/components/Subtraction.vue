<template>
    <div>
        <!-- <h3>当前最新的count值为：{{ count }}</h3> -->
        <h3>{{ showNum }}</h3>
        <button @click="handle1">-1</button>
        <button @click="subN(3)">-3</button>
        <button @click="subAsync">-1 Async</button>
        <button @click="handleAsyncN">-4 Async</button>
    </div>
</template>

<script>
// 导入vuex中的多个函数，中间用逗号分隔
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {};
    },
    computed: {
        // 多个全局变量就在数组中用逗号分隔
        ...mapState(['count']),
        ...mapGetters(['showNum'])
    },
    methods: {
        ...mapMutations(['sub', 'subN']),
        handle1: function() {
            this.sub()
        },
        ...mapActions(['subAsync', 'subAsyncN']),
        handleAsync: function() {
            this.subAsync()
        },
        handleAsyncN: function() {
            this.subAsyncN(4)
        }
    }
};
</script>
