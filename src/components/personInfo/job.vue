<template>
  <div class="company">
    <div class="company_title mb20">
      职位信息录入
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位名称：</Button>
          <Input placeholder="" v-model="allData.name" />
        </Col>
         <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职务：</Button>
          <Select v-model="allData.jobType"  placement="bottom">
            <Option v-for="item in jobType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职等：</Button>
          <Select v-model="allData.jobLevel"  placement="bottom">
            <Option v-for="item in jobLevel" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
      <Divider></Divider>
      <Table :columns="columns1" :data="data1"></Table>
      <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="modal6" v-if="flag6"></companyQuery>
  </div>
</template>
<script>
import companyQuery from '@/common/companyQuery'

import { postJob, postSaveJob } from '@/server/api'

import getDic from '@/server/apiDic'

export default {
  data () {
    return {
      modal6: false,
      flag6: false,
      columns1: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '职位名称',
          key: 'name'
        },
        {
          title: '职务',
          key: 'jobType'
        },
        {
          title: '职等',
          key: 'jobLevel'
        }
      ],
      data1: [],
      jobType: [],
      jobLevel: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      allData: {
        jobType: '', // 职务
        jobLevel: '', // 职等
        name: '' // 职位
      }
    }
  },
  created () {
    getDic('job_type').then((res) => {
      this.jobType = res.data
    })
    getDic('job_level').then((res) => {
      this.jobLevel = res.data
    })
    postJob().then((res) => {
      this.data1 = res.list
      this.pageInfo = { ...res }
    })
  },
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      // this.flagNum = 6
      this.flag6 = true
      this.modal6 = true
    },
    getCompany (item) {
      // console.log(item)
      // this.alldata.reportOfCompanyId = item.cid
      // this.alldata.reportOfCompanyName = item.cname
    },
    getCompanyStatus (item) {
      this.flag6 = item.comFlag
      this.modal6 = item.commodal
    },
    changePageNumber (num) {
      this.pageInfo.pageNumber = num
      let params = this.pageInfo
      postJob(params).then((res) => {
        this.data1 = res.list
      })
    },
    save () {
      let params = this.allData
      postSaveJob(params).then((res) => {
        console.log(res)
        this.$Message.success('保存成功！')
        this.$router.go(0)
      }).catch((e) => {
        this.$Message.error(e)
      })
    }
  },
  components: {
    companyQuery
  }
}
</script>

<style>
.company{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.company_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.company_inputGroup{
}
</style>
