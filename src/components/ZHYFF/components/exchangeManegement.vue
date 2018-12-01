<template>
  <div class="exchangeManegement">
    <div class="exchangeManegement_title mb20">
      <span>用户行为日志</span>
    </div>
    <div class="structWrap pl10 pr10">
      <div class="mb20 col_flex">
        <Button type="default" class="ml20" >汇率设置：</Button>
        <Button type="success" class="ml20" >新增条目</Button>
        <Button type="info" class="ml20" >复制当前</Button>
        <Button type="error" class="ml20" >删除条目</Button>
        <!-- <Button type="success" class="ml20" @click="addItem">新增条目</Button>
        <Button type="info" class="ml20" @click="removeItem">复制当前</Button>
        <Button type="error" class="ml20" @click="removeItem">删除条目</Button> -->
      </div>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">内项1：</Button>
          <DatePicker type="date" placeholder="Select date"  style="width: 300px"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">其他币种：</Button>
          <Input placeholder=""  />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr"  type="text">内项2：</Button>
          <Input  placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr"  type="text">固定CNY：</Button>
          <Input placeholder="" />
        </Col>
      </Row>
      <!-- <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;">查询</Button>
        </Col>
      </Row> -->
      <Row :gutter="16" class="mb10">
        <Table border :columns="columns7" :data="data6" class="mb20"></Table>
        <Page :total="100" show-total @on-change="changPageSize" />
      </Row>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
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
        }
      ]
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    changPageSize () {

    }
  },
  components: {}
}
</script>

<style>
.exchangeManegement{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.exchangeManegement_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.exchangeManegement_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.exchangeManegement_title:after {
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
