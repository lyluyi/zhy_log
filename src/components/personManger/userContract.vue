<template>
    <div class="userContract">
      <div class="userContract_title mb20">
        合同查询
      </div>
      <div class="userContract_inputGroup">
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">公司名称：</Button>
            <Input placeholder="" search enter-button v-model="userContractPageParams.cname" @on-search="queryCompany(1)" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >部门名称：</Button>
            <Input placeholder="" search enter-button v-model="userContractPageParams.dname"   @on-search="queryDepartment(1)" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >员工编号：</Button>
            <Input type="text" placeholder="" v-model="userContractPageParams.userId" />
          </Col>
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text">用户姓名：</Button>
            <Input type="text" placeholder="" v-model="userContractPageParams.userName" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >签订用工单位：</Button>
            <Input type="text" placeholder="" v-model="userContractPageParams.conCname" />
          </Col>
          <Col class="col_flex" span="8">
            <Button class="wd mr10 tr" type="text" >用户状态：</Button>
            <i-select v-model="userContractPageParams.userStatus">
              <Option v-for="item in userStatusItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </i-select>
          </Col>
        </Row>
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin: 0 auto;" @click="query">查询</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24" class="dict_col">
            <Table highlight-row border :columns="userContractColumns" :sortable="true" :data="userContractData"></Table>
            <Page :total="userContractPageParams.totalRow" :current="userContractPageParams.pageNumber" :page-size="userContractPageParams.pageSize" @on-change="changeUserContractPageNumber" show-total  class="mt20" />
            <!-- <Table highlight-row border :columns="columns" :sortable="true" :data="userAuditData"  ref="dictTypeTable" @on-row-click="selectUserAudit" ></Table>
            <Page :total="userAuditPageInfo.totalRow" :current="userAuditPageInfo.pageNumber" :page-size="userAuditPageInfo.pageSize" @on-change="changeUserAuditPageNumber" show-total  class="mt20" /> -->
          </Col>
        </Row>
      </div>

      <Modal
        v-model="modalFrame"
        title="合同信息修改"
        @on-ok="ok"
        @on-cancel="cancel">
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">签订类型：</Button>
            <i-select v-model="userContract.signType" style="width: 300px">
              <Option v-for="item in signTypeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </i-select>
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">非固定限期：</Button>
            <i-switch v-model="userContract.isLongConView" @on-change="isLongConViewChange" />
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">合同类型：</Button>
            <i-select v-model="userContract.conType" @on-change="selectUserContract" style="width: 300px"  >
              <Option v-for="item in conTypeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </i-select>
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">合同名称：</Button>
            <Input placeholder="" v-model="userContract.conName" style="width: 300px" />
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">应届毕业生：</Button>
            <i-switch v-model="userContract.isGraduatesView" @on-change="isGraduatesViewChange" />
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">合同生效日：</Button>
            <DatePicker id="ivu-date-picker" type="date" placeholder="合同生效日" placement="bottom" v-model="userContract.conBeginDate" @on-change="userContract.conBeginDate=$event" style="width: 300px"></DatePicker>
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24" v-if="!userContract.isLongConView === true">
            <Button class="wd mr10 tr" type="text">合同终止日：</Button>
            <DatePicker id="ivu-date-picker" type="date" placeholder="合同终止日" placement="bottom" v-model="userContract.conEndDate" @on-change="userContract.conEndDate=$event" style="width: 300px" ></DatePicker>
          </Col>
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">签订日期：</Button>
            <DatePicker id="ivu-date-picker" type="date" placeholder="签订日期" placement="bottom" v-model="userContract.signDate" @on-change="userContract.signDate=$event" style="width: 300px" ></DatePicker>
          </Col>
        </Row>
        <Row class="mb20">
          <Button class="wd mr10 tr" type="text">签约用人单位：</Button>
          <Input placeholder="" id="ivu-input-group" search enter-button v-model="userContract.conCname" @on-search="queryCompany(2)" readonly />
        </Row>
        <Row class="mb20">
          <Col span="24">
            <Button class="wd mr10 tr" type="text">合同签订部门：</Button>
            <Input placeholder="" id="ivu-input-group" search enter-button v-model="userContract.conDept" @on-search="queryDepartment(2)" readonly />
          </Col>
        </Row>
      </Modal>

      <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
      <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="userContractPageParams.cid"/>
    </div>
</template>

<script>

import { getUserContractInfoPage, updateUserContract } from '@/server/api'
import companyQuery from '@/common/companyQuery'
import departmentQuery from '@/common/departmentQuery'
import getDic from '@/server/apiDic'

