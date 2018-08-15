import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/components/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: () => import('@/components/home/home.vue')
      // children: [
      //   {
      //     path: 'test',
      //     name: 'test',
      //     meta: {
      //     },
      //     component: () => import('@/views/test/test.vue')
      //   }
      // ]
    }
  ]
})
