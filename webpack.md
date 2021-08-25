node 10以上 

webpack 4.26以上

```
npm install webpack webpack-cli --save-dev
```

引入：

+ 样式预处理、模块导入 ==》需要工具帮助处理

​        webpack就是专业从事这些小事情的构建工具

+ 打包工具 将依赖引入 形成chunk（代码块）并进行各种处理 样式的编辑、js编译成浏览器可以处理的 输入bundle

### 1.五个核心概念

+ entry 入口  指示入口七点并分析构建内部依赖图

+ output 输出  打包后的位置 以及命名
+ loader 用来处理非js的工具 使weboack能够进行处理其他类型的文件

+ plugins 可以执行更广的任务，打包优化与压缩
+ mode 用以只是wenpack使用相应模式的配置 
  + develop 开发模式 可运行
  + production 生产模式 优化性能

webpack运行指令：

```
webpack ./src/index.js -o ./build/build.js --mode=development开发
webpack ./src/index.js -o ./build/build.js --mode=production生产环境=》压缩js
```

+ 对json 、js文件可以直接使用引入 并打包，json文件内容也会自动转换为object 会将import通过json.parse进行转换

生产环境和开发环境都可以对es6的模块化进行识别

### 2.样式资源打包 

**注意样式尽量使用js引入 暂时没有发现通过link引入打包的配置**

通过配置loader 并且直接使用webpack指令就可以完成打包

```
 // 配置loader
  module:{
    rules:[
      // 匹配那些文件
      {
        test: /\.css$/,
        use:[
         //  use会先执行css-loader再执行style-loader 他是从右往左进行执行的
          'style-loader',//创建style标签，将js中的样式标签添加到header中
          'css-loader'//把css文件变成common.js 加载到js种
        ]
      },
      {
        test: /\.styl$/,
        use:[
         //  use会先执行css-loader再执行style-loader 他是从右往左进行执行的
          'style-loader',//创建style标签，将js中的样式标签添加到header中
          'css-loader',//把css文件变成common.js 加载到js种
          'stylus-loader'
        ]
      },
    ]
  },
```

对于less stylus需要安装stylus、stylus-loader并配置到test中

### 3.html打包

下载配置html-webpack-plugin -D

并在配置中引入，并配置template html模板

```
  plugins:[
//默认会创建空的html 自动引入打包输出的所有资源（js css）
//通过引入template可以引入自己定义的template
    
    new HtmlWebpackPlugin({
      //复制这个index文件 并自动引入打包的资源
      template:'./src/index.html',
    })
  ],
```

注意 js文件不需要在html中进行引入，因为webpack可以帮助自动引入入口的js

### 4.图片的loader

控制图片的处理 引入

```
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        option:{
          limit:8 * 1024,//小于8kb 以base64进行处理 有点 服务器压力down 缺点 文件体积更大
        }
```

安装**url-loader file-loader**  以上使用与4版本 5版本废弃



注意在webpack5中url-loader已经被弃用 改用****`assets-module`****

+ css中引入图片配置详情：

```
      {
        test:/\.(jpg|png|gif)$/,
        type:"asset",注意这里是asset
        parser:{
          //转64的条件
          dataUrlCondition:{
            maxSize:8*1024
          }
        },
        generator:{
          filename:'img/[name].[hash:6][ext]',//文件命名
          publicPath:'./'//打包后对资源的引入
        }
```

https://www.jianshu.com/p/36e972b19b28

最终将在build文件夹下的img文件中生成文件 小于maxsize的将转变为base64

+ html 中img标签中引入的图片 ：

并不会进行处理。这里就需要使用**html-loader**！！！

配置：

```
      {//专门负责引入img文件
        test:/\.html$/,
        loader:'html-loader'
      }
```

webpack5在这儿完结！

在webpack4之前 由于图片导入（esm） 与 html引入（common.js），需要url-loader的关闭esModule：false

### 5.其他资源的打包

比如字体图标、svg等 不需要进行压缩优化处理的资源 四版本的可能需要fileloader 跟这个不一样，像iconfont这种内部引用很多资源的就需要用上了

可能需要fileloader 通过配置处理过的资源 并配置文件目录

```
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        //除了html和js css资源外的东东
        exclude:/\.(css|js|html)$/,
        generator:{
          filename:'assets/others/[name].[ext]',//文件命名 
          publicPath:'./'//打包后资源相对于输出目录的路径
        }
      }
    ]
  },
```

### 6.devserver的配置

