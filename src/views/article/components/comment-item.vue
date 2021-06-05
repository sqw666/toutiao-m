<template>
<van-cell class="comment-item"

>
<van-image
class="avatar"
slot="icon"
 
  round
  fit="cover"
  :src="comment.aut_photo"
/>
<div slot="title">
    <div class="name">{{ comment.aut_name}}</div>
    <div class="content">{{ comment.content}}</div>
    <div>
        <span class="pubdate">{{comment.pubdate | datetime('MM:DD HH:mm') }}</span>
        <van-button
        class="reply-btn"
        round
        size="mini"
        @click="$emit('reply-click', comment)"
        >
            {{ comment.reply_count}}回复
        </van-button>
    </div>
</div>
<div class="like-wrap">
    <van-icon 
    class="like-icon" 
   
    :class="{
        liked: comment.is_liking
        }"
    :name="comment.is_liking ? 'good=job' : 'good-job-o'" 
    @click="onCommentLike"
    />
    <span class="like-count">{{ comment.like_count}}</span>
</div>




</van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike} from '@/api/comment'
export default {
    name: 'CommentItem',
    components: {},
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data () {
        return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onCommentLike (){
            const commentId = this.comment.com_id.toString()
            // console.log('66666')
            if (this.comment.is_liking) {
                await deleteCommentLike (this.comment.com_id.toString())
                this.comment.like_count--
            } else {
                await addCommentLike (commentId)
                this.comment.like_count++


            }
            this.comment.is_liking = !this.comment.is_liking

        }


    }

}
</script>

<style scoped lang="less">
.comment-item {
    .avatar {
        height: 32px;
        width: 32px;
        margin-right: 13px;
    }
    .name {
        font-size: 14px;
        color: #406599;
    }
    .comment {
        font-size: 16px;
        color: 222px;
    }
    .pubdate {
        font-size: 9px;
    }
    .like-icon.liked {
        color: #ff69b4;
    }
}

</style>>
