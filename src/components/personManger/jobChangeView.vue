<template>
  <div class="jobChangeView">
    <div class="jobChangeView_title mb20">
      职位变动管理查看
    </div>
    <div class="jobChangeView_inputGroup">
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
          <Input placeholder="" v-model="oldData.jobName" readonly />
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
          <Input v-model="userCdChange.changeType" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">申请日期：</Button>
          <Date-picker placement="bottom" v-model="userCdChange.changeDate" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">生效日期：</Button>
          <DatePicker type="date" placeholder="Select date" v-model="userCdChange.effectDate" placement="bottom" readonly ></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新公司：</Button>
          <Input   placeholder=""  v-model="userCdChange.cnameNew" readonly/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新部门：</Button>
          <Input   placeholder="" v-model="userCdChange.dnameNew"  readonly/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新职位：</Button>
          <Input  placeholder=""  v-model="userCdChange.jobnameNew" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新所属区域：</Button>
          <Input placeholder="" v-model="userCdChange.area" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">新直接主管：</Button>
          <Input placeholder="" v-model="userCdChange.upheaderNewName" readonly/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">见习转正日期：</Button>
          <DatePicker @on-change="userCdChange.toBeWorkDate=$event" type="date" placeholder="Select date" placement="bottom" v-model="userCdChange.toBeWorkDate" readonly></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userCdChange.remark" readonly />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import { getUserAudit, getUserAuditOldUser, getJobChangeApply } from '@/server/api'

export default {
  data () {
    return {
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
        changeDate: '', // 变更时间
        effectDate: '' // 生效日期
      }
    }
  },
  created () {
    console.log(this.$route.params.entityId)
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
      getJobChangeApply(params).then((res) => {
        this.userCdChange = res.data
      })
    })
  },
  mounted () {},
  methods: {
  }
}
</script>

<style>
.jobChangeView{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.jobChangeView_title{
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
