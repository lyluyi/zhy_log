// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
// import './theme/index.less'

Vue.prototype.$axios = axios

Vue.use(iView)

Vue.config.productionTip = false

// title匹配 mobile

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面meta */
//   if (to.meta.content) {
//     let head = document.getElementsByTagName('head')
//     let meta = document.createElement('meta')
//     meta.content = to.meta.content
//     head[0].appendChild(meta)
//   }
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
