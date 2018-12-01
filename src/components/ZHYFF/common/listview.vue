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
        <Page :total="pageInfo.correspondList.length" :page-size="10" :current="pageInfo.pageNumber" show-total @on-change="changePage"></Page>
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
    this.$nextTick(() => {
      this.handleListApproveHistory()
    })
  },
  methods: {
    change () {
      this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
    },
    handleListApproveHistory () {
      this.historyData = this.pageInfo.correspondList.slice(0, 10)
    },
    clickRow (item, index) {
      // console.log(item)
      this.$emit('tableitem', item)
    },
    changePage (page) {
      // 这里应该是加if判断 最后一页时  correspondList
      this.historyData = this.pageInfo.correspondList.slice((page - 1) * 10, page * 10)
    }
  }
}
</script>

<style>
</style>
