<template>
  <div class=''>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
        @cancel="$router.back()"
        background="#3296FA"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="resultshow" :search="value"></search-result>
    <!-- 联想建议 -->
    <search-item v-else-if="value" :value="value" @search="onSearch"></search-item>
    <!-- 搜索历史 -->
    <search-history @updata="historylist = $event" v-else :historylist="historylist" @active="onSearch"></search-history>
  </div>
</template>
<script>
import SearchItem from './components/search-item.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { Searchhistory, Searechdelete } from '@/api/search.js'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/until/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchItem,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      value: '',
      resultshow: false,
      itemlist: [], // 联想列表
      historylist: [] // 历史记录列表
    }
  },
  created () {
    this.loadhistory()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch (val) {
      this.value = val
      const index = this.historylist.indexOf(val)
      if (index !== -1) {
        this.historylist.splice(index, 1)
      }
      this.historylist.unshift(val)
      setItem('user-history', this.historylist)
      this.resultshow = true
    },
    onCancel () {
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    async loadhistory () {
      let history = getItem('user-history') || []
      if (this.user) {
        // 登录了
        const res = await Searchhistory()
        history = [...new Set([...res.data.data.keywords, ...history])]
      }
      this.historylist = history
    }
  },
  watch: {
    async historylist () {
      // console.log(this.historylist)
      if (this.historylist.length === 0) {
        // 就是全部删除
        console.log('全部')
        const res = await Searechdelete()
        console.log(res)
      } else {
        // 就是部分删除
        // setItem('user-history', this.historylist)
        console.log('部分')
      }
      setItem('user-history', this.historylist)
    }
  },
  mounted () {
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' src=''>
</style>
