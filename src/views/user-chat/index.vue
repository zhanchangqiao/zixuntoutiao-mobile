<template>
  <div class=''>
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      class="nav"
      :fixed="true"
    />
    <van-cell-group ref="messagelist" class="list">
      <van-cell v-for="(item, index) in messages" :key="index" :title="item.msg" />
    </van-cell-group>
    <!-- <div class="foot"> -->
    <van-cell-group class="foot">
      <van-field v-model="message" placeholder="请输入消息"/>
      <van-button type="default" class="btn" @click="onsend()">发送</van-button>
    </van-cell-group>
    <!-- </div> -->
  </div>
</template>
<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/until/storage.js'
export default {
  name: 'Userchat',
  components: {
  },
  data () {
    return {
      socket: null,
      message: '',
      messages: getItem('chatmessage') || []
    }
  },
  watch: {
    message () {
      setItem('chatmessage', this.messages)
      this.$nextTick(() => {
        this.scrollto()
      })
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', () => {
      console.log('连接建立成功')
    })
    socket.on('disconnect', () => {
      console.log('断开连接了')
    })
    socket.on('message', (data) => {
      this.messages.push(data)
      console.log(data)
    })
  },
  computed: {
  },
  methods: {
    onsend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },
    scrollto () {
      const list = this.$refs.messagelist
      list.scrollTop = list.scrollHeight
    }
  },
  mounted () {
    this.scrollto()
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
.foot {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: cneter;
}
.btn {
  background: #07C160;
  width: 100px;
  height: 40px;
  margin: 5px;
}
.nav {
  background-color: #3196FA;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon {
    color:#fff;
  }
}
/deep/.list {
  padding-top: 50px;
}
</style>
