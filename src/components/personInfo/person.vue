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
                  <Input search enter-button  placeholder="" v-model="allData.dname"  @on-search="queryDepartment"/>
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">职位名称：</Button>
                  <Input  placeholder="" search enter-button v-model="allData.jobName" @on-search="queryJob" />
                </Col>
                <!-- ？？？？？？？？？？？？？ -->
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">职等：</Button>
                  <Select v-model="allData.jobLevel"  placement="bottom">
                    <Option v-for="item in jobLevelType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">直接主管：</Button>
                  <Input search enter-button  placeholder="" v-model="allData.upHeader" @on-search="queryId" />
                </Col>
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">姓名：</Button>
                  <Input  placeholder="" v-model="allData.userName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">工号：</Button>
                  <Input  placeholder="" v-model="allData.userId" readonly />
                </Col>
                <!-- ？？？？？？？？？？？？？？ -->
                <Col class="col_flex" span="12">
                  <Button class="wd mr10 tr" type="text">职务：</Button>
                  <Input  placeholder="" readonly v-model="allData.jobType" />
                </Col>
              </Row>
            </Col>
            </Col>
          </Row>
          <!-- <Row :gutter="16">
            <Col class="col_flex pt20 pb20" span="16" offset="1">
              <CheckboxGroup v-model="allData.personCheckGroup" >
                <Checkbox label="是否部门主管"></Checkbox>
                <Checkbox label="是否编制人员"></Checkbox>
                <Checkbox label="是否外派人员"></Checkbox>
              </CheckboxGroup>
            </Col>
          </Row> -->
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
              <Input  placeholder="" v-model="allData.idcardno" @on-blur="changeIdcardno" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">证件到期日期：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.idcardkindid"></DatePicker>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">出生日期：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.birthdate" readonly ></DatePicker>
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
              <Input type="text" placeholder="" v-model="allData.mobilphone" @on-blur="telValidate" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">员工状态：</Button>
              <Select v-model="allData.userStatus"  placement="bottom">
                <Option v-for="item in emloyType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <!-- <Input type="text" placeholder=""  v-model="allData.healhstayus"/> -->
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">员工属性：</Button>
              <Select v-model="allData.userType"  placement="bottom">
                <Option v-for="item in emloyAttr" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <!-- <Input type="text" placeholder="" v-model="allData.userType" /> -->
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
              <DatePicker type="date" placeholder="Select date"  placement="bottom" v-model="allData.startworkdata" @on-change="joinTime"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">预计转正日期：</Button>
              <DatePicker type="date" placeholder="Select date"  placement="bottom" v-model="allData.toBeWorkDate"></DatePicker>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">健康证到期日：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.healhDate "></DatePicker>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">民族：</Button>
              <Select v-model="allData.nationid"  placement="bottom">
                <Option v-for="item in nationidType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">户口性质：</Button>
              <Select v-model="allData.hukouType"  placement="bottom">
                <Option v-for="item in hukouTypeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">所属区域：</Button>
              <Select v-model="allData.area"  placement="bottom">
                <Option v-for="item in areaType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
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
              <Button class="wd mr10 tr" type="text">直/间接：</Button>
              <Select v-model="allData.hrType1"  placement="bottom">
                <Option v-for="item in hrType1Array" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">年龄：</Button>
              <Input type="text" placeholder="" v-model="allData.age" readonly />
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
              <Button class="wd mr10 tr" type="text">目前住址：</Button>
              <Input type="text" placeholder="" v-model="allData.location" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">工龄开始日期：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.beginWorkDate"></DatePicker>
            </Col>
            <!-- <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">最后工作日：</Button>
              <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="allData.lastworkdate"></DatePicker>
            </Col> -->
            <!-- <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">公司工龄：</Button>
              <Input type="text" placeholder="" v-model="allData.workYears" />
            </Col> -->
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">人员来源：</Button>
              <Select v-model="allData.source"  placement="bottom">
                <Option v-for="item in sourceType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">内部推荐人：</Button>
              <Input type="text" placeholder="" search enter-button  v-model="allData.inneruser" @on-search="queryInneruser"/>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <!-- ??? -->
            <!-- <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">邮政编码：</Button>
              <Input type="text" placeholder="" v-model="allData.postalcode" />
            </Col> -->
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">户口所在地：</Button>
              <Input type="text" placeholder="" v-model="allData.address"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">外服年限：</Button>
              <Input type="text" placeholder="" v-model="allData.worktypeid" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">社保账号：</Button>
              <Input type="text" placeholder=""  v-model="allData.shebaoId"/>
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">内推人部门：</Button>
              <Input type="text" placeholder="" readonly  v-model="allData.inneruserdept" />
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
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">健康：</Button>
              <Input type="text" placeholder=""  v-model="allData.healhstayus"/>
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">身高：</Button>
              <Input type="text" placeholder="" v-model="allData.height" />
            </Col>
            <Col class="col_flex" span="8">
              <Button class="wd mr10 tr" type="text">体重：</Button>
              <Input type="text" placeholder="" v-model="allData.weight" />
            </Col>
          </Row>
          <Row :gutter="16" class="mb10">
            <Col class="col_flex" span="24">
              <Button class="wd mr10 tr" type="text">评测结果：</Button>
              <Input type="textarea" placeholder="" v-model="allData.evaluates"/>
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
              <Button type="success" class="ml20" @click="addItem">添加</Button>
              <Button type="error" class="ml20" @click="removeItem">清除</Button>
          </div>
            <!-- ********工作简历******* -->
            <div v-show="infoTemplate === '工作简历'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">开始日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userWorkhis.beginDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">结束日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userWorkhis.endDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">单位名称：</Button>
                  <Input type="text" placeholder="" v-model="userWorkhis.company" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">单位性质：</Button>
                  <Input type="text" placeholder="" v-model="userWorkhis.comType" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">担任职位：</Button>
                  <Input type="text" placeholder="" v-model="userWorkhis.jobName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">薪资情况：</Button>
                  <Input type="text" placeholder="" v-model="userWorkhis.wages" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">离职原因：</Button>
                  <Input type="text" placeholder=""  v-model="userWorkhis.quitRes" />
                </Col>
              </Row>
            </div>
            <!-- ********培训经历******* -->
            <div v-show="infoTemplate === '培训经历'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">开始日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userTrainhis.beginDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">结束日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userTrainhis.endDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">培训机构：</Button>
                  <Input type="text" placeholder="" v-model="userTrainhis.trainName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">培训主题：</Button>
                  <Input type="text" placeholder="" v-model="userTrainhis.trainTheme" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">培训课程：</Button>
                  <Input type="text" placeholder="" v-model="userTrainhis.trainContent" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证书名称：</Button>
                  <Input type="text" placeholder="" v-model="userTrainhis.certName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证书有效期：</Button>
                  <Input type="text" placeholder="" v-model="userTrainhis.certTerm" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="userTrainhis.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********教育背景******* -->
            <div v-show="infoTemplate === '教育背景'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">开始日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userStudyhis.beginDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">结束日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userStudyhis.endDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">院校名称：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.schoolName" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">院校性质：</Button>
                  <Select v-model="userStudyhis.schoolType"  placement="bottom">
                    <Option v-for="item in schoolTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">主修专业：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.major" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">毕业类型：</Button>
                  <Select v-model="userStudyhis.graduationType"  placement="bottom">
                    <Option v-for="item in graduationTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">学历情况：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.education" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">学制：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.years" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证明人：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.witness" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">学位情况：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.educationDgree" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="userStudyhis.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********家庭关系******* -->
            <div v-show="infoTemplate === '家庭关系'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">家属姓名：</Button>
                  <Input type="text" placeholder="" v-model="userFamily.sibName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">与己关系：</Button>
                  <Select v-model="userFamily.relationship"  placement="bottom">
                    <Option v-for="item in relationshipTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">所在单位：</Button>
                  <Input type="text" placeholder="" v-model="userFamily.cname" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <!-- <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">出生日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom" v-model="userFamily.birthdate"></DatePicker>
                </Col> -->
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">担任职位：</Button>
                  <Input type="text" placeholder="" v-model="userFamily.jobName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">电话号码：</Button>
                  <Input type="text" placeholder="" v-model="userFamily.phone" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="userFamily.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********语言情况******* -->
            <div v-show="infoTemplate === '语言情况'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">语种：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.languageType" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">听力能力：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.lisnten" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">会话能力：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.talk" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">书写能力：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.write" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">等级状态：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.levleStatus" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">证书级别：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.levle" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="userLanguage.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********紧急联系人******* -->
            <div v-show="infoTemplate === '紧急联系人'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">联系人：</Button>
                  <Input type="text" placeholder="" v-model="userUrgent.urgentName" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">与己关系：</Button>
                  <Select v-model="userUrgent.urgentType"  placement="bottom">
                    <Option v-for="item in relationshipTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">联系电话：</Button>
                  <Input type="text" placeholder="" v-model="userUrgent.phone" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">E-mail：</Button>
                  <Input type="text" placeholder="" v-model="userUrgent.email" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">邮政编码：</Button>
                  <Input type="text" placeholder="" v-model="userUrgent.code" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">联系地址：</Button>
                  <Input type="text" placeholder="" v-model="userUrgent.addr" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="userUrgent.remark" />
                </Col>
              </Row>
            </div>
            <!-- ********职称信息******* -->
            <div v-show="infoTemplate === '职称信息'">
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">职称信息：</Button>
                  <Input type="text" placeholder="" v-model="userJobinfo.jobinfo" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">获得日期：</Button>
                  <DatePicker type="date" placeholder="Select date" placement="bottom"  v-model="userJobinfo.getDate"></DatePicker>
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">所在单位：</Button>
                  <Input type="text" placeholder="" v-model="userJobinfo.company" />
                </Col>
              </Row>
              <Row :gutter="16" class="mb10">
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">职位描述：</Button>
                  <Input type="text" placeholder="" v-model="userJobinfo.description" />
                </Col>
                <Col class="col_flex" span="8">
                  <Button class="wd mr10 tr" type="text">备注：</Button>
                  <Input type="text" placeholder="" v-model="userJobinfo.remark" />
                </Col>
              </Row>
            </div>
          <Table stripe :columns="columns1" :data="data1" class="mt20"></Table>
          <Divider orientation="left">
          </Divider>
        </TabPane>
    </Tabs>
    <departmentQuery @tableDepartment="getDepartment" @statusDepartment='getDepartmentStatus' :data="model2" v-if="flag2" :cid="allData.cid"></departmentQuery>
    <companyQuery @tableCompany="getCompany" @statusCompany='getCompanyStatus' :data="model1" v-if="flag1"></companyQuery>
    <jobQuery @tableJob="getJob" @statusJob='getJobStatus' :data="model3" v-if="flag3" :did="allData.did"></jobQuery>
    <userIdQuery @tableUserId="getUserId" @statusUserId='getUserIdStatus' :data="modal6" v-if="flag6"></userIdQuery>
  </div>
  </div>
