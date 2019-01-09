<template>
  <div class="exchangeManegement">
    <div class="exchangeManegement_title mb20">
      <span>公司部门预算使用表</span>
    </div>
    <div class="structWrap pl10 pr10">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司：</Button>
          <Input search enter-button  placeholder=""  v-model="allData.bpc_comName" @on-search="queryCompany"/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">费用类型：</Button>
          <Input  placeholder="" search enter-button v-model="allData.bpc_costTypeName" @on-search="queryBpcCostType" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">年份：</Button>
          <Select v-model="allData.year" style="width:100%">
            <Option v-for="item in yearType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">月份：</Button>
          <Select v-model="allData.month" style="width:100%">
            <Option v-for="item in monthType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">金额计量单位：</Button>
          <Select v-model="allData.unitMoeny" style="width:100%">
            <Option v-for="item in moneyType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="query">查询</Button>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Table border :columns="columns7" :data="data6" class="mb20"></Table>
        <Page :total="this.listLength" show-total @on-change="changPageSize" />
      </Row>
    </div>
    <bpcCostTypeQuery @tableBpcCostType="getBpcCostType" @statusBpcCostType='getBpcCostTypeStatus' :data="model3" v-if="flag3"></bpcCostTypeQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>

import companyQuery from '@/components/ZHYFF/common/companyQuery'

import bpcCostTypeQuery from '@/components/ZHYFF/common/bpcCostTypeQuery'

import { getBpcCompanyWithoutDept, getBPCYear } from '@/components/ZHYFF/server/api.js'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      model3: false,
      flag3: false,
      allData: {
        bpc_comId: '',
        bpc_comName: '',
        bpc_costType: '',
        bpc_costTypeName: '',
        unitMoeny: '元',
        page: '1'
      },
      data6: [],
      yearType: [],
      monthType: [
        { label: '01', value: '01' },
        { label: '02', value: '02' },
        { label: '03', value: '03' },
        { label: '04', value: '04' },
        { label: '05', value: '05' },
        { label: '06', value: '06' },
        { label: '07', value: '07' },
        { label: '08', value: '08' },
        { label: '09', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' }
      ],
      listLength: 0,
      moneyType: [
        {
          label: '元',
          value: '元'
        },
        {
          label: '千',
          value: '千'
        },
        {
          label: '万',
          value: '万'
        },
        {
          label: '百万',
          value: '百万'
        }
      ],
      columns7: [
        {
          title: '预算版本',
          key: 'b28_s_vvd38ti',
          width: 150,
          fixed: 'left'
        },
        {
          title: '年',
          width: 100,
          key: 'year'
        },
        {
          title: '月',
          width: 100,
          key: 'month'
        },
        {
          title: '费用类型编码',
          width: 150,
          key: 'bpc_costType'
        },
        {
          title: '费用类型',
          width: 150,
          key: 'bpc_costTypeName'
        },
        {
          title: '公司',
          width: 150,
          key: 'bpc_comName'
        },
        {
          title: '原始总预算',
          width: 200,
          key: 'tot_bud'
        },
        {
          title: '架构代码',
          width: 150,
          key: 'controlNum'
        },
        {
          title: '总合计预算',
          width: 200,
          key: 'tot_tot'
        },
        {
          title: '已冻结',
          width: 200,
          key: 'tot_clo'
        },
        {
          title: '已消耗',
          width: 200,
          key: 'tot_cum'
        },
        {
          title: '调整预算',
          width: 150,
          key: 'tot_exe'
        },
        {
          title: '剩余可用预算(CNY)',
          width: 200,
          key: 'tot_luse_cny',
          fixed: 'right'
        }
      ]
    }
  },
  created () {
    let params = this.allData
    getBpcCompanyWithoutDept(params).then((res) => {
      if (res.success === true || res.success === 'true') {
        this.$Message.success('数据查询成功！')
        this.data6 = res.budgetUsageList
        this.listLength = res.budgetUsageListSize
      } else {
        this.$Message.error('数据查询失败！')
      }
    }).catch(err => {
      this.$Message.error('数据查询异常！')
      throw err
    })
    getBPCYear({}).then((res) => {
      this.yearType = res.correspondList
    })
  },
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.allData.bpc_comId = item.bpc_comId
      this.allData.bpc_comName = item.bpc_comName
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
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
      this.flag3 = item.comFlag
      this.model3 = item.commodal
    },
    changPageSize (item) {
      this.allData.page = item + ''
      let params = this.allData
      getBpcCompanyWithoutDept(params).then((res) => {
        if (res.success === true || res.success === 'true') {
          this.$Message.success('数据查询成功！')
          this.data6 = res.budgetUsageList
          this.listLength = res.budgetUsageListSize
        } else {
          this.$Message.error('数据查询失败！')
        }
      }).catch(err => {
        this.$Message.error('数据查询失败！')
        throw err
      })
    },
    query () {
      let params = this.allData
      getBpcCompanyWithoutDept(params).then((res) => {
        if (res.success === true || res.success === 'true') {
          this.$Message.success('数据查询成功！')
          this.data6 = res.budgetUsageList
          this.listLength = res.budgetUsageListSize
        } else {
          this.$Message.error('数据查询失败！')
        }
      }).catch(err => {
        this.$Message.error('数据查询异常！')
        throw err
      })
    }
  },
  components: {
    companyQuery,
    bpcCostTypeQuery
  }
}
</script>

<style>
.exchangeManegement{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.exchangeManegement_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.exchangeManegement_title span{
  display: inline-block;
  width: 144px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.exchangeManegement_title:after {
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
