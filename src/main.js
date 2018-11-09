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
//   if (to.name !== 'login') {
//     let menuArr = JSON.parse(localStorage.getItem('menuList'))
//     let checkArr = []
//     menuArr.forEach((item) => {
//       item.children.forEach((item) => {
//         checkArr.push(item.menu_URL)
//       })
//       console.log(checkArr)
//       return checkArr
//     })
//     // console.log(to)
//     // console.log(checkArr.indexOf(to.name))
//     // console.log(checkArr.indexOf(to.name))
//     debugger
//     checkArr.forEach((item) => {
//       if (item === to.name) { // 因为默认进去的是company 所以没有正确匹配的
//         next()
//       } else {
//         return false
//       }
//     })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
