<template>
  <div class="contract">
    <div class="contract_title mb20">
      合同信息录入
    </div>
    <div class="contract_inputGroup">
      <Divider orientation="left">员工基本信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" v-model="currentUser.userId" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >姓名：</Button>
          <Input placeholder="" v-model="currentUser.userName" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >性别：</Button>
          <Input placeholder="" v-model="currentUser.sex" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >年龄：</Button>
          <Input placeholder="" v-model="currentUser.age" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">学历：</Button>
          <Input placeholder="" v-model="currentUser.education" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">所属公司：</Button>
          <Input placeholder="" v-model="currentUser.cname" readonly  />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门：</Button>
          <Input placeholder="" v-model="currentUser.dname" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位：</Button>
          <Input placeholder="" v-model="currentUser.userType" readonly />
        </Col>
      </Row>

      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">直接主管：</Button>
          <Input placeholder="" v-model="currentUser.upHeader" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <Input placeholder="" v-model="currentUser.startworkdataView" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder="" v-model="currentUser.userStatus" readonly />
        </Col>
      </Row>

      <Divider orientation="left">合同信息</Divider>

      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">签订类型：</Button>
          <i-select v-model="userContract.signType">
            <Option v-for="item in signTypeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </i-select>
        </Col>

        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">非固定限期合同：</Button>
          <i-switch v-model="userContract.isLongConView" @on-change="isLongConViewChange" />
        </Col>
      </Row>

      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同类型：</Button>
          <!-- <Input placeholder="" v-model="userContract.conType" /> -->
          <i-select v-model="userContract.conType">
            <Option v-for="item in conTypeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </i-select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同编号：</Button>
          <Input placeholder="" v-model="userContract.contractid" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同名称：</Button>
          <Input placeholder="" v-model="userContract.conName" />
        </Col>
      </Row>

      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">应届毕业生：</Button>
          <!-- <Input placeholder="" v-model="userContract.isGraduates" /> -->
          <i-switch v-model="userContract.isGraduatesView" @on-change="isGraduatesViewChange" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同生效日：</Button>
          <DatePicker type="date" placeholder="合同生效日" placement="bottom" v-model="userContract.conBeginDate"></DatePicker>
        </Col>
        <Col class="col_flex" span="8" v-if="userContract.isLongConView === false">
          <Button class="wd mr10 tr" type="text">合同终止日：</Button>
          <DatePicker type="date" placeholder="合同终止日" placement="bottom" v-model="userContract.conEndDate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">签订日期：</Button>
          <DatePicker type="date" placeholder="签订日期" placement="bottom" v-model="userContract.signDate"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">签约用人单位：</Button>
          <Input placeholder="" search enter-button v-model="userContract.conCname" @on-search="queryCompany" readonly />
        </Col>
        <!-- <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">实际终止日：</Button>
          <DatePicker type="date" placeholder="实际终止日" placement="bottom" v-model="userContract.conEndTime"></DatePicker>
        </Col> -->
      </Row>

      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同签订部门：</Button>
          <Input placeholder="" search enter-button v-model="userContract.conDept" @on-search="queryDepartment" readonly />
        </Col>
      </Row>

      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="saveContract">保存</Button>
        </Col>
      </Row>

      <Row :gutter="16" class="mb20 mt20 pt20">
          <!-- <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin:0 16px;">查询条件</Button>
          </Col> -->
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="24">
            <Tabs value="newContractWork" @on-click="tabChange" :animated="false" style="width: 100%;">
              <TabPane :label="tabPane.newContractWork" name="newContractWork">
                <Table border :columns="columns" :data="UserContractPageData" @on-row-click="selectUser" ></Table>
                <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.newContractPractice" name="newContractPractice">
                <Table border :columns="columns" :data="UserContractPageData" @on-row-click="selectUser" ></Table>
                <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.newContractLabour" name="newContractLabour">
                <Table border :columns="columns" :data="UserContractPageData" @on-row-click="selectUser" ></Table>
                <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.newContractPartTimeJob" name="newContractPartTimeJob">
                <Table border :columns="columns" :data="UserContractPageData" @on-row-click="selectUser" ></Table>
                <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.thisMonth" name="thisMonth">
                <Table border :columns="columns" :data="UserContractPageData" @on-row-click="selectUser" ></Table>
                <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.nextMonth" name="nextMonth">
                  <Table border :columns="columns" :data="UserContractPageData"  @on-row-click="selectUser" ></Table>
                  <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.threeMonth" name="threeMonth">
                  <Table border :columns="columns" :data="UserContractPageData"  @on-row-click="selectUser" ></Table>
                  <Page :total="UserContractPageParams.totalRow" :current="UserContractPageParams.pageNumber" :page-size="UserContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="cid"></departmentQuery>
  </div>
</template>
<script>

