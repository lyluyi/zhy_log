<template>
    <div class="userAuditView">
      <div class="userAuditView_title mb20">
        人员变动查看
      </div>
      <Tabs v-model="tabValue" :animated="false" style="minHeight: 500px;">
        <TabPane label="人员变动审核查看" name="人员变动审核查看">
          <div class="userAudit_inputGroup">
            <Divider orientation="left">人员变动审核查看</Divider>
            <Row :gutter="16" class="mb10">
              <Col class="col_flex" span="8">
                <Button class="wd mr10 tr" type="text">审批状态：</Button>
                <!--
                <Input placeholder="" v-model="userAuditQueryParams.auditStatus"  />
                -->
                <Select v-model="userAuditQueryParams.auditStatus" >
                    <Option v-for="item in UserAuditStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
              <Col class="col_flex" span="8">
                <Button class="wd mr10 tr" type="text" >申请类型：</Button>
                <Select v-model="userAuditQueryParams.auditType" >
                    <Option v-for="item in UserAuditType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
              <!-- <Col class="col_flex" span="8">
                <Button class="wd mr10 tr" type="text" >用户名：</Button>
                <Input placeholder="" search enter-button @on-search="queryUser" v-model="userAuditQueryParams.userName" readonly />
              </Col> -->
              <Col class="col_flex" span="8">
                <Button class="wd mr10 tr" type="text" >员工编号：</Button>
                <Input placeholder="" enter-button v-model="userAuditQueryParams.userId" />
              </Col>
            </Row>
            <Row :gutter="16" class="mb10">
              <Col class="col_flex" span="8">
                <Button class="wd mr10 tr" type="text" >员工姓名：</Button>
                <Input placeholder="" enter-button v-model="userAuditQueryParams.userName" />
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
                <Select v-model="userAuditQueryData.auditTypeStatus" @on-change="changeHandleUserAudit" >
                  <Option v-for="item in UserAuditQueryType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <div v-show="jobChangeFlag">
              <!-- 异动 -->
              <Divider class="subDiver" orientation="center" style="">异动人员变动查看</Divider>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >姓名：</Button>
                  <Input placeholder="" enter-button v-model="jobChangeParams.userName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >申请时间：</Button>
                  <Date-picker type="daterange" format="yyyy-MM-dd" @on-change="createTimeRangeChange"  />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">原公司：</Button>
                  <Input placeholder="" v-model="jobChangeParams.oldCname" search enter-button readonly @on-search="queryCompany(1)" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">原部门：</Button>
                  <Input placeholder="" v-model="jobChangeParams.oldDname" search enter-button readonly @on-search="queryDepartment(1)" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">新公司：</Button>
                  <Input placeholder="" v-model="jobChangeParams.newCname" search enter-button readonly @on-search="queryCompany(2)" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">新部门：</Button>
                  <Input placeholder="" v-model="jobChangeParams.newDname" search enter-button readonly @on-search="queryDepartment(2)" />
                </Col>
              </Row>
            </div>
            <div v-show="fullMemberFlag">
              <!-- 转正 -->
              <Divider class="subDiver" orientation="center" style="">转正人员变动查看</Divider>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >姓名：</Button>
                  <Input placeholder="" enter-button v-model="fullMemberParams.userName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >申请时间：</Button>
                  <Date-picker type="daterange" format="yyyy-MM-dd" @on-change="createTimeRangeChange"  />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">公司：</Button>
                  <Input placeholder="" v-model="fullMemberParams.cname" search enter-button readonly @on-search="queryCompany(3)" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">部门：</Button>
                  <Input placeholder="" v-model="fullMemberParams.dname" search enter-button readonly @on-search="queryDepartment(3)" />
                </Col>
              </Row>
            </div>
            <div v-show="transferFlag">
              <!-- 转编 -->
              <Divider class="subDiver" orientation="center" style="">转编人员变动查看</Divider>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >姓名：</Button>
                  <Input placeholder="" enter-button v-model="transferParams.userName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >申请时间：</Button>
                  <Date-picker type="daterange" format="yyyy-MM-dd" @on-change="createTimeRangeChange"  />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">公司：</Button>
                  <Input placeholder="" v-model="transferParams.cname" search enter-button readonly @on-search="queryCompany(4)" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">部门：</Button>
                  <Input placeholder="" v-model="transferParams.dname" search enter-button readonly @on-search="queryDepartment(4)" />
                </Col>
              </Row>
            </div>
            <div v-show="dimissionFlag">
              <!-- 离退 -->
              <Divider class="subDiver" orientation="center" style="">离退人员变动查看</Divider>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >姓名：</Button>
                  <Input placeholder="" enter-button v-model="dimissionParams.userName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >申请时间：</Button>
                  <Date-picker type="daterange" format="yyyy-MM-dd" @on-change="createTimeRangeChange"  />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">公司：</Button>
                  <Input placeholder="" v-model="dimissionParams.cname" search enter-button readonly @on-search="queryCompany(5)" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">部门：</Button>
                  <Input placeholder="" v-model="dimissionParams.dname" search enter-button readonly @on-search="queryDepartment(5)" />
                </Col>
              </Row>
            </div>
            <div v-show="reEmployFlag">
              <!-- 回聘 -->
              <Divider class="subDiver" orientation="center" style="">回聘人员变动查看</Divider>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >姓名：</Button>
                  <Input placeholder="" enter-button v-model="reEmployParams.userName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text" >申请时间：</Button>
                  <Date-picker type="daterange" format="yyyy-MM-dd" @on-change="createTimeRangeChange"  />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">原公司：</Button>
                  <Input placeholder="" v-model="reEmployParams.oldCname" search enter-button readonly @on-search="queryCompany(6)" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">原部门：</Button>
                  <Input placeholder="" v-model="reEmployParams.oldDname" search enter-button readonly @on-search="queryDepartment(6)" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">新公司：</Button>
                  <Input placeholder="" v-model="reEmployParams.newCname" search enter-button readonly @on-search="queryCompany(7)" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">新部门：</Button>
                  <Input placeholder="" v-model="reEmployParams.newDname" search enter-button readonly @on-search="queryDepartment(7)" />
                </Col>
              </Row>
            </div>
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
      <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="upCid"></departmentQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
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

