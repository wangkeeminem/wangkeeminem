

# 1.hello Nodejs

## -企业需求

+具有服务端开发经验更好

+front-end

+back-end

+全栈开发

 	*全干

web后台服务器，根据客户端浏览器发起请求，后端通过服务器提供对数据库的服务

+具备基本网站开发能力：

*服务端

*前端

*运维部署

+多人社区



## -Node.js是什么

+兄弟们：Java、PHP、python、ruby、.Net

+它是一个javascript运行时的环境，可以解析与执行javascript代码（相当于浏览器），构建于Chrome V8引擎之上

+浏览器中的js：EcmaScript、BOM、DOM

+node.js不包含BOM/DOM,只有EcmaScript，在node中为js提供了服务器相关的API

 *文件读写、网络服务构建、网络通信、http服务器等处理

*使用事件驱动、非阻塞IO模型（异步操作）、轻量而高效

*使用NPM包管理工具提供了各种开源库，方便直接下载使用扩展工具



## 1.3.Node.js能做什么

+web服务器后台

+命令行工具:npm/git/hexo

+前端接触node最多的是他的命令行工具:webpack等



## 1.4.预备知识

简单的命令行操作:cd dir ls mkdir rm(删文件?)/js

## 1.5.一些资源

+深入浅出Node.js

+Node.js权威指南

## 1.6.学习内容

+B/S编程模型

*back-end

*brower server

+模块化编程

*RequireJs

*SeaJS

*Node常用API

*异步编程:Promise async generator

*Express Web开发框架

*ECMA6

------

## 2.起步

### 2.1安装

### 2.2执行helloworld

### 2.3nodejs中没有window等乱七八糟的

### 2.4用nodejs可以进行读取文件:

##### 读文件：**回调函数传入两个参数** err，data:成功:data:数据 err:null

##### 失败:data:undefined err:错误对象

##### 写文件：**回调只有一个参数**：成功 error为null ，否则为错误对象

##### 浏览器是不认识require的

## 2.5写文件与简单的错误处理

if（err）throw err else（console.log(data.toString())）,通过err判断是否有错误发生

cls清屏

## 2.7简单的http服务

###### node中专门有一个核心模块 http

###### http的职责就是帮助创建编辑服务器的

```
//加载http模块

const http = require('http')

//创建一个web服务器

const server =http.createServer()

//3服务器要干嘛

//提供数据的服务》》发请求》》接受请求》》处理请求》》给个反馈

server.on('request',()=>{

 console.log('收到客户端请求');

})//触发request请求事件，然后触发回调函数

// 4.绑定端口号，启动服务器

server.listen(3000,()=>{

 console.log('服务器请求成功了，可以通过http://127.0.0.1:3000/来请求了');
```

})

## 2.9发送响应

###### 在request的回调中，通过request.url（/a,/b）的判断来响应用户输入的url地址：response.write(XXX) response.end()

server.on('request',(request,response)=>{

 

 console.log('收到客户端请求,请求路径是： '+request.url);

//response对象有一个方法write可以来给客户发送响应数据

// 它可以使用多次，但最后一次一定要使用end来结束响应

```
if (request.url=='/a') 

{response.write('hello')

response.end()}

else if (request.url=='/b') 

{response.write('world')

response.end()}
```

})//触发request请求事件，然后触发回调函数

###### 或者直接response.end(XXXXX)

###### 发送的必须要是字符串类型 可以使用JSON.stringfy 或JSON.parse转换

##  3.Node中的Javascript文件模块化

##### 3.1核心模块：文件操作的fs、http服务构建的http模块、path路径操作模块、os系统信息操作模块

```
vs fs = require('fs')
fs.writeFile/readFile
```

##### 3.2js模块系统：简单的模块化，模块间互不影响，require支持不同模块间变量名重复的问题，会不影响，模块间的函数不支持相互使用

```
require('文件路径')
//会按照模块加载顺序执行
```

 ./不可以省略，否则会当成核心模块，也可以省略掉后缀名

##### 3.3调用引入对象的方法

```
//引出：exports add=function(){}
//引入：const ADD = require('')
方法：ADD.add
```