</template>
<script>

import departmentQuery from '@/common/departmentQuery'
import companyQuery from '@/common/companyQuery'
import jobQuery from '@/common/jobQuery'
import userIdQuery from '@/common/userIdQuery'

import ip from '@/config'

import { currentTime, isPoneAvailable, threeMonth, idCardCheck } from '@/util/common'

import { postPersonData, getUserId } from '@/server/api'

import getDic from '@/server/apiDic'

export default {
  data () {
    return {
      ip: ip,
      flag1: false,
      model1: false,
      flag2: false,
      model2: false,
      flag3: false,
      model3: false,
      flag6: false,
      model6: false,
      userIdFlag: 0,
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
      educationType: [],
      marriageidType: [
        { value: '未婚', label: '未婚' },
        { value: '已婚', label: '已婚' },
        { value: '离异', label: '离异' }
      ],
      hukouTypeType: [
        { value: '本地城镇户口', label: '本地城镇户口' },
        { value: '本地农业户口', label: '本地农业户口' },
        { value: '外地城镇户口', label: '外地城镇户口' },
        { value: '外地农业户口', label: '外地农业户口' }
      ],
      ynType: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],
      politicsType: [],
      sexType: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ],
      staffType: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ],
      nationidType: [],
      sourceType: [],
      infoRecordType: [ // 性别
        { value: '工作简历', label: '工作简历' },
        { value: '培训经历', label: '培训经历' },
        { value: '教育背景', label: '教育背景' },
        { value: '家庭关系', label: '家庭关系' },
        { value: '语言情况', label: '语言情况' },
        { value: '紧急联系人', label: '紧急联系人' },
        { value: '职称信息', label: '职称信息' }
      ],
      infoRecordTableObj: {
        '工作简历': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['单位名称', 'company'], ['单位性质', 'comType'], ['担任职位', 'jobName'], ['薪资情况', 'wages'], ['离职原因', 'quitRes']],
        '培训经历': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['培训机构', 'trainName'], ['培训主题', 'trainTheme'], ['培训课程', 'trainContent'], ['证书有效期', 'certTerm'], ['备注', 'remark']],
        '教育背景': [['开始日期', 'beginDate'], ['结束日期', 'endDate'], ['院校名称', 'schoolName'], ['院校性质', 'schoolType'], ['主修专业', 'major'], ['毕业类型', 'graduationType'], ['学历情况', 'education'], ['学制', 'years'], ['证明人', 'witness'], ['备注', 'remark']],
        '家庭关系': [['家属姓名', 'sibName'], ['与己关系', 'relationship'], ['所在单位', 'cname'], ['担任职位', 'jobName'], ['电话号码', 'phone'], ['备注', 'remark']],
        '语言情况': [['语种', 'languageType'], ['听力能力', 'lisnten'], ['会话能力', 'talk'], ['书写能力', 'write'], ['等级状态', 'levleStatus'], ['证书级别', 'levle'], ['备注', 'remark']],
        '紧急联系人': [['联系人', 'urgentName'], ['与己关系', 'urgentType'], ['联系电话', 'phone'], ['E-mail', 'email'], ['邮政编码', 'code'], ['联系地址', 'addr'], ['备注', 'remark']],
        '职称信息': [['职称信息', 'jobinfo'], ['获得日期', 'getDate'], ['所在单位', 'company'], ['职位描述', 'description'], ['备注', 'remark']]
      },
      emloyAttr: [
        { value: '实习生', label: '实习生' },
        { value: '见习生', label: '见习生' },
        { value: '员工', label: '员工' },
        { value: '退休返聘', label: '退休返聘' },
        { value: '劳务人员', label: '劳务人员' },
        { value: '临时工', label: '临时工' },
        { value: '兼职员工', label: '兼职员工' }
      ],
      relationshipTypeList: [],
      schoolTypeList: [], // 院校性质
      graduationTypeList: [], // 毕业类型
      jobLevelType: [],
      areaType: [],
      emloyType: [],
      columns1: [],
      data1: [],
      infoTemplate: '工作简历',
      infoRecordTypeValue: '工作简历', // 信息录入select option value
      userWorkhis: {
        // userId: '', // 员工工号
        beginDate: '', // 开始日期
        endDate: '', // 结束日期
        company: '', // 单位名称
        comType: '', // 单位类型
        jobName: '', // 担任职务
        wages: '', // 薪资
        quitRes: '' // 离职原因
      }, // 工作简历
      userTrainhis: {
        // userId: '', // 员工工号
        beginDate: '', // 开始时间
        endDate: '', // 结束时间
        trainName: '', // 培训机构
        trainTheme: '', // 培训主题
        trainContent: '', // 培训课程
        certName: '', // 证书名称
        certTerm: '' // 证书期限
      }, // 培训经历
      userStudyhis: {
        // userId: '', // 员工工号
        beginDate: '', // 开始日期
        endDate: '', // 结束日期
        schoolName: '', // 学校名称
        schoolType: '', // 学校性质
        major: '', // 主修专业
        graduationType: '', // 毕业类型
        education: '', // 学历
        educationDgree: '', // 学位
        years: '', // 学制
        jobName: '', // 证明人职位
        witness: '', // 证明人
        remark: '' // 备注
      }, // 教育背景
      userFamily: {
        // userId: '', // 员工工号
        sibName: '', // 家属关系
        relationship: '', // 与己关系
        cname: '', // 公司
        birthdate: '', // 生日
        jobName: '', // 工作
        phone: '', // 联系电话
        remark: '' // 备注
      }, // 家庭关系
      userLanguage: {
        // userId: '', // 员工工号
        languageType: '', // 语种
        lisnten: '', // 听力能力
        talk: '', // 会话能力
        write: '', // 书写能力
        levleStatus: '', // 登记状态
        levle: '' // 级别
      }, // 语言情况
      userUrgent: {
        // userId: '', // 员工工号
        urgentName: '', // 紧急联系人
        urgentType: '', // 关系
        phone: '', // 电话
        email: '', // 邮箱
        code: '', // 邮政编号
        addr: '', // 住址
        remark: '' // 备注
      }, // 紧急联系人
      userJobinfo: {
        // userId: '', // 员工工号
        jobinfo: '', // 职称信息
        getDate: '', // 获得时间
        company: '', // 所在公司
        description: '', // 描述
        remark: '' // 备注
      }, // 职称信息
      allData: {
        userName: '', // 姓名
        userId: '', // 工号
        did: '', // 部门ID
        dname: '', // 部门name
        sex: '', // 性别
        birthdate: '', // 出生日期
        age: '', // 年龄
        education: '', // 学历
        major: '', // 主修专业
        userType: '', // 员工属性
        hrType1: '', // 直/间接
        area: '', // 所属区域
        toBeWorkDate: '', // 预计转正日期
        upHeader: '', // 直接主管
        upHeaderId: '', // 直接主管id
        jobId: '', // 职位名称
        jobLevle: '', // 职等
        jobType: '', // 职务
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
        isDept01: '', // 一级部门
        dLevle: '', // 部门层级
        beginWorkDate: '', // 计工龄开始日期
        remark: '', // 备注
        healhstayus: '', // 员工状态
        healhDate: '', // 健康证到期日
        archivesId: '', // 档案编号
        shebaoId: '', // 社保帐号
        fundid: '', // 公积金账号
        jobLevel: '', // 职等
        inneruserdept: '', // 内部推荐人部门
        photo: '', // 员工照片
        userStatus: '', // 员工状态
        evaluates: '', // 评测结果
        height: '', // 身高
        weight: '', // 体重
        userWorkhis: [], // 工作简历
        userTrainhis: [], // 培训经历
        userStudyhis: [], // 教育背景
        userFamily: [], // 家庭关系
        userLanguage: [], // 语言情况
        userUrgent: [], // 紧急联系人
        userJobinfo: [] // 职称信息
      }
    }
  },
  created () {
    this.getByUserId() // 生成工号
    this.createInfoRecordTh() // 创建表格
    // getDic(9).then(res => this.nationidType = res.data)
    getDic('NATIONID').then((res) => {
      this.nationidType = res.data
    })
    getDic('SOURCE').then((res) => {
      this.sourceType = res.data
    })
    getDic('EDUCATION').then((res) => {
      this.educationType = res.data
    })
    getDic('userStatus').then((res) => {
      this.emloyType = res.data
    })
    getDic('area').then((res) => {
      this.areaType = res.data
    })
    getDic('job_level').then((res) => {
      this.jobLevelType = res.data
    })
    getDic('POLITICS').then((res) => {
      this.politicsType = res.data
    })
    getDic('academy').then((res) => {
      this.schoolTypeList = res.data
    })
    getDic('Graduation').then((res) => {
      this.graduationTypeList = res.data
    })
    getDic('Relationship').then((res) => {
      this.relationshipTypeList = res.data
    })
  },
  mounted () {
  },
  methods: {
    joinTime () {
      this.allData.beginWorkDate = this.allData.startworkdata
      this.allData.toBeWorkDate = threeMonth(this.allData.startworkdata)
    },
    telValidate () {
      if (isPoneAvailable(this.allData.mobilphone)) {
        return true
      } else {
        this.$Message.info('手机号码格式输入有误！')
      }
    },
    changeIdcardno () {
      let strData = idCardCheck(this.allData.idcardno)
      this.allData.age = strData.age
      this.allData.birthdate = strData.birthDay
    },
    getByUserId () {
      getUserId().then((res) => {
        this.allData.userId = res.userId
        // this.allData.userFamily.userId = res.userId
        // this.allData.userJobinfo.userId = res.userId
        // this.allData.userLanguage.userId = res.userId
        // this.allData.userStudyhis.userId = res.userId
        // this.allData.userTrainhis.userId = res.userId
        // this.allData.userUrgent.userId = res.userId
        // this.allData.userWorkhis.userId = res.userId
      })
    },
    queryCompany () { // 公司信息查询
      this.flag1 = true
      this.model1 = true
    },
    getCompany (item) {
      this.allData.cid = item.cid
      this.allData.cname = item.cname
      this.allData.area = item.area
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
      this.allData.did = item.did
      this.allData.dname = item.dname
    },
    getDepartmentStatus (item) {
      // console.log(item)
      this.flag2 = item.comFlag
      this.model2 = item.commodal
    },
    queryJob () { // 公司信息查询
      if (this.allData.did) {
        this.flag3 = true
        this.model3 = true
      } else {
        this.$Message.info('请先选择部门！')
        return false
      }
    },
    getJob (item) {
      this.allData.jobId = item.jobId
      this.allData.jobName = item.jobName
      this.allData.jobType = item.jobType
      this.allData.jobLevel = item.jobLevel
    },
    getJobStatus (item) {
      this.flag3 = item.comFlag
      this.model3 = item.commodal
    },
    queryInneruser () {
      this.modal6 = true
      this.flag6 = true
      this.userIdFlag = 1
    },
    queryId () {
      this.modal6 = true
      this.flag6 = true
      this.userIdFlag = 0
    },
    getUserId (item) {
      console.log(item)
      if (this.userIdFlag) {
        this.allData.inneruser = item.userName
        this.allData.inneruserdept = item.dname
      } else {
        this.allData.upHeader = item.userName
        this.allData.upHeaderId = item.userId
      }
    },
    getUserIdStatus (item) {
      this.flag6 = item.comFlag
      this.modal6 = item.commodal
    },
    infoRecordChange (val) { // 选择创建表格的类型以及相应输入
      this.infoTemplate = val
      this.data1 = []
      switch (val) {
        case '工作简历': this.infoTemplate = '工作简历'
          this.createInfoRecordTh()
          this.data1 = this.allData.userWorkhis
          break
        case '培训经历': this.infoTemplate = '培训经历'
          this.createInfoRecordTh()
          this.data1 = this.allData.userTrainhis
          // this.data1.push(this.allData.userTrainhis)
          break
        case '教育背景': this.infoTemplate = '教育背景'
          this.createInfoRecordTh()
          this.data1 = this.allData.userStudyhis
          // this.data1.push(this.allData.userStudyhis)
          break
        case '家庭关系': this.infoTemplate = '家庭关系'
          this.createInfoRecordTh()
          this.data1 = this.allData.userFamily
          // this.data1.push(this.allData.userFamily)
          break
        case '语言情况': this.infoTemplate = '语言情况'
          this.createInfoRecordTh()
          this.data1 = this.allData.userLanguage
          // this.data1.push(this.allData.userLanguage)
          break
        case '紧急联系人': this.infoTemplate = '紧急联系人'
          this.createInfoRecordTh()
          this.data1 = this.allData.userUrgent
          // this.data1.push(this.allData.userUrgent)
          break
        case '职称信息': this.infoTemplate = '职称信息'
          this.createInfoRecordTh()
          this.data1 = this.allData.userJobinfo
          // this.data1.push(this.allData.userJobinfo)
          break
      }
    },
    createInfoRecordTh () {
      this.columns1 = []
      this.data1 = []
      let infoItem = this.infoRecordTypeValue
      let infoRecordTh = this.infoRecordTableObj[infoItem]
      infoRecordTh.forEach((item, index) => {
        let obj = {
          title: item[0],
          key: item[1]
        }
        this.columns1.push(obj)
      })
      console.log(this.columns1)
    },
    addItem () {
      let val = this.infoRecordTypeValue
      this.data1 = []
      switch (val) {
        case '工作简历':
          this.userWorkhis.beginDate = currentTime(this.userWorkhis.beginDate)
          this.userWorkhis.endDate = currentTime(this.userWorkhis.endDate)
          this.allData.userWorkhis.push(Object.assign({}, this.userWorkhis))
          this.data1 = this.allData.userWorkhis
          break
        case '培训经历':
          this.userTrainhis.beginDate = currentTime(this.userTrainhis.beginDate)
          this.userTrainhis.endDate = currentTime(this.userTrainhis.endDate)
          this.allData.userTrainhis.push(Object.assign({}, this.userTrainhis))
          this.data1 = this.allData.userTrainhis
          break
        case '教育背景':
          this.userStudyhis.beginDate = currentTime(this.userStudyhis.beginDate)
          this.userStudyhis.endDate = currentTime(this.userStudyhis.endDate)
          this.allData.userStudyhis.push(Object.assign({}, this.userStudyhis))
          this.data1 = this.allData.userStudyhis
          break
        case '家庭关系':
          this.userFamily.birthdate = currentTime(this.userFamily.birthdate)
          this.allData.userFamily.push(Object.assign({}, this.userFamily))
          this.data1 = this.allData.userFamily
          break
        case '语言情况':
          this.allData.userLanguage.push(Object.assign({}, this.userLanguage))
          this.data1 = this.allData.userLanguage
          break
        case '紧急联系人':
          this.allData.userUrgent.push(Object.assign({}, this.userUrgent))
          this.data1 = this.allData.userUrgent
          break
        case '职称信息':
          this.userJobinfo.getDate = currentTime(this.userJobinfo.getDate)
          this.allData.userJobinfo.push(Object.assign({}, this.userJobinfo))
          this.data1 = this.allData.userJobinfo
          break
      }
    },
    removeItem () {
      let val = this.infoRecordTypeValue
      switch (val) {
        case '工作简历':
          let len1 = this.allData.userWorkhis.length - 1
          this.allData.userWorkhis.splice(len1, 1)
          this.data1 = this.allData.userWorkhis
          break
        case '培训经历':
          let len2 = this.allData.userTrainhis.length - 1
          this.allData.userTrainhis.splice(len2, 1)
          this.data1 = [].concat(this.allData.userTrainhis)
          break
        case '教育背景':
          let len3 = this.allData.userStudyhis.length - 1
          this.allData.userStudyhis.splice(len3, 1)
          this.data1 = [].concat(this.allData.userStudyhis)
          break
        case '家庭关系':
          let len4 = this.allData.userFamily.length - 1
          this.allData.userStudyhis.splice(len4, 1)
          this.data1 = [].concat(this.allData.userFamily)
          break
        case '语言情况':
          let len5 = this.allData.userLanguage.length - 1
          this.allData.userLanguage.splice(len5, 1)
          this.data1 = [].concat(this.allData.userLanguage)
          break
        case '紧急联系人':
          let len6 = this.allData.userUrgent.length - 1
          this.allData.userUrgent.splice(len6, 1)
          this.data1 = [].concat(this.allData.userUrgent)
          break
        case '职称信息':
          let len7 = this.allData.userJobinfo.length - 1
          this.allData.userJobinfo.splice(len7, 1)
          this.data1 = [].concat(this.allData.userJobinfo)
          break
      }
    },
    save () {
      this.timeFormatting()
      let params = this.allData
      this.$Loading.start()
      postPersonData(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$Loading.finish()
          this.$router.go(0)
        } else {
          this.$Loading.finish()
          this.$Message.warning(res.msg)
        }
      }).catch(err => {
        this.$Message.warning('数据操作异常！')
        this.$Loading.finish()
        throw err
      })
    },
    timeFormatting () {
      this.allData.idcardkindid ? this.allData.idcardkindid = currentTime(this.allData.idcardkindid) : this.allData.idcardkindid = ''
      this.allData.birthdate ? this.allData.birthdate = currentTime(this.allData.birthdate) : this.allData.birthdate = ''
      this.allData.startworkdata ? this.allData.startworkdata = currentTime(this.allData.startworkdata) : this.allData.startworkdata = ''
      this.allData.toBeWorkDate ? this.allData.toBeWorkDate = currentTime(this.allData.toBeWorkDate) : this.allData.toBeWorkDate = ''
      this.allData.healhDate ? this.allData.healhDate = currentTime(this.allData.healhDate) : this.allData.healhDate = ''
      this.allData.beginWorkDate ? this.allData.beginWorkDate = currentTime(this.allData.beginWorkDate) : this.allData.beginWorkDate = ''
      this.allData.lastworkdate ? this.allData.lastworkdate = currentTime(this.allData.lastworkdate) : this.allData.lastworkdate = ''
    }
  },
  components: {
    departmentQuery,
    companyQuery,
    jobQuery,
    userIdQuery
  }
}
</script>

<style>
.person {
  height: 100%;
}
.person_tabpane {
  min-height: 780px;
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
