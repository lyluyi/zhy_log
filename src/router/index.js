import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: (resolve) => require(['../components/login/login.vue'], resolve)
    },
    {
      path: '/ZHYFF',
      meta: {
        title: '费控'
      },
      component: (resolve) => require(['../components/ZHYFF/ZHYFF.vue'], resolve),
      children: [
        {
          path: '/',
          redirect: { name: 'companyBudget' }
        },
        {
          path: 'exchangeManegement',
          name: 'exchangeManegement',
          meta: {
            title: '汇率管理',
            content: true
          },
          component: (resolve) => require(['../components/ZHYFF/components/exchangeManegement.vue'], resolve)
        },
        {
          path: 'BPCVersions',
          name: 'BPCVersions',
          meta: {
            title: 'BPC版本管理',
            content: true
          },
          component: (resolve) => require(['../components/ZHYFF/components/BPCVersions.vue'], resolve)
        },
        {
          path: 'areaBudget',
          name: 'areaBudget',
          meta: {
            title: '片区预算',
            content: true
          },
          component: (resolve) => require(['../components/ZHYFF/components/areaBudget.vue'], resolve)
        },
        {
          path: 'companyBudget',
          name: 'companyBudget',
          meta: {
            title: '公司预算',
            content: true
          },
          component: (resolve) => require(['../components/ZHYFF/components/companyBudget.vue'], resolve)
        },
        {
          path: 'departmentBudget',
          name: 'departmentBudget',
          meta: {
            title: '部门预算',
            content: true
          },
          component: (resolve) => require(['../components/ZHYFF/components/departmentBudget.vue'], resolve)
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        content: true
      },
      component: (resolve) => require(['../components/home/home.vue'], resolve),
      children: [
        {
          path: 'person',
          name: 'person',
          meta: {
            title: '人员',
            content: true
          },
          component: (resolve) => require(['../components/personInfo/person.vue'], resolve)
        },
        {
          path: 'company',
          name: 'company',
          meta: {
            title: '公司',
            content: true
          },
          component: (resolve) => require(['../components/personInfo/company.vue'], resolve)
        },
        {
          path: 'department',
          name: 'department',
          meta: {
            title: '部门',
            content: true
          },
          component: (resolve) => require(['../components/personInfo/department.vue'], resolve)
        },
        {
          path: 'job',
          name: 'job',
          meta: {
            title: '职位',
            content: true
          },
          component: (resolve) => require(['../components/personInfo/job.vue'], resolve)
        },
        {
          path: 'contract',
          name: 'contract',
          meta: {
            title: '合同',
            content: true
          },
          component: (resolve) => require(['../components/personInfo/contract.vue'], resolve)
        },
        {
          path: 'companyStruct',
          name: 'companyStruct',
          meta: {
            title: '公司组织',
            content: true
          },
          component: (resolve) => require(['../components/stanceManagement/companyStruct.vue'], resolve)
        },
        {
          path: 'userLog',
          name: 'userLog',
          meta: {
            title: '日志',
            content: true
          },
          component: (resolve) => require(['../components/stanceManagement/userLog.vue'], resolve)
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          meta: {
            title: '人员信息',
            content: true
          },
          component: (resolve) => require(['../components/stanceManagement/userInfo.vue'], resolve)
        },
        {
          path: 'role',
          name: 'role',
          meta: {
            title: '角色菜单',
            content: true
          },
          component: (resolve) => require(['../components/right/role.vue'], resolve)
        },
        {
          path: 'roleAdmin',
          name: 'roleAdmin',
          meta: {
            title: '角色管理',
            content: true
          },
          component: (resolve) => require(['../components/right/roleAdmin.vue'], resolve)
        },
        {
          path: 'userAdmin',
          name: 'userAdmin',
          meta: {
            title: '用户管理',
            content: true
          },
          component: (resolve) => require(['../components/right/userAdmin.vue'], resolve)
        },
        {
          path: 'jobDevice',
          name: 'jobDevice',
          meta: {
            title: '职位配置',
            content: true
          },
          component: (resolve) => require(['../components/right/jobDevice.vue'], resolve)
        },
        {
          path: 'usertel',
          name: 'usertel',
          meta: {
            title: '人员联系方式',
            content: true
          },
          component: (resolve) => require(['../components/right/usertel.vue'], resolve)
        },
        {
          path: 'dictIndex',
          name: 'dictIndex',
          meta: {
            title: '数据字典',
            content: true
          },
          component: (resolve) => require(['../components/right/dictIndex.vue'], resolve)
        },
        {
          path: 'OAReport',
          name: 'OAReport',
          meta: {
            title: 'OA报表',
            content: true
          },
          component: (resolve) => require(['../components/right/OAReport.vue'], resolve)
        },
        {
          path: 'dimission',
          name: 'dimission',
          meta: {
            title: '离职',
            content: true
          },
          component: (resolve) => require(['../components/personManger/dimission.vue'], resolve)
        },
        {
          path: 'dimissionAudit',
          name: 'dimissionAudit',
          meta: {
            title: '离职',
            content: true
          },
          component: (resolve) => require(['../components/personManger/dimissionAudit.vue'], resolve)
        },
        {
          path: 'dimissionView',
          name: 'dimissionView',
          meta: {
            title: '离职',
            content: true
          },
          component: (resolve) => require(['../components/personManger/dimissionView.vue'], resolve)
        },
        {
          path: 'fullMember',
          name: 'fullMember',
          meta: {
            title: '转正',
            content: true
          },
          component: (resolve) => require(['../components/personManger/fullMember.vue'], resolve)
        },
        {
          path: 'fullMemberAudit',
          name: 'fullMemberAudit',
          meta: {
            title: '转正审批',
            content: true
          },
          component: (resolve) => require(['../components/personManger/fullMemberAudit.vue'], resolve)
        },
        {
          path: 'fullMemberView',
          name: 'fullMemberView',
          meta: {
            title: '转正审批',
            content: true
          },
          component: (resolve) => require(['../components/personManger/fullMemberView.vue'], resolve)
        },
        {
          path: 'jobChange',
          name: 'jobChange',
          meta: {
            title: '岗位变动',
            content: true
          },
          component: (resolve) => require(['../components/personManger/jobChange.vue'], resolve)
        },
        {
          path: 'jobChangeAudit',
          name: 'jobChangeAudit',
          meta: {
            title: '岗位变动审批',
            content: true
          },
          component: (resolve) => require(['../components/personManger/jobChangeAudit.vue'], resolve)
        },
        {
          path: 'jobChangeView',
          name: 'jobChangeView',
          meta: {
            title: '岗位变动审批查看',
            content: true
          },
          component: (resolve) => require(['../components/personManger/jobChangeView.vue'], resolve)
        },
        {
          path: 'reEmploy',
          name: 'reEmploy',
          meta: {
            title: '回聘',
            content: true
          },
          component: (resolve) => require(['../components/personManger/reEmploy.vue'], resolve)
        },
        {
          path: 'reEmployAudit',
          name: 'reEmployAudit',
          meta: {
            title: '回聘审批',
            content: true
          },
          component: (resolve) => require(['../components/personManger/reEmployAudit.vue'], resolve)
        },
        {
          path: 'reEmployView',
          name: 'reEmployView',
          meta: {
            title: '回聘审批查看',
            content: true
          },
          component: (resolve) => require(['../components/personManger/reEmployView.vue'], resolve)
        },
        {
          path: 'transfer',
          name: 'transfer',
          meta: {
            title: '转编',
            content: true
          },
          component: (resolve) => require(['../components/personManger/transfer.vue'], resolve)
        },
        {
          path: 'transferAudit',
          name: 'transferAudit',
          meta: {
            title: '转编审批',
            content: true
          },
          component: (resolve) => require(['../components/personManger/transferAudit.vue'], resolve)
        },
        {
          path: 'transferView',
          name: 'transferView',
          meta: {
            title: '转编审批查看',
            content: true
          },
          component: (resolve) => require(['../components/personManger/transferView.vue'], resolve)
        },
        {
          path: 'useraudit',
          name: 'useraudit',
          meta: {
            title: '人员变动审核',
            content: true
          },
          component: (resolve) => require(['../components/personManger/userAudit.vue'], resolve)
        },
        {
          path: 'userAuditView',
          name: 'userAuditView',
          meta: {
            title: '人员变动审核查看',
            content: true
          },
          component: (resolve) => require(['../components/personManger/userAuditView.vue'], resolve)
        }
      ]
    }
  ]
})

export default router
