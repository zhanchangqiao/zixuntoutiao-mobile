<template>
  <div class='container'>
    <div class="warp">
      <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      class="nav"
      :fixed="true"
      />
    <h1>{{article.title}}</h1>
    <van-cell>
      <div slot="icon">
        <van-image
          round
          width="45px"
          height="45px"
          :src="article.aut_photo"
          fit="cover"
        />
      </div>
      <div slot="title">
        {{article.aut_name}}
      </div>
      <div slot="label">
       {{article.pubdate}}
      </div>
      <div slot="default">
        <van-button round type="info" size="small" :class="{btn:true,t:article.is_followed,f:!article.is_followed}" @click="onfollowimg" :loading="followimgloading">{{article.is_followed ? '已关注' : '关注+'}}</van-button>
      </div>
    </van-cell>
    <div class="markdown-body" v-html="article.content" ref="content">
    </div>
    <van-divider
      :style="{ color: '#ccc', borderColor: '#cccccc', padding: '0 16px' }"
    >
      正文结束
    </van-divider>
    <comment-list :articleid="articleId"/>
    </div>
    <van-tabbar class="footbar">
      <van-button round class="btn" type="info" size="small">写评论</van-button>
      <van-icon class-prefix="toutiao" name="wenda" />
      <!-- 收藏 -->
      <van-icon :name="article.is_collected ? 'star' : 'star-o'" :style="{color:(article.is_collected ? 'yellow' : '')}"  @click="oncollected" :loading="true"/>
      <!-- 点赞 -->
      <van-icon :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" :style="{color:(article.attitude === 1 ? 'orange' : '')}"  @click="onlikings"/>
    </van-tabbar>
  </div>
</template>
<script>
import './github-markdown.css'
import { Getarticle, Setfollowimg, Delfollowimg, Dellikings, Setlikings, Setcollected, Delcollected } from '@/api/article.js'
import { ImagePreview } from 'vant'
import CommentList from './components/comment-list.vue'
export default {
  name: 'Article',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentList
  },
  data () {
    return {
      article: [],
      followimgloading: false
    }
  },
  computed: {
  },
  created () {
    this.getarticle()
  },
  methods: {
    // 获取文章详情信息
    async getarticle () {
      const res = await Getarticle(this.articleId)
      console.log(res)
      this.article = res.data.data
      this.$nextTick(() => {
        const content = this.$refs.content
        const imgs = content.querySelectorAll('img')
        const imgurls = []
        console.log(imgs)
        imgs.forEach((img, index) => {
          imgurls.push(img.src)
          img.onclick = function () {
            ImagePreview({
              images: imgurls,
              startPosition: index
            })
          }
        })
      })
    },
    // 设置关注作者
    async onfollowimg () {
      this.followimgloading = true
      if (this.article.is_followed) {
        // 取消关注
        await Delfollowimg(this.article.aut_id)
      } else {
        // 关注
        await Setfollowimg(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.followimgloading = false
    },
    // 设置收藏
    async oncollected () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.article.is_collected) {
        // 取消收藏
        await Delcollected(this.articleId)
      } else {
        // 收藏
        await Setcollected(this.articleId)
      }
      this.$toast.loading({
        message: `${this.article.is_collected ? '取消' : ''}收藏成功`,
        type: 'success'
      })
      this.article.is_collected = !this.article.is_collected
    },
    // 设置点赞
    async onlikings () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        // 取消点赞
        await Dellikings(this.articleId)
        this.article.attitude = 0
      } else {
        // 点赞
        await Setlikings(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.loading({
        message: `${this.article.attitude === 1 ? '' : '取消'}点赞成功`,
        type: 'success'
      })
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
.btn {
  background-color: #F85959;
  color:#fff;
  width: 100px;
  border:none;
}
.van-cell__title, .van-cell__lable {
  padding-left: 15px;
}
.markdown-body {
  padding: 20px;
  background-color: #fff;
}
.container {
  background-color: #fff;
  i {
    font-size: 20px;
  }
}
h1 {
  font-size: 20px;
  padding-left: 20px;
  margin: 0;
}
.t {
  background-color: #cccccc;
}
.footbar {
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #cccccc;
  .btn {
    width: 200px;
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
  }
}
.warp {
  padding: 60px 0px;
}
</style>
