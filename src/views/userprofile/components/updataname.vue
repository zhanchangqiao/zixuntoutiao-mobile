<template>
  <div class=''>
    <van-field
      v-model.trim="value"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    >
      <template #button>
        <van-button size="small" type="primary" :disabled="value === '' ? true : false" @click="updata()">修改</van-button>
      </template>
    </van-field>
  </div>
</template>
<script>
import { Updatauserprofile } from '@/api/user.js'
export default {
  name: 'Updataname',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      // name: ''
    }
  },
  computed: {
  },
  methods: {
    async updata () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      try {
        const res = await Updatauserprofile({
          name: this.value
        })
        this.$emit('input', this.value)
        this.$emit('close')
        console.log(res)
        this.$toast.success('修改成功')
      } catch (err) {
        console.log(err)
        if (err && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
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
<style lang='scss' src=''>
</style>
