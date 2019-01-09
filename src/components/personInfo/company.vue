<template>
  <div class="company">
    <div class="company_title mb20">
      公司信息录入
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col  span="6">
          <Tree :data="data1" ref="tree" ></Tree>
        </Col>
        <Col  span="18">
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
              <Button class="wd mr10 tr" type="text">公司负责人：</Button>
              <!--
              <Input placeholder="" v-model="allData.comHeader" />
              -->
              <Input placeholder="" search enter-button v-model="allData.comHeader" @on-search="queryUser" readonly />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">上级公司ID：</Button>
              <Input search enter-button placeholder="" v-model="allData.upCid" @on-search="queryCompany" readonly />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">区域：</Button>
              <Select v-model="allData.area"  placement="bottom">
                <Option v-for="item in areaType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mt20">
            <Col class="col_flex tr" span="24">
              <Button type="primary" @click="save" size="large" style="margin:auto;width:128px;">保存</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQuery>
  </div>
</template>
<script>
import companyQuery from '@/common/companyQuery'
import userIdQuery from '@/common/userIdQuery'

import { postCompanyData, getCompanyTree } from '@/server/api.js'
import getDic from '@/server/apiDic'
import { currentTime } from '@/util/common.js'
export default {
  data () {
    return {
      model1: false,
      flag1: false,
      modal6: false,
      data1: [],
      areaType: [],
      openSelectUserDialog: false,
      allData: {
        cname: '',
        registeredAddress: '',
        comHeader: '',
        comHeaderId: '',
        status: '',
        createtime: '',
        lastmodifytime: '',
        upCid: '',
        cid: '',
        area: ''
      }
    }
  },
  created () {
    this.$Loading.start()
    getCompanyTree().then((res) => {
      console.log(res)
      this.$Loading.finish()
      this.data1 = res
    }).catch(err => {
      this.$Message.warning('数据请求异常！')
      this.$Loading.finish()
      throw err
    })

    getDic('area').then((res) => {
      this.areaType = res.data
    })
  },
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.allData.upCid = item.cid
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    save () {
      this.$Spin.show()
      this.allData.createtime = currentTime(this.allData.createtime)
      let params = this.allData
      postCompanyData(params).then((res) => {
        this.$Spin.hide()
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.clearData()
        } else {
          this.$Message.warning(res.msg)
        }
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
    },
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
      this.allData.comHeaderId = item.userId
      this.allData.comHeader = item.userName
    }
  },
  components: {
    companyQuery,
    userIdQuery
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
