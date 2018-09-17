<template>
  <div class="company">
    <div class="company_title mb20">
      角色菜单权限
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">角色名称：</Button>
          <Input search enter-button placeholder=""  v-model="roleName"  @on-search="queryRole" />
        </Col>
      </Row>
      <Row type="flex" class="code-row-bg mb10">
        <Col class="col_flex" span="24">
          <Divider>菜单配置</Divider>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Transfer
            :data="data4"
            :titles="title"
            :target-keys="targetKeys"
            :render-format="render4"
            @on-change="handleChange4">
          </Transfer>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>
    <roleQuery @tableRole="getRole" @statusRole='getRoleStatus' :data="modal6" v-if="flag6"></roleQuery>
  </div>
</template>
<script>
import roleQuery from '@/common/roleQuery'

import { getRoleMuneList, postRoleMuneList } from '@/server/api.js'
export default {
  data () {
    return {
      title: ['可配置菜单选项', '已配置菜单'],
      data4: [],
      menuList: [],
      targetList: [],
      targetKeys: [],
      rightMenu: [],
      roleId: '',
      roleName: '',
      // targetKeys4: this.getTargetKeys(),
      modal6: false,
      flag6: false,
      idType: [
        { value: 'New York', label: 'New York' },
        { value: 'London', label: 'London' }
      ],
      allData: {
        idTypeModel: '' // 证件类型value
      }
    }
  },
  created () {
    // let params = {}
    // let menuData = []
    // // this.$Spin.show()
    // getRoleMuneList(params).then((res) => { // 获取默认的菜单列表
    //   console.log(res)
    //   let menuList = [].concat(res)
    //   // this.$Spin.hide()
    //   menuList.forEach((item, index) => {
    //     menuData.push({
    //       ...item,
    //       ...{
    //         key: index,
    //         label: item.menu_ID,
    //         description: item.menu_NAME
    //       }
    //     })
    //     console.log(menuData)
    //   })
    // })
    // this.data4 = menuData
    // this.menuList = menuData
  },
  mounted () {
  },
  methods: {
    queryRole () { // 角色信息查询
      this.flag6 = true
      this.modal6 = true
    },
    getRole (item) {
      this.roleId = item.roleId
      this.roleName = item.roleName
      this.rightMenu = []
      this.targetList.forEach((item) => {
        item.roleId = this.roleId
        return item
      })
      this.getAllMenu()
    },
    getRoleStatus (item) {
      this.flag6 = item.comFlag
      this.modal6 = item.commodal
    },
    getAllMenu () { // 获取所有的菜单项
      let params = {
        ROLE_ID: this.roleId
      }
      let menuData = []
      // this.$Spin.show()
      getRoleMuneList(params).then((res) => { // 获取默认的菜单列表
        console.log(res)
        let menuList = [].concat(res)
        // this.$Spin.hide()
        menuList.forEach((item, index) => {
          menuData.push({
            ...item,
            ...{
              key: index,
              label: item.menu_ID,
              description: item.menu_NAME
            }
          })
          console.log(menuData)
        })
        this.data4 = menuData
        this.menuList = menuData
        this.menuList.forEach(item => {
          if (item.remark === 'T') {
            this.rightMenu.push(item.key)
            return ''
          }
        })
        this.handleChange4(this.rightMenu, 'right', this.rightMenu)
      })
      console.log(this.rightMenu)
    },
    handleChange4 (newTargetKeys, direction, moveKeys) { // 左右配置的事件
      this.targetList = []
      console.log(newTargetKeys, direction, moveKeys)
      this.targetKeys = newTargetKeys
      this.targetKeys.map(item => {
        for (let i = 0; i < this.data4.length; i++) {
          let obj = {
            roleId: this.roleId,
            menuId: ''
          }
          if (item === this.menuList[i].key) {
            obj.menuId = this.menuList[i].menu_ID
            this.targetList.push(obj)
          }
        }
      })
      console.log(this.targetList)
    },
    render4 (item) {
      return item.label + ' - ' + item.description
    },
    save () {
      let params = {
        a: this.targetList
      }
      postRoleMuneList(params).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    roleQuery
  }
}
</script>

<style>
.company {
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.company_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.company_inputGroup{
}
</style>
