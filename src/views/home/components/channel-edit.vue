<template>
  <div class='contain'>
    <van-cell :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button type="info" size="mini" round @click="isedit = !isedit">{{
        isedit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(index, id) in userchannels"
            :key="id" :text="index.name" :icon="isedit && id !==0 ? 'close' : ''" @click="clickif(index, id)" :class="{'active': id === active}"/>
    </van-grid>
    <van-cell :border="false" class="title">
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in recommendChannels" :key="value.id" :text="value.name" :border="false" @click="adduserchannel(value)"/>
    </van-grid>
  </div>
</template>
<script>
import { getallchannels, addchannels, delchannels } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/until/storage.js'
export default {
  name: 'Channeledit',
  props: {
    userchannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      allchannels: [],
      isedit: false
    }
  },
  created () {
    this.getallch()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 思路：所有频道 - 我的频道 = 剩下的推荐频道
      // filter 方法：过滤数据，根据方法返回的布尔值 true 来收集数据
      // filter 方法查找满足条件的所有元素
      return this.allchannels.filter(channel => {
        // 判断 channel 是否属于用户频道
        // find 方法查找满足条件的单个元素
        return !this.userchannels.find(userchannel => {
          // 找到满足该条件的元素
          return userchannel.id === channel.id
        })
      })
    }
  },
  methods: {
    // 获取全部频道列表
    async getallch () {
      const res = await getallchannels()
      console.log(res)
      this.allchannels = res.data.data.channels
    },
    // 添加频道
    async adduserchannel (channel) {
      this.userchannels.push(channel)

      // 数据持久化
      if (this.user) {
        // 登录了
        await addchannels({
          channels: [
            { id: channel.id, seq: this.userchannels.length }
          ]
        })
      } else {
        // 没有登录
        setItem('user-channels', this.userchannels)
      }
    },
    // 删除频道
    async deluserchannel (channel, index) {
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userchannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        await delchannels(channel.id)
      } else {
        setItem('user-channels', this.userchannels)
      }
    },
    clickif (channel, index) {
      if (this.isedit && index !== 0) {
        // 编辑状态
        this.deluserchannel(channel, index)
      } else {
        // 跳转状态
        this.switchchannel(index)
      }
    },
    switchchannel (id) {
      this.$emit('updata-active', id)
      this.$emit('close')
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
.contain {
  padding-top: 54px;
}
.title {
  font-size: 15px;
  color: #ccc;
}
/deep/.van-grid-item__content {
  background-color: rgba(204, 204, 204, .2);
}
/deep/.van-grid-item__icon {
  position: absolute;
  right: -8px;
  top: -8px;
  font-size: 20px;
  color: black;
}
/deep/.van-grid-item__text {
  margin-top: 0px;
}
.active {
  /deep/.van-grid-item__content {
    span {
      color:red;
    }
  }
}
</style>
