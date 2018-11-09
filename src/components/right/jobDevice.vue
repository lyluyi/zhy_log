<template>
  <div class="jobDevice">
    <div class="jobDevice_title mb20">
      <span>公司组织架构</span>
    </div>
    <Row>
      <Col span="12">
        <Tree :data="data1" @on-select-change="selectItem()"  ref="tree" ></Tree>
      </Col>
      <Col span="12">
        <Button type="primary" @click="openSaveJobDialog()">添加职位</Button>
        <Modal
            class="jobDevice_Modal"
            v-model="modal1"
            title="添加职位"
            @on-ok="saveJob"
            @on-cancel="cancelSaveJob">
            <Row class="mb20">
              <Col span="24">
                <Button class="wd mr10 tr" type="text">职位描述：</Button>
                <Input v-model="Tjob.description" placeholder="Enter something..." style="width: 300px" readonly />
              </Col>
            </Row>
            <Row style="minHeight:340px !important;">
              <Button class="wd mr10 tr" type="text">职位名称：</Button>
              <Select v-model="Tjob.jobName" filterable style="width:200px">
                <Option v-for="item in optionalJobDictList" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            </Row>
        </Modal>
        <Table border :columns="columns" :sortable="true" :data="jobs"></Table>
        <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
      </Col>
    </Row>
  </div>
</template>
<script>

import { getCompanyTree, getJobPage, getOptionalJobDictListByDeptId, saveJob } from '@/server/api.js'

export default {
  data () {
    return {
      Tjob: {
        jobName: '',
        description: '',
        did: '',
        jobId: '',
        jobLevel: '',
        jobType: ''
      },
      modal1: false,
      data1: [],
      optionalJobDictList: [],
      columns: [
        {
          title: '职位名称',
          key: 'jobName'
        },
        {
          title: '职位描述',
          key: 'description'
        }
      ],
      jobs: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
    }
  },
  created () {
    this.$Spin.show()
    getCompanyTree().then((res) => {
      console.log(res)
      this.data1 = res
      this.$Spin.hide()
    })
  },
  mounted () {},
  methods: {
    openSaveJobDialog () {
      let item = this.$refs.tree.getSelectedNodes()
      if (item.length === 1) {
        if (item[0].type === 'dept') {
          let params = {'deptId': item[0].id}
          getOptionalJobDictListByDeptId(params).then((res) => {
            debugger
            this.optionalJobDictList = res.data
            // console.log(this.optionalJobDictList)
            // console.log(this.optionalJobDictList.length)
          })
          this.Tjob.description = item[0].name
          this.Tjob.did = item[0].id
          // this.Tjob.jobId = item[0].id
          this.modal1 = true
        } else if (item[0].type === 'com') {
          this.$Message.info('请选择部门')
        }
      }
    },
    saveJob () {
      for (let item of this.optionalJobDictList) {
        if (item.name === this.Tjob.jobName) {
          this.Tjob.jobId = item.id
          this.Tjob.jobLevel = item.jobLevel
          this.Tjob.jobType = item.jobType
        }
      }
      if (!(!this.Tjob.jobName && !this.Tjob.description && !this.Tjob.did && !this.Tjob.jobId)) {
        saveJob(this.Tjob).then((res) => {
          if (res.code === 200) {
            this.changePageNumber(1)
          } else {
            this.$Message.info('保存失败')
          }
          this.Tjob = {
            jobName: '',
            description: '',
            did: '',
            jobId: '',
            jobLevel: '',
            jobType: ''
          }
        })
      } else {
        this.$Message.info('数据填写不全')
      }
    },
    cancelSaveJob () {
    },
    selectItem () {
      let item = this.$refs.tree.getSelectedNodes()
      if (item.length === 1) {
        if (item[0].type === 'dept') {
          var deptId = item[0].id
          let params = {pageNumber: 1, pageInfo: 10, did: deptId}
          this.jobPage(params)
        } else if (item[0].type === 'com') {
          this.jobs = []
          this.pageInfo = {
            pageNumber: 1,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0
          }
        }
      }
    },
    jobPage (params) {
      getJobPage(params).then((res) => {
        this.jobs = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.pageInfo = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPage: totalPage,
          totalRow: totalRow
        }
      })
    },
    changePageNumber (num) {
      let item = this.$refs.tree.getSelectedNodes()
      if (item.length === 1) {
        if (item[0].type === 'dept') {
          var deptId = item[0].id
          let params = {pageNumber: num, pageInfo: 10, did: deptId}
          this.jobPage(params)
        }
      }
    }
  },
  components: {}
}
</script>

<style>
.jobDevice{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.jobDevice_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.jobDevice_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.jobDevice_title:after {
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
.ivu-btn-primary{
    margin-bottom: 5px;
}
.jobDevice_Modal .ivu-modal-body {
  min-height: 340px !important;
}
</style>
