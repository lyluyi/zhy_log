<template>
  <div class="fullMemberView">
    <div class="fullMemberView_title mb20">
      转正管理查看
    </div>
    <div class="fullMemberView_inputGroup">

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

      <Divider orientation="left">常规</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">转正日期：</Button>
          <!--
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userFormal.toBeWorkDate"></DatePicker>
          -->
          <Input placeholder="" v-model="userFormal.toBeWorkDateView" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">转正意见：</Button>
          <Input type="textarea" placeholder="" v-model="userFormal.opinion" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">签核意见：</Button>
          <Input type="textarea" placeholder="" v-model="userFormal.signTheOpinion"  readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userFormal.remark" readonly  />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import { getUserAudit, getUserAuditOldUser, getUserFormalApply } from '@/server/api'

export default {
  data () {
    return {
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      userFormal: {
        userId: '', // 员工编号
        userName: '', // 员工姓名
        cname: '', // 所属公司
        dname: '', // 部门
        jobName: '', // 职位
        startworkdate: '', // 入司时间
        toBeWorkDate: '', // 转正时间
        userStatus: '', // 员工状态
        opinion: '', // 转正意见
        remark: '', // 备注
        cid: '', // 公司id
        did: '', // 部门id
        signTheOpinion: '' // 核签意见
      },
      oldData: {

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
      getUserFormalApply(params).then((res) => {
        this.userFormal = res.data
      })
    })
  },
  mounted () {},
  methods: {},
  components: {
  }
}
</script>

<style>
.fullMemberView{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.fullMemberView_title{
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
