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
        <Page :total="pageInfo.totalRow" :page-size="pageInfo.pageSize" :current="pageInfo.pageNumber" show-total @on-change="changePage"></Page>
      </div>
    </div>

  </div>
</template>

<script>
// import Loading from '../../base/loading/loading.vue'
export default {
  props: {
    data: {},
    pageInfo: {}
  },
  data () {
    return {
      ajaxHistoryData: [],
      historyData: [],
      showLoading: true,
      costType: 10,
      Type: [
        {
          value: 10,
          label: '10行/页'
        }
      ]
    }
  },
  created () {
    console.log(this.data)
    console.log(this.pageInfo)
    // console.log(this.data)
    this.$nextTick(() => {
      this.handleListApproveHistory()
    })
  },
  methods: {
    change () {
      this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
    },
    handleListApproveHistory () {
      // this.ajaxHistoryData = this.pageInfo.list
      this.historyData = this.pageInfo.list
      // if (this.data.process.length < this.pageSize) {
      //   this.historyData = this.ajaxHistoryData
      // } else {
      //   this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
      // }
    },
    clickRow (item, index) {
      // console.log(item)
      this.$emit('tableitem', item)
    },
    changePage (page) {
      console.log(page)
      this.pageInfo.pageNumber = page
      console.log(this.pageInfo)
      // let _start = (page - 1) * this.pageSize
      // let _end = page * this.pageSize
      // this.historyData = this.ajaxHistoryData.slice(_start, _end)
      this.$emit('pageInfo', this.pageInfo)
    }
  }
}
</script>

<style>
</style>
