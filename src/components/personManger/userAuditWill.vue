<template>
    <div class="userAuditWill">
      <div class="userAuditWill_title mb20">
        人员信息预处理
      </div>
      <div class="userAuditWill_inputGroup">
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="info" style="margin:0 24px;">查询条件：</Button>
            <div>
              <RadioGroup v-model="queryType" @on-change="queryTypeChange" >
                <Radio v-bind:key="item.value" v-for="item in queryTypeList" :label="item.title"></Radio>
              </RadioGroup>
            </div>
          </Col>
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="24">
            <Tabs value="thisMonth" @on-click="tabChange" >
              <TabPane :label="tabPane.thisMonth" name="thisMonth">
                <Table border :columns="columns" :data="userAuditWillPageData"></Table>
                <Page :total="userAuditWillPageParams.totalRow" :current="userAuditWillPageParams.pageNumber" :page-size="userAuditWillPageParams.pageSize" @on-change="changeUserAuditWillPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.nextMonth" name="nextMonth">
                  <Table border :columns="columns" :data="userAuditWillPageData"></Table>
                  <Page :total="userAuditWillPageParams.totalRow" :current="userAuditWillPageParams.pageNumber" :page-size="userAuditWillPageParams.pageSize" @on-change="changeUserAuditWillPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.threeMonth" name="threeMonth">
                  <Table border :columns="columns" :data="userAuditWillPageData"></Table>
                  <Page :total="userAuditWillPageParams.totalRow" :current="userAuditWillPageParams.pageNumber" :page-size="userAuditWillPageParams.pageSize" @on-change="changeUserAuditWillPageNumber" show-total  class="mt20" />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <Row :gutter="16" class="mb20 mt20 pt20">
          <!--
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin: 0 auto;">查询</Button>
          </Col>
          -->
        </Row>
        <Row>
          <Col span="24" class="dict_col">
          </Col>
        </Row>
      </div>
    </div>
</template>
<script>

import { getUserAuditWill } from '@/server/api'

export default {
  data () {
    return {
      queryType: '健康证',
      currentTabName: 'thisMonth',
      queryTypeList: [{
        title: '健康证',
        value: 'healhDate'
      }, {
        title: '身份证',
        value: 'IDCARDKINDID'
      }, /* {
        title: '试用期',
        value: ''
      }, */{
        title: '转正',
        value: 'toBeWorkDate'
      }, {
        title: '生日',
        value: 'birthDate'
      }],
      tabPane: {
        thisMonth: (h) => {
          return h('div', [
            h('span', '本月')
          ])
        },
        nextMonth: (h) => {
          return h('div', [
            h('span', '下月')
          ])
        },
        threeMonth: (h) => {
          return h('div', [
            h('span', '三个月之内')
          ])
        }
      },
      baseColumns: [
        {
          title: '员工编号',
          key: 'userId'
        },
        {
          title: '员工姓名',
          key: 'userName'
        },
        {
          title: '所属公司',
          key: 'cname'
        },
        {
          title: '所属部门',
          key: 'dname'
        }
      ],
      columns: [],
      userAuditWillPageParams: {
        queryType: '',
        timeType: '',
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      userAuditWillPageData: []
    }
  },
  created () {
    this.createTabColumns()
    this.queryUserAuditWillPageData()
  },
  methods: {
    queryTypeChange () {
      this.createTabColumns()
    },
    tabChange (name) {
      if (name === 'thisMonth') {
        this.currentTabName = 'thisMonth'
        console.log(this.currentTabName)
        console.log(this.getQueryTypeValue())
        this.createTabColumns()
      }
      if (name === 'nextMonth') {
        this.currentTabName = 'nextMonth'
        console.log(this.currentTabName)
        console.log(this.getQueryTypeValue())
        this.createTabColumns()
      }
      if (name === 'threeMonth') {
        this.currentTabName = 'threeMonth'
        console.log(this.currentTabName)
        console.log(this.getQueryTypeValue())
        this.createTabColumns()
      }
    },
    getQueryTypeValue () {
      for (let index in this.queryTypeList) {
        if (this.queryTypeList[index].title === this.queryType) {
          return this.queryTypeList[index].value
        }
      }
    },
    copyArray (arr) {
      var result = []
      for (var i = 0; i < arr.length; i++) {
        result.push(arr[i])
      }
      return result
    },
    createTabColumns () {
      let queryTypeValue = this.getQueryTypeValue()
      let tempColumns = this.copyArray(this.baseColumns)
      if (queryTypeValue === 'healhDate') {
        tempColumns.push({title: '健康证', key: 'healhDateView'})
        this.columns = tempColumns
      }
      if (queryTypeValue === 'IDCARDKINDID') {
        tempColumns.push({title: '身份证', key: 'idcardno'})
        this.columns = tempColumns
      }
      if (queryTypeValue === 'toBeWorkDate') {
        tempColumns.push({title: '转正日期', key: 'toBeWorkDateView'})
        this.columns = tempColumns
      }
      if (queryTypeValue === 'birthDate') {
        tempColumns.push({title: '生日', key: 'birthdateView'})
        this.columns = tempColumns
      }
      this.queryUserAuditWillPageData()
    },
    queryUserAuditWillPageData () {
      this.userAuditWillPageParams = {
        queryType: this.getQueryTypeValue(),
        timeType: this.currentTabName,
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
      getUserAuditWill(this.userAuditWillPageParams).then((res) => {
        this.userAuditWillPageData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userAuditWillPageParams.pageNumber = pageNumber
        this.userAuditWillPageParams.pageSize = pageSize
        this.userAuditWillPageParams.totalPage = totalPage
        this.userAuditWillPageParams.totalRow = totalRow
      })
    },
    changeUserAuditWillPageNumber (num) {
      this.userAuditWillPageParams.pageNumber = num
      getUserAuditWill(this.userAuditWillPageParams).then((res) => {
        this.userAuditWillPageData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userAuditWillPageParams.pageNumber = pageNumber
        this.userAuditWillPageParams.pageSize = pageSize
        this.userAuditWillPageParams.totalPage = totalPage
        this.userAuditWillPageParams.totalRow = totalRow
      })
    }
  },
  components: {
  }
}
</script>

<style>
.userAuditWill{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.userAuditWill_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.ivu-divider-inner-text {
  font-size: 15px;
  font-weight: bolder;
  color:#2d8cf0;
}
.userAuditWill .ivu-tabs {
  width: 100%
}
</style>
