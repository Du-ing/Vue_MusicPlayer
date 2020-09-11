<template>
  <div class="index">
		<!--左侧导航-->
		<div class="nav">
			<ul>
				<li>
					<router-link to="/discovery">发现音乐</router-link>
				</li>
				<li>
					<router-link to="/playlist">推荐歌单</router-link>
				</li>
				<li>
					<router-link to="/newSong">最新音乐</router-link>
				</li>
				<li>
					<router-link to="/newMV">最新MV</router-link>
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
			<span>正在播放：</span>
			<span>{{"《"+musicName+"》~ "}}</span>
			<span>{{singer}}</span>
		</div>

		<!--播放器-->
		<div class="player">
			<audio :src="musicUrl" controls autoplay></audio>
		</div>
  </div>
</template>

<script>

export default {
	name:"index",
	data(){
		return{
			musicUrl:"http://duing.site/wp-content/uploads/2020/09/鎖那-さな-言葉のいらない約束-无需言语的约定.mp3",
			//歌曲名
			musicName:"さな-言葉のいらない約束",
			//歌手
			singer:"鎖那"
		}
	}
}
</script>
	
<style>
</style>