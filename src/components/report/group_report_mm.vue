<template>
  <div class="group_report_mm">
    <div class="group_report_mm_title mb20">
      集团月度报表
    </div>
    <div class="com_report_mm_inputGroup">
      <Row :gutter="16" class="mb10">
        <!-- <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">公司：</Button>
          <Input search enter-button readonly  placeholder=""  v-model="allData.cname" @on-search="queryCompany"/>
        </Col> -->
        <Col class="col_flex" span="8">
          <Button class="wd mr10 tr" type="text">月份：</Button>
          <DatePicker type="month" placeholder="Select month" style="width: 200px" v-model="allData.time" @on-change="allData.time=$event"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16" class="mt20">
        <Col class="col_flex tr" span="24">
          <Button type="primary" size="large" style="margin:auto;width:128px;" @click="query">查询</Button>
        </Col>
      </Row>
      <Divider>集团人员月度异动汇总表</Divider>
      <Table :columns="columns1" :data="data1" border ></Table>
      <Divider></Divider>
      <Row :gutter="16" class="mt20 mb20">
        <Col class="col_flex tr" span="24">
          <Button type="success" size="large" style="margin:auto;width:128px;" @click="exportTable">导出查询</Button>
        </Col>
      </Row>
      <!-- <Page :total="pageInfo.totalRow" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" @on-change="changePageNumber" show-total  class="mt20" /> -->
    </div>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>

import companyQuery from '@/common/companyQuery'

import { getGroReportMm } from '@/server/api'

export default {
  data () {
    return {
      modal1: false,
      flag1: false,
      columns1: [
        {
          title: '公司',
          fixed: 'left',
          aligh: 'center',
          width: 160,
          key: 'cname'
        },
        {
          title: '上月人数',
          aligh: 'center',
          width: 120,
          key: 'shangyuerenshu'
        },
        {
          title: '本月入职人数',
          aligh: 'center',
          width: 600,
          children: [
            {
              title: '入职',
              aligh: 'center',
              width: 120,
              key: 'ruzhirenshu'
            },
            {
              title: '离职',
              aligh: 'center',
              width: 120,
              children: [
                {
                  title: '转正前',
                  aligh: 'center',
                  width: 120,
                  key: 'quit_befor'
                },
                {
                  title: '转正后',
                  aligh: 'center',
                  width: 120,
                  key: 'quit_after'
                }
              ]
            },
            {
              title: '转岗',
              aligh: 'center',
              width: 120,
              children: [
                {
                  title: '转入',
                  aligh: 'center',
                  width: 120,
                  key: 'cd_in'
                },
                {
                  title: '转出',
                  aligh: 'center',
                  width: 120,
                  key: 'cd_out'
                }
              ]
            }
          ]
        },
        {
          title: '本月合计',
          aligh: 'center',
          width: 120,
          key: 'benyuerenshu'
        },
        {
          title: '离职率',
          aligh: 'center',
          width: 240,
          children: [
            {
              title: '转正前',
              aligh: 'center',
              width: 120,
              key: 'for_q_befor'
            },
            {
              title: '转正后',
              aligh: 'center',
              width: 120,
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
              width: 120,
              key: 'u_for'
            },
            {
              title: '晋升',
              aligh: 'center',
              width: 120,
              key: 'cd_up'
            },
            {
              title: '降职',
              aligh: 'center',
              width: 120,
              key: 'cd_down'
            },
            {
              title: '平调',
              aligh: 'center',
              width: 120,
              key: 'cd_pd'
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
              width: 120,
              key: 'for_q_befor'
            },
            {
              title: '转正后',
              aligh: 'center',
              width: 120,
              key: 'for_q_after'
            }
          ]
        },
        {
          title: '合同签订数量',
          aligh: 'center',
          width: 480,
          children: [
            {
              title: '劳动合同',
              aligh: 'center',
              width: 120,
              key: 'new_con_ld'
            },
            {
              title: '劳动协议',
              aligh: 'center',
              width: 120,
              key: 'new_con_lw'
            },
            {
              title: '实习协议',
              aligh: 'center',
              width: 120,
              key: 'new_con_sx'
            },
            {
              title: '其它协议',
              aligh: 'center',
              width: 120,
              key: 'new_con_qt'
            }
          ]
        },
        {
          title: '合同续签数量',
          aligh: 'center',
          width: 240,
          children: [
            {
              title: '劳动合同',
              aligh: 'center',
              width: 120,
              key: 'old_con_ld'
            },
            {
              title: '劳动协议',
              aligh: 'center',
              width: 120,
              key: 'old_con_lw'
            }
          ]
        },
        {
          title: '签收数量',
          aligh: 'center',
          width: 120,
          key: 'total_con'
        },
        {
          title: '离职原因',
          aligh: 'center',
          width: 360,
          children: [
            {
              title: '辞退',
              aligh: 'center',
              width: 120,
              key: 'quit_ct'
            },
            {
              title: '自离',
              aligh: 'center',
              width: 120,
              key: 'quit_zl'
            },
            {
              title: '辞职',
              aligh: 'center',
              width: 120,
              key: 'quit_cz'
            }
          ]
        },
        {
          title: '同签订总人',
          aligh: 'center',
          fixed: 'right',
          width: 160,
          key: 'hetongrenshu'
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
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    // changePageNumber (num) {
    //   this.pageInfo.pageNumber = num
    //   let params = { ...this.pageInfo, ...this.allData }
    //   getComReportMm(params).then((res) => {
    //     this.data1 = res.list
    //   })
    // },
    query () {
      this.$Loading.start()
      let params = this.allData
      getGroReportMm(params).then((res) => {
        console.log(res)
        this.$Loading.finish()
        this.data1 = res.data
        this.$Message.success(res.msg)
      }).catch((err) => {
        this.$Loading.finish()
        this.$Message.error('数据操作异常！')
        throw err
      })
    },
    exportTable () {
      let params = this.allData
      this.$axios.post('user/report/jt/month/exportUserCdChangeInfo', params, {
        responseType: 'blob',
        timeout: 60000 * 2
      }).then(res => {
        let blob = res.data
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = (e) => {
          let a = document.createElement('a')
          a.download = '集团——人员月度异动汇总表.xls'
          a.href = URL.createObjectURL(blob)
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      })
    }
  },
  components: {
    companyQuery
  }
}
</script>

<style>
.group_report_mm{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.group_report_mm .ivu-table td, .ivu-table th {
  text-align: center !important;
}
.group_report_mm_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
</style>
