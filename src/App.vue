<template>
  <div id="app">
    <router-view/>
    <!-- <button type="primary"></button> -->
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
.mt10{
  margin-bottom: 10px;
}
.mt20{
  margin-top: 20px;
}
.mb10{
  margin-bottom: 10px;
}
.mb20{
  margin-bottom: 20px;
}
.ml10{
  margin-left: 10px;
}
.ml20{
  margin-left: 20px;
}
.mr10{
  margin-right: 10px;
}
.mr20{
  margin-right: 20px;
}
.pt10{
  padding-bottom: 10px;
}
.pt20{
  padding-top: 20px;
}
.pb10{
  padding-bottom: 10px;
}
.pb20{
  padding-bottom: 20px;
}
.pl10{
  padding-left: 10px;
}
.pl20{
  padding-left: 20px;
}
.pr10{
  padding-right: 10px;
}
.pr20{
  padding-right: 20px;
}
.wd{
  min-width: 128px;
}
.tr{
  text-align: right;
}
.tc{
  text-align: center
}
.tl{
  text-align: left;
}
</style>
