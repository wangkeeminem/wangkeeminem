

# HTML5

## 1.attr&prop

+ 访问html的某个节点，他的attributes属性中会放有html标签中**自定义的和预定义的属性**，他们都属于属性节点，nodeType: 2，

+ 而他的prop中会有JS原生对象的直接属性 0: type  1: checked length: 3

  ```
  + attributes: NamedNodeMap
  
  1. 1. 0: type
     2. 1: checked
     3. 2: qhf
     4. length: 3
  type展开：
  ```

```
0: type
baseURI: "http://127.0.0.1:5501/01_attr&prop.html"
childNodes: NodeList []
firstChild: null
isConnected: false
lastChild: null
localName: "type"
name: "type"
namespaceURI: null
nextSibling: null
nodeName: "type"
nodeType: 2
nodeValue: "checked"
ownerDocument: document
ownerElement: input
parentElement: null
parentNode: null
prefix: null
previousSibling: null
specified: true
textContent: "checked"
value: "checked"

```

内部会为每一个预定义的结点attr都会有一个标签对象prop与之对应

+ 在属性值非布尔值情况下，attr与prop实时同步

在属性值为布尔值的情况下，

+ 改prop，不会同步attr

+ 改变attr不会同步prop（若属性已有定义）
+ 在prop没有定义之时，attr会同步prop

问题：

+ 浏览器认哪一个属性？

prop

+ 操作属性的时候，改变的是谁？

prop

所以最好直接用prop的方法去改变属性

## 2.H5中的小功能

document.querySelector本身就是H5的API

他的对象prop对应class这个属性应该是calssname

对于多类型，提供了一个新的API叫做classList，节省了字符串分隔的操作：

 并且可以自己进行添加属性：

```
const qhf = document.querySelector('div')

qhf.classList.add('qff') 重复的不会再添加

qhf.classList.toggle('qff') 如果没有就新增、有就删除

qhf.classList.remove('qhf')删除某个属性

要改变自定义属性，需要使用qhf.setAttribute('qhf','111')
如果自定义的属性以data-XXX开头，则可以通过qhf.dataset.XXX进行访问，如果XXX内部以-连接，则在通过js访问时需要变更为驼峰命名
若要改变自定义属性：可以用qhf.dataset.hhh='wuwuwu'直接实现
关于可编辑的属性：contenteditable="true"  实现内容客户可编辑
```

## 3.H5与H4的区别

后续h5项目：360音阶导航、播放器 

HTML5是一个更强大的技术集、允许更多样化和强大的网站与应用程序

他约等于html+css+js

+ html5优势：跨平台 通吃所有主流平台，浏览器跨平台！
+ 快速迭代：小程序、web前端，比客户端下载安装灵活
+ 降低成本：无需专门针对某平台分开开发
+ 导流入口多：小链接、小插件
+ 分发效率高：小链接、小插件

charset：告诉浏览器以我的html什么形式编码

```html
<!DOCTYPE html> 告诉浏览器我的html以什么渲染模式进行渲染，前面不准加标签或注释
document.compatMode可以查看文档渲染模式
加<!DOCTYPE html>：CSS1Compat 表示标准模式
不加： BackCompat 表示怪异模式
在IE9以上的浏览器中，三种模式几乎没有区别
```

h4中 根标签html简化

MIME类型：不同的资源处理方式不同：

## 4.语义化标签

语义化标签

h5根据使用频率统计的标签命名分类：

hgroup、header、nav、section、footer、article、aside与div无异，但提升了网页的语义和结构性。

+ hgroup用来放h1--h6元素，如果hgroup还要与其他内容放在一起，那么还要使用header进行包装

+ nav中通常包裹ul

+ section代表文档的节或者段，节可以是一个页面里的分组，段可以是按照主题的文章的分段

+ footer

+ article：包裹文章

+ aside：测边栏，副导航

## 6.canvas基本用法

1.什么是canvas(画布)

