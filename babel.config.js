module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // includes: [],
  // loader: "babel-loader?cacheDirectory=true",
  
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
