import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入vue路由
import VueRouter from "vue-router"
//use一下
Vue.use(VueRouter)
//导入需要通过路由管理的组件
import discovery from "./components/views/discovery.vue"
import playlist from "./components/views/playlist.vue"
import newSong from "./components/views/newSong.vue"
import newMV from "./components/views/newMV.vue"
import search from "./components/views/search.vue"

//创建路由
let router = new VueRouter({
  routes:[
    {
      path:"/",
      component:discovery
    },
    //配置地址和组件的对应关系
    {
      //地址
      path:"/discovery",
      //组件
      component:discovery
    },
    {
      path:"/playlist",
      component:playlist
    },
    {
      path:"/newSong",
      component:newSong
    },
    {
      path:"/newMV",
      component:newMV
    },
    {
      path:"/search",
      component:search
    }
  ]
})

//导入element-ui
import ElementUI from "element-ui"
//导入elemen-ui 的样式
import 'element-ui/lib/theme-chalk/index.css';
//use一下
Vue.use(ElementUI)

// 导入全局初始化样式
import './assets/index.css'

new Vue({
  render: h => h(App),
  //挂载到vue实例上
  router
}).$mount('#app')
