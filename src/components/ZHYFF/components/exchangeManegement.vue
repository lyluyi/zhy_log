<template>
  <div class="exchangeManegement">
    <div class="exchangeManegement_title mb20">
      <span>费率维护</span>
    </div>
    <div class="structWrap pl10 pr10">
      <div class="mb20 col_flex">
        <Button type="default" class="ml20" >汇率设置：</Button>
        <Button type="success" class="ml20" @click="add" >新增条目</Button>
        <!-- <Button type="info" class="ml20" >复制当前</Button> -->
        <!-- <Button type="error" class="ml20" @click="removeModalHandle" >删除条目</Button> -->
        <!-- <Button type="success" class="ml20" @click="addItem">新增条目</Button>
        <Button type="info" class="ml20" @click="removeItem">复制当前</Button>
        <Button type="error" class="ml20" @click="removeItem">删除条目</Button> -->
      </div>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">内项1：</Button>
          <Input placeholder="" v-model="allData.rate"  />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">其它币种：</Button>
          <Input placeholder="" v-model="allData.otherClass"  />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr"  type="text">内项2：</Button>
          <Input  placeholder="" v-model="allData.rateValue" readonly />
        </Col>
      </Row>
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr"  type="text">固定CNY：</Button>
          <Input placeholder="" v-model="allData.chinaClass" readonly />
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr"  type="text">年：</Button>
          <Input placeholder="" v-model="allData.year"/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr"  type="text">月：</Button>
          <Input placeholder="" v-model="allData.month"/>
        </Col>
      </Row>
      <!-- <Row :gutter="16" class="mb20 mt20 pt20">
        <Col class="col_flex" span="24">
          <Button class="wd tc" type="primary" style="margin: 0 auto;">查询</Button>
        </Col>
      </Row> -->
      <Row :gutter="16" class="mb10">
        <Table border :columns="columns7" :data="data6" class="mb20"></Table>
        <Page :total="listLength" show-total @on-change="changPageSize(item)" />
      </Row>
    </div>
    <!-- 删除项弹出层 -->
      <Modal v-model="removeModalType" width="120">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center; font-size:14px;font-weight:bold;">
          <p>确定删除当前最新配置项吗？</p>
        </div>
        <div slot="footer">
          <Button type="error" long  @click="remove">删除</Button>
        </div>
      </Modal>
  </div>
</template>
<script>

import { getExchangeManegement } from '@/components/ZHYFF/server/api.js'

export default {
  data () {
    return {
      removeModalType: false,
      allData: {
        rate: '',
        otherClass: '',
        year: '',
        month: '',
        rateValue: '1',
        chinaClass: 'CNY',
        opera: '1'
      },
      listLength: 0,
      deleteRow: {},
      addCheckType: false,
      data6: [],
      columns7: [
        {
          title: '年',
          key: 'year'
        },
        {
          title: '月',
          key: 'month'
        },
        {
          title: '内项1',
          key: 'rate'
        },
        {
          title: '其它币种',
          key: 'otherClass'
        },
        {
          title: '内项2',
          key: 'rateValue'
        },
        {
          title: '固定CNY',
          key: 'chinaClass'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeModalType = true
                    this.deleteRow = params.row
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  created () {
    getExchangeManegement({}).then((res) => {
      if (res.success) {
        this.data6 = res.exchangeRateList
        this.listLength = res.exchangeRateListSize
      } else {
        this.$Message.error('数据查询异常！')
      }
    }).catch(err => {
      this.$Message.error('数据查询失败！')
      throw err
    })
  },
  mounted () {},
  methods: {
    add () {
      this.addCheck()
      let params = this.allData
      if (this.addCheckType) {
        getExchangeManegement(params).then((res) => {
          if (res.success === 'true') {
            this.$Message.success('添加成功！')
            this.$router.go(0)
          } else {
            this.$Message.error('数据查询异常！')
          }
        }).catch(err => {
          this.$Message.error('数据查询失败！')
          throw err
        })
      }
    },
    addCheck () {
      if (!this.allData.rate) {
        this.$Message.info('内项1不能为空！')
        return
      }
      if (!this.allData.year || !this.allData.month) {
        this.$Message.info('时间字段不能为空！')
        return
      }
      if (!this.allData.otherClass) {
        this.$Message.info('其它币种不能为空！')
        return
      }
      this.addCheckType = true
    },
    removeModalHandle () {
      this.removeModalType = true
    },
    remove (row) {
      this.removeModalType = false
      this.deleteRow.opera = '2'
      let params = this.deleteRow
      getExchangeManegement(params).then((res) => {
        console.log(res)
        if (res.success === 'true') {
          this.$Message.info('数据删除成功！')
        } else {
          this.$Message.error('数据删除失败！')
        }
        // this.$router.go(0)
      }).catch(err => {
        this.$Message.info('数据删除失败！')
        throw err
      })
    },
    changPageSize (item) {
      this.allData.page = item + ''
      let params = this.allData
      getExchangeManegement(params).then((res) => {
        console.log(res)
        if (res.success === 'true') {
          this.data6 = res.exchangeRateList
        } else {
          this.$Message.error('数据查询失败！')
        }
      }).catch(err => {
        this.$Message.info('数据查询异常！')
        throw err
      })
    }
  },
  components: {}
}
</script>

<style>
.exchangeManegement{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.exchangeManegement_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.exchangeManegement_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.exchangeManegement_title:after {
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
