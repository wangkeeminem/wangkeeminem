# electron

https://segmentfault.com/a/1190000016028730

## 1.安装和你好世界

```
npm init
npm install electron --save-dev
 npx electron -v 检查安装状况
 启动： .\node_modules\.bin\electron
```

一个简单的页面实现：

```
const electron = require('electron')

const app = electron.app//app

const BrowserWindow = electron.BrowserWindow//窗口引用

let mainWindow = null//声明要打开的主窗口

app.on('ready',()=>{
  mainWindow = new BrowserWindow({width:300,height:300})//设置主窗口
  mainWindow.loadFile('../../index.html')
  mainWindow.on('closed',()=>{
    mainWindow = null
  })//窗口关闭时 将主窗口释放
})
```

```
运行：.\node_modules\.bin\electron .  （这里没有全局安装 所以再上面的index.html路径做了修改）

或者通过npx electron .运行（index.html条件下）
```

## 2.electron运行流程

package.json=>main.js=>启动index.html演示=>页面演示执行任务获取信息

设置以下webPreferences:{nodeIntegration:true}}，表示node中的所有东西都可以在渲染进程中使用，并且新版本electron需要再设置contextIsolation:false

```
mainWindow = new BrowserWindow({width:800,height:600,webPreferences:{nodeIntegration:true,contextIsolation:false}})//设置主窗口
```

## 3.remote模块

main.js主进程 html渲染进程 remote实现的是在渲染进程中执行remote相当于新建窗口

 **主进程文件中执行分进程（新建窗口）**

```
window.onload=function(){
  const btn = this.document.querySelector('#btn')
  const BrowserWindow = require("electron").remote.BrowserWindow
  btn.onclick = ()=>{
    newWin = new BrowserWindow({
      width:500,
      height:500,
    })
    newWin.loadFile('yellow.html')
    newWin.on('close',()=>{
      newWin = null
    })
  }
}
```

## 4.菜单的创建设置

菜单的创建：

menu.js:

```
const {Menu} = require('electron')
const template = [
  {label:'凤来仪洗浴会所',
   submenu:[
     {label:'精品SAP'},
     {label:'泰式按摩'}
   ]
  },
  {
    label:'大浪淘沙洗浴中心',
    submenu:[
      {label:'牛奶玫瑰浴'},
      {label:'爱情拍拍手'}
    ]
  }
]

const m =Menu.buildFromTemplate(template)//构建

Menu.setApplicationMenu(m)//设置
```

主进程中引入菜单：

```
 mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true, contextIsolation: false ,enableRemoteModule:true} })//设置主窗口

 require('./main/menu') 在创建窗口之口，引入渲染文件之前
 
 mainWindow.loadFile('demo2.html')
```

某一菜单标签的事件逻辑绑定：通过label的click事件可以新建一个窗口

```
{label:'精品SAP',click:()=>{
       var win = new BrowserWindow({width:500,height:500,webPreferences:{nodeIntegration:true,contextIsolation: false ,}})
      win.loadFile('yellow.html')
      win.on('closed',()=>{
        win = null
      })
     }},
```

label设置快捷键：accelerator:'ctrl+n'//快捷键 直接写在每个菜单的下面就好了，与label click并列

label  browser中可以通过autoHideMenuBar:true, 设置不显示主页面的菜单

## 5.右键菜单的制作  渲染进程中需要使用remote

相当于是在html页面中绑定一个邮件绑定事件：

contextmenu 为右键事件 写到页面的script中、

+ 在相应的渲染页面中定义菜单模板并建立romote进程：同样在每一个label下也可以实现快捷键的绑定

```
const rightTemplate = [
  {label:'粘贴',accelerator:'ctrl+v'},
  {label:'复制'}
]

var m = remote.Menu.buildFromTemplate(rightTemplate)
```

+ 绑定到右键呼出此菜单

```

addEventListener('contextmenu',(e)=>{//定义右键响应事件
  e.preventDefault()
  
  m.popup({window:remote.getCurrentWindow()})
})
```

## 6.加入开发者工具和窗口中加入链接

在主进程新建窗口之后声明

```
mainWindow.webContents.openDevTools()//自动开启开发者工具
```

+ 渲染文件中加入链接

  正常情况下，渲染文件中的链接会以窗口的形式显示，可能会造成一些交互和显示上的不方便，

+ 以shell打开chrome的形式展示网页

```
const { shell } = require("electron");

const aHref = document.querySelector('#aHref')

aHref.onclick = function(e){
  e.preventDefault();//阻止原生打开行为
  const href = aHref.href
  shell.openExternal(href)
  
}
```

shell的其他功能:

+ 打开文件

```
直接打开文件：shell.openPath('小姐姐.txt').catch(rej=>console.log(rej))
```

```
/ shell.showItemInFolder(process.execPath) 是打开electron.exe执行的目录
```

+ 再文件夹中显示：

  显示显示对应目录下的文件（不是打开不是打开！）

```
shell.showItemInFolder('D:\\迅雷下载\\Rick.and.Morty.S05E02.Mortyplicity.1080p.AMZN.WEB-DL.DDP5.1.H.264-NTb[eztv.re].mp4')
```

## 7.窗口中嵌入网页和打开子窗口

+ 嵌入网页 browserview（主线程中的），用于嵌入网页

```
//要嵌入一个view
  const BrowserView = electron.BrowserView//使用浏览器view类 pt7
  const view = new BrowserView()//新建一个view对象 pt7
  mainWindow.setBrowserView(view)//给主窗口设置一个浏览view pt7
  view.setBounds({x:0,y:120,width:500,height:300})//设置viewde样式
  view.webContents.loadURL('http://www.wangkespace.xyz/')//设置防置的内容 
//完成一个view的嵌入
```

