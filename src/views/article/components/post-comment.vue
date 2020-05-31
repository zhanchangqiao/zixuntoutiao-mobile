<template>
  <div class=''>
    <van-field
      v-model.trim="postmessage"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
      <template #button>
        <van-button size="small" type="primary" :disabled="postmessage === '' ? true : false" @click="postmsg()">发布</van-button>
      </template>
    </van-field>
  </div>
</template>
<script>
import { Postcomment } from '@/api/comments.js'
export default {
  name: 'Postcomment',
  props: {
    artid: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  components: {
  },
  data () {
    return {
      postmessage: '',
      isdisable: true
    }
  },
  computed: {
  },
  methods: {
    async postmsg () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true // 禁止背景点击
      })
      const res = await Postcomment({
        target: this.artid.toString(),
        content: this.postmessage,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(res)
      this.$emit('input', res.data.data.new_obj)
      this.$toast.success('发布成功')
      this.postmessage = ''
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
