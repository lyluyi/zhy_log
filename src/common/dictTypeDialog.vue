<template>
    <div>
        <Modal v-model="isOpenDictTypeDialog"  :title="title"   :closable="false" :mask-closable="false" >
            <div>
              <Row class="mb20">
                <Col span="24 col_flex">
                  <Button class="wd mr10 tr mt10" type="text">数据字典key：</Button>
                  <Input v-model="dictKey" placeholder="数据字典key"/>
                </Col>
                <Col span="24 col_flex">
                  <Button class="wd mr10 tr mt10" type="text">数据字典名称：</Button>
                  <Input v-model="dictName" placeholder="数据字典名称"/>
                </Col>
                <Col span="24 col_flex">
                  <Button class="wd mr10 tr mt10" type="text">数据字典描述：</Button>
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
    isOpenDictTypeDialog: {
      type: Boolean
    }
  },
  created () {
  },
  data () {
    return {
      id: '',
      dictKey: '',
      dictName: '',
      description: ''
    }
  },
  methods: {
    saveData () {
      if (!this.dictKey) {
        this.$Message.info('数据字典key不能为空')
        return
      }
      if (!this.dictName) {
        this.$Message.info('数据字典名称不能为空')
        return
      }
      if (!this.description) {
        this.$Message.info('数据字典描述不能为空')
        return
      }
      let dictType = {'dictKey': this.dictKey, 'dictName': this.dictName, 'description': this.description}
      this.$emit('saveDictType', dictType)
      this.dictKey = ''
      this.dictName = ''
      this.description = ''
    },
    closeDialog () {
      this.$emit('closeDictTypeDialog')
    }
  }
}
</script>
<style>
.ivu-modal-body{
  min-width: 200px;
}
</style>
