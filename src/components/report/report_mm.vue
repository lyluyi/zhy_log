<template>
  <div class="com_report_mm">
    <div class="com_report_mm_title mb20">
      月度报表
    </div>
    <div class="com_report_mm_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司：</Button>
          <Input search enter-button placeholder=""  v-model="allData.cname" @on-search="queryCompany"/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">月份：</Button>
          <DatePicker type="month" placeholder="Select month" style="width: 200px" v-model="allData.time" @on-change="allData.time=$event"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="query">查询</Button>
        </Col>
      </Row>
      <Divider>{{ this.allData.cname === '' ? '人员月度异动汇总表' : this.allData.cname + '——' + '人员月度异动汇总表' }}</Divider>
      <Table :columns="columns1" :data="data1" border ></Table>
      <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
      <Divider></Divider>
      <Row :gutter="16" class="mt20 mb20">
        <Col class="col_flex tr" span="24">
          <Button type="success" size="large" style="margin:auto;width:128px;" @click="exportTable">一键月结</Button>
        </Col>
      </Row>
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>

import companyQuery from '@/common/companyQuery'

import { getReportMm, getReportMmGenerate } from '@/server/api'

export default {
  data () {
    return {
      modal1: false,
      flag1: false,
      columns1: [
        {
          title: '公司',
          aligh: 'center',
          key: 'cname'
        },
        {
          title: '月结名称',
          aligh: 'center',
          key: 'recordType'
        },
        {
          title: '月结年',
          aligh: 'center',
          key: 'recordYear'
        },
        {
          title: '月结月',
          aligh: 'center',
          key: 'recordMonth'
        }
      ],
      data1: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      allData: {
        cname: '',
        cid: '',
        time: ''
      }
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.allData.cid = item.cid
      this.allData.cname = item.cname
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    changePageNumber (num) {
      this.pageInfo.pageNumber = num
      let params = { ...this.pageInfo, ...this.allData }
      getReportMm(params).then((res) => {
        let { pageNumber, pageSize, totalPage, totalRow } = { ...res }
        this.data1 = res.list
        this.pageInfo = { pageNumber, pageSize, totalPage, totalRow }
        this.$Message.success('数据查询成功！')
      })
    },
    query () {
      this.$Loading.start()
      let params = this.allData
      getReportMm(params).then((res) => {
        console.log(res)
        this.$Loading.finish()
        let { pageNumber, pageSize, totalPage, totalRow } = { ...res }
        this.data1 = res.list
        this.pageInfo = { pageNumber, pageSize, totalPage, totalRow }
        this.$Message.success('数据查询成功！')
      }).catch((err) => {
        this.$Loading.finish()
        this.$Message.error('数据操作异常！')
        throw err
      })
    },
    exportTable () {
      this.$Spin.show()
      let params = this.allData
      getReportMmGenerate(params).then((res) => {
        console.log(res)
        this.$Spin.hide()
        this.$Message.success('一键月结成功！')
      }).catch((err) => {
        this.$Spin.hide()
        this.$Message.error('数据操作异常！')
        throw err
      })
    }
  },
  components: {
    companyQuery
  }
}
</script>

<style>
.com_report_mm{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.com_report_mm .ivu-table td, .ivu-table th {
  text-align: center !important;
}
.com_report_mm_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
</style>
