<template>
  <div>
    <Modal v-model="showCom" @on-ok="okcom" @on-cancel="cancelcom" title="角色查询">
        <!-- <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">公司ID编号：</Button>
              <Input  placeholder="请输入..." v-model="selectData.cid"></Input>
              <Button type="text">公司名称：</Button>
              <Input  placeholder="请输入..." v-model="selectData.cname"></Input>
            </div>
          </Col> -->
          <!-- <Col span="5" offset="1">
            <div class="un-input">
              <Button type="primary" @click="selectCom">查询</Button>
            </div>
          </Col> -->
        </Row>
        <list-view v-if="showList" @tableitem="getTable" :data="comdata" @pageInfo="getPageInfo" :pageInfo="pageData" ></list-view>
    </Modal>
  </div>
</template>

<script>
import listView from '@/common/listview'
import { getRoleList } from '@/server/api.js'
export default {
  props: {
    data: {
      type: Boolean
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
        cid: '',
        cname: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 4,
        column: [
          {
            title: '角色ID',
            key: 'roleId'
          },
          {
            title: '角色名称',
            key: 'roleName'
          }
        ]
      }
    }
  },
  created () {
    this.getCompany()
  },
  methods: {
    getCompany () {
      this.showList = false
      this.$Loading.start()
      let params = {
        'roleName': ''
      }
      getRoleList(params).then((res) => {
        // console.log(res)
        this.pageData = res
        this.comdata.process = res
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
      this.$emit('statusRole', this.hideCom)
    },
    cancelcom () {
      this.$emit('statusRole', this.hideCom)
    },
    // 获取listview组件中的值
    getTable (item) {
      this.$emit('tableRole', item)
      this.$emit('statusRole', this.hideCom)
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
      getRoleList(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.pagesize = item.pageNumber
        this.comdata.process = res
        console.log(this.comdata.process)
        this.showList = true
      })
    }
    // selectCom () {
    //   this.showList = false
    //   this.$Loading.start()
    //   let params = this.selectData
    //   getRoleList(params).then((res) => {
    //     this.$Loading.finish()
    //     this.comdata.process = res
    //     this.showList = true
    //   })
    //   // axios.post(this.ip + 'common/findComp.do', qs.stringify(selectData), {
    //   //   headers: {
    //   //     'Access-Control-Allow-Origin': '*'
    //   //   }
    //   // }).then((res) => {
    //   //   console.log(res)
    //   //   this.comdata.process = res.data.rows
    //   //   this.showList = true
    //   //   this.$Loading.finish()
    //   // })
    // }
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
