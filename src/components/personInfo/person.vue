<template>
  <div class="person">
    <Tabs value="基本信息" :animated="false">
        <TabPane label="基本信息" name="基本信息" class="person_tabpane">
          <Row>
            <Col span="16">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">公司：</Button>
                  <Input search enter-button  placeholder=""  v-model="allData.cname" @on-search="queryCompany"/>
                </Col>
                <Col class="col_flex" span="12">
                  <Button  class="wd mr10 tr" type="text">部门：</Button>
                  <Input search enter-button  placeholder="" v-model="allData.did"  @on-search="queryDepartment"/>
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">一级部门：</Button>
                  <Input  placeholder=""  v-model="allData.isDept01"/>
                </Col>
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">职位名称：</Button>
                  <Input  placeholder="" v-model="allData.jobId" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">部门全称：</Button>
                  <Input  placeholder=""  v-model="allData.dname"/>
                </Col>
                <Col class="col_flex" span="12">
                  <Button  class="wd mr10 tr" type="text">部门层级：</Button>
                  <Input  placeholder="" v-model="allData.dLevle"/>
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                <!-- ????????????????? -->
                  <Button class="wd mr10 tr" type="text">主职位：</Button>
                  <Input  placeholder="" v-model="allData.cname" />
                </Col>
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">直接主管：</Button>
                  <Input  placeholder="" v-model="allData.upHeader" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">姓名：</Button>
                  <Input  placeholder="" v-model="allData.userName" />
                </Col>
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">工号：</Button>
                  <Input  placeholder="" v-model="allData.userId" />
                </Col>
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
              <CheckboxGroup v-model="allData.personCheckGroup" >
                <Checkbox label="是否部门主管"></Checkbox>
                <Checkbox label="是否编制人员"></Checkbox>
                <Checkbox label="是否外派人员"></Checkbox>
              </CheckboxGroup>
            </Col>
          </Row>
          <Divider></Divider>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件类型：</Button>
              <Select v-model="allData.idCardType"  placement="bottom">
                  <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件号码：</Button>
              <Input  placeholder="" v-model="allData.idcardno" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件到期日期：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.idcardkindid"></DatePicker>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">出生日期：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.birthdate"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">性别：</Button>
              <Select v-model="allData.sex"  placement="bottom">
                <Option v-for="item in sexType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">籍贯：</Button>
              <Input  placeholder="" v-model="allData.nativeplace" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">手机号码：</Button>
              <Input type="text" placeholder="" v-model="allData.mobilphone" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">员工属性：</Button>
              <Input type="text" placeholder="" v-model="allData.userType" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">直/间接：</Button>
              <Select v-model="allData.hrType1"  placement="bottom">
                <Option v-for="item in hrType1Array" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">学历：</Button>
              <Select v-model="allData.education"  placement="bottom">
                <Option v-for="item in educationType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">主修专业：</Button>
              <Input type="text" placeholder="" v-model="allData.major" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">婚姻状况：</Button>
              <Select v-model="allData.marriageid"  placement="bottom">
                <Option v-for="item in marriageidType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">入司日期：</Button>
              <DatePicker type="date" placeholder="Select date"  placement="bottom" v-model="allData.startworkdata"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">预计转正日期：</Button>
              <DatePicker type="date" placeholder="Select date"  placement="bottom" v-model="allData.toBeWorkDate"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">目前住址：</Button>
              <Input type="text" placeholder="" v-model="allData.location" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">民族：</Button>
              <Input type="text" placeholder="" v-model="allData.nationid" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">户口性质：</Button>
              <Select v-model="allData.hukouType"  placement="bottom">
                <Option v-for="item in hukouTypeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">公司工龄：</Button>
              <Input type="text" placeholder="" v-model="allData.workYears" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">联系电话：</Button>
              <Input type="text" placeholder="" v-model="allData.telephone" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">是否负责人：</Button>
              <Select v-model="allData.isHeader"  placement="bottom">
                <Option v-for="item in ynType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">档案编号：</Button>
              <Input type="text" placeholder="" v-model="allData.archivesId" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">邮箱：</Button>
              <Input type="text" placeholder="" v-model="allData.email" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">邮政编码：</Button>
              <Input type="text" placeholder="" v-model="allData.postalcode" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">外服年限：</Button>
              <Input type="text" placeholder="" v-model="allData.worktypeid" />
            </Col>
          </Row>
          <Row :gutter="16" class="mt20">
            <Col class="col_flex tr" span="24">
              <Button type="primary" size="large" @click="save" style="margin:auto;width:128px;">保存</Button>
            </Col>
          </Row>
        </TabPane>
        <!-- ************************************************************************************************ -->
        <TabPane label="常用信息" name="常用信息" class="person_tabpane">
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">是否储备人才：</Button>
              <Select v-model="allData.isreserveid"  placement="bottom">
                  <Option v-for="item in ynType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">政治面貌：</Button>
              <Select v-model="allData.politics"  placement="bottom">
                <Option v-for="item in politicsType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">健康证到期日：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.healhDate "></DatePicker>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">工龄开始日期：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.beginWorkDate"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">最后工作日：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.lastworkdate"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">所属区域：</Button>
              <Input type="text" placeholder=""  v-model="allData.area"/>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">人员来源：</Button>
              <Input type="text" placeholder=""  v-model="allData.source"/>
            </Col>
            <!-- ??? -->
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">内部推荐人：</Button>
              <Input type="text" placeholder=""  v-model="allData.inneruser"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">员工状态：</Button>
              <Input type="text" placeholder=""  v-model="allData.healhstayus"/>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">户口所在地：</Button>
              <Input type="text" placeholder="" v-model="allData.address"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">职等：</Button>
              <Input type="text" placeholder="" v-model="allData.jobLevle"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">社保账号：</Button>
              <Input type="text" placeholder=""  v-model="allData.shebaoId"/>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">内推人部门：</Button>
              <Input type="text" placeholder="" v-model="allData.inneruserdept"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">公积金账号：</Button>
              <Input type="text" placeholder="" v-model="allData.fundid" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">是否工会成员：</Button>
              <Select v-model="allData.isLabour"  placement="bottom">
                  <Option v-for="item in ynType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">备注：</Button>
              <Input type="textarea" placeholder="" v-model="allData.remark"/>
            </Col>
          </Row>
        </TabPane>
         <TabPane label="相关信息" name="相关信息" class="person_tabpane">
          <div class="mb20 col_flex">
            <!-- @on-change="infoRecordChange" -->
            <Select v-model="infoRecordTypeValue" @on-change="infoRecordChange" style="width:150px">
              <Option v-for="item in infoRecordType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
              <!-- <Button type="success" class="ml20" @click="addItem">添加</Button>
              <Button type="error" class="ml20" @click="removeItem">清除</Button> -->
          </div>
            <!-- ********工作简历******* -->
            <div v-show="infoTemplate === '工作简历'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">开始日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.UserWorkhis.beginDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">结束日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.UserWorkhis.endDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">单位名称：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserWorkhis.company" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">单位性质：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserWorkhis.comType" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">担任职位：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserWorkhis.jobName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">薪资情况：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserWorkhis.wages" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">离职原因：</Button>
                  <Input type="text" placeholder=""  v-model="allData.UserWorkhis.quitRes" />
                </Col>
              </Row>
            </div>
            <!-- ********培训经历******* -->
            <div v-show="infoTemplate === '培训经历'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">开始日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.UserTrainhis.beginDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">结束日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.UserTrainhis.endDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">培训机构：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserTrainhis.trainName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">培训主题：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserTrainhis.trainTheme" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">培训课程：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserTrainhis.trainContent" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证书有效期：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserTrainhis.certTerm" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserTrainhis.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********教育背景******* -->
            <div v-show="infoTemplate === '教育背景'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">开始日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.UserStudyhis.beginDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">结束日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.UserStudyhis.endDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">院校名称：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.schoolName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">院校性质：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.schoolType" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">主修专业：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.major" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">毕业类型：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.graduationType" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">学历情况：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.education" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">学制：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.years" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">职务：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.jobName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证明人：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.witness" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">学位情况：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.endDate" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserStudyhis.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********家庭关系******* -->
            <div v-show="infoTemplate === '家庭关系'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">家属姓名：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.sibName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">与己关系：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.relationship" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">所在单位：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.cname" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">出生日期：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.birthdate" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">担任职位：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.jobName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">电话号码：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.phone" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserFamily.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********语言情况******* -->
            <div v-show="infoTemplate === '语言情况'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">语种：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.languageType" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">听力能力：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.lisnten" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">会话能力：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.talk" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">书写能力：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.write" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">等级状态：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.levleStatus" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证书级别：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.levle" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********紧急联系人******* -->
            <div v-show="infoTemplate === '紧急联系人'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">联系人：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.urgentName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">与己关系：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.urgentType" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">联系电话：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.phone" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">手机号码：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.phone" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">E-mail：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.email" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">邮政编码：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.remark" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">联系地址：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.remark" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserLanguag.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********职称信息******* -->
            <div v-show="infoTemplate === '职称信息'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">职称信息：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserJobinfo.jobinfo" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">获得日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom"  v-model="allData.UserJobinfo.getDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">所在学校：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserJobinfo.jobinfo" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">职位描述：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserJobinfo.jobinfo" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="allData.UserJobinfo.jobinfo" />
                </Col>
              </Row>
            </div>
          <!-- <Table stripe :columns="columns1" :data="data1" class="mt20"></Table> -->
          <Divider orientation="left">
          </Divider>
        </TabPane>
    </Tabs>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="allData.cid"></departmentQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
  </div>
