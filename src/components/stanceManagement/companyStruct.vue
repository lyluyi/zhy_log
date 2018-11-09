<template>
  <div class="companyStruct">
    <div class="companyStruct_title mb20">
      <span>公司组织架构</span>
    </div>
    <Row>
      <Col span="12">
        <Tree :data="data1" ref="tree" ></Tree>
      </Col>
    </Row>
  </div>
</template>
<script>

import { getCompanyTree } from '@/server/api.js'

export default {
  data () {
    return {}
  },
  created () {
    getCompanyTree().then((res) => {
      console.log(res)
      this.data1 = res
    })
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
