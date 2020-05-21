<template>
  <div class=''>
    <van-cell-group>
      <van-cell title="搜索历史">
        <div>
          <span v-if="!isshowdelete" @click="$emit('updata', [])">全部删除</span>
          &nbsp;&nbsp;
          <span v-if="!isshowdelete" @click="isshowdelete = true">完成</span>
          <van-icon name="delete" v-if="isshowdelete" @click="isshowdelete = false"/>
        </div>
      </van-cell>
      <van-cell v-for="(item, index) in historylist" :key="index" :title="item" @click="ondelete(item, index)">
        <van-icon name="close" v-if="!isshowdelete"/>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
// import { setItem } from '@/until/storage.js'
export default {
  name: 'Searchhistory',
  props: {
    historylist: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      isshowdelete: true
    }
  },
  computed: {
  },
  methods: {
    ondelete (val, index) {
      // 点击历史记录
      // 判断是删除还是跳转
      if (this.isshowdelete) {
        // 那么就是跳转
        this.$emit('active', val)
      } else {
        // 那个就是删除
        this.historylist.splice(index, 1)
        this.$emit('updata', this.historylist)
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
