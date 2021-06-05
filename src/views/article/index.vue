<template>
  <div class="article-container">
              <van-nav-bar class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"

/>
<div class="artcle-wrap">
    <h1 class="title">{{ article.title}}</h1>
    <van-cell center class="user-info">
        <div slot="title" class="name" >{{article.aut_name}}
        </div>

            <van-image
            slot="icon"
            class="avatar"
           fit="cover"
            round
            :src="article.aut_photo"
/>
<div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
<van-button
:type="article.is_followed ? 'default' : 'info' "
:icon="article.is_followed ? '' : 'plus' "
class="follow-btn"
round
size="small"
@click="onFollow"
:loading='isFollowLoading'
>
{{ article.is_followed  ? '已关注' : '关注' }}

</van-button>


    </van-cell>
    <div class="markdown-body"
    ref="article-content"
     v-html="article.content">
        

    </div>
     <comment-list 
     @update-total-count='totalCommentCount = $event'
     :list='commentList'
     :source='articleId'
     @reply-click="onReplyClick"
     />
</div>

       

    <!-- 底部区域 -->
    <div class="article-bottom">
        <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow= true"
        
        >写评论</van-button>
        <van-icon
        color="#777"
        :info='totalCommentCount'
        name="comment-o"  
         />
         <van-icon 
         :color= "article.is_collected ? 'orange' : '#777' "
         :name="article.is_collected ? 'star' : 'star-o' "
         
         /> 
         <van-icon 
         color="#777"
         name="good-job-o"
         /> 
         <van-icon
         color="#777"
         name="share"
         ></van-icon>
        

    </div>

<van-popup 
v-model="isPostShow"
 position="bottom" 
>
<post-comment 
@post-sucess='onPostSucess'
:target='articleId'
/>
</van-popup>
<van-popup 
v-model="isReplyShow"
 position="bottom" 
>
<comment-reply 
@close='isReplyShow = false'
v-if="isReplyShow"
:comment= 'replyComment'
/>
</van-popup>


  </div>
</template>

<script>
import PostComment from './components/post-comment'
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'
import CommentReply from './components/comment-reply'
// import CommentReply from './components/comment-reply.vue'

// import CommentList from './components/comment-list.vue'

export default {
    name: 'ArticleIndex',
    components: {
        CommentList,
        PostComment,
        CommentReply
        // CommentReply
        
        
    },
    props: {
        articleId: {
            type: [String, Number, Object],
            required: true
        }
    },
    data () {
        return {
            article: {},
            isFollowLoading: false,
            isPostShow: false,
            commentList: [],
            totalCommentCount: 0,
            isReplyShow: false,
            replyComment: {}
        }
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
            // console.log(data)
            this.article = data.data
            // console.log(articleContent)
            this.$nextTick(() => {
              this.handlePerviewImage()  

            })
          

        },
        handlePerviewImage () {
            const articleContent = this.$refs['article-content']
const imgs = articleContent.querySelectorAll('img')
const imgPaths = []
          imgs.forEach((img, index) => {
              imgPaths.push(img.src)
              img.onclick = function () {

                ImagePreview({
                     images: imgPaths,
                        startPosition: index
                            })
              }
              
          })
        },
    async  onFollow () {
        this.isFollowLoading = true
            if (this.article.is_followed) {
             await       deleteFollow (this.article.aut_id) 
            //  this.article.is_followed = false
                    }
            else {
             await       addFollow(this.article.aut_id)
            //  this.article.is_followed = true

            }
             this.article.is_followed = !this.article.is_followed
        this.isFollowLoading = false
            
            
        },
        onPostSucess (comment) {
            console.log(comment)
            this.commentList.unshift(comment)
            this.totalCommentCount++
            this.isPostShow = false

        },
        onReplyClick (comment) {
            console.log('onReplyClick', comment)
            this.replyComment = comment
            this.isReplyShow = true
        }

        // async  onCollect () {0
        // this.isFollowLoading = true
        //     if (this.article.is_followed) {
        //      await       deleteFollow (this.article.aut_id) 
        //     //  this.article.is_followed = false
        //             }
        //     else {
        //      await       addFollow(this.article.aut_id)
        //     //  this.article.is_followed = true

        //     }
        //      this.article.is_followed = !this.article.is_followed
        // this.isFollowLoading = false
            
            
        // }
    }

}
</script>

<style scoped lang="less">
// .article-container {
//     position: relative;
// }
.article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
    
}
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
