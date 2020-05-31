<template>
  <div class='container'>
    <van-cell-group>
      <div class="bgc"></div>
      <van-cell class="cell" v-if="user">
        <!-- 登录显示状态 -->
        <van-grid
        :column-num="2"
        :border="false" style="flex-wrap: nowrap;justify-content:space-between"
        >
          <van-grid-item class="first" style="flex-basis: 70%;">
            <van-image
              round
              width="68px"
              height="68px"
              :src="msg.photo"
            />
            <span class="num">{{msg.name}}</span>
          </van-grid-item>
          <van-grid-item style="flex-basis:30%">
            <van-button size="small" type="primary" round to="user/profile"
            >编辑资料</van-button>
          </van-grid-item>
        </van-grid>
        <!-- 粉丝数量 -->
        <van-grid :border="false" :column-num="4">
          <van-grid-item class="second">
            <div class="span num">{{msg.art_count}}</div>
            <div class="text">头条</div>
          </van-grid-item>
          <van-grid-item class="textnum">
            <div class="span num">{{msg.follow_count}}</div>
            <div class="text">关注</div>
          </van-grid-item>
          <van-grid-item class="textnum">
            <div class="span num">{{msg.fans_count}}</div>
            <div class="text">粉丝</div>
          </van-grid-item>
          <van-grid-item class="textnum">
            <div class="span num">{{msg.like_count}}</div>
            <div class="text">获赞</div>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <!-- 未登录显示状态 -->
      <van-cell class="cell" v-else>
        <van-grid
          :column-num="1"
          :border="false" style="flex-wrap: nowrap;justify-content:space-between"
          >
            <van-grid-item class="first" style="flex-basis: 70%;">
              <van-image
                round
                width="68px"
                height="68px"
                src="./notlogin.png"
                @click="onlogin"
              />
              <span class="num" @click="onlogin">登录/注册</span>
            </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>
    <van-grid :column-num="2" class="mar hei">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" style="color: red"/>
      <van-grid-item icon-prefix="toutiao"  icon="lishi" text="历史" style="color: orange"/>
    </van-grid>
    <van-cell class="mar" title="消息通知" is-link />
    <van-cell class="mar" title="小智同学" is-link to="/userchat"/>
    <van-cell v-if="user" class="mar" title="退出登录" style="text-align:center;color: red" @click="onlogout"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Getuser } from '@/api/user.js'
export default {
  name: 'Myindex',
  components: {
  },
  data () {
    return {
      // 表示当前用户的信息
      msg: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 用户退出
    onlogout () {
      this.$dialog.alert({
        title: '退出提示',
        message: '确认退出嘛？',
        showCancelButton: true
      }).then(() => {
        // 修改vuex的数据
        this.$store.commit('setuser', null)
      }).catch(() => {

      })
    },
    // 获取当前用的户的信息方法
    async getuser () {
      try {
        const res = await Getuser()
        console.log(res)
        this.msg = res.data.data
      } catch {
      }
    },
    // 去到登录界面，头像，文字均添加
    onlogin () {
      this.$router.push('/login')
    }
  },
  mounted () {
  },
  created () {
    this.getuser()
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
.cell {
  background: none;
  padding: 10px 13px;
  .van-grid-item__content {
   background: none;
  }
}
.first {
 .van-grid-item__content {
   flex-direction: row;
   justify-content: flex-start;
   span {
     margin-left:20px;
   }
 }
 .van-image--round img {
   box-sizing: border-box;
   border: 2px solid #fff;
 }
}
.bgc {
  background: url('./header.png') no-repeat;
  background-color: #3e9cfa;
  background-size: cover;
  position: absolute;
  background-position: 0px -200px;
  width: 100%;
  height: 100%;
}
.mar {
  margin-bottom: 10px;
}
.second {
  .van-grid-item__content {
    flex-basis: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.text {
  font-size: 11px;
}
.num {
  font-size: 18px;
}
.hei {
  height: 70px;
  .van-grid-item {
    height: 70px;
  }
}
</style>
