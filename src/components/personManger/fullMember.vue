<template>
  <div class="fullMember">
    <div class="fullMember_title mb20">
      转正管理申请
    </div>
    <div class="fullMember_inputGroup">

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
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userFormal.toBeWorkDate"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder="" v-model="userFormal.userStatus" readonly />
          <!-- <Select v-model="userFormal.userStatus">
            <Option v-for="item in userStatusDic" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">转正意见：</Button>
          <Input type="textarea" placeholder="" v-model="userFormal.opinion" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">签核意见：</Button>
          <Input type="textarea" v-model="userFormal.signTheOpinion" placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userFormal.remark"  />
        </Col>
      </Row>
      <Divider orientation="left">待转正员工</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" search enter-button @on-search="queryUser" v-model="userId" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司名称：</Button>
          <Input placeholder="" search enter-button v-model="cname" @on-search="queryCompany" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门名称：</Button>
          <Input placeholder="" search enter-button v-model="dname" @on-search="queryDepartment" />
        </Col>
      </Row>
      <Row type="flex" class="mb10" justify="center">
        <Col class="col_flex">
          <Button type="primary" style="text-align: center;" class="wd mr10 tr" @click="queryFullMember">查询</Button>
        </Col>
      </Row>
      <Table :columns="columns1" :data="data1" @on-row-click="tableClick"></Table>
      <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>
    <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="cid"></departmentQuery>
  </div>
</template>
<script>

import companyQuery from '@/common/companyQuery'
import departmentQuery from '@/common/departmentQuery'
import userIdQuery from '@/common/userIdQuery'

import { getCanUserFormalUser, postUserFormal } from '@/server/api'

// import getDic from '@/server/apiDic'

export default {
  data () {
    return {
      // userStatusDic: [
      //   { label: '转正员工', value: '转正员工'}
      //   { label: '试用员工', value: '转正员工'}
      // ],
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      modal6: false,
      openSelectUserDialog: false,
      userId: '',
      userName: '',
      dname: '',
      did: '',
      cname: '',
      cid: '',
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

      },
      columns1: [
        {
          title: '工号',
          key: 'userId'
        },
        {
          title: '姓名',
          key: 'userName'
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
          title: '入司日期',
          key: 'startworkdataView'
        },
        {
          title: '员工状态',
          key: 'userStatus'
        },
        {
          title: '备注',
          key: 'remark'
        }
      ],
      data1: []
    }
  },
  created () {
    let params = {
      userStatus: '试用员工',
      userId: this.userId,
      cid: this.cid,
      dname: this.dname
    }
    getCanUserFormalUser(params).then((res) => {
      this.data1 = res.list
      this.pageInfo = { ...res }
    })
    // getDic('userStatus').then((res) => {
    //   this.userStatusDic = res.data
    // })
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
      this.userId = item.userId
      this.userName = item.userName
    },
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.cname = item.cname
      this.cid = item.cid
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      if (!this.cname) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      // console.log(item)
      this.dname = item.dname
      this.did = item.did
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    changePageNumber (num) {
      this.pageInfo.pageNumber = num
      let params = {
        userStatus: '试用员工',
        pageNumber: num
      }
      getCanUserFormalUser(params).then((res) => {
        this.data1 = res.list
      })
    },
    queryFullMember () {
      let params = {
        userStatus: '试用员工',
        userId: this.userId,
        cid: this.cid,
        dname: this.dname,
        did: this.did
      }
      getCanUserFormalUser(params).then((res) => {
        this.data1 = res.list
        this.pageInfo = { ...res }
      })
    },
    tableClick (item, index) {
      this.oldData = item
      this.userFormal.toBeWorkDate = item.toBeWorkDateView
      this.userFormal.userId = item.userId
      this.userFormal.userName = item.userName
      this.userFormal.cname = item.cname
      this.userFormal.dname = item.dname
      this.userFormal.jobName = item.jobName
      this.userFormal.cid = item.cid
      this.userFormal.did = item.did
      this.userFormal.userStatus = '转正员工'
      debugger
    },
    save () {
      let params = this.userFormal
      params.operatorId = localStorage.getItem('userId')
      postUserFormal(params).then((res) => {
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
    userIdQuery,
    departmentQuery,
    companyQuery
  }
}
</script>

<style>
.fullMember{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.fullMember_title{
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

/* .fullMember .ivu-input-group { width: 60% !important; } */
</style>
