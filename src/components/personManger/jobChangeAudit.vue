<template>
  <div class="jobChangeAudit">
    <div class="jobChangeAudit_title mb20">
      职位变动管理审批
    </div>
    <div class="jobChangeAudit_inputGroup">
      <Divider orientation="left">员工基本信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" v-model="oldData.userId" readonly/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >姓名：</Button>
          <Input placeholder="" v-model="oldData.userName" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >性别：</Button>
          <Input placeholder="" v-model="oldData.sex" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text" >年龄：</Button>
          <Input placeholder="" v-model="oldData.age" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">学历：</Button>
          <Input placeholder="" v-model="oldData.education" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">所属公司：</Button>
          <Input placeholder="" v-model="oldData.cname" readonly  />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门：</Button>
          <Input placeholder="" v-model="oldData.dname" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位：</Button>
          <Input placeholder="" v-model="oldData.userType" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">直接主管：</Button>
          <Input placeholder="" v-model="oldData.upHeader" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <Input placeholder="" v-model="oldData.startworkdataView" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder="" v-model="oldData.userStatus" readonly />
        </Col>
      </Row>
      <Divider orientation="left">职位变动申请</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">变更类型：</Button>
          <Select v-model="userCdChange.changeType">
            <Option v-for="item in changeTypeDic" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">申请日期：</Button>
          <DatePicker placement="bottom" v-model="userCdChange.changeDate" @on-change="userCdChange.changeDate=$event" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">生效日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userCdChange.effectDate" ></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新公司：</Button>
          <Input search enter-button  placeholder=""  v-model="userCdChange.cnameNew" @on-search="queryCompany" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新部门：</Button>
          <Input search enter-button  placeholder="" v-model="userCdChange.dnameNew"  @on-search="queryDepartment" readonly/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新职位：</Button>
          <Input  placeholder="" search enter-button v-model="userCdChange.jobnameNew" @on-search="queryJob" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新所属区域：</Button>
          <Input placeholder="" v-model="userCdChange.area" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新直接主管：</Button>
          <Input placeholder="" v-model="userCdChange.upheaderNewName" search enter-button @on-search="queryUpHeader" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">见习转正日期：</Button>
          <DatePicker @on-change="userCdChange.toBeWorkDate=$event" type="date" placeholder="Select date" placement="bottom" v-model="userCdChange.toBeWorkDate" format="yyyy-MM-dd" ></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userCdChange.remark"  />
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
        <Col class="col_flex tr" span="6">
          <Button type="warning" size="large" style="margin:auto;width:128px;" @click="approvalAndRetreat"  v-if="auditStatus == '审批中'">回退</Button>
        </Col>
        <Col class="col_flex tr" span="6">
          <Button type="info" size="large" style="margin:auto;width:128px;" @click="approvalDisable"  v-if="auditStatus == '审批中'">审批作废</Button>
        </Col>
        <Col class="col_flex tr" span="6">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="approvalRollback"  v-if="auditStatus == '审批通过'">撤销</Button>
        </Col>
      </Row>
      <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="flag6"></userIdQuery>
      <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="userCdChange.cidNew"></departmentQuery>
      <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
      <jobQuery @tableJob="getJob" @statusJob='getJobStatus' :data="model3" v-if="flag3" :did="userCdChange.didNew"></jobQuery>
    </div>
  </div>
</template>
<script>

import departmentQuery from '@/common/departmentQuery'
import companyQuery from '@/common/companyQuery'
import jobQuery from '@/common/jobQuery'
import userIdQuery from '@/common/userIdQuery'
import getDic from '@/server/apiDic'

import { getUserAudit, getUserAuditOldUser, getJobChangeApply, userAudit, postUserAuditRollback, updateUserCdChange } from '@/server/api'

