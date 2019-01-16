<template>
    <div class="userAuditView">
      <div class="userAuditView_title mb20">
        人员变动查看
      </div>
      <Tabs :value="tabValue" :animated="false">
        <TabPane label="人员变动审核查看" name="人员变动审核查看">
          <div class="userAudit_inputGroup">
            <Divider orientation="left">人员变动审核查看</Divider>
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
                <Table highlight-row border :columns="userAuditColumns" :sortable="true" :data="userAuditData"  @on-row-click="selectUserAudit" ></Table>
                <Page :total="userAuditPageInfo.totalRow" :current="userAuditPageInfo.pageNumber" :page-size="userAuditPageInfo.pageSize" @on-change="changeUserAuditPageNumber" show-total  class="mt20" />
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="人员变动详情查看" name="人员变动详情查看">
          <div class="userAudit_inputGroup">
            <Divider orientation="left">人员变动详情查看</Divider>
            <Row :gutter="16" class="mb10">
              <Col class="col_flex" span="8">
                <Button class="wd mr10 tr" type="text">审批状态：</Button>
                <Select v-model="userAuditQueryData.auditTypeStatus" style="width:200px">
                    <Option v-for="item in UserAuditQueryType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <Row :gutter="16" class="mb20 mt20 pt20">
              <Col class="col_flex" span="24">
                <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="queryDetailAudit">查询</Button>
              </Col>
            </Row>
            <Row>
              <Col span="24" class="dict_col">
                <Table highlight-row border :columns="userAuditDetailColumns" :sortable="true" :data="userTypeQueryData"  @on-row-click="selectUserAudit" ></Table>
                <Page :total="userQueryPageInfo.totalRow" :current="userQueryPageInfo.pageNumber" :page-size="userQueryPageInfo.pageSize" @on-change="changeUserAuditPageNumber" show-total  class="mt20" />
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
      <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="openSelectUserDialog"></userIdQuery>
    </div>
</template>
<script>

import {
  getUserAuditList,
  getJobChangeCum,
  getFullmemberCum,
  getDimissonCum,
  getReEmployCum,
  getTransferCum
} from '@/server/api'

