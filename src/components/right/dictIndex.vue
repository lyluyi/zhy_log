<template>
    <div>
        <div class="userTel">
            <div class="userTel_title mb20">
                <span>数据字典</span>
            </div>
        </div>
        <Row>
        <Col span="12" class="dict_col">
            <Button type="primary" class="dicttype_add" @click="addDictType">添加</Button>
            <Table highlight-row border :columns="dictTypeColumns" :sortable="true" :data="dictTypeData"  ref="dictTypeTable" @on-row-click="selectDictType" ></Table>
            <Page :total="dictTypePageInfo.totalRow" :current="dictTypePageInfo.pageNumber" :page-size="dictTypePageInfo.pageSize" @on-change="changeDictTypePageNumber" show-total  class="mt20" />
        </Col>
        <Col span="12" class="dictionaries_col">
            <Button type="primary" class="dictionaries_add" @click="addDictionaries">添加</Button>
            <Table border :columns="dictionariesColumns" :sortable="true" :data="dictionariesData"></Table>
            <Page :total="dictionariesPageInfo.totalRow" :current="dictionariesPageInfo.pageNumber" :page-size="dictionariesPageInfo.pageSize" @on-change="changeDictionariesPageNumber" show-total  class="mt20" />
        </Col>
    </Row>
    <dictTypeDialog :title="dictTypeDialogTitle" v-bind:isOpenDictTypeDialog="isOpenDictTypeDialog" v-on:closeDictTypeDialog="closeDictTypeDialog" v-on:saveDictType="saveDictType" ></dictTypeDialog>
    <dictionariesDialog :title="dictionariesDialogTitle" :dictTypeId="selectDictTypeId" v-bind:isOpenDictionariesDialog="isOpenDictionariesDialog" v-on:closeDictionariesDialog="closeDictionariesDialog" v-on:saveDictionaries="saveDictionaries" ></dictionariesDialog>
  </div>
</template>
<script>
import { getDictType, getDictionaries, postDictTypeData, postDictionariesData } from '@/server/api.js'
import dictTypeDialog from '@/common/dictTypeDialog'
import dictionariesDialog from '@/common/dictionariesDialog'
export default {
  data () {
    return {
      dictTypeDialogTitle: '增加数据字典',
      dictionariesDialogTitle: '增加数据字典值',
      isOpenDictTypeDialog: false,
      isOpenDictionariesDialog: false,
      selectDictTypeId: '',
      dictTypeColumns: [
        {
          title: '数据字典key',
          key: 'dictKey'
        },
        {
          title: '数据字典名称',
          key: 'dictName'
        },
        {
          title: '数据字典描述',
          key: 'description'
        }
      ],
      dictTypeData: [],
      dictTypePageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      },
      dictionariesColumns: [
        {
          title: '字典项key',
          key: 'dictKey'
        },
        {
          title: '字典项value',
          key: 'dictValue'
        },
        {
          title: '字典项描述',
          key: 'description'
        }
      ],
      dictionariesData: [],
      dictionariesPageInfo: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
    }
  },
  components: {
    dictTypeDialog,
    dictionariesDialog
  },
  created () {
    let params = { pageNumber: 1, pageInfo: 10 }
    this.getDictTypePage(params)
  },
  methods: {
    selectDictType (item, index) {
      this.dictionariesPageInfo = {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0
      }
      this.selectDictTypeId = item.id
      let params = { pageNumber: 1, pageInfo: 10, dictTypeId: item.id }
      this.getDictionariesPage(params)
    },
    getDictTypePage (params) {
      getDictType(params).then((res) => {
        this.dictTypeData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.dictTypePageInfo = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPage: totalPage,
          totalRow: totalRow
        }
      })
    },
    changeDictTypePageNumber (num) {
      let params = {pageNumber: num, pageInfo: 10}
      this.getDictTypePage(params)
    },
    getDictionariesPage (params) {
      getDictionaries(params).then((res) => {
        this.dictionariesData = res.list
        let { pageNumber, pageSize, totalPage, totalRow } = {...res}
        this.dictionariesPageInfo = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPage: totalPage,
          totalRow: totalRow
        }
      })
    },
    changeDictionariesPageNumber (num) {
      let params = { pageNumber: num, pageInfo: 10, dictTypeId: this.selectDictTypeId }
      this.getDictionariesPage(params)
    },
    addDictType () {
      this.isOpenDictTypeDialog = true
    },
    closeDictTypeDialog () {
      this.isOpenDictTypeDialog = false
    },
    addDictionaries () {
      if (!this.selectDictTypeId) {
        this.$Message.info('请选择数据字典')
        return
      }
      this.isOpenDictionariesDialog = true
    },
    closeDictionariesDialog () {
      this.isOpenDictionariesDialog = false
    },
    saveDictType (dictType) {
      postDictTypeData(dictType).then((res) => {
        this.$Message.info('保存成功')
        this.isOpenDictTypeDialog = false
        this.changeDictTypePageNumber(1)
      })
    },
    saveDictionaries (dictionaries) {
      postDictionariesData(dictionaries).then((res) => {
        this.$Message.info('保存成功')
        this.isOpenDictionariesDialog = false
        this.changeDictionariesPageNumber(1)
      })
    }
  }
}
</script>
<style>
.userTel{
  height: 100%;
  padding: 10px 10px;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
.userTel_title{
  height: 36px;
  padding-left: 10px;
  background: transparent;
  text-align: left;
  line-height: 36px;
  color: #fff;
  position: relative;
}
.userTel_title span{
  display: inline-block;
  width: 100px;
  height: 36px;
  background: #2d8cf0;
  text-align: center
}
.userTel_title:after {
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
.dict_col {
  padding-right: 10px;
}
.dictionaries_col {
 padding-left: 10px;
}
.dictionaries_add {
  margin-bottom: 5px;
}
.dictionaries_del {
  margin-bottom: 5px;
}
.dicttype_add {
  margin-bottom: 5px;
}
.dicttype_del {
  margin-bottom: 5px;
}
</style>
