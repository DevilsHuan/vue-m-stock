import Vue from 'vue'
import Router from 'vue-router'
// 启动路由
Vue.use(Router)
const _resolve=(page)=>(resolve)=>require([`../pages${page}`],resolve)
// 定义路由
const index=resolve=>require(["../pages/index/index.vue"],resolve)
const search=resolve=>require(["../pages/search/search.vue"],resolve)
const detail=resolve=>require(["../pages/detail/detail.vue"],resolve)
const remote=resolve=>require(["../pages/remote/remote.vue"],resolve)
// 路由实例
let router=new Router({
  routes:[
    {
      path:'/',
      component:index
    },
    {
      path:'/detail/:code',
      component:detail,
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    {
      path:'/search',
      component:search
    }
  ]
})
export default router