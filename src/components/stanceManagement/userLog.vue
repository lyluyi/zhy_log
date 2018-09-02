<template>
  <div class="userLog">
    <div class="userLog_title mb20">
      <span>用户行为日志</span>
    </div>
    <div class="structWrap pl10 pr10">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">时间：</Button>
          <DatePicker type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">IP：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">用户名：</Button>
          <Input  placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">用户编码：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">Mac地址：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">详细：</Button>
          <Input  placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns7" :data="data6" :loading="loading" class="mb20"></Table>
      <Page :total="100" show-total />
    </div>
  </div>
</template>
<script>

import { getAccountLog } from '@/server/api.js'

export default {
  data () {
    return {
      logList: [],
      loading: true,
      data6: [],
      columns7: [
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '用户编码',
          key: 'userId'
        },
        {
          title: 'IP',
          key: 'userIP'
        },
        {
          title: 'Mac地址',
          key: 'macaIP'
        },
        {
          title: '操作时间',
          key: 'operaDate'
        },
        {
          title: '结果',
          key: 'result'
        },
        {
          title: '操作记录',
          key: 'actionName'
        },
        {
          title: '其它',
          key: 'other',
          aligh: 'center',
          magin: '0 auto',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看')
            ])
          }
        }
      ]
    }
  },
  created () {
    getAccountLog().then((res) => {
      console.log(res)
      this.logList = res.logList.splice(0, 100)
      this.data6 = this.logList.splice(0, 10)
      this.loading = false
    })
  },
  mounted () {},
  methods: {
    show (index) {
      this.$Modal.info({
        title: '其它信息',
        content: `用户名：${this.data6[index].userName}<br>userIP：${this.data6[index].userIP}<br>操作：${this.data6[index].actionDetailed}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  },
  components: {}
}
</script>

<style>
.userLog{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.userLog_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.userLog_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.userLog_title:after {
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
</style>
