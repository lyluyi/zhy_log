<template>
  <div class="transferView">
    <div class="transferView_title mb20">
      转编查看
    </div>
    <div class="transferView_inputGroup">
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
          <Input placeholder="" v-model="oldData.jobName" readonly />
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
          <Input placeholder="" v-model="userOrganization.userStatus" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">试用日期：</Button>
          <Input placeholder="" v-model="userOrganization.startworkdateView" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">转正日期：</Button>
          <Input placeholder="" v-model="userOrganization.toBeWorkDateView" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userOrganization.remark" readonly />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import { getUserAudit, getUserAuditOldUser, getUserOrganizationApply } from '@/server/api'

export default {
  data () {
    return {
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
    let params = {entityId: this.$route.params.entityId}
    getUserAuditOldUser(params).then((res) => {
      let user = res.data
      this.oldData = user
    })
    getUserAudit({id: this.$route.params.id}).then((res) => {
      // 变更类型
      params = {id: res.data.applyId}
      getUserOrganizationApply(params).then((res) => {
        this.userOrganization = res.data
      })
    })
  },
  mounted () {},
  methods: {}
}
</script>

<style>
.transferView{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.transferView_title{
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
