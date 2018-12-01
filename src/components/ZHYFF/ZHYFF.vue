<template>
  <div class="layout ZHYFF">
    <Layout class="layoutWrap">
      <Header>
        <div class="layout-logo">费控管理</div>
      </Header>
      <Layout>
        <Sider class="slider" hide-trigger :style="{background: '#fff',overflow: 'auto'}">
          <Menu theme="light" active-name="1" style="width: 100%; padding-top:24px;" @on-select="routerTo">
              <MenuGroup title="汇率管理">
                <MenuItem name="exchangeManegement">
                  <Icon type="md-calculator" />
                  汇率维护
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="BPC版本维护">
                <!-- <MenuItem name="BPCVersions">
                  <Icon type="md-document" />
                  汇率维护
                </MenuItem> -->
              </MenuGroup>
              <MenuGroup title="统计报表管理">
                <MenuItem name="companyBudget">
                  <Icon type="md-document" />
                  公司预算使用表
                </MenuItem>
                <MenuItem name="departmentBudget">
                  <Icon type="md-document" />
                  职能部门预算使用表
                </MenuItem>
                <MenuItem name="areaBudget">
                  <Icon type="md-document" />
                  片区预算使用情况表
                </MenuItem>
              </MenuGroup>
          </Menu>
        </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '16px 0'}">
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
      <!-- <Footer class="footer">321</Footer> -->
    </Layout>
  </div>
</template>

<script>

export default {
  data () {
    return {
      prefix: '/ZHYFF/'
    }
  },
  created () {
  },
  methods: {
    routerTo (e) {
      this.$router.push(this.prefix + e)
    }
  }
}
</script>

<style>
.ZHYFF{
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif !important;
}
.ZHYFF .layout-logo {
  /* margin:  0 auto;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 64px;
  color: #fff;
  background: #2d8cf0;
  cursor: pointer; */
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
/* .ZHYFF .ivu-layout-header {
  padding: 0 !important;
} */

.ZHYFF .ivu-input-group { width: 75%; }

.ZHYFF .layout-nav{
  width: 420px;
  margin: 0 auto;
  overflow: hidden;
  margin-right: 20px;
}
.ZHYFF .layoutWrap, .layout{
  width: 100%;
  height: 100%;
}
.ZHYFF .slider {
  box-shadow: 0 2px 30px 7px hsla(0,0%,39%,.1) !important;
}

.ZHYFF .footer{
  background: rgb(255, 255, 255) !important;
  position: relative;
  left: 0;
  top: 0;
  z-index: 10000;
}
</style>