新增的元素，可以通过js脚本来绘制图形，创建动画，最早由苹果引入，默认有高宽300*150

浏览器支持canvas会将内部内容替换掉，否则会显示

```
<canvas id="test"><span>您的浏览器不支持画布元素,请您换成谷歌浏览器</span></canvas>
```

canvas没有src和alt属性，需要直接在属性中写width和height：他也实际上只有这两个属性，并且不可以用css为他指定宽高，指定时可以不加px

```
<canvas id="test" width="600" height="400">
```



+ 获取画布元素，获的绘画方法getContext（）
+ getContext（）用于获取渲染上下文和它的绘画功能，只有一个参数叫做上下文格式（通常为2d）

```
  const testNode = document.querySelector('#test')
    if (testNode.getContext){
      const ctx = testNode.getContext('2d')
```

## 7.绘制矩形

window.onload内加入

/** @type {HTMLCanvasElement} */可以获得canvas智能提示

**用画笔ctx**：位置参照画布原点 

+ 画一个填充的矩形

```js
 ctx.fillRect(10,10,100,100)分别为与画布的左边距、上边距、宽、高
```

+ 画一个只有边框的矩形：边框宽度规范上是1px，实际是2px

```
ctx.strokeRect(100.5,100.5,100,100)
```

+ 用这种方法可以得到1px边框（渲染时往上画0.5px，往下画0.5px）

```
ctx.strokeRect(100.5,100.5,100,100)
```

+ 清除指定矩形：本质就是画矩形：叠加在原有图层上

```
ctx.clearRect(100,150,100,100)
```

+ 填充颜色：

```
ctx.fillStyle='pink' //只对fillRect有效
```

```
ctx.strokeStyle='pink'//只对strokeRect有效
```

+ 边框粗细

```
ctx.lineWidth=12//边框的粗细
```

注意 画笔颜色、边框粗细都应该在绘制前设定，这是一种同步的绘制机制，后绘制的会覆盖之前绘制的东东。

+ 边框形成的角：

```
ctx.lineJoin='miter'//直角
ctx.lineJoin='bevel'//切角
ctx.lineJoin='round'//圆角
```

## 8.绘制路径

+ canvas的高宽问题

图形的基本元素是路径、

首先需要创建moveTo 起始点、lineTo画出图形的边缘所经的路径、lineTo回到最终起点，

+ 画出路径：stroke
+ 画出填充：fill

```
        ctx.moveTo(50,50)
        ctx.lineTo(50,100)
        ctx.lineTo(100,100)
        ctx.lineTo(50,50)=》 ctx.closePath()使用closePath可以解决最终路径点定位引起的边框交叠问题
        ctx.stroke()
        ctx.fill()=》可以不用指定回到起始，能做到自动填充
```

每次画图canvas会保存为一组路径到堆内存中，画新的图案之前需要使用beginPath清空路径容器，保持两次画图之间的分离：

```
        ctx.beginPath()
        ctx.moveTo(200,200)
        ctx.lineTo(200,300)
        ctx.lineTo(300,300)
        ctx.fill()
```

moveTo相当于抬笔落笔的动作，而lineTo是持续画路径连接路径点

+ 绘制矩形

```
        //绘制矩形
        ctx.beginPath()
        ctx.rect(50,50,100,100)
        ctx.fillStyle='blue'
        ctx.fill()
```

+ 绘制线条边缘处理

```
ctx.lineCap='butt'以方形结束
ctx.lineCap='square'//在两边加了一截方形
ctx.lineCap='round'//往两边加上半圆
```

+ 

```
        ctx.save()*******************
        ctx.strokeStyle='orange'
        ctx.lineWidth=5
        *****************************
        ctx.moveTo(50,50)
        ctx.lineTo(50,100)
        ctx.lineTo(100,100)
        ctx.closePath()
        
        ctx.stroke()//画边框
        ctx.fillStyle='red'
        ctx.beginPath()********************
        ctx.fillRect(200,200,80,80)
        ctx.restore()*********************
```