### 4.IP地址和端口号的概念

*请求的IP地址用于定位服务器（计算机）网络地址，端口号用于定位具体应用程序、设备、软件、某项服务（所有需要互联网服务的软件都需要端口号）

*获取响应客户对应的端口号、IP地址

```
request.socket.remotePort
request.socket.remoteAddress
```

*端口号补充：一些默认的知名端口号就别用了，推荐使用3000，5000，8080

服务器端默认的端口号是80（上线时使用的）

可以同时开启多个服务，但要占用不同的端口号

### 6.响应内容类型Content-Type

*服务器默认发送的数据其实是utf8编码的内容，但浏览器默认中文系统GBK，造成中文乱码问题

*在res.end()前需要进行header设定，告诉浏览器以什么内容格式解析 content-type

*通过：

```
res.setHeader('Content-Type','text/plain;charset=utf-8')
/plain：响应为普通文本
/html：响应html的解析结果
image/jpg:图片(不需要指定编码)
tool.oschina.net/commons
通过文件读取模块读到的是二进制编码，可以直接提供给res.end()使用
```

# 2.文件读取与模板引擎

## 1.初步实现Apache功能

通过

```
fs.readdir(wwwDir,(err,files)=>{
      if (err) {
        return res.end('cant find dir')
      }
      console.log(files);//读取目录文件
    })
```

可以实现获取fs中的目录列表，并且通过获取到的目录文件对响应的html模板代码字符串进行拼接替换就可以达到服务器端显示目录文件的名字的效果

### 1.1nodejs模板引擎写法：

安装：

```js
npm install art-template --save
```



```js
  <script src="./code/node_modules/art-template/lib/template-web.js"></script>
  <script type="text/template" id='tpl'>
    hello {{ name }}
    我今年 {{ age }} 岁了
    我来自 {{ home }} 
    我喜欢 {{ hobby }}
  </script>
  <script>
    const ret = template('tpl',{
      name:'Jack',
      age:18,
      home:'UK',
      hobby:'football'

    })
    console.log(ret);
  </script>
```

模板引擎内只关心{{}}内容，其他html、script之类的一律当作字符串处理

### nodejs加载模板引擎：

```js
const template = require('art-template')
const str="html带有{{}}的字符串(引入html文件进行toString方法)"
var ret = template.render(str,{
    name:"jack",
    province:"徐州",
    hobbies:['写代码','唱歌','打游戏']
})
```

```
模板中对列表的写法：{{each hobbies}}{{$value}}{{/each}}
列表的用法可以被用来对fs.readdir('')返回的文件目录做处理
```

### 2.1 客户端渲染与服务端渲染

服务端渲染:只请求了一次，速度更快，响应的就是最终的html结果，页面刷新请求，利于SEO优化。

客户端渲染：动态加载的数据，不需要页面进行刷新的，直接在前端进行局部刷新。但不容易爬虫数据，搜索服务。

### 2.2浏览器请求静态文件

在浏览器收到html标签后进行解析，发现script、link、audio、img、iframe、video时会自动对其进行请求（外联资源），每个资源都是一个请求。但是这些资源没有被fsreadfile处理，需要对这些文件请求进行处理（几个文件就几次请求（对应不同的url），可以在request中判断data的url前缀来对其进行处理，具体细节如下）：

##### 为了方便统一处理静态资源：约定将所有静态资源存入public中，通过url.indexOf（’/public/‘）===0 进行判断是否为public中的文件进行文件读取的处理（服务器控制文件的读取权）

**如果符合indexof条件，需要readfile（’.‘+url）才能读取的到**

```
关于url后面/的问题
有/会认为是目录，没/会认为是文件。

加了/浏览器会指向一个目录，目录的话会读取默认文件index等等。没有/会先尝试读取文件，如果没有文件再找与该文件同名的目录，最后才读目录下的默认文件。

网址没有加上/会给服务器增加一个查找是否有同名文件的过程。
```

