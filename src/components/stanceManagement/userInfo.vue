<template>
  <div class="userInfo">
    <div class="userInfo_title mb20">
      <span>个人信息查询</span>
    </div>
    <div class="structWrap pl10 pr10">
      <div v-show="checkType">
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <!-- <Select v-model="highCheckTypeValue"  placement="bottom">
              <Option v-for="item in baseInfo" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select> -->
            <Button class="wd mr10 tc ml20 " type="primary" style="margin-top: -2px;" @click="checkType =! checkType">高级信息查询</Button>
            <Button class="wd mr10 tc ml20 " type="success" style="margin-top: -2px;" @click="exportTable"><Icon type="ios-download-outline" style="vertical-align: baseline;"></Icon>导出数据</Button>
          </Col>
        </Row>
        <Divider orientation="left">
        </Divider>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">姓名：</Button>
            <Input type="text" placeholder="" v-model="lowCheck.userName" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">公司：</Button>
            <Input type="text" placeholder="" v-model="lowCheck.cname" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">部门：</Button>
            <Input type="text" placeholder="" v-model="lowCheck.dname" />
          </Col>
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">员工状态：</Button>
            <Select v-model="lowCheck.userStatus" filterable>
              <Option v-for="item in userStatusType" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div v-show="!checkType">
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <!-- <Select v-model="highCheckTypeValue"  placement="bottoWWm">
              <Option v-for="item in baseInfo" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select> -->
            <Button class="wd mr10 tc ml20 " type="primary" style="margin-top: -2px;" @click="checkType =! checkType">普通信息查询</Button>
            <Button class="wd mr10 tc ml20 " type="success" style="margin-top: -2px;" @click="exportTable"><Icon type="ios-download-outline" style="vertical-align: baseline;"></Icon>导出数据</Button>
          </Col>
        </Row>
        <Divider orientation="left">
        </Divider>
        <Row :gutter="16" class="mb20">
          <Col class="col_flex" span="8"  offset="8">
            <Select v-model="highCheckTypeValue.value" filterable :label-in-value="true"  placement="bottom" @on-change="selectHighcheckType">
              <Option v-for="item in baseInfo" :value="item.key" :key="item.value">{{ item.value }}</Option>
            </Select>
            <Button class="wd mr10 tr ml20" type="primary" style="margin-top: -2px;" @click="addHighCheckType">添加高级查询项</Button>
          </Col>
        </Row>
        <Row class="mb10" justify="space-around" type="flex" v-for="(item, index) in highCheck.queryItem" :key="index">
          <Col class="col_flex">
            <Button class="tc" type="error" @click="removeItem(index)" >查询项{{ index + 1 }}：</Button>
          </Col>
          <Col class="col_flex" span="4">
            <Button class="mr10 tc" type="primary">查询字段</Button>
            <Input type="text" placeholder="" readonly v-model="item.des"/>
          </Col>
          <Col class="col_flex" span="4">
            <Button class="mr10 tc" type="primary">查询条件</Button>
            <!--
              {name:'userName', linkOption:'or', option:'like', value1:'张三', value2:'张三'}
             -->
            <Select v-model="item.option" style="width:150px">
              <Option v-for="itemA in  checkCondition" :value="itemA.key" :key="itemA.key">{{ itemA.value }}</Option>
            </Select>
          </Col>
            <Col v-if="item.name === 'cname'" class="col_flex" span="8">
              <Button class="mr10 tc" type="primary">查询范围</Button>
              <Input search enter-button placeholder="111" v-model="item.value1" @on-search="queryCompany" />
            </Col>
            <Col v-if="item.name === 'dname'" class="col_flex" span="8">
              <Button class="mr10 tc" type="primary">查询范围</Button>
              <Input search enter-button placeholder="222" v-model="item.value1"  @on-search="queryDepartment" />
            </Col>
            <Col v-if="((item.name !== 'cname') && (item.name !=='dname'))" class="col_flex" span="8">
              <Button class="mr10 tc" type="primary">查询范围</Button>
              <Input type="text" placeholder="请输入" v-model="item.value1" v-if="!item.timeType" />
              <DatePicker type="date" placeholder="Select date" v-if="item.timeType" v-model="item.value1"></DatePicker>
              <Input type="text" placeholder="请输入" v-model="item.value2" v-if="!item.timeType" />
              <DatePicker type="date" placeholder="Select date" v-if="item.timeType" v-model="item.value2"></DatePicker>
            </Col>
          <!-- <Col class="col_flex" span="4">
            <Button class="mr10 tc" type="primary">查询范围：</Button>
            <Input type="text" placeholder="请输入" v-model="item.value2" v-if="!item.timeType" />
            <DatePicker type="date" placeholder="Select date" v-if="item.timeType" v-model="item.value2"></DatePicker>
          </Col> -->
          <Col class="col_flex" span="4">
            <Button class="mr10 tc" type="primary">逻辑条件</Button>
            <Select v-model="item.linkOption"  style="width:150px">
              <Option v-for="itemB in  logicCondition" :value="itemB.key" :key="itemB.key">{{ itemB.value }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="queryInfo(type = (checkType ? 'lowCheck' : 'highCheck'), num = null)">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns2" :sortable="true" :highlight-row="true" :data="data4"></Table>
      <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
      <Divider orientation="left">
      </Divider>
      <div class="mb20 col_flex">
        <Select v-model="infoRecordTypeValue.value" @on-change="infoRecordChange" placement="bottom" style="width:150px">
          <Option v-for="item in infoRecordType" :value="item.value" :key="item.key">{{ item.value }}</Option>
        </Select>
      </div>
      <!-- 删除项弹出层 -->
      <Modal v-model="removeModalType" width="120">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center; font-size:14px;font-weight:bold;">
          <p>此查询项删除后，请重新进行结果查询！</p>
        </div>
        <div slot="footer">
          <Button type="error" long  @click="delItem">删除</Button>
        </div>
      </Modal>
      <Table stripe :columns="columns1" :data="data1" class="mt20" :highlight-row="true" ></Table>
      <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
      <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2"></departmentQuery>
    </div>
  </div>
</template>
<script>

import companyQuery from '@/common/companyQuery.vue'
import departmentQuery from '@/common/departmentQuery.vue'

import { getInfoCheck, getSubCheck } from '@/server/api.js'
import getDic from '@/server/apiDic.js'

export default {
  data () {
    return {
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      removeModalType: false,
      removeIndex: false,
      checkType: true,
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      columns2: [
        {
          title: '姓名',
          key: 'userName',
          width: 100,
          fixed: 'left'
        },
        {
          title: '工号',
          key: 'userId',
          width: 100,
          fixed: 'left'
        },
        {
          title: '公司',
          width: 200,
          key: 'cname'
        },
        {
          title: '部门',
          width: 200,
          key: 'dname'
        },
        {
          title: '性别',
          width: 200,
          key: 'sex'
        },
        {
          title: '出生日期',
          width: 200,
          key: 'birthdateView'
        },
        {
          title: '年龄',
          width: 200,
          key: 'age'
        },
        {
          title: '学历',
          width: 200,
          key: 'education'
        },
        {
          title: '主修专业',
          width: 200,
          key: 'major'
        },
        {
          title: '入司时间',
          width: 200,
          key: 'workTypeView'
        },
        {
          title: '员工属性',
          width: 200,
          key: 'userType'
        },
        {
          title: '直/间接',
          width: 200,
          key: 'hrType1'
        },
        {
          title: '所属区域',
          width: 200,
          key: 'area'
        },
        {
          title: '转正日期',
          width: 200,
          key: 'beWorkDateView'
        },
        {
          title: '直接主管',
          width: 200,
          key: 'upHeader'
        },
        {
          title: '职位名称',
          width: 200,
          key: 'jobName'
        },
        {
          title: '入司日期',
          width: 200,
          key: 'startworkdataView'
        },
        {
          title: '公司工龄',
          width: 200,
          key: 'workYears'
        },
        {
          title: '是否负责人',
          width: 200,
          key: 'isHeader'
        },
        {
          title: '联系电话',
          width: 200,
          key: 'telephone'
        },
        {
          title: '手机号码',
          width: 200,
          key: 'mobilphone'
        },
        {
          title: '人员来源',
          width: 200,
          key: 'source'
        },
        {
          title: '外服年限',
          width: 200,
          key: 'worktypeid'
        },
        {
          title: '婚姻状况',
          width: 200,
          key: 'marriageid'
        },
        {
          title: '民族',
          width: 200,
          key: 'nationid'
        },
        {
          title: '政治面貌',
          width: 200,
          key: 'politics'
        },
        {
          title: '籍贯',
          width: 200,
          key: 'nativeplace'
        },
        {
          title: '户口所在',
          width: 200,
          key: 'address'
        },
        {
          title: '邮政编码',
          width: 200,
          key: 'postalcode'
        },
        {
          title: '目前住址',
          width: 200,
          key: 'location'
        },
        {
          title: 'E-mail',
          width: 200,
          key: 'email'
        },
        {
          title: '员工属性',
          width: 200,
          key: 'userType'
        },
        {
          title: '内部推荐员工',
          width: 200,
          key: 'inneruser'
        },
        {
          title: '证件类型',
          width: 200,
          key: 'idCardType'
        },
        {
          title: '证件号码',
          width: 200,
          key: 'idcardno'
        },
        {
          title: '证件有效截止日期',
          width: 200,
          key: 'idcardkindidView'
        },
        {
          title: '是否编制内',
          width: 200,
          key: 'isOrganization'
        },
        {
          title: '户口性质',
          width: 200,
          key: 'hukouType'
        },
        {
          title: '是否储备人才',
          width: 200,
          key: 'isreserveid'
        },
        {
          title: '是否为工会成员',
          width: 200,
          key: 'isLabour'
        },
        {
          title: '最后工作日',
          width: 200,
          key: 'lastworkdateView'
        },
        {
          title: '预计转正日期',
          width: 200,
          key: 'toBeWorkDateView'
        },
        {
          title: '一级部门',
          width: 200,
          key: 'isDept01'
        },
        {
          title: '部门层级',
          width: 200,
          key: 'dLevle'
        },
        {
          title: '计工龄开始日期',
          width: 200,
          key: 'beginWorkDateView'
        },
        {
          title: '备注',
          width: 200,
          key: 'remark'
        },
        {
          title: '员工状态',
          width: 200,
          key: 'userStatus'
        },
        {
          title: '健康证到期日',
          width: 200,
          key: 'healhDateView'
        },
        {
          title: '档案编号',
          width: 200,
          key: 'archivesId'
        },
        {
          title: '社保帐号',
          width: 200,
          key: 'shebaoId'
        },
        {
          title: '公积金账号',
          width: 200,
          key: 'fundid'
        },
        {
          title: '职等',
          width: 200,
          key: 'jobLevle'
        },
        {
          title: '内部推荐人部门',
          width: 200,
          key: 'inneruserdept'
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(params.row.userId) // 员工ID
                    this.querySubInfo({ userId: params.row.userId })
                  }
                }
              }, '查看子表'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '查看详情'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '编辑')
            ])
          }
        }
      ],
      data4: [],
      highCheck: {
        page: 1,
        pageSize: 10,
        queryItem: [
          // { name: 'userName', option: 'like', value1: '王晶', value2: '', linkOption: 'or', timeType: false, des: '用户名' }
          // {name:'age', option:'eq', value1:'30', value2:'20', linkOption:'or', timeType:false }
        ]
      },
      lowCheck: {
        userName: '',
        cname: '',
        dname: '',
        userStatus: ''
      },
      userStatusType: [],
      checkCname: '',
      checkDname: '',
      highCheckTypeValue: {},
      exportHighData: {},
      isCheckValueTime: false,
      timeType: [
        'birthdate',
        'workType',
        'beWorkDate',
        'startworkdata',
        'idcardkindid',
        'lastworkdate',
        'toBeWorkDate',
        'healhDate',
        'beginWorkDate'
      ], // 时间类型字段
      baseInfo: [
        { key: 'userName', value: '姓名' },
        { key: 'cname', value: '公司' },
        { key: 'dname', value: '部门' },
        { key: 'sex', value: '性别' },
        { key: 'birthdate', value: '出生日期' },
        { key: 'age', value: '年龄' },
        { key: 'education', value: '学历' },
        { key: 'major', value: '主修专业' },
        { key: 'workType', value: '入司时间' },
        { key: 'userType', value: '员工属性' },
        { key: 'hrType1', value: '直/间接' },
        { key: 'area', value: '所属区域' },
        { key: 'beWorkDate', value: '转正日期' },
        { key: 'upHeader', value: '直接主管' },
        { key: 'jobName', value: '职位名称' },
        { key: 'startworkdata', value: '入司日期' },
        { key: 'workYears', value: '公司工龄' },
        { key: 'isHeader', value: '是否负责人' },
        { key: 'telephone', value: '联系电话' },
        { key: 'mobilphone', value: '手机号码' },
        { key: 'source', value: '人员来源' },
        { key: 'worktypeid', value: '外服年限' }, // ???
        { key: 'marriageid', value: '婚姻状况' },
        { key: 'nationid', value: '民族' },
        { key: 'politics', value: '政治面貌' },
        { key: 'nativeplace', value: '籍贯' },
        { key: 'address', value: '户口所在' },
        { key: 'postalcode', value: '邮政编码' },
        { key: 'location', value: '目前住址' },
        { key: 'email', value: 'E-mail' },
        { key: 'inneruser', value: '内部推荐员工' },
        { key: 'idCardType', value: '证件类型' },
        { key: 'idcardno', value: '证件号码' },
        { key: 'idcardkindid', value: '证件有效截止日期' },
        { key: 'isOrganization', value: '是否编制内' },
        { key: 'hukouType', value: '户口性质' },
        { key: 'isreserveid', value: '是否储备人才' },
        { key: 'isLabour', value: '是否为工会成员' },
        { key: 'lastworkdate', value: '最后工作日' },
        { key: 'toBeWorkDate', value: '预计转正日期' },
        { key: 'isDept01', value: '一级部门' },
        { key: 'beginWorkDate', value: '计工龄开始日期' },
        { key: 'remark', value: '备注' },
        { key: 'userStatus', value: '员工状态' },
        { key: 'healhDate', value: '健康证到期日' },
        { key: 'archivesId', value: '档案编号' },
        { key: 'shebaoId', value: '社保帐号' },
        { key: 'fundid', value: '公积金账号' },
        { key: 'jobLevle', value: '职等' },
        { key: 'inneruserdept', value: '内部推荐人部门' }
      ],
      checkCondition: [
        { key: 'eq', value: '等于' },
        { key: 'notEq', value: '不等于' },
        { key: 'gt', value: '大于' },
        { key: 'lt', value: '小于' },
        { key: 'gtOReq', value: '大于等于' },
        { key: 'ltOReq', value: '小于等于' },
        { key: 'like', value: '包含' },
        { key: 'between', value: '两者值之间' }
      ],
      logicConditionValue: '',
      logicCondition: [
        { key: 'notEq', value: '不等于' },
        { key: 'and', value: '并且' },
        { key: 'or', value: '或者' }
      ],
      queryList: {
      },
      infoRecordTypeValue: {key: 'userWorkhis', value: '工作简历'}, // 信息录入select option value
      infoRecordType: [ // 性别
        { value: '工作简历', label: 'userWorkhis' },
        { value: '培训经历', label: 'userTrainhis' },
        { value: '教育背景', label: 'userStudyhis' },
        { value: '家庭关系', label: 'userFamily' },
        { value: '语言情况', label: 'userLanguage' },
        { value: '紧急联系人', label: 'userUrgent' },
        { value: '职称信息', label: 'userJobinfo' }
      ],
      userWorkhis: [],
      userTrainhis: [],
      userStudyhis: [],
      userFamily: [],
      userLanguage: [],
      userUrgent: [],
      userJobinfo: [],
      infoRecordTableObj: {
        '工作简历': [['开始日期', 'beginDateView'], ['结束日期', 'endDateView'], ['单位名称', 'company'], ['单位性质', 'comType'], ['担任职位', 'jobName'], ['薪资情况', 'wages'], ['离职原因', 'quitRes']],
        '培训经历': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['培训机构', 'trainName'], ['培训主题', 'trainTheme'], ['培训课程', 'trainContent'], ['证书有效期', 'certTerm'], ['备注', 'remark']],
        '教育背景': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['院校名称', 'schoolName'], ['院校性质', 'schoolType'], ['主修专业', 'major'], ['毕业类型', 'graduationType'], ['学历情况', 'education'], ['学制', 'years'], ['学位', 'educationDgree'], ['职务', 'jobName'], ['证明人', 'witness'], ['备注', 'remark']],
        '家庭关系': [['家属姓名', 'sibName'], ['与己关系', 'relationship'], ['所在单位', 'cname'], ['出生日期', 'birthdate'], ['担任职位', 'jobName'], ['电话号码', 'phone'], ['备注', 'remark']],
        '语言情况': [['语种', 'languageType'], ['听力能力', 'lisnten'], ['会话能力', 'talk'], ['书写能力', 'write'], ['等级状态', 'levleStatus'], ['证书级别', 'levle'], ['备注', 'remark']],
        '紧急联系人': [['联系人', 'urgentName'], ['与己关系', 'urgentType'], ['联系电话', 'phone'], ['E-mail', 'email'], ['邮政编码', 'code'], ['联系地址', 'addr'], ['备注', 'remark']],
        '职称信息': [['职称信息', 'jobinfo'], ['获得日期', 'getDate'], ['所在学校', 'company'], ['职位描述', 'description'], ['备注', 'remark']]
      },
      columns1: [],
      data1: []
    }
  },
  created () {
    this.infoRecordChange(this.infoRecordTypeValue.value)
    getDic('userStatus').then((res) => {
      this.userStatusType = res.data
    })
  },
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      console.log(item)
      this.checkCname = item.cname
      this.highCheck.queryItem.forEach((el) => {
        if (el.name === 'cname') {
          el.value1 = this.checkCname
          console.log(el)
          return el
        }
        if (el.name === 'dname') {
          el.value1 = this.checkDname
        }
      })
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      this.flag2 = true
      this.model2 = true
    },
    getDepartment (item) {
      console.log(item)
      this.checkDname = item.dname
      this.highCheck.queryItem.forEach((el) => {
        if (el.name === 'cname') {
          el.value1 = this.checkCname
          console.log(el)
          return el
        }
        if (el.name === 'dname') {
          el.value1 = this.checkDname
        }
      })
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    selectHighcheckType (item) { // 判断是否为时间类字段
      console.log(item)
      this.highCheckTypeValue = item
      let length = this.timeType.length
      for (let i = 0; i < length; i++) {
        if (item.value === this.timeType[i]) {
          this.isCheckValueTime = true
          return
        } else {
          this.isCheckValueTime = false
          return
        }
      }
    },
    addHighCheckType () { // 添加查询项
      let item = { name: this.highCheckTypeValue.value, option: '', value1: '', value2: '', linkOption: '', timeType: this.isCheckValueTime, des: this.highCheckTypeValue.label }
      // let length = this.highCheck.queryItem.length
      // for (let i = 0; i < length; i++) {
      //   if (item.name === this.highCheck.queryItem[i].name) {
      //     return
      //   }
      // }
      this.highCheck.queryItem.push(item)
    },
    // queryInfo (num) { // 信息查询
    // console.log(num)
    // if (this.checkType) {
    //   num ? this.lowCheck.pageNumber = this.pageInfo.pageNumber : this.lowCheck.pageNumber = 1
    //   this.exportHighData = this.lowCheck // 导出数据
    //   let params = this.lowCheck
    //   getLowCheck(params).then((res) => {
    //     console.log(res)
    //     this.data4 = res.list
    //     return Promise.resolve(res) // 已经同步了……
    //   }).then((result) => {
    //     let pageNum = null
    //     let { pageNumber, pageSize, totalPage, totalRow } = {...result}
    //     if (Number.isInteger(num)) {
    //       pageNum = pageNumber
    //     } else {
    //       pageNum = 1
    //     }
    //     this.pageInfo = {
    //       pageNumber: pageNum,
    //       pageSize: pageSize,
    //       totalPage: totalPage,
    //       totalRow: totalRow
    //     }
    //     this.lowCheck.pageNumber = pageNum
    //   })
    // } else {
    //   num ? this.lowCheck.pageNumber = this.pageInfo.pageNumber : this.lowCheck.pageNumber = 1
    //   this.exportHighData = this.highCheck
    //   let params = this.highCheck
    //   getHighCheck(params).then((res) => {
    //     this.data4 = res.list
    //     return Promise.resolve(res)
    //   }).then((result) => {
    //     let pageNum = null
    //     let { pageNumber, pageSize, totalPage, totalRow } = {...result}
    //     if (num) {
    //       pageNum = pageNumber
    //     } else {
    //       pageNum = 1
    //     }
    //     this.pageInfo = {
    //       pageNumber: pageNum,
    //       pageSize: pageSize,
    //       totalPage: totalPage,
    //       totalRow: totalRow
    //     }
    //   })
    // }
    // },
    queryInfo (type, num) { // 信息查询
      num ? this[type].pageNumber = this.pageInfo.pageNumber : this[type].pageNumber = 1
      this.exportHighData = this[type] // 导出数据
      let params = this[type]
      getInfoCheck(params).then((res) => {
        console.log(res)
        this.data4 = res.list
        return Promise.resolve(res) // 已经同步了……
      }).then((result) => {
        let pageNum = null
        let { pageNumber, pageSize, totalPage, totalRow } = {...result}
        Number.isInteger(num) ? pageNum = pageNumber : pageNum = 1
        this.pageInfo = {
          pageNumber: pageNum,
          pageSize: pageSize,
          totalPage: totalPage,
          totalRow: totalRow
        }
        this[type].pageNumber = pageNum
      })
    },
    changePageNumber (num) {
      this.pageInfo.pageNumber = num
      let type = ''
      this.checkType ? type = 'lowCheck' : type = 'highCheck'
      this.queryInfo(type, num)
    },
    exportTable () {
      let params = this.exportHighData
      this.$axios.post('user/exportPlus', params, {
        responseType: 'blob'
      }).then(res => {
        let blob = res.data
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = (e) => {
          let a = document.createElement('a')
          a.download = '新建表格.xls'
          a.href = e.target.result
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      })
      // exportTableData(params).then((res) => {
      //   console.log(res.toString())
      //   let blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
      //   /*
      //     var blob = new Blob([typedArray], {type: "application/octet-binary"});// 传入一个合适的MIME类型
      //     var url = URL.createObjectURL(blob);
      //     // 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
      //     // 你可以像使用一个普通URL那样使用它，比如用在img.src上。
      //   */
      //   console.log(blob) // Blob(16990){size:c16990, type: ""}
      //   let objectUrl = URL.createObjectURL(blob)
      //   /*
      // URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL.
      // 这个URL的生命仅存在于它被创建的这个文档里. 新的对象URL指向执行的File对象或者是Blob对象.
      // URL.revokeObjectURL() 调用即释放
      //   */
      // console.log(objectUrl) // blob:http://localhost:8080/90c05518-b797-478c-b7ee-aeecde730bb3
      //   window.open(objectUrl)
      // })
    },
    querySubInfo (params) {
      getSubCheck(params).then((res) => {
        console.log(res)
        this.userWorkhis = res.data.userWorkhis
        this.userTrainhis = res.data.userTrainhis
        this.userStudyhis = res.data.userStudyhis
        this.userFamily = res.data.userFamily
        this.userLanguage = res.data.userLanguage
        this.userUrgent = res.data.userUrgent
        this.userJobinfo = res.data.userJobinfo
        this.infoRecordChange(this.infoRecordTypeValue.value)
      })
    },
    infoRecordChange (val) { // 选择创建表格的类型以及相应输入
      this.infoTemplate = val
      this.data1 = []
      switch (val) {
        /*
        { value: '工作简历', label: 'userWorkhis' },
        { value: '培训经历', label: 'userTrainhis' },
        { value: '教育背景', label: 'userStudyhis' },
        { value: '家庭关系', label: 'userFamily' },
        { value: '语言情况', label: 'userLanguage' },
        { value: '紧急联系人', label: 'userUrgent' },
        { value: '职称信息', label: 'userJobinfo' }
        */
        case '工作简历':
          this.infoTemplate = '工作简历'
          this.infoRecordTypeValue = { key: 'userWorkhis', value: '工作简历' }
          this.createInfoRecordTh()
          this.userWorkhis ? this.data1 = this.userWorkhis : this.data1 = []
          break
        case '培训经历':
          this.infoTemplate = '培训经历'
          this.infoRecordTypeValue = { key: 'userTrainhis', value: '培训经历' }
          this.createInfoRecordTh()
          this.userTrainhis ? this.data1 = this.userTrainhis : this.data1 = []
          break
        case '教育背景':
          this.infoTemplate = '教育背景'
          this.infoRecordTypeValue = { key: 'userStudyhis', value: '工作简历' }
          this.createInfoRecordTh()
          this.userStudyhis ? this.data1 = this.userStudyhis : this.data1 = []
          break
        case '家庭关系':
          this.infoTemplate = '家庭关系'
          this.infoRecordTypeValue = { key: 'userFamily', value: '家庭关系' }
          this.createInfoRecordTh()
          this.userFamily ? this.data1 = this.userFamily : this.data1 = []
          break
        case '语言情况':
          this.infoTemplate = '语言情况'
          this.infoRecordTypeValue = { key: 'userLanguage', value: '语言情况' }
          this.createInfoRecordTh()
          this.userLanguage ? this.data1 = this.userLanguage : this.data1 = []
          break
        case '紧急联系人':
          this.infoTemplate = '紧急联系人'
          this.infoRecordTypeValue = { key: 'userUrgent', value: '紧急联系人' }
          this.createInfoRecordTh()
          this.userUrgent ? this.data1 = this.userUrgent : this.data1 = []
          break
        case '职称信息':
          this.infoTemplate = '职称信息'
          this.infoRecordTypeValue = { key: 'userJobinfo', value: '职称信息' }
          this.createInfoRecordTh()
          this.userJobinfo ? this.data1 = this.userJobinfo : this.data1 = []
          break
      }
    },
    createInfoRecordTh (tableData) {
      this.columns1 = []
      this.data1 = []
      let infoItem = this.infoRecordTypeValue.value
      let infoRecordTh = this.infoRecordTableObj[infoItem]
      infoRecordTh.forEach((item, index) => {
        let obj = {
          title: item[0],
          key: item[1]
        }
        this.columns1.push(obj)
      })
      console.log(this.columns1)
    },
    removeItem (index) {
      this.removeModalType = true
      this.removeIndex = index
    },
    delItem (index) {
      console.log()
      this.highCheck.queryItem = this.highCheck.queryItem.filter((item, tapIndex) => {
        return tapIndex !== this.removeIndex
      })
      this.removeModalType = false
    }
  },
  components: {
    companyQuery,
    departmentQuery
  }
}
</script>

<style>
.userInfo{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.userInfo_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.userInfo_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.userInfo_title:after {
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
.infoSelect{
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px !important;
  margin-right: -8px !important;
}
.infoSelect>div{
  display: flex;
  width: 33.3333333%;
}
.infoSelect .ivu-input{
  width: 100%;
}
.infoItem{
  padding-left: 8px;
  padding-right: 8px;
}

.userInfo .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td {
  background-color:#dfe2e4 !important;
}
</style>
