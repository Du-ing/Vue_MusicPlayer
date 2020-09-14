<template>
  <div class="mv">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{mvInfo.publishTime}}</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <!-- 描述 -->
          <p class="desc">{{ mvInfo.desc }}</p>
        </div>
      </div>
      <!-- 热门评论 -->
      <div class="comment-wrap">
        <p class="title">
          热门评论
          <span class="number">({{hotTotal}})</span>
        </p>
        <div class="comments-wrap" v-for="(item,index) in hotComments" :key="index">
          <div class="item">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论
          <span class="number">({{total}})</span>
        </p>
        <div class="comments-wrap" v-for="(item,index) in comments" :key="index">
          <div class="item">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length!=0">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
      ></el-pagination>
    </div>

    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div v-for="(item, index) in simiMvs" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont icon-play">
                <i class="el-icon-video-play"></i>
              </span>
              <div class="num-wrap">
                <div class="iconfont icon-play">
                  <i class="el-icon-video-play"></i>
                </div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      // 总评论条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv地址
      url: "",
      // 相关mv
      simiMvs: [],
      // mv的信息
      mvInfo: {},
      // 头像
      icon: "",
      //最新评论
      comments: [],
      //热门评论
      hotComments: [],
      //热门评论数
      hotTotal: 0,
    };
  },
  created() {
    this.doCreated();
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          // 根据页码计算
          offset: (this.page - 1) * 10,
        },
      }).then((res) => {
        // console.log(res)
        for (let i = 0; i < res.data.comments.length; i++) {
          var date = new Date(res.data.comments[i].time);
          // 格式化日期
          res.data.comments[i].time = date.toLocaleString();
        }
        // 总个数
        this.total = res.data.total;
        // 评论数据
        this.comments = res.data.comments;
      });
    },

    doCreated() {
      // 获取mv播放地址
      axios({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          // 获取url中的 id
          id: this.$route.query.q,
        },
      }).then((res) => {
        // console.log(res)
        this.url = res.data.data.url;
      });
      // 获取 相关的mv
      axios({
        url: "https://autumnfish.cn/simi/mv",
        method: "get",
        params: {
          mvid: this.$route.query.q,
          limit: 10,
        },
      }).then((res) => {
        //console.log("相关",res)
        // 保存相关MV
        this.simiMvs = res.data.mvs;

        // 处理时长 毫秒 转为 分秒
        for (let i = 0; i < this.simiMvs.length; i++) {
          // 获取 总毫秒数
          let duration = this.simiMvs[i].duration;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.simiMvs[i].duration = `${min}:${sec}`;
        }
      });

      // 获取 mv的信息
      axios({
        url: "https://autumnfish.cn/mv/detail",
        method: "get",
        params: {
          mvid: this.$route.query.q,
        },
      }).then((res) => {
        //console.log(res)
        // mv的信息
        this.mvInfo = res.data.data;
        // 获取 歌手信息
        axios({
          url: "https://autumnfish.cn/artists",
          method: "get",
          params: {
            id: this.mvInfo.artists[0].id,
          },
        }).then((res) => {
          // console.log(res);
          // 歌手的封面信息
          this.icon = res.data.artist.picUrl;
        });
      });

      // 获取评论数据
      axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          offset: 0,
        },
      }).then((res) => {
        //console.log(res)
        for (let i = 0; i < res.data.comments.length; i++) {
          var date = new Date(res.data.comments[i].time);
          // 格式化日期
          res.data.comments[i].time = date.toLocaleString();
        }

        this.total = res.data.total;
        this.comments = res.data.comments;

        for (let i = 0; i < res.data.hotComments.length; i++) {
          var date = new Date(res.data.hotComments[i].time);
          // 格式化日期
          res.data.hotComments[i].time = date.toLocaleString();
        }
        this.hotComments = res.data.hotComments;
        this.hotTotal = res.data.hotComments.length;
      });
    },

    toMV(id) {
      //console.log(id);
      this.$router.push(`/mv?q=${id}`);
      this.doCreated();
    },
  },
};
</script>

<style></style>
