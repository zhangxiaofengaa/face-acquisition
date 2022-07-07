import Vue from 'vue'
import VueRouter from 'vue-router'
import { isDD, getCode } from '@/utils/dingTalk'
import store from '@/store'

isDD()
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
//   if(store.state.userInfo) next()
//   if (isDD) {
//     await getCode(store.dispatch('getUserInfo'))
//   } else {
// // 
//   }
// })


export default router