+ 写路径套路：实现每次画路径的样式分离,注意 这里的包裹关系可以参照html的写法

```
ctx.save()//保存上一次的样式
//设置样式
ctx.beginPath()
//绘制路径
ctx.restore()
```

路径容器：每次调用API时会往路径容器中做登记，调用beginpath清空整个路径容器

样式容器：每次调用样式api，会在样式容器中做登记，调用save时将样式容器里的状态压入样式栈，

调用restore时，将样式栈顶状态弹出到样式容器里进行覆盖

样式栈：调用save将样式容器中的状态压入样式栈

## 9.Canvas签名

```
    window.onload=function(){
      /** @type {HTMLCanvasElement} */
      //querySelector身上有坑?
      const canvas = document.querySelector('#test')
      if (canvas.getContext){  
        const ctx = canvas.getContext('2d')
      
      canvas.onmousedown=(ev)=>{
        ev = ev || window.event
        if(canvas.setCapture){
          canvas.setCapture()
        }//阻止ie6默认行为

        ctx.beginPath()
        ctx.moveTo(ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop)
        document.onmousemove=(ev)=>{
          ev = ev || window.event
          ctx.save()
          ctx.strokeStyle='pink'
          ctx.lineTo(ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop)
          ctx.stroke()
        }
        document.onmouseup=()=>{
          document.onmousemove=document.onmouseup=null
          if (document.releaseCapture){
            document.releaseCapture()
          }
        }
        ctx.restore()
        return false
        
      }
    }
    }
```

## 10.canvas绘制曲线

+ 绘制圆

```
        ctx.beginPath()
        ctx.arc(100,100,50,0,Math.PI)//圆的路径！水平位置，垂直位置，半径，起始角度（圆最右侧点位起始），结束角度（顺时针为默认正方向），若要顺时针加一个参数true
        ctx.stroke()
```

+ 绘制曲线需要三个点，起始点（moveTo）、夹角点和结束点，绘制出一段在夹角中的圆的曲线

```
        ctx.beginPath()
        ctx.moveTo(50,50)
        ctx.arcTo(300,00,200,200,50)
        ctx.stroke()
```

+ 贝塞尔曲线：

二次贝塞尔：三个控制点：起始点（moveTo）、夹角点和结束点，与绘制普通曲线不同的是他必须经过起始结束点，且半径不确定

```
       ctx.beginPath()
        ctx.moveTo(50,50)
        ctx.quadraticCurveTo(300,00,200,200)
        ctx.stroke()
```

绘制三次贝塞尔曲线：经过起始50,50和终点300,300，中间两个点决定曲线的弧度与取向

```js
    //三次贝塞尔

​    ctx.beginPath()

​    ctx.moveTo(50,50)

​    ctx.bezierCurveTo(300,0,200,200,300,300)

​    ctx.stroke()
```

## 11.canvas变换

save除了用于保存样式外，还可以用来保存变换矩阵

+ 变更原点的坐标 translate 这是个累加操作

```
ctx.translate(50,50)
ctx.beginPath()
ctx.fillRect(0,0,100,100)
```

+ rotate（angle） 接受弧度 按照原点进行旋转 注意坐标的指向的变换

```
ctx.rotate(45*Math.PI/180)
```

+ 缩放：实际上是画布的放大以及你缩小

```
ctx.scale(0.5,0.5)
```

## 12.canvas变换实例

自旋转且放大缩小的案例：

```
      const canvas = document.querySelector('#test')
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        let deg = 0
        let size = 0

        timer = setInterval(() => {


          ctx.save()
          ctx.fillStyle = 'red'
          ctx.translate(150, 150)


          deg += (1 * Math.PI / 180)
          size=(deg/Math.PI)%2//size周期性参数 0--2之间
          const size1=(size>1?2-size:size)//size1是0--1之间的周期性参数
          ctx.scale(size1*2,size1*2)//2是最大放大倍数

          ctx.clearRect(-300, -200, 600, 400)
          ctx.rotate(deg)
          ctx.beginPath()
          ctx.fillRect(-50, -50, 100, 100)
          if (deg > 4 * Math.PI) {
            clearInterval(timer)
          }
          ctx.restore()
        }, 1000 / 60)
      }
```

