<template>
  <div class='main'>
    <van-cell class="cell" :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }">
      <div class="" :class="{cont: true,cont1: num }">
        <div class="title">{{article.title}}</div>
        <div class="img" v-if="num">
          <van-image
            v-for="(index, id) in article.cover.images"
            :key="id"
            width="120px"
            height="70px"
            fit="cover"
            :src="index"
          />
        </div>
        <div class="img" v-else>
          <van-image
            width="120px"
            height="70px"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>
      <div class="foot">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'Articleitem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      num: false
    }
  },
  created () {
    //     if (this.article.cover.length === 1) {
    //   //
    //   this.num = false
    // } else
    if (this.article.cover.images.length === 3) {
      this.num = true
    }
  },
  computed: {
  },
  methods: {
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
.main {
  background-color: #fff;
  padding: 0px 15px;
}
.cell {
  border-bottom: 1px solid rgba(204, 204, 204, .1);
  // padding: 0px 10px;
}
.cont {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  box-sizing: border-box;
  .title {
    font-size: 15px;
    font-weight: lighter;
    // line-height: 50px;
    padding-top: 15px;
    height: 100px;
    box-sizing: border-box;
  }
}
.cont1 {
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
  .title {
    margin-bottom: 15px;
  }
  .img {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
.foot {
  font-size: 13px;
  position: absolute;
  bottom: 0px;
  span {
    margin-right: 15px;
    line-height: 30px;
    color: #cccccc;
  }
}
</style>
