<template>
  <div class="reEmployAudit">
    <div class="reEmployAudit_title mb20">
      回聘审核
    </div>
    <div class="reEmployAudit_inputGroup">
      <Divider orientation="left">回聘人员</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" v-model="oldData.userId" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">姓名：</Button>
          <Input placeholder="" v-model="oldData.userName" readonly/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">身份证：</Button>
          <Input placeholder="" v-model="oldData.idcardno" readonly />
        </Col>
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
          <Input placeholder="" v-model="userReturn.userId" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <DatePicker :options="limitDateA" @on-change="userReturn.startworkdate=$event" type="date" placeholder="Select date" placement="bottom" v-model="userReturn.startworkdate"></DatePicker>
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
          <Input placeholder="" v-model="userReturn.userStatus" readonly />
        </Col>
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
          <Input placeholder="" v-model="userReturn.hrOpinion"  />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userReturn.remark" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr">
          <Button type="success" size="large" style="margin:auto;width:128px;" @click="updateApply"  v-if="auditStatus == '审批中'">保存修改数据</Button>
        </Col>
      </Row>
      <Divider></Divider>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="6">
          <Button type="success" size="large" style="margin:auto;width:128px;" @click="approvalAndApproval"  v-if="auditStatus == '审批中'">审批通过</Button>
        </Col>
        <Col class="col_flex tr" span="6">
          <Button type="error" size="large" style="margin:auto;width:128px;" @click="approvalNotApproved"  v-if="auditStatus == '审批中'">审批不通过</Button>
        </Col>
        <!-- <Col class="col_flex tr" span="6">
          <Button type="warning" size="large" style="margin:auto;width:128px;" @click="approvalAndRetreat"  v-if="auditStatus == '审批中'">回退</Button>
        </Col> -->
        <Col class="col_flex tr" span="6">
          <Button type="info" size="large" style="margin:auto;width:128px;" @click="approvalDisable"  v-if="auditStatus == '审批中'">审批作废</Button>
        </Col>
        <Col class="col_flex tr" span="6">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="approvalRollback"  v-if="auditStatus == '审批通过'">撤销</Button>
        </Col>
      </Row>
    </div>
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

import { getUserAudit, getUserAuditOldUser, getUserReturnApply, userAudit, postUserAuditRollback, updateUserReturn } from '@/server/api'

export default {
  data () {
    return {
      limitDateA: {
        disabledDate: date => {
          let endTime = Date.now()
          return date && date.valueOf() > endTime // 从某个时间开始 默认小于当前时间
        }
      },
      auditId: '',
      applyCode: '',
      auditStatus: '',
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
        annuityStartDate: '', // 年资起算日期
        annuityStartDateView: '',
        startworkdate: ''
      }
    }
  },
  created () {
    let params = {entityId: this.$route.params.entityId}
    getUserAuditOldUser(params).then((res) => {
      let user = res.data
      this.oldData = user
    })
    getUserAudit({id: this.$route.params.id}).then((res) => {
      // 变更类型
      this.auditId = res.data.id
      this.applyCode = res.data.applyCode
      this.auditStatus = res.data.auditStatus
      params = {id: res.data.applyId}
      getUserReturnApply(params).then((res) => {
        this.userReturn = res.data
      })
    })
  },
  methods: {
    approvalAndApproval () {
      let params = {}
      params.auditId = this.auditId
      params.userAuditType = '员工回聘申请'
      params.userAuditStatus = '审批通过'
      params.approverId = localStorage.getItem('userId')
      userAudit(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    },
    approvalNotApproved () {
      let params = {}
      params.auditId = this.auditId
      params.userAuditType = '员工回聘申请'
      params.userAuditStatus = '审批不通过'
      params.approverId = localStorage.getItem('userId')
      userAudit(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    },
    approvalAndRetreat () {},
    approvalDisable () {
      let params = {}
      params.auditId = this.auditId
      params.userAuditType = '员工回聘申请'
      params.userAuditStatus = '作废'
      params.approverId = localStorage.getItem('userId')
      userAudit(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    },
    approvalRollback () {
      let params = { auditId: this.auditId, applyCode: this.applyCode, operatorId: localStorage.userId }
      postUserAuditRollback(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    },
    updateApply () {
      let { startworkdate, cid, cname, did, jobId, returnAsk, dNewOpinion, dname, annuityStartDate, dOldOpinion, hrOpinion, jobName, remark } = {...this.userReturn}
      let params = Object.assign({}, {id: this.userReturn.id}, { startworkdate, cid, cname, did, jobId, returnAsk, dNewOpinion, dname, annuityStartDate, dOldOpinion, hrOpinion, jobName, remark })
      updateUserReturn(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      }).catch(err => {
        this.$Message.warning('数据操作异常!')
        throw err
      })
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
.reEmployAudit{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.reEmployAudit_title{
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
