import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
        title: '首页'
      },
      component: (resolve) => require(['../components/home/home.vue'], resolve),
      children: [
        {
          path: 'person',
          name: 'person',
          meta: {
          },
          component: (resolve) => require(['../components/personInfo/person.vue'], resolve)
        },
        {
          path: 'company',
          name: 'company',
          meta: {
          },
          component: (resolve) => require(['../components/personInfo/company.vue'], resolve)
        },
        {
          path: 'department',
          name: 'department',
          meta: {
          },
          component: (resolve) => require(['../components/personInfo/department.vue'], resolve)
        },
        {
          path: 'job',
          name: 'job',
          meta: {
          },
          component: (resolve) => require(['../components/personInfo/job.vue'], resolve)
        },
        {
          path: 'contract',
          name: 'contract',
          meta: {
          },
          component: (resolve) => require(['../components/personInfo/contract.vue'], resolve)
        },
        {
          path: 'companyStruct',
          name: 'companyStruct',
          meta: {
          },
          component: (resolve) => require(['../components/stanceManagement/companyStruct.vue'], resolve)
        },
        {
          path: 'userLog',
          name: 'userLog',
          meta: {
          },
          component: (resolve) => require(['../components/stanceManagement/userLog.vue'], resolve)
        },
        {
          path: 'role',
          name: 'role',
          meta: {
          },
          component: (resolve) => require(['../components/right/role.vue'], resolve)
        },
        {
          path: 'roleAdmin',
          name: 'roleAdmin',
          meta: {
          },
          component: (resolve) => require(['../components/right/roleAdmin.vue'], resolve)
        },
        {
          path: 'userAdmin',
          name: 'userAdmin',
          meta: {
          },
          component: (resolve) => require(['../components/right/userAdmin.vue'], resolve)
        },
        {
          path: 'jobDevice',
          name: 'jobDevice',
          meta: {
          },
          component: (resolve) => require(['../components/right/jobDevice.vue'], resolve)
        }
      ]
    }
  ]
})
