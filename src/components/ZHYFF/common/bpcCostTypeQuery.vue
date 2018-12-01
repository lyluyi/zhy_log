<template>
  <div>
    <Modal v-model="showCom" @on-ok="okcom" @on-cancel="cancelcom" title="公司ID查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">费用类型编号：</Button>
              <Input  placeholder="请输入..." v-model="selectData.bpc_costType"></Input>
              <Button type="text">费用类型描述：</Button>
              <Input  placeholder="请输入..." v-model="selectData.bpc_costTypeName"></Input>
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

import { getBpcCostTypeId } from '@/components/ZHYFF/server/api.js'

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
        bpc_costType: '',
        bpc_costTypeName: ''
      },
      pageData: {},
      comdata: {
        process: [],
        pagesize: 1,
        column: [
          {
            title: '费用类型编号',
            key: 'bpc_costType'
          },
          {
            title: '费用类型描述',
            key: 'bpc_costTypeName'
          }
        ]
      }
    }
  },
  created () {
    this.getBpcCostTypeId()
  },
  methods: {
    getBpcCostTypeId () {
      this.showList = false
      this.$Loading.start()
      getBpcCostTypeId({}).then((res) => {
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
      this.$emit('statusBpcCostType', this.hideCom)
    },
    cancelcom () {
      this.$emit('statusBpcCostType', this.hideCom)
    },
    // 获取listview组件中的值
    getTable (item) {
      this.$emit('tableBpcCostType', item)
      this.$emit('statusBpcCostType', this.hideCom)
      if (item != null) {
        this.showCom = false
      }
    },
    selectCom () {
      this.showList = false
      this.$Loading.start()
      let params = this.selectData
      getBpcCostTypeId(params).then((res) => {
        this.$Loading.finish()
        this.pageData = res
        this.comdata.process = res.correspondList
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