import { getUserContractPage, postSaveUserContractPage } from '@/server/api'
import getDic from '@/server/apiDic'
import companyQuery from '@/common/companyQuery'
import departmentQuery from '@/common/departmentQuery'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      tabPane: {
        newContractWork: (h) => {
          return h('div', [
            h('span', '待新签劳动合同')
          ])
        },
        newContractPractice: (h) => {
          return h('div', [
            h('span', '待新签实习协议')
          ])
        },
        newContractLabour: (h) => {
          return h('div', [
            h('span', '待新签劳务协议')
          ])
        },
        newContractPartTimeJob: (h) => {
          return h('div', [
            h('span', '待新签兼职协议')
          ])
        },
        thisMonth: (h) => {
          return h('div', [
            h('span', '本月续签')
          ])
        },
        nextMonth: (h) => {
          return h('div', [
            h('span', '下月续签')
          ])
        },
        threeMonth: (h) => {
          return h('div', [
            h('span', '三个月之内续签')
          ])
        }
      },
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
          title: '身份证号',
          key: 'idcardno'
        },
        {
          title: '公司',
          key: 'cname'
        },
        {
          title: '部门',
          key: 'dname'
        },
        {
          title: '职位',
          key: 'jobName'
        },
        {
          title: '入职时间',
          key: 'startworkdataView'
        },
        {
          title: '合同到期时间',
          key: 'conEndTimeView'
        },
        {
          title: '员工状态',
          key: 'userStatus'
        },
        {
          title: '合同预签类型',
          key: 'newSigningConTypes'
        }
      ],
      UserContractPageParams: {
        newSigningConTypes: '',
        queryType: '',
        timeType: '',
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      userContract: {
        userId: '', // 员工工号
        contractid: '', // 合同编号
        conName: '', // 合同名称
        conType: '', // 合同类型
        signType: '', // 签订类型
        signDate: '', // 签订日期
        conBeginDate: '', // 合同生效日期
        conEndDate: '', // 合同终止日期
        conEndTime: '', // 实际终止日期
        conDept: '', // 合同签订部门
        conCname: '', // 签约用工单位
        isGraduates: 0, // 是否应届毕业生
        isGraduatesView: false, // 是否应届毕业生
        isLongCon: '否', // 是否无固定期限合同
        isLongConView: false
      },
      currentTabName: 'newContractWork', // 选择的tab
      currentUser: {}, // 当前选择的用户
      UserContractPageData: [],
      conTypeItems: [],
      signTypeItems: []
    }
  },
  created () {
    this.newSigningConTypes = 'newContractWork'
    this.timeType = ''
    this.queryType = 'endContract'
    getDic('contractType').then((res) => {
      // console.log(res)
      this.conTypeItems = res.data
    })
    getDic('contractSignType').then((res) => {
      this.signTypeItems = res.data
    })
    this.queryUserContractPageData()
    console.log(this.userContract.isLongCon)
    console.log(this.userContract.isLongConView)
  },
  mounted () {},
  methods: {
    selectUser (item, index) {
      this.currentUser = item
    },
    tabChange (name) {
      if (name === 'thisMonth') {
        this.newSigningConTypes = ''
        this.queryType = 'endContract'
        this.timeType = 'thisMonth'
        this.queryUserContractPageData()
      }
      if (name === 'nextMonth') {
        this.newSigningConTypes = ''
        this.queryType = 'endContract'
        this.timeType = 'nextMonth'
        this.queryUserContractPageData()
      }
      if (name === 'threeMonth') {
        this.newSigningConTypes = ''
        this.queryType = 'endContract'
        this.timeType = 'threeMonth'
        this.queryUserContractPageData()
      }
      if (name === 'newContractWork') { // 劳动
        this.newSigningConTypes = 'newContractWork'
        this.timeType = ''
        this.queryType = 'endContract'
        this.queryUserContractPageData()
      }
      if (name === 'newContractPractice') { // 协议
        this.newSigningConTypes = 'newContractPractice'
        this.timeType = ''
        this.queryType = 'endContract'
        this.queryUserContractPageData()
      }
      if (name === 'newContractLabour') { // 劳务
        this.newSigningConTypes = 'newContractLabour'
        this.timeType = ''
        this.queryType = 'endContract'
        this.queryUserContractPageData()
      }
      if (name === 'newContractPartTimeJob') { // 兼职
        this.newSigningConTypes = 'newContractPartTimeJob'
        this.timeType = ''
        this.queryType = 'endContract'
        this.queryUserContractPageData()
      }
    },
    queryUserContractPageData () {
      this.UserContractPageParams = {
        newSigningConTypes: this.newSigningConTypes,
        queryType: this.queryType,
        timeType: this.timeType,
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
      let params = {...this.UserContractPageParams}
      getUserContractPage(params).then((res) => {
        this.UserContractPageData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.UserContractPageParams.pageNumber = pageNumber
        this.UserContractPageParams.pageSize = pageSize
        this.UserContractPageParams.totalPage = totalPage
        this.UserContractPageParams.totalRow = totalRow
      })
    },
    queryUserContractPage () {

    },
    changeUserContractPageNumber (num) {
      this.UserContractPageParams.pageNumber = num
      getUserContractPage(this.UserContractPageParams).then((res) => {
        this.UserContractPageData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.UserContractPageParams.pageNumber = pageNumber
        this.UserContractPageParams.pageSize = pageSize
        this.UserContractPageParams.totalPage = totalPage
        this.UserContractPageParams.totalRow = totalRow
      })
    },
    saveContract () {
      if (this.currentUser.userId) {
        this.userContract.userId = this.currentUser.userId
        postSaveUserContractPage(this.userContract).then((res) => {
          if (res.code === 200) {
            this.$Message.info({ content: '保存成功' })
            this.$router.go(0)
          } else {
            this.$Message.info({ content: res.msg })
          }
        })
      } else {
        this.$Message.info({ content: '请先选择合同签订人' })
      }
    },
    isGraduatesViewChange () {
      if (this.userContract.isGraduatesView) {
        this.userContract.isGraduates = '1'
      } else {
        this.userContract.isGraduates = '0'
      }
    },
    isLongConViewChange () {
      if (this.userContract.isLongConView) {
        this.userContract.isLongCon = '是'
      } else {
        this.userContract.isLongCon = '否'
      }
      console.log(this.userContract.isLongCon)
    },
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.userContract.conCname = item.cname
      this.cid = item.cid
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      if (!this.userContract.conCname) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      // console.log(item)
      this.userContract.conDept = item.dname
      this.did = item.did
    },
    getDepartmentStatus (item) {
      // console.log(item)
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
