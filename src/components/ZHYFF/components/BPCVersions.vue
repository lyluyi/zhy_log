<template>
  <div class="BPCVsersions">
    <div class="BPCVsersions_title mb20">
      <span>BPC版本维护表</span>
    </div>
    <div class="structWrap pl10 pr10">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">费控版本：</Button>
          <Select v-model="allData.costTable" style="width:150px">
            <Option v-for="item in BPCType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="info" style="margin: 0 auto;" @click="query" >查询</Button>
          <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="importData" >导入BPC数据</Button>
          <Button class="wd tc" type="success" style="margin: 0 auto;" @click="update" >更新</Button>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Table border :columns="columns7" :data="data6" class="mb20"></Table>
        <Page :total="this.listLength" show-total @on-change="changPageSize(item)" />
      </Row>
    </div>
  </div>
</template>

<script>

import { getBPCVersions, getBPCVersionsQuery, getBPCData, getUpdateBPCData } from '@/components/ZHYFF/server/api.js'

export default {
  data () {
    return {
      listLength: 0,
      BPCType: [],
      allData: {
        costTable: ''
      },
      data6: [],
      columns7: [
        {
          title: '时间',
          key: 'b28_S_VVDOKK5'
        },
        {
          title: '公司',
          key: 'b28_S_VVDX75J'
        },
        {
          title: '科目',
          key: 'month'
        },
        {
          title: '产品',
          key: 'b28_S_VVD7BCH'
        },
        {
          title: '物料',
          key: 'b28_S_VVD60WY'
        },
        {
          title: '项目',
          key: 'b28_S_VVDVO1H'
        },
        {
          title: '辅助信息',
          key: 'b28_S_VVDNC9R'
        },
        {
          title: '关联方',
          key: 'b28_S_VVDT8K3'
        },
        {
          title: '预算渠道',
          key: 'b28_S_VVDYYKE'
        },
        {
          title: '报表货币',
          key: 'b28_S_VVDMEJQ'
        },
        {
          title: '备用维',
          key: 'b28_S_VVDIBZZ'
        },
        {
          title: '金额',
          key: 'b28_S_VVDC4XT'
        },
        {
          title: '预算版本',
          key: 'SIGNDATA'
        },
        {
          title: '公司代码',
          key: 'b28_S_VVD38TI'
        },
        {
          title: '部门',
          key: 'b28_S_VVDX75J_01'
        },
        {
          title: '年',
          key: 'year'
        },
        {
          title: '月',
          key: 'month'
        },
        {
          title: '类型',
          key: 'bpc_costtype'
        },
        {
          title: '架构代码',
          key: 'controlNum'
        },
        {
          title: 'FK版本',
          key: 'edition'
        }
      ]
    }
  },
  created () {
    let param = {}
    getBPCVersions(param).then((res) => {
      if (res.success === true || res.success === 'true') {
        this.BPCType = res.editionList
      } else {
        this.$Message.error('费控版本查询失败！')
      }
    }).catch(err => {
      this.$Message.error('费控版本查询异常！')
      throw err
    })
  },
  methods: {
    changPageSize (item) {
      this.allData.page = item + ''
      let params = this.allData
      getBPCVersionsQuery(params).then((res) => {
        if (res.success === true || res.success === 'true') {
          this.data6 = res.list
        } else {
          this.$Message.error('数据查询失败！')
        }
      }).catch(err => {
        this.$Message.error('数据查询失败！')
        throw err
      })
    },
    query () {
      let param = this.allData
      getBPCVersionsQuery(param).then((res) => {
        if (res.success === true || res.success === 'true') {
          this.data6 = res.list
          // this.listLength = res.budgetUsageListSize ?????
        } else {
          this.$Message.error('数据查询失败！')
        }
      }).catch(err => {
        this.$Message.error('数据查询失败！')
        throw err
      })
    },
    update () {
      let param = {
        'edition': this.allData.costTable
      }
      getUpdateBPCData(param).then((res) => {
        if (res.success === true || res.success === 'true') {
          this.$Message.success('数据更新成功！')
        } else {
          this.$Message.error('数据更新异常！')
        }
      }).catch(err => {
        this.$Message.error('数据更新失败！')
        throw err
      })
    },
    importData () {
      let param = {}
      getBPCData(param).then((res) => {
        if (res.success === true || res.success === 'true') {
          this.BPCType = res.editionList
          // this.listLength = res.budgetUsageListSize ?????
        } else {
          this.$Message.error('导入费控版本数据失败！')
        }
      }).catch(err => {
        this.$Message.error('导入费控版本数据查询失败！')
        throw err
      })
    }
  }
}
</script>

<style>
.BPCVsersions{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.BPCVsersions_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.BPCVsersions_title span{
  display: inline-block;
  width: 144px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.BPCVsersions_title:after {
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
