<template>
  <div class="department">
    <div class="department_title mb20">
      部门信息录入
    </div>
    <div class="department_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col  span="6" class="border">
          <Tree :data="data1" ref="tree" ></Tree>
        </Col>
        <Col  span="18">
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">部门名称：</Button>
              <Input placeholder="" v-model="allData.dname"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">所属公司：</Button>
              <Input search enter-button placeholder="" v-model="allData.cname" @on-search="queryCompany" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">上级部门：</Button>
              <Input search enter-button  @on-search="queryDepartment" v-model="allData.upDid" placeholder="" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">部门层级：</Button>
              <InputNumber number  :max="3" :min="1" v-model="allData.dLevel"></InputNumber>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">描述：</Button>
              <Input placeholder="" v-model="allData.description" />
            </Col>
          </Row>
          <Row :gutter="16" class="mt20">
            <Col class="col_flex tr" span="24">
              <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="allData.cid"></departmentQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>

import departmentQuery from '@/common/departmentQuery'
import companyQuery from '@/common/companyQuery'

import { postDepartmentData, getCompanyTree } from '@/server/api.js'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      data1: [],
      allData: {
        dname: '',
        cname: '',
        cid: '',
        dLevel: 1,
        description: '',
        upDid: ''
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
      this.allData.upDid = ''
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      if (!this.allData.cid) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      // console.log(item)
      this.allData.upDid = item.did
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    save () {
      // this.$Spin.show()
      let params = this.allData
      this.$Loading.start()
      postDepartmentData(params).then((res) => {
        this.$Loading.finish()
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$router.go(0)
        } else {
          this.$Message.warning(res.msg)
        }
      }).catch((err) => {
        // this.$Spin.hide()
        this.$Message.warning('数据保存异常！')
        // this.clearData()
        this.$Loading.finish()
        throw err
      })
    },
    clearData () {
      Object.keys(this.allData).forEach(key => {
        if (key === 'dLevel') {
          this.allData[key] = 1
        } else {
          this.allData[key] = ''
        }
        return this.allData
      })
    }
  },
  components: {
    departmentQuery,
    companyQuery
  }
}
</script>

<style>
.department{ height: 100%;padding: 10px 10px;font-size: 14px;font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;-webkit-font-smoothing: antialiased;min-height: 400px; }
.department_title{ background: #2d8cf0;width: 100%;text-align: left;color: #fff;line-height: 36px;height: 36px;padding-left: 10px;}
.department .ivu-input-group{ width: 65% !important;}
/* .border{ border-right: 1px solid #e8eaec !important; } */
</style>
