import Vue from 'vue'

/* 引入全局公共组件 */
const requireComponent = require.context('/', true, /\w+\.(vue)$/)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  Vue.component(
    componentConfig.name || componentConfig.default.name,
    componentConfig.default || componentConfig
  )
})