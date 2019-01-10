// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import filters from './filter'

// import './theme/index.less'

Vue.prototype.$axios = axios

Vue.use(iView)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// title匹配 mobile
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('userId')) { // 判断当前的token是否存在
      next()
    } else {
      next('/login') // 将跳转的路由path作为参数，登录成功后跳转到该路由
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
