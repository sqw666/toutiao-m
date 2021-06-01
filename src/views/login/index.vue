<template>
    <div class="login-container">
        <van-nav-bar class="app-nav-bar"
        title="登录/注册"
        left-arrow
        @click-left="$router.back()"

/>
<van-form 
    :show-error="false" 
    :show-error-message ='false'
    validate-first
    ref="login-form"
    @submit="onLogin"
    @failed="onFailed"
>
  <van-field
    v-model="user.mobile"
    icon-prefix="toutiao"
    
    left-icon="shouji"
    
    placeholder="请输入手机号"
    center
    name="mobile"
    :rules="formRules.mobile"
  />
  <van-field
    v-model="user.code"
    clearable
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    center
    name="code"
    :rules="formRules.code"
     
  >
  <template #button>
      <van-count-down :time="1000 * 30" 
      v-if="isCountDownShow"
      format=" ss s"
      @finish='isCountDownShow = false' />
    <van-button class="send-btn"
    v-else
     size="small"
      round
      :loading='isSendSmsLoading'
      @click.prevent="onSendSms"
      >获取验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn-wrap">
    <van-button class="login-btn" 
    type="info"
     block
     
     >登录</van-button>
</div>
</van-form>


    </div>
</template>

<script>
import { login, sendSms  } from '@/api/user'
// import { Toast } from 'vant'
export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
        return {
            user: {
                mobile: '',
                code: ''
            },
            formRules: {
                mobile: [{ required: true, message: '请输入手机号' },
                         {
                             pattern: /^1[3|5|7|8|9]\d{9}$/, message:'手机号格式错误'
                         }
                ],
                code: [
                    { required: true, message: '请输入验证码' },
                         {
                             pattern: /^\d{6}$/, message:'验证码错误'
                         }

                ]            

            },
            isCountDownShow: false,
            
            isSendSmsLoading: false

            
        }


    },
    computed: {},
    watch: {},
    created () {

    },
    mounted() {},
    methods: {
        async onLogin () {
            this.$toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration: 0
})
            try {
                const { data } = await login(this.user)
            // console.log(res)

            this.$toast.success('登陆成功')
            this.$store.commit('setUser', data.data)
            this.$router.back()
            } catch (err) {
                console.log(err)
                this.$toast.fail('登录失败,手机号或验证码错误')


            }
        },
    onFailed (error) {
        console.log(error)
        if (error.errors[0]){
            this.$toast({
                message: error.errors[0].message,
                position: 'top'
            })
    }
    
        },
    async onSendSms () {
        try { await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
         await sendSms(this.user.mobile)
        this.isCountDownShow = true
        

        } catch (err){
            let message = ''
            if (err && err.response && err.response.status === 429){
                message = '发送太频繁了，请稍后重试'
            }else if (err.name === 'mobile'){
                message = err.message
            }else{
                message = '发送失败，请稍后重试'
            }
            this.$toast({
                message: message,
                position: 'top'
            })
        console.log('验证失败',err)
        }
       this.isSendSmsLoading = false

    }


    }


}
</script>

<style scoped lang="less">
.login-container {
    .login-btn-wrap {
        padding: 26px 16px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
            .van-button__text {
                font-size: 15px;
            }
        }
    }
    .send-btn {
        width: 80px;
        height: 23px;
        background-color: #ededed;
    }

}

</style>


