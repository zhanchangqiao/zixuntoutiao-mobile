<template>
  <div class='search-result'>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多"
    @load="onload"
    >
    <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
  </van-list>
  </div>
</template>
<script>
import { Searchresult } from '@/api/search.js'
export default {
  name: 'Searchresult',
  props: {
    search: {
      type: String,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  computed: {
  },
  methods: {
    async onload () {
      const res = await Searchresult({
        page: this.page,
        per_page: this.per_page,
        q: this.search
      })
      console.log(res)
      this.list.push(...res.data.data.results)
      this.loading = false
      if (this.list.length !== res.data.data.total_count) {
        this.page++
      } else {
        this.loading = true
      }
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
<style lang='less'>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 58px;
  overflow-y: auto;
}
</style>