**一旦在服务器端部署，html里面写的地址便成为了url地址，所有的资源都需要通过url继续获取，/便代表了根路径，为便于服务端文件管理，需要将其中的路径更新为/public/..,而在nodejs中引入时需要讲去引入路径写为''.'+'/public/..'**

```
input内可以指定输入的长度 required minlength=‘2’

maxlength=‘10’

placeholder=“XXXXX”（默认内容）

表单提交默认行为会发请求： form action='/pinglun' method='get'
```

#### 解析url：url.parse('url',true)用于解析url中的数据 query，返回一个对象：

该对象的pathname属性为？前的url，？query.后的提交内容（对象）

#### 通过服务器让客户端重定向：

#### 1，状态码设置302（临时重定向）

**res.statusCode=302（每次都需要进行跳转加载）**

**301 永久重定向（浏览器会记住此次访问，下次请求这个路径时就不会通过服务端重新加载了，而是直接从disc进行加载）**

#### 2.在响应头中通过Location告诉客户往哪里重定向

res.setHeader('Location','/')首页及根路径

**一个请求对应一次响应，前面只要有响应，后面就不会再执行了**

### 2.3 总结

1./index.html

2.开放public中的静态资源，请求/public/xxx时，读取响应public目录中的具体资源

3.post post.html

4./pingun

​    4.1接收表单提交数据

​    4.2存储表单提交数据

​    4.3让表单重定向

​       statusCode：302、301

​      setHeader

5.可以再cmd中运行node 来测试一些api：

不需要引入模块直接测试

read eval print loop 

# 3.Node.Js 模块系统

- 模块系统
  +核心模块
  +第三方模块
  +自己写的模块

- npm

- package.json

- Express
  +第三方Web开发框架
  +高度封装http模块
  +更加专注与业务，而非底层细节
  +知其所以然

- 增删改查
  +使用文件夹来保存数据（锻炼异步编码）

- MongoDB
  +(所有方法都回了)

### 1.Node中的模块系统

NodeJS:

+ 核心模块

  + fs

  + http

  + url

  + path

  + os

    

+ 第三方模块：

  + art-template
  + 需通过npm安装

+ 自己写的模块



### 1.0.1.什么是模块化

+ 文件作用域
+ 通信规则
  + 加载require
  + 导出 

### 1.0.2.CommonJs模块规范

+ 模块作用域
+ 使用require方法加载模块
+ 使用exports接口对象导出模块成员



### 1.1.1导出模块中具体成员

exports一般导出用exports.函数名=模块中变量名

module.exports=XXX(如果需要导入的直接就是模块中的成员)，

```
exports.a = 123
exports.b = 'hello'

module.exports = a
module.exports = {
a:123,
b:'hello',
method: console.log('dddd')
}
```

### 1.1.2模块导出原理

默认为每个模块中有一个内部的mudule对象，对象中有个exports模块属性，

在模块中还有

```
exports=module.export
```

在代码最后一句是

```
return module.exports
```

require就是获取这个对象

导出module.exports与导出exports是一样样的

exports是module.exports的一个引用，给exports赋值是没有用的，只能给module.exports赋值，

因此导出单个成员只能用给module.exports赋对象的方式

### 1.2.1.require方法加载规则

+ 优先从缓存加载，为了提高模块加载效率，不会重复进行加载
+ 判断模块标识：require（‘’）括号中的玩意儿，
  + 如果是非路径形式的是核心模块、或第三方模块。
  + 路径形式的模块：相对路径./ ,../不可省略，不能使用绝对路径

+ 第三方模块：会先找main.js目录，否则再找同级的node_modules目录，art-template中package.json目录中的main对应的就是模块的入口，如果package文件有问题或者指定错误，index.js会作为一个默认备选项被加载；
+ 如果还找不到，会向main.js的上一级直至磁盘根目录寻找package或index.js

+ 一个项目有且只有一个node_modules，放在根目录上。

### 2.1.1包说明文件

+ ### npm：node package manager

+ ### package.json:每个项目都有一个这个文件：包描述文件，类似产品说明书，可以通过npm init自动初始化出来，

+ ### 通过npm install可以将package.json中的node_modules依赖项下载出来（git中下载的项目依赖包下载）

  ```
  {
   'dependancies'
  }(安装时--save会加上)
  ```

