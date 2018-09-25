<template>
  <div>
    <Modal v-model="showCom" @on-ok="okcom" @on-cancel="cancelcom" title="人员账号查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">人员账号ID查询：</Button>
              <Input  placeholder="请输入..." v-model="selectData.userId"></Input>
              <Button type="text">人员名称：</Button>
              <Input  placeholder="请输入..." v-model="selectData.userName"></Input>
            </div>
          </Col>
          <Col span="5" offset="1">
            <div class="un-input">
              <Button type="primary" @click="selectCom">查询</Button>
            </div>
          </Col>
        </Row>
        <list-view v-if="showList" @tableitem="getTable" :data="comdata"  @pageInfo="getPageInfo" :pageInfo="pageData"></list-view>
    </Modal>
  </div>
</template>

<script>
import listView from '@/common/listview'
import { getUserAdminList } from '@/server/api.js'

export default {
  props: {
    data: {
      type: Boolean
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
        userId: '',
        userName: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 4,
        column: [
          {
            title: '人员ID',
            key: 'userId'
          },
          {
            title: '人员名称',
            key: 'userName'
          }
        ]
      }
    }
  },
  created () {
    // this.getUserAdmin()
  },
  methods: {
    getUserAdmin () {
      this.showList = false
      this.$Loading.start()
      getUserAdminList().then((res) => {
        this.pageData = res
        this.comdata.process = res.list
        this.showList = true
        this.$Loading.finish()
      })
    },
    okcom () {
      this.$emit('statusUserAdmin', this.hideCom)
    },
    cancelcom () {
      this.$emit('statusUserAdmin', this.hideCom)
    },
    // 获取listview组件中的值
    getTable (item) {
      this.$emit('tableUserAdmin', item)
      this.$emit('statusUserAdmin', this.hideCom)
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
      getUserAdminList(params).then((res) => {
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
      getUserAdminList(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.process = res.list
        this.showList = true
      })
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
