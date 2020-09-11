<template>
  <div class="top">
    <div class="left-box">
      <div class="icon-wrapper">
        <el-avatar
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599813288576&di=6498214909cb59bf61baa98acb8beb4d&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F17%2F20200217005315_yfoqe.thumb.400_0.png"
        ></el-avatar>
        <el-row class="el-row">
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-link type="primary" class="el_link1">Duing的音乐播放器</el-link>
          <el-link type="warning" class="el_link2">QQ:2385790938</el-link>
        </el-row>
      </div>
    </div>

    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <!-- 搜索框 -->
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toSearch"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      inputValue: "", //输入的搜索内容
    };
  },
  methods: {
    toSearch() {
      //如果为空 提示
      if (this.inputValue == "") {
        this.$message.error("请输入关键字！");
      }
      //不为空 跳转
      else {
        this.$router.push(`/search?q=${this.inputValue}`);
      }
    },
  },
};
</script>

<style>
</style>