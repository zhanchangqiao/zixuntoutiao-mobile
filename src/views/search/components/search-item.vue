<template>
  <div class=''>
    <van-cell-group>
      <van-cell v-for="(value,index) in itemlist" :key="index" @click="$emit('search', value)">
        <div v-html="hightlight(value)"></div>
        <template #icon>
          <van-icon name="search" style="line-height: inherit;" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { Searchitem } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchItem',
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
      itemlist: []
    }
  },
  computed: {
  },
  methods: {
    hightlight (val) {
      const zz = new RegExp(this.value, 'gi')
      return val.replace(zz, `<span style="color:red;">${this.value}</span>`)
    }
  },
  watch: {
    value: {
      handler: debounce(async function () {
        const res = await Searchitem({ q: this.value })
        console.log(res)
        this.itemlist = res.data.data.options
      }, 500),
      immediate: true
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
</style>
