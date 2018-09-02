<template>
  <div class="company">
    <div class="company_title mb20">
      用户账号管理
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">查询人员账号：</Button>
          <Input search enter-button placeholder="" />
        </Col>
         <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">账号是否注销：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">查询角色：</Button>
          <Input search enter-button placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;">保存</Button>
        </Col>
      </Row>
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="modal6" v-if="flag6"></companyQuery>
  </div>
</template>
<script>
import companyQuery from '@/common/companyQuery'
export default {
  data () {
    return {
      modal6: false,
      flag6: false,
      idType: [
        { value: 'New York', label: 'New York' },
        { value: 'London', label: 'London' }
      ],
      allData: {
        idTypeModel: '' // 证件类型value
      }
    }
  },
  created () {},
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
