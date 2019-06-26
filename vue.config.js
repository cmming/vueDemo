'use strict'
const path = require('path')
    // const defaultSettings = require('./src/settings.js')
    // const name = defaultSettings.title || 'vue Element Admin' // page title

function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    configureWebpack: {
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
    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/',
    chainWebpack(config) {
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
    }
}