export default {

  data () {
    return {
      modalFrame: false,
      updateContractId: '', // 暂存的UserId
      userContract: {
        userId: '', // 员工工号
        contractid: '', // 合同编号
        conName: '', // 合同名称
        conType: '', // 合同类型
        signType: '', // 签订类型
        signDate: '', // 签订日期
        conBeginDate: '', // 合同生效日期
        conEndDate: '', // 合同终止日期
        conEndTime: '', // 实际终止日期
        conDept: '', // 合同签订部门
        conDid: '', // 合同签订部门ID
        conCname: '', // 签约用工单位
        conCid: '', // 签约用工单位ID
        isGraduates: 0, // 是否应届毕业生
        isGraduatesView: false, // 是否应届毕业生
        isLongCon: '否', // 是否无固定期限合同
        isLongConView: false
      },
      signTypeItems: [],
      conTypeItems: [],
      comFlag: 1,
      depFlag: 1,
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      userStatusItems: {},
      userContractColumns: [
        {
          title: '工号',
          key: 'userId',
          width: 100,
          fixed: 'left'
        },
        {
          title: '中文名',
          key: 'userName',
          width: 100,
          fixed: 'left'
        },
        {
          title: '所属公司',
          width: 218,
          key: 'cname'
        },
        {
          title: '性别',
          width: 100,
          key: 'sex'
        },
        {
          title: '部门名称',
          width: 100,
          key: 'dname'
        },
        {
          title: '职位名称',
          width: 100,
          key: 'jobName'
        },
        {
          title: '学历',
          width: 100,
          key: 'education'
        },
        {
          title: '直接主管',
          width: 100,
          key: 'upHeader'
        },
        {
          title: '入司日期',
          width: 100,
          key: 'startworkdata'
        },
        {
          title: '合同类型',
          width: 100,
          key: 'conType'
        },
        {
          title: '签订类型',
          width: 100,
          key: 'signType'
        },
        {
          title: '签订日期',
          width: 100,
          key: 'signDate'
        },
        {
          title: '合同编号',
          width: 100,
          key: 'contractId'
        },
        {
          title: '合同名称',
          width: 218,
          key: 'conName'
        },
        {
          title: '合同生效日期',
          width: 120,
          key: 'conBeginDate'
        },
        {
          title: '合同终止日',
          width: 120,
          key: 'conEndDate'
        },
        {
          title: '合同实际终止日',
          width: 160,
          key: 'conEndTime'
        },
        {
          title: '签约用工单位',
          width: 218,
          key: 'conCname'
        },
        {
          title: 'ID',
          width: 80,
          // className: 'trNone',
          key: 'id'
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalFrame = true
                    console.log(params)
                    this.userContract = {}
                    this.updateContractId = params.row.id
                    // this.show(params.index)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      userContractData: [],
      userContractPageParams: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
    }
  },
  created () {
    this.queryUserContractData()
    getDic('userStatus').then((res) => {
      // console.log(res)
      this.userStatusItems = res.data
    })
    getDic('contractSignType').then((res) => {
      this.signTypeItems = res.data
    })
    getDic('contractType').then((res) => {
      // console.log(res)
      this.conTypeItems = res.data
    })
  },
  methods: {
    query () {
      this.changeUserContractPageNumber(1)
    },
    queryUserContractData () {
      getUserContractInfoPage(this.userContractPageParams).then((res) => {
        this.userContractData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userContractPageParams.pageNumber = pageNumber
        this.userContractPageParams.pageSize = pageSize
        this.userContractPageParams.totalPage = totalPage
        this.userContractPageParams.totalRow = totalRow
      })
    },
    changeUserContractPageNumber (num) {
      this.userContractPageParams.pageNumber = num
      getUserContractInfoPage(this.userContractPageParams).then((res) => {
        this.userContractData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.userContractPageParams.pageNumber = pageNumber
        this.userContractPageParams.pageSize = pageSize
        this.userContractPageParams.totalPage = totalPage
        this.userContractPageParams.totalRow = totalRow
      })
    },
    queryCompany (val) {
      this.flag1 = true
      this.model1 = true
      this.comFlag = val
    },
    getCompany (item) {
      this.userContract.conCid = item.cid
      this.userContract.conCname = item.cname
      this.userContract.conDid = ''
      this.userContract.conDept = ''
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment (val) {
      this.depFlag = val
      if (this.comFlag === 1 && this.userContract.conCname === '') {
        this.$Message.info({ content: '请先输入公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      this.userContract.conDid = item.did
      this.userContract.conDept = item.dname
    },
    getDepartmentStatus (item) {
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    ok () {
      let params = {
        id: this.updateContractId,
        ...this.userContract
      }
      updateUserContract(params).then(res => {
        if (res.code === 200) {
          this.$Message.success('更新成功')
          this.$router.go(0)
        } else {
          this.$Message.warn('数据操作异常')
        }
      }).catch(err => {
        this.$Message.warn('更新操作失败')
        throw err
      })
    },
    cancel () {
      this.userContract = {}
    },
    isLongConViewChange () {
      if (this.userContract.isLongConView) {
        this.userContract.isLongCon = '是'
      } else {
        this.userContract.isLongCon = '否'
      }
    },
    selectUserContract () {
      if (this.userContract.conType === '借调协议') {
        this.currentUser = {}
      }
    },
    isGraduatesViewChange () {
      if (this.userContract.isGraduatesView) {
        this.userContract.isGraduates = '1'
      } else {
        this.userContract.isGraduates = '0'
      }
    }
  },
  components: {
    departmentQuery,
    companyQuery
  }
}
</script>

<style>
.userContract{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.userContract_title{
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
#ivu-date-picker {
  width: 300px !important;
}

#ivu-input-group {
  width: 300px !important;
  display: inline-block !important;
}
.trNone {
  display: none !important;
}
</style>
