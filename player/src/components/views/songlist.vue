<template>
  <div class="songlist">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" alt />
          <span class="name">{{ playlist.creator.nickname }}</span>
          <span class="time">{{ playlist.createTime}} 创建</span>
        </div>
        <div class="play-wrap">
          <span
            class="iconfont icon-circle-play"
            @click="playMusic(songlist[0].id,songlist[0].name,songlist[0].ar[0].name)"
          >
            <i class="el-icon-video-play"></i>
          </span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item,index) in songlist"
              :key="index"
              @dblclick="playMusic(item.id,item.name,item.ar[0].name)"
            >
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item.id,item.name,item.ar[0].name)">
                  <img :src="item.al.picUrl" alt />
                  <span class="iconfont icon-play">
                    <i class="el-icon-video-play"></i>
                  </span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`" name="2">
        <!-- 热门评论 -->
        <div class="comment-wrap">
          <p class="title">
            热门评论
            <span class="number">( {{hotCount}} )</span>
          </p>
          <div class="comments-wrap" v-if="hotComment.length != 0">
            <!-- 评论 -->
            <div v-for="(item, index) in hotComment" :key="index" class="item">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
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
            <span class="number">( {{total}} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      activeIndex: "1",
      // 最新评论总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单详情数据
      playlist: {},
      // 热门评论
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 最新评论
      comments: [],
      //歌单的歌曲列表
      songlist: [],
    };
  },
  created() {
    // 获取歌单详情
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      //console.log(res.data)
      // 根据毫秒数构建 Date 对象
      var date = new Date(res.data.playlist.createTime);
      // 格式化日期
      res.data.playlist.createTime = date.toLocaleString();
      this.playlist = res.data.playlist;
    });

    //获取歌单歌曲列表
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      //console.log(res.data);
      this.songlist = res.data.playlist.tracks;

      // 处理时长 毫秒 转为 分秒
      for (let i = 0; i < this.songlist.length; i++) {
        // 获取 总毫秒数
        let duration = this.songlist[i].dt;
        let min = parseInt(duration / 1000 / 60);
        if (min < 10) {
          min = "0" + min;
        }
        let sec = parseInt((duration / 1000) % 60);
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.songlist[i].dt = `${min}:${sec}`;
      }
    });

    // 获取 热门评论
    axios({
      url: "https://autumnfish.cn/comment/hot",
      method: "get",
      params: {
        id: this.$route.query.q,
        // 传递类型
        type: 2,
        limit: 10,
      },
    }).then((res) => {
      //console.log(res)
      for (let i = 0; i < res.data.hotComments.length; i++) {
        var date = new Date(res.data.hotComments[i].time);
        // 格式化日期
        res.data.hotComments[i].time = date.toLocaleString();
      }
      this.hotComment = res.data.hotComments;
      // 保存个数
      this.hotCount = res.data.total;
    });

    // 获取 最新评论
    axios({
      url: "https://autumnfish.cn/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0,
      },
    }).then((res) => {
      //console.log(res.data)
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
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      axios({
        url: "https://autumnfish.cn/comment/playlist",
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

    // 播放歌曲
    playMusic(id, name, singer) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id, // id:id
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        // 直接获取父组件，可以修改任意的值
        this.$parent.musicUrl = url;
        // 设置播放歌曲信息
        this.$parent.musicName = name;
        this.$parent.singer = singer;
      });
    },
  },
};
</script>

<style></style>
