<template>
  <div class=''>
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <comment-item v-for="(item,index) in list" :key="index" :item="item" @itemclick="$emit('itemclick', $event)"/>
    </van-list>
  </div>
</template>
<script>
import { Getcomments } from '@/api/comments.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'Commentlist',
  props: {
    articleid: {
      type: [String, Number, Object],
      required: true
    },
    aorc: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      offset: null,
      limit: 10,
      loading: false,
      finished: false,
      commentlist: []
    }
  },
  computed: {
  },
  created () {
    // this.onLoad()
  },
  methods: {
    async onLoad () {
      const res = await Getcomments({
        type: this.aorc,
        source: this.articleid.toString(),
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      const result = res.data.data
      this.list.push(...result.results)
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