webpack 自动编译 自动打开浏览器 自动更新

安装npm i webpack-dev-server

配置 webpack 4

```
  //需要安装webpack-dev-server
  //启动命令npx webpack serve
  devServer:{
    //之前设置的输出目录 只在内存中打包 不会有任何输出
    contentBase:resolve(__dirname,'build'),webpack5 已经废弃
    //启动gzip压缩
    compress:true,
    //启动端口号
    port:3000
  }
```

启动server ：npx webpack server 4是npx webpack-dev-server？

**webpack5：**npx只会在内存中打包 不会有任何输出

```
  //需要安装webpack-dev-server
  //启动命令npx webpack serve
  devServer:{
    //之前设置的输出目录 只在内存中打包 不会有任何输出
    static:resolve(__dirname,'build'),
    //启动gzip压缩
    compress:true,
    //热更新
    hot:true,
    //启动端口号
    port:3000,
    //自动打开浏览器
    open:true
  }
```

### 7.构建生产环境的基本配置

开发环境：让代码本地调试的环境 =》样式编译 es6转译 打包文件给浏览器 自动化打开 热更新等

生产环境：优化代码、压缩文件 

**生产环境需要处理的**

+ css从js中提取防止加载过慢 出现闪屏

  + 下载插件 mini-css-extract-plugin
  + 引入插件配置

  ```
     需要讲之前创建style标签的loader取消 换成mini压缩的cssloader
     use:[
            // 'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader']
        },
        
     在plugin中：
     new MiniCssExtractPlugin（）//可以在参数中设置{filename:路径加名称}
  ```

  这样生成文件中会包含main.css 并且会自动在html中引入

+ 代码进行压缩 见第九章
+ css前缀处理兼容性（浏览器的样式问题） 见第八章

### 8.css的兼容性处理

需要使用postcss-loader  postcss-preset-env 以及postcss（帮助识别浏览器环境 加载配置）

安装这两个同名包

配置如下：

在css文件的rule下：④

```
use:[
MiniCssExtractPlugin.loader,
'css-loader',
{
loader:'postcss-loader',
options:{
ident:'postcss',
plugins:()=>{
require('postcss-preset-env')()
}
}
}
]
```

在css文件的rule下：⑤

```
        {
          loader:'postcss-loader',//为css添加前缀的loader 需要放在预处理器的前面
          options:{
            postcssOptions:{
              plugins:[
                ['postcss-preset-env']
              ]
            }
            // plugins:()=>[
            //   //postcss的插件 用于帮助他加载浏览器(在package.json中的browerslist)中的兼容性样式
            //   require('postcss-preset-env')()
            // ]
          }
        }
```

package.json中配置浏览器list

```
  "browserslist":{
    "development":[
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production":[
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```

这里虽然设置了开发模式，但实际上postcss默认使用的是生产模式（与mode设置无关），如果想要在开发者模式中查看，需要设置node环境变量：

```
process.env.NODE_ENV = "development"
```

在config头部声明它。

### 9.css的压缩

optimize-css-assets-webpack-plugin 4.0版本

5.0版本使用css-minimizer-webpack-plugin （ts中已包含）

```
 new CssMinimizerPlugin() 直接在plugin中使用
```

### 10.语法检查

4.0版本

eslint-loader  eslint（依赖）  

config配置：一定要排除node_modules

```
      {
        //只检查用户自己写的代码，不检查别人的第三方库  推荐使用airbnb规则
        test:/\.js$/,
        exclude:/node_modules/,//排除第三方库
        loader:'eslint-loader',
        options:{
          fix：true//修复语法错误
        }
      }
```

通常使用airbnb  需要下载插件

eslint-config-airbnb-base 包含es6 及以上

eslint-plugin-import

package.json配置

```
  "eslintConfig": {
    "extends": "airbnb-base",
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": "webpack.config.js"
        }
      }
    }
  }
```

5.0版本

```
注意引入形式：const ESLintWebpackPlugin = require('eslint-webpack-plugin')

eslint-webpack-plugin代替loader（将废弃）

  new ESLintWebpackPlugin({

   fix:true,

   extensions:['js','json','coffee'],

   exclude:'/node_modules/'

  })
```



使用eslint-disable-next-line撤销下一行的语法检查

**/* eslint-disable */** 在文件头部 可以取消对单个文件的检查 在config文件中我就是这么干的

airbnb对console.log会有警告提醒

