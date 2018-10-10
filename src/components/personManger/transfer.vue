<template>
  <div class="transfer">
    <div class="transfer_title mb20">
      试用管理
    </div>
    <div class="transfer_inputGroup">
      <Divider orientation="left">常规</Divider>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">员工状态：</Button>
          <Input placeholder=""/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">试用日期：</Button>
          <Input placeholder="" search enter-button />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">转正日期：</Button>
          <Input placeholder="" />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="24">
          <Button class="wd mr10 tr" type="text">备注：</Button>
          <Input type="textarea" placeholder=""/>
        </Col>
      </Row>
      <Divider orientation="left">待转正员工</Divider>
      <Table :columns="columns1" :data="data1"></Table>
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
      columns1: [
        {
          title: '工号',
          key: 'name'
        },
        {
          title: '姓名',
          key: 'age'
        },
        {
          title: '公司',
          key: 'address'
        },
        {
          title: '部门',
          key: 'address'
        },
        {
          title: '职位',
          key: 'address'
        },
        {
          title: '入司日期',
          key: 'address'
        },
        {
          title: '员工状态',
          key: 'address'
        },
        {
          title: '备注',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
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
.transfer{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.transfer_title{
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
