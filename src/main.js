import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
// import filters from './filter'

// import './theme/index.less'

Vue.prototype.$axios = axios

Vue.use(iView)

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

// title匹配 mobile
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('userId')) { // 判断当前的token是否存在
      let menuData = JSON.parse(localStorage.getItem('menuList'))
      let menuNameList = ['login']
      menuData.forEach(item => {
        let subMenuList = item.children
        for (let i = 0; i < subMenuList.length; i++) {
          menuNameList.push(subMenuList[i].menu_URL)
        }
      })
      debugger
      if (menuNameList.indexOf('dimission') > -1) {
        menuNameList = ['dimissionAudit', 'dimissionView', ...menuNameList]
      }
      if (menuNameList.indexOf('fullMember') > -1) {
        menuNameList = ['fullMemberAudit', 'fullMemberView', ...menuNameList]
      }
      if (menuNameList.indexOf('jobChange') > -1) {
        menuNameList = ['jobChangeAudit', 'jobChangeView', ...menuNameList]
      }
      if (menuNameList.indexOf('reEmploy') > -1) {
        menuNameList = ['reEmployAudit', 'reEmployView', ...menuNameList]
      }
      if (menuNameList.indexOf('transfer') > -1) {
        menuNameList = ['transferAudit', 'transferView', ...menuNameList]
      }
      if (menuNameList.indexOf('transfer') > -1) {
        menuNameList = ['transferAudit', 'transferView', ...menuNameList]
      }
      if (menuNameList.indexOf('transfer') > -1) {
        menuNameList = ['transferAudit', 'transferView', ...menuNameList]
      }
      // console.log(menuNameList)
      if (menuNameList.indexOf('ZHYFF') > -1) {
        menuNameList = ['areaBudget', 'companyBudget', 'companyDeptBudget', 'departmentBudget', 'exchangeManegement', 'adjustBudget', 'BPCVersions', ...menuNameList]
      }
      if (menuNameList.indexOf(to.name) > -1) {
        // if (to.name === 'companyBudget') {
        //   next()
        // }
        // next()
      } else {
        next('/login')
      }
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
