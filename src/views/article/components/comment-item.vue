<template>
    <van-cell>
      <div slot="icon" class="left">
        <van-image
          round
          width="50px"
          height="50px"
          cover
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div slot="title" class="name">
        {{item.aut_name}}
      </div>
      <div slot="title">
        {{item.content}}
      </div>
      <div slot="label">
        {{item.pubdate | datetime('YYYY-MM-DD HH:mm:ss')}}
        <van-button round type="default" size="mini" @click="$emit('itemclick', item)">{{item.reply_count}}回复</van-button>
      </div>
      <div slot="right-icon" class="right">
        <van-icon :name="!item.is_liking ? 'good-job-o' : 'good-job'" size="15px" @click="onliking"/>
        <span>{{item.like_count}}</span>
      </div>
    </van-cell>
</template>
<script>
import { Setcommentlikings, Delcommentlikings } from '@/api/article.js'
// import CommentReply from './comment-reply.vue'
export default {
  name: 'Commentitem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    // CommentReply
  },
  data () {
    return {
      replyComment: {}
    }
  },
  computed: {
  },
  methods: {
    // 对评论点赞
    async onliking () {
      // 传递评论id
      if (this.item.is_liking) {
        // 那么就是取消点赞
        await Delcommentlikings(this.item.com_id)
        this.item.like_count--
      } else {
        // 那么就是点赞
        await Setcommentlikings(this.item.com_id)
        this.item.like_count++
      }
      this.item.is_liking = !this.item.is_liking
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
<style lang='less' scoped>
/deep/.van-cell__title {
  margin-left: 20px;
}
.left {
  display: flex;
  align-items: center;
}
/deep/.right {
  display: flex;
  align-items: center;
  i {
    font: 15px;
  }
  span {
    font-size: 15px;
    margin-left: 6px;
  }
}
.name {
  color:#406599;
  font-size: 12px;
}
</style>
