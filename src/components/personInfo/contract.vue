<template>
  <div class="contract">
    <div class="contract_title mb20">
      合同信息录入
    </div>
    <div class="contract_inputGroup">
       <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同类型：</Button>
          <Input type="text" placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">签订类型：</Button>
          <Input type="text" placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">签订日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同编号：</Button>
          <Input type="text" placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同名称：</Button>
           <Input type="text" placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同生效日：</Button>
          <Input type="text" placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">合同终止日：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom"></DatePicker>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style>
.contract{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.contract_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.contract_inputGroup{
}
</style>
