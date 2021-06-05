<template>
  <div class="comment-reply">
    <van-nav-bar 
    
    :title="`${comment.reply_count}条回复`" >
      <van-icon slot="left" name="cross"
      @click="$emit('close')"
       />

    </van-nav-bar>
    <comment-item 
    :comment= "comment"
    
    />
    <van-cell title="所有回复" />
    <comment-list />
    

  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
// import CommentList from './comment-list.vue'

// import CommentItem from './comment-item.vue'
export default {
    name: 'CommentReply',
    components: {
      CommentItem,
      CommentList
        // CommentList
        // CommentItem,
        
    },
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
    methods: {}

}
</script>

<style scoped lang="less">

</style>>
