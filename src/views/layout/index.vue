<template>
  <div class=''>
    <router-view />
    <van-tabbar v-model="active" router>
      <van-tabbar-item icon-prefix="toutiao" icon="shouye" to="/">
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item
      icon-prefix="toutiao" icon="wenda" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item
      icon-prefix="toutiao"
      icon="shipin" to="/vadio">视频</van-tabbar-item>
      <van-tabbar-item
      icon-prefix="toutiao"
      icon="wode" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Layoutindex',
  components: {
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
  },
  methods: {
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