动画中虽然是局部物体在刷新动作，但由于画布并没有清除局部组件的功能，需要利用整体定时器的画布刷新功能对动画进行一个刷新。时钟的更新可以利用获取当前进行更新。

## 13.复习

+ canvas运算极快，不会出现延迟渲染的问题，一定要具有同步思想。

+ 画布API：canvas.getContext('2d')  canvas.width  canvas.height

+ 上下文API

  + 获取上下文时一定要先判断

  + 画布默认高宽150*300，使用属性来定义他的宽高，而不用css
  + ctx.fillRect(x,y,w,h)填充矩形
  + ctx.strokeRect(x,y,w,h)带边框矩形
  + 只接受矩形的直接渲染
  + ctx.fillStyle\strokeStyle\lineWidth\lineJoin\lineCap
  + 绘制路径:ctx.moveTo\ctx.lineTo\ctx.rect(x,y,w,h)\ctx.arc(x,y,r,degs,dege,dir)

## 14.canvas使用图片

+ 引入图片：

  创建img实例 他的功能等价于document.createElement('img'),Image类型具有属性width和height，表示图片的初始尺寸

```
      if(canvas.getContext){
        const ctx = canvas.getContext('2d')
        const image = new Image()//创建img实例,可以在（）中替那些width和height属性
        image.src='./code/123_0080.png'
        image.onload=function(){
          draw() //图片加载完调用函数
         }
      function draw(){//定义draw函数
        ctx.drawImage(image,0,0,600,400)//canvas画笔的drawImage功能，调整位置、大小，img出了可以是图片外，还可以是另一个canvas对象
        ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)  后面四个分别参数调整导入图片的位置大小
      }
```

+ 引入背景

第二个参数：背景填充模式：repeat', 'no-repeat', 'repeat-x', or 'repeat-y'

需要创建背景pattern，并且将pattern对象赋给fillstyle，最终通过fillRect填充

```
        const pattern = ctx.createPattern(image,'no-repeat')
        ctx.fillStyle=pattern
        ctx.fillRect(0,0,300,300)
```

+ 引入渐变（线性渐变）

```
        const gradient = ctx.createLinearGradient(0,0,300,300)//引入渐变 定义起始结束节点 两个就好
        gradient.addColorStop(0,'red')//引入渐变
        gradient.addColorStop(0.7,'yellow')//引入渐变 定义纯色所占的位置和颜色属性
        gradient.addColorStop(1,'green')//引入渐变 
        ctx.fillStyle=gradient//引入渐变 
        ctx.fillRect(0,0,300,300)//引入渐变
```

+ 引入渐变（径向渐变）：可以定义同心渐变‘异心渐变，中间结点与线性渐变定义相同

```
        const gradient2 = ctx.createRadialGradient(300,0,100,600,400,150)//引入径向渐变
        gradient2.addColorStop(0,'red')//引入渐变
        gradient2.addColorStop(0.5,'yellow')//引入渐变
        gradient2.addColorStop(1,'green')//引入渐变
        ctx.fillStyle=gradient2//引入径向渐变 
        ctx.fillRect(300,0,300,300)//引入背景
```

## 15.飞鸟动画

1，onload的回调需传入this表示这张图片，在draw函数进行接受

2.画布宽高要设置为视口的宽高

3.循环导入图片文件

4.通过控制图片的draw时的位置



## 16.文本相关

