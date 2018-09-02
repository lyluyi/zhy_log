<template>
  <div>
  </div>
</template>
<script>
export default {
  data () {
    return {
          UserWorkhis: {
          userId: '', // 员工工号 
          beginDate: '', // 开始日期
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
  },
  created () {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style>

</style>
