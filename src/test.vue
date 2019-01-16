<template>
  <div>
  </div>
</template>
<script>
export default {
  data () {
    return {
          UserWorkhis: {
          userId: '32131', // 员工工号 
          beginDate: 'aaaa', // 开始日期
          endDate: '',  // 结束日期
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
          endDate: '',  // 结束日期
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
        }, // 
        UserJobinfo: {
          userId: '', // 员工工号
          jobinfo: '', // 职称信息
          getDate: '', // 获得时间
          company: '', // 所在公司
          description: '',// 描述
          remark: '' // 备注  
        } // 职称信息
      }
    }
USER_NAME	N	VARCHAR2(20)	Y			员工姓名
ASK_FOR_DATE	N	DATE	Y			申请时间
STARTWORKDATE	N	DATE	Y			入司时间
CID	N	VARCHAR2(50)	Y			公司ID
CNAME	N	VARCHAR2(50)	Y			公司名称
DID	N	VARCHAR2(50)	Y			部门id
DNAME	N	VARCHAR2(50)	Y			部门名称
USER_STATUS	N	VARCHAR2(50)	Y			员工状态
RETURN_ASK	N	VARCHAR2(50)	Y			回聘申请
D_OLD_OPINION	N	VARCHAR2(50)	Y			原用人部门意见 
D_NEW_OPINION	N	VARCHAR2(50)	Y			回聘部门意见 
HR_OPINION	N	VARCHAR2(50)	Y			HR部门意见
OPERATOR_ID	N	VARCHAR2(50)	Y			操作人
OPER_DATE	N	DATE	Y			操作时间
APPROVER_ID	N	VARCHAR2(20)	Y			审批人
APP_DATE	N	DATE	Y			审批时间
ID	N	VARCHAR2(32)	N			id
REMARK	N	VARCHAR2(100)	Y			备注
JOB_ID	N	VARCHAR2(50)	Y			职位ID
ANNUITY_START_DATE	N	DATE	Y			年金起算日期
OLD_USER_ID	N	VARCHAR2(50)	Y			老用户id
  },
  created () {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style>

</style>
