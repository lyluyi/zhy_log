<template>
  <div>
    <Modal
      title="个人信息"
      v-model="modal7"
      @on-ok="flagTypeRevisePassWordOne"
      @on-cancel="flagTypeRevisePassWordTwo"
      :mask-closable="false">
      <div class="mb10">
        <Button type="text" style="width:25%;text-align: right;">用户ID：</Button>
        <Input placeholder="Enter name" style="width: 70%"  readonly disabled v-model="userId"/>
      </div>
      <div class="mb10">
        <Button type="text" style="width:25%;text-align: right;" >原密码：</Button>
        <Input type="password" placeholder="请输入原密码" style="width: 70%" v-model="oldPassword"/>
      </div>
      <div class="mb10">
        <Button type="text" style="width:25%;text-align: right;" >新密码：</Button>
        <Input type="password" placeholder="请输入新密码" style="width: 70%" v-model="newPassword"/>
      </div>
      <div class="mb10">
        <Button type="text" style="width:25%;text-align: right;" >再次输入新密码：</Button>
        <Input type="password" placeholder="请再次输入新密码" style="width: 70%" v-model="newPasswordAgain"/>
      </div>
    </Modal>
  </div>
</template>
<script>

import { postCheckPassWord } from '@/server/api'

export default {
  props: {
    revisePassWordModel: {
      type: Boolean
    }
  },
  data () {
    return {
      modal7: this.revisePassWordModel,
      hideRevisePassWord: {
        model: false,
        flag: false
      },
      userId: localStorage.getItem('userId'),
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    flagTypeRevisePassWordOne () {
      this.$emit('statusRevisePassWord', this.hideRevisePassWord)
      if (this.newPassword !== this.newPasswordAgain) {
        this.$Message.warning('两次输入不一致')
      } else {
        let params = {
          userId: this.userId,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        }
        postCheckPassWord(params).then((res) => {
          this.$Message.success('修改成功！')
        })
      }
    },
    flagTypeRevisePassWordTwo () {
      this.$emit('statusRevisePassWord', this.hideRevisePassWord)
    }
  },
  components: {}
}
</script>

<style>

</style>
