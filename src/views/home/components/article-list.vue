<template>
  <div class=''>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <van-pull-refresh v-model="ispullLoading" @refresh="onRefresh"
      :success-duration="1500" :success-text="istext"
      >
      <article-item v-for="item in list" :key="item.art_id" :article="item" />
    </van-pull-refresh>
    </van-list>
  </div>
</template>
<script>
import { Loginarticles } from '@/api/articles.js'
import ArticleItem from '@/components/article-item/'
export default {
  name: 'Artcilelist',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      count: 0,
      ispullLoading: false,
      timestamp: null,
      istext: null
    }
  },
  computed: {
  },
  methods: {
    // 根据传入的频道对象
    async onLoad () {
      // 异步更新数据
      console.log(1)
      const res = await Loginarticles({
        channel_id: this.channel.id,
        timestamp: Date.now() || this.timestamp,
        with_top: 1
      })
      console.log(res)
      this.list.push(...res.data.data.results)
      // 加载状态结束
      this.loading = false
      // // 数据全部加载完成
      if (res.data.data.results.length) {
        this.timestamp = res.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      console.log(123)
      const res = await Loginarticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      console.log(res)
      this.list.unshift(...res.data.data.results)
      this.ispullLoading = false
      this.istext = `更新了${res.data.data.results.length}条数据`
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
.list {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
  // padding: 0px 10px;
}
</style>
