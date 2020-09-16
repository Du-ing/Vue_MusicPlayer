<template>
  <div class="index">
    <!--左侧导航-->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <i class="el-icon-position"></i>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlist">
            <i class="el-icon-present"></i>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/newSong">
            <i class="el-icon-headset"></i>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/newMV">
            <i class="el-icon-film"></i>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <!--右侧主体区域-->
    <div class="main">
      <!--路由的出口 地址命中之后，组件显示的位置-->
      <router-view></router-view>
    </div>

    <!--歌曲信息-->
    <div class="musicInfo">
      <span class="info">正在播放：</span>
      <span class="info">{{"《"+musicName+"》~ "}}</span>
      <span class="info">{{singer}}</span>
    </div>

    <!--播放器-->
    <div class="player">
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      musicUrl: "",
      //歌曲名
      musicName: "",
      //歌手
      singer: "",
    };
  },
};
</script>
	
<style>
</style>