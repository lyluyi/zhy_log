<template>
  <div class="OAReport">
    <div class="OAReport_title mb20">
      <span>OA报表</span>
    </div>
    <div class="structWrap pl10 pr10">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">费用类型：</Button>
          <Select v-model="allData.flowtype" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">起始时间：</Button>
          <DatePicker type="date"   v-model="allData.startDate"  placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">结束日期：</Button>
          <DatePicker type="date"   v-model="allData.endDate" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="queryReport">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns8" :data="data7" :loading="loading"  class="mb20"></Table>
      <!-- <Page :total="100" show-total @on-change="changPageSize" /> -->
      <!-- <Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline" style="vertical-align: baseline;"></Icon>导出表格</Button> -->
    </div>
  </div>
</template>
<script>

import { getOaReport } from '@/server/api.js'

export default {
  data () {
    return {
      logList: [],
      loading: false,
      maxSize: 10,
      allData: {
        startDate: '',
        endDate: '',
        flowtype: '',
        userId: ''
      },
      data7: [ ],
      columns8: [
        {
          'title': '流程单号',
          'key': 'flowId'
        },
        {
          'title': '报销单名称',
          'key': 'types'
        },
        {
          'title': '发起人ID',
          'key': 'proposerId'
        },
        {
          'title': '发起人',
          'key': 'proposer'
        },
        {
          'title': '发起人部门',
          'key': 'propdeptName'
        },
        {
          'title': '发起人公司',
          'key': 'companyName'
        },
        {
          'title': '总金额',
          'key': 'totalaMount'
        },
        {
          'title': '备注',
          'key': 'remark'
        },
        {
          'title': '发起时间',
          'key': 'submissionDate'
        }
      ],
      cityList: [
        {
          value: '厂商扣款',
          label: '厂商扣款'
        },
        {
          value: '水电费报销单',
          label: '水电费报销单'
        },
        {
          value: '差旅费用报销',
          label: '差旅费用报销'
        },
        {
          value: '厂商预付款申请单',
          label: '厂商预付款申请单'
        },
        {
          value: '员工借支单',
          label: '员工借支单'
        },
        {
          value: '机制奖励',
          label: '机制奖励'
        },
        {
          value: '工程项目里程碑',
          label: '工程项目里程碑'
        },
        {
          value: '杂项费用报销单',
          label: '杂项费用报销单'
        },
        {
          value: '管理费用报销单',
          label: '管理费用报销单'
        },
        {
          value: '厂商采购付款申请单',
          label: '厂商采购付款申请单'
        },
        {
          value: '厂商费用付款单',
          label: '厂商费用付款单'
        },
        {
          value: '租金物业付款申请单',
          label: '租金物业付款申请单'
        },
        {
          value: '费用报销单',
          label: '费用报销单'
        }
      ]
    }
  },
  created () {
    this.allData.userId = localStorage.getItem('userId')
  },
  mounted () {},
  methods: {
    exportData () {
      this.$refs.table.exportCsv({
        filename: '表单统计'
      })
    },
    queryReport () {
      console.log(this.allData.userId)
      let formData = {}
      if (this.allData.startDate === '') {
        formData.startDate = ''
      } else {
        let startDate = this.allData.startDate.getFullYear() + '-' + (this.allData.startDate.getMonth() + 1) + '-' + this.allData.startDate.getDate()
        formData.startDate = startDate
      }
      if (this.allData.endDate === '') {
        formData.endDate = ''
      } else {
        let endDate = this.allData.endDate.getFullYear() + '-' + (this.allData.endDate.getMonth() + 1) + '-' + this.allData.endDate.getDate()
        formData.endDate = endDate
      }
      formData.userId = this.allData.userId
      formData.flowtype = this.allData.flowtype
      console.log(formData)
      let params = formData
      getOaReport(params).then((res) => {
        this.data7 = res.data
      })
    }
  },
  components: {}
}
</script>

<style>
.OAReport{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.OAReport_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.OAReport_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.OAReport_title:after {
    content: '';
    display: block;
    width: 98.4%;
    height: 3px;
    background: #dcdee2;
    position: absolute;
    bottom: 0;
    left: 10px;
    background: #2d8cf0;
    margin: 0 auto;
}
</style>
