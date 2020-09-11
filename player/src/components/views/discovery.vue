<template>
  <div class="discovery">
    <!--轮播图-->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>

    <!--推荐歌单-->
    <div class="recommend">
      <h3 class="title">
        ====推荐歌单====
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in tuijian" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play">
              <i class="el-icon-service"></i>
            </span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        ====最新音乐====
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play">
              <i class="el-icon-service"></i>
            </span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">====推荐MV====</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play">
              <i class="el-icon-video-play"></i>
            </span>
            <div class="num-wrap">
              <div class="iconfont icon-play">
                <i class="el-icon-video-play"></i>
              </div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
//导入axios
import axios from "axios"

export default {
  name:"discovery",
  data(){
    return{
      banners:[], //轮播图
      tuijian:[],  //推荐歌单
      songs:[], //最新音乐
      mvs:[]  //最新MV
    }
  },
  created(){
    //轮播图接口
    axios({
      url:"https://autumnfish.cn/banner",
      method:"get",
    }).then(res=>{
      this.banners = res.data.banners
    })

    //获取每日推荐歌单
    axios({
      url:"https://autumnfish.cn/personalized",
      method:"get",
      params:{
        limit:12
      }
    }).then(res=>{
      this.tuijian = res.data.result
    })

    //获取最新音乐
    axios({
      url:"https://autumnfish.cn/personalized/newsong",
      method:"get",
    }).then(res=>{
      this.songs = res.data.result
    })

    //获取最新MV
    axios({
      url:"https://autumnfish.cn/personalized/mv",
      method:"get",
    }).then(res=>{
      this.mvs = res.data.result
    })
  }
};
</script>

<style></style>