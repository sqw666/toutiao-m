<template>
  <div class="home-container">
     <van-nav-bar class="app-nav-bar">
       <van-button slot="title"
       icon="search"
       type="info"
       class="search-btn"
       round
       to="/search"
       size="small"
       >搜索</van-button>  
     </van-nav-bar>
     <van-tabs v-model="active" class="channel-tabs">
  <van-tab 

  v-for="channel in channels"
  :title="channel.name"
  :key="channel.id"
  >
  <article-list :channel='channel' />
  </van-tab>
  <div slot="nav-right" class="wrap-nav-placehoder"></div>
<div slot="nav-right" @click="isChannelEditShow = true"
class="wap-nav-wrap"
>
  <van-icon name="wap-nav" />

</div>

</van-tabs>
<van-popup v-model="isChannelEditShow"
 position="bottom" 
 get-container="body"
  closeable
    close-icon-position="top-left"
    style="height: 100%"

 class="channel-edit-popup"
 >
 <channel-edit 
 :user-channels='channels'
 @close='isChannelEditShow = false'
 @update-active='onUpdateActive'
 :active='active'
 
 />
</van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
    name: 'HomeIndex',
    components: {
      ArticleList,
      ChannelEdit


        
    },
    props: {},
    data () {
        return {
           active: 0,
           channels: [],
           isChannelEditShow: true
        }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {},
    created () {
      this.loadChannels()

    },
    mounted () {},
    methods: {
     async loadChannels() {
      //  const { data } = await getUserChannels()
      //  this.channels = data.data.channels
      let channels = []
      if (this.user) {
       const { data } = await getUserChannels()
       channels = data.data.channels


      } else {
        const loadChannels = getItem('user-channels')
        if (loadChannels) {
          channels = loadChannels
        } else {

       const { data } = await getUserChannels()
       channels = data.data.channels





        }

      }
        this.channels = channels


      },
      onUpdateActive (index) {
        // console.log(index)
        this.active = index
      }
    }

}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-button__text {
      font-size: 14px;
    }
    .van-icon {
      font-size: 16px;
    }
  }
  .channel-tabs {
   /deep/ .van-tab { 
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;

    }
   /deep/ .van-tabs__line {
     bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
  }
  .wrap-nav-placehoder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    // line-height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .9;
    
    .van-icon {
      font-size: 24px;
    }
    &::before {
      content: '';
      width: 1px;
      height: 43px;
      background: url('./line.png') no-repeat;
      background-size: contain;
      position: absolute;
    top: 0;
    left: 0;
    }

  }
 
}

</style>>
