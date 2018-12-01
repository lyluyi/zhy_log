<template>
  <div>
    <Modal v-model="showDep" @on-ok="okDep" @on-cancel="cancelDep" title="部门查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">部门ID</Button>
              <Input  placeholder="请输入..." v-model="selectData.bpc_deptId"></Input>
              <Button type="text">部门</Button>
              <Input  placeholder="请输入..." v-model="selectData.bpc_deptName"></Input>
            </div>
          </Col>
          <Col span="5" offset="1">
            <div class="un-input">
              <Button type="primary" @click="selectDep">查询</Button>
            </div>
          </Col>
        </Row>
        <listView v-if="showList" @tableitem="getTable" :data="comdata" :pageInfo="pageData" ></listView>
    </Modal>
  </div>
</template>

<script>

import listView from '@/components/ZHYFF/common/listview'

import { getBpcDepartmentId } from '@/components/ZHYFF/server/api.js'

export default {
  props: {
    data: {
      type: Boolean
    },
    cid: {
      type: String
    },
    pageInfo: {
      type: Object
    }
  },
  data () {
    return {
      bpc_comId: this.cid,
      showDep: this.data,
      showList: false,
      hideCom: {
        comFlag: false,
        commodal: false
      },
      selectData: {
        bpc_deptId: '',
        bpc_deptName: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 4,
        column: [
          {
            title: '部门ID',
            key: 'bpc_deptId'
          },
          {
            title: '部门',
            key: 'bpc_deptName'
          }
        ]
      }
    }
  },
  created () {
    // console.log(this.cid)
    this.getDepartment()
  },
  methods: {
    getDepartment () {
      this.showList = false
      this.$Loading.start()
      let params = { bpc_comId: this.bpc_comId }
      getBpcDepartmentId(params).then((res) => {
        this.pageData = res
        this.comdata.process = res.correspondList
        this.showList = true
        this.$Loading.finish()
      })
      // axios.post(this.ip + 'common/findComp.do').then((res) => {
      //   console.log(res.data.rows)
      //   this.comdata.process = res.data.rows
      //   this.showList = true
      //   this.$Loading.finish()
      // })
    },
    okDep () {
      this.$emit('statusDepartment', this.hideCom)
    },
    cancelDep () {
      this.$emit('statusDepartment', this.hideCom)
    },
    // 获取listview组件中的值
    getTable (item) {
      this.$emit('tableDepartment', item)
      this.$emit('statusDepartment', this.hideCom)
      if (item != null) {
        this.showDep = false
      }
    },
    selectDep () {
      this.showList = false
      this.$Loading.start()
      let params = this.selectData
      // let params = { unDid: this.selectData.upDid }
      getBpcDepartmentId(params).then((res) => {
        this.pageData = res
        this.comdata.process = res.correspondList
        this.showList = true
        this.$Loading.finish()
      })
      // axios.post(this.ip + 'common/findComp.do', qs.stringify(selectData), {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }).then((res) => {
      //   console.log(res)
      //   this.comdata.process = res.data.rows
      //   this.showList = true
      //   this.$Loading.finish()
      // })
    }
  },
  components: {
    listView
  }
}
</script>

<style>
.un-input{
  display: flex;
}
.row-line{
  margin-bottom: 15px;
}
</style>
