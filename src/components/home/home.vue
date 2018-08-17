<template>
  <div class="layout">
    <Layout class="layoutWrap">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
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
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',overflow: 'auto'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="routerTo">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                人员信息
              </template>
              <MenuItem name="company">公司</MenuItem>
              <MenuItem name="department">部门</MenuItem>
              <MenuItem name="job">职务</MenuItem>
              <MenuItem name="person">人员</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                权限
              </template>
              <MenuItem name="2-1">角色</MenuItem>
              <MenuItem name="2-2">菜单</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                系统
              </template>
              <MenuItem name="3-1">OA</MenuItem>
              <MenuItem name="3-2">HR</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                平台应用
              </template>
              <MenuItem name="4-1">用户行为日志</MenuItem>
              <MenuItem name="4-2">角色管理</MenuItem>
              <MenuItem name="4-1">OA报表</MenuItem>
              <MenuItem name="4-2">HR打卡记录</MenuItem>
              <MenuItem name="4-1">公司组织架构</MenuItem>
              <MenuItem name="4-2">人员联系方式</MenuItem>
              <MenuItem name="4-1">公司通知</MenuItem>
              <MenuItem name="4-2">个人信息查询</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', background: '#fff'}">
              <transition mode="out-in">
                  <router-view/>
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
      prefix: '/home/' // router prefix
    }
  },
  methods: {
    routerTo (e) {
      this.$router.push(this.prefix + e)
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
.layout-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layoutWrap, .layout{
  width: 100%;
  height: 100%;
}
</style>
