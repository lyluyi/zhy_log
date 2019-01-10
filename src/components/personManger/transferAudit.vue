<template>
  <div class="transferAudit">
    <div class="transferAudit_title mb20">
      转编申请审核
    </div>
    <div class="transferAudit_inputGroup">
      <Divider orientation="left">员工基本信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" v-model="oldData.userId" readonly />
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
        <!-- <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">成本中心：</Button>
          <Input placeholder=""  />
        </Col> -->
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
      <Divider orientation="left">转编操作</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <!--
          <Input placeholder="" v-model="userOrganization.userStatus" readonly />
          -->
          <Select v-model="userOrganization.userStatus">
            <Option v-for="item in userStatusDic" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">试用日期：</Button>
          <!--
          <Input placeholder="" v-model="userOrganization.startworkdateView" readonly />
          -->
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userOrganization.startworkdate"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">转正日期：</Button>
          <!--
          <Input placeholder="" v-model="userOrganization.toBeWorkDateView" readonly />
          -->
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userOrganization.toBeWorkDate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userOrganization.remark" />
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
    </div>
  </div>
</template>
<script>

import getDic from '@/server/apiDic'

import { getUserAudit, getUserAuditOldUser, getUserOrganizationApply, userAudit, postUserAuditRollback, updateUserOrganization } from '@/server/api'

export default {
  data () {
    return {
      auditId: '',
      applyCode: '',
      auditStatus: '',
      userStatusDic: [],
      oldData: {
        userId: '',
        cname: '',
        dname: '',
        userName: '',
        sex: '',
        age: '',
        startworkdataView: '',
        education: '',
        inneruser: '',
        userStatus: ''
      },
      userOrganization: {
        userStatus: '',
        beWorkDate: '',
        remark: '',
        toBeWorkDate: '',
        appDate: '', // 审批时间
        approverId: '', // 审批人Id
        approverName: '', // 审批人姓名
        cid: '', // 所属公司id
        cname: '', // 所属公司
        did: '', // 所属部门id
        dname: '', // 所属部门
        id: '', // id
        jobId: '', // 职位id
        jobName: '', // 职位
        operDate: '', // 操作时间
        operatorId: '', // 操作人Id
        operatorName: '', // 操作人姓名
        opinion: '', // 转正意见
        startworkdate: '', // 入司时间
        userId: '', // 员工编号
        userName: ''// 员工姓名
      }
    }
  },
  created () {
    getDic('userStatus').then((res) => {
      this.userStatusDic = res.data
    })
    let params = {entityId: this.$route.params.entityId}
    getUserAuditOldUser(params).then((res) => {
      let user = res.data
      this.oldData = user
    })
    getUserAudit({id: this.$route.params.id}).then((res) => {
      // 变更类型
      params = {id: res.data.applyId}
      this.auditId = res.data.id
      this.applyCode = res.data.applyCode
      this.auditStatus = res.data.auditStatus
      getUserOrganizationApply(params).then((res) => {
        this.userOrganization = res.data
      })
    })
  },
  mounted () {},
  methods: {
    approvalAndApproval () {
      let params = {}
      params.auditId = this.auditId
      params.userAuditType = '员工转编申请'
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
      params.userAuditType = '员工转编申请'
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
      params.userAuditType = '员工转编申请'
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
      let {userStatus, startworkdate, toBeWorkDate, remark} = {...this.userOrganization}
      let params = Object.assign({}, {id: this.userOrganization.id}, { userStatus, startworkdate, toBeWorkDate, remark })
      updateUserOrganization(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(-1)
        } else {
          this.$Message.warning(res.msg)
        }
      })
    }
  }
}
</script>

<style>
.transferAudit{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.transferAudit_title{
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
