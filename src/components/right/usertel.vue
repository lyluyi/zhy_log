<template>
    <div>
        <div class="userTel">
            <div class="userTel_title mb20">
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
<style>
.userTel{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.userTel_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.userTel_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.userTel_title:after {
  content: '';
  display: block;
  width: 98.4%;
  height: 3px;
  background: #dcdee2;
  position: absolute;
  bottom: 0;
  left: 10px;
  background: #2d8cf0;
  margin: 0 auto;
}
.inf
</style>