+ 初始化：npm init

+ 安装的依赖包会自动更新至package.json中：npm install

+ ```cmd
  Press ^C at any time to quit.
  package name: (code) npm-demo
  version: (1.0.0) 0.0.1
  description: 这是个测试项目
  entry point: (3.1.js) main.js
  test command:
  git repository:
  keywords:
  author: wangke
  license: (ISC)
  About to write to F:\前端\Node.js\03\code\package.json:
  
  {
    "name": "npm-demo",
    "version": "0.0.1",
    "description": "这是个测试项目",
    "main": "main.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "wangke",
    "license": "ISC"
  }
  
  ```

### 3.1.1.NPM常用命令

+ 升级：npm install --global
+ 快速生成package：npm init -y
+ 安装所有依赖项：npm install
+ 下载并保存依赖项：npm install --save（一般选这个）
+ 删除包：npm uninstall
+ npm uninstall --save 删除时依赖项也删除
+ 帮助 npm --help
+ npm unistall --help具体帮助（提醒简写法)
+ npm镜像：npm install --global cnpm =》 cnpm install

### 4.1.1.Express

原生http在某些方面表现不足以满足开发需求，需要框架来提高效率，是代码高度统一，node中express就是一个web开发框架。req.query得到get中的参数，res.render('文件名'，{模板对象})

```js
const  express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/about', (req, res) => res.send('Hello World!关于我'))
app.use('/public/',express.static('./public/'))//公开public路径
app.listen(port, () => console.log(`Example app listening on port port!`))
```

### 5.1.1总结

301、302

module导出方式

require方法加载规则：核心、路径、第三方

npm常用命令

packagejson

express基本使用

# 4.Express

## 4.1 初始代码段

```js
const express = require('express')
const app = express()
const port = 3000
app.use('/public/',express.static('./public'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))
```

## 4.2使用第三方工具修改频繁重启服务器调试，每次保存会自动重启调试

```
npm install --global nodemon//全局安装
nodemon app.js //使用
```

## 4.3 基本路由

路由：网络地址分发，地址内容（设备）映射关系

三个方面请求方法、请求路径、请求处理函数

get：

```
app.get('/',()=>{res.send('XXX')})
```

post：

```
app.post('/',()=>{res.send('XXX')})
```

## 4.4静态服务

```js
app.use('/public/',express.static('./public/')) //使用更多！直观
//若'/public/'不写,那么就可以通过url中去掉public的方式直接访问public里的资源
app.use('a',express.static('./public/')) //a代替public
```

## 4.5express中art-template配置

安装express-art-template、art-template，找渲染文件会默认去views中去找

```js
app.engine('html',require('express-art-template'))//配置文件后缀
// app.set('view', {
//   debug: process.env.NODE_ENV !== 'production'
// });
app.set('views', path.join(__dirname, 'views'));//设置默认路径
app.set('view engine', 'art');
```

```js
//routes
app.get('/', function (req, res) {
  res.render('index.html', {
      comments: comments
  });
});
```

其他不需要渲染的html也可以通过render进行页面的显示

### 重定向的方法：

```
  //  res.statusCode = 302
  //  res.setHeader('Location','/')
  //  res.send()
  express：
  res.redirect('/')
```

## 4.6post请求

表单method=’post‘，action=’/post‘,可以利用相同的路径请求多次（不同的方法），get需要需多个名字，post

```
FromData:
content=post%E6%98%AF%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E6%8F%90%E4%BA%A4%E7%9A%84&id=%E5%8F%AA%E6%98%AF%E7%A0%94%E7%A9%B6%E4%B8%80%E5%93%88
```

获取post数据：使用parser，使用req.body提出表单提交对象

```js
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
```

```js
app.post('/post', (req, res) => {
  console.log(req.body);
  const date=new Date()
  req.body.date=date.getFullYear()+'.'+date.getMonth()+'.'+date.getDate()
  comments.unshift(
   req.body
  )
 
 res.redirect('/')
})
```

## 4.7CRUD起步 增删改查

