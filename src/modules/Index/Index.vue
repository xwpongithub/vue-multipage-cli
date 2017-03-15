<template>
  <div class="app">
    {{message}}
    <br>
    <a href="#">首页</a>
    <a href="pages/user.html">用户中心</a>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  .app
    display:flex
</style>
<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        message: 'Hello Vue!'
      };
    }
  };
</script>
