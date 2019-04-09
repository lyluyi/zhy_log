<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <!-- 组件重复渲染的情况下，可以应用缓存 -->
      <!-- <keep-alive>  -->
      <router-view />
      <!-- </keep-alive>   -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
  // provide () {
  //   return {
  //     reload: this.reload
  //   }
  // },
  // data () {
  //   return {
  //     isRouterAlive: true
  //   }
  // },
  // methods: {
  //   reload () {
  //     this.isRouterAlive = false
  //     this.$nextTick(function () {
  //       this.isRouterAlive = true
  //     })
  //   }
  // }
  // mounted () {
  //   let app = document.querySelector('#app')
  //   window.addEventListener('scroll', this.handleScroll, true)
  // },
  // methods: {
  //   handleScroll (e) {
  //     console.log(e)
  //   }
  // }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}

/* display: table; -。-*/
/* .ivu-input-group { display: inline-flex; } */
/* .ivu-input-group-append { display: inline-flex; width: auto; } */
/* transform: translate(0, 0); */
/* .ivu-input-search { padding: 7px 8px; position: absolute; right: 0; } */
/* .ivu-input-group-append, .ivu-input-group-prepend { width: auto; } */
/* .ivu-input-group { position: relative; display: block; } */

/* .ivu-select-dropdown { top: 44px !important; } */
/* .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover { background: #8fa2cc !important;  } */
/* .ivu-breadcrumb>span:last-child { font-weight:normal;  } */
</style>
