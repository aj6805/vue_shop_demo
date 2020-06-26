import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/Login.vue'
import Home from '../component/Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: Login, children: [

    ]
  },
  { path: "/home", component: Home }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫 
router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next();
  var token = window.sessionStorage.getItem("token");
  if (!token) return next("/login");
  next();
})
export default router
