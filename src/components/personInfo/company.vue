<template>
  <div class="company">
    <div class="company_title mb20">
      公司信息录入
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司名称：</Button>
          <Input placeholder="" v-model="allData.cname"/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">注册地址：</Button>
          <Input placeholder="" v-model="allData.registeredAddress" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">注册时间：</Button>
          <DatePicker type="date" placeholder="Select date" v-model="allData.createtime"  placement="bottom"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">法人：</Button>
          <Input placeholder="" v-model="allData.comHeader" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司状态：</Button>
          <Input placeholder="" v-model="allData.status"/>
        </Col>
        <!-- <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">最后修改时间：</Button>
          <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
        </Col> -->
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">上级公司ID：</Button>
          <Input search enter-button placeholder="" v-model="allData.cid" @on-search="queryCompany" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" @click="save" size="large" style="margin:auto;width:128px;">保存</Button>
        </Col>
      </Row>
    </div>
    <companyQuery @tableCompany="getCompany" @statusRole='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>
import companyQuery from '@/common/companyQuery'
import { postCompanyData } from '@/server/api.js'
import { currentTime } from '@/util/common.js'
export default {
  data () {
    return {
      model1: false,
      flag1: false,
      allData: {
        cname: '',
        registeredAddress: '',
        comHeader: '',
        status: '',
        createtime: '',
        lastmodifytime: '',
        upCid: '',
        cid: ''
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      // this.flagNum = 6
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      // console.log(item)
      this.allData.cid = item.cid
      // this.alldata.reportOfCompanyName = item.cname
    },
    getCompanyStatus (item) {
      // console.log(item)
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    save () {
      this.$Spin.show()
      this.allData.createtime = currentTime(this.allData.createtime)
      let params = this.allData
      postCompanyData(params).then((res) => {
        this.$Spin.hide()
        this.$Message.success({ content: '保存成功！' })
        this.clearData()
        // console.log(res)
      }).catch((err) => {
        this.$Spin.hide()
        this.$Message.error({ content: '保存失败！' })
        this.clearData()
        console.log(err)
      })
    },
    clearData () {
      Object.keys(this.allData).forEach(key => {
        this.allData[key] = ''
        return this.allData
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
