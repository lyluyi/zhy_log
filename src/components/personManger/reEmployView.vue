<template>
  <div class="reEmployView">
    <div class="reEmployView_title mb20">
      回聘查看
    </div>
    <div class="reEmployView_inputGroup">
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
        <!--
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">成本中心：</Button>
          <Input placeholder="" readonly />
        </Col>
        -->
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
          <Input placeholder="" v-model="userReturn.startworkdateView"   readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司名称：</Button>
          <Input placeholder="" v-model="userReturn.cname" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门名称：</Button>
          <Input placeholder="" v-model="userReturn.dname"   readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位名称：</Button>
          <Input placeholder="" v-model="userReturn.jobName"  readonly />
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
          <Input placeholder="" readonly/>
        </Col>
        -->
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">年资起算日期：</Button>
          <Input placeholder=""  v-model="userReturn.annuityStartDateView" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">回聘申请：</Button>
          <Input placeholder="" v-model="userReturn.returnAsk" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">原部门意见：</Button>
          <Input placeholder="" v-model="userReturn.dOldOpinion" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">回聘部门意见：</Button>
          <Input placeholder="" v-model="userReturn.dNewOpinion" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">HR部门意见：</Button>
          <Input placeholder="" v-model="userReturn.hrOpinion"  readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userReturn.remark" readonly />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import { getUserAudit, getUserAuditOldUser, getUserReturnApply } from '@/server/api'

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
        annuityStartDate: '', // 年资起算日期
        annuityStartDateView: ''
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
      getUserReturnApply(params).then((res) => {
        this.userReturn = res.data
      })
    })
  },
  methods: {}
}
</script>

<style>
.reEmployView{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.reEmployView_title{
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
