<template>
  <div>
    <Modal v-model="showCom" @on-ok="okcom" @on-cancel="cancelcom" title="职位查询">
        <Row class="row-line">
          <!-- <Col span="18">
            <div class="un-input">
              <Button type="text">职位ID：</Button>
              <Input  placeholder="请输入..." v-model="selectData.jobId"></Input>
              <Button type="text">职位名称：</Button>
              <Input  placeholder="请输入..." v-model="selectData.jobName"></Input>
            </div>
          </Col> -->
          <!-- <Col span="5" offset="1">
            <div class="un-input">
              <Button type="primary" @click="selectCom">查询</Button>
            </div>
          </Col> -->
        </Row>
        <list-view v-if="showList" @tableitem="getTable" :data="comdata" @pageInfo="getPageInfo" :pageInfo="pageData"></list-view>
    </Modal>
  </div>
</template>

<script>
import listView from '@/common/listview'
import { getJobId } from '@/server/api.js'
export default {
  props: {
    data: {
      type: Boolean
    },
    did: {
      type: String
    },
    pageInfo: {
      type: Object
    }
  },
  data () {
    return {
      // ip: ip,
      showCom: this.data,
      showList: false,
      hideCom: {
        comFlag: false,
        commodal: false
      },
      selectData: {
        did: this.did,
        dname: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 1,
        column: [
          {
            title: '职位ID',
            key: 'jobId'
          },
          {
            title: '职位名称',
            key: 'jobName'
          }
        ]
      }
    }
  },
  created () {
    this.getJob()
  },
  methods: {
    getJob () {
      this.showList = false
      this.$Loading.start()
      let params = {
        did: this.did
      }
      getJobId(params).then((res) => {
        // console.log(res)
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
    okcom () {
      this.$emit('statusJob', this.hideCom)
    },
    cancelcom () {
      this.$emit('statusJob', this.hideCom)
    },
    // 获取listview组件中的值
    getTable (item) {
      this.$emit('tableJob', item)
      this.$emit('statusJob', this.hideCom)
      if (item != null) {
        this.showCom = false
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
      getJobId(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.pagesize = item.pageNumber
        this.comdata.process = res.list
        console.log(this.comdata.process)
        this.showList = true
      })
    },
    selectCom () {
      this.showList = false
      this.$Loading.start()
      let params = this.selectData
      getJobId(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.process = res.list
        this.showList = true
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
