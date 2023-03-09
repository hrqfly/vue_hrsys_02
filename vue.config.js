const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }
    // server:{
    //     //设置前端项目的端口号
    //     port: 8888,
    //     proxy:{
    //         //当前页面请求路径是/api开头的请求都会走这里
    //         '/api':{
    //             target:'http://localhost:8081',
    //             //请求路径重写
    //             ws:true,
    //             Rewrite(path){
    //                 //把原始请求路径中api去掉
    //                 // /api/login -> /login
    //                 return path.replace(/^\/api/,'')
    //             },
    //             // 解决跨越问题
    //             changeOringin:true
    //         }
    //     }
    // }
})