一般通过json储存数据，json转为对象：

```js
JSON.parse(data.toString())
```

## 4.8路由设计

路由设计就是设置url地址，

| 请求方法 | 请求路径         | get参数 | post参数                      | 备注             |
| -------- | ---------------- | ------- | ----------------------------- | ---------------- |
| GET      | /students        |         |                               | 渲染首页         |
| GET      | /students/new    |         |                               | 渲染添加学生页面 |
| POST     | /students/new    |         | name，age，gender，hobbie     | 处理添加学生请求 |
| GET      | /students/edit   | id      |                               | 渲染编辑页面     |
| POST     | /students/edit   |         | id，name，age，gender，hobbie | 处理编辑请求     |
| GET      | /students/delete | id      |                               | 处理删除请求     |
| DELETE   |                  |         |                               |                  |

## 4.9路由模块的提取

新建一个router.js

```js
const router = express.Router()

router.get('/')

...

module.exports=router//最后

在app.js中app.use(router)
```

router.js专门进行路由请求配置和响应函数

app.js专门用与配置相关静态文件，模板引擎（必须要在挂在router之前进行配置），监听服务端返回

## 4.10数据操作模块的封装提取

新建student.js文件，只处理数据，不关心业务：获取所有学生、添加保存学生、更新学生、删除学生

route中回调students中的方法，做出响应

使用回调函数解决异步问题

exports.find=()=>{

fs.readFile  

}

在router.js内最终调用exports.find(（err,data）=>{})实现响应

#### 奥义：封装异步API

不用编辑，隐藏提交的类型“input type=’hidden‘

# 5.回调函数巩固 封装AJAX、模块化、packagelockjson、MongoDB

往往异步API都伴随有一个回调函数（读文件、settimeout、）

require.js（AMD）、sea.js(CMD)可以帮助解决浏览器中的模块化问题

ES6模块化export 。。。import from

app.use不仅仅可以用于配置静态资源、可以配置中间件、挂载路由

## 5.1packagelock.json

用于存放各种依赖项和响应的锁定版本，用于npm install更快，并防止自动生成新版

## 5.3 find、findindex的原理

## 5.5 MongoDB介绍和安装

5.5.1关系型数据库：sql语言操作，操作前需要设计表结构，数据表支持约束（唯一的、主键、非空）

​         非关系型数据库：非常灵活 存放key、value

mongo是最像关系型数据库的**非关系数据库**，它不需要设计表结构，没有结构性

+ 数据库=》数据库

+ 数据表=》集合（数组）
+ 表记录=》（文档对象）

## 5.6 MongoDB的开启和关闭数据库

启动：

```
mongod +回车
```

 执行命令行执行所属盘符下的data/db作为存储目录

修改路径并打开 

```
mongod --dbpath-路径
```

停止 ctrl C

连接数据库：

```
新开cmd命令界面：mongo
```

  默认链接地址为：://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb

```
退出数据库：exit
```

### 基本命令

```
show dbs
```

+ 查看显示所有数据库

```
db
```

+ 查看当前连接的操作的数据库 默认是test

```
use 数据库名称
```

+ 切换到指定的数据库，将默认的test切换为响应的数据库名称

```
db.students.insertOne({"name":"jack"})
```

+ 插入数据

```
db//显示数据库名
show collections //显示已有的集合
db.集合名.find()//显示所有的数据
```

显示数据内容：students就相当于是一个数组，他的元素就是对象（一个个要存放的东西）

**他与关系型数据库不一样，插入的对象的格式可以不一样，不受数据设计的限制 如果给模型命名的时候是加了s的，那么数据库collects的名称不会改变，否则会自动给他加上s后缀**

## 5.7node中操作mongodb

#### 1.使用官方mongodb包：node mongodb，较为原始，不推荐

#### 2.使用mongoose第三方包（基于mongodb包）

```JS
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');//连接数据库

const Cat = mongoose.model('Cat', { name: String });//创建一个数据库模型

const kitty = new Cat({ name: 'Zildjian' });//实例化
kitty.save().then(() => console.log('meow'));//保存
```