如果需要在配置中设置某些禁止检查文件 可以新建.eslintignore（与node_module同级）,

并将需要停止检查的文件列进去

```
**/build.js
```

**除上述config内配置以外 还可以创建.eslintrc文件：**

```
{
  // "extends": "airbnb-base",
  "settings": {
    "webpack": {
      "config": "config/webpack.config.js" // 这是你设置alias的配置文件路径
    }
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  }
}
```

如果需要eslint识别browser中的API

，**可以在eslintConfig中设置“env”:{"browser":true}**



### 11.js的兼容性处理 es6=》es5 babel

对于es6的写法，比如箭头函数，webpack并不会进行兼容性处理

对于ie等浏览器而言，可能不认识这些新特性

+ 需要配置babel：：

**下载babel-loader @babel/preset-env  @babel/core**

```
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            //预设兼容性处理
            '@babel/preset-env'
          ]
        }
      }
```

对于基本语法可以转换 但对于promise这种并不会完成转换：

+ 使用@babel/polyfill 做全部的兼容性处理，然后在文件中只需要import引入即可。
+ 但是使用polyfill是把所有兼容性进行导入，会有冗余代码

import ‘@babel/polyfill’  5.0版本种无法引入 会报错

+ **因此使用core-js 实现按需下载（舍弃polyfill）**

```
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            //预设兼容性处理
            [
              '@babel/preset-env',
              {
                useBuiltIns:'usage',
                corejs:{version:3},第三个版本
                targets:{
                  chrome:'60',
                  firefox:'50
                  ie:'9',
                  safari:'10',
                  edge:'17'
                }
              }
            ]
          ]
        }
      }
```





### 12.js与html代码的压缩

生产环境下会自动压缩js代码 mode:'production'

html文件的压缩：不需要进行兼容性处理，但可以压缩，直接使用htmlwebpackplugin

