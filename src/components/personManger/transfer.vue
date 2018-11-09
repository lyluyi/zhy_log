<template>
  <div class="transfer">
    <div class="transfer_title mb20">
      试用管理
    </div>
    <div class="transfer_inputGroup">
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
          <Select v-model="allData.userStatus">
            <Option v-for="item in userStatusDic" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">试用日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.beWorkDate"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">转正日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.toBeWorkDate"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder="" v-model="allData.remark"/>
        </Col>
      </Row>
      <Divider orientation="left">待转正员工</Divider>
      <Table :columns="columns1" :data="data1" @on-row-click="tableClick"></Table>
      <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import { getTransferList, postTransfer } from '@/server/api'
import getDic from '@/server/apiDic'

import { currentTime } from '@/util/common'

export default {
  data () {
    return {
      userStatusDic: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
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
      allData: {
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
          key: 'userType'
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
      userStatus: '实习生'
    }
    getTransferList(params).then((res) => {
      this.data1 = res.list
      this.pageInfo = { ...res }
    })
    getDic('userStatus').then((res) => {
      this.userStatusDic = res.data
    })
  },
  mounted () {
  },
  methods: {
    changePageNumber (num) {
      this.pageInfo.pageNumber = num
      let params = {
        userStatus: '实习生',
        pageNumber: num
      }
      getTransferList(params).then((res) => {
        this.data1 = res.list
      })
    },
    tableClick (item, index) {
      this.oldData = item
    },
    save () {
      this.allData.beWorkDate = currentTime(this.allData.beWorkDate)
      this.allData.toBeWorkDate = currentTime(this.allData.toBeWorkDate)
      this.allData.userId = this.oldData.userId
      let params = Object.assign({}, this.allData, this.oldData)
      postTransfer(params).then((res) => {
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
  }
}
</script>

<style>
.transfer{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.transfer_title{
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