```CMD
> use test
switched to db test
> db.Cat.find()！
> db
test
> show collections
cats
> db.cats.find()！！！！！！！！！ 查看所哟
{ "_id" : ObjectId("60c6e526272d8a2e6cc85701"), "name" : "Zildjian", "__v" : 0 }
```



## 5.8mongodb的基本概念

+ 数据库
+ 集合
+ 文档

```
{
 qq库：{
 users:[
   {name：'阿扎尔',age:15},
   {name:'坎特',age:25},
 ],
 goods:[
   {name:'cola',nation:'UK'}，
   {}
 ]
 },
 百度库：{
 
 }
}
```

### mongodb新增数据：

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')//连接数据库

const userSchema = new mongoose.Schema({//设计文档结构
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }
})
//将结构发布为模型
const User = mongoose.model('User',userSchema)//最终的集合名会自动是users，返回一个模型构造函数
const user1 = new User({
  username: 'admin',
  password:'123456',
  email:'admin@admin.com'
})//将其实例化

user1.save().then(()=>{
  console.log('user1存储下来了');
 })
```

### mongodb查询数据：使用的promise，需要注意以下err和data的位置

```
User.find().then((res)=>{console.log(res)})//查询所有数据
User.find({name:'张三'}).then((res)=>{console.log(res)}) //查询符合条件的所有数据
User.findOne({username:'admin'}).then((res,rej)=>{
  if (err) {console.log(err,'出错了');}
  else console.log(res,'没出错');
})//查询符合条件的一个数据，按数据的顺序取第一个作为结果

```

### 删除数据：

```
User.deleteOne({uesename:''}).then(()=>{})
```

### 更新数据：

```
User.findByIdAndUpdate('60c6ee2ae0742e2b50e82f60',{username:'admin'})

coll.update({name:"ZhangSan"},{$set: {password:"567890"}});只更新password此字段的值
```

## 5.9重做增删改查的练习：

在students中进行数据的搭建，并导出数据模型：

在路由js中使用数据模型方法进行处理

```
约束枚举：enum:[0,1]
```

模板引擎each中可以直接用$index+1来获取该元素在列表中的序列

## 5.10使用nodejs 操作mysql数据库

mysql安装：（以管理员运行CMD）

```
E:\Program Files\mysql-8.0.25-winx64\bin>mysqld --install
Service successfully installed.
```

mysql初始化：

```
E:\Program Files\mysql-8.0.25-winx64\bin>mysqld --initialize --console
2021-06-14T08:13:12.142640Z 0 [System] [MY-013169] [Server] E:\Program Files\mysql-8.0.25-winx64\bin\mysqld.exe (mysqld 8.0.25) initializing of server in progress as process 16764
2021-06-14T08:13:12.285258Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-06-14T08:13:19.432186Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-06-14T08:13:31.388346Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: xayfs89vyg!N（这里是后面登陆用的密码）
```

mysql开启服务：

```
E:\Program Files\mysql-8.0.25-winx64\bin>net start MySQL
MySQL 服务正在启动 ..
MySQL 服务已经启动成功。
```

登录验证：

```
E:\Program Files\mysql-8.0.25-winx64\bin>mysql -u root -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.25

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>