export default {
  data () {
    return {
      auditId: '',
      applyCode: '',
      auditStatus: '',
      changeTypeDic: [],
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      flag3: false,
      model3: false,
      modal6: false,
      flag6: false,
      userIdFlag: 0,
      oldData: {
        userId: '',
        cnameOld: '',
        dnameOld: '',
        userName: '',
        sex: '',
        age: '',
        startworkdataView: '',
        education: '',
        inneruser: '',
        userStatus: ''
      },
      userCdChange: {
        did: '',
        appDate: '', // 审批时间
        approverId: '', // 审批人ID
        cidNew: '', // 新公司ID
        cidOld: '', // 公司id
        cnameNew: '', // 新公司名称
        cnameOld: '', // 公司名称
        didNew: '', // 新部门ID
        didOld: '', // 部门id
        dnameNew: '', // 新部门名称
        dnameOld: '', // 部门名称
        changeType: '', // 变更类型
        id: '', // id
        jobnameNew: '', // 新职位
        jobnameOld: '', // 职位
        joindate: '', // 入司时间 beginWorkDateView
        operDate: '', // 操作时间
        operatorId: '', // 操作人ID
        upheaderNew: '', // 新直接主管
        userStatue: '', // 员工状态
        userId: '', // 人员编号
        userName: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        education: '', // 学历
        upHeader: '', // 主管
        areaNew: '', // 新所属区域
        toBeWorkDate: '',
        jobIdNew: '', // 新职位id
        remark: '', // 备注
        changeDate: '', // 申请日期
        effectDate: '' // 生效日期
      }
    }
  },
  created () {
    getDic('UserCdChangeChangeType').then((res) => {
      this.changeTypeDic = res.data
    })
    let params = {entityId: this.$route.params.entityId}
    getUserAuditOldUser(params).then((res) => {
      let user = res.data
      this.oldData.userId = user.userId
      this.oldData.cnameOld = user.cname
      this.oldData.cname = user.cname
      this.oldData.dnameOld = user.dname
      this.oldData.dname = user.dname
      this.oldData.userName = user.userName
      this.oldData.sex = user.sex
      this.oldData.age = user.age
      this.oldData.startworkdataView = user.startworkdataView
      this.oldData.education = user.education
      this.oldData.inneruser = user.inneruser
      this.oldData.userStatus = user.userStatus
      this.oldData.userType = user.userType
      this.oldData.userStatus = user.userStatus
      this.oldData.upHeader = user.upHeader
    })
    getUserAudit({id: this.$route.params.id}).then((res) => {
      // 变更类型
      this.oldData.changeType = res.data.auditType
      // 新公司名称
      this.userCdChange.cnameNew = res.data.cname
      // 新部门名称
      this.userCdChange.dnameNew = res.data.dname
      let params = {id: res.data.applyId}
      this.auditId = res.data.id
      this.applyCode = res.data.applyCode
      this.auditStatus = res.data.auditStatus
      getJobChangeApply(params).then((res) => {
        this.userCdChange = res.data
      })
    })
  },
  mounted () {},
  methods: {
    approvalAndApproval () {
      let params = {}
      params.auditId = this.auditId
      params.userAuditType = '员工岗位异动申请'
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
      params.userAuditType = '员工岗位异动申请'
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
    approvalDisable () {
      let params = {}
      params.auditId = this.auditId
      params.userAuditType = '员工岗位异动申请'
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
    updateApply () {
      let { cidNew, cnameNew, didNew, dnameNew, jobnameNew, jobIdNew, upheaderNew, upheaderNewName, changeType, changeDate, area, remark, toBeWorkDate } = {...this.userCdChange}
      let params = Object.assign({}, {id: this.userCdChange.id}, { cidNew, cnameNew, didNew, dnameNew, jobnameNew, jobIdNew, upheaderNew, upheaderNewName, changeType, changeDate, area, remark, toBeWorkDate })
      updateUserCdChange(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    },
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.userCdChange.cidNew = item.cid
      this.userCdChange.cnameNew = item.cname
      this.userCdChange.area = item.area
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      if (!this.userCdChange.cidNew) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      this.userCdChange.didNew = item.did
      this.userCdChange.dnameNew = item.dname
    },
    getDepartmentStatus (item) {
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    queryJob () { // 公司信息查询
      if (this.userCdChange.didNew) {
        this.flag3 = true
        this.model3 = true
        this.userIdFlag = 0
      } else {
        this.$Message.info('请先选择部门！')
        return false
      }
    },
    getJob (item) {
      this.userCdChange.jobIdNew = item.jobId
      this.userCdChange.jobNameNew = item.jobName
      this.userCdChange.jobIdNew = item.jobId // 新职位id
      this.userCdChange.jobnameNew = item.jobName // 新职位名称
    },
    getJobStatus (item) {
      this.flag3 = item.comFlag
      this.model3 = item.commodal
    },
    queryUpHeader () {
      this.modal6 = true
      this.flag6 = true
      this.userIdFlag = 1
    },
    queryId () {
      this.modal6 = true
      this.flag6 = true
      this.userIdFlag = 0
    },
    getUserId (item) {
      if (this.userIdFlag) {
        this.userCdChange.upheaderNew = item.userId
        this.userCdChange.upheaderNewName = item.userName
      } else {
        this.oldData = item
      }
    },
    getUserIdStatus (item) {
      this.flag6 = item.comFlag
      this.modal6 = item.commodal
    }
  },
  components: {
    userIdQuery,
    departmentQuery,
    companyQuery,
    jobQuery
  }
}
</script>

<style>
.jobChangeAudit{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.jobChangeAudit_title{
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
