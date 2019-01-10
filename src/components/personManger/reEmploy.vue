<template>
  <div class="reEmploy">
    <div class="reEmploy_title mb20">
      回聘申请
    </div>
    <div class="reEmploy_inputGroup">
      <Divider orientation="left">回聘人员</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" search enter-button @on-search="queryUser" v-model="oldData.userId" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">姓名：</Button>
          <Input placeholder="" v-model="oldData.userName" readonly/>
        </Col>
        <!--
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">姓名：</Button>
          <Input placeholder="" v-model="oldData.userName" readonly />
        </Col>
        -->
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">出生日期：</Button>
          <Input placeholder="" v-model="oldData.birthdateView" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">学历：</Button>
          <Input placeholder="" v-model="oldData.education" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司名称：</Button>
          <Input placeholder="" v-model="oldData.cname" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门名称：</Button>
          <Input placeholder="" v-model="oldData.dname" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位名称：</Button>
          <Input placeholder="" v-model="oldData.jobName" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <Input placeholder="" v-model="oldData.startworkdataView" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">前次离职日期：</Button>
          <Input placeholder="" v-model="oldData.lastworkdateView" readonly />
        </Col>
      </Row>
      <Divider orientation="left">回聘信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" v-model="userReturn.userId" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <DatePicker @on-change="userReturn.startworkdate=$event" type="date" placeholder="Select date" placement="bottom" v-model="userReturn.startworkdate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司名称：</Button>
          <Input placeholder="" search enter-button v-model="userReturn.cname" @on-search="queryCompany" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门名称：</Button>
          <Input placeholder="" search enter-button v-model="userReturn.dname"   @on-search="queryDepartment" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位名称：</Button>
          <Input placeholder="" search enter-button v-model="userReturn.jobName"  @on-search="queryJob" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder="" v-model="userReturn.userStatus"/>
        </Col>
        <!--
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">成本中心：</Button>
          <Input placeholder="" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">编制人数：</Button>
          <Input placeholder=""/>
        </Col>
        -->
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">年资起算日期：</Button>
          <DatePicker @on-change="userReturn.annuityStartDate=$event" type="date" placeholder="Select date" placement="bottom" v-model="userReturn.annuityStartDate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">回聘申请：</Button>
          <Input placeholder="" v-model="userReturn.returnAsk" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">原部门意见：</Button>
          <Input placeholder="" v-model="userReturn.dOldOpinion" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">回聘部门意见：</Button>
          <Input placeholder="" v-model="userReturn.dNewOpinion" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">HR部门意见：</Button>
          <Input placeholder="" v-model="userReturn.hrOpinion" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userReturn.remark" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>
    <userIdQueryDimission @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQueryDimission>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="userReturn.cid"></departmentQuery>
    <jobQuery @tableJob="getJob" @statusJob='getJobStatus' :data="model3" v-if="flag3" :did="userReturn.did"></jobQuery>
  </div>
</template>
<script>

import companyQuery from '@/common/companyQuery'
import departmentQuery from '@/common/departmentQuery'
import jobQuery from '@/common/jobQuery'
import userIdQueryDimission from '@/common/userIdQueryDimission'

import { postUserReturn, getUserId } from '@/server/api'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      flag3: false,
      model3: false,
      modal6: false,
      openSelectUserDialog: false,
      userIdFlag: 0,
      oldData: {
        userId: '', // 用户编号
        userName: '', // 用户名
        birthdateView: '', // 出生日期
        education: '', // 学历
        cname: '', // 公司名称
        dname: '', // 公司名称
        jobName: '', // 职位名称
        startworkdataView: '', // 入司时间
        lastworkdateView: '' // 离职日期
      },
      userReturn: {
        oldUserId: '', // 老用户编号
        userId: '', // 员工编号
        userName: '', // 员工姓名
        cid: '', // 公司id
        cname: '', // 公司名称
        did: '', // 部门id
        dname: '', // 部门名称
        userStatus: '试用员工', // 员工状态
        returnAsk: '', // 回聘申请
        dOldOpinion: '', // 原用人部门意见
        dNewOpinion: '', // 回聘部门意见
        hrOpinion: '', // HR部门意见
        jobName: '', // 职位名称
        jobId: '', // 职位id
        remark: '', // 备注
        annuityStartDate: '' // 年资起算日期
      }
    }
  },
  created () {
    this.getByUserId()
  },
  mounted () {},
  methods: {
    queryUser () {
      this.modal6 = true
      this.openSelectUserDialog = true
      this.userIdFlag = 0
    },
    getUserIdStatus (item) {
      this.openSelectUserDialog = item.comFlag
      this.modal6 = item.commodal
    },
    saveUserReturn () {
      postUserReturn(this.userReturn).then((res) => {
        if (res.code === 500) {
          alert('保存失败')
        }
      })
    },
    getByUserId () {
      getUserId().then((res) => {
        this.userReturn.userId = res.userId
      })
    },
    getUserId (item) {
      console.log(item)
      if (this.userIdFlag) {
        this.oldData.userId = item.userId // 用户编号
        this.oldData.userName = item.userName // 用户名
        this.oldData.birthdateView = item.birthdateView // 出生日期
        this.oldData.education = item.education // 学历
        this.oldData.cname = item.cname // 公司名称
        this.oldData.dname = item.dname // 公司名称
        this.oldData.jobName = item.dname // 职位名称
        this.oldData.startworkdataView = item.workType // 入司时间
        this.oldData.lastworkdateView = item.lastworkdateView // 离职日期
        this.userReturn.userName = item.userName // 用户姓名
      } else {
        this.oldData.userId = item.userId // 用户编号
        this.oldData.userName = item.userName // 用户名
        this.oldData.birthdateView = item.birthdateView // 出生日期
        this.oldData.education = item.education // 学历
        this.oldData.cname = item.cname // 公司名称
        this.oldData.dname = item.dname // 公司名称
        this.oldData.jobName = item.dname // 职位名称
        this.oldData.startworkdataView = item.workType // 入司时间
        this.oldData.lastworkdateView = item.lastworkdateView // 离职日期
        this.userReturn.userName = item.userName // 用户姓名
      }
    },
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.userReturn.cid = item.cid
      this.userReturn.cname = item.cname
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      if (!this.userReturn.cid) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      // console.log(item)
      this.userReturn.did = item.did
      this.userReturn.dname = item.dname
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    queryJob () { // 公司信息查询
      if (this.userReturn.did) {
        this.flag3 = true
        this.model3 = true
      } else {
        this.$Message.info('请先选择部门！')
        return false
      }
    },
    getJob (item) {
      this.userReturn.jobId = item.jobId
      this.userReturn.jobName = item.jobName
      this.userReturn.jobType = item.jobType
      this.userReturn.jobLevel = item.jobLevel
    },
    getJobStatus (item) {
      this.flag3 = item.comFlag
      this.model3 = item.commodal
    },
    save () {
      let params = this.userReturn
      params['oldUserId'] = this.oldData.userId
      params.operatorId = localStorage.getItem('userId')
      postUserReturn(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(0)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    }
  },
  components: {
    userIdQueryDimission,
    departmentQuery,
    companyQuery,
    jobQuery
  }
}
</script>

<style>
.reEmploy{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.reEmploy_title{
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

/* .reEmploy .ivu-input-group { width: 60% !important; } */

</style>