```

设置密码：

```
mysql> set password for 'root'@'localhost'='19901115';
Query OK, 0 rows affected (0.18 sec)  
```

退出：

```
mysql>exit
```

增加数据库：

```
mysql> CREATE DATABASE test1；
```

增加数据表：

```
mysql>create table sheet1(id INT(11),name VARCHAR(20),grade FLOAT);
```

查看数据库内的表：

```
mysql> SHOW TABLES
```

查看表中的内容：

```
mysql> SHOW CREATE TABLE SHEET1;
```



### node.js使用包名：mysql

```
安装 npm i mysql --s
```

配置及几大步骤：

```
const nysql = require('mysql')const config = {  host: 'localhost', // 主机名  user: 'BlackCodingCat_Admin', // 数据库用户名  password: 'sjq145866', // 数据库密码  database: 'test_db'  // 要连接的数据库};const conn = mysql.createConnection(config);//创建连接conn.connect((err) => {  if(err){      throw err;  }else{      //执行操作(建表、插入数据、查询、删除数据、修改数据等)      console.log('连接成功');  }});//执行连接conn.query('SELECT * FROM `USERS`',(err,res,field) => {})//查看所有conn.end()//关闭连接
```

增删改基本上就一个query的写法，加上sql语句搞定

```
conn.query('SELECT * FROM `USERS`',(err,res,field) => {})
```

## tips

mongodb的_id使用问题：目前来看，如果是进行数据库的操作比如查找’更新之类的进行约束条件使用，需要加

"_" ,如下

```
 students.deleteOne({_id:queryParams.id}).then()
```

如果单纯是进行读取数据库的内容，则默认id为键值，直接进行提取就好：(each students ).id



# 6.项目结构

初始化git：

```
git init
```

多模块一起安装：

```
npm install nongoose express
```

## 6.1 path的使用

文件绝对路径的使用：

```js
app.set('views', path.join(__dirname, 'views'));//设置默认路径 需要使用path模块
```

```
获取文件名：path.basename（文件路径’，'.后缀名'） 写了后缀名相当于忽略这个后缀名 

获取路径：path.dirname

获取后缀：path.extname

path.parse 路径详细的解析

path.isAbsolute 判断是否绝对路径

path.join 路径拼接
```

node中的非模块成员：

在每个模块中，除了require，exports等模块相关API外，还有两个成员

+ ```js
   _dirname 当前文件所属目录
   _filename 当前文件路径
  ```

与./不同，./是相对于cmd node命令执行目录的路径

**文件操作**中使用相对路径是不可靠的，可以使用path 句对路径进行防错

## 6.2 art-template中的引入其他html

{{include './header.html'}},这个引入并不能解决head body等重复项的引入问题

解决办法：extend 模板继承，对于style和script也同样可以采取此种引入方法

```
{{block 'content'}}<h1>默认内容</h1>{{/block}} //模板layout中block，起个名字叫content
{{extend './layout.html'}}//子html中声明继承
{{block 'content'}}<h1>我不是默认内容</h1>{{/block}}  需要继承的子html中写入内容
```

后续所有资源可以通过使用模板来引入就好了：后端开发常用引用资源

```
/node_modules/bootstrap/dist/css/bootstrap.css
/node_modules/jquery/dist/jquery.js"
node_modules/bootstrap/dist/js/bootstrap.js
```

## 6.3项目html文件布局

_partials中放置可重用的组件，nav、footer、header，需要被频繁拿来引用

_layouts:布局页面

topic文件夹：edit、new、show

settings：admin profile

主要几个板块index、login、register

## 6.4路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登录权限 | 备注         |
| --------- | ---- | ------- | ------------------------- | ---------------- | ------------ |
| /         | GET  |         |                           |                  | 渲染首页     |
| /register | GET  |         |                           |                  | 渲染注册页面 |
| /register | POST |         | email、nickname、password |                  | 处理注册请求 |
| /login    | GET  |         |                           |                  | 渲染登录页面 |
| /login    | POST |         | email、password           |                  | 处理登录请求 |
| /logout   | GET  |         |                           |                  | 处理退出请求 |

## 6.5注册表单提交设计

```
script中：
$() 方法是在DOM中使用过于频繁的 document.getElementById() 方法的一个便利的简写：
$('#register_form').on('submit', ()=>{})
```

## 6.3项目models文件布局

项目中使用的多中数据结构（之前的students类型这种），同一放到models文件夹内

## 6.4 提交给ajax 异步post数据（datatype：‘json’） 

#### 通过ajax异步处理post请求，使用户提交后不会立即跳转页面（至res.send()），主要客户端交互处理-----不用ajax可通过跳转至本页面并且重新渲染请求数据进行处理，但是比较麻烦 服务器进行交互处理

res.redirect只对同步请求有效，对于异步请求不起作用，需要在客户端script  ajax请求内执行window.location.href = '/'才可以

```
res.status(200).json({})//可以将对象直接转换成json字符串格式作为响应
```

## 6.5MD5加密

```
npm i md5-nodejs
body.password = md5(md5(body.password))
//对密码进行两层加密，
```

## 6.6 cookie和session

cookie可以保存一些不太敏感的数据，比如用户名、购物车等

session用于保存一些敏感的数据，主要使服务端（登陆状态等等）,session

状态可以决定cookie是否可以使用

使用session：需要插件

```
npm i express-session


const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',//加密字符串 自动为session提供一个加密字符串，类似与在md5的基础上拼接一个字符串，增加安全性
  resave: false,
  saveUninitialized: true,//无论是否使用，都会默认提供session
  cookie: { secure: true }
}))
```

配置好之后，就可以通过req.session（是个对象）来访问和设置session成员了

当用户注册成功时：

req.session.isLogin = true

req.session.user = user

###### 一般服务器重启后，session丢失，如需持久化session存储：（在mongo数据库）



template的判断显示写法：

```
        {{ if user }}
        <a class="btn btn-default navbar-btn" href="/topics/new">发起</a>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img width="20" height="20" src="../public/img/avatar-max-img.png" alt=""> <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li class="dropdown-current-user">
              当前登录用户: {{ user.nickname }}
            </li>
            <li role="separator" class="divider"></li>
            <li><a href="#">个人主页</a></li>
            <li><a href="/settings/profile">设置</a></li>
            <li><a href="/logout">退出</a></li>
          </ul>
        </li>
        {{ else }}
        <a class="btn btn-primary navbar-btn" href="/login">登录</a>
        <a class="btn btn-success navbar-btn" href="/register">注册</a>
        {{ /if }}
```

##### 退出：1.清楚登陆状态 2.重定向到登录或者首页

**href默认的为get请求！！**

## 6.7项目步骤：

+ 创建目录结构
+ 整合静态页-模板页
  + include
  + block
  + extend
+ 设计用户登录、推出、注册路由
+ 用户注册
  + 先处理好客户端页面的内容（表单控件的name、收集表单数据、发起请求）
  + 服务端
    + 获取表单请求的数据
    + 操作数据库
      + 有错 500 message
      + 其他响应不同数据
    + 配置session，更新状态
  + 用户登录
  + 用户退出





# 7.express中间件

## 7.1输入输出的中间处理环节

在node中就是请求与响应的中间环节

实现：在端口请求时将req.body、req.cookies、req.session、res.render定义，写作执行函数的中间件并在使用时加载此模块，增加req res的属性与方法生态



## 7.2中间件分类：

+ 不关心请求路径与方法的，挂在端口下：

  app.use中不执行next（）的话，则状态停留在当前中间件，next用于调用下一个中间件

​      如果next中无可匹配的执行请求，则express输出cannot get/post XXX

```js
app.use((req,res)={
XXXXXXXXX
next()
})
```

+ 关心请求路径开头的中间件

  ```js
  app.use('/aaa',(req,res)=>{
  
  })
  //请求以/aaa开头的路径，响应时拿到的req.url为去掉aaa之后的路径
  
  ```

+ 除了以上两种中间件外，app.get,app.post是严格匹配请求路径的中间件，也有next

+ 可以通过中间件将请求分发到多个路由

## 7.3第三方中间件

**body-parse** 其实他就是将逻辑写在了端口请求上

在同一个请求所经过的中间件，可以互相使用req的参数方法等

内置中间件：express static

错误处理：next(err)会直接跳转至接受err的中间件并处理

```
app.use((req,res,next)=>{

fs.readFile("ddd",(err,data)=>{
   if (err) {
   
   next(err)
   }
})

})会将err传递到接受4个参数的中间件，作为该中间件的第一个参数

app.use((err,req,res,next)=>{

})


```

```

```

配置一个全局处理404的中间件：

写到所有请求之后：

```
app.use((req,res)=>{

res.render（404.html）})


```

## 7.4 在node中运行cmd命令

```
//启动e盘的mongo数据库
const exec = require('child_process').exec;
function  execute(){
    var cmd='e: && mongod';
    exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.log(error);
        }
        else{
            console.log("成功");
        }
    });
}
execute();
```

