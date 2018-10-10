<template>
    <div>
        <Modal v-model="isOpenDictionariesDialog" :title="title" :closable="false" :mask-closable="false" >
            <div>
              <Row class="mb20">
                <Col span="24 col_flex">
                  <Button class="wd mr10 tr mb10" type="text">字典项key：</Button>
                  <Input v-model="dictKey" placeholder="数据字典key"/>
                </Col>
                <Col span="24 col_flex">
                  <Button class="wd mr10 tr mb10" type="text">字典项value：</Button>
                  <Input v-model="dictValue" placeholder="数据字典名称"/>
                </Col>
                <Col span="24 col_flex">
                  <Button class="wd mr10 tr" type="text">字典项描述：</Button>
                  <Input v-model="description" placeholder="数据字典描述"/>
                </Col>
              </Row>
            </div>
            <div slot="footer">
                <Button type="primary" size="large"  @click="saveData">确定</Button>
                <Button size="large"  @click="closeDialog">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    isOpenDictionariesDialog: {
      type: Boolean
    },
    dictTypeId: {
      type: String
    }
  },
  created () {
  },
  data () {
    return {
      id: '',
      dictKey: '',
      dictValue: '',
      description: ''
    }
  },
  methods: {
    saveData () {
      if (!this.dictTypeId) {
        this.$Message.info('请选择数据字典')
        return
      }
      if (!this.dictKey) {
        this.$Message.info('数据字典key不能为空')
        return
      }
      if (!this.dictValue) {
        this.$Message.info('数据字典名称不能为空')
        return
      }
      if (!this.description) {
        this.$Message.info('数据字典描述不能为空')
        return
      }
      let dictType = { 'dictKey': this.dictKey, 'dictValue': this.dictValue, 'description': this.description, 'dictTypeId': this.dictTypeId }
      this.$emit('saveDictionaries', dictType)
      this.dictKey = ''
      this.dictValue = ''
      this.description = ''
    },
    closeDialog () {
      this.$emit('closeDictionariesDialog')
    }
  }
}
</script>
<style>
.ivu-modal-body{
  min-width: 200px;
}
</style>
