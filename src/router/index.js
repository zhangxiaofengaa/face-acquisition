import Vue from 'vue'
import VueRouter from 'vue-router'
import { isApp } from '@/utils/platform'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Face',
    meta: { title: '人脸采集' },
    keepAlive: true,
    component: r => require.ensure([], () => r(require('@/views/Face/index.vue')), 'face')
  },
  {
    // path: '/',
    path: '/student-work-no',
    name: 'StudentWorkNo',
    meta: { title: '学工号采集' },
    component: r => require.ensure([], () => r(require('@/views/StudentWorkNo/index.vue')), 'face')
  },
  {
    path: '/shooting-guide',
    name: 'ShootingGuide',
    meta: { title: '拍摄指引' },
    component: r => require.ensure([], () => r(require('@/views/ShootingGuide/index.vue')), 'face')
  },
  {
    path: '/common-problem',
    name: 'CommonProblem',
    meta: { title: '常见问题' },
    component: r => require.ensure([], () => r(require('@/views/CommonProblem/index.vue')), 'face')
  },
  {
    path: '/success',
    name: 'Success',
    meta: { title: '提示页' },
    component: r => require.ensure([], () => r(require('@/views/Success/index.vue')), 'face')
  },
  // {
  //   path: '/',
  //   // path: '/shooting-guide',
  //   name: 'Test',
  //   meta: { title: 'Test' },
  //   component: r => require.ensure([], () => r(require('@/views/ShootingGuide/index.vue')), 'face')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(async (to, from, next) => {
//   if (isApp()) {
//     console.log('App内打开')
//   } else {
//     console.log('浏览器打开')
//     next()
//   }
// })

router.afterEach(to => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
