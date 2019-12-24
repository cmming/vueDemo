'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const defaultSettings = require('./src/settings.js')
// const name = defaultSettings.title || 'vue Element Admin' // page title

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  productionSourceMap: process.env.NODE_ENV !== 'production',

  devServer: {
    proxy: {
      '/api': {
        ws: false,
        target: process.env.VUE_APP_API_PROXY,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/mock': {
        ws: false,
        target: 'http://localhost:3777/',
        changeOrigin: true,
        pathRewrite: { '^/mock': '' }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 选项...
  publicPath: process.env.NODE_ENV === 'production'
    ? './' : '/',
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // config
    //     .when(process.env.NODE_ENV !== 'development',
    //         config => {
    //             config
    //                 .plugin('ScriptExtHtmlWebpackPlugin')
    //                 .after('html')
    //                 .use('script-ext-html-webpack-plugin', [{
    //                     // `runtime` must same as runtimeChunk name. default is `runtime`
    //                     inline: /runtime\..*\.js$/
    //                 }])
    //                 .end()
    //             config
    //                 .optimization.splitChunks({
    //                     chunks: 'all',
    //                     cacheGroups: {
    //                         libs: {
    //                             name: 'chunk-libs',
    //                             test: /[\\/]node_modules[\\/]/,
    //                             priority: 10,
    //                             chunks: 'initial' // only package third parties that are initially dependent
    //                         },
    //                         elementUI: {
    //                             name: 'chunk-elementUI', // split elementUI into a single package
    //                             priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //                             test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
    //                         },
    //                         commons: {
    //                             name: 'chunk-commons',
    //                             test: resolve('src/components'), // can customize your rules
    //                             minChunks: 3, //  minimum common number
    //                             priority: 5,
    //                             reuseExistingChunk: true
    //                         }
    //                     }
    //                 })
    //             config.optimization.runtimeChunk('single')
    //         }
    //     )
  }
}
