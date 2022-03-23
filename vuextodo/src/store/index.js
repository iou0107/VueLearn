import Vue from 'vue'
import Vuex from 'vuex'
// axios发起请求是一个异步操作
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    // 下一个id
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为state中的inputValue赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除列表项
    removeItem(state, id) {
      // 根据id查找对应项的索引
      const index = state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const index = state.list.findIndex(x => x.id === param.id)
      if (index !== -1) {
        state.list[index].done = param.status
      }
    },
    // 清除已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('./list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 按需返回用户所需要的数据
    infoList(state) {
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      } else {
        // 当切换done时，返回list，为防止报错，默认也返回list
        return state.list
      }
    }
  }
})
