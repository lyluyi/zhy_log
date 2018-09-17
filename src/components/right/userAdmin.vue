<template>
  <div class="company">
    <div class="company_title mb20">
      用户账号管理
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button type="primary" class="ml10" style="width:128px;margin-top:-2px;" @click="userQuery">人员账号查询</Button>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">查询角色：</Button>
          <Input search enter-button placeholder="" v-model="roleName" @on-search="queryRole" />
        </Col>
      </Row>
      <Row type="flex" class="code-row-bg mb10">
        <Col class="col_flex" span="24">
          <Divider>已配置账号</Divider>
        </Col>
      </Row>
      <!-- <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">已选账号：</Button>
          <Input placeholder="" />
        </Col> -->
         <!-- <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">账号是否注销：</Button>
          <Input placeholder="" />
        </Col> -->
      <!-- </Row> -->
      <Table border :columns="columns7" :data="data6" class="mb20"></Table>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save()">保存</Button>
        </Col>
      </Row>
    </div>
    <roleQuery @tableRole="getRole" @statusRole='getRoleStatus' :data="modal7" v-if="flag7"></roleQuery>
    <userAdminQuery @tableUserAdmin="getUserAdmin" @statusUserAdmin='getUserAdminStatus' :data="modal6" v-if="flag6"></userAdminQuery>
  </div>
</template>
<script>

import userAdminQuery from '@/common/userAdminQuery'
import roleQuery from '@/common/roleQuery'

import { postUserAdminList } from '@/server/api.js'

export default {
  data () {
    return {
      modal6: false,
      flag6: false,
      modal7: false,
      flag7: false,
      roleId: '',
      roleName: '',
      columns7: [
        {
          title: '人员ID',
          key: 'userId'
        },
        {
          title: '人员名称',
          key: 'userName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data6: [],
      allData: {
        userList: [],
        roleId: '',
        roleName: ''
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    userQuery () { // 公司信息查询
      this.flag6 = true
      this.modal6 = true
    },
    getUserAdmin (item) {
      // console.log(item)
      // this.alldata.reportOfUserAdminId = item.cid
      // this.alldata.reportOfUserAdminName = item.cname
      let obj = {
        userId: item.userId,
        userName: item.userName
      }
      this.data6 = [obj, ...this.data6]
      // this.data6.forEach((item) => {
      //   if (item.userId === obj.userId) {
      //     return;
      //   } else {
      //     this.data6 = [obj, ...this.data6]
      //   }
      // })
    },
    getUserAdminStatus (item) {
      this.flag6 = item.comFlag
      this.modal6 = item.commodal
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    queryRole () { // 角色信息查询
      this.flag7 = true
      this.modal7 = true
    },
    getRole (item) {
      this.roleId = item.roleId
      this.roleName = item.roleName
      this.allData.roleId = item.roleId
      this.allData.roleName = item.roleName
    },
    getRoleStatus (item) {
      this.flag7 = item.comFlag
      this.modal7 = item.commodal
    },
    save () {
      this.allData.userList = this.data6
      let params = this.allData
      postUserAdminList(params).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    userAdminQuery,
    roleQuery
  }
}
</script>

<style>
.company{
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
