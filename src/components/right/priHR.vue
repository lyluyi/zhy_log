<template>
  <div class="contract">
    <div class="contract_title mb20">
      HR权限管理
    </div>
    <div class="contract_inputGroup">
      <Divider orientation="left">员工信息添加</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">工号：</Button>
            <Input placeholder="" search enter-button v-model="userContract.userId" @on-search="queryUser" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >姓名：</Button>
          <Input placeholder="" v-model="userContract.userName" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司id：</Button>
          <Input placeholder="" search enter-button v-model="userContract.cId" @on-search="queryCompany" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >公司名称：</Button>
          <Input placeholder="" v-model="userContract.cName" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="saveContract">保存</Button>
        </Col>
      </Row>
      <Divider orientation="left">查询信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >用户名ID：</Button>
          <Input placeholder="" search enter-button @on-search="queryUser2" v-model="inquiry.userId" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >姓名：</Button>
          <Input placeholder="" v-model="inquiry.userName" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司ID：</Button>
          <Input placeholder="" search enter-button v-model="inquiry.cId" @on-search="queryCompany2" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >公司名称：</Button>
          <Input placeholder="" v-model="inquiry.cName" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
        <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="queryUserAudit">查询</Button>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
          <Table border :columns="columns" :data="UserContractPageData" @on-row-click="selectUser" ></Table>
          <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
      </Row>
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQuery>
  </div>
</template>
<script>

import { defaultQuery, updateList, deletePriHR } from '@/server/api'
import userIdQuery from '@/common/userIdQuery'
import companyQuery from '@/common/companyQuery'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      modal6: false,
      openSelectUserDialog: false,
      numFlag: '',
      columns: [
        {
          title: '员工编号',
          key: 'userId'
        },
        {
          title: '员工姓名',
          key: 'userName'
        },
        {
          title: '公司ID',
          key: 'cId'
        },
        {
          title: '公司',
          key: 'cName'
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
                    this.remove(params)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      UserContractPageParams: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      userContract: {
        priHRId: '',
        userId: '', // 员工工号
        userName: '',
        cId: '',
        cName: ''
      },
      inquiry: {
        userId: '', // 员工工号
        userName: '',
        cId: '',
        cName: ''
      },
      delete: {
        priHRId: ''
      },
      UserContractPageData: [],
      conTypeItems: [],
      signTypeItems: []
    }
  },
  created () {
    this.queryUserContractPageData()
  },
  methods: {
    queryUser () {
      this.modal6 = true
      this.numFlag = '1'
      this.openSelectUserDialog = true
      this.userIdFlag = 0
    },
    queryUser2 () {
      this.modal6 = true
      this.numFlag = '2'
      this.openSelectUserDialog = true
      this.userIdFlag = 0
    },
    getUserIdStatus (item) {
      this.openSelectUserDialog = item.comFlag
      this.modal6 = item.commodal
    },
    getUserId (item) {
      if (this.numFlag === '1') {
        this.userContract.userId = item.userId
        this.userContract.userName = item.userName
      } else {
        this.inquiry.userId = item.userId
        this.inquiry.userName = item.userName
      }
    },
    queryCompany () { // 公司信息查询
      this.numFlag = '1'
      this.flag1 = true
      this.model1 = true
    },
    queryCompany2 () { // 公司信息查询
      this.numFlag = '2'
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      if (this.numFlag === '1') {
        this.userContract.cName = item.cname
        this.userContract.cId = item.cid
      } else {
        this.inquiry.cName = item.cname
        this.inquiry.cId = item.cid
      }
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    selectUser (item, index) {
      console.log(item)
      this.userContract = item
      this.userContract.priHRId = item.priHRId
      this.userContract.userId = item.userId
      this.userContract.userName = item.userName
      this.userContract.cId = item.cId
      this.userContract.cName = item.cName
    },
    // 删除数据单条
    remove (params) {
      this.delete.priHRId = params.row.priHRId
      deletePriHR(this.delete).then((res) => {
        this.$Message.info({ content: res.msg })
        this.queryUserContractPageData()
      })
    },
    queryUserAudit () {
      let params = {pageNumber: 1, pageInfo: 10}
      params = Object.assign({}, params, this.inquiry)
      this.getUserAuditPage(params)
    },
    getUserAuditPage (params) {
      defaultQuery(params).then((res) => {
        this.UserContractPageData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.UserContractPageParams.pageNumber = pageNumber
        this.UserContractPageParams.pageSize = pageSize
        this.UserContractPageParams.totalPage = totalPage
        this.UserContractPageParams.totalRow = totalRow
      })
    },
    queryUserContractPageData () {
      this.UserContractPageParams = {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
      let params = {...this.UserContractPageParams}
      this.getUserAuditPage(params)
    },
    changeUserContractPageNumber (num) {
      this.UserContractPageParams.pageNumber = num
      this.UserContractPageParams = Object.assign({}, this.UserContractPageParams, this.inquiry)
      this.getUserAuditPage(this.UserContractPageParams)
    },
    saveContract () {
      if (this.userContract.userId) {
        // this.userContract.userId = this.userContract.userId
        updateList(this.userContract).then((res) => {
          this.userContract.priHRId = ''
          console.log(res)
          this.$Message.info({ content: '保存成功' })
          this.queryUserContractPageData()
        })
      } else {
        this.$Message.info({ content: '员工信息未选择' })
      }
    }
  },
  components: {
    companyQuery,
    userIdQuery
  }
}
</script>

<style>
.contract{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.contract_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.contract .ivu-divider-inner-text{
  font-size: 15px;
  font-weight: bolder;
  color: #2d8cf0;
}

.contract .ivu-switch {
  margin:  auto 0;
}

</style>
