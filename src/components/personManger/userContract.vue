<template>
    <div class="userContract">
      <div class="userContract_title mb20">
        合同查询
      </div>
      <div class="userContract_inputGroup">
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">公司名称：</Button>
            <Input placeholder="" search enter-button v-model="userContractPageParams.cname" @on-search="queryCompany" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >部门名称：</Button>
            <Input placeholder="" search enter-button v-model="userContractPageParams.dname"   @on-search="queryDepartment" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >员工编号：</Button>
            <Input type="text" placeholder="" v-model="userContractPageParams.userId" />
          </Col>
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">用户姓名：</Button>
            <Input type="text" placeholder="" v-model="userContractPageParams.userName" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >签订用工单位：</Button>
            <Input type="text" placeholder="" v-model="userContractPageParams.conCname" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >用户状态：</Button>
            <i-select v-model="userContractPageParams.userStatus">
              <Option>请选择</Option>
              <Option v-for="item in userStatusItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </i-select>
          </Col>
        </Row>
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="query">查询</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24" class="dict_col">
            <Table highlight-row border :columns="userContractColumns" :sortable="true" :data="userContractData"></Table>
            <Page :total="userContractPageParams.totalRow" :current="userContractPageParams.pageNumber" :page-size="userContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
            <!-- <Table highlight-row border :columns="columns" :sortable="true" :data="userAuditData"  ref="dictTypeTable" @on-row-click="selectUserAudit" ></Table>
            <Page :total="userAuditPageInfo.totalRow" :current="userAuditPageInfo.pageNumber" :page-size="userAuditPageInfo.pageSize" @on-change="changeUserAuditPageNumber" show-total  class="mt20" /> -->
          </Col>
        </Row>
      </div>

      <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
      <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="userContractPageParams.cid"/>
    </div>
</template>

<script>

import { getUserContractInfoPage } from '@/server/api'
import companyQuery from '@/common/companyQuery'
import departmentQuery from '@/common/departmentQuery'
import getDic from '@/server/apiDic'

export default {

  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      userStatusItems: {},
      userContractColumns: [
        {
          title: '工号',
          key: 'userId',
          width: 120,
          fixed: 'left'
        },
        {
          title: '中文名',
          key: 'userName',
          width: 120,
          fixed: 'left'
        },
        {
          title: '所属公司',
          width: 218,
          key: 'cname'
        },
        {
          title: '性别',
          width: 120,
          key: 'sex'
        },
        {
          title: '部门名称',
          width: 120,
          key: 'dname'
        },
        {
          title: '职位名称',
          width: 120,
          key: 'jobName'
        },
        {
          title: '学历',
          width: 120,
          key: 'education'
        },
        {
          title: '直接主管',
          width: 120,
          key: 'upHeader'
        },
        {
          title: '入司日期',
          width: 120,
          key: 'startworkdata'
        },
        {
          title: '合同类型',
          width: 120,
          key: 'conType'
        },
        {
          title: '签订类型',
          width: 120,
          key: 'signType'
        },
        {
          title: '签订日期',
          width: 120,
          key: 'signDate'
        },
        {
          title: '合同编号',
          width: 120,
          key: 'contractId'
        },
        {
          title: '合同名称',
          width: 218,
          key: 'conName'
        },
        {
          title: '合同生效日期',
          width: 120,
          key: 'conBeginDate'
        },
        {
          title: '合同终止日',
          width: 120,
          key: 'conEndDate'
        },
        {
          title: '合同实际终止日',
          width: 120,
          key: 'conEndTime'
        },
        {
          title: '签约用工单位',
          width: 218,
          key: 'conCname'
        }
      ],
      userContractData: [],
      userContractPageParams: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
    }
  },

  created () {
    this.queryUserContractData()
    getDic('userStatus').then((res) => {
      // console.log(res)
      this.userStatusItems = res.data
    })
  },
  methods: {
    query () {
      this.changeUserContractPageNumber(1)
    },
    queryUserContractData () {
      getUserContractInfoPage(this.userContractPageParams).then((res) => {
        this.userContractData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userContractPageParams.pageNumber = pageNumber
        this.userContractPageParams.pageSize = pageSize
        this.userContractPageParams.totalPage = totalPage
        this.userContractPageParams.totalRow = totalRow
      })
    },
    changeUserContractPageNumber (num) {
      this.userContractPageParams.pageNumber = num
      getUserContractInfoPage(this.userContractPageParams).then((res) => {
        this.userContractData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userContractPageParams.pageNumber = pageNumber
        this.userContractPageParams.pageSize = pageSize
        this.userContractPageParams.totalPage = totalPage
        this.userContractPageParams.totalRow = totalRow
      })
    },
    queryCompany () {
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.userContractPageParams.cid = item.cid
      this.userContractPageParams.cname = item.cname
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () {
      if (!this.userContractPageParams.cid) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      this.userContractPageParams.did = item.did
      this.userContractPageParams.dname = item.dname
    },
    getDepartmentStatus (item) {
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    }
  },
  components: {
    departmentQuery,
    companyQuery
  }
}
</script>

<style>
.userContract{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.userContract_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.ivu-divider-inner-text {
  font-size: 15px;
  font-weight: bolder;
  color:#2d8cf0;
}
</style>
