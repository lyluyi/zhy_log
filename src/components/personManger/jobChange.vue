<template>
  <div class="jobChange">
    <div class="jobChange_title mb20">
      职位变动管理申请
    </div>
    <div class="jobChange_inputGroup">
      <Divider orientation="left">员工基本信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" search enter-button @on-search="queryId" v-model="oldData.userId" readonly />
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
          <Input placeholder=""  v-model="oldData.startworkdataView" readonly />
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
          <DatePicker :options="limitDateA" @on-change="userCdChange.changeDate=$event" type="date" :value="userCdChange.changeDate" placeholder="Select date" placement="bottom" v-model="userCdChange.changeDate" ></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">生效日期：</Button>
          <DatePicker :options="limitDateB" type="date" @on-change="userCdChange.effectDate=$event" placeholder="Select date" placement="bottom" v-model="userCdChange.effectDate" ></DatePicker>
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
          <Input  placeholder="" search enter-button v-model="userCdChange.jobNameNew" @on-search="queryJob" readonly />
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
          <DatePicker @on-change="userCdChange.toBeWorkDate=$event" type="date" placeholder="Select date" placement="bottom" v-model="userCdChange.toBeWorkDate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="userCdChange.remark" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>
    <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="flag6"></userIdQuery>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="userCdChange.cidNew"></departmentQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <jobQuery @tableJob="getJob" @statusJob='getJobStatus' :data="model3" v-if="flag3" :did="userCdChange.didNew"></jobQuery>
  </div>
</template>
<script>

import departmentQuery from '@/common/departmentQuery'
import companyQuery from '@/common/companyQuery'
import jobQuery from '@/common/jobQuery'
import userIdQuery from '@/common/userIdQuery'

// import { currentTime } from '@/util/common'

import { postJobChange } from '@/server/api'
import getDic from '@/server/apiDic'

export default {
  data () {
    return {
      limitDateA: {
        disabledDate: date => { // 大于当前时间
          let startTime = this.oldData.startworkdataView ? new Date(this.oldData.startworkdataView).valueOf() : Date.now()
          return date && date.valueOf() < startTime // 从某个时间开始 默认从当前时间开始
        }
      },
      limitDateB: { // 小于当前时间 大于入司时间
        disabledDate: date => {
          let startTime = this.oldData.startworkdataView ? new Date(this.oldData.startworkdataView).valueOf() : Date.now()
          let endTime = Date.now()
          return (date && (date.valueOf() < startTime)) || (date.valueOf() > endTime)
        }
      },
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
        upheaderNew: '', // 新直接主管Id
        upheaderNewName: '', // 新直接主管姓名
        userStatue: '', // 员工状态
        userId: '', // 人员编号
        userName: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        education: '', // 学历
        upHeader: '', // 主管
        areaNew: '', // 新所属区域
        toBeWorkDate: '', // 预计转正日期
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
  },
  mounted () {
  },
  methods: {
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
      // console.log(item)
      this.userCdChange.didNew = item.did
      this.userCdChange.dnameNew = item.dname
    },
    getDepartmentStatus (item) {
      // console.log(item)
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
        // this.changeLimitDateA()
      }
    },
    getUserIdStatus (item) {
      this.flag6 = item.comFlag
      this.modal6 = item.commodal
    },
    saveValidate () {
      if (this.userCdChange.changeType !== '升职') {
        if (this.userCdChange.toBeWorkDate === '') {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    save () {
      // this.userCdChange.toBeWorkDate = currentTime(this.userCdChange.toBeWorkDate)
      if (this.saveValidate()) {
        this.userCdChange.userId = this.oldData.userId
        let remark = this.userCdChange.remark
        let userName = this.oldData.userName
        // let toBeWorkDate = this.userCdChange.toBeWorkDate
        let params = Object.assign({}, this.oldData, this.userCdChange)
        params.remark = remark
        params.operatorId = localStorage.getItem('userId')
        params.userName = userName
        params.cnameOld = params.cname
        params.dnameOld = params.dname
        console.log(params)
        // debugger
        // return
        // params.toBeWorkDate = toBeWorkDate
        postJobChange(params).then((res) => {
          if (res.code === 200) {
            this.$Message.success(res.msg)
            this.$router.go(0)
          } else {
            this.$Message.warning(res.msg)
          }
        })
      } else {
        this.$Message.info('升职情况下，见习转正日期必填！')
      }
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
.jobChange{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.jobChange_title{
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

/* .jobChange .ivu-input-group { width: 60% !important; } */
</style>