配置中设置minify：{        collapseWhitespace:true,//折叠空格
        removeComments:true//移除注释}

```
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,//折叠空格
        removeComments:true//移除注释
      }
    }),
```

### 13.生产环境配置

```
config。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {resolve} = require('path')

process.env.NODE_ENV = 'production'

con
module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          //css压缩处理
          MiniCssExtractPlugin.loader,
          'css-loader',
          //css兼容处理
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  ['postcss-preset-env']
                ]
              }
            }
          }
        ]
      },
      {
        test:/\.styl$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  ['postcss-preset-env']
                ]
              }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            '@babel/preset-env',//babel实现基本js兼容
            //corejs按需配置js兼容
            {
              useBuiltIns:'usage',
              corejs:{version:3},
              targets:{
                chrome:'60',
                firefox:'50',
                ie:'9',
                safari:'10',
                edge:'17'
              }
            }
          ]
        }
      },
      //图片
      {
        test:/\.(jpg|gif|png)$/,
        type:"asset",
        parser:{
          //传64的条件
          detaUrlCondition:{
            maxSize:8*1024
          }
        },
        generator:{
          filename:'assets/img/[name].[hash:6][ext]',
          publicPath:'./'
        }
      },
      //处理html中图片文件的引入
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      //其他文件处理
      {
        exclude:/\.(css|js|html|styl|png|gif|jpg)$/,
        generator:{
          filename:'assets/others/[name].[ext]',
          publicPath:'./'
        }
      }
      
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/build.css'
    }),
    //css压缩
    new CssMinimizerPlugin(),
    //es配置
    new ESLintWebpackPlugin({
       fix:true,
       extensions:['js','json','coffee'],
    }),
    //html模板引入以及压缩处理
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  mode:'production'
}
```

```
packagejson
"browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.001%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base",
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": "webpack.config.js"
        }
      }
    }
  }
```

```
eslintignore
**/build.js
webpack.config.js
```

### 14.优化配置

webpack性能优化：

+ 开发环境
  + 优化打包构建速度
  + 优化代码调试 source-map
+ 生产环境
  + 优化打包速度
  + 优化代码性能

### 15.HMR

hot module replacement 热模块替换

**开发环境的构建速度优化**：

npx webpack server

webpack5默认了热重载 更改js引入的文件，不会造成js内容的刷新重新加载 对于5.0版本不需要进行跟进了，一个模块变化，只会重新打包这一个模块

 devServer设置为hot：true即可：

+ 对于样式文件 可以使用hmr功能 style-loader内部已经进行实现

+ 但是对于js  对于引入的js文件有更新’会导致引入它的js文件也会进行一次执行 

+ 对于html，他的内容更新不会触发刷新，需要手动刷新才行。可以为入口文件设置为数组，将index.html的路径加进去  由于index.html只有一个文件 不需要做热更新功能

  ```
   entry:['./src/index.js','./src/index.html'],
  ```

**实现js的**真正的热更新：比如入口文件引入了print.js

import print from 'print.js'  注意这里的print.js应带是一个esm，如果是一段逻辑的话 ，那再import时就已经执行了 无法热更新

```
if(module.hot){
module.hot.accept('./print.js',function(){
  //该方法监听print.js变化，一旦发生变化 其他模块不会重新打包构建
  print()
})
}
```

### 16.source map 开发环境代码的调试

提供源代码与构建后代码映射关系的技术

配置：

devtool：’source-map‘

打包后即可以看到map文件  它提供了映射关系

他的值：

```
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
```

source-map：外部  精确到文件某一行

inline-source-map：嵌到js中的base64 只有**一个**最终的map  精确到文件某一行

hidden-source-map：会生成外部map文件  报错代码位置不提供 **为了隐藏源代码**

eval-source-map：会在js中每个eval后面追加一个sourcemap base64  **多个**map 有位置提示

nosources-source-map：生成外部的map文件   不提供源文件信息 **为了隐藏源代码**

cheap-source-map 外部  **只会精确到行** 不会精准到某一行的具体位置

cheap-module-source-map 外部   只会精确到行 **不会精准到某一行**的具体位置

内联map：1.内联构建速度更快



sourcemap的使用：

+ dev环境：速度快、调试方便

速度对比：eval》inline》cheap》其他

eval-cheap-source-map最快

更有利于调试友好

source-map

cheap-module-source-map  会将module的东西也会加进来

cheap-source-map

推荐开发环境 使用**eval-source-map（脚手架默认的）**/**eval-cheap-module-source-map**

+ 生产环境：源代码的隐藏 调试需不需要友好

**有隐藏代码需求：hidden-source-map nosource-source-map**

一般生产环境下不会使用内联source（体积太大）

**为了调试的话：可以使用source-map（脚手架默认的）/cheap-module-source-map**

### 17.生产环境的优化oneof

loader会将每一个文件过一遍，这很不友好 需要过滤一下

可以将rules改为  表示每个loader只会匹配一个

```
rules:[{
oneOf:[
{test:XXX},
{},
....
]
}]
```

如果有重复的相同类型文件被loader提取两次，则可以将其中一loader取出来与oneOf并列放。用于提升构建速度。

### 18.缓存

+ bable缓存

编译的处理  减少编译的次数 =》以后优先使用缓存 

cacheDirectory:true 在**第二次构建时读取缓存 加速加速**

```
        {
          test:/\.js$/,
          exclude:/node_modules/,
          loader:'babel-loader',
          options:{
            presets:[
              ['@babel/preset-env',//babel实现基本js兼容
              //corejs按需配置js兼容
              {
                useBuiltIns:'usage',
                corejs:{version:3},
                targets:{
                  chrome:'60',
                  firefox:'50',
                  ie:'9',
                  safari:'10',
                  edge:'17'
                }
              }
            ]
            ],
            cacheDirectory:true
          }
        },
```

+ 文件资源缓存  实现上线代码的缓存优化

如果查看缓存：需要根目录新建server.js 用express开一个简单的服务

```
const  express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('build',{maxAge:1000*3600}))
app.listen(port, () => console.log(`Example app listening on port port!`))
```

用缓存的效果就是 **被强制缓存**，资源不会进行更新。

因而我们可以对产生的**文件名上加上hash值**，让服务器能够识别资源的变化。并会引入新的文件名。

```
filename:'build.[hash:10].js'
```

```
    new MiniCssExtractPlugin({
      filename:'assets/css/build.[hash:10].css'
    }),
```

但是js和css同时使用一个hash值，会导致两个互相影响，所有都会更新=》

**使用chunk hash**：如果打包来自同一个trunk，那么hash值一样。

把hash更改为**chunkhash**： css和js hash还是一样的

chunk =》根据入口文件生成的文件 都是在一个chunk

**使用contenthash**：可以实现按照内容将文件分开并依据更改进行刷新。

### 19.tree shaking 摇树

去除没有使用的代码  

**必须使用es6模块化 并且mode为production**

这样就可以将每个模块文件中没有使用的导出和没有导出的模块代码去除掉，可以有效地减小代码体积。

注意：在不同版本中，

```
tree shaking可能会把css给作为未使用文件禁用掉：

如果在package.json中设置：“sideEffects":false  就会有这种问题  

可以设置为sideEffects:["*.css"，"*.less"]将css保留 不被摇掉
```

### 20.code split (optimization import(''))

**代码分割**

+ demo1

  将打包的一个chunk分割成小文件，并且实现按需加载，提升加载速度

在entry配置 多入口

```
entry:{
main:'./src/js/index.js'
test:'./src/js/test.js'
}
```

在输出中配置名字以区分产出的文件名：把改成动态的【name】

```
  output:{
    filename:'[name].[contenthash:10].js',
    path:resolve(__dirname,'build'),
  },
```

+ demo2

配置：“

```
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
```

可以将nodemodule中代码单独打包成一个chunk（第三方文件）

**通过多入口引入的同一个第三方库，会自动打包成单独的chunk**

+ demo3

  单页面 单入口：但是生成多chunk

  使用js代码

  ```
  import('./test')
  .then((res)=>{
   console.log(res)
  }).catch(()=>{
  console.log('加载失败')
  })
  ```

  

动态import 报语法错误：

```
解决方案
1.eslint 配置 babel-eslint 插件
cnpm install babel-eslint --save

2.在.eslintrc中配置 eslintConfig 属性
"eslintConfig": {
 "parser": "babel-eslint"
 }
```

可以为这个动态导入的模块进行命名

```
import(/* webpackChunkName: 'test' */'./test')
```

### 21.懒加载js代码懒加载

通过使用动态加载实现

+ js代码的懒加载：发生某某事件使用到js文件才会进行加载（这个过程一定存在着代码分割）

```
document.getElementById('btn1').onclick = (e) => {
  e.target.style.color = 'yellow'; 
  import('./test')
  .then(({test1})=>{
    test1()
    console.log('懒加载了');
  })
  .catch(()=>{
    console.log('加载失败了')
  }) 
}
```

而且只会加载一次，不会重复进行加载

+ 预加载：以304的形式缓存处理，但不使用。

  他是等其他资源加载完毕，浏览器空闲期间再加载资源，在第一次已经有了test这个文件。

  兼容性比较差，移动端IE还是差一点

```
document.getElementById('btn1').onclick = (e) => {
  e.target.style.color = 'yellow'; 
  import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test')
  .then(({test1})=>{
    test1()
    console.log('懒加载了');
  })
  .catch(()=>{
    console.log('加载失败了')
  }) 
}
```

正常加载是并行加载的，可能会导致同一时间加载多个文件。

### 22.PWA离线网页 渐进式网络开发应用程序

workbox： 下载workbox-webpack-plugin

并在配置文件中引入WorkboxWebpackPlugin 这个插件可以帮助生成service-worker文件

```
  new WorkboxWebpackPlugin.GenerateSW({
快速启动service、删除旧的
   clientsClaim:true,

   skipWaiting:true

  })
