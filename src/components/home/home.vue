<template>
  <div class="layout">
    <Layout class="layoutWrap">
      <Header>
        <Menu mode="horizontal" theme="light" active-name="1">
          <div class="layout-logo">平台系统</div>
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
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',overflow: 'auto'}">
          <Menu active-name="company" theme="light" width="auto" :open-names="['personInfo']" @on-select="routerTo">
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
            <Breadcrumb :style="{margin: '16px 0'}">
              <!-- <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <Content id="content" :style="{padding: '24px', background: '#fff' }">
              <transition name="fade" mode="out-in">
                <!-- 组件重复渲染的情况下，可以应用缓存 -->
                <!-- <keep-alive>  -->
                  <router-view/>
                <!-- </keep-alive>   -->
              </transition>
            </Content>
          </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuData: [],
      prefix: '/home/' // router prefix
    }
  },
  created () {
    this.menuData = JSON.parse(localStorage.getItem('menuList'))
    console.log(this.menuData)
  },
  methods: {
    routerTo (e) {
      let userId = localStorage.getItem('userId')
      // let token = this.compileStr('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLlvKDmtpsiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE1MzY0MDA2OTgsImV4cCI6MTUzODEwNTczMH0.6KpBNsDiybdyfBaulndvhshGMH4b4oA7m3Ku_qoY5r0')
      let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLlvKDmtpsiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE1MzY0MDA2OTgsImV4cCI6MTUzODEwNTczMH0.6KpBNsDiybdyfBaulndvhshGMH4b4oA7m3Ku_qoY5r0'
      if (e === 'ZHYOA') {
        window.open(`http://localhost:8055/#/login?userId=${userId}&token=${token}`)
        return
      }
      this.$router.push(this.prefix + e)
    },
    compileStr (code) { // 对字符串进行加密
      var c = String.fromCharCode(code.charCodeAt(0) + code.length)
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
      }
      return escape(c)
    }
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
  width: 100px;
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
</style>
