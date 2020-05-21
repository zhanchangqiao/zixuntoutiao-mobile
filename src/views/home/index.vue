<template>
  <div class=''>
    <van-nav-bar class="nav">
      <template #left>
        <img src="./logo.png" class="logo">
      </template>
      <template #right>
        <van-button
        icon-prefix="toutiao"
        icon="sousuo"
        round class="navbtn"
        size="small"
        to="/search"
        >搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab v-for="index in channellist" :key="index.id" :title="index.name">
      <article-list :channel="index" />
      </van-tab>
      <div slot="nav-right" class="nav-right">
        <van-icon name="wap-nav" @click="propshow=!propshow"></van-icon>
      </div>
    </van-tabs>
    <van-popup v-model="propshow" position="bottom" :style="{ height: '90%' }" closeable get-container="body">
      <channel-edit :userchannels="channellist" @close="propshow = false" @updata-active="active = $event" :active="active"/>
    </van-popup>
  </div>
</template>
<script>
import { Getchannel } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '@/until/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'Homeindex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channellist: [],
      propshow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadchannel () {
      let channels = []
      if (this.uer) {
        // 已登录
        const { data } = await Getchannel()
        channels = data.data.channels
      } else {
        // 未登录
        const localchannels = getItem('user-channels')
        if (localchannels) {
          channels = localchannels
        } else {
          console.log(1)
          const { data } = await Getchannel()
          channels = data.data.channels
        }
      }
      this.channellist = channels
    }
  },
  created () {
    this.loadchannel()
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
<style lang='less'>
.nav {
  background-color: #3296fa;
  text-align: center;
  .navbtn {
    background-color: #5babfb;
    color: #fff;
    border: none;
    width: 250px;
  }
  .logo {
    width: 90px;
    height: 40px;
  }
}
.nav-right {
  .van-icon {
    position: fixed;
    right: 5px;
    margin-left: 10px;
    line-height: 48px;
    margin-left: 20px;
  }
}
</style>
