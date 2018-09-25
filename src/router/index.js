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
          path: 'OAReport',
          name: 'OAReport',
          meta: {
            title: 'OA报表',
            content: true
          },
          component: (resolve) => require(['../components/right/OAReport.vue'], resolve)
        }
      ]
    }
  ]
})

export default router
