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
			<audio src="playerUrl"></audio>
		</div>
  </div>
</template>

<script>

export default {
	name:"index",
	data(){
		return{
			playerUrl:""
		}
	}
}
</script>
	
<style>
</style>