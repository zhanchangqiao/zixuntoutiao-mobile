<template>
  <div class=''>
    <van-nav-bar
      class="nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-form @submit="login()" :show-error="false"
          :show-error-message="false" @failed="failed" ref="loginform">
        <van-field
          v-model="user.mobile"
          name="mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="请输入手机号"
          :rules="rules.mobile"
        />
        <van-field
          v-model="user.code"
          name="code"
          icon-prefix="toutiao"
          clearable
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="rules.code"
        >
          <template #button>
            <van-button size="small" type="primary" round @click.prevent="oncode()"
            :loading="codeloading"
            v-if="codecount"
            >发送验证码</van-button>
            <van-count-down
            :time="time"
            v-else
            format="ss s"
            @finish="countfinish"
            />
          </template>
        </van-field>
        <div class="btn-wrap">
          <van-button class="btn" type="primary" block>登录</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>
<script>
import { Login, Logincode } from '@/api/user.js'
export default {
  name: 'Loginindex',
  components: {
  },
  data () {
    return {
      time: 5 * 1000,
      codeloading: false,
      codecount: true, // if在按钮上。默认为true显示
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile:
          [
            { required: true, message: '请填写用户名' },
            { pattern: /^1[3|5|7|9]\d{9}$/, message: '请输入正确格式的手机号码' }
          ],
        code:
          [
            { required: true, message: '请填写验证码' },
            { pattern: /^\d{6}$/, message: '验证码格式错误' }
          ]
      }
    }
  },
  computed: {
  },
  methods: {
    async login () {
      // 提示组件
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await Login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
        // 把token等数据放到Vuex容器中
        this.$store.commit('setuser', res.data.data)
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    failed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async oncode () {
      this.codeloading = true
      try {
        await this.$refs.loginform.validate('mobile')
        // console.log(result)
        // 验证通过
        // 开启倒计时
        this.codecount = false
        // 发送请求
        const res = await Logincode(this.user.mobile)
        console.log(res)
        // 关闭倒计时
      } catch (error) {
        console.dir(error)
        let message = ''
        if (error.name === 'mobile') {
          message = error.message
        } else if (error.response.status === 429) {
          message = '请求次数过多'
        } else {
          message = '未知的错误，请稍后再试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.codeloading = false
    },
    countfinish () {
      this.codecount = true
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
