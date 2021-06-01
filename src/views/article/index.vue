<template>
  <div class="article-container">
              <van-nav-bar class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"

/>
<h1 class="title">我的剑就是你的剑</h1>
    <van-cell center class="user-info">
        <div slot="title" class="name" >11111111111111
        </div>

            <van-image
            slot="icon"
            class="avatar"
           fit="cover"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
/>
<div slot="label" class="pubdate">14小时前</div>
<van-button
type="info"
icon="plus"
class="follow-btn"
round
size="small"
>
关注

</van-button>


    </van-cell>
    <div class="markdown-body">
        <p>hello</p>
        <p>world</p>

    </div>

  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
export default {
    name: 'ArticleIndex',
    components: {},
    props: {
        articleId: {
            type: [String, Number, Object],
            required: true
        }
    },
    data () {
        return {}
    },
    computed: {},
    watch: {},
    created () {
        this.loadArticle()
    },
    mounted () {},
    methods: {
      async  loadArticle() {
            const { data } = await getArticleById(this.articleId)
            console.log(data)
        }
    }

}
</script>

<style scoped lang="less">
.title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    margin: 0;
}
.user-info {
    .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name {
    font-size: 12px;
    color: #333;
    }
    .pubdate {
        font-size: 11px;
        color: b4b4b4;
    }
    
}
.markdown-body {
    padding: 14px;
    background-color: #fff;
}
</style>>
