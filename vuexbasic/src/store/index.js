import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 提供唯一公共数据
  state: {
    // 组件访问state数据方式
    // 1、this.$store.state.全局数据名称
    // 2、从vuex中导入mapState函数，映射为当前组件的computed计算属性
    count: 0
  },
  // 只有Mutations中定义的函数才有权利修改state的数据
  // 变更store中的数据，原因：规范，集中监控所有数据变化
  // 触发mutations的方式：
  // 1、在mutations定义一个方法，组件中调用该方法，this.$store.commit('方法名')
  // 2、从vuex导入mapMutations函数，映射为当前组件的methods方法
  mutations: {
    add(state) {
      // 变更状态
      // 延时器，前端+1，前台vue调试器还是0，因为mutations不能写异步代码，不能执行异步操作
      // setTimeout(() => {
        state.count++
      // }, 1000)
    },
    addN(state, step) {
      state.count += step
    },
    sub(state) {
      state.count--
    },
    subN(state, step) {
      state.count -= step
    }
  },
  // 用于处理异步任务，处理异步操作必须通过Action而不能使用Mutations
  // 但还是要在Action种通过触发Mutations的方式间接变更数据
  // 触发Action的方式：
  // 1、组件中写一个方法调用当前方法，this.$store.dispatch('addAsync')
  // 2、从vuex中导入mapActions函数，映射为当前组件的methods方法
  actions: {
    addAsync(context) {
      // 在Action中不能直接修改store中的数据，而是要通过context.commit()触发某个Mutations才行
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addAsyncN(context, step) {
      // 参数法
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subAsyncN(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  // 对store中的数据进行加工处理形成新的数据，不会修改store中的数据，相当于计算属性
  // 使用getters的方式：
  // 1、this.$store.getters.名称
  // 2、从vuex导入mapGetters，映射为当前组件的computed计算属性
  getters: {
    showNum(state) {
      return '当前最新的数量是【' + state.count + '】'
    }
  },
  modules: {
  }
})
