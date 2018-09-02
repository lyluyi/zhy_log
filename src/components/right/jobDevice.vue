<template>
  <div class="companyStruct">
    <div class="companyStruct_title mb20">
      <span>职位配置</span>
    </div>
    <div class="structWrap pl10 pr10">
       <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
        <!-- 查询 -->
          <Button class="wd mr10 tr" type="text">职位名称：</Button>
          <Input search enter-button placeholder="" />
        </Col>
        <!-- 先查公司 -->
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司：</Button>
          <Input search enter-button placeholder="" />
        </Col>
        <!-- 部门查询  关联查询-->
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">部门：</Button>
          <Input search enter-button placeholder="" />
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
</style>
