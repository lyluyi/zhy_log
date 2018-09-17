<template>
  <div>
    <Modal v-model="showDep" @on-ok="okDep" @on-cancel="cancelDep" title="上级部门查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <!-- <Button type="text">公司ID编号</Button>
              <Input  placeholder="请输入..." v-model="selectData.cid"></Input> -->
              <Button type="text">上级部门</Button>
              <Input  placeholder="请输入..." v-model="selectData.dname"></Input>
            </div>
          </Col>
          <Col span="5" offset="1">
            <div class="un-input">
              <Button type="primary" @click="selectDep">查询</Button>
            </div>
          </Col>
        </Row>
        <list-view v-if="showList" @tableitem="getTable" :data="comdata"  @pageInfo="getPageInfo" :pageInfo="pageData" ></list-view>
    </Modal>
  </div>
</template>

<script>
import listView from '@/common/listview'
import { getDepartmentLevel } from '@/server/api.js'
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
      showDep: this.data,
      showList: false,
      hideCom: {
        comFlag: false,
        commodal: false
      },
      selectData: {
        cid: this.cid,
        dname: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 4,
        column: [
          {
            title: '公司ID',
            key: 'cid'
          },
          {
            title: '上级部门',
            key: 'dname'
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
      let params = { cid: this.cid }
      getDepartmentLevel(params).then((res) => {
        this.pageData = res
        this.comdata.process = res.list
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
    getPageInfo (item) {
      console.log(item)
      let params = {
        pageNumber: item.pageNumber,
        ...this.selectData
      }
      this.showList = false
      this.$Loading.start()
      getDepartmentLevel(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.pagesize = item.pageNumber
        this.comdata.process = res.list
        console.log(this.comdata.process)
        this.showList = true
      })
    },
    selectDep () {
      this.showList = false
      this.$Loading.start()
      let params = this.selectData
      // let params = { unDid: this.selectData.upDid }
      getDepartmentLevel(params).then((res) => {
        this.pageData = res
        this.comdata.process = res.list
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
