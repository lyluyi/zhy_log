<template>
    <div>
        <div class="userInfo">
            <div class="userInfo_title mb20">
                <span>人员联系方式</span>
            </div>
        </div>
        <Table border :columns="columns" :sortable="true" :data="users"></Table>
        <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" />
    </div>
</template>
<script>
import { getlinkman } from '@/server/api.js'
export default {
  data () {
    return {
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      columns: [
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '员工编号',
          key: 'userId'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '职务等级',
          key: 'jobLevle'
        },
        {
          title: '电话',
          key: 'telephone'
        },
        {
          title: '邮箱',
          key: 'email'
        }
      ],
      users: []
    }
  },
  created () {
    let userId = localStorage.getItem('userId')
    let params = {pageNumber: 1, pageInfo: 10, userId: userId}
    this.getlinkmanPage(params)
  },
  methods: {
    getlinkmanPage (params) {
      getlinkman(params).then((res) => {
        this.users = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.pageInfo = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPage: totalPage,
          totalRow: totalRow
        }
      })
    },
    changePageNumber (num) {
      let userId = localStorage.getItem('userId')
      let params = {pageNumber: num, pageInfo: 10, userId: userId}
      this.getlinkmanPage(params)
    }
  }
}
</script>
