<template>
  <div class="my-container">
      <van-cell-group v-if="user" class="my-info">   
      <van-cell 
      
      center
      class="base-info"
      :border='false'
       >
      <van-image
      class="avatar"
        slot="icon"
        
        fit="cover"
        round
        :src="currentUser.photo"
/>
       <div slot="title" class="name">{{ currentUser.name}}</div>
       <van-button
       class="updata-btn"
      size="small"
      round
       >编辑资料</van-button>
       </van-cell>
       <van-grid class="data-info" :border='false'>
          <van-grid-item class="data-info-item"  >
            <div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item  class="data-info-item" >
            <div slot="text" class="text-wrap" >

            <div class="count">{{ currentUser.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            
          </van-grid-item>
          <van-grid-item  class="data-info-item" >
            <div slot="text" class="text-wrap">

            <div class="count">{{ currentUser.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>

          </van-grid-item>
          <van-grid-item  class="data-info-item" >
            <div slot="text" class="text-wrap">

            <div class="count">{{ currentUser.like_count}}</div>
              <div class="text">获赞</div>
            </div>

          </van-grid-item>
      </van-grid>
      </van-cell-group>

      <div class="not-login" v-else>
        <div @click="$router.push('./login')">
        <img src="./手机.png" class="mobile" >
        </div>
        <div class="text" >
          登录 / 注册
        </div>
      </div>

      <van-grid class="nav-grid mb-4"  :column-num="2">
  <van-grid-item 
  class="nav-grid-item"
  icon-prefix="toutiao"
  
  icon="shoucang" text="收藏" />
  <van-grid-item
  class="nav-grid-item"

  icon-prefix="toutiao"
   icon="lishi" text="历史" />
  
</van-grid>

<van-cell title="消息通知" is-link to="/" />
<van-cell title="小智同学" class="mb-4" is-link to="/" />
<van-cell
v-if="user"
@click="onLogout"
 title="退出登录" class="logout-cell"   />
    
  </div>
</template>



<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
    name: 'MyIndex',
    components: {},
    data () {
        return {
          currentUser: {}
        }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {},
    created () {
      this.loadCurrentUser()
    },
    mounted () {},
    methods: {
     async loadCurrentUser() {
        const { data } = await getCurrentUser()
       console.log(data)
       this.currentUser = data.data
      },
      onLogout () {
       this.$dialog.confirm({
  title: '退出提示',
  message: '确认退出么'
})
  .then(() => {
    // on confirm
    this.$store.commit('setUser', null)
  })
  .catch(() => {
    // on cancel
  })
      }
    }

}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background:url('./banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color:unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .updata-btn {
      
        height: 16px;
        font-size: 10px;
        color: #666;
      }
      
    }
   /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .data-info {
        .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

           .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }

          
        }
       
        }
        
      }
      
  }
  .not-login {
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
 /deep/ .nav-grid {
        .nav-grid-item{
          height: 70px;
          .toutiao {
            font-size: 22px;

          }
          .toutiao-shoucang {
            color: #eb5253;
          }
          .toutiao-lishi {
            color: #ff9d1b;
          }
          .van-grid-item__text {
            font-size: 14px;
            color: #333;
          }
        }
      }
      .logout-cell {
        text-align: center;
        color: #d86262;
      }
      .mb-4 {
        margin-bottom: 4px;
      }
}

</style>>