import getDic from '@/server/apiDic'
import userIdQuery from '@/common/userIdQuery'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      flag3: false,
      model3: false,
      modal6: false,
      openSelectUserDialog: false,
      userIdFlag: 0,
      tabValue: '人员变动审核查看',
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
          title: '员工编号',
          key: 'userId'
        },
        {
          title: '员工姓名',
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
      UserAuditStatus: [],
      userAuditQueryData: {
        auditStatus: '审批通过',
        auditTypeStatus: '异动'
      },
      userQueryPageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      UserAuditQueryType: [
        { 'label': '异动', value: '异动' },
        { 'label': '转正', value: '转正' },
        { 'label': '转编', value: '转编' },
        { 'label': '离退', value: '离退' },
        { 'label': '回聘', value: '回聘' }
      ],
      userTypeQueryData: [],
      userAuditDetailColumns: [],
      jobChangeColumns: [ // userCdChange/page
        {
          title: '人员编号',
          key: 'USER_ID',
          width: 128,
          fixed: 'left'
        },
        {
          title: '姓名',
          key: 'USER_NAME',
          width: 128,
          fixed: 'left'
        },
        {
          title: 'ID',
          width: 128,
          key: 'ID'
        },
        {
          title: '原公司名称',
          width: 128,
          key: 'CNAME_OLD'
        },
        {
          title: '原部门名称',
          width: 128,
          key: 'DNAME_OLD'
        },
        {
          title: '原职位',
          width: 128,
          key: 'JOBNAME_OLD'
        },
        {
          title: '入司时间',
          width: 128,
          key: 'JOINDATE'
        },
        {
          title: '员工状态',
          width: 128,
          key: 'USER_STATUE'
        },
        {
          title: '新公司名称',
          width: 128,
          key: 'CNAME_NEW'
        },
        {
          title: '新部门名称',
          width: 128,
          key: 'DNAME_NEW'
        },
        {
          title: '新职位',
          width: 128,
          key: 'JOBNAME_NEW'
        },
        {
          title: '新直接主管',
          width: 128,
          key: 'UPHEADER_NEW'
        },
        {
          title: '新公司ID',
          width: 128,
          key: 'CID_NEW'
        },
        {
          title: '新部门ID',
          width: 128,
          key: 'DID_NEW'
        },
        {
          title: '操作人',
          width: 128,
          key: 'OPERATOR_ID'
        },
        {
          title: '操作时间',
          width: 128,
          key: 'OPER_DATE'
        },
        {
          title: '审批人',
          width: 128,
          key: 'APPROVER_ID'
        },
        {
          title: '审批时间',
          width: 128,
          key: 'APP_DATE'
        },
        {
          title: '原公司ID',
          width: 128,
          key: 'CID_OLD'
        },
        {
          title: '原部门ID',
          width: 128,
          key: 'DID_OLD'
        },
        {
          title: '变动类型',
          width: 128,
          key: 'CHANGE_TYPE'
        },
        {
          title: '新公司所属区域',
          width: 128,
          key: 'AREA_NEW'
        },
        {
          title: '新职位ID',
          width: 128,
          key: 'JOB_ID_NEW'
        },
        {
          title: '原职位ID',
          width: 128,
          key: 'JOB_ID_OLD'
        },
        {
          title: '备注',
          width: 128,
          key: 'REMARK'
        },
        {
          title: '异动时间',
          width: 128,
          key: 'CHANGE_DATE'
        },
        {
          title: '生效时间',
          width: 128,
          key: 'EFFECT_DATE'
        },
        {
          title: '预计转正日期',
          width: 128,
          key: 'TO_BE_WORK_DATE'
        }
      ],
      reEmployColumns: [ // userReturn/page
        {
          title: '员工姓名',
          width: 128,
          key: 'USER_NAME'
        },
        {
          title: 'ID',
          width: 128,
          key: 'ID'
        },
        {
          title: '申请时间',
          width: 128,
          key: 'ASK_FOR_DATE'
        },
        {
          title: '入司时间',
          width: 128,
          key: 'STARTWORKDATE'
        },
        {
          title: '公司ID',
          width: 128,
          key: 'CID'
        },
        {
          title: '公司名称',
          width: 128,
          key: 'CNAME'
        },
        {
          title: '部门ID',
          width: 128,
          key: 'DID'
        },
        {
          title: '部门名称',
          width: 128,
          key: 'DNAME'
        },
        {
          title: '员工状态',
          width: 128,
          key: 'USER_STATUS'
        },
        {
          title: '回聘申请',
          width: 128,
          key: 'RETURN_ASK'
        },
        {
          title: '原用人部门意见',
          width: 128,
          key: 'D_OLD_OPINION'
        },
        {
          title: '回聘部门意见',
          width: 128,
          key: 'D_NEW_OPINION'
        },
        {
          title: 'HR部门意见',
          width: 128,
          key: 'HR_OPINION'
        },
        {
          title: '操作人',
          width: 128,
          key: 'OPERATOR_ID'
        },
        {
          title: '操作时间',
          width: 128,
          key: 'OPER_DATE'
        },
        {
          title: '审批人',
          width: 128,
          key: 'APPROVER_ID'
        },
        {
          title: '审批时间',
          width: 128,
          key: 'APP_DATE'
        },
        {
          title: '备注',
          width: 128,
          key: 'REMARK'
        },
        {
          title: '职位ID',
          width: 128,
          key: 'JOB_ID'
        },
        {
          title: '年金起算日期',
          width: 128,
          key: 'ANNUITY_START_DATE'
        },
        {
          title: '老用户ID',
          width: 128,
          key: 'OLD_USER_ID'
        }
      ],
      dimissionColumns: [ // userQuit/page
        {
          title: '员工编号',
          width: 128,
          key: 'USER_ID'
        },
        {
          title: '员工姓名',
          width: 128,
          key: 'USER_NAME'
        },
        {
          title: 'ID',
          width: 128,
          key: 'ID'
        },
        {
          title: '公司',
          width: 128,
          key: 'CNAME'
        },
        {
          title: '部门',
          width: 128,
          key: 'DNAME'
        },
        {
          title: '申请时间',
          width: 128,
          key: 'ASK_FOR_DATE'
        },
        {
          title: '预计离职日期',
          width: 128,
          key: 'QUIT_DATE'
        },
        {
          title: '离退类型',
          width: 128,
          key: 'QUIT_TYPE'
        },
        {
          title: '离退原因',
          width: 128,
          key: 'REASONS'
        },
        {
          title: '备注',
          width: 128,
          key: 'REMARK'
        },
        {
          title: '操作人',
          width: 128,
          key: 'OPERATOR_ID'
        },
        {
          title: '操作时间',
          width: 128,
          key: 'OPER_DATE'
        },
        {
          title: '审批人',
          width: 128,
          key: 'APPROVER_ID'
        },
        {
          title: '审批时间',
          width: 128,
          key: 'APP_DATE'
        },
        {
          title: '公司ID',
          width: 128,
          key: 'CID'
        },
        {
          title: '部门ID',
          width: 128,
          key: 'DID'
        },
        {
          title: '离退去向',
          width: 128,
          key: 'QUIT_WHERE_TO_GO'
        },
        {
          title: '主客观原因',
          width: 128,
          key: 'ROOT_CAUSE'
        }
      ],
      fullMemberColumns: [ // userFormal/page
        {
          title: '员工编号',
          width: 128,
          key: 'USER_ID'
        },
        {
          title: '员工姓名',
          width: 128,
          key: 'USER_NAME'
        },
        {
          title: 'ID',
          width: 128,
          key: 'ID'
        },
        {
          title: '所属公司',
          width: 128,
          key: 'CNAME'
        },
        {
          title: '部门',
          width: 128,
          key: 'DNAME'
        },
        {
          title: '职位',
          width: 128,
          key: 'JOB_NAME'
        },
        {
          title: '入司时间',
          width: 128,
          key: 'STARTWORKDATE'
        },
        {
          title: '转正时间',
          width: 128,
          key: 'TO_BE_WORK_DATE'
        },
        {
          title: '员工状态',
          width: 128,
          key: 'USER_STATUS'
        },
        {
          title: '转正意见',
          width: 128,
          key: 'OPINION'
        },
        {
          title: '备注',
          width: 128,
          key: 'REMARK'
        },
        {
          title: '操作人',
          width: 128,
          key: 'OPERATOR_ID'
        },
        {
          title: '操作时间',
          width: 128,
          key: 'OPER_DATE'
        },
        {
          title: '审批人',
          width: 128,
          key: 'APPROVER_ID'
        },
        {
          title: '审批时间',
          width: 128,
          key: 'APP_DATE'
        },
        {
          title: '公司ID',
          width: 128,
          key: 'CID'
        },
        {
          title: '部门ID',
          width: 128,
          key: 'DID'
        },
        {
          title: '核签意见',
          width: 128,
          key: 'SIGN_THE_OPINION'
        }
      ],
      transferColumns: [ // userOrganization/page
        {
          title: '员工编号',
          width: 128,
          key: 'USER_ID'
        },
        {
          title: '员工姓名',
          width: 128,
          key: 'USER_NAME'
        },
        {
          title: 'ID',
          width: 128,
          key: 'ID'
        },
        {
          title: '所属公司',
          width: 128,
          key: 'CNAME'
        },
        {
          title: '部门',
          width: 128,
          key: 'DNAME'
        },
        {
          title: '职位',
          width: 128,
          key: 'JOB_NAME'
        },
        {
          title: '入司时间',
          width: 128,
          key: 'STARTWORKDATE'
        },
        {
          title: '转正时间',
          width: 128,
          key: 'TO_BE_WORK_DATE'
        },
        {
          title: '员工状态',
          width: 128,
          key: 'USER_STATUS'
        },
        {
          title: '转正意见',
          width: 128,
          key: 'OPINION'
        },
        {
          title: '备注',
          width: 128,
          key: 'REMARK'
        },
        {
          title: '操作人',
          width: 128,
          key: 'OPERATOR_ID'
        },
        {
          title: '操作时间',
          width: 128,
          key: 'OPER_DATE'
        },
        {
          title: '审批人',
          width: 128,
          key: 'APPROVER_ID'
        },
        {
          title: '审批时间',
          width: 128,
          key: 'APP_DATE'
        },
        {
          title: '公司ID',
          width: 128,
          key: 'CID'
        },
        {
          title: '部门ID',
          width: 128,
          key: 'DID'
        },
        {
          title: '职位ID',
          width: 128,
          key: 'JOB_ID'
        }
      ]
    }
  },
  created () {
    this.userAuditDetailColumns = this.jobChangeColumns
    let params = { pageNumber: 1, pageInfo: 10 }
    this.getUserAuditPage(params)
    this.getAuditTypeDictionaries()
    this.getAuditStatusDictionaries()
  },
  mounted () {
    this.getUserStatusPage()
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
      if (this.tabValue === '人员变动查看') {
        this.getUserAuditPage(params)
      }
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
    getUserStatusPage () {
      let params = { ...this.userQueryPageInfo, ...this.userAuditQueryData }
      switch (this.userAuditQueryData.auditTypeStatus) {
        case '异动':
          getJobChangeCum(params).then(res => {
            console.log(res)
            this.userTypeQueryData = res.list
            let { pageNumber, pageSize, totalPage, totalRow } = {...res}
            this.userQueryPageInfo = {
              pageNumber: pageNumber,
              pageSize: pageSize,
              totalPage: totalPage,
              totalRow: totalRow
            }
          })
          break
        case '回聘':
          getReEmployCum(params).then(res => {
            console.log(res)
            this.userTypeQueryData = res.list
            let { pageNumber, pageSize, totalPage, totalRow } = {...res}
            this.userQueryPageInfo = {
              pageNumber: pageNumber,
              pageSize: pageSize,
              totalPage: totalPage,
              totalRow: totalRow
            }
          })
          break
        case '离职':
          getDimissonCum(params).then(res => {
            console.log(res)
            this.userTypeQueryData = res.list
            let { pageNumber, pageSize, totalPage, totalRow } = {...res}
            this.userQueryPageInfo = {
              pageNumber: pageNumber,
              pageSize: pageSize,
              totalPage: totalPage,
              totalRow: totalRow
            }
          })
          break
        case '转正':
          getFullmemberCum(params).then(res => {
            console.log(res)
            this.userTypeQueryData = res.list
            let { pageNumber, pageSize, totalPage, totalRow } = {...res}
            this.userQueryPageInfo = {
              pageNumber: pageNumber,
              pageSize: pageSize,
              totalPage: totalPage,
              totalRow: totalRow
            }
          })
          break
        case '转编':
          getTransferCum(params).then(res => {
            console.log(res)
            this.userTypeQueryData = res.list
            let { pageNumber, pageSize, totalPage, totalRow } = {...res}
            this.userQueryPageInfo = {
              pageNumber: pageNumber,
              pageSize: pageSize,
              totalPage: totalPage,
              totalRow: totalRow
            }
          })
          break
      }
    },
    queryUserAudit () {
      let params = {pageNumber: 1, pageInfo: 10}
      params = Object.assign({}, params, this.userAuditQueryParams)
      this.getUserAuditPage(params)
    },
    selectUserAudit (data, index, event) {
      let auditType = data['auditType']
      let id = data['id']
      if (auditType === '员工岗位异动申请') {
        this.$router.push({name: 'jobChangeView', params: { entityId: id, id: id }})
      } else if (auditType === '员工转正申请') {
        this.$router.push({name: 'fullMemberView', params: { entityId: id, id: id }})
      } else if (auditType === '员工转编申请') {
        this.$router.push({name: 'transferView', params: { entityId: id, id: id }})
      } else if (auditType === '员工离退申请') {
        this.$router.push({name: 'dimissionView', params: { entityId: id, id: id }})
      } else if (auditType === '员工回聘申请') {
        this.$router.push({name: 'reEmployView', params: { entityId: id, id: id }})
      }
    },
    queryDetailAudit () {
      this.getUserStatusPage()
    }
  },
  components: {
    userIdQuery
  }
}
</script>

<style>
.userAuditView{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.userAuditView_title{
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

/* .userAuditView .ivu-input-group { width: 60% !important; } */
</style>