```
        ctx.fillStyle='red'//填充颜色
        ctx.strokeStyle='blue'//边框颜色
        ctx.font='80px san-serif'//字体
        ctx.shadowOffsetY=1//阴影偏移
        ctx.shadowColor='yellow'//阴影颜色
        ctx.textAlign='center'//自身居中对齐文字定位线、left：文字左侧对齐文字定位点 right：文字右侧对齐文字定位点
        ctx.textBaseline='middle' //自身垂直方向  middle：水平中线对齐文本块中线  top：文本块的baseline在文字顶部  bottom：文本块的baseline在文字底部
        console.log(ctx.measureText('wuwuwuhahahaha'))//返回对应文字的width
        ctx.fillText('wuwuwu',1/2*canvas.width,1/2*canvas.height)//文字填充
        ctx.strokeText('wuwuwu',1/2*canvas.width,1/2*canvas.height)//文字边框
```

文本的画布水平垂直居中：

```
文字的画布居中：
ctx.textAlign=center//自身居中对齐文字定位线、left：文字左侧对齐文字定位点 right：文字右侧对齐文字定位点
ctx.textBaseline=middle //自身垂直方向  middle：水平中线对齐文本块中线  top：文本块的baseline在文字顶部  bottom：文本块的baseline在文字底部
ctx.fillText(wuwuwu,1/2*canvas.width,1/2*canvas.height)//文字填充
```

## 17.canvas 像素操作

+ 获取图像像素数据：ctx.getImageData(0,0,100,100)（需要告知位置‘尺寸！！！）

```
   const canvas=document.getElementById('test')
   const ctx = canvas.getContext('2d')
   ctx.fillRect(0,0,100,100)
  const imagedate = ctx.getImageData(0,0,100,100)
  console.log(imagedate);

```

像素数据中按顺序储存rgba四组数据。若100*100图片，则总共40000像素数据，他的第四个数据是透明度，为255最大值形式。**并且他是可编辑的**。

```
﻿
17.像素操作.html:35 
ImageData {data: Uint8ClampedArray(40000), width: 100, height: 100}
data: Uint8ClampedArray(40000) 
[0 … 9999]
[10000 … 19999]
[20000 … 29999]
[30000 … 39999]
__proto__: TypedArray
height: 100
width: 100
__proto__: ImageData
```

+ 之后可以通过编辑像素数据写入图片

putImageData（imageData，dx，dy）

```
        for(let i=1;i<10000;i++){
          imagedate.data[i*4-1]=25
        }
        console.log(imagedate);
        ctx.putImageData(imagedate,100,100)
        //通过操作透明度数据并写入图片中的操作
```



+ **直接通过像素数据创建并绘制图片**

 ctx.createImageData(width,height)（默认rgba都是0），然后通过ctx的imagedata操作进行像素级的编辑

## 18.单像素操作

单像素的颜色获取

```
        const imagedata = ctx.getImageData(0,0,canvas.width,canvas.height)
        console.log(imagedata);
        function getPixelnfo(imgData,offsetx,offsety){
          let color = []
          const n=canvas.width*offsety+offsetx//n为第几个像素组
          let i = 0
          while (i<4) {
            color[i]=imgData.data[n*4+i]
            i+=1
          }
          return  color
        }
```

单像素的颜色设置：

```
        function setPixelnfo(imagedata,color,offsetx,offsety){
          const n=canvas.width*offsety+offsetx//n为第几个像素组
          let i = 0
          while (i<4) {
            imagedata.data[n*4+i]=color[i]
            i+=1
          }  
          console.log(imagedata);
          ctx.putImageData(imagedata,0,0)        
        }
```

## 19.马赛克

+ 马赛克：选取一个马赛克矩形：定义尺寸size

 从马赛克矩形中随机抽出一个像素点信息，

 将整个马赛克矩形中信息统一调成随机抽出的那一个信息

+ 利用循环为马赛克块周围size平方个像素点设置像素信息，切记设置像素函数不可以进行渲染，否则极其影响效果

key code：

