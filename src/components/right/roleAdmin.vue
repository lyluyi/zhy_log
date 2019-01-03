<template>
  <div class="company">
    <div class="company_title mb20">
      角色管理
    </div>
    <div class="company_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">创建角色名称：</Button>
          <Input  placeholder="" v-model="allData.roleName" />
          <!-- <Button type="primary" class="ml10">创建</Button> -->
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="save">保存</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import { postRoleAdminData } from '@/server/api.js'
export default {
  data () {
    return {
      allData: {
        roleName: ''
      }
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    save () {
      this.$Spin.show()
      let params = {
        'roleName': this.allData.roleName
      }
      postRoleAdminData(params).then((res) => {
        this.$Spin.hide()
        this.$Message.success({ content: '保存成功！' })
      })
      this.allData.roleName = ''
    }
  },
  components: {
  }
}
</script>

<style>
.company{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.company_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.company_inputGroup{
}
</style>
