<template>
  <div>
    <Modal v-model="showCom" @on-ok="okcom" @on-cancel="cancelcom" title="公司ID查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">片区编号：</Button>
              <Input  placeholder="请输入..." v-model="selectData.controlNum"></Input>
              <Button type="text">片区名称：</Button>
              <Input  placeholder="请输入..." v-model="selectData.controlNumName"></Input>
            </div>
          </Col>
          <Col span="5" offset="1">
            <div class="un-input">
              <Button type="primary" @click="selectCom">查询</Button>
            </div>
          </Col>
        </Row>
        <list-view v-if="showList" @tableitem="getTable" :data="comdata" :pageInfo="pageData"></list-view>
    </Modal>
  </div>
</template>

<script>

import listView from '../common/listview'

import { getBpcAreaId } from '@/components/ZHYFF/server/api.js'

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
        controlNum: '',
        controlNumName: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 1,
        column: [
          {
            title: '片区编号',
            key: 'controlNum'
          },
          {
            title: '片区名称',
            key: 'controlNumName'
          }
        ]
      }
    }
  },
  created () {
    this.getBpcAreaId()
  },
  methods: {
    getBpcAreaId () {
      this.showList = false
      this.$Loading.start()
      getBpcAreaId({}).then((res) => {
        // console.log(res)
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
    okcom () {
      this.$emit('statusArea', this.hideCom)
    },
    cancelcom () {
      this.$emit('statusArea', this.hideCom)
    },
    // 获取listview组件中的值
    getTable (item) {
      this.$emit('tableArea', item)
      this.$emit('statusArea', this.hideCom)
      if (item != null) {
        this.showCom = false
      }
    },
    selectCom () {
      this.showList = false
      this.$Loading.start()
      let params = this.selectData
      getBpcAreaId(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.process = res.correspondList
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