```
        function imgMask(size,imgData){//size：马赛克块尺寸，imgData:待处理图像的像素数据
          console.log(imgData);
          const Nx = parseInt(imgData.width/size)//横向马赛克块数量
          const Ny = parseInt(imgData.height/size)//纵向马赛克块数量
          const positionColor=[]//马赛克每个块左上角对应的坐标
          const cid=ctx.createImageData(imgData.width,imgData.height)//新建图片数据
          for(let i = 0;i<Ny;i++){
            for (let j = 0;j<Nx;j++){
              // Position.push([j*size,i*size])//加上横坐标 形成[x,y]
              const color = getPixelnfo(imgData,j*size+parseInt(Math.random()*size),i*size+parseInt(Math.random()*size))//获取对应随机像素的color
               //获得每马赛克块的随机颜色[r,g,b,a]
              // positionColor.push(color)//利用循环为马赛克块周围size平方个像素点设置像素信息
              for (let x=j*size;x<j*size+size;x++){
                for (let y=i*size;y<i*size+size;y++){
                  // positionColor.push(color)
                  setPixelnfo(cid,color,x,y)
                }
              }
           
              
            }
          }
          
          
         ctx.putImageData(cid,0,0.5*imgData.height)//渲染马赛克处理过的图片数据
         }
```

## 20.图像合成

画布全局透明：

```
ctx.globalAlpha='0.1'
```

+ 多个图形叠在一块儿：

source：新的图像

destination：已经绘制过的图形

控制层级：

```
globalCompositeOperation：（置于新的图像和绘制过的图形之间 才会产生效果）
source-over 默认都保留，新的图像层级较高（默认模式）
source-out 仅保留新图像的超出源原图像的部分
source-in 仅保留源图像的交叠部分
source-atop 仅保留原图像部分和其上部交叠的部分目标图像

destination-over 默认都保留，源图像层级较高
destination-out 仅保留源图像的超出目标图像的部分
destination-in 仅保留目标图像的交叠部分
destination-atop 仅保留目标图像部分和其上部交叠的部分源图像
```

## 21.刮刮卡

canvas需要放在图像的上方，并且固定高度宽度为视口宽高：不指定背景颜色，显示出下面的图片ul

```
      canvas.width=document.documentElement.clientWidth
      canvas.height=document.documentElement.clientHeight
```

图片ul和画布的布置：

```
 <div id="wrap">
  <canvas id="test"><span>您的设备不支持，请更换为强大的谷歌浏览器！</span></canvas>
  <ul>
    <li></li>
  </ul>
</div>
```

使用touch进行移动端的操作，并且

操作的位置通过ev.changedTouches[0].clientX来获取（第一根手指的位置）

```
ctx.moveTo(ev.changedTouches[0].clientX - canvas.offsetLeft,ev.changedTouches[0].clientY - canvas.offsetTop)
```

