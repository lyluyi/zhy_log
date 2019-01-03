<template>
    <div class="userAuditWill">
      <div class="userAuditWill_title mb20">
        人员信息预处理
      </div>
      <div class="userAuditWill_inputGroup">
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin:0 16px;">查询条件</Button>
            <div>
              <RadioGroup v-model="queryItem">
                <Radio label="健康证"></Radio>
                <Radio label="身份证"></Radio>
                <Radio label="试用期"></Radio>
                <Radio label="转编"></Radio>
                <Radio label="生日"></Radio>
              </RadioGroup>
            </div>
          </Col>
        </Row>
        <Row :gutter="16" class="mb10">
          <Col class="col_flex" span="24">
            <Tabs value="thisMonth">
              <TabPane :label="tabPane.thisMonth" name="thisMonth">
                <Table border :columns="columns6" :data="data5"></Table>
              </TabPane>
              <TabPane :label="tabPane.nextMonth" name="nextMonth">

              </TabPane>
              <TabPane :label="tabPane.threeMonth" name="threeMonth">

              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <Row :gutter="16" class="mb20 mt20 pt20">
          <Col class="col_flex" span="24">
            <Button class="wd tc" type="primary" style="margin: 0 auto;">查询</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24" class="dict_col">
          </Col>
        </Row>
      </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      a: 12,
      tabPane: {
        thisMonth: (h) => {
          return h('div', [
            h('span', '本月'),
            h('Badge', {
              props: {
                count: this.a
              }
            })
          ])
        },
        nextMonth: (h) => {
          return h('div', [
            h('span', '下月'),
            h('Badge', {
              props: {
                count: 3
              }
            })
          ])
        },
        threeMonth: (h) => {
          return h('div', [
            h('span', '三个月之内'),
            h('Badge', {
              props: {
                count: 3
              }
            })
          ])
        }
      },
      queryItem: '',
      columns6: [
        {
          title: 'Date',
          key: 'date'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age',
          filters: [
            {
              label: 'Greater than 25',
              value: 1
            },
            {
              label: 'Less than 25',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.age > 25
            } else if (value === 2) {
              return row.age < 25
            }
          }
        },
        {
          title: 'Address',
          key: 'address',
          filters: [
            {
              label: 'New York',
              value: 'New York'
            },
            {
              label: 'London',
              value: 'London'
            },
            {
              label: 'Sydney',
              value: 'Sydney'
            }
          ],
          filterMethod (value, row) {
            return row.address.indexOf(value) > -1
          }
        }
      ],
      data5: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  created () {
    console.log(this)
  },
  methods: {
  },
  components: {
  }
}
</script>

<style>
.userAuditWill{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 400px;
}
.userAuditWill_title{
  background: #2d8cf0;
  width: 100%;
  text-align: left;
  color: #fff;
  line-height: 36px;
  height: 36px;
  padding-left: 10px;
}
.ivu-divider-inner-text {
  font-size: 15px;
  font-weight: bolder;
  color:#2d8cf0;
}
.userAuditWill .ivu-tabs {
  width: 100%
}
</style>
