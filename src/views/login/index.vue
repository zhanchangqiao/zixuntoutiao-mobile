<template>
  <div class=''>
    <van-nav-bar
      class="nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        clearable
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" type="primary" round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="btn-wrap">
        <van-button class="btn" type="primary" block @click="login()">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>
<script>
import { Login } from '@/api/user.js'
export default {
  name: 'Loginindex',
  components: {
  },
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {
  },
  methods: {
    async login () {
      try {
        const res = await Login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
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
<style lang='less'>
.btn-wrap {
  padding: 26px 16px;
  background-color: #f5f7f9;
  .btn {
    background-color: #6db4fb;
  }
}
</style>
