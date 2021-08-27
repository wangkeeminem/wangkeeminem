## 一。前端项目的预渲染设置：

### 1.安装插件

npm i prerender-spa-plugin -D

### 2.在webpack config js中配置：

F:\backend\Node.js\SSR\prerender-spa\build\webpack.prod.conf.js

+ 引用

const PrerenderSPAPlugin = require('prerender-spa-plugin')

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

+ 在plugin中配置：

  new PrerenderSPAPlugin({

   staticDir:path.join(__dirname,'../dist'),

   routes:['/','/about'],

   

   render:new Renderer({

​    inject:{

​     foo:'far'

​    },

​    headless:false,

​    //在项目入口中使用document.dispatchEvent(newEvent('render-event'))

​    renderAfterDocumentEvent:'render-event'

   })

  })

### 3.在main.js入口文件中执行相关的dispatchevent：

```
new Vue({
 el: '#app',
 router,
 components: { App },
 template: '<App/>',
 mounted(){
  document.dispatchEvent(new Event('render-event'))
 }
})
```

## 二。服务端渲染

**//通过vue-server-renderer插件 的renderToString()方法，把vue实例转换为字符串插入值html文本中**

需要vue、express、vue-server-render

```
 npm i vue express vue-server-renderer -S
```

```
const Vue = require('vue')
const express = require('express')()
const renderer =require('vue-server-renderer').createRenderer()

//创建vue实例
const app = new Vue({
  template:'<div>hello 哈哈哈哈啊哈</div>'
})
//服务端渲染的核心
//通过vue-server-renderer插件 的renderToString()方法，把vue实例转换为字符串插入值html文本中
express.get('/',(req,res)=>{
  renderer.renderToString(app,(err,html)=>{
    console.log(html)
    if(err){
      return res.status(500).end('运行错误')
    }
    res.send(`
    <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2 SSR渲染页面</title>
</head>
<body>
${html}

</body>
</html>
    `)
  })
})

express.listen(8881,()=>{
  console.log('服务器已启动')
})
```

服务端渲染

优点：

更好的seo

更快到达时间

缺点：

1.开发条件优先 需要使用通用代码

2.构建设置 与部署更麻烦

3.更多的服务端负载

## 三。webpack vue项目中引入服务端渲染（主要渲染seo信息）

执行配置

package.json 下script 配置server命令

```
"server": "webpack --config build/webpack.server.config.js"
```



+ 配置F:\backend\Node.js\SSR\3vuessr\build\webpack.server.config.js

```
const webpack = require('webpack')
const merge = require('webpack-merge')
//引入webpack主要配置文件
const base = require('./webpack.base.conf')
module.exports = merge(base,{
  target:'node',
  entry:'./src/entry-server.js',
  output:{
    filename:'bundle.server.js',//最终生成的打包服务端js文件
    libraryTarget:'commonjs2'
  },
  plugins:[]
})
```

+ 配置F:\backend\Node.js\SSR\3vuessr\build\webpack.base.conf.js 中将entry注掉

```
  // entry: {
  //   app: './src/main.js'
  // },
```

+ 将router使用函数型导出

```

export function createRouter(){
  return new Router({
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/test',
        name: 'Test',
        component: Test
      },
    ],
    mode:"history"
  })
}
```



+ main.js使用函数型导出组件

  ```
  export function createApp(){
    const router = createRouter()
    const app = new Vue({
      router,
      components:{App},
      template:'<App/>'
    })
    return {app}
  }
  
  ```

+ src下建立入口entry-server.js文件 

转换为通用性写法：

```
import { createApp } from "./main";

export default context =>{//后端返回来某个对象
  return new Promise((resolve,reject)=>{
    const {app} =  createApp()
    const router = app.$router

    const {url} = context
    const {fullPath} = router.resolve(url).route
    if(fullPath !==url){
      return reject({url:fullPath})
    }
    //更改路由
    router.push(url)
    //wait until router has resolvede possibel asybc hooks
    router.onReady(()=>{
      const matchedComponents = router.getMatchedComponents()
      //no matchde toutes
      if (!matchedComponents.length){
        return reject({code:404})
      }
      resolve(app)
    },reject)
  })
} 
```



+ 服务端引入（在node环境下 同上一章）

