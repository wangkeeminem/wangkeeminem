### websocket事件

open

close

error

message

connect



### 前端

open

close

error

message 接收到的数据事件

发送需要使用ws.send



### 后端

open

close

error

message

connection

ws库

广播动作client.send

### 构建

1.chat：安装vite框架

npm init 

yarn add vite -D vite框架

启动script更改

```
  "scripts": {
    "dev": "vite"
  },
```

配置文件：

前端：

+ entry.html  输入用户名的input 本地存储保存用户名、点击进入聊天室 建立ws

+ index.html list展示聊天列表 inpu用于输入信息 点击发送

绑定dom事件 绑定ws事件



2.server

后端   npm init 安装ws yarn add ws

实例化const server = new ws.Server({port:8000})

启动命令配置：

```
  "scripts": {
    "dev": "nodemon index.js"
  },
```

index.js书写基本的ws事件绑定

server端广播：在handlleMessage函数中 

后端收到stringfy的json：

打印出来是这样的

```
<Buffer 7b 22 75 73 65 72 22 3a 22 77 61 6e 67 6b 65 65 6d 69 6e 65 22 2c 22 64 61 74 65 54 69 6d 65 22 3a 31 36 
32 39 32 35 38 36 32 37 36 31 32 2c 22 6d 65 ... 28 more bytes>
```



```
server.clients可以找到所有使用的客户端
server.clients.forEach((c)=>{
 c.send(msg)
})
```

