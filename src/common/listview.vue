<template>
  <div>
    <Table @on-row-click="clickRow" border :columns="data.column" :data="historyData"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div class="loading" style="float: left;">
        <Select v-model="costType" style="width:100px" @on-change='change'>
          <Option v-for="item in Type" :value="item.value" :key="item.value">{{ item.label}}</Option>
        </Select>
      </div>
      <div style="float: right;">
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changePage"></Page>
      </div>
    </div>

  </div>
</template>

<script>
// import Loading from '../../base/loading/loading.vue'
export default {
  props: {
    data: {}
  },
  data () {
    return {
      ajaxHistoryData: [],
      dataCount: 0,
      pageSize: 3,
      historyData: [],
      showLoading: true,
      costType: 10,
      Type: [
        {
          value: 10,
          label: '10行/页'
        },
        {
          value: 50,
          label: '50行/页'
        },
        {
          value: 100,
          label: '100行/页'
        }]
    }
  },
  created () {
    // console.log(this.data)
    this.$nextTick(() => {
      this.handleListApproveHistory()
    })
  },
  methods: {
    change () {
      this.pageSize = this.costType
      this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
    },
    handleListApproveHistory () {
      this.pageSize = this.data.pagesize
      this.ajaxHistoryData = this.data.process
      this.dataCount = this.data.process.length
      if (this.data.process.length < this.pageSize) {
        this.historyData = this.ajaxHistoryData
      } else {
        this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
      }
    },
    clickRow (item, index) {
      // console.log(item)
      this.$emit('tableitem', item)
    },
    changePage (page) {
      let _start = (page - 1) * this.pageSize
      let _end = page * this.pageSize
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
      this.$emit('pageSize', page)
    }
  }
}
</script>

<style>
</style>
