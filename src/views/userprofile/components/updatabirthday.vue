<template>
  <div class=''>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onconfirm"
      :loading="loading"
    />
  </div>
</template>
<script>
import { Updatauserprofile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'Updatabirthday',
  components: {
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
      loading: false
    }
  },
  computed: {
  },
  methods: {
    async onconfirm () {
      this.loading = true
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      const res = await Updatauserprofile({
        birthday: date
      })
      console.log(res)
      this.$emit('input', date)
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
