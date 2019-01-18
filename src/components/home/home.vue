<template>
  <div class="layout">
    <Layout class="layoutWrap">
      <Header style="background: #2d8cf0">
        <Menu mode="horizontal" style="background:#2d8cf0" active-name="1">
          <div class="layout-img" :style="{backgroundImage:'url('+require('../../../static/logo.png')+')'}">
          </div>
          <div class="layout-logo" style="fontSize: 18px; fontWeight: border;">信息化平台系统</div>
          <div class="layout-nav">
            <!-- <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem> -->
          </div>
          <div style="margin-left:20px;float:right;color:#fff;">
            <span  style="color:#fff; margin-right:24px;display: inline-block; minHeight:48px;">
              欢迎您
            </span>
            <Dropdown style="color:#fff; margin-right: 32px;" @on-click="checkUserInfo">
              <a href="javascript:void(0)" style="color:#fff;">
                个人中心
                <Icon type="md-arrow-dropdown" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="个人信息">个人信息</DropdownItem>
                <DropdownItem name="修改密码">修改密码</DropdownItem>
                <DropdownItem name="退出登录">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <span @click="drawerHandleClick" style="color:#2d8cf0;background:#fff; display: inline-block; width:24px; height:24px; border-radius:50%;line-height:24px;text-align:center;">
              <Icon type="md-help" />
            </span>
          </div>
        </Menu>
      </Header>
      <Layout style="min-height: 0;">
        <Sider hide-trigger theme="dark" :style="{overflow: 'auto !important', minHeight: '0'}">
          <Menu :active-name="slideMenuOpenDefault" theme="dark" @on-open-change='changeMenu'  width="auto" :open-names="slideMenuOpenList" @on-select="routerTo">
            <Submenu v-for="(group, index) in menuData" :name="group.menu_URL" :key="index" >
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                {{group.menu_NAME}}
              </template>
              <MenuItem v-for="(children, index) in group.children" :name="children.menu_URL" :key="index">
              {{children.menu_NAME}}
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '16px 0'}" separator="">
              <BreadcrumbItem v-for="(item, index) in levelList" :key="item.el.path" v-if="item.el.meta.title"  >
                <Tag type="dot" class="tagItem" :name="item.el.name" :color="item.colorType ? 'primary' : 'defalut' " closable  @click.native="handleTag(item.el.name, index)" @on-close="closeHandleTag(item.el.name, index)" >{{item.el.meta.title}}</Tag>
                <!-- {{ item.meta.title }} -->
              </BreadcrumbItem>
            </Breadcrumb>
            <Content id="content" :style="{padding: '24px', background: '#fff' }">
              <transition name="fade" mode="out-in">
                <!-- 组件重复渲染的情况下，可以应用缓存 -->
                <!-- <keep-alive> -->
                  <router-view/>
                <!-- </keep-alive>   -->
              </transition>
            </Content>
          </Layout>
      </Layout>
    </Layout>
    <userInfoModel :userInfoModel="userInfoModel" v-if="flagUserInfo" @statusUserInfo='getUserInfoStatus'></userInfoModel>
    <revisePassWordModel :revisePassWordModel="revisePassWordModel" v-if="flagRevisePassWord" @statusRevisePassWord='getRevisepassWordStatus'></revisePassWordModel>
  </div>
</template>

<script>

import userInfoModel from '@/common/userInfoModel'
import revisePassWordModel from '@/common/revisePassWordModel'

