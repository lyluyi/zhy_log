<template>
  <div class="person">
    <Tabs value="基本信息" :animated="false">
        <TabPane label="基本信息" name="基本信息" class="person_tabpane">
          <Row>
            <Col span="16">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">公司：</Button>
                  <Input search enter-button placeholder="请输入..." />
                </Col>
                <Col class="col_flex" span="12">
                  <Button  class="wd mr10 tr" type="text">部门：</Button>
                  <Input search enter-button placeholder="请输入..." />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">主职位：</Button>
                  <Input search enter-button placeholder="请输入..." />
                </Col>
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">直接主管：</Button>
                  <Input search enter-button placeholder="请输入..." />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">姓名：</Button>
                  <Input search enter-button placeholder="请输入..." />
                </Col>
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">工号：</Button>
                  <Input search enter-button placeholder="请输入..." />
                </Col>
                <!-- <Col class="col_flex" span="12">
                <Button class="wd mr10 tr" type="text">常用名：</Button>
                <Input search enter-button placeholder="请输入..." />
                </Col> -->
              </Row>
            </Col>
            <Col class="upload_img" span="8">
              <Upload
                  :show-upload-list="true"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  type="drag"
                  :action=" ip +'up/up/' + 'LLH18816215744372' + '.do' "
                  style="display: inline-block; width:118px;">
                  <div style="width:118px;height:118px;line-height:118px;">
                    <div>
                      <Icon type="ios-camera" size="20"></Icon>
                      点击上传图像
                    </div>
                    <img style="width:100%;height:100%;" src="../../assets/logo.png" alt="" v-if="true">
                    <!-- <Progress v-if="uploadList.showProgress" :percent="uploadList.percentage" hide-info></Progress> -->
                    <!-- <div class="person_upload_list" v-for="item in uploadList" :key="item.name">
                      <template v-if="item.status==='finished'">
                        <div class="person_upload_list_cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                      </template>
                    </div> -->
                  </div>
              </Upload>
              <Modal title="View Image" v-model="visible">
                <img :src="'../../assets' + imgName + '/large'" v-if="visible" style="width: 100%">
              </Modal>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col class="col_flex pt20 pb20" span="16" offset="1">
              <CheckboxGroup v-model="personCheckGroup" >
                <Checkbox label="是否部门主管"></Checkbox>
                <Checkbox label="是否编制人员"></Checkbox>
                <Checkbox label="是否外派人员"></Checkbox>
              </CheckboxGroup>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件类型：</Button>
              <Select v-model="idTypeModel" style="width:200px" placement="top">
                  <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件号码：</Button>
              <Input search enter-button placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件到期日期：</Button>
              <Input search enter-button placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">出生日期：</Button>
              <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">性别：</Button>
              <Select v-model="sexTypeModel" style="width:200px" placement="top">
                <Option v-for="item in sexType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">籍贯：</Button>
              <Input search enter-button placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">员工状态：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">员工属性：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">直/间接：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">学历：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">主修专业：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">婚姻状况：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">入司日期：</Button>
              <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">预计转正日期：</Button>
              <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">实际转正日期：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">民族：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">户口性质：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">职级：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">社保归属：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">档案编号：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">邮箱：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">公积金归属：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">招生类别：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mt20">
            <Col class="col_flex tr" span="24">
              <Button type="primary" size="large" style="margin:auto;width:128px;">保存</Button>
            </Col>
          </Row>
        </TabPane>
        <!-- ************************************************************************************************ -->
        <TabPane label="常用信息" name="常用信息" class="person_tabpane">
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">是否储备人才：</Button>
              <Select v-model="idTypeModel" style="width:200px" placement="bottom">
                  <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">政治面貌：</Button>
              <Select v-model="idTypeModel" style="width:200px" placement="bottom">
                <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">健康证到期日：</Button>
              <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">它企工龄：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">计工龄开始日期：</Button>
              <Select v-model="sexTypeModel" style="width:200px" placement="top">
                <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">所属地区：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">与推荐人关系：</Button>
              <DatePicker type="date" placeholder="Select date" style="width: 200px" placement="right-end"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">人员来源：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">内部推荐人：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">户口所在地：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">现住地址：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">现住宅号码：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">现住址区邮编：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">手机号码：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">公司邮箱地址：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">考勤方式：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">职等：</Button>
              <Select v-model="staffTypeModel" style="width:200px" placement="top">
                <Option v-for="item in staffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">社保账号：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">内部推荐人：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">公积金账号：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
        </TabPane>
        <TabPane label="其它信息" name="其它信息">
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">是否工会成员：</Button>
              <Select v-model="idTypeModel" style="width:200px" placement="bottom">
                  <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">参加工会日期：</Button>
              <Select v-model="idTypeModel" style="width:200px" placement="bottom">
                <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">退出工会日期：</Button>
              <Select v-model="idTypeModel" style="width:200px" placement="bottom">
                <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">身高：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">体重：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">血型：</Button>
              <Input type="text" placeholder="请输入..." />
            </Col>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">健康状况：</Button>
              <Input search enter-button placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">个人既往病史：</Button>
              <Input type="textarea" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">性格特征：</Button>
              <Input type="textarea" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">兴趣爱好：</Button>
              <Input type="textarea" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">性格评测记录：</Button>
              <Input type="textarea" placeholder="请输入..." />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">备注：</Button>
              <Input type="textarea" placeholder="请输入..." />
            </Col>
          </Row>
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
import ip from '@/config'
import { getAvatraJson } from '@/server/api.js'
export default {
  data () {
    return {
      ip: ip,
      imgName: '',
      visible: false,
      uploadList: [],
      personCheckGroup: ['是否部门主管'], //  类型多选
      idType: [ //  证件类型Array
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      idTypeModel: '', // 证件类型value
      sexType: [ // 性别
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      sexTypeModel: '', // 性别value
      staffType: [ //  性别
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      staffTypeModel: '' // 性别value
    }
  },
  created () {
    console.log(this.ip)
  },
  mounted () {
  },
  methods: {
    handleView (name) {
      console.log(name)
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
    },
    handleSuccess (res, file) {
      console.log(res)
      console.log(file)
      file.url = '../../assets/logo.png'
      file.name = 'logo.png'
      // this.uploadList.push(file)
      console.log(this.uploadList)
      let params = {
        bonusId: 'LLH18816215744372',
        url: 'LLH18816215744372_' + file.name
      }
      getAvatraJson(params).then((res) => {
        console.log(res)
      })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    }
  },
  components: {}
}
</script>

<style>
.person {
  height: 100%;
}
.person_tabpane {
  height: 100%;
  padding: 10px 10px;
}
.col_flex {
  display: flex;
}
.person-upload-list{
  display: inline-block;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.person_upload_list img{
    width: 100%;
    height: 100%;
}
.person_upload_list_cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.person_upload_list:hover .person_upload_list_cover{
    display: block;
}
.person_upload_list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
.upload_img{
  text-align: center;
}
</style>