```

并在入口文件中注册service worker

```
//注册serviceWorker并处理兼容性问题：
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{//全局加载后注册
    navigator.serviceWorker.register('/service-worker.js')
    .then(()=>{
      console.log('sw注册成功了')
    })
    .catch(()=>{
      console.log('sw注册失败了')
    })
  })
}

```

build后会产生两个文件 service-worker.js和workbox.js

sw代码必须运行在服务器上：

=》nodejs

这样运行的时候，页面offline仍然可以进行访问。

### 24.多进程打包

下载thread-loader

配置：一般给babel（编译较久的情况）使用：作用 开启多进程打包 进程启动时间大概600ms，进程通信也有时间开销，视情况而定是否有助于打包速度的提升（如果打包时间消耗较长，可以使用）

```
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:[
          'thread-loader',
          {
            loader:'babel-loader',
            options:{
              presets:[
                '@babel/preset-env',//babel实现基本js兼容
                //corejs按需配置js兼容
                {
                  useBuiltIns:'usage',
                  corejs:{version:3},
                  targets:{
                    chrome:'60',
                    firefox:'50',
                    ie:'9',
                    safari:'10',
                    edge:'17'
                  }
                }
              ]
            }
          }
        ],

      },
```

```
也可以调整workers数量调整一下
{loader:'thread-loader',
options:{
workers:2
}}
```

### 25.externals

禁止某些包资源被打包

配置中添加externals 

```
  externals:{
    jquery:'jQuery'//包名
  }
