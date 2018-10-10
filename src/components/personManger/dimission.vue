<template>
  <div class="jobChange">
    <div class="jobChange_title mb20">
      离退申请
    </div>
    <div class="jobChange_inputGroup">
      <Divider orientation="left">员工基本信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">工号：</Button>
          <Input placeholder="" search enter-button />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">姓名：</Button>
          <Input placeholder=""/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">英文名：</Button>
          <Input placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">性别：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">年龄：</Button>
          <Input placeholder=""/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">学历：</Button>
          <Input placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">所属公司：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门：</Button>
          <Input placeholder=""/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">职位：</Button>
          <Input placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">成本中心：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">直接主管：</Button>
          <Input placeholder=""/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">入司日期：</Button>
          <Input placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司承认工龄：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder=""/>
        </Col>
      </Row>
      <Divider orientation="left">离退申请信息</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">离退类型：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">申请日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom"></DatePicker>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">预计离职日期：</Button>
          <DatePicker type="date" placeholder="Select date" placement="bottom"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">离退原因：</Button>
          <Input placeholder="" />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">离退去向：</Button>
          <Input type="textarea" placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button class="wd mr10 tr" type="text">主观/客观因素：</Button>
          <Input type="textarea" placeholder=""/>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;">保存</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  methods: {
  },
  components: {
  }
}
</script>

<style>
.jobChange{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.jobChange_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.ivu-divider-inner-text {
  font-size: 15px;
  font-weight: bolder;
  color:#2d8cf0;
}
</style>
