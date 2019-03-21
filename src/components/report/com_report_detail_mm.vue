<template>
  <div class="com_report_mm">
    <div class="com_report_mm_title mb20">
      公司月度报表
    </div>
    <div class="com_report_mm_inputGroup">
      <Row :gutter="16" class="mb10">
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司：</Button>
          <Input search enter-button readonly  placeholder=""  v-model="allData.cname" @on-search="queryCompany"/>
        </Col>
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">月份：</Button>
          <DatePicker :disabled="isSelect" :readonly="isSelect" type="month" placeholder="Select month" style="width: 200px" v-model="allData.time" @on-change="allData.time=$event"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="query">查询</Button>
        </Col>
      </Row>
      <Divider>{{ this.allData.cname === '' ? '人员月度异动汇总表' : this.allData.cname + '——' + '人员月度异动汇总表' }}</Divider>
      <Table :columns="columns1" :data="data1" border ></Table>
      <Divider></Divider>
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>

import companyQuery from '@/common/companyQuery'

import { getGSReportMMDetail, getComReportMmTime } from '@/server/api'

export default {
  data () {
    return {
      isSelect: true,
      modal1: false,
      flag1: false,
      columns1: [
        {
          title: '部门',
          // fixed: 'left',
          // aligh: 'center',
          width: 120,
          key: 'dname'
        },
        {
          title: '本月入职人数',
          aligh: 'center',
          width: 600,
          children: [
            {
              title: '入职',
              aligh: 'center',
              // width: 100,,
              key: 'ruzhirenshu'
            },
            {
              title: '离职',
              aligh: 'center',
              // width: 100,,
              children: [
                {
                  title: '转正前',
                  aligh: 'center',
                  // width: 100,,
                  key: 'quit_befor'
                },
                {
                  title: '转正后',
                  aligh: 'center',
                  // width: 100,,
                  key: 'quit_after'
                }
              ]
            },
            {
              title: '转岗',
              aligh: 'center',
              // width: 100,,
              children: [
                {
                  title: '转入',
                  aligh: 'center',
                  // width: 100,,
                  key: 'cd_in'
                },
                {
                  title: '转出',
                  aligh: 'center',
                  // width: 100,,
                  key: 'cd_out'
                }
              ]
            }
          ]
        },
        {
          title: '离职率',
          aligh: 'center',
          width: 240,
          children: [
            {
              title: '转正前',
              aligh: 'center',
              // width: 100,,
              key: 'for_q_befor'
            },
            {
              title: '转正后',
              aligh: 'center',
              // width: 100,,
              key: 'for_q_after'
            }
          ]
        },
        {
          title: '岗位异动',
          aligh: 'center',
          width: 480,
          children: [
            {
              title: '转正',
              aligh: 'center',
              // width: 100,,
              key: 'u_for'
            },
            {
              title: '晋升',
              aligh: 'center',
              // width: 100,,
              key: 'cd_up'
            },
            {
              title: '降职',
              aligh: 'center',
              // width: 100,,
              key: 'cd_down'
            },
            {
              title: '平调',
              aligh: 'center',
              // width: 100,,
              key: 'cd_pd'
            }
          ]
        },
        {
          title: '合同签订数量',
          aligh: 'center',
          // width: 480,
          children: [
            {
              title: '劳动合同',
              aligh: 'center',
              // width: 100,,
              key: 'new_con_ld'
            },
            {
              title: '劳动协议',
              aligh: 'center',
              // width: 100,,
              key: 'new_con_lw'
            },
            {
              title: '实习协议',
              aligh: 'center',
              // width: 100,,
              key: 'new_con_sx'
            },
            {
              title: '其它协议',
              aligh: 'center',
              // width: 100,,
              key: 'new_con_qt'
            }
          ]
        },
        {
          title: '合同续签数量',
          aligh: 'center',
          // width: 240,
          children: [
            {
              title: '劳动合同',
              aligh: 'center',
              // width: 100,,
              key: 'old_con_ld'
            },
            {
              title: '劳动协议',
              aligh: 'center',
              // width: 100,,
              key: 'old_con_lw'
            }
          ]
        },
        {
          title: '离职原因',
          aligh: 'center',
          // width: 360,
          children: [
            {
              title: '辞退',
              aligh: 'center',
              // width: 100,,
              key: 'quit_ct'
            },
            {
              title: '自离',
              aligh: 'center',
              // width: 100,,
              key: 'quit_zl'
            },
            {
              title: '辞职',
              aligh: 'center',
              // width: 100,,
              key: 'quit_cz'
            }
          ]
        }
      ],
      data1: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      allData: {
        cname: '',
        cid: '',
        time: ''
      }
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.allData.cid = item.cid
      this.allData.cname = item.cname
      this.getTimeLimit()
    },
    getTimeLimit () {
      getComReportMmTime({ cid: this.allData.cid }).then(res => {
        if (res.code === 200) {
          this.isSelect = false
        } else {
          this.$Message.error(res.message)
        }
      }).catch(err => {
        throw err
      })
    },
    getLastMonth (item) { // 获取上个月
      let time = item + '-01'
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth()
      if (month === 0 || month === '0' || month === '00') {
        year = year - 1
        month = 12
      }
      month > 9 ? month = month + '' : month = '0' + month
      return year + '-' + month
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    query () {
      this.$Loading.start()
      if (!this.allData.cid) {
        this.$Message.error('请选择公司!')
        return
      }
      if (!this.allData.time) {
        this.$Message.error('请输入日期!')
        return
      }
      let params = this.allData
      getGSReportMMDetail(params).then((res) => {
        this.$Loading.finish()
        this.data1 = res.data
        this.$Message.success(res.msg)
      }).catch((err) => {
        this.$Loading.finish()
        this.$Message.error('数据操作异常！')
        throw err
      })
    }
  },
  components: {
    companyQuery
  }
}
</script>

<style>
.com_report_mm{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.com_report_mm .ivu-table td, .ivu-table th {
  text-align: center !important;
}
.com_report_mm_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.com_report_mm .ivu-table-cell  {
  padding-left: 8px !important;
  padding-right: 8px !important;
}
</style>