+ 通过合成保留destination实时绘制的图形  （destination-out），(保留超出部分）

+ canvas需要进行完全清除，以防止对下层的操作的影响

canvas设置透明度，并减缓过度效果

```
canvas.style.opacity=0（touchend）
transition: 1s（css中设置）
```

监听对象过渡效果结束：结束将canvas删除

```
       canvas.addEventListener('transitionend',()=>{
          canvas.remove()
        })
```

## 22.canvas其他

+ canvas导出为图片：

```
result=canvas.toDataURL()//生成图片对应的url，base64编码
```

+ ctx.isPointInPath（x，y）

判断当前路径是否包含检测点

此方法仅用于最新画出的canvas图像（使用beginpath进行区隔）

```
        ctx.arc(100,100,100,0,Math.PI*2)
        // ctx.moveTo(0,0)
        ctx.fill()
        console.log(ctx.isPointInPath(201,100))
```

ctx.isPointInPath(201,100）可以使用判断是否在该区域来给画布上的该区域添加事件

但是因为要进行区隔，相对比较困难。

## 23.音视频标签

audio：音频 本地音频无法拖动进度条？

video：视频 默认高宽为视频的分辨率大小

### 音视频相关概念：

1。容器：用于存储视频，avi、mp4格式仅用于确认容器的格式，不关系存储什么

2.视频的元数据：包含了封面、标题、子标题、字幕等

3。编解码器：浏览器所具有的编解码器，对编码好的媒体流进行解码，解码后才能播放。

编解码器：视频：H.264、 VP8 、Ogg Theora 

​                    音频：AAC 、MPEG-3、Ogg Vorbis

导致了浏览器在处理音视频的兼容性问题。根据处理的设备，选择解码器的配置（高中低）。

+ 解决兼容性问题的通常做法
+ 1.制作ogg容器使用theora视频和vorbis音频的版本
+ 2.制作另一个版本使用WebM视频容器：Vp8+vorbis
+ 3.制作MP4视频容器，使用H264基本配置的视频和ACC低配的音频
+ 4.连接上面三个文件到同一个video元素，并向后兼容基于flash的视频播放器

For newer versions like mine 0.8.12 use `-vcodec` instead of `-c:v`

```
rmvb--mp4:
ffmpeg -i "1【天下足球网www.txzqw.com】8月19日 天下足球(欧文追风少年2).rmvb" -vcodec libx264 -strict -2 "2.mp4"
ffmpeg -i "1【天下足球网www.txzqw.com】8月19日 天下足球(欧文追风少年2).rmvb"  -c:v libx264 -strict -2 "2.mp4"
```

**ffmpeg的写法：**

```bash
$ ffmpeg \
-y \ # 全局参数
-c:a libfdk_aac -c:v libx264 \ # 输入文件参数 a：音频 v：视频
-i input.mp4 \ # 输入文件
-c:v libvpx-vp9 -c:a libvorbis \ # 输出文件参数
output.webm # 输出文件
```

音频的转换：

```
ffmpeg -i "Rick.and.Morty.S05E02.Mortyplicity.1080p.AMZN.WEB-DL.DDP5.1.H.264-NTb[eztv.re].mkv" -acodec  libfaac "copyvideo.mp4"
```



```
ffmpeg -ss 00:00:10 -i "世上只有一个罗纳尔多.mp4"  screenshot/test1.jpg
```



## 24.canvas与视频的结合

视频加载完毕：video.onloadeddata

video相当于放映机，canvas相当于银幕

```
<video id='video' autoplay src="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4" hidden></video>
<canvas id='test' width="300" height="300"></canvas>


script：
  window.onload=()=>{
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector('#test')
  if (canvas.getContext){
  const ctx=canvas.getContext('2d')
  const video = document.querySelector('#video')
  video.addEventListener('loadeddata',()=>{
    ctx.fillRect(0,0,100,100)
    setInterval(()=>{ctx.drawImage(video,0,0,canvas.width,canvas.height)})
    
  })
```

浏览器组织了视频自动带音量播放：

autoplay muted 对于视频的刷新有效，而不带muted是不会起作用的。

使用**requestAnimationFrame**实现：

```
  video.addEventListener('loadeddata',function djsahd(){

    ctx.drawImage(video,0,0,canvas.width,canvas.height)
    requestAnimationFrame(djsahd)
  })
```



## 25.html新增其他标签

meter 现时已知范围的标量值或分量值

+ 电量标签：meter optimum="90"最优区

```
<meter value="32" min="20" max="100" low="40" high="80" optimum="90">
</meter>
```

+ 进度标签 progress

```
<progress value="0.5"></progress>
```

+ 列表标签 datalist 包含option标签  ：为input设置默认选项

```
<input type="text" placeholder="你最喜欢的女明星是" list='zdy'>
<datalist id="zdy" aria-placeholder="hahahahah">
  <option value="1">10岁的周冬雨</option>
  <option value="2">20岁的周冬雨</option>
  <option value="3">30岁的周冬雨</option>
  <option value="4">40岁的周冬雨</option>
```

input设置

```
      //输入框更改颜色
      input{
        color: blue;
        
      }
      input:placeholder-shown{
        
        border: blue 2px solid;
      }
      input::-webkit-input-placeholder{
        color: blue;
      
      }
```

+ details 可折叠列表

```
<details open>
  <summary>尚硅谷男生张小飞</summary>
  <summary>尚硅谷男生张小飞</summary>
  <p>haahhaha</p>
  <p>haahhaha</p>
  <p>haahhaha</p>
  <p>haahhaha</p>

</details
```

+ 拼音标签 ruby rt

```
觳li<ruby>觳<rt>li</rt></ruby></span>
```

<span><ruby>觳<rt>li</rt></ruby></span>

<span>今天天气真不错啊哈哈哈哈哈哈呜呜呜呜<mark>giao</mark> 呜嘿嘿嘿嘿</span>

+ 标记标签 mark

```
<span>今天天气真不错啊哈哈哈哈哈哈呜呜呜呜<mark>giao</mark> 呜嘿嘿嘿嘿</span>
```

## 26.H5新增表单标签格式

仍使用form做容器

type：email

```
<input type="email">//简单的字符检查 @以及规范
```

type：tel 会激活移动端的手机键盘

```
<input type="tel">
```

type：url 会验证是否为地址 会检测http协议

```
<input type="url">
```

type：search 右侧有个清除按钮

```
<input type="search">
```

type : range  音量调节等

```
<input type="range" min="10" max="20" step="2">
```

type : number 整数 右侧又上下控制杆

type：color 选择颜色 点击可以选择颜色

type：datetime移动端显示日期

type：datetime-local pc端显示选择日期

type：time 只显示时间

type：date  只显示日期

type：week显示一年里的第几周

type：月 一年的第几个月

## 27.新增的表单属性

+ autofocus 写了就行 自动获得焦点

+ placeholder自定义预置内容  改变他的属性：input::-webkit-input-placeholder

+  required 必填项

+ pattern="\d{1,5}" 设置正则表达式 1--5个数字
+ formaction 更改默认跳转路径

```
<form action="http://www.baidu.com" >
。。。。。。。。
<input type="submit" formaction="http://taobao.com">
```
+ 列表标签 datalist 包含option标签  ：为input设置默认选项

```
<input type="text" placeholder="你最喜欢的女明星是" list='zdy'>
<datalist id="zdy" aria-placeholder="hahahahah">
  <option value="1">10岁的周冬雨</option>
  <option value="2">20岁的周冬雨</option>
  <option value="3">30岁的周冬雨</option>
  <option value="4">40岁的周冬雨</option>
  
```

## 28.表单验证

通过对input invalid事件的监听，并通过input.validity可以获取失败信息，从而可以通过js与客户进行交互信息

```
window.onload=()=>{
    const input=document.querySelector("input[type=text]")
    console.log(input);
    input.addEventListener('invalid',()=>{
      console.log('验证失败了');
      console.log(input.validity);
    })
  }
```

```
ValidityState {valueMissing: true, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false, …}
badInput: false
customError: false
patternMismatch: false//正则的匹配
rangeOverflow: false
rangeUnderflow: false
stepMismatch: false
tooLong: false
tooShort: false
typeMismatch: false//类型不匹配
valid: false
valueMissing: true//值错误
__proto__: ValidityState
```

用户自定义：失败弹出信息

```
window.onload=()=>{
    const input=document.querySelector("input[type=text]")
    const submit=document.querySelector("input[type=submit]")
     submit.onclick=()=>{
      const value = input.value
      if(value.match(/xfz/g)){可以用判断或正则表达式
        input.setCustomValidity('请不要输入敏感词xfz')}//自定义弹出提示文本 拦截请求跳转
        else{
          input.setCustomValidity('')//放行 如果输出为空 则为通过
        
      }
    }
  }
```

```
ValidityState {valueMissing: false, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false, …}
badInput: false
customError: true*********************失败 用户自定义验证错误 起始就是开发者自定义的验证
patternMismatch: false
rangeOverflow: false
rangeUnderflow: false
stepMismatch: false
tooLong: false
tooShort: false
typeMismatch: false
valid: false
valueMissing: false
__proto__: ValidityState
```

