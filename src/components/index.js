import Vue from 'vue'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './common',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\w+\.(vue)$/
)
// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // console.log(componentConfig);
  // Globally register the component
  Vue.component(componentConfig.name || componentConfig.default.name, componentConfig.default || componentConfig)
})
