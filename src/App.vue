<template>
  <div id="app">
    <keep-alive :include="cache">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cache'])
  }
}
</script>
<style lang="less">
</style>
