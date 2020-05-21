<template>
  <div class=''>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in commentlist" :key="index" :title="item.content">
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { Getcomments } from '@/api/comments.js'
export default {
  name: 'Commentlist',
  props: {
    articleid: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      offset: null,
      limit: 10,
      list: [],
      loading: false,
      finished: false,
      commentlist: []
    }
  },
  computed: {
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      const res = await Getcomments({
        type: 'a',
        source: this.articleid,
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      const result = res.data.data
      this.commentlist.push(...result.results)
      if (result.results.length === 0) {
        // 请求完了
        this.finished = true
      } else {
        // 没有完
        this.offset = result.last_id
      }
      // 请求完成loading完成
      this.loading = false
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