+ 打开子窗口

window.open  默认为子窗口 而browserwindow并不是默认子窗口

```
const openChildWindow = document.querySelector('#openChildWindow')
openChildWindow.onclick=(e)=>{
  e.preventDefault()
  window.open('http://www.wangkespace.xyz/')//再打开新窗口按钮上定义新窗口
}
```

## 8.子窗口向父窗口通信

子窗口相对于打开他的页面形成父子关系

+ 子窗口中发送消息：

```
<script>
  const popbtn = document.querySelector("#popbtn")
  popbtn.onclick = ()=>{
    alert(111)
    window.opener.postMessage('我是子窗口传递的信息')//这里默认传给所有的父窗口  可以自行指定
  }
</script>
```

+ 父窗口接收消息：返回来一个json，可以通过data获取

```
window.addEventListener("message",(msg)=>{
  const mytext = document.querySelector('#mytext')
  mytext.innerHTML = JSON.stringify(msg)//接收到的是json
  需要转换以下
```

## 9.文件选择对话框

dialog.showOpenDialog(设置属性)

+ 简单的文件选择对话框：title会显示再打开文件左侧的提示处  默认打开的是项目路径

```
 const {dialog} = require('electron').remote
  const openbtn = document.querySelector("#openbtn")
  openbtn.onclick = ()=>{
    dialog.showOpenDialog({
      title:'请选择你喜欢的小姐姐'，
      defaultPath:'Ejo5i2bVoAAzmAc.jpg'，//可以指定默认的打开文件名
       filters:[{name:'image',extensions:['jpg']}]，//过滤文件类型呢
       buttonLabel:"打开小姐姐" //自定义打开按钮文本呢
    })
  }
```

+ 使用then获取结果 接上面的showOpenDialog（）

```
.then((res)=>{
      const image =document.querySelector('#iamge')
      console.log(res)
      image.setAttribute('src',res.filePaths[0])
      // image.src = res.
    }).catch((rej)=>{
      console.log(rej)
    })
```

获取的信息有：

```
canceled: false
filePaths: Array(1)
0: "F:\\前端\\electron\\studycode\\demo\\Ejo5i2bVoAAzmAc.jpg"
length: 1
__proto__: Array(0)
get canceled: ()=> {…}
set canceled: e=> {…}
get filePaths: ()=> {…}
set filePaths: e=> {…}
__proto__: Object
```

## 10.electron保存文件对话框

通过dialog.showSaveDialog与fs保存文件：

```
 const savebtn = document.querySelector("#savebtn")
  const fs = require('fs')
  savebtn.onclick=()=>{
    dialog.showSaveDialog({
      title:'保存文件'
    }).then(res=>{
      console.log(res),
      fs.writeFileSync(res.filePath,'wangkehahahahah')
    }).catch(rej=>{console.log(rej)})
  }
```

## 11.消息对话框操作

showMessageBox

属性：type：none info error  question warning

title：标题

message

button

```
const messagebtn = document.querySelector("#messagebtn")
  messagebtn.onclick=()=>{
    dialog.showMessageBox({
      type:'warning',
      title:'傻逼吧你',
      message:"是不是要跟胖哥去红袖招",
      buttons:['我要去','不去了']
    }).then(res=>{
      console.log(res)
    })
  }
```

res输出：可与通过response获得结果

```
checkboxChecked: (...)response: 1get checkboxChecked: ()=> {…}set checkboxChecked: e=> {…}get response: ()=> {…}set response: e=> {…}__proto__: Object
```

## 12.断网提醒功能

使用监听网络online offline

```
 addEventListener("online",()=>{
    alert('官人 我来了')
  })
  addEventListener("offline",()=>{
    alert('先行离开一会儿哦，请稍等')
  })
```

## 13.实现桌面右下角的消息通知

 使用H5的window.Notification功能

```
  const notifybtn = document.querySelector("#notifybtn")
  
  const option = {
    title:'小二来订单了 出来接客',//title
    body:'有大官人翻你牌子了'//内容
  }
  notifybtn.onclick=()=>{
    new window.Notification(
      option.title,option
    )
  }
```

## 14.注册全局快捷键

globalshotcut

在app定义时：

```
const globalshortCut=electron.globalShortcut//定义全局快捷键
```

在app.on(ready)中：

```
  globalshortCut.register('ctrl+e',()=>{
    mainWindow.loadURL("http://www.wangkespace.xyz/")
  }
  )
```

判断是否注册成功：

```
 let isRegister = globalshortCut.isRegistered('ctrl+e')?'sucess':'fail'
```

注销快捷键绑定：在will-quit进行注销

```
app.on('will-quit',()=>{
  //注销全局快捷键的方法
  globalShortcut.unregister('ctrl+e')
  // globalShortcut.unregisterAll()
})
```

## 15.剪切版功能使用 点击一下 复制成功

clipboard 可以在渲染和主进程中都能使用

```
const {clipboard} = require('electron')
```

## 16.实现实时更新

```
首先，安装这个npm模块：

npm install --save-dev electron-reloader
1
然后，在程序入口文件（一般是index.js）中最下方加入以下代码：

try {
  require('electron-reloader')(module,{});
} catch (_) {}
1
2
3
最后，重启应用，尝试更改html等静态文件，窗口就能自动刷新了。

还可以修改配置对象，开启debug模式：
————————————————
版权声明：本文为CSDN博主「mrhaoxiaojun」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/mrhaoxiaojun/article/details/104471515/
```

