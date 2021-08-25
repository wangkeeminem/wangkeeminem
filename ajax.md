## 1.Ajax应用

Ajax：异步 JS and XML

1.可以网页不跳转实现静态跳转请求

2.它发送的就是http请求，需要具备http协议知识

3.原生、jquery、fetch、axios发送

## 2.XML

可扩展标记语言

XML：ajax最早使用的传输数据格式

由标签组成的用于保存数据与传输数据，没有预定义标签

HTML：主要用于存储与传输，由预定义标签组成

**后面主要就用json了，xml就不被使用了！**

## 3.AJAX特点：

+ 页面不刷新就与服务器通信
+ 可以根据用户事件来更新部分页面内容

缺点

+ 无浏览历史、没有后退
+ 存在跨域问题
+ SEO不友好（响应体中没有相关信息，是通过js动态创建的）

## 4.HTTP协议

+ 请求报文：

  + 请求行：post get  /s?ie=utf-89  HTTP/1.1

  + 头header：Host   Cookie  Content-type  User-Agent

  +  空行

  + 体：get的话，请求体是空的，

    post的话不为空：username=admin&password=admin  (form data中的内容)   

+ 响应报文

  + 行： HTTP/1.1 200 OK

  + 头：  格式与请求头一样

    ​           content-length

  + 空行

  + 体    <html>

  ​                 <head></head>

​                        <body></body>

​                      <html>



## 5.ajax请求实现get

实现请求跨域的方法

```
res.header('Access-Control-Allow-Origin','*')
```

```
 const btn = document.getElementsByTagName('button')[0]
  const div = document.getElementsByTagName('div')[0]
    btn.onclick=() => {  
    console.log('hahaahha');
    const xhr = new XMLHttpRequest()
    xhr.open('GET','http://127.0.0.1:8000/server')
    xhr.send()
    xhr.onreadystatechange = () => {//readystate：0表示未初始化 1表示open方法调用完毕 2： send调用完毕， 3：服务端结果返回 4：服务端返回结束 change：一共会触发四次，一般在4的时候做服务器返回的处理，
    if(xhr.readyState ===4){
    if(xhr.status >=200 && xhr.status<=300){
       console.log(xhr.status);
       console.log(xhr.statusText);
       console.log(xhr.getAllResponseHeaders());
       console.log(xhr.response);
       div.innerHTML = xhr.response
    }
    else{ }
    }   
    }
    }
```

以上就是在页面中通过js的ajax请求完成基本请求的操作。将获得的结果绑定至页面的相关标签内容上，即可以完成相关内容的不跳转页面更新

## 6、ajax中请求传递参数

```
xhr.open('GET','http://127.0.0.1:8000/server?a=100&c=300')
```

## 7.ajax请求实现post

服务器端node设置为post响应，将上面get更改为post即可

### post的参数设置：

```
在send中：send('a=100&b=200&c=300')或json格式
```

requestpayload会有请求体内容

## 8.ajax请求头的设置

html:在open请求后：实现将请求体类型转换为dataform**{"name":"hahahah","age":18}:** 

xhr.setRequestHeader("Content-Type"，”application/x-www-form-urlencoded“)

要发送自定义请求头的话：一。将node的请求类型改为'all‘；;

二、html：xhr.setRequestHeader("name":”hahahah“)

三。node：res.set('Access-Control-Allow-Headers',‘*’)

## 9.ajax服务端响应json数据

设置xhr.responseType='json'，可以将传过来的数据自动转化为对象进行处理，可以直接进行取属性值

当然也可以通过JSON.parse(xhr.res)进行解析

node端可以传入一个对象（目前看没啥问题） 或者传一个json字符串？我觉得没必要！！！

## 10.IE缓存问题

IE会对ajax返回结果进行缓存，之后会优先使用缓存内容，对于时效性较强的请求应用能力较差；解决办法：加个时间参数

```
xhr.opne('get','httpXXXXXXX ?t='+Date.now())
```

## 11.网络请求超时处理

请求超时：xhr.timeout = 2000

xhr.ontimeout = ()=>{

alert()}

在服务端延时响应：

在响应函数中设置settimeout回调

网络异常回调：

xhr.onerror = ()=>{

}

## 12.ajax请求取消

手动取消：xhr.abort() 在请求时间发送后定义一个函数进行取消

或者使用全局变量xhr，在另一个时间绑定中对xhr进行取消

## 13.ajax重复发送请求的处理

思路：在发送事件前、创建请求后、请求成功后分别做标记isSending

