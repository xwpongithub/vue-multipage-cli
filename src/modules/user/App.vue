<template>
  <div class="user">
    <h2>用户中心</h2>
    <a href="/">跳转到首页</a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      console.log(location.search);
    }
  };
</script>

<style></style>
