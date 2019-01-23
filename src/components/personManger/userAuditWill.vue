<template>
    <div class="userAuditWill">
      <div class="userAuditWill_title mb20">
        人员信息预处理
      </div>
      <div class="userAuditWill_inputGroup">
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin:0 16px;">查询条件</Button>
            <div>
              <RadioGroup v-model="queryType" @on-change="queryTypeChange" >
                <Radio v-bind:key="item.value" v-for="item in queryTypeList" :label="item.title"></Radio>
              </RadioGroup>
            </div>
          </Col>
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="24">
            <Tabs value="thisMonth" @on-click="tabChange" :animated="false">
              <TabPane :label="tabPane.thisMonth" name="thisMonth">
                <Table border :columns="columns" :data="userAuditWillPageData" @on-row-dblclick="handleRowClick"></Table>
                <Page :total="userAuditWillPageParams.totalRow" :current="userAuditWillPageParams.pageNumber" :page-size="userAuditWillPageParams.pageSize" @on-change="changeUserAuditWillPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.nextMonth" name="nextMonth">
                <Table border :columns="columns" :data="userAuditWillPageData" @on-row-dblclick="handleRowClick"></Table>
                <Page :total="userAuditWillPageParams.totalRow" :current="userAuditWillPageParams.pageNumber" :page-size="userAuditWillPageParams.pageSize" @on-change="changeUserAuditWillPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.threeMonth" name="threeMonth">
                <Table border :columns="columns" :data="userAuditWillPageData" @on-row-dblclick="handleRowClick"></Table>
                <Page :total="userAuditWillPageParams.totalRow" :current="userAuditWillPageParams.pageNumber" :page-size="userAuditWillPageParams.pageSize" @on-change="changeUserAuditWillPageNumber" show-total  class="mt20" />
              </TabPane>
              <TabPane :label="tabPane.overdue" name="overdue">
                <Table border :columns="columns" :data="userAuditWillPageData" @on-row-dblclick="handleRowClick"></Table>
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
      <Modal
        :title="queryType === '健康证' ? '健康证日期设置：' : '转正日期设置：'"
        v-model="modal"
        :closable="false"
        @on-ok="modalOk"
        @on-cancel="modalCancel"
        :mask-closable="false">
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="16">
            <Button class="wd mr10 tr" type="text">{{ queryType === '健康证' ? '健康证到期日：' : '有效证件到期日：' }}</Button>
            <DatePicker @on-change="dateValue=$event" type="date" placeholder="Select date" placement="bottom" v-model="dateValue"></DatePicker>
          </Col>
        </Row>
      </Modal>
    </div>
</template>
<script>

import { getUserAuditWill, updateUserAuditWill } from '@/server/api'

export default {
  data () {
    return {
      updateUserId: '',
      modal: false,
      dateValue: '',
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
        },
        overdue: (h) => {
          return h('div', [
            h('span', '逾期提醒')
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
        this.createTabColumns()
      }
      if (name === 'nextMonth') {
        this.currentTabName = 'nextMonth'
        this.createTabColumns()
      }
      if (name === 'threeMonth') {
        this.currentTabName = 'threeMonth'
        this.createTabColumns()
      }
      if (name === 'overdue') {
        this.currentTabName = 'overdue'
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
        // tempColumns.push({title: '健康证到期日', key: 'healhDateView'})
        this.columns = tempColumns
      }
      if (queryTypeValue === 'IDCARDKINDID') {
        tempColumns.push({title: '身份证', key: 'idcardno'})
        tempColumns.push({title: '有效证件到期日', key: 'idcardkindidView'})
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
    },
    handleRowClick (row, index) {
      this.updateUserId = row.userId
      if (this.queryType === '健康证') {
        this.modal = true
      } else if (this.queryType === '身份证') {
        this.modal = true
      } else {
        return false
      }
    },
    modalOk () {
      if (this.queryType === '健康证') {
        let params = {
          userId: this.updateUserId,
          expireField: 'healhDate',
          date: this.dateValue
        }
        updateUserAuditWill(params).then(res => {
          console.log(params)
          debugger
          if (res.code === 200) {
            this.$Message.info('健康证日期更新成功！')
            this.$router.go(0)
          } else {
            this.$Message.info('健康证日期更新失败！')
          }
        }).catch(err => {
          this.$Message.warning('操作异常！')
          throw err
        })
      } else if (this.queryType === '身份证') {
        let params = {
          userId: this.updateUserId,
          expireField: 'IDCARDKINDID',
          date: this.dateValue
        }
        updateUserAuditWill(params).then(res => {
          if (res.code === 200) {
            this.$Message.info('身份证到期日更新成功！')
            this.$router.go(0)
          } else {
            this.$Message.info('身份证到期日更新失败！')
          }
        }).catch(err => {
          this.$Message.warning('操作异常！')
          throw err
        })
      } else {
        return false
      }
      this.dateValue = ''
    },
    modalCancel () {
      this.modal = false
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
