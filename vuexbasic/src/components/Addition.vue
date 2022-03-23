<template>
    <div>
        <!-- <h3>当前最新的count值为：{{ $store.state.count }}</h3> -->
        <h3>{{ this.$store.getters.showNum }}</h3>
        <button @click="handle1">+1</button>
        <button @click="handleN">+3</button>
        <button @click="handleAsync">+1 Async</button>
        <button @click="handleAsyncN">+2 Async</button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handle1: function() {
            // commit的作用就是调用mutations中的某个方法
            this.$store.commit('add')
        },
        handleN: function() {
            this.$store.commit('addN', 3)
        },
        handleAsync() {
            // dispatch函数专门触发action中的某个函数
            this.$store.dispatch('addAsync')
        },
        handleAsyncN() {
            // dispatch函数专门触发action中的某个函数
            this.$store.dispatch('addAsyncN', 2)
        }
    }
};
</script>