import departmentQuery from '@/common/departmentQuery'
import companyQuery from '@/common/companyQuery'

import getDic from '@/server/apiDic'
import userIdQuery from '@/common/userIdQuery'
import qs from 'qs'

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
        auditStatus: '审批中',
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
      UserAuditStatus: [
        { label: '审批中', value: '审批中' },
        { label: '审批不通过', value: '审批不通过' }
      ],
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
      jobChangeParams: {
        userName: '',
        userId: '',
        oldCname: '',
        oldCid: '',
        oldDname: '',
        oldDid: '',
        newCname: '',
        newCid: '',
        newDname: '',
        newDid: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      reEmployParams: {
        userName: '',
        userId: '',
        cname: '',
        cid: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      dimissionParams: {
        userName: '',
        userId: '',
        cname: '',
        cid: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      fullMemberParams: {
        userName: '',
        userId: '',
        cname: '',
        cid: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      transferParams: {
        userName: '',
        userId: '',
        oldCname: '',
        oldCid: '',
        oldDname: '',
        oldDid: '',
        newCname: '',
        newCid: '',
        newDname: '',
        newDid: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      jobChangeFlag: true,
      fullMemberFlag: false,
      dimissionFlag: false,
      transferFlag: false,
      reEmployFlag: false,
      comTypeVaule: 1,
      depTypeValue: 1,
      upCid: '',
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
    let params = { ...this.userAuditQueryParams, ...this.userAuditPageInfo }
    this.$axios.post('userAudit/page', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log(params)
      this.userAuditData = res.data.list
      let { pageNumber, pageSize, totalPage, totalRow } = {...res.data, ...this.userAuditQueryData}
      this.userAuditPageInfo = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalPage: totalPage,
        totalRow: totalRow
      }
    }).catch(err => {
      this.$Message.warning('数据刷新异常！')
      throw err
    })
    this.getAuditTypeDictionaries()
  },
  mounted () {
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
    queryCompany (num) { // 公司信息查询
      this.flag1 = true
      this.model1 = true
      this.comTypeVaule = num
    },
    getCompany (item) {
      if (this.comTypeVaule === 1) {
        this.jobChangeParams.oldCname = item.cname
        this.jobChangeParams.oldCid = item.cid
        this.jobChangeParams.oldDname = ''
        this.jobChangeParams.oldDid = ''
      }
      if (this.comTypeVaule === 2) {
        this.jobChangeParams.newCname = item.cname
        this.jobChangeParams.newCid = item.cid
        this.jobChangeParams.newDname = ''
        this.jobChangeParams.newDid = ''
      }
      if (this.comTypeVaule === 3) {
        this.fullMemberParams.cname = item.cname
        this.fullMemberParams.cid = item.cid
        this.fullMemberParams.dname = ''
        this.fullMemberParams.did = ''
      }
      if (this.comTypeVaule === 4) {
        this.transferParams.cname = item.cname
        this.transferParams.cid = item.cid
        this.transferParams.dname = ''
        this.transferParams.did = ''
      }
      if (this.comTypeVaule === 5) {
        this.dimissionParams.cname = item.cname
        this.dimissionParams.cid = item.cid
        this.dimissionParams.dname = ''
        this.dimissionParams.did = ''
      }
      if (this.comTypeVaule === 6) {
        this.reEmployParams.oldCname = item.cname
        this.reEmployParams.oldCid = item.cid
        this.reEmployParams.oldDname = ''
        this.reEmployParams.oldDid = ''
      }
      if (this.comTypeVaule === 7) {
        this.reEmployParams.newCname = item.cname
        this.reEmployParams.newCid = item.cid
        this.reEmployParams.newDname = ''
        this.reEmployParams.newDid = ''
      }
      this.upCid = item.cid
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment (num) { // 部门信息查询
      this.depTypeVaule = num
      if (this.comTypeVaule === 1 && this.jobChangeParams.oldCname === '') {
        this.$Message.info({ content: '请先输入原公司' })
      } else if (this.comTypeVaule === 2 && this.jobChangeParams.newCname === '') {
        this.$Message.info({ content: '请先输入新公司' })
      } else if (this.comTypeVaule === 3 && this.fullMemberParams.cname === '') {
        this.$Message.info({ content: '请先输入公司' })
      } else if (this.comTypeVaule === 4 && this.transferParams.cname === '') {
        this.$Message.info({ content: '请先输入公司' })
      } else if (this.comTypeVaule === 5 && this.dimissionParams.cname === '') {
        this.$Message.info({ content: '请先输入公司' })
      } else if (this.comTypeVaule === 6 && this.reEmployParams.oldCname === '') {
        this.$Message.info({ content: '请先输入原公司' })
      } else if (this.comTypeVaule === 7 && this.reEmployParams.newCname === '') {
        this.$Message.info({ content: '请先输入新公司' })
      } else {
        if (this.comTypeVaule === num) {
          this.flag2 = true
          this.model2 = true
        } else {
          this.$Message.info({ content: '请依次选择公司并匹配部门！' })
        }
      }
    },
    getDepartment (item) {
      // console.log(item)
      if (this.depTypeVaule === 1 && this.comTypeVaule === 1) {
        this.jobChangeParams.oldDname = item.dname
        this.jobChangeParams.oldDid = item.did
      }
      if (this.depTypeVaule === 2 && this.comTypeVaule === 2) {
        this.jobChangeParams.newDname = item.dname
        this.jobChangeParams.newDid = item.did
      }
      if (this.depTypeVaule === 3 && this.comTypeVaule === 3) {
        this.fullMemberParams.dname = item.dname
        this.fullMemberParams.did = item.did
      }
      if (this.depTypeVaule === 4 && this.comTypeVaule === 4) {
        this.transferParams.dname = item.dname
        this.transferParams.did = item.did
      }
      if (this.depTypeVaule === 5 && this.comTypeVaule === 5) {
        this.dimissionParams.dname = item.dname
        this.dimissionParams.did = item.did
      }
      if (this.depTypeVaule === 6 && this.comTypeVaule === 6) {
        this.reEmployParams.oldDname = item.dname
        this.reEmployParams.oldDid = item.did
      }
      if (this.depTypeVaule === 7 && this.comTypeVaule === 7) {
        this.reEmployParams.newDname = item.dname
        this.reEmployParams.newDid = item.did
      }
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
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
    changeHandleUserAudit (val) {
      switch (val) {
        case '异动':
          this.jobChangeFlag = true
          this.transferFlag = false
          this.fullMemberFlag = false
          this.reEmployFlag = false
          this.dimissionFlag = false
          break
        case '转正':
          this.jobChangeFlag = false
          this.transferFlag = false
          this.fullMemberFlag = true
          this.reEmployFlag = false
          this.dimissionFlag = false
          break
        case '转编':
          this.jobChangeFlag = false
          this.transferFlag = true
          this.fullMemberFlag = false
          this.reEmployFlag = false
          this.dimissionFlag = false
          break
        case '离退':
          this.jobChangeFlag = false
          this.transferFlag = false
          this.fullMemberFlag = false
          this.reEmployFlag = false
          this.dimissionFlag = true
          break
        case '离职':
          this.jobChangeFlag = false
          this.transferFlag = false
          this.fullMemberFlag = false
          this.reEmployFlag = false
          this.dimissionFlag = true
          break
        case '回聘':
          this.jobChangeFlag = false
          this.transferFlag = false
          this.fullMemberFlag = false
          this.reEmployFlag = true
          this.dimissionFlag = false
          break
      }
    },
    changeUserAuditPageNumber (num) {
      if (this.tabValue === '人员变动审核查看') {
        let params = {pageNumber: num, pageInfo: 10, ...this.userAuditQueryParams}
        this.getUserAuditPage(params)
      } else {
        let params = { pageNumber: num, pageInfo: 10 }
        if (this.jobChangeFlag === true) {
          params = {params, ...this.jobChangeParams}
          this.getUserStatusPage(params)
        }
        if (this.fullMemberFlag === true) {
          params = {params, ...this.fullMemberParams}
          this.getUserStatusPage(params)
        }
        if (this.transferFlag === true) {
          params = {params, ...this.transferParams}
          this.getUserStatusPage(params)
        }
        if (this.dimissionFlag === true) {
          params = {params, ...this.dimissionParams}
          this.getUserStatusPage(params)
        }
        if (this.reEmployFlag === true) {
          params = {params, ...this.reEmployParams}
          this.getUserStatusPage(params)
        }
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
    getUserStatusPage (params) {
      switch (this.userAuditQueryData.auditTypeStatus) {
        case '异动':
          this.userAuditDetailColumns = this.jobChangeColumns
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
          this.userAuditDetailColumns = this.reEmployColumns
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
        case '离退':
          this.userAuditDetailColumns = this.dimissionColumns
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
          this.userAuditDetailColumns = this.fullMemberColumns
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
          this.userAuditDetailColumns = this.transferColumns
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
      if (this.jobChangeFlag === true) {
        let params = {...this.pageInfo, ...this.jobChangeParams}
        this.getUserStatusPage(params)
      }
      if (this.fullMemberFlag === true) {
        let params = {...this.pageInfo, ...this.fullMemberParams}
        this.getUserStatusPage(params)
      }
      if (this.transferFlag === true) {
        let params = {...this.pageInfo, ...this.transferParams}
        this.getUserStatusPage(params)
      }
      if (this.dimissionFlag === true) {
        let params = {...this.pageInfo, ...this.dimissionParams}
        this.getUserStatusPage(params)
      }
      if (this.reEmployFlag === true) {
        let params = {...this.pageInfo, ...this.reEmployParams}
        this.getUserStatusPage(params)
      }
    },
    createTimeRangeChange (createTimeRange) {
      if (this.userAuditQueryData.auditTypeStatus === '异动') {
        this.jobChangeParams.createTimeStart = createTimeRange[0] + ' 00:00:00'
        this.jobChangeParams.createTimeEnd = createTimeRange[1] + ' 23:59:59'
      }
      if (this.userAuditQueryData.auditTypeStatus === '转正') {
        this.fullMemberParams.createTimeStart = createTimeRange[0] + ' 00:00:00'
        this.fullMemberParams.createTimeEnd = createTimeRange[1] + ' 23:59:59'
      }
      if (this.userAuditQueryData.auditTypeStatus === '转编') {
        this.transferParams.createTimeStart = createTimeRange[0] + ' 00:00:00'
        this.transferParams.createTimeEnd = createTimeRange[1] + ' 23:59:59'
      }
      if (this.userAuditQueryData.auditTypeStatus === '离退') {
        this.dimissionParams.createTimeStart = createTimeRange[0] + ' 00:00:00'
        this.dimissionParams.createTimeEnd = createTimeRange[1] + ' 23:59:59'
      }
      if (this.userAuditQueryData.auditTypeStatus === '回聘') {
        this.reEmployParams.createTimeStart = createTimeRange[0] + ' 00:00:00'
        this.reEmployParams.createTimeEnd = createTimeRange[1] + ' 23:59:59'
      }
      if (this.userAuditQueryData.auditTypeStatus === '异动') {
        this.jobChangeParams.createTimeStart = createTimeRange[0] + ' 00:00:00'
        this.jobChangeParams.createTimeEnd = createTimeRange[1] + ' 23:59:59'
      }
    }
  },
  components: {
    userIdQuery,
    departmentQuery,
    companyQuery
  }
}
</script>

<style>
.userAuditView {
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 500px;
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
.subDiver .ivu-divider-inner-text {
  color: #515a6e !important;
  font-size: 14px !important;
  font-weight: bolder !important;
}

/* .userAuditView .ivu-input-group { width: 60% !important; } */
</style>