```
const Vue = require('vue')
const express = require('express')()
const renderer =require('vue-server-renderer').createRenderer()

const createApp = require('./dist/bundle.server')['default']
//创建vue实例
// const app = new Vue({
//   template:'<div>hello wuwuwu哈哈哈哈啊哈</div>'
// })

//服务端渲染的核心
//通过vue-server-renderer插件 的renderToString()方法，把vue实例转换为字符串插入值html文本中
express.get('*',(req,res)=>{
 
    const context = {url:req.url}
    createApp(context).then(app=>{
      renderer.renderToString(app,(err,html)=>{
        if(err){return res.status(500).end('运行错误')}
        res.send(`
        <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2 SSR渲染页面</title>
</head>
<body>
${html}
</body>
</html>
        `)
      })
    }).catch(err=>{return res.status(500).end('运行错误')})

})

express.listen(8881,()=>{
  console.log('服务器已启动')
})
```

## 四。单页面的混入服务端渲染（实现单页面seo） 客户端的渲染文件（样式 跳转加载等实现单页面）

利用挂载script中的客户端打包js代码混入到html中

+ packagejson打包命令定义

```
  "client": "webpack --config build/webpack.client.config.js"
```



+ webpack config设置 主要在于配置出入口信息 entry:  output: 其他与base一样

```
const webpack = require('webpack')
const path = require('path')

const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')
const config = require('../config')

function resolve (dir){
  return path.join(__dirname,'..',dir)
}
module.exports = {
  entry:"./src/entry-client.js",
  output:{
    path:path.resolve(__dirname,'../dist'),
    publicPath:'/dist',
    filename:'bundle.client.js'
  },
  plugins:[],
  resolve:{
    extensions:['.js','.vue','.json'],
    alias:{
      'vue$':'vue/dist/vue.esm.js',
      '@':resolve('src'),
    }
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
```



+ 客户端打包入口定义 通过挂载到服务端已经生成的'#app'上

```
import { createApp } from "./main";

const {app} = createApp()

const router = app.$router

window.onload =()=>{

 app.$mount('#app')//server端页面来了之后 加载上去

}
```



+ node中模板中引入打包的jsscript文件

```
//客户端展示的打包文件
//设置静态资源目录
app.use('/',express.static(__dirname+'/dist'))
const clientBundleFileUrl = '/bundle.client.js'//通过以上 可以将客户端的打包文件作为静态script文件，加载至页面中
```

并通过script使用

```
app.get('*',(req,res)=>{
 
    const context = {url:req.url}
    createApp(context).then(app=>{
      renderer.renderToString(app,(err,html)=>{
        if(err){return res.status(500).end('运行错误')}
        res.send(`
        <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2 SSR渲染页面</title>
    <script src=${clientBundleFileUrl}></script>//****重点****
```

## 总结：

+ 服务端渲染打包文件：seo信息 无单页面 每个路由返回不同内容 

+ 客户端渲染打包文件：通过script插入打包文件实现 相关样式、router跳转方式 实现单页面（混入）

​     过程就是进入一个路由，基本seo信息由服务端渲染完成，而之后转变为单页面应用

+ 对于页面有异步数据的请求，可能不太适用这种方案(两个实例都会进行请求，造成问题)，
  + 需要对于服务端渲染之前，预先加载好这些数据
  + 在mount到app之前，获取到与服务端相同的数据

动态数据的前端共享：通过__INITIAL STATE__进行嫁接请求的数据

## 五。异步数据的请求实现

思路：服务端渲染前获取信息，写入到html中



+ 服务端entry-server.js 更改：  加入promiseall： 注意在每个组件中都有个serverRequest 方法

```

import { createApp } from "./main";

export default context =>{//后端返回来某个对象
  return new Promise((resolve,reject)=>{
    const {app} =  createApp()
    const router = app.$router

    const {url} = context
    const {fullPath} = router.resolve(url).route
    if(fullPath !==url){
      return reject({url:fullPath})
    }
    //更改路由
    router.push(url)
    //wait until router has resolvede possibel asybc hooks
    router.onReady(()=>{
      const matchedComponents = router.getMatchedComponents()
      //no matchde toutes
      if (!matchedComponents.length){
        return reject({code:404})
      }

      //对所有匹配路由由组件调用'asyncDate()' 尤雨溪版本
      // Promise.all(matchedComponents.map(Component=>{
      //   if(Component.asyncData){
      //     return Component.asyncData({
      //       route:router.currentRoute
            
      //     })
      //   }
      // })).then(()=>{
      //  // 在所有预取钩子(preFetch hook) resolve 后，
      //   // 我们的 store 现在已经填充入渲染应用程序所需的状态。
      //   // 当我们将状态附加到上下文，
      //   // 并且 `template` 选项用于 renderer 时，
      //   // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
      //   resolve(app)//这里面还可以更新store：context.state = store.state
      // })
      //教程版本
      Promise.all(matchedComponents.map(Component=>{
        if(Component.serverRequest){
          return Component.serverRequest(
            app.$store
          )
        }
      })).then(()=>{
       // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
         context.state = app.$store.state
        resolve(app)
      })
      
    },reject)
  })
} 
```

组件中使用serverRequest进行异步数据请求：获取使用computed  homeInfo为store中的储存

```
<template>
<div>
  <h2>我是主页</h2>
  <router-link to="/test">测试页面</router-link>
  <div>{{homeInfo}}</div>
