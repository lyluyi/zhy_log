<template>
    <div class="userAudit">
      <div class="userAudit_title mb20">
        人员变动审核
      </div>
      <div class="userAudit_inputGroup">
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">审批状态：</Button>
            <!--
            <Input placeholder="" v-model="userAuditQueryParams.auditStatus"  />
            -->
            <Select v-model="userAuditQueryParams.auditStatus" style="width:200px">
                <Option v-for="item in UserAuditStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >申请类型：</Button>
            <Select v-model="userAuditQueryParams.auditType" style="width:200px">
                <Option v-for="item in UserAuditType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >用户名：</Button>
            <Input placeholder="" search enter-button @on-search="queryUser" v-model="userAuditQueryParams.userName" readonly />
          </Col>
        </Row>
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="queryUserAudit">查询</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24" class="dict_col">
            <Table highlight-row border :columns="userAuditColumns" :sortable="true" :data="userAuditData"  ref="dictTypeTable" @on-row-click="selectUserAudit" ></Table>
            <Page :total="userAuditPageInfo.totalRow" :current="userAuditPageInfo.pageNumber" :page-size="userAuditPageInfo.pageSize" @on-change="changeUserAuditPageNumber" show-total  class="mt20" />
          </Col>
        </Row>
      </div>
      <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQuery>

      <Modal v-model="userAuditCountDialog.isCloseDialog"  title="当前用户执行中流程">
        <Table border :columns="userAuditCountDialog.column" :data="userAuditCountDialog.data"></Table>
         <div slot="footer">
            <Button type="error" size="large" @click="closeDialogAudit">关闭</Button>
            <Button type="error" size="large" @click="openUserAuditDetailedPage">打开审批页面</Button>
         </div>
      </Modal>

    </div>
</template>
<script>

import { getUserAuditList } from '@/server/api'
import getDic from '@/server/apiDic'
import userIdQuery from '@/common/userIdQuery'

export default {
  data () {
    return {
      userAuditCountDialog: {
        isCloseDialog: false,
        column: [
          {
            title: '申请单code',
            key: 'applyCode'
          },
          {
            title: '申请类型',
            key: 'auditType'
          },
          {
            title: '用户id',
            key: 'userId'
          },
          {
            title: '用户姓名',
            key: 'userName'
          },
          {
            title: '创建时间',
            key: 'createTimeView'
          },
          {
            title: '审批状态',
            key: 'auditStatus'
          },
          {
            title: '公司名称',
            key: 'cname'
          },
          {
            title: '部门名称',
            key: 'dname'
          }],
        data: [],
        selectAuditType: '',
        selectId: ''
      },
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      flag3: false,
      model3: false,
      modal6: false,
      openSelectUserDialog: false,
      userIdFlag: 0,

      userAuditColumns: [
        {
          title: '申请单code',
          key: 'applyCode'
        },
        {
          title: '申请类型',
          key: 'auditType'
        },
        {
          title: '用户id',
          key: 'userId'
        },
        {
          title: '用户姓名',
          key: 'userName'
        },
        {
          title: '创建时间',
          key: 'createTimeView'
        },
        {
          title: '审批状态',
          key: 'auditStatus'
        },
        {
          title: '公司名称',
          key: 'cname'
        },
        {
          title: '部门名称',
          key: 'dname'
        }
      ],
      userAuditQueryParams: {
        auditType: '',
        applyCode: '',
        auditStatus: '',
        userId: '',
        userName: ''
      },
      userAuditData: [],
      userAuditPageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      UserAuditType: [],
      UserAuditStatus: []
    }
  },
  created () {
    let params = { pageNumber: 1, pageInfo: 10 }
    this.getUserAuditPage(params)
    this.getAuditTypeDictionaries()
    this.getAuditStatusDictionaries()
  },
  methods: {
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
      this.userAuditQueryParams.userId = item.userId
      this.userAuditQueryParams.userName = item.userName
    },
    getAuditTypeDictionaries () {
      getDic('UserAuditType').then((res) => {
        this.UserAuditType = res.data
      })
    },
    getAuditStatusDictionaries () {
      getDic('userAuditStatus').then((res) => {
        this.UserAuditStatus = res.data
      })
    },
    changeUserAuditPageNumber (num) {
      let params = {pageNumber: num, pageInfo: 10}
      this.getUserAuditPage(params)
    },
    getUserAuditPage (params) {
      getUserAuditList(params).then((res) => {
        this.userAuditData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userAuditPageInfo = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPage: totalPage,
          totalRow: totalRow
        }
      })
    },
    queryUserAudit () {
      let params = {pageNumber: 1, pageInfo: 10}
      params = Object.assign({}, params, this.userAuditQueryParams)
      this.getUserAuditPage(params)
    },
    selectUserAudit (data, index, event) {
      this.userAuditCountDialog.isCloseDialog = false
      this.userAuditCountDialog.selectAuditType = data['auditType']
      this.userAuditCountDialog.selectId = data['id']
      let params = {pageNumber: 1, pageSize: 1000, auditStatus: '审批中', userId: data['userId']}
      getUserAuditList(params).then((res) => {
        this.userAuditCountDialog.data = res.list
        this.userAuditCountDialog.isCloseDialog = true
      })
    },
    closeDialogAudit () {
      this.userAuditCountDialog.isCloseDialog = false
    },
    openUserAuditDetailedPage () {
      if (this.userAuditCountDialog.selectAuditType === '员工岗位异动申请') {
        this.$router.push({name: 'jobChangeAudit', params: { entityId: this.userAuditCountDialog.selectId, id: this.userAuditCountDialog.selectId }})
      } else if (this.userAuditCountDialog.selectAuditType === '员工转正申请') {
        this.$router.push({name: 'fullMemberAudit', params: { entityId: this.userAuditCountDialog.selectId, id: this.userAuditCountDialog.selectId }})
      } else if (this.userAuditCountDialog.selectAuditType === '员工转编申请') {
        this.$router.push({name: 'transferAudit', params: { entityId: this.userAuditCountDialog.selectId, id: this.userAuditCountDialog.selectId }})
      } else if (this.userAuditCountDialog.selectAuditType === '员工离退申请') {
        this.$router.push({name: 'dimissionAudit', params: { entityId: this.userAuditCountDialog.selectId, id: this.userAuditCountDialog.selectId }})
      } else if (this.userAuditCountDialog.selectAuditType === '员工回聘申请') {
        this.$router.push({name: 'reEmployAudit', params: { entityId: this.userAuditCountDialog.selectId, id: this.userAuditCountDialog.selectId }})
      }
    }
  },
  components: {
    userIdQuery
  }
}
</script>

<style>
.userAudit{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.userAudit_title{
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

/* .userAudit .ivu-input-group { width: 60% !important; } */
</style>
