<template>
  <div class='artlist' ref="container">
    <van-pull-refresh v-model="ispullLoading" @refresh="onRefresh"
      :success-duration="1500" :success-text="istext" ref="artlist"
      >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="list"
        ref="list"
      >
        <article-item v-for="(item, index) in list" :key="index" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Loginarticles } from '@/api/articles.js'
import ArticleItem from '@/components/article-item/'
import { debounce } from 'lodash'
export default {
  name: 'Artcilelist',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: [String, Number, Object],
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
      istext: null,
      scrolltop: 0
    }
  },
  computed: {
  },
  activated () {
    const container = this.$refs.container
    container.scrollTop = this.scrolltop
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
    const container = this.$refs.container
    container.onscroll = debounce(() => {
      this.scrolltop = container.scrollTop
    }, 50)
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {} // 生命周期 - 销毁完成
}
</script>
<style lang='less'>
.artlist {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
  // padding: 0px 10px;
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
content: "";
display: block;
height: 0;
clear:both;
visibility: hidden;
}
.clearfix{
 zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
</style>
