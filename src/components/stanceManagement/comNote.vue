<template>
  <div class="companyStruct">
    <div class="companyStruct_title mb20">
      <span class="mb20">使用须知</span>
      <Row style="background:#eee;padding: 20px; width: 90% !important; margin: 0 auto;">
        <Col span="24">
          <Card style="min-height: 216px;">
            <p slot="title" style="font-size: 16px; font-weight: border; color: #515a6e;">周黑鸭信息化管理平台</p>
            <p style="font-size: 15px; font-weight: border; color: #515a6e;">&nbsp;&nbsp;&nbsp;&nbsp; 本平台已于2019年1月17号上线（试运行阶段），操作过程中如有任何疑问，请及时向相关负责人进行反馈，谢谢！</p>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data1: []
    }
  },
  created () {
  },
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style>
.companyStruct{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.companyStruct_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.companyStruct_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.companyStruct_title:after {
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
.ivu-btn-primary{
    margin-bottom: 5px;
}
.companyStruct .ivu-modal-body {
  min-height: 350px;
}
</style>
