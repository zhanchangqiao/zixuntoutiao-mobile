<template>
  <div class=''>
    <van-picker
      title="选择性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      :default-index="value"
      :loading="loading"
    />
  </div>
</template>
<script>
import { Updatauserprofile } from '@/api/user.js'
export default {
  name: 'Updatasex',
  components: {
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      loading: false
    }
  },
  computed: {
  },
  methods: {
    async onConfirm (value, index) {
      console.log(index)
      this.loading = true
      await Updatauserprofile({
        gender: index
      })
      this.$emit('input', index)
      this.$emit('close')
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