export default {
  data () {
    return {
      levelList: [],
      userInfoModel: false,
      revisePassWordModel: false,
      flagUserInfo: false,
      flagRevisePassWord: false,
      menuData: [],
      slideMenuOpenList: ['apply'],
      slideMenuOpenDefault: '',
      prefix: '/home/' // router prefix
    }
  },
  created () {
    this.menuData = JSON.parse(localStorage.getItem('menuList'))
    this.slideMenuOpenList = JSON.parse(localStorage.getItem('slideMenuOpenList'))
    // this.levelList = JSON.parse(localStorage.getItem('levelList'))
    this.slideMenuOpenDefault = localStorage.getItem('slideMenuOpenDefault')
    if (this.levelList.length) {
      this.getBreadcrumb()
    } else {
      return false
    }
    // console.log(this.menuData)
  },
  watch: {
    $route () { // 监听$route对象
      this.getBreadcrumb()
    }
  },
  methods: {
    routerTo (e) {
      let userId = localStorage.getItem('userId')
      // let token = this.compileStr('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLlvKDmtpsiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE1MzY0MDA2OTgsImV4cCI6MTUzODEwNTczMH0.6KpBNsDiybdyfBaulndvhshGMH4b4oA7m3Ku_qoY5r0')
      let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLlvKDmtpsiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE1MzY0MDA2OTgsImV4cCI6MTUzODEwNTczMH0.6KpBNsDiybdyfBaulndvhshGMH4b4oA7m3Ku_qoY5r0'
      if (e === 'ZHYOA') {
        window.open(`http://172.30.30.104:8080/#/login?userId=${userId}&token=${token}`)
        return
      }
      if (e === 'ZHYFF') { // 费控方案
        localStorage.setItem('routeType', 'home')
        this.$router.push('/' + e)
        return
      }
      localStorage.setItem('routeType', 'home')
      this.$router.push(this.prefix + e)
    },
    compileStr (code) { // 对字符串进行编码
      var c = String.fromCharCode(code.charCodeAt(0) + code.length)
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
      }
      return escape(c)
    },
    checkUserInfo (item) {
      if (item === '个人信息') {
        this.userInfoModel = true
        this.flagUserInfo = true
      }
      if (item === '修改密码') {
        this.revisePassWordModel = true
        this.flagRevisePassWord = true
      }
      if (item === '退出登录') {
        localStorage.clear()
        this.$router.push('/login')
      }
    },
    getUserInfoStatus (item) {
      console.log(item)
      this.userInfoModel = item.flag
      this.flagUserInfo = item.model
    },
    getRevisepassWordStatus (item) {
      console.log(item)
      this.flagRevisePassWord = item.flag
      this.revisePassWordModel = item.model
    },
    getBreadcrumb () { // 从Slide上面访问的路由视图方法
      if (localStorage.getItem('routeType') === 'tag') {
        return null
      } else {
        let matched = this.$route.matched
        let bool = false
        // let matched = this.$route.matched.filter(item => item.name) // $route.matched 将会是一个包含从上到下的所有对象 (副本)。
        this.levelList.forEach((item, index) => {
          this.levelList[index].colorType = false
          if (item.el.name === matched[1].name) { // 当前路由视图在leveList可以匹配成功时
            this.levelList[index].colorType = true
            bool = true
            return null
          }
        })
        if (!bool) { // 当前路由视图在leveList中匹配不到时 push
          this.levelList.push({
            colorType: true,
            el: matched[1]
          })
        }
      }
    },
    handleTag (name, index) { // Tag change时 对应的状态改变
      this.levelList.forEach((item, el) => {
        this.levelList[el].colorType = false
      })
      this.levelList[index].colorType = true
      localStorage.setItem('routeType', 'tag')
      this.$router.push(name)
    },
    closeHandleTag (name, index) { // 关闭Tag
      this.levelList.forEach((el, id) => {
        if (index === id) {
          this.levelList.splice(index, 1)
        }
      })
    },
    changeMenu (slideMenuOpenList) {
      console.log(slideMenuOpenList)
      this.slideMenuOpenList = slideMenuOpenList
      localStorage.setItem('slideMenuOpenList', JSON.stringify(slideMenuOpenList))
      localStorage.setItem('slideMenuOpenDefault', this.slideMenuOpenDefault)
    },
    drawerHandleClick () {
      this.$Notice.info({
        title: '消息通知',
        desc: '这里是消息通知！',
        top: 12,
        duration: 2
      })
    }
  },
  components: {
    userInfoModel,
    revisePassWordModel
  }
}
</script>

<style>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: auto;
  height: 28;
  /* width: 93px; */
  padding: 10px -10px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 0px;
  line-height: 30px;
  text-align: center;
  /* vertical-align: 9px; */
  /* vertical-align: text-bottom; */
  background: #2d8cf0;
  color: #fff;
  cursor: pointer;
}
.layout-nav{
  width: 420px;
  margin: 0 auto;
  overflow: hidden;
  margin-right: 20px;
}
.layoutWrap, .layout{
  width: 100%;
  height: 100%;
}
.layout-img {
  width: 208px;
  float: left;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: 5px;
  position: relative;
  /* background: url('/../../assets/logo.png') no-repeat contain; */
}

.layout-img::before {
  display: block;
  content: '';
  position: absolute;
  right: 18px;
  width: 1px;
  height: 40%;
  top: 30%;
  background: #fff;
}

.ivu-menu-horizontal.ivu-menu-light:after {
    content: '';
    display: block;
    width: 100%;
    /* height: 1px; */
    background: #dcdee2;
    position: absolute;
    bottom: 0;
    left: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.TagActive { font-weight: 800; }

/* .ivu-dropdown-item:hover {
  background: #8fa2cc;
}          */
</style>
