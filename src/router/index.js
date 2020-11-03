import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import register from '@/components/register'
import login from '@/components/login'
import userInfo from '@/components/userInfo'
import edit from '@/components/Edit'
import article from '@/components/Article'

Vue.use(Router)
const routes = [
  {
    path: '/',
    component: index,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/userinfo',
    component: userInfo,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    component: edit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/article/:id',
    component: article
  }
]
const router = new Router({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if ((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登陆')
    return
  }
  next()
})
export default router
