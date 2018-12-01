<template>
  <div class="area">
    <div class="area_title mb20">
      <span>片区预算使用表</span>
    </div>
    <div class="structWrap pl10 pr10">
      <Row :gutter="16" class="mb10">
        <!-- <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司：</Button>
          <Input search enter-button  placeholder=""  v-model="allData.bpc_comName" @on-search="queryCompany"/>
        </Col> -->
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">片区：</Button>
          <Input search enter-button  placeholder=""  v-model="allData.controlNumName" @on-search="queryArea"/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">费用类型：</Button>
          <Input  placeholder="" search enter-button v-model="allData.bpc_costTypeName" @on-search="queryBpcCostType" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="query">查询</Button>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Table border :columns="columns7" :data="data6" class="mb20"></Table>
        <Page :total="this.lengthList" show-total @on-change="changPageSize" />
      </Row>
    </div>
    <areaQuery @tableArea="getArea" @statusArea='getAreaStatus' :data="model1" v-if="flag1"></areaQuery>
    <bpcCostTypeQuery @tableBpcCostType="getBpcCostType" @statusBpcCostType='getBpcCostTypeStatus' :data="model3" v-if="flag3"></bpcCostTypeQuery>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="allData.bpc_comId"></departmentQuery>
  </div>
</template>
<script>

import bpcCostTypeQuery from '@/components/ZHYFF/common/bpcCostTypeQuery'

import departmentQuery from '@/components/ZHYFF/common/departmentQuery'

import areaQuery from '@/components/ZHYFF/common/areaQuery'

import { getBpcArea } from '@/components/ZHYFF/server/api.js'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag3: false,
      model3: false,
      flag2: false,
      model2: false,
      lengthList: 0,
      allData: {
        bpc_comId: '',
        bpc_comName: '',
        bpc_deptId: '',
        bpc_deptName: '',
        bpc_costType: '',
        bpc_costTypeName: '',
        page: '1'
      },
      data6: [],
      columns7: [
        {
          title: '预算版本',
          key: 'b28_s_vvd38ti'
        },
        {
          title: '年月',
          key: 'b28_s_vvdokk5'
        },
        {
          title: '片区',
          key: 'controlNumName'
        },
        {
          title: '费用类型编码',
          key: 'bpc_costType'
        },
        {
          title: '费用类型',
          key: 'bpc_costTypeName'
        },
        {
          title: '原始总预算',
          key: 'tot_bud'
        },
        {
          title: '架构代码',
          key: 'controlNum'
        },
        {
          title: '已冻结',
          key: 'tot_clo'
        },
        {
          title: '已消耗',
          key: 'tot_cum'
        },
        {
          title: '调整预算',
          key: 'tot_exe'
        },
        {
          title: '剩余可用预算(CNY)',
          key: 'tot_luse_cny'
        }
      ]
    }
  },
  created () {
    let params = this.allData
    getBpcArea(params).then((res) => {
      this.data6 = res.budgetUsageList
      this.lengthList = res.budgetUsageListSize
    })
  },
  mounted () {},
  methods: {
    // queryCompany () { // 公司信息查询
    //   this.flag1 = true
    //   this.model1 = true
    // },
    // getCompany (item) {
    //   this.allData.bpc_comId = item.bpc_comId
    //   this.allData.bpc_comName = item.bpc_comName
    // },
    // getCompanyStatus (item) {
    //   this.flag1 = item.comFlag
    //   this.model1 = item.commodal
    // },
    queryArea () { // 片区信息查询
      this.flag1 = true
      this.model1 = true
    },
    getArea (item) {
      console.log(item)
      this.allData.controlNum = item.controlNum
      this.allData.controlNumName = item.controlNumName
    },
    getAreaStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      this.flag2 = true
      this.model2 = true
    },
    getDepartment (item) {
      // console.log(item)
      this.allData.bpc_deptId = item.bpc_deptId
      this.allData.bpc_deptName = item.bpc_deptName
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    queryBpcCostType () { // 费用类型查询
      this.flag3 = true
      this.model3 = true
    },
    getBpcCostType (item) {
      this.allData.bpc_costType = item.bpc_costType
      this.allData.bpc_costTypeName = item.bpc_costTypeName
    },
    getBpcCostTypeStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    changPageSize (item) {
      this.allData.page = item
      let params = this.allData
      getBpcArea(params).then((res) => {
        this.data6 = res.budgetUsageList
      })
    },
    query () {
      let params = this.allData
      getBpcArea(params).then((res) => {
        this.data6 = res.budgetUsageList
      })
    }
  },
  components: {
    bpcCostTypeQuery,
    departmentQuery,
    areaQuery
  }
}
</script>

<style>
.area{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.area_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.area_title span{
  display: inline-block;
  width: 144px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.area_title:after {
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