```

然后注意在html中通过静态资源库scr引入库

### 26.dll

如果不使用静态资源库调用，又不是将所有第三方库组成同一个chunk，那么就需要dll技术了。

将多个库打包成一个chunk =》文件体积太大=》dll将其打包成不同的chunk，分割体积

+ 新建webpack.dll.js并配置如下 注意hash警告可以替换为fullhash

```
//将第三方库单独打包
module.exports = {
  //打包jquery 并向外暴露一个包含hash值得名称
  entry:{
    //最终打包生成的name为jquery
    // 要打包的库为'jquery'
    jquery:['jquery']
  },
  output:{
    //
    filename:'[name].js',
    path:resolve(__dirname,'dll'),
    library:'[name]_[hash]',//打包库里面向外暴露出去的内容叫什么名字
  },
  //帮助创建一个manifest.json,提供映射关系（库与生成文件）
  plugins:[
    //
    new webpack.DllPlugin({
      name:'[name]_[hash]',//映射的库的暴露的名字
      path:resolve(__dirname,'dll/manifest.json')//输出文件的路径
    })
  ],
   mode:'production'
}
```

使用命令：

```
npx webpack --config webpack.dll.js 以此配置打包
```

最终会生成打包好的jquery.js文件和manifest（库文件与库地址的映射关系）

+ 这样在webpack.config.js代码资源打包时进行如下配置形成打包舍弃目录的映射关系

```
    new webpack.DllReferencePlugin({
      manifest:resolve(__dirname,'dll/manifest.json')//将映射关系告诉webpack 即将所有引用第三方库的地方不用进行打包
    })
```

+ 舍弃不打包目录后，通过add-asset-html-webpack-plugin（需要下载插件）自动在html中引入资源

```
new AddAssetHtmlWebpackPlugin（{
  filepath:resolve(__dirname,'dll/jquery.js')
}）
```

注意这里有一个小问题，应该是插件版本问题，我用的这个版本生成的html插入srcipt地址会自动变为<script defer="defer" src="auto/jquery.js"></script>

这样子的话不得不另外设置

```
    new AddAssetHtmlPlugin({
      filepath:resolve(__dirname,'dll/jquery.js'),
      outputPath: 'auto/'//设置outputPath与输出的位置一致 
    })
```

不然通过html无法找到这个引用路径

总结Dll：

通过Dll中配置好的第三方库和映射关系（webpack.DllPlugin插件），可以提前为库进行打包处理成单独的文件，

在我写的代码引用中，通过webpack.reference插件可以忽略这些第三方的引用，并且通过AddAssetHtmlPlugin继续添加html代码（defer加载），实现第三方库的不重复打包和共同引用

### 27.性能优化总结

开发环境优化

+ 打包构建速度

  + hrm 缓存热加载 谁改动了才更新谁 :imp:

    +  css使用style-loader自动处理热加载

    + html单文件不需要
    + js模块 需要判断某个module是否为hot 然后使用module.hot.accept方法进行加载模块

  + 优化代码调试
    + source-map 选用值的取舍与组合（构建速度、代码安全性和调试容易度的取舍）  帮助调试的工具

生产环境优化

+ 优化打包构建速度（开发者）
  + oneOf   loaders减少loader的遍历查找处理次数  注意点：同一文件使用两个loader处理时只能处理一个，需要其中一个拉出来
  + babel 缓存处理：编译、转换、兼容性对js的打包速度有影响（多浏览器兼容配置也会耗费大量资源）
  + 多进程打包 thread-loader 视项目大小而定 针对babelloader进行优化
  + externals:声明不打包库 使用cdn链接引用
  + dll:将库单独配置打包文件，自己代码打包时直接拿来使用，并且自动创建html中的脚本引用 （可以与code-split结合使用，需要拆的列入dll，不需要拆的用optimization  chunk化）

+ 优化代码运行的性能（使用者）
  + 缓存（hash-chunkhash-contenthash）当服务器对文件进行缓存处理后  ；通过使用文件内容hash进行资源标记，这样可以监听到内容变化，服务器进行相应的文件缓存更新策略。
  + tree-shaking 优化代码性能 避免无用代码的打包(**两个条件：es6引用、生产环境**)，屏蔽方法sideEffect["*.css"]
  + 代码分割 cede split  
    + 单入口方案 单入口默认只有一个chunk bundle.js 可以有以下两种优化手段，可以结合使用
      + 1.通过optimization 将第三方库单独分割成一个chunk（dill技术还可以对第三方库进行一次分割处理）
      + 2.通过js文件中import(’‘)的方式引入js模块，实现代码分割指定js代码  生成多个chunk，可以保证具备依赖关系的引入模块也被单独打包
    + 多入口方案
      + 配置多入口多出口，也需要使用optimization，因为多入口分别引入库可能会造成第三方库的重复打包，也可以使用import语法进行相应的切割
  + 懒加载与预加载
    + 懒加载 使用触发时import()加载组件
    + 预加载 等其他资源加载完再加载资源（兼容性不太好）
  + pwa离线页面技术:workbox-webpack-plugin兼容性不太好

### 28.配置详解介绍entry output

+ **entry**：

  + 通常情况下是指定一个**string**作为单一入口 输出一个bundle，打包时的**默认名称为main** 因此如果output指定[name]会得到main

  + 第二种写法：以**列表形式**作为entry指定入口文件群，但是输出只有一个bundle（name默认为”main“）。注意多入口变量不通用（没有引入关系）=》应用领域：将html引入实现html的热更新

  + **多入口打包**：对象形式定义，会生成多个chunk

  + 组合入口形式 这样可以将count与index打包到一个文件，add单独打包为一个文件，

    注意：只涉及打包，代码间依赖关系不受影响 使用场景：dll组织第三方库的时候（多个包可以组织成一个chunk）

    ```
    entry:{
    main:['./src/index.js','./src/count.js'],
    add:'./src/add.js'
    },
    ```

**entry全**

```
  entry:'./src/index.js',
  // entry:['./src/index.js','./src/add.js'],
  // entry:{main:'./src/index.js',add:'./src/add.js'},
  // entry:{main:['./src/index.js','./src/count.js'],add:'./src/add.js'},