</template>
<script>

import departmentQuery from '@/common/departmentQuery'
import companyQuery from '@/common/companyQuery'

import ip from '@/config'

import { currentTime } from '@/util/common'
import { getAvatraJson, postPersonData } from '@/server/api'

export default {
  data () {
    return {
      ip: ip,
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      imgName: '',
      visible: false,
      uploadList: [],
      idType: [
        { value: '身份证', label: '身份证' },
        { value: '港澳台证件', label: '港澳台证件' },
        { value: '其它', label: '其它' }
      ],
      hrType1Array: [
        { value: '直接', label: '直接' },
        { value: '间接', label: '间接' }
      ],
      educationType: [
        { value: '博士以上', label: '博士以上' },
        { value: '博士', label: '博士' },
        { value: '硕士', label: '硕士' },
        { value: '本科', label: '本科' },
        { value: '大专', label: '大专' },
        { value: '其它', label: '其它' }
      ],
      marriageidType: [
        { value: '未婚', label: '未婚' },
        { value: '已婚', label: '已婚' },
        { value: '离异', label: '离异' }
      ],
      hukouTypeType: [
        { value: '城市户口', label: '城市户口' },
        { value: '城镇户口', label: '城镇户口' },
        { value: '农业户口', label: '农业户口' }
      ],
      ynType: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],
      politicsType: [
        { value: '共青团员', label: '共青团员' },
        { value: '党员', label: '党员' },
        { value: '其它党派', label: '其它党派' },
        { value: '无', label: '无' }
      ],
      sexType: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ],
      staffType: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ],
      infoRecordType: [ // 性别
        { value: '工作简历', label: '工作简历' },
        { value: '培训经历', label: '培训经历' },
        { value: '教育背景', label: '教育背景' },
        { value: '家庭关系', label: '家庭关系' },
        { value: '语言情况', label: '语言情况' },
        { value: '紧急联系人', label: '紧急联系人' },
        { value: '职称信息', label: '职称信息' }
      ],
      // infoRecordTableObj: {
      //   '工作简历': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['单位名称', 'company'], ['单位性质', 'comType'], ['担任职位', 'jobName'], ['薪资情况', 'wages'], ['离职原因', 'quitRes']],
      //   '培训经历': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['培训机构', 'trainName'], ['培训主题', 'trainTheme'], ['培训课程', 'trainContent'], ['证书有效期', 'certTerm'], ['备注', 'remark']],
      //   '教育背景': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['院校名称', 'schoolName'], ['院校性质', 'schoolType'], ['主修专业', 'major'], ['毕业类型', 'graduationType'], ['学历情况', 'education'], ['学制', 'years'], ['职务', 'jobName'], ['证明人', 'witness'], ['备注', 'remark']],
      //   '家庭关系': [['家属姓名', 'sibName'], ['与己关系', 'relationship'], ['所在单位', 'cname'], ['出生日期', 'birthdate'], ['担任职位', 'jobName'], ['电话号码', 'phone'], ['备注', 'remark']],
      //   '语言情况': [['语种', 'languageType'], ['听力能力', 'lisnten'], ['会话能力', 'talk'], ['书写能力', 'write'], ['等级状态', 'levleStatus'], ['证书级别', 'levle'], ['备注',, 'remark']],
      //   '紧急联系人': [['联系人', 'urgentName'], ['与己关系', 'urgentType'], ['联系电话', 'phone'], ['E-mail', 'email'], ['邮政编码', 'code'], ['联系地址', 'addr'], ['备注',, 'remark']],
      //   '职称信息': [['职称信息', 'jobinfo'], ['获得日期', 'getDate'], ['所在学校', 'company'], ['职位描述', 'description'], ['备注', 'remark']]
      // },
      // columns1: [],
      // data1: [],
      infoTemplate: '工作简历',
      infoRecordTypeValue: '工作简历', // 信息录入select option value
      allData: {
        userName: '', // 姓名
        userId: '', // 工号
        did: '', // 部门
        sex: '', // 性别
        birthdate: '', // 出生日期
        age: '', // 年龄
        education: '', // 学历
        major: '', // 主修专业
        userType: '', // 员工属性
        hrType1: '', // 直/间接
        area: '', // 所属区域
        beWorkDate: '', // 转正日期
        upHeader: '', // 直接主管
        jobId: '', // 职位名称
        startworkdata: '', // 入司日期
        workYears: '', // 公司工龄
        isHeader: '', // 是否负责人
        telephone: '', // 联系电话
        mobilphone: '', // 手机号码
        source: '', // 人员来源
        worktypeid: '', // 外服年限
        marriageid: '', // 婚姻状况
        nationid: '', // 民族
        politics: '', // 政治面貌
        nativeplace: '', // 籍贯
        address: '', // 户口所在
        postalcode: '', // 邮政编码
        location: '', // 目前住址
        email: '', // E-mail
        inneruser: '', // 内部推荐员工
        idCardType: '', // 证件类型
        idcardno: '', // 证件号码
        idcardkindid: '', // 证件有效日期到
        isOrganization: '', // 是否编制内
        hukouType: '', // 户口性质
        cname: '', // 所属公司
        isreserveid: '', // 是否储备人才
        isLabour: '', // 是否为工会成员
        lastworkdate: '', // 最后工作日
        toBeWorkDate: '', // 预计转正日期
        isDept01: '', // 一级部门
        dLevle: '', // 部门层级
        dname: '', // 部门全称
        beginWorkDate: '', // 计工龄开始日期
        remark: '', // 备注
        healhstayus: '', // 员工状态
        healhDate: '', // 健康证到期日
        archivesId: '', // 档案编号
        shebaoId: '', // 社保帐号
        fundid: '', // 公积金账号
        jobLevle: '', // 职等
        inneruserdept: '', // 内部推荐人部门
        photo: '', // 员工照片
        UserWorkhis: {
          userId: '', // 员工工号
          beginDate: '', // 开始日期
          endDate: '', // 结束日期
          company: '', // 单位名称
          comType: '', // 单位类型
          jobName: '', // 担任职务
          wages: '', // 薪资
          quitRes: '' // 离职原因
        }, // 工作简历
        UserTrainhis: {
          userId: '', // 员工工号
          beginDate: '', // 开始时间
          endDate: '', // 结束时间
          trainName: '', // 培训机构
          trainTheme: '', // 培训主题
          trainContent: '', // 培训课程
          certName: '', // 证书名称
          certTerm: '' // 证书期限
        }, // 培训经历
        UserStudyhis: {
          userId: '', // 员工工号
          beginDate: '', // 开始日期
          endDate: '', // 结束日期
          schoolName: '', // 学校名称
          schoolType: '', // 学校性质
          major: '', // 主修专业
          graduationType: '', // 毕业类型
          education: '', // 学历
          years: '', // 学制
          jobName: '', // 证明人职位
          witness: '', // 证明人
          remark: '' // 备注
        }, // 教育背景
        UserFamily: {
          userId: '', // 员工工号
          sibName: '', // 家属关系
          relationship: '', // 与己关系
          cname: '', // 公司
          birthdate: '', // 生日
          jobName: '', // 工作
          phone: '', // 联系电话
          remark: '' // 备注
        }, // 家庭关系
        UserLanguag: {
          userId: '', // 员工工号
          languageType: '', // 语种
          lisnten: '', // 听力能力
          talk: '', // 会话能力
          write: '', // 书写能力
          levleStatus: '', // 登记状态
          levle: '' // 级别
        }, // 语言情况
        contactList: {
          urgentName: '', // 紧急联系人
          urgentType: '', // 关系
          phone: '', // 电话
          email: '', // 邮箱
          code: '', // 邮政编号
          addr: '', // 住址
          remark: '' // 备注
        }, // 合同
        UserJobinfo: {
          userId: '', // 员工工号
          jobinfo: '', // 职称信息
          getDate: '', // 获得时间
          company: '', // 所在公司
          description: '', // 描述
          remark: '' // 备注
        } // 职称信息
      }
    }
  },
  created () {
    // this.createInfoRecordTh() // 创建默认的人员信息录入的th
    // console.log(this.ip)
  },
  mounted () {
  },
  methods: {
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.allData.cid = item.CID
      this.allData.cname = item.CNAME
    },
    getCompanyStatus (item) {
      this.flag1 = item.comFlag
      this.model1 = item.commodal
    },
    queryDepartment () { // 部门信息查询
      if (!this.allData.cid) {
        this.$Message.info({ content: '请先输入所属公司' })
      } else {
        this.flag2 = true
        this.model2 = true
      }
    },
    getDepartment (item) {
      // console.log(item)
      this.allData.did = item.DNAME
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    handleView (name) {
      // console.log(name)
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
    },
    handleSuccess (res, file) {
      // console.log(res)
      // console.log(file)
      file.url = '../../assets/logo.png'
      file.name = 'logo.png'
      // this.uploadList.push(file)
      // console.log(this.uploadList)
      let params = {
        bonusId: 'LLH18816215744372',
        url: 'LLH18816215744372_' + file.name
      }
      getAvatraJson(params).then((res) => {
        // console.log(res)
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
    },
    infoRecordChange (val) { // 选择创建表格的类型以及相应输入
      this.infoTemplate = val
      // switch (val) {
      //   case '工作简历': this.infoTemplate = '工作简历'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.UserWorkhis)
      //     break
      //   case '培训经历': this.infoTemplate = '培训经历'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.UserTrainhis)
      //     break
      //   case '教育背景': this.infoTemplate = '教育背景'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.UserStudyhis)
      //     break
      //   case '家庭关系': this.infoTemplate = '家庭关系'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.UserFamily)
      //     break
      //   case '语言情况': this.infoTemplate = '语言情况'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.UserLanguag)
      //     break
      //   case '紧急联系人': this.infoTemplate = '紧急联系人'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.contactList)
      //     break
      //   case '职称信息': this.infoTemplate = '职称信息'
      //     // this.createInfoRecordTh()
      //     // this.data1.push(this.allData.UserJobinfo)
      //     break
      // }
    },
    // createInfoRecordTh () {
    //   this.columns1 = []
    //   this.data1 = []
    //   let infoItem = this.allData.infoRecordTypeValue
    //   let infoRecordTh = this.infoRecordTableObj[infoItem]
    //   infoRecordTh.forEach((item, index) => {
    //     let obj = {
    //       title: item[0],
    //       key: item[1]
    //     }
    //     this.columns1.push(obj)
    //   })
    //   console.log(this.infoRecordTh)
    // },
    // addItem () {
    //   let val = this.allData.infoRecordTypeValue
    //   this.data1 = []
    //   switch (val) {
    //     case '工作简历':
    //       this.data1.push(this.allData.UserWorkhis)
    //       break
    //     case '培训经历':
    //       this.data1.push(this.allData.UserTrainhis)
    //       break
    //     case '教育背景':
    //       this.data1.push(this.allData.UserStudyhis)
    //       break
    //     case '家庭关系':
    //       this.data1.push(this.allData.UserFamily)
    //       break
    //     case '语言情况':
    //       this.data1.push(this.allData.UserLanguag)
    //       break
    //     case '紧急联系人':
    //       this.data1.push(this.allData.contactList)
    //       break
    //     case '职称信息':
    //       this.data1.push(this.allData.UserJobinfo)
    //       break
    //   }
    // },
    // removeItem () {
    // }
    save () {
      this.allData.birthdate = currentTime(this.allData.birthdate)
      this.allData.startworkdata = currentTime(this.allData.startworkdata)
      this.allData.beWorkDate = currentTime(this.allData.beWorkDate)
      this.allData.healhDate = currentTime(this.allData.healhDate)
      this.allData.beginWorkDate = currentTime(this.allData.beginWorkDate)
      this.allData.lastworkdate = currentTime(this.allData.lastworkdate)
      this.allData.UserWorkhis.beginDate = currentTime(this.allData.UserWorkhis.beginDate)
      this.allData.UserWorkhis.endDate = currentTime(this.allData.UserWorkhis.endDate)
      this.allData.UserTrainhis.beginDate = currentTime(this.allData.UserTrainhis.beginDate)
      this.allData.UserTrainhis.endDate = currentTime(this.allData.UserTrainhis.endDate)
      this.allData.UserStudyhis.beginDate = currentTime(this.allData.UserStudyhis.beginDate)
      this.allData.UserStudyhis.endDate = currentTime(this.allData.UserStudyhis.endDate)
      this.allData.UserJobinfo.endDate = currentTime(this.allData.UserJobinfo.endDate)
      let params = this.allData
      postPersonData(params).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    departmentQuery,
    companyQuery
  }
}
</script>

<style>
.person {
  height: 100%;
}
.person_tabpane {
  min-height: 400px;
  height: 100%;
  padding: 10px 10px;
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
  height: 118px;
}
.person .ivu-upload-list{
  position: relative;
  top: -42px;
  right: -100px;
}
</style>
