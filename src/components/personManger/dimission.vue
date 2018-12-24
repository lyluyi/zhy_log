<template>
  <div class="dimission">
    <div class="dimission_title mb20">
      离退申请
    </div>
    <div class="dimission_inputGroup">
      <Divider orientation="left">员工基本信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" search enter-button v-model="oldData.userId" @on-search="queryUser" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">姓名：</Button>
          <Input placeholder="" v-model="oldData.userName" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">英文名：</Button>
          <Input placeholder="" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">性别：</Button>
          <Input placeholder="" v-model="oldData.sex" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">年龄：</Button>
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
          <Input placeholder="" v-model="oldData.cname" readonly />
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
          <Button class="wd mr10 tr" type="text">成本中心：</Button>
          <Input placeholder="" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">直接主管：</Button>
          <Input placeholder="" v-model="oldData.upHeader" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <Input placeholder="" v-model="oldData.startworkdataView" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司承认工龄：</Button>
          <Input placeholder="" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder="" v-model="oldData.userStatus" readonly />
        </Col>
      </Row>
      <Divider orientation="left">离退申请信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">离退类型：</Button>
          <Select v-model="userQuit.quitType">
            <Option v-for="item in quitTypeDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">申请日期：</Button>
          <!--
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userQuit.askForDate" ></DatePicker>
          -->
          <Input placeholder="" v-model="userQuit.askForDate" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">预计离职日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userQuit.quitDate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">离退原因：</Button>
          <Select v-model="userQuit.reasons">
            <Option v-for="item in reasonsType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <!--
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder=""/>
        </Col>
        -->
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">离退去向：</Button>
          <Input type="textarea" placeholder="" v-model="userQuit.quitWhereToGo"   />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">主观/客观因素：</Button>
          <Input type="textarea" placeholder="" v-model="userQuit.rootCause" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>

    <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQuery>

  </div>
</template>
<script>

import {currentTime} from '@/util/common'
import userIdQuery from '@/common/userIdQuery'
import getDic from '@/server/apiDic'
import { postUserQuit } from '@/server/api'

export default {
  data () {
    return {
      quitTypeDict: [],
      reasonsType: [],
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
      userQuit: {
        userId: '', // 用户id
        userName: '', // 用户姓名
        cname: '', // 公司名称
        cid: '', // 公司id
        dname: '', // 部门名称
        did: '', // 部门id
        quitType: '', // 离职类型
        askForDate: currentTime(new Date()), // 申请日期
        quitDate: '', // 预计离职日期
        reasons: '', // 离退原因
        quitWhereToGo: '', // 离退去向
        rootCause: '' // 主管/客观因素
      }
    }
  },
  created () {
    getDic('quitType').then((res) => {
      this.quitTypeDict = res.data
    })
    getDic('quitReason').then((res) => {
      this.reasonsType = res.data
    })
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
    getUserId (item) {
      console.log(item)
      if (this.userIdFlag) {
        this.oldData = item
        this.userQuit.userId = item.userId
        this.userQuit.userName = item.userName
      } else {
        this.oldData = item
        this.userQuit.userId = item.userId
        this.userQuit.userName = item.userName
      }
    },
    save () {
      this.userQuit.userId = this.oldData.userId
      this.userQuit.userName = this.oldData.userName
      this.userQuit.cname = this.oldData.cname
      this.userQuit.cid = this.oldData.cid
      this.userQuit.dname = this.oldData.dname
      this.userQuit.did = this.oldData.did

      let params = this.userQuit
      params.operatorId = localStorage.getItem('userId')
      postUserQuit(params).then((res) => {
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
    userIdQuery
  }
}
</script>

<style>
.dimission{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.dimission_title{
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