为false true false 。在发送请求前判断isSending为true时则取消请求

```
  let xhr = null
  let isSending = false
  submit.onclick = ()=> {

    if(isSending){xhr.abort()}
    xhr = new XMLHttpRequest()
    isSending = true//发送时为true
    xhr.open('get','http://127.0.0.1:3000/')
    xhr.send()
    xhr.onreadystatechange = () => {
      if(xhr.readyState ===4){
        isSending = false//请求成功
      if(xhr.status >=200 && xhr.status<=300){
       console.log(xhr.status);
       console.log(xhr.statusText);
       console.log(xhr.getAllResponseHeaders());
       console.log(xhr.response);
    }
    }
    }
}
```

## 14.jquery发送ajax

```
$('button').eq(0).click(()=>{  

$.get(url,{a:100,b:200},()=>{},'json')json表示指定响应的类型，响应得到的就是一个对象

})
```

引用时使用crossorigin=‘anonymous’

eq（1） 表示post请求 eq（0）表示get请求

jquery可以自动实现跨源、请求报文的封装等

## 15.juery通用方法：

```
$ajax({
url:'url',
data:{a:100,b:200},
dataType:'json'
type:'GET',
sucess:function(){
},
error：()=>{},
timeout:XXX,
headers:{

}
})
注意表单的提交需要进行序列化
```

## 16.axios

```
   const btns = document.getElementsByTagName('button')
   btns[0].onclick = ()=>{
    //  get请求
     axios.get('http://127.0.0.1:3000',{
       params:{
         id:100,
         vip:7
       },
       headers:{
         name:'aiguigu',
         age:20
       }
     })
     }
     他返回的是一个promise，
```

```
     axios.post(
     'http://127.0.0.1:3000',
     {
       username:'admin',
       password:'hahahah'
       }，（请求体)
       {
       params:{
         id:100,
         vip:7
       },请求行
       headers:{
         name:'aiguigu',
         age:20
       },请求头
       
     })
```

post可以做到请求行请求体分离

## 17axios通用方式

```
axios({
method：'post'
url:''
params:{
vipo:10
lebel:20
},
header:{
a:100,b:200
},
data:{
username:'hahhaha',
age:15
}
}).then()
```

## 18.使用fetch函数发送ajax

```
 
    fetch('http://127.0.0.1:3000/',
    {
      method:'post',
      headers:{
        name:"aiguigu"
      },
      body:'username=admin&password=admin'
    }).then(res=>{console.log(res);return res.text()}).then(res=>{console.log(res);})
     }
     //通过链式调用then并中间return res.text()方法获取res的结果，如果传入的是 json类型字符串，则使用json()
```

## 19.跨域相关：

### 19.1同源策略：ajax默认遵循同源策略，协议 域名 端口号必须完全相同才能互相发送，同源下ajax请求的url可以简写’/a'

违背这种策略就是跨域：可以新增更多个多样化服务

### 19.2jsonp的实现原理：

script 中的src引用自身就可以实现跨域，非模块化js文件的互相引用原理

文件目录协议=》网络url协议  

通过script引入一个网络接口，在node端接口请求回调函数中返回js运行语句，实现跨域请求，

```
let str = JSON.stringfy（data）

res.end(`handle(${str})`)
```

使用end避免添加特殊响应头，handle为在客户端script中定义的函数，可以通过在node端通过引用它来运行服务端的相关数据

**丧失焦点事件 onblur**

+ 借助与script标签向服务器端发出一个请求，并且返回一个函数执行代码，在浏览器端获取并解析执行

### 19.3jquery实现json请求

```
客户端：
$('button').eq(0).click(()=>{
$.getJSON('URL?callback=?'),()=>{
  $(’#result‘).html(//这里只是jq的元素操作 不用在意
  名称：${data.name},
  校区：${data.city}
  )
}
})

```

回传给服务端一个callback值，它就相当于传递的函数名，用request.query.callback获取这个值

```
服务端：
let cb = request.query.callback
res.end(`${cb}(${str})`)
```

### 19.4 CROS 官方实现的跨域请求（实现跨域在服务器端的完全设置）

cross-origin resource sharing

+ 1.设置一个响应头允许的地址

```
res.header('Access-Control-Allow-Origin','*')
```

res.setHeader是原生node的，也可以这样设置

’*‘可以指定响应端口能够进行访问url地址

+ 设置可选的请求头

```
res.header('Access-Control-Allow-Headers','*')
```

+ 设置认可的请求方法：get post 

```
res.header('Access-Control-Allow-Method','*')
```

