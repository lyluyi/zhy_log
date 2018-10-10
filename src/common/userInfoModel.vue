<template>
  <div>
    <Modal
      title="个人信息"
      v-model="modal8"
      @on-ok="flagTypeUserInfoOne"
      @on-cancel="flagTypeUserInfoTwo"
      :mask-closable="false">
      <div class="mb10">
        <Button type="text" style="width:15%;text-align: right;">用户ID：</Button>
        <Input placeholder="Enter name" style="width: 80%"  readonly disabled v-model="userId"/>
      </div>
      <div class="mb10">
        <Button type="text" style="width:15%;text-align: right;" >姓名：</Button>
        <Input placeholder="Enter name" style="width: 80%"  readonly disabled v-model="userId"/>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    userInfoModel: {
      type: Boolean
    }
  },
  data () {
    return {
      modal8: this.userInfoModel,
      hideUserInfo: {
        model: false,
        flag: false
      },
      userId: localStorage.getItem('userId')
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    flagTypeUserInfoOne () {
      this.$emit('statusUserInfo', this.hideUserInfo)
    },
    flagTypeUserInfoTwo () {
      this.$emit('statusUserInfo', this.hideUserInfo)
    }
  },
  components: {}
}
</script>

<style>

</style>