</div>
</template>

<script>
export default {
  name:'Home',
  data(){
    return {}
  },
  serverRequest(store){
    return store.dispatch('getHomeInfo')
  },
  computed:{
    homeInfo(){
      return this.$store.state.homeInfo
    }
  }
}
</script>

<style scoped>
  
</style>
```



+ 服务server.js文件中通过context共享数据，需要建立store：并引入到main.js中

```
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
// import { fetchItem } from './api'

export default function createStore () {
  return new Vuex.Store({
    state: {
      homeInfo: ''
    },
    actions: {//异步获取 使用action
      getHomeInfo ({ commit }) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return axios.get('http://localhost:8881/api/getHomeInfo').then(res => {
          commit('getHomeInfo', res.data)
        })
      }
    },
    mutations: {
      setHomeInfo(state,res){
        state.homeInfo = res
      }
    }
  })
}
```

重新打包服务端文件：



若不匹配则会报错：注意组件 变化了 client bundle也需要重新编译

```
[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.
```

现在这个阶段 预览上有了 但是script还未显示：

```
首页 关于我
我是主页
测试页面
ssr发送请求了
```

+ 客户端更改entry-client.js更改（利用context进行嫁接前后端数据） 服务端entry中加上 context.state = store.state或者context.state = app.$store.state 看之前定义的app引出的格式而定

更改实例：利用服务端加载 将state通过context放入window.__INITIAL_STATE__之中

```
app.get('*',(req,res)=>{
  
    const context = {url:req.url}
    createApp(context).then(app=>{
      
      console.log(context.state)
      let state = JSON.stringify(context.state)//获取state
      
      renderer.renderToString(app,(err,html)=>{
        if(err){return res.status(500).end('运行错误')}
        res.send(`
        <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2 SSR渲染页面</title>
    <script>window.__INITIAL_STATE__ = ${state}</script>
    <script src=${clientBundleFileUrl}></script>
</head>
<body>
${html}
</body>
</html>
        `)
```

再把window.__INITIAL_STATE__作为桥接给客户端script：

cilent entry：获得共享替换内容

```
import { createApp } from "./main";
const {app} = createApp()
const router = app.$router

if (window.__INITIAL_STATE__){//如果有值
  app.$store.replaceState(window.__INITIAL_STATE__)//将其状态替换替换掉
}
window.onload =()=>{
  app.$mount('#app')//server端页面来了之后 加载上去
}
```

![image-20210816162632412](C:\Users\86158\AppData\Roaming\Typora\typora-user-images\image-20210816162632412.png)

你可能还需要知道这些：

```
const resolved: {
  location: Location;
  route: Route;
  href: string;
} = router.resolve(location, current?, append?)
所以我们使用router.resolve（url）.route能够得到route
```

这个在Vue2中是这样的

```
href: "/about"
location: {_normalized: true, path: "/about", query: {…}, hash: "", params: {…}}
normalizedTo: {_normalized: true, path: "/about", query: {…}, hash: "", params: {…}}
resolved: {name: null, meta: {…}, path: "/about", hash: "", query: {…}, …}
route: {name: null, meta: {…}, path: "/about", hash: "", query: {…}, …}
[[Prototype]]: Object
```

在vue3中 已经没有route这个参数了 关于这部分的server 入口写法可能需要更改

```
fullPath: "/yourspace"
hash: ""
href: "/yourspace"
matched: [{…}]
meta: {}
name: undefined
params: {}
path: "/yourspace"
query: {}
redirectedFrom: undefined

```

## 六。vite vue3的服务端渲染

https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue
