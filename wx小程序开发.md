# 小程序开发

## 1.注册小程序账号

注册=》获取app ID=>下载微信开发者工具=》使用

## 2.应用程序的结构

APP=》page1 page2 page3=》组件（内置 自定义）

APP：app.js全局实例代码  app.json全局配置（作为整个小程序的入口） app.wxss全局样式

1.定义app.json文件：定制入口页面page：（需要四个文件 wxml json wxss js）

依据路径创建文件，json里直接配置自动生成响应文件

```
{
  "pages": [
    "pages/home/home",
    "pages/about/about"
  ]
}
```

## 3.项目管理

利用git分支进行管理？

利用git tag进行管理

利用git checkout tag1进行项目转换

## 5.小程序初体验

js中data中定义变量，wxml中进行mustache语法引用

列表类展示 标签中变量也要使用mustache语法 默认有item和index

```
<view wx:for="{{students}}">{{item.name}}</view>
```

**点击事件绑定：**

**bindtap是冒泡的，catchtap是非冒泡的**

```
<button bindtap="click" catchtap="click">点我加1</button>
```

这种方法界面并不会进行更新 是错误做法

```
  click:function(){
    console.log('点了')
    this.data.counter++
    console.log(this.data.counter)
  },
```

**正确做法**使用this.setData

```
   click:function(){
    console.log('点了')
    // this.data.counter++
    // console.log(this.data.counter)
    this.setData({counter:this.data.counter+1})
  },
  
  subclick(){
    this.setData({counter:this.data.counter-1})
  },
```

## 6、小程序MVVM

viewmodel作为view（dom）和数据（model）中间的通讯层进行绑定，且形成双向绑定

1.数据绑定

2.dom监听

原生js操作dom：命令式编程 三大框架：生命式编程

## 7.project和sitemap

小程序的导航栏和tabbar一般都是一个格式的，是小程序本身预置好的值，只需要开发者自己进行配置

小程序的配置文件：

+ app.json:全局相关配置，配置html页面入口

```
{
  "pages": [
    "pages/home/home",
    "pages/about/about"
  ]
}
```

+ page.json:页面中的配置文件

```
{
  "usingComponents": {}
}
```

+ project.config.json 项目配置文件、如项目名称、appid等，用于控制配置管理
+ sitemap.json 小程序搜索相关：

```
  "rules": [{
  "action": "allow", //允许微信爬虫
  "page": "*"//生效页面
  }]
```

+ project.private.config.json

## 8.全局配置

+ app.json:

| 属性   | 类型     | 必填 | 描述                                         |
| ------ | -------- | ---- | -------------------------------------------- |
| pages  | string[] | 是   | 页面路径列表                                 |
| window | Object   | 否   | 全局的默认窗口表现，顶部颜色、下拉之后的页面 |
| tabBar | Object   | 否   | 底部tab栏的表现                              |

+ windows

```
  "window": {
    "navigationBarBackgroundColor": "#123456",//导航栏背景颜色
    "navigationBarTextStyle": "white",//文字颜色 只能设置white或black
    "navigationBarTitleText": "牛逼",//文字内容
    "backgroundColor": "#eeeeee",//背景颜色
    "backgroundTextStyle": "light",//设置下拉时的小点的样式 dark light
    "enablePullDownRefresh": false//下拉刷新开启 对安卓下拉有效选true 一般在页面中进行设置 在全局中比较少打开
  }
```

+ tabBar

```
  "tabBar": {
     "color": "#d81e06",//默认文字颜色
    "selectedColor": "#f4ea2a",//选中时的颜色
    "list": [
      {
        "pagePath": "pagePath",//指定跳转页面  写入"pages/home/home",
        "text": "text",//分类文字
        "iconPath": "iconPath",//图标路径 建立一个文档assets 放图标相关文件
        "selectedIconPath": "selectedIconPath"//选中时的图片 assets/tabbar/category/all.png
      }，
            {
        "pagePath": "pagePath",//指定跳转页面  写入"pages/home/home",
        "text": "text",//分类文字
        "iconPath": "iconPath",//图标路径 建立一个文档assets 放图标相关文件
        "selectedIconPath": "selectedIconPath"//选中时的图片 assets/tabbar/category/all.png
      }
    ]
  }
```

其他还有背景颜色、边框样式都可以进行设置

## 9.局部配置page

导航栏的标题可以在分页的json文件中进行更改

```
{
  "usingComponents": {},
  "navigationBarTitleText": "关于"
}
```

## 10.小程序的双线程模型

+ 小程序的宿主环境：微信客户端（js wxml wxss）

+ 提供了双线程模型

| 渲染层                                      | 逻辑层 |
| ------------------------------------------- | ------ |
| 每个页面是一个webview，每个页面抽象成树结构 | jscore |

首先将wxml抽象成一个虚拟dom树，同时js逻辑层提供数据，两者进行绑定成真正的js对象，然后再转成真正的dom页面树结构（渲染）

当通过setData改变数据时，会对前后两个js对象进行对比（diff算法），将差异更新到原来的Dom树上。达到数据驱动界面！

## 11.小程序启动流程

+ 下载小程序包

+ 启动小程序

+ 加载解析app.json

+ 注册App() =》执行生命周期函数

  app.js:

  ```
  App({生命周期函数们})
  ```

+ 加载自定义组件代码和 注册自定义组件
  + 加载解析page.json
  + 渲染层加载渲染wxml
  + js逻辑层注册page()=>执行生命周期函数

**小程序的生命周期函数**：

+ onLauch：启动完成初始化：一般执行获取用户信息wx. getUserInfo、发送网络请求wx.request（不会是请求大量数据），他们是异步调用

```
wx. getUserInfo({sucess:function(res){console.log(res)}})
wx.request({url:''})
```

目前 getUserInfo需要在小程序插件中使用时，需要在用户信息功能页中获得用户授权之后调用。否则将返回 fail

可使用getUserProfile代替（需要用户进行点击确定）

+ onShow 界面显示时调用
+ onHide 界面被隐藏时被调用 小程序会默认在后台存活5min，不会死掉
+ onError 发生错误时执行

抛出错误 throw new Error()

+ onPageNotFound 找不到页面时

## 12.注册App时做了些什么

1.判断小程序的**进入场景**：从微信首页进入？从发现中进入？从用户分享中进入？从朋友圈进入？

可以通过onshow中的options进行获取scene 或者onlauch中也可以进行获取options

2.监听**生命周期函数** ，执行对应业务逻辑，比如获取用户信息，并将其传到服务器

signature："5974848b7b8ee3ca56a73211f039faa7f2ecb3b8"

**获取用户信息**：button绑定点击函数，函数中启用获取用户信息如下：

```
wx.getUserProfile({

   desc: '为了服务客户',

   success: (result) => {console.log(result);},

   fail: (res) => {},

   complete: (res) => {},

  })
```

+ 在页面中展示用户信息：

  ```
  <open-data lang="zh_CN" type="userNickName"></open-data>
  <open-data lang="zh_CN" type="userCity"></open-data>
  
  ```

  

3.在App实例中可以放入以下**共享数据**，为全局共享

```
App({
  golbalData:{
    name:'wangke',
    age:31
  },
  。。。
```

然后再需要使用的页面的js中引入实例中的数据

```
const app = getApp()
再data中使用
globalname:app.globalData.name
```

## 13.注册Page时做了些什么

+ 绑定初始化数据

可能需要请求数据，并绑定之自己的数据

+ 生命周期回调：

  + onload：页面被加载时 

    用于请求数据 注意 网络请求前必须将请求url配置到控制台才可以（或者将详情中的不校验合法域名勾选上）

  ```
    onLoad: function (options) {
      wx.request({
        url: 'http://152.136.185.210:7878/api/m5/recommend',
        success:(res)=>{
          console.log(res);
        }
      })
    },
  ```

  **注意数据赋值时使用setData**

  ​        

  + onshow：页面显示出来时
  + onready：初次渲染后才会执行（重复进入是不会执行的）
  + onhide：页面隐藏时
  + onunload：跳转 具有页面销毁动作时

+ 事件处理函数

 绑定页面响应处理函数

+ 监听其他事件：

  + 比如页面滚动、不需要再wxml中进行绑定的

    如 enent 有属性scrollTop: 5656

```
  onPageScroll(event){
    console.log(event);
    // console.log('home页面在滚动');
  },
```

+ + 上拉加载更多

    ```
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
        console.log('已经到最低谷了所以');
      },
    ```

    

  + 下拉加载更多：注意要开启 配置中要开启"enablePullDownRefresh": true

    ```
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {
        console.log('怎么走都是向上的');
      },
    ```

+ onResize 尺寸发生改变时
+ onTabItemTap点击tab会触发

## 14.page生命周期图

视图层初始化时，需要向逻辑层通知数据请求

js 创建好之后会执行onload和onshow函数并等待视图层的数据请求，得到请求后提供给视图层

开始进行渲染（此时js执行onready函数），js的onready执行完之后进入active，将数据发送给视图层

视图层会实时进行渲染，在active期间，onhide（退出之后台）、onshow （回到前台）会依照用户操作执行，并

且更新视图层，在最后销毁页面时，将执行onunload并且视图层‘逻辑层都结束

## 16.内置组件 Text组件

+ 行内元素 用于文本内容

+ **\n**可以在句末加，用来换行

+ 属性

  + user-select 是否可选 布尔 默认是{{false}}不可选 selectable已经启用

  ```
  <text user-select="{{false}}">你好 小程序 不可以选\n</text>
  <text user-select="{{true}}">你好 小程序 可以选\n</text>
  <text space="nbsp">hello world\n</text>
  注意设置为<text user-select="{{true}}会导致\n无法起作用
  ```

  

  + space 显示连续空格 string 决定文本空格的大小：nbsp（较小 英文字符大小） ensp（半个中文字符大小） emsp（一个中文字符大小） 

  ```
  <text space="nbsp">hello world\n</text>
  <text space="ensp">hello world\n</text>
  <text space="emsp">hello world\n</text>
  
  ```

  + decode是否解码 布尔

  ```
  <text decode="{{true}}">&gt;3\n</text> >3会对原生html中的标识符进行解码
  <text decode="{{false}}">&gt;3\n</text> &gt;3不会解码
  或者直接
  <text decode>&gt;3\n</text>
  <text >&gt;3\n</text>
  ```


## 17.button按钮

独占一行

+ size 属性：size=’mini‘可以变为行内属性
+ type：三种新样式

```
<button size="mini" type="primary">我是一个按钮</button> 绿底白字
<button size="mini" type="default">我是一个按钮</button> 灰底绿字
<button size="mini" type="warn">我是一个按钮</button> 灰底红字
<button size="mini">我是一个按钮</button> 灰底黑字
```

+ 镂空效果：plain 会加边框且清除背景颜色

```
<button size="mini" plain>我是一个按钮</button>
```

+ disable 不可用 直接写
+ loading 有个小圆在转 直接写
+ hover-class=’XXX‘，然后再css中绑定hover的样式 可以更改点击时的样式

## 18.view组件

容器组件，相当于div，块级独占一行

常见属性

+ hover-class 与button一样
+ hoverstaytime：hover状态保留时间
+ hoverstarttime：开始变化事件

注意最好写成mustache语法形式

+ hover-stop-propagation 可以阻止点击事件冒泡

## 19.image组件

即可以写成但标签也可以写成双标签：默认有空间 320*240px 是一个行内块元素 

+ src：可以是本地地址、也可以是远程地址

+ 选择相册中的图片：绑定函数 执行

```
  chooseYourOwn(){
    console.log('点我淦吗');
    wx.chooseImage({
      count: 0,
      sizeType: [],
      sourceType: [],
      success: (result) => {
        console.log(result);
        this.setData({imgUrl:result.tempFilePaths[0]})
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
 输出：
{errMsg: "chooseImage:ok", tempFilePaths: Array(1), tempFiles: Array(1)}
errMsg: "chooseImage:ok"
tempFilePaths: Array(1)
0: "http://tmp/McxFZYKwTm2B3d9275c9ac3287dec8303453c254fcd4.png"
length: 1
nv_length: 1
__proto__: Array(0)
tempFiles: Array(1)
0:
path: "http://tmp/McxFZYKwTm2B3d9275c9ac3287dec8303453c254fcd4.png"
size: 13889
__proto__: Object
length: 1
nv_length: 1
__proto__: Array(0)
__proto__: Object
```

苹果可以使用choosemedia，暂时看chooseimage对于我的手机无效

```js
wx.chooseMedia({
  count: 9,
  mediaType: ['image','video'],
  sourceType: ['album', 'camera'],
  maxDuration: 30,
  camera: 'back',
  success(res) {
    console.log(res.tempFiles.tempFilePath)
    console.log(res.tempFiles.size)
  }
})
```

 

+ 启动选择聊天页面：

  ```
      wx.chooseMessageFile({
        success: (result) => {
          console.log(result);
  
          this.setData({imgUrl:result.tempFilePaths[0]})
        },
  ```

+ **mode** 设置拉伸模式 设置图片显示模式：

   默认 拉伸至填满image元素（可以对image设置尺寸）

   aspectFill：只保证一个边能显示出来

​    aspectFit：完全能显示出来

​    widthfit：宽度不变 高度自适应

其他 top bottom等自行尝试

+ lazyload 懒加载 用于显示的时候才加载 默认不是懒加载
+ bindload 监听图片加载完成 相当于vue里onload

+ show-menu-by-longpress长按图片可以保存 收藏 发送图片 识别小程序码（如果是小程序码会进行识别），不是则不显示

```
<image src="{{imgUrl}}" show-menu-by-longpress></image>
```

## 20.input组件

可以是单标签  默认背景透明 无边框

value默认值

type：可以决定弹出键盘类型  text文本  digit带小数点数字 number 数字  idcard 身份证号

password：输入密码

palceholder：提示语

confirm-type：可以更改键盘在此输入框输入后的跳转（回车）按钮名称

```
<input confirm-type="search"/>
```

input能绑定的事件

+ bindinput 输入时触发 可以通过event获取内容
+ bindfocus 获取焦点 
+ bindblur 失去focus时触发

+ bindconfirm 提交时触发
+ bindkeyboardheightchange

## 21.scroll view

用于做局部滚动 scroll-y scroll-x

```
<scroll-view scroll-y class="container1">
<view wx:for="{{20}}">{{item}}</view>
</scroll-view>
```

scroll-with-animation 滚动动画效果

bindscroll：可以监听滚动事件

```
event内容：
{type: "scroll", timeStamp: 51736, target: {…}, currentTarget: {…}, mark: {…}, …}
currentTarget: {id: "", offsetLeft: 0, offsetTop: 0, dataset: {…}}
detail: {scrollLeft: 914, scrollTop: 0, scrollHeight: 220, scrollWidth: 4000, deltaX: -4, …}
mark: {}
mut: false
target: {id: "", offsetLeft: 0, offsetTop: 0, dataset: {…}}
timeStamp: 51736
type: "scroll"
_userTap: false
```

bindscrolltoupper ：监听滚动到最始端

bindscrolltolower ：监听滚动到最底端

upper-threshold：设置一个数字 用于监听距离顶端距离多少时

lower-threshold：设置一个数字 用于监听距离底端距离多少时

## 22.组件的共同属性

id class style hidden：隐藏  data-*  bind* catch*

## 23.样式的三种写法

行内样式（优先） 全局样式 页内样式  样式后加！import优先级最高

## 24.选择器、自适应和样式导入

.class #id element...

+ 自适应尺寸：新增尺寸单位：rpx 会根据屏幕进行尺寸自适应  对字体大小也有效（**在iphone6 375*667 屏幕1个rpx为0.5个px**（只要宽为375），所以rpx的数值为px的2倍，切换屏幕会自动调整这个比例以适应机型）

+ 当页公共样式导入：当页文件夹下新建style文件夹，依照class类型进行抽取样式（或者其他抽取方法），  当夜css中使用@import进行导入

+ 多页公共样式导入：在项目路径下新建style文件夹，依照具体类型进行抽取样式，在app的css的进行@import

+ 官方样式库：git下载weui-wxss-master 用微信开发者打开weui-wxss-master的dist文件目录
+ 组件的特有样式可以在widget中进行导入，标签语言选择性进行粘贴插入

## 25.mustache语法细节

wxml：必须有严格的闭合 

mustache语法：{{}}内可以使用运算、三目运算符  可以使用添加属性的方式进行绑定样式（和vue一样），注意和vue不同的是需要使用mustache内三目语法

```
<button catchtap="tapclick">点我变换颜色</button>  //tapclick函数定义isActive的反转
<view class="container3 {{isActive?'isActive':''}}">hahaha</view>
```

## 26.条件判断

+ wx.if  wx elseif wx.else 选择是否渲染组件，他决定页面是否存在该元素，他与hiddne属性不同，他如果频繁切换渲染与否，可能会影响性能.

+ hidden只是隐藏，元素还存在，还会占有空间

## 27.列表的渲染

**wxfor可遍历：**

+ 数组（需要写到{{}}内）

  ```
  <view wx:for="{{[1,2,3,4]}}">{{item}}</view>
  ```

  

+  字符串  直接使用

```
<view wx:for="56789">{{item}}</view>
或者
<view wx:for="{{'56789'}}">{{item}}</view>
```

+ 数字

```
<view wx:for="{{10}}">{{item}}</view>
```

**block标签**：用于包裹一组标签  它不同于view 不会单独创建一个新的组件，较view这种实例包裹可以提高不少性能，block上同样可以使用if for进行操作（bolck只接受控制属性、其他的不接受），也有利于代码阅读和划分！！！

**index item：**重命名 多层遍历时可以使用（便于开发者进行区分）

```
<view wx:for="{{idols}}" wx:for-item="idol" wx:for-index="inx">{{idol+' '+inx}}</view>
```

关于遍历**加不加key**：**会影响性能**  不加key的话：再加入新元素时会遍历所有影响index的元素进行重新渲染

加了key之后，可以复用前面已经有的元素，不在大范围更新   **！更高效的更新虚拟DOM**

## 28.wxml导入

模板语法：template  必须要制定name template标签不会参与渲染

在不被使用时是不会进行任何渲染的：使用模板：（用is指向name）

```
<template name="template1">
<button>我是模板中的按钮</button>
<text>hahahhaha</text>
</template>
<template is='template1'></template>xxxxxxxxxx <template name="template1"><button>我是模板中的按钮</button><text>hahahhaha</text></template><template is='template1'></template>v
```

template的复用： 再模板中写入mustache变量，再实例中使用data进行传值，注意key要与变量名保持对应关系

```
<template name="template1">
<button>{{data1}}</button>
<text>{{data2}}</text>
</template>
<template is='template1' data="{{data1:'gagagag',data2:'hehehe'}}"></template>
```

如果想要从文件中导入模板，可以使用**import**，但是**不支持递归导入**即模板中套模板

```
<import src="../../wxml/template.wxml"></import>
```

可以使用include导入文件中包含import标签的wxml，这样就相当于迭代使用的该import内容

```
template文件中引入了dog.wxml
<template name="template1">
<button>{{data1}}</button>
<text>{{data2}}</text>
</template>
<import src="./dog.wxml"></import>
```

```
使用import引用直属的template，而使用include引入dogwxml这种内部通过import引入的标签（他对template和wxs（微信脚本）无效）
<import src="../../wxml/template.wxml"></import>
<include src="../../wxml/template.wxml"></include>
<template is='template1' data="{{data1:'gagagag',data2:'hehehe'}}"></template>

<template is='dog'></template>
```

## 29 30.认识wxs的作用和使用

可以用于构建网页结构的脚本语言，用于在页面中进行调用脚本运算

使用：在wxml中构建wxs标签，然后内部写js代码：

+ 不可以是es6语法
+ 可以新建wxs文件，内部写js代码，然后引入
+ html中使用module内部属性或方法时必须要加模块名

```
<wxs module='info' src='/wxs/info.wxs'></wxs>//引入方式
<text id="haha">{{info.sum(3,2)}}</text>

<text id="haha">{{info.foo}}</text>
<text id="haha">{{info.sum(3,2)}}</text>
```

+ 模板内部属性即方法定义以及导出：

```
 var foo = 'helloworld'

 function sum(a,b){

  return a+b

 }
 console.log(sum(3,4));

 module.exports={sum:sum,foo:foo}
```

## 31.wxs的案例练习

+ **对价格的格式化**

保留两位小数

```
XXX.toFixed(2)
```

+ **对时间的格式化**：略

## 32.常见的事件类型

+ bindtap：可以写成bind：tap

+ catchtap 他会阻止冒泡

+ imput scrollview自有事件
+ touchstart touchcontrol 触摸时被打断事件 touchmove  touchend  tap：点击

longpress 长按350ms   longtap：推荐使用press代替

## 33.事件对象的解析

event：

+ timeStamp：从页面打开到事件触发的事件
+ target：触摸的组件元素 产生事件的view（受影响的view）
+ current target：触摸的组件元素  （触发事件的组件元素,被点击的）
+ detail：点击的offset位置（距离left top）
+ touches：触摸点（点击位置、对应的触摸信息） 用于**记录当前屏幕所有触摸中**的手指（在touchend中不会保存信息）

+ changedtouches：用于记录**发生过的变化**的手指（在touchend中会保存信息）

## 34.事件的参数传递

通过**data-tag=**“{{}}”,然后在事件event属性中可以通过tag获取相应的触发事件属性

绑定：

```
<block wx:for="{{clothes}}" wx:key="index">
<view bindtap="tapclick" data-name="{{item}}" data-index="{{index}}">{{item}}</view></block>
```

获取：

```
  tapclick(event){
    console.log(event.currentTarget.dataset.index);
    console.log(event.currentTarget.dataset.name);
  }
```

## 35.事件冒泡与捕获

事件的捕获：capture-bind:tap  从外向内

事件的冒泡：bindtap  从内向外

使用catch会阻止捕获或者冒泡的进一步向后传递

## 36.组件化开发

将大问题拆解为小问题，将复杂页面拆分成组件

```
自定义文件夹components下组件名文件夹，然后右键新建组件会自动生成与文件名一致的四个文件 js wxml wxss json
然后再需要引入组件的页面json中：
"mycpn": "/components/mycpn/my-cpn"
wxml中：
<mycpn/>
```

## 37.自定义组件的注意事项 

+ 命名：小写字母中划线可以使用，不要特殊符号

+ 组件中也可以引用组件
+ 不要以wx作为前缀
+ 多页面使用该组件时，可以在app.json中进行全局注册

## 38.组件的样式细节

+ 组件中的样式设置对引入页面中的样式不会有影响

+ 页面中的样式也不会影响组件内的样式

----》使用class设置组件样式会有隔离效果

组件中样式不允许使用id 标签选择器！！！

如果要组件实现页面个性化复用：

组件的js文件中，

```
页面设置对组件产生影响，组件不能影响该页面
options:{

styleIsolation:"apply-shared"} 默认isolated

双向影响，即没有设置样式的一方会自动使用另一方的样式：
options:{

styleIsolation:"shared"} 默认isolated
```

## 39.组件与页面通信

页面---》组件  ：

+ 数据 property 

```
组件 properties: {

  title:String

 },
 也可以写成：
     title:{
      type:String,
      value:'wuwuwu',
      observer(newval,oldval){
        console.log(newval,oldval);//可以用于监听旧值和新值 hahahah//传过来的值 wuwuwu默认的值
      }
    }
```

然后再引用的组件标签上赋值：title="hahaha"，在组件中引用{{}}，这就完成了页面向组件的数据传递

+ 样式 externalClasses

```
<view class="container titleclass">我是组件标题{{title}}</view> 组件中
与property平级设置：externalClasses:['titleclass'], 组件js中
<my-prop title="hahahah" titleclass="blue"/>//在引用组件的页面中进行绑定class 并在页面的样式表中定义blue
```

注意：组件中不能使用其他class定义颜色，否则会不生效

+ 标签：slot



组件--》页面：

+ 自定义事件

组件中定义的函数需要写到组件的methods里面：

```
  methods: {
    addcount:function(){
      console.log('组件确实点击了');
      this.triggerEvent('addcount1',{},{})
    }
  }
```

this.triggerEvent('传递的名字',数据，{})

在页面使用的时候在引用该组件上bind:传递的名字=“页面函数”，在定义页面函数中改变自有属性就好了

```
  addcount1(){
    console.log("收到信号");
    this.setData({count:this.data.count+1})
  }
```

## 41.tabcontrol组件练习

+ 组件trigger传输的loads会在引用页面绑定的函数的event中找到

+ 下划线这种比自己稍宽的样式可以通过包裹一个text标签在进行样式设置

## 42.获取组件对象的方式

在页面的方法中使用this.selectComponent（'css类或者id选择器'）获取该组件

然后再调用该组件的自身函数定义的setData方法

组件中定义函数：

```
  methods: {
    addcount(num){
      this.setData({counter:this.data.counter+num})
    }
  }
```

页面js中引用组件并调用其方法：

```
  addcount(){
    var mysel = this.selectComponent('#my-sel')
    console.log(mysel);
    mysel.addcount(20)
  }
```

## 43.插槽slot的使用

预留插口 用于扩展

对一个最基本组件而言，如果其内部的分布不确定，灵活的，可以为其预留插槽以保证灵活性

+ 单个插槽的使用：

```
<my-slot>
<text>我是插入的按钮</text> text内容会出现在组件中的slot定义位置
</my-slot>
```

slider标签：value 表示上划线位置

+ 多个插槽的使用

①为组件插槽起名字  ②插入标签中 slot=“名字” ③ 组件js中options：{multipSlot：true}

## 44.component构造器

可以定义的有：

property：用于组件接受数据

data：定义初始化数据

methods：定义组件内部方法

option：定义配置选项：样式隔离 、slot多用

externalClass：传入class 

observers：**监听data**的改变 默认参数（newval） **property中也可以定义observers，但他可以监听propertynew 和old值**

### **关于组件的生命周期**：

+ 监听所在页面的生命周期：

```
写到pageLifetimes:{

show(){},页面显示

hide(){},页面隐藏

resize(){}页面尺寸改变

}
```

+ 监听组件本身的生命周期

```
写到lifetimes：{
 created（）{}，创建
 attached(){},挂载 添加
 ready(){},渲染出来
 moved(){},移动组件 被移动到了另外一个节点
 dettached(){}组件被移除  用wx-if时
}
```

## 45.网络请求 基本使用过程

一般网络请求在onload里进行：

```

```

设置网络请求前需要预先设置好通讯域名，小程序只能与指定域名进行通信

允许与局域网IP进行通信,但不允许与本机ip通信（127.0.0.。。）

允许tcp通信

+ 配置域名：在小程序后台 设置 开发设置 服务器域名进行配置

测试阶段可以将详情中 不检查合法域名关闭即可

+ url 
+ data 放参数{key：value} get 都适用 post 中会以json的数据保存
+ method：请求方式 默认为get
+ header：请求头
+ datatype 默认json
+ responseType：返回的数据类型 默认text
+ sucess ：成功
+ fail：失败
+ complete：调用结束

## 46.网络请求工具封装

+ 降低网络请求与wx.request的耦合度

+ 使用promise优化网络请求结果的获得

```
封装：export default function request(options){

 return new Promise((res,rej)=>{
   wx.request({
     url: options.url,
     method:options.method||'get',
     data:options.data||'',
     success:res,
     fail:rej 
   })
 })
}
使用：
import request from '../../network/request'
onload中：
    request({
      url: 'http://httpbin.org/post',
      method:'post',
    }).then(res=>{console.log(res);})

```

## 47.弹窗的展示

系统提供了四种API用于弹窗效果

1.Toast：

显示确认弹窗

```
  showToast(){
    wx.showToast({
      title: '你好啊',
      duration:10000, 持续事件10s
      icon:展示图标'loading' 默认为success
      image：传入自定义图标
      mask：true点击后按钮不可以进行交互
      sucess：弹窗成功，
      fail：失败方法
      complete：调用API完成 不会等待消失才完成
    })
  }
```

2.showModal

```
  showModel(){
    wx.showModal({
      cancelColor: 'yellow',
      title:'我是标题',
      content:'我是内容',
      showcancel:默认为true，
      cancelText：文字内容更改
      success(res){res}
    })
  }
  可以显示确认 取消并且可以对其颜色进行设置
```

3。showloading 需要主动调用 wx.hideLoading才能够关闭 比如使用定时器去调用，或者在网络请求的sucess中进行调用

```
  showLoading(){
    wx.showLoading({
      title: 'title',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
```

4.showAction 从底部弹出弹出弹框，并且可以在itemlist中进行定制内容

```
list展示顺序为从上往下，可以从result中获取用户选择的结果
  showAction(){
    wx.showActionSheet({
      itemList: ['猜一猜','摇一摇','扭一扭','泡一泡'],
      // alertText: 'alertText',
      // itemColor: 'itemColor',
      success: (result) => {console.log(result);},
      fail: (res) => {},
      complete: (res) => {},
    })
  }
```

以上 针对真机，颜色设置需要使用#FFFFFF格式，不能直接写为颜色，真机不识别，会不显示对应文字

另外action的抬头 alertText在开发工具中不显示

## 48.页面分享

1. 点击右上角三点按钮会触发js中以下函数：

   ```
   onShareAppMessage: function () {
   
     return {===》可定义
   
   title：‘XXX’，
   
   path：点击后进入的页面url，
   
   imageUrl：分向展示的图片url（默认会将首页页面作为截图进行分享），
   
   
   }
   
    },
   ```

   

2. 自定义分享按钮

   button标签中open-type=‘share'，点击将实现激活share函数

## 49.小程序的登录流程

小程序 ====》开发者服务器 ====》微信接口服务

开发者服务器 ====微信接口服务之间会进行沟通，拿到openID 和会话键 session key

流程：字体加重为客户端需要做的

1.**小程序客户端调用**wx.login() **从客户端获得**code，通过login的参数对象中的sucess回调可以获取code

2.获取code**后小程序使用**request发送code（这里可以需求用户传入用户名和密码）

3.开发者服务器获取code后将appid和appsecret（这两个在小程序控制后台可以获取到） 即小程序密钥  传给微信服务器

4.开发者服务器与微信接口服务之间会进行沟通，拿到openID（作为微信用户唯一表示） 和会话键 session key（这里也可以需求用户传入用户名和密码）===》至此确认用户成功登录

5、开发者服务器为小程序客户端返回一个token令牌，**小程序可以保存到storage中**，下一次进入时将验证token是否过期，并进行相应响应

6.**客户端携带登录状态**向开发者服务器发送业务请求，服务区进行业务数据的返回

## 50.小程序登录代码演练

app.js  onload函数中：

```
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
```

获取结果：code只有五分钟的有效期

```
{errMsg: "login:ok", code: "011nJI00045tZL1SVk400nhflo1nJI0U"}
code: "011nJI00045tZL1SVk400nhflo1nJI0U"
errMsg: "login:ok"
__proto__: Object
```

后台请求token接口：

+ 接口地址：/login
+ 请求方式：post
+ 参数列表：code 可选择用户名密码等
+ 返回值：token

注意请求时data的书写方式应该是{key:value}!!基本常识！ 如果key value一致可以使用增强写法{data}

login请求

```
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        request({
          url:"http://123.207.32.32:3000/login",
          data:{code},
          method:'post'
        }).then(res=>console.log(res))
      }
    })
```

login请求返回

```
{data: {…}, header: {…}, statusCode: 200, cookies: Array(0), errMsg: "request:ok"}
cookies: []
data: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2M…YzNH0.plSfibfyKJssvK2k8vayQY9mwYZrki2GJh5qI1MX6rg"}
errMsg: "request:ok"
header: {X-Powered-By: "Express", Access-Control-Allow-Origin: "*", Content-Type: "application/json; charset=utf-8", Content-Length: "140", ETag: "W/"8c-G9a03B8pUULRLE1/qq7xmoJYqsQ"", …}
statusCode: 200
__proto__: Object
```

+ 可以将token保存至golbalData之中：**关于globalData异步变量的问题，app异步还没完成时，页面已经加载完成，除了首页外其余页面可以通过onshow获取globalData值**，首页需要在二次进入onshow中才能够读取到真实的globalData值，但这个也不一定，需要依据请求的时间来确定

```
          const token = res.data.token
          this.globalData.token = token
          console.log(this.globalData.token );
          
          
  globalData: {
    userInfo: null,
    token:''
```

+ 也可以将其保存到本地存储（不随着关闭小程序而消失）

wx.setStorageSync('key'，data) Sync同步的 执行完这部代码后才会向下执行

wx.setStorage（{

key：

data：

}）异步 不会等待

```
 // this.setStorageSync({key:'token',data:token})
wx.setStorageSync('token',token)
```

防止频繁登录，利用缓存验证token

+ 从缓存中取出：用于登录回调函数开始时执行，验证token

```
 //先从缓存中取出token
    const token =wx.getStorageSync(TOKEN)
    
///验证token是否存在
    if (token) {
      this.token_check()
    }
    else{
      this.login() 在App内定义方法
    } 
```

+ 验证token接口设计

+ + 接口：/auth  

  + 请求：post  

  + 参数：header：token（本地保存的token）

  + 返回值

  + 错误码：1001没有传入token 1002传入错误的token 1003：token过期

  + token验证：

    ```
      token_check(token){
        wx.request({
          url: 'http://123.207.32.32:3000/auth',
          method:'post',
          header:{
            token
          },
          success(res){
            console.log(res,'我是成功的');
          },
          fail(res){
            console.log(res,'我是失败的');
          }
        })
      }
    ```

  ## 51.页面跳转 navigator组件.

  点击将跳转“：

  注意这里url**的写法**！！

  ```
  <navigator url="/pages/detail/detail">点我跳转到详情页</navigator>
  ```

  open-type="redirect" 右上角显示回到主页 关闭当前页面 不可以对tabbar进行redirect

  open-type="navigate" 默认 跳转后会显示返回 

  open-type=" swichtap"  跳到tap页面（即在tabbar内进行跳转）

  open-type="  relaunch"：关闭当前**所有**页面

​        open-type="navigateBack" 自定义返回 注意 他只能对应navigate进行设置 还可以设置delta=’数字‘ 定义返回的层级数进行多页跳转

## 52.跳转过程进行数据传递

+ 正向跳转传递

  可以在navigator url后加上get传递的参数形式？XXX=XXX&XXX=XXX这样的

接收：被跳转页面的onload的参数options中便带有传递的数据 option直接就是params对象

```
<navigator url="/pages/detail/detail?name=hahaha&id=22" open-type="navigate">点我跳转到详情页传递数据</navigator>
```

+ 返回跳转传递

在页面退出的时候unload时 使用getCurrentPages 获取当前所有活跃页面 使用index为活跃page的length-2即指向上一个页面

```
  onUnload: function () {
    const pages=getCurrentPages()
    console.log(pages);
    pages[pages.length-2].setData({name:'樱木花道'})
  },
```

## 53.通过代码进行跳转

navigateTo 

```
  skipto(){//通过skipto绑定事件
    wx.navigateTo({
      url: '/pages/detail/detail?name=流川枫',//传递参数跳转 竟然支持汉语
    })
  }
```

redirectto

navigateBack：可以传入delta

## 54.项目目录结构

+ 划分目录

  结构ipages：页面文件夹 

​        components：公共组件

​         assets：图片资源

​           services：网络请求相关

​           utils：工具类

+ 页面结构

单独修改导航文字，可以在每一页的json中进行修改"navigationBarTitleText": "首页",

## 55.轮播图和推荐图的网络请求

轮播图：

+ 请求轮播图数据

请求模块的封装需要根据业务需求（baseurl的设置、）进行分页处理，使每一页的请求单独用一个js进行处理，

尽量将url等信息封装起来，主页js中只调用相关函数就行了！

## 56.展示轮播图

circular：首尾衔接的效果

autoplay：自动滚动

indicator-active-color="white"：指示点选中颜色

indicator-dots="true"：指示点显示

interval：停留时间间隔 毫秒

duration：滚动时间

easing-function="easeInOutCubic"滚动函数、

轮播图作为公共使用的组件，应该放在公共组件components中，使用时通过property传数据。

## 57.推荐图展示

注意可以使用mode=‘widthFix’保持宽高比，初始化数据最好放到data里面去。

## 58.详情图片加载

good的数据结构：

```
  currentindex:0,

  goods:{

   pop:{pageIndex:0,goodItemList:[]},

   new:{pageIndex:0,goodItemList:[]},

   sell:{pageIndex:0,goodItemList:[]},

  },

  types:['pop','new','sell'],
```



```
type(sell/pop/new三个其中之一)和page(page从1开始)参数没有传, 是必传参数.
格式: /home/data?type=sell&page=1
```

+ 针对setData深度设置的问题，需要使用字符串键值的格式进行索引，适当使用字符串处理原属性值data的写法:

```
      const goodItemList =  'goods.'+type+'.goodItemList'
      const goodpage =  `goods.${type}.pageIndex`
      this.setData({
        [goodItemList]:olditemlist,
        [goodpage]:page
      })
```

+ 封装详情加载函数时，

每次可以将页面设置初始化为请求时的page加1（page默认起始为0），这样下次请求时，将会把pageindex同步为下一页。在请求结束将data中的page设置为+1后的值

```
  _getHomeData(){
    const type = this.data.types[this.data.currentindex]
    const page = this.data.goods[type].pageIndex+1
    const olditemlist = this.data.goods[type].goodItemList
```

## 61.详情页面数据的取出

[]内可以直接使用data里的定义：

```
<view class="goodItems">
<block wx:for="{{goods[types[currentindex]].goodItemList}}" wx:key="index">
<image src="{{item.show.img}}"></image>
<text>{{item.show.img}}</text>
</block>
</view>
```

wxss中不可以引用本地的图片，只能使用网络图片

hidden对于小程序的组件是无效的！

onpagescroll可以监听页面滚动！！参数options可以获取滚动详情

## 64.tabcontrol的停留

停留时出现抖动情况，可以使用占位组件（影响跳动的脱离文档流组件）的复制方法