```



+ **output**

  + filename 可以指定名称或者目录加名称
  + path：指定输出文件目录 作为将来**所有资源**输出的**公共目录**
  + publishPath:'/'可以指定所有资源**引入时**的公共路径前缀（比如src、url等引入），一般用于**生产环境** 
    + 对于img/a.jpg这种路径会在当前服务器路径下寻找  /img/a.jpg会在当前服务器根路径下拼接寻找
  + chunkFilename:非入口chunk的名称 例：'[name]_chunk.js'  对**import('')**引入的单独chunk和**optimization** 分割出来的chunk会遵循他的命名
  + library：可以将指定的文件名暴露出去，用于其他地方使用 以main暴露出去

  ```
  library:'[name]'
  ```

  + libraryTarget：

  ```
  libraryTarget:'window' 可以将变量添加到window下面 node端可以设置为global
  也可以写成‘comminjs’这种模块化语法定义引出方式
  ```

  也可以在webpack5中这样配置：

  ```
      library:{
        name:'[name]',
        type:'umd'
      },
  ```

  注意 入口文件不能有代码错误，否则会不生效

​       library一般与Dll结合使用，将几个库单独打包 引入使用

**output全**：

```
  output:{
    filename:'[name].js',//文件名字 也可以写成目录文件格式
    path:resolve(__dirname,'dist'),//打包输出目录
    publicPath:'/',//作为资源公共路径前缀 生产环境配置
    chunkFilename:'[name]_chunk.js',非入口chunk的命名设置
    library:{//与dll结合 几个包结合成一个库
      name:'[name]',
      type:'umd'
    },
    libraryTarget:'window'//定义环境或者导出方式global commonjs都可
  },
```

### 29.配置详解介绍 module resolve

**module**

```
 module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.js$/,
        loader:'eslint-loader',
        exclude:/node_modules/,//排除
        include:resolve(__dirname,'src'),//只检查某某位置的
        enforce:'pre'//优先执行'post'延后执行  不写的化  就是中间执行
      },
      {oneOf:[//可以加快打包速度
        
      ]}
    ]
  },
```

**resolve**：****

```
  resolve:{
     //配置文件别名
    alias:{
      $css:resolve(__dirname,'src/assets/css')//当前配置文件下的src/assets/css目录
    },
    extensions:['.js','.json','.css'],//后缀名省略设置
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']//解析模块的规则  告诉它开始解析的目录
  }
