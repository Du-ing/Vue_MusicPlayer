<template>
  <div>
    <!--头部组件-->
    <top></top>
    <!--主题组件-->
    <index></index>
  </div>
</template>

<script>
import top from "./components/top.vue";
import index from "./components/index.vue";

export default {
  //注册组件
  components: {
    top,
    index,
  },
};
</script>

<style>
</style>