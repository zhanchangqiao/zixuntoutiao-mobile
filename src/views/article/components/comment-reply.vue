<template>
  <div class=''>
    <van-nav-bar
      :title="`${comment.reply_count}条评论`"
      left-text="返回"
      left-arrow
      @click-left="$emit('close', false)"
    />
    <comment-item :item="comment"/>
    <comment-list aorc="c" :articleid="comment.com_id" :list="commentList" style="margin-bottom: 55px" />
    <van-popup v-model="postreplyshow" position="bottom" :style="{ height: '14%' }">
      <post-comment :artid="comment.com_id" @input="onpost" :articleId="articleId"/>
    </van-popup>
    <div class="foot">
      <van-button round type="default" size="small" class="btn" @click="postreplyshow = true">写评论</van-button>
    </div>
  </div>
</template>
<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'
export default {
  name: 'Replycomment',
  props: {
    comment: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  data () {
    return {
      commentList: [],
      postreplyshow: false
    }
  },
  computed: {
  },
  methods: {
    onpost (data) {
      // 子组件传递发布成功的返回值，然后添加到评论列表中，
      // 然后传递给评论子组件渲染
      this.commentList.unshift(data)
      // 评论数量++
      this.comment.reply_count++
      // 关闭界面
      this.postreplyshow = false
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
.foot {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .btn {
    width: 70%;
  }
}
</style>
