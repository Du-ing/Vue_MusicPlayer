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
		<!--播放器-->
		<div>
			<audio src="playerUrl" controls autoplay></audio>
		</div>
  </div>
</template>

<script>

export default {
	name:"index",
	data(){
		return{
			playerUrl:"http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3"
		}
	}
}
</script>
	
<style>
</style>