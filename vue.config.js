const path = require('path')
const config = require('./config')
const { mockURL } = config[process.env.NODE_ENV]
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const hardSourcePlugin= new HardSourceWebpackPlugin({
  // cacheDirectory 默认情况下将缓存存储在 node_modules 下的目录中，因此如果清除了node_modules，则缓存也是如此
  cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
  recordsPath: "node_modules/.cache/hard-source/[confighash]/records.json",
  // configHash 在启动 webpack 实例时转换 webpack 配置，并用于cacheDirectory 为不同的 webpack 配置构建不同的缓存
  configHash: function(webpackConfig) {
    return require("node-object-hash")({ sort: false }).hash(webpackConfig);
  },
  // 当加载器、插件、其他构建时脚本或其他动态依赖项发生更改时，hard-source 需要替换缓存以确保输出正确。
  // environmentHash 被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
  environmentHash: {
    root: process.cwd(),
    directories: [],
    files: ["package-lock.json", "yarn.lock"]
  }
})

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/apis': {
        target: mockURL,
        pathRewrite: {
          '^/apis': ''
        },
        secure: false,
        changeOrigin: true  
      }
    }
  },
  chainWebpack: (config) => {
    // 开启图片压缩
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({limit: 1024*5, name: 'img/[name].[ext]' })
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 1024,
        name: 'file/[path][name].[hash:7].[ext]'
      })
    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }
    config.resolve.modules.add(path.resolve('node_modules')).prepend('node_modules').clear()
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@imgs', resolve('src/assets/image'))
    .set('~config', resolve('config'))
  },
    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  configureWebpack: (config) => {
    config.plugins.push(hardSourcePlugin)
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }))
    }
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: () => {
          return `
            @import "@/styles/var.scss";
          `
        }
      }
    }
  }
}