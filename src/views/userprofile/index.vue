<template>
  <div class=''>
    <van-nav-bar
      title="用户资料"
      left-arrow
      @click-left="$router.back()"
      class="nav"
      :fixed="true"
    />
    <van-cell-group style="margin-top:50px;">
      <van-cell title="头像" is-link style="align-items: center" @click="$refs.file.click()">
        <div slot="default">
          <van-image
            round
            width="50px"
            height="50px"
            :src="user.photo"
          />
        </div>
      </van-cell>
      <input
        type="file"
        hidden
        accept="image/*"
        ref="file"
        @change="onFileChange"
      >
      <van-cell :value="user.name" is-link title="昵称" @click="nameshow = true"/>
      <van-cell title="性别" is-link :value="user.gender?'女':'男'" @click="sexshow = true"/>
      <van-cell title="生日" is-link :value="user.birthday"  @click="srshow = true"/>
    </van-cell-group>
    <!-- 修改name -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '30%' }">
      <updata-name v-model="user.name" @close="nameshow = false"/>
    </van-popup>
    <!-- 修改性别 -->
    <van-popup v-model="sexshow" position="bottom" :style="{ height: '30%' }">
      <updata-sex v-model="user.gender" @close="sexshow = false"/>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="srshow" position="bottom" :style="{ height: '40%' }">
      <updata-birthday v-model="user.birthday" @close="srshow = false"/>
    </van-popup>
    <!-- 修改头像 -->
    <van-popup v-model="photoshow" position="bottom" :style="{ height: '100%' }">
      <updata-photo :file="previewImage" @close="photoshow = false" @updatephoto="user.photo = $event"/>
    </van-popup>
  </div>
</template>
<script>
import UpdataName from './components/updataname.vue'
import UpdataSex from './components/updatasex.vue'
import UpdataBirthday from './components/updatabirthday.vue'
import UpdataPhoto from './components/updataphoto.vue'
import { Getuserprofile } from '@/api/user.js'
export default {
  name: 'Userprofile',
  components: {
    UpdataName,
    UpdataSex,
    UpdataBirthday,
    UpdataPhoto
  },
  data () {
    return {
      nameshow: false,
      user: {},
      sexshow: false,
      srshow: false,
      photoshow: false,
      previewImage: null
    }
  },
  created () {
    this.getuserprofile()
  },
  computed: {
  },
  methods: {
    async getuserprofile () {
      const res = await Getuserprofile()
      this.user = res.data.data
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      console.log(this.$refs.file.value, file)
      this.previewImage = file
      this.photoshow = true
      console.log(this.previewImage)
      // this.previewImage = ''
      this.$refs.file.value = ''
      console.log(this.$refs.file.value)
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
.nav {
  background-color: #3196FA;
  /deep/.van-icon {
    color:#fff;
  }
  /deep/.van-nav-bar__title {
    color:#fff;
  }
}
</style>
