<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <!-- 组件重复渲染的情况下，可以应用缓存 -->
      <!-- <keep-alive>  -->
      <router-view/>
      <!-- </keep-alive>   -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
.mt10{ margin-bottom: 10px; }
.mt20{ margin-top: 20px; }
.mb10{ margin-bottom: 10px; }
.mb20{ margin-bottom: 20px; }
.ml10{ margin-left: 10px; }
.ml20{ margin-left: 20px; }
.mr10{ margin-right: 10px; }
.mr20{ margin-right: 20px; }
.pt10{ padding-bottom: 10px; }
.pt20{ padding-top: 20px; }
.pb10{ padding-bottom: 10px; }
.pb20{ padding-bottom: 20px; }
.pl10{ padding-left: 10px; }
.pl20{ padding-left: 20px; }
.pr10{ padding-right: 10px; }
.pr20{ padding-right: 20px; }
.wd{ min-width: 128px; }
.tr{ text-align: right; }
.tc{ text-align: center }
.tl{ text-align: left; }
.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ { opacity: 0; }
.col_flex { display: flex !important;}

 /* iview.css 样式*/
.ivu-layout-header { background: #fff !important; box-shadow: 0 2px 1px 1px hsla(0,0%,39%,.1) !important; z-index: 999; }
/* .ivu-menu-dark { background: #fff; } */
.layout-logo { background: #fff; }
.ivu-layout { background: transparent; }
.ivu-menu-horizontal.ivu-menu-light:after { display: none !important; }
.ivu-date-picker{ width: 100% !important; }
.ivu-btn { font-size: 14px !important; }
.ivu-checkbox-wrapper { font-size: 14px; }
.ivu-input{ font-size: 14px; }
.ivu-modal { width: 666px !important; }
.ivu-input-number.ivu-input-number-default { width: 100%;font-size: 14px; }
.ivu-layout-content{ box-shadow: 0 2px 30px 7px hsla(0,0%,39%,.1) !important; }
.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value { font-size: 14px; }
.ivu-radio-wrapper { font-size: 14px; vertical-align: -9px; }
.ivu-transfer { margin: 0 auto; }
.ivu-transfer-list { width: 300px !important; height: 340px !important; font-size: 14px !important; }
.ivu-transfer-list-content-item { font-size: 14px !important; }
.ivu-tree-title { padding: 4px 24px 4px 20px !important; font-size: 14px; margin-left: 10px !important;}
.ivu-icon-md-arrow-dropright:before { content: "\F341"; font-size: 29px; }
/* .ivu-input-group { width: 75% !important; } */
/* .ivu-select-dropdown { top: 44px !important; } */
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover { background: #8fa2cc !important;  }
.ivu-breadcrumb>span:last-child { font-weight:normal;  }
</style>