```

引用src/assets/css/index.css时  写做：

```
import "$css/index.css"
```

### 30.devServer详细配置

```
  devServer:{
    contentBase:resolve(__dirname,'build'),//运行目录
    watchContentBase:true,//监视文件 一旦变化 就刷新 不用保存了
    watchOptions:{
      ignored:/node_modules/,//忽略监视文件
    },
    compress:true,
    port:3000,
    host:'localhost',
    open:true,
    hot:true,
    clientLogLevel:'none',//关闭服务器启动日志信息
    quiet:true,//除了基本启动信息 其他都不显示
    overlay:false,//关闭全屏报错提示
    //解决跨域问题
    proxy:{
      '/api':{
        target:'http://localhost:5000',//一旦有api请求 转发为localhost:5000代理服务器进行请求 
        pathRewrite:{
          '^/api':''//并将api去掉
        }
      }
    }
  }
```

### 31.optimization配置详解(生产环境)

chunk的命名：

```
在import时定义import(/*webpackChunkName:'add'*/'./add')
```

chunk的路径：

```
  output:{
    filename:'[name].[contenthash:10].js',
    path:resolve(__dirname,'dist'),
    chunkFilename:'[name].[contenthash]_chunk.js',//文件名字 也可以写成目录文件格式
  },
```

chunk的分割代码实现：

```
optimization:{
    splitChunks:{
      chunks:"all",
      //以下都是默认值 很少进行修改
      minSize:30 * 1024,//最小为多少kb 会进行分割提取
      // maxSize:0,//没有最大限制
      minChunks:1,//要提取的chunk最小要被引用1次
      maxAsyncRequests:5,//按需加载时 触发并行加载的最大文件数量为5  如果超过五个import()触发的加载模块，那就不会打包成chunk了
      maxInitialRequests:3,//入口js文件最大并行请求数量为3个
      automaticNameDelimiter:'~',//文件名称链接符
      cacheGroups:{//分割chunk的组
       //第三方库的文件 会被打包到vendors组的chunk中=》打包后的文件名：vendors~XXX.js
       //满足上面的公共规则 
       vendors:{
          test:/[\\/]node_modules[\\/]/,
          //打包的优先级
          priority:-10,
        },
        default:{
          //要提取的chunk最少被引用2次 覆盖上面的规则
          minChunks:2,
          //优先级较低
          priority:-20,
          //与提取提取的模块有同一个模块，会选择复用，不会重复打包
          reuseExistingChunk:true,
        }
      }
    }
  }
```

如上如果使用contenthash命名的方式实现生产环境的hmr，那么当入口文件依赖文件内容发生变化的时候，入口文件引用了依赖文件的名称也发生变化，他所对应的contenthash也会有变化，工具也将会更新这个文件：

```
    //将当前模块的记录其他模块的hash单独打包成一个文件 runtime文件
   optimization:{
       XXXX，
      runtimeChunk:{
      name:entrypoint=> `runtime-${entrypoint.name}`
     }
    }
```

这里会另外产生一个缓存runtime文件

这样可以精确的锁定目标文件的内容更新（只会更新该文件名和他的runtime文件），但不会造成对他产生依赖的文件的代码热更新。

+ 配置生产环境的压缩方案 ：针对js和css（可选） 4.0版本

```
    minimizer:[
      //配置生产环境的压缩方案 ：针对js和css
      new TerserWebpackPlugin({
        cache:true,//开启
        parallel:true,//开启多进程打包
        //启用source-map  否则会被压缩掉
        sourceMap:true
      })
  ]
```

+ 配置生产环境的压缩方案 ：针对js和css（可选） 5.0版本

```
    minimize:true,
    minimizer:[
      //配置生产环境的压缩方案 ：针对js和css
      new TerserWebpackPlugin({       
        parallel:true,//开启多进程打包 可以赋予数字指定打包数量
        terserOptions: {
          
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
        //启用source-map  否则会被压缩掉      
      })
  ]
```

### 32.webpack5新特性

+ 5里面的reeshaking，对深层依赖的更新检测有优化

+ 5里面默认设置了entry（默认入口./src/index.js）、output（默认出口 dist 支持es6代码的输出） 默认文件名为[name].js，基础的只要设置mode就好了

+ 打包体积更小

+ 持久缓存提高构建性能
+ hash更好的算法改善缓存
+ 可以单独设置splitChunk：

```
splitChunk：{
javascript:30000,
style:50000
}
```

+ Caching 统一配置缓存

```
cache:{
type："filesyste",//磁盘缓存或者内存："memory"
buildDependencies:{
config:[__filename]
}
}
默认缓存会存到nodemodule/.cache/webpack下
```

+ 自动监视输出文件：第一次输出没变化 也不会并进行输出
