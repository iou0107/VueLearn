<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt"
    :value="inputValue" @change="handleInputChange" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) =>
          {cbStatusChanged(e, item.id)}">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
    }
  },
  // 页面的生命周期函数，在这里发起数据请求
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    // 监听文本框内容变化
    handleInputChange(e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 向列表中新增item项
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        // ui组件库提供的（Antd）
        return this.$message.warning('文本框的内容不能为空')
      } else {
        this.$store.commit('addItem')
      }
    },
    // 根据id删除对应的任务事项
    removeItemById(id) {
      this.$store.commit('removeItem', id)
    },
    // 监听复选框选中状态变化的事件
    cbStatusChanged(e, id) {
      // 通过e.target.checked可以接收到最新的选中状态
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    // 清楚已完成的任务
    clean() {
      this.$store.commit('cleanDone')
    },
    // 修改页面上展示的列表数据
    changeList(key) {
      // console.log(key)
      this.$store.commit('changeViewKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
