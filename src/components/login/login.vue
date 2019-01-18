<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login-container">
    <Form ref="loginForm" class="login-form" :model="form" :rules="rules">
      <h3 class="login-form-title">信息化平台系统</h3>
      <FormItem prop="name" class="mb30">
        <Input v-model="form.name" size="large" placeholder="请输入账号">
          <span slot="prepend">
            <Icon type="md-person"  :size="16"/>
          </span>
        </Input>
      </FormItem>
      <FormItem prop="pass" class="mb30">
        <Input type="password" v-model="form.pass" size="large" placeholder="请输入密码">
          <span slot="prepend">
            <Icon type="md-lock" :size="16" />
          </span>
        </Input>
      </FormItem>
      <FormItem>
        <Button @click="onLogin" size="large" type="primary" long :loading="loading" :disabled="isDisable">登录</Button>
      </FormItem>
    </Form>
    <div class="login-footer">
      The platform system of Zhy
    </div>
    <!-- less编译 -->
    <!-- <div class="aaa">231312</div> -->
  </div>
</template>

<script>
import { getLogin } from '@/server/api.js'

export default {
  data () {
    return {
      isDisable: false,
      loading: false,
      form: {
        name: '',
        pass: ''
      },
      rules: {
        name: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        pass: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    localStorage.removeItem('admin')
  },
  methods: {
    onLogin () {
      this.isDisable = true
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          this.isDisable = false
          return
        }
        let params = {
          userId: this.form.name,
          password: this.form.pass
        }
        getLogin(params).then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.isDisable = false
            localStorage.setItem('Authorization', res.data.Authorization)
            localStorage.setItem('menuList', JSON.stringify(res.data.treeList))
            localStorage.setItem('userId', this.form.name)
            // 设置默认展开的Slide
            localStorage.setItem('slideMenuOpenList', JSON.stringify(['apply']))
            localStorage.setItem('slideMenuOpenDefault', 'comNote')
            this.$Message.success({ content: '登陆成功！' })
            this.$router.push('/home')
          } else {
            this.isDisable = false
            this.$Message.error({ content: '账号或密码错误！' })
          }
        }).catch(err => {
          this.isDisable = false
          this.$Message.error({ content: '登陆异常！' })
          throw err
        })
      })
    }
  }
}
</script>

<style>
.login-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  background-image: url('../../assets/1.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  position: relative;
}
.login-form {
  width: 400px;
  background: #fff;
  border-radius: 5px;
  padding: 40px 20px;
  box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
}
.login-form-title {
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 30px;
}

.login-footer{
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 16px;
  margin: 48px 0 24px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

@keyframes neon {
  0% {
    text-shadow: 0 0 8px #fff, 0 0 17px #fff, 0 0 24px #fff, 0 0 28px #228DFF, 0 0 55px #228DFF, 0 0 66px #228DFF, 0 0 86px #228DFF, 0 0 135px #228DFF;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228DFF, 0 0 35px #228DFF, 0 0 40px #228DFF, 0 0 50px #228DFF, 0 0 75px #228DFF;
  }
}
/*iView样式调整*/
.login-container .ivu-input-group { display: table; }
</style>
