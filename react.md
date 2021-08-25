# React

## 1.react 是什么

用于构建**用户界面**的js库、主要用于操作dom与呈现页面的功能

没有处理数据和发送请求的功能

用于将数据渲染为视图的框架

由脸书开发！

+ 原生js操作dom繁琐 效率低下（使用dom api操作ui），

+ 原生会有大量的重绘重排
+ 原生js没有组件化编码的方案 代码复用率低



react：

+ 采用组件化模式，声明式编码，可以提高开发效率及组件复用性

+ 可以进行移动端开发

+ 使用虚拟dom和优秀的diffing算法，尽量减少与真实dom的交互，实现数据的复用性与真实dom的尽小的变化



需掌握的js基础：this指向  类  ES6语法  npm包  原型 原型链 数组常用方法 模块化

## 2.react的基本使用

从html中引入react:1.babel.js(ES6=>ES5  JSX=》js) 2.react.development.js 3.react-dom.development.js

核心react库必须在dom库之前引用

**1，**《script type=“text/babel”》

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>02.react basic</title>
</head>
<body>

<!-- 准备好一个容器 -->
<div id="test"></div>

<script type="text/javascript" src="/js/react.development.js"></script>
<script type="text/javascript" src="/js/react-dom.development.js"></script>
<script type="text/javascript" src="/js/babel.min.js"></script>
<script type="text/babel">
  // 创建虚拟dom 可以与html混着写
  const VDOM = <h1>Hello react</h1> 
  // 渲染虚拟dom到页面
  ReactDOM.render(VDOM,document.getElementById('test'))
</script>
</body>
</html>
```

## 3.为什么要使用jsx？

使用js创建react虚拟dom的写法：

```
<script type="text/javascript" src="/js/react.development.js"></script>
<script type="text/javascript" src="/js/react-dom.development.js"></script>
<!-- <script type="text/javascript" src="/js/babel.min.js"></script> -->
<script type="text/javascript">
  // 创建虚拟dom 可以与html混着写
  const VDOM = React.createElement('h1',{id:'title'},'hello,react')
  // <h1 id="title">Hello react</h1> 
  // 渲染虚拟dom到页面
  ReactDOM.render(VDOM,document.getElementById('test'))
  
</script>
```

如果出现dom结构嵌套问题，在（）需要继续追加react.createElement，jsx就是为了解决这类问题，实现在js中写出html的结构

## 4.虚拟dom与真实dom

虚拟dom中属性较少，无需挂载真实dom中那么多

最终会被react转换为真实dom，在页面中呈现出来。

## 5.jsx：javascript XML

由react定义的js扩展语法

**xml：**早期用于存储与传输数据 :<student><name>Tom</name><age>19</age></student>

json:parse stringfy

jsx语法规则：

+ 定义虚拟dom时不要写引号
+ 变量的引用一律使用{}，除了写变量，也可以写表达式：会产生一个值 ，可以放在任何一个需要值得地方。
+ 样式类名指定不要使用class，而是使用className
+ 内联style指定使用style = {{key：value}}的写法，key使用驼峰写法
+ jsx要求根标签只能有一个，所以要求react的虚拟dom写法需要包在一个div内
+ 不管什么标签，都需要写对应结束标签或者写成自结束标签
+ jsx标签里能写的东西：
  + html标签小写的时候是一一对应的，
  + 若要写自定义的组件标签，需要写成大写的 若组件没有定义，则报错

## 6.jsx小练习动态展示

{}表达式：包含：

+ a
+ a+b
+ demo(1)
+ arr.map()
+ function test(){}

注意 for循环是没有返回值得 包括foreach，可以使用map进行遍历操作元素并取得响应得数组

```
  const VDOM = 
  (<div>
    <h1>前端js框架列表</h1>
    <ul>
      {data.map((val,index)=><li key={index}>{val}</li>)}
    </ul>
   </div>
    ) 
```

## 7.模块化 组件化

向外提供特定功能的就是模块，可以复用，保证每个js不那么庞大。

组件化：html css也一并进行模块化，使组件与页面元素相对应

目的：复用代码 简化代码，实现业务效率的提升

## 8.安装开发者工具

## 9.函数式组件

```
  // 创建函数式组件
  function Demo(){
    return <h2>我是用函数定义的组件（适用于【简单组件】的定义）</h2>
  }
  // 渲染组件到页面
  ReactDOM.render(<Demo/>,document.getElementById("demo"))
```

函数中的this是undefined 因为babel的严格模式不支持自定义指向window的内容

执行渲染时：找Demo标签，随后调用该函数，将吧return的虚拟dom转为真实dom，呈现到页面中

## 11类式组件

类的认识：

通过person实例调用speak中，speak中的this就是Person实例，使用.call调用则将this指向（）中的对象。

```
  class Person {
    constructor(name,age){
      this.name = name
      this.age = age
    }
    speak(){
      console.log(`我叫${this.name},我今年${this.age}`);
    }
  }
  const p1 = new Person('孙悟空',18)
  p1.speak()
  p1.speak.call({name:'猪刚烈',age:22})
```

类的继承：

```
  class Student extends Person{
    constructor(name,age,number){
      super(name,age)//继承属性
      this.number = number
    }
    speak(){
      console.log(`我叫${this.name},我今年${this.age},我的学号时${this.number}`);
    }
    study(){
      console.log('我学习很努力')
    }
    
  }
```

+ 类中的构造器不是必须要写的，在初始化实例的需求下才写
+ super（XXX，XXX）用来在子类的构造器中继承父类的属性
+ 类中定义的方法都是放在了原型对象上，通过原型链进行继承

### 类定义的组件

render方法是必须要写的！

```
    class MyComponent extends React.Component{
      render(){
        return( 
          <div>
            <h2>我是用类定义的组件（适用于【复杂组件】的定义）</h2>
            </div>)       
      }  
    }
    console.log(<MyComponent/>);//<MyComponent/>就是类的实例
    ReactDOM.render(<MyComponent/>,document.getElementById('demo'))
```

写组件标签的时候，react就new了一个组件实例

+ render找寻第一个所对应的函数或类
+ 发现是类定义的时候，new一个实例出来，通过该实例调用原型上的render方法（render中的this为组件实例对象）
+ 将render返回的虚拟dom转为真实dom，随后呈现

MyComponent实例：

```
MyComponent {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …}
context: {}
props: {}
refs: {}
state: null
updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
_reactInternalFiber: FiberNode {tag: 1, key: null, stateNode: MyComponent, elementType: ƒ, type: ƒ, …}
_reactInternalInstance: {_processChildContext: ƒ}
isMounted: (...)
replaceState: (...)
__proto__: Component
```

**组件实例的三大属性：**

**props: {}**
**refs: {}**
**state: null**

## 12.简单与复杂组件

具有状态的组件即为复杂组件 

状态：state：状态会影响行为

state中存放数据，数据的改变驱动页面

## 13.react中的事件

类中会自动开启严格模式:‘use strict’ 

将this指向window的指向underfined

在原生的标签onClick = {this.changeWeather}中，相当于调用了onClick的回调，不是通过实例进行的调用，所以这里的changeWeather中的this发生的变化，不再指向类实例



## 14.解决的方法this

```
this.changeWeather = this.changeWeather.bind(this)//去原型上找 changeWeather 他会生成一个新的函数并改了this 
```

在constructor上定义一个方法，并修改自身方法的this

```
Weather {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
changeWeather: ƒ ()
context: {}
props: {}
refs: {}
state: {ishot: true}
updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
_reactInternalFiber: FiberNode {tag: 1, key: null, stateNode: Weather, elementType: ƒ, type: ƒ, …}
_reactInternalInstance: {_processChildContext: ƒ}
isMounted: (...)
replaceState: (...)
__proto__: Component
```

## 15.setState react中的状态不可以直接更改

使用setState进行更改state，并且构造器只调用1次，render会调用n+1次

changeweathe调用n次

```
  <script type="text/babel">
    class Weather extends React.Component{
      constructor(props){
        super(props)
        this.state = {ishot:true,wind:'微风'}
        this.changeWeather1 = this.changeWeather.bind(this)//去原型上找 changeWeather 他会生成一个新的函数并改了this  
      }
      changeWeather(){
        const ishot = this.state.ishot
        this.setState({ishot:!ishot})
      }
      render(){
        const {ishot,wind} = this.state
        console.log('这是render中的this',this);
        return( 
          <div>
            <h2 onClick={this.changeWeather1}>今天天气很{ishot?'炎热':'寒冷'}{wind}</h2>
            </div>)       
      }  
    }
    // console.log(<MyComponent/>);
    ReactDOM.render(<Weather/>,document.getElementById('demo'))
  
  </script>
</body>
```

## 18.精简的写法

1.初始化状态的精简 直接使用赋值的写法（不加const声明）

2.更改this指向的精简 使用箭头函数赋值 直接指向上一层及组件实例的this

```
  <script type="text/babel">
    class Weather extends React.Component{
      state = {ishot:true,wind:'微风'}
      changeWeather=()=>{
        const ishot = this.state.ishot
        this.setState({ishot:!ishot})
        console.log(this);
      }
      render(){
        const {ishot,wind} = this.state
        console.log('这是render中的this',this);
        return( 
          <div>
            <h2 onClick={this.changeWeather}>今天天气很{ishot?'炎热':'寒冷'}{wind}</h2>
            </div>)       
      }  
    }
    // console.log(<MyComponent/>);
    ReactDOM.render(<Weather/>,document.getElementById('demo'))
  
  </script>
```

## 19.state总结 

state是组件对象中最重要的属性，他的值是一个对象

组件被称为状态机，通过更新组件的state来更新对应的页面显示（重新进行渲染）！

**！！作为事件的回调函数使用箭头函数的赋值语句写法！**

**状态数据不可以直接进行修改和更新**

## 20.props

props接收从组件外部传过来的数据

```
    class MyComponent extends React.Component{
      state = {name:'Tom',agenda:'女',age:18}
      render() {
        const {name,agenda,age} = this.props
       return (
         <ul>
          <li>姓名：{name}</li>
          <li>姓别：{agenda}</li>
          <li>年龄：{age}</li>
          </ul>) 
      }
    }
    ReactDOM.render(<MyComponent name="hahaha" agenda="女" age="18"/>,document.getElementById('app'))
    ReactDOM.render(<MyComponent name="呜呜呜" agenda="男" age="38"/>,document.getElementById('app2'))
```

## 21.批量处理props=标签属性

可以使用{...进行展开}

```
    class MyComponent extends React.Component{
      state = {name:'Tom',agenda:'女',age:18}
      render() {
        const {name,agenda,age} = this.props
       return (
         <ul>
          <li>姓名：{name}</li>
          <li>姓别：{agenda}</li>
          <li>年龄：{age}</li>
          </ul>) 
      }
    }
    const laoliu = {name:'老刘',agenda:'男',age:40}
    
    ReactDOM.render(<MyComponent name="hahaha" agenda="女" age="18"/>,document.getElementById('app'))
    ReactDOM.render(<MyComponent name="呜呜呜" agenda="男" age="38"/>,document.getElementById('app2'))
    ReactDOM.render(<MyComponent {...laoliu}/>,document.getElementById('app3'))
```

**展开运算符**：

+ const arr3=[...arr1,...arr2]

+ function sum（...num）{num会以一个数组的形式记录参数}

+ reduce求和：number.reduce((prevalue,currentcalue) =>{return prevalue+currentcalue})

+ 不可以展开一个对象！ 通过{...对象名}可以以字面形式赋值（复制）一个对象 const obj2 = {...obj1}

react里通过react和babel的结合，实现的是对象的展开（仅仅使用于标签属性的传递），不是复制对象的形式

+ 用于对象的合并 let person3 = {...person，name：‘jack’，address：‘地球’}

## 22.对props进行限制

  ReactDOM.render(<MyComponent name="呜呜呜" agenda="男" age={38}/>,document.getElementById('app2'))

数字类型：使用{num}的形式

**对标签属性类型的限制**、**可选、默认值**

```
    MyComponent.propTypes = {//类型和必须性限制
      name:PropTypes.string.isRequired,
      agenda:PropTypes.string,
      age:PropTypes.number,
      speak:PropTypes.func,
    }
    MyComponent.defaultProps = {//默认值的限制
      agenda:'不男不女',
    }
    ReactDOM.render(<MyComponent name="hahaha"  age={18} speak = {speak}/>,document.getElementById('app'))
    ReactDOM.render(<MyComponent name="呜呜呜" agenda="男" age={38}/>,document.getElementById('app2'))
    ReactDOM.render(<MyComponent {...laoliu}/>,document.getElementById('app3'))
    
    function speak(){
      console.log('我说话了');
    }
```

## 23.props限制的简写方式

+ porps是只读的！
+ props是给类自身加的 ，可以写在类定义的里面，通过静态属性的写法定义类的自身属性

```
    class MyComponent extends React.Component{
      state = {name:'Tom',agenda:'女',age:18}
      static defaultProps = {
      agenda:'不男不女',
    }
      static propTypes = {
      name:PropTypes.string.isRequired,
      agenda:PropTypes.string,
      age:PropTypes.number,
      speak:PropTypes.func,
    }
```

## 24.类中的构造器与props

在react中，构造函数适用于：

+ 通过给状态赋初始值（this.state={}）

+ 为时间处理绑定实例（否则用箭头函数）

如果在构造器中需要使用实例访问this.props，需要接收props和super接收,否则可能会未定义 一般不会写构造器

## 25.函数式组件使用props

通过传参的方式

```
  <script type="text/babel">
    function Person(props){
      const {name,agenda,age}=props
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{agenda}</li>
          <li>年龄：{age}</li>
          </ul>
      )
    }
    Person.propTypes={
      name:PropTypes.string
    }
    Person.defaultProps = {
      name:'吴亦凡'
    }
    const laoliu = {name:'老刘',agenda:'男',age:18}
    const laowang = {name:'老王',agenda:'女',age:30}
    const laowu = {agenda:'女',age:30}
  ReactDOM.render(<Person {...laoliu}/>,document.getElementById('app'))
  ReactDOM.render(<Person {...laowang}/>,document.getElementById('app2'))
  ReactDOM.render(<Person {...laowu}/>,document.getElementById('app3'))
 </script>
```

## 26.总结一哈

如果使用PropTypes需要加入pros-types的js库

## 27.字符串形式的ref=“string”

获得节点元素 与vue2用法相似

```
   class Demo extends React.Component{
    getContent=()=>{
      console.log('hahaha');
      console.log(this.refs.left.value);
    }
    rightContent=()=>{
      console.log(this.refs.right.value);
      console.log(this.refs);
    }
     render() {
      return (
        <div>
          <input type="text" ref='left' placeholder="点击按钮弹出内容"/>&nbsp;
          <button onClick={this.getContent}>点我一下</button>&nbsp;
          <input type="text" onBlur={this.rightContent} ref='right' placeholder="点击其它处弹出内容"/>
          </div>
      ) 
     }
   }
   ReactDOM.render(<Demo/>,document.getElementById('app'))
```

## 28.回调形式的ref

ref字符串形式 将被弃用，官方方向是不支持使用的

+ 回调函数形式ref 将ref的节点挂到实例自身上 this.input1

```
   class Demo extends React.Component{
    getContent=()=>{
     const {input1} = this//获取c节点的标签属性
     console.log(input1.value);
    }
    rightContent=()=>{
      const {input2} = this
      console.log(input2.value);
    }
     render() {
      return (
        <div>
          <input type="text" ref={c=>this.input1 = c} placeholder="点击按钮弹出内容"/>&nbsp;
          <button onClick={this.getContent}>点我一下</button>&nbsp;
          <input type="text" onBlur={this.rightContent} ref={c=>this.input2 = c} placeholder="点击其它处弹出内容"/>
          </div>
      ) 
     }
   }
   ReactDOM.render(<Demo/>,document.getElementById('app'))
```

## 29.回调形式ref的执行次数问题

更新过程中：在sttat变化时ref会执行两次，他的参数节点c 第一次为null，第二次才为节点信息（状态变化，先清空（null）、后执行（当前节点））

**避免这种问题：将ref函数定义为class的绑定函数：**

```
    saveInput=(c)=>{
      this.input1 = c
    }
    
<input type="text" ref={this.saveInput} placeholder="点击按钮弹出内容"/>&nbsp;
```



## 30.createRef

使用容器创建ref，专人专用，不可以全部都写进去

```
  myRef = React.createRef()//容器
  取出：
      getContent=()=>{
      console.log(this.myRef,'这是myRef');
      console.log(this.myRef.current.value);
    }
    
   <input type="text" ref={this.myRef} placeholder="点击按钮弹出内容"/>&nbsp;
```

## 31.ref总结

+ 尽可能避免字符串形式的ref
+ 回调形式（类绑定或者内联形式都可以使用，项目中用内联的比较多一点）
+ createRef 是官方推荐的，也比较复杂

## 32.React中的事件处理

+ 通过onClick（驼峰写法）绑定自定义事件处理函数，更好的封装性和兼容性。

+ 通过事件委托的方式进行处理 原理事件冒泡

+ 通过eventtarget得到事件源（可以避免使用ref） 

  ```
   rightContent=(e)=>{
  
     console.log(e.target.value);
  
    }
  ```

  注意 不要过度使用ref

## 33.React中收集表单数据

1.非受控组件：表单中输入类DOM的值现用现取

页面无刷新获取数据（表单提交引发跳转）

```
      handleSubmit=(e)=>{
        e.preventDefault();//阻止默认提交
        const {username,password}=this
        alert(username.value,password.value)
        console.log(this);
        return false
      }
```

2.受控组件：

将组件内容保存到state中，省略掉ref

```
    class Login extends React.Component{
      state = {
        username:'',
        password:''
      }
      handleSubmit=(e)=>{
        e.preventDefault();//阻止默认提交
        const {username,password} =this.state
        alert(username+password)
        return false
      }
      saveUsername = (e)=>{
        console.log('改变了');
        console.log(e.target.value);
        this.setState({username:e.target.value})
      }
      savePassword = (e)=>{
        console.log('改变了');
        console.log(e.target.value);
        this.setState({password:e.target.value})
      }
      render(){
        return (
          <form action="http://www.baidu.com" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.saveUsername} placeholder="请输入用户名" name="username"/>
            <input type="text" onChange={this.savePassword} placeholder="请输入密码" name="password"/>
            <button>登录</button>            
            </form>
        )
      }
    }
```

## 35.高阶函数 函数柯里化

```
     saveFormData = (p,event)=>{
        this.setState({[p]:event.target.value})
        console.log(p);
        console.log(event);
      }
     saveFormData2 = (p)=>{
        return (event)=>
        this.setState({[p]:event.target.value})
      }
  <input type="text" onChange={(event)=>this.saveFormData('username',event)} placeholder="请输入用户名" name="username"/>
  <input type="text" onChange={this.saveFormData2('username2')} placeholder="请输入用户名2" name="username2"/>
```

**saveFormData2=**》高阶函数：满足其中一个

+ 若A接收的参数是一个函数
+ 若A调用的返回值是一个函数

常见高阶函数：pormise、settimeout、arr.map等等

函数的柯里化：

通过调用函数继续返回函数，实现多次接收参数最后统一处理的函数编码形式

## 36.React生命周期 回调函数 钩子 

组件的卸载：ReactDOM.unmountComponentAtNode(挂载到的node）

```
      death = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('app'))
      }
```

**componentDidMount挂载完毕**(){

}组件挂载完毕 只调用一次

**unmountComponentAtNode**

```
        ReactDOM.unmountComponentAtNode(document.getElementById('app'))
      }
      componentDidMount() {
        setInterval(() => {
          this.setState({opacity:this.state.opacity>0?this.state.opacity-0.1:1})
        }, 200)   
      }
```

在卸载组件后，其定时器还在运行，此时需要清空定时器（在临卸载或者卸载函数动作前）： **componentWillUnmount将要卸载**

```
      componentWillUnmount(){
        clearInterval(this.timer)
      }
```

或者

```
      death = ()=>{
         clearInterval(this.timer)
        ReactDOM.unmountComponentAtNode(document.getElementById('app'))
      }
```

**render**()

## 38.生命周期 旧 组件挂载流程

旧版本的生命周期:

```
Count-constructor
componentWillMount
render
componentDidMount
componentWillUnmount 卸载钩子函数
```

## 39.生命周期 旧 setState流程

通过   shouldComponentUpdate函数返回值来确定界面是否需要更新吗，默认为return true，即每次状态更新都要render一下，通过自定义false，可以使其不更新，包括state状态。每次setState都会调用这个函数

```
   shouldComponentUpdate(){
   console.log('shouleComponentUpdate')
   return false
   }
```

**setState的流程：**

```
shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate
```

## 40.生命周期 旧 forceUpdate流程

不对状态进行修改，强制进行更新（不用确认should的阀门）：

运行this.forceUpdate() 实现强制更新 生命周期流程如下（跳过shouldUpdate）   

```
componentWillUpdate
render
componentDidUpdate
```

## 41.父组件 旧 render流程

父传子：<B carName={carName}/>

子显示：<div>B{this.props.carName}</div>

componentWillReceiveProps有新的props传入时，子组件才会调用此函数

并且它默认传入参数props

子组件接收参数流程

```
componentWillReceiveProps
Inline Babel script:73 B-shouldComponentUpdate
Inline Babel script:77 B-componentWillUpdate
Inline Babel script:80 B-componentDidUpdate
```

## 42.总结生命周期 旧

+ 初始化组件：ReactDOM.render触发
  + constructor
  + componentWillMount 
  + **render**
  + **componentDidMount** 开启定时器 订阅消息 发送网络请求 

+ 更新组件：setState()或父组件render触发
  + shouldComponentUpdate
  + componentWillUpdate
  + **render**
  + componentDidUpdate
+ 卸载组件：由ReactDOM.unmountComponentAtNode 触发
  + **componentWillUnmount**  关闭定时器 取消订阅

## 43.对比新旧生命周期

+ 旧componentWillMount=》新不被推荐  可以使用UNSAFE_componentWillMount（react18之后旧的就不准用了）

react-dom与reactdev版本一般时匹配版本使用的

+ 旧componentWillReceiveProps=》新：

+ 旧componentWillUpdate=》新 UNSAFE_

**除了unmount其他的will都需要加上UNSAFE_NAME**

后续异步渲染之中可能造成更多的误用will类，新加钩子

+ **将会使用 getDerivedStateFromProps 代替willmount**（在更新以及挂载时都会调用）

+ 在render和DidUpdate之间加入 **getSnapshotBeforeUpdate**

DidUpdate接到两个参数 preprops和prestate，并且是更新前的状态

## 44.新生命周期  getDerivedStateFromProps

获得派生状态：

```
Count-constructor
getDerivedStateFromProps
render
componentDidMount
```

```
      static getDerivedStateFromProps(){
        console.log('getDerivedStateFromProps');
        return {count:108}
      }通过返回状态对象 可以对状态进行影响，并且每次在更新的时候状态不会随之改变
```

```
   static getDerivedStateFromProps(props){

​    console.log('getDerivedStateFromProps',props);

​    return {count:108}

   }
```

可以通过他的参数获取传入的参数props，将其return出去，**实现将自己的状态与派生状态绑定在一起**，在任何时候都由props决定。它横跨挂载与更更新生命周期，只有更新都起作用

**但是派生状态会造成代码冗余，尽量不要用**   

我们可以使用props 的super(props)进行继承！！！

## 45.getSnapshotBeforeUpdate

他需要return 一个null或者快照值

```
getDerivedStateFromProps {name: "tom"}
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate
```

他的return值将传给Didupdate函数作为第三个参数，用以将**更新界面前**的相关数据保留传递下去

## 46.getSnapshotBeforeUpdate案例

**warn：setState中不可以使用数组方法进行自编辑**

需使用【newele，...pre】

用于滚轮位置的记录

## 47.总结生命周期（新）

+ 没有了will 新增了 getDerivedStateFromProps和getSnapshotBeforeUpdate
+ getDerivedStateFromProps return决定了state状态  getSnapshotBeforeUpdate记录更新前一切信息
+ 常用的render、DidMount、willUnmount**新旧中都被使用**

## 48.DOM的diffing算法

diff的最小粒度为节点（标签）

即使出现标签嵌套，对内部标签也是独立diff

key的内部原理：

key作为更新显示的时候，用于作为标记标签的diff标记，render时，会通过key找虚拟dom和旧dom，进行比较并判断是否更新。

如果没有old key ，那么新建一个。

+ **用index作为key的时候，会造成diff的key混乱，无效dom更新太多（对于逆序添加、删除的时候有很大赢影响）。**

+ **当页面还有输入类dom时，index作为key会有严重问题** 会留下残留key的内容

因此,可以使用id作为key：（obj内部进行定义）,进而增加复用性。

## 49.React脚手架

用于快速创建基于XXX库的模板项目（XXX angular react vue），

+ 依赖、运行 打包啥都有
+ 创建react的脚手架库：create-react-app
+ 整体技术架构：react + webpack + es6 +eslint
+ 脚手架开发：模块化 组件化 工程化

**创建项目并启动：**

首先全局安装脚手架库：npm install -g create-react-app

创建项目：项目建立目录下：create-react-app 项目名（避免中文和特殊字符）

运行开发版：yarn/npm start

打包开发便：yarn/npm build

测试：yarn/npm test

暴露webpack的config文件：yarn/npm eject 不可逆



## 50.脚手架文件介绍

css样式

 3、vmin：对比viewport的宽度和高度，按照小的做百分比计算；

 4、vmax：对比viewport的宽度和高度，按照大的做百分比计算；

app.js里可以更改显示效果

+ public：放置静态资源文件

  + favicon.icon

  + **index.html** 单页面应用唯一的 

    + %PUBLIC_URL%代表public这个路径

    + <meta name="theme-color" content="#000000" />用于配置安卓移动端的主题颜色 即网址栏的颜色，兼容性不是很好啊

    + <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> 指定苹果的桌面添加后点击的图标

    + <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />应用加壳 可以作为apk文件应用，这个文件中对加壳做一些配置

    + <noscript>You need to enable JavaScript to run this app.</noscript>作为不支持运行js的浏览器的内容出现

    +  <d iv id="root"></div>根

+ src：

  + **index.js** 入口文件 引入react核心库、dom、index.css（当然也可以html引入）

  引入App组件   document.getElementById('root') 底层写好别的 渲染APP到index.html

   <React.StrictMode>

    <App />

   </React.StrictMode>, 用于严格规范不合理的代码写法

  import reportWebVitals from './reportWebVitals'; 用于记录页面性能

  setupTest：测试

  + **app.js**: import logo from './logo.svg';引入图片logo资源

 

执行顺序：从index.js开始，index.html与组件的连接是通过webpack的react配置完成的

## 52.简单的hello组件

组件可以大写文件名称首字母，并且将后缀名写为jsx

将每一个组件文件内的组件写为index.jsx index.css，直接import 文件就好了

## 53.样式的模块化

+ index.module.css 样式文件命名
+ import hello from './index.module.css'  模块的形式引入css
+ className="hello.title" class的命名

## 55.组件化编码流程

1.拆分界面 抽取组件

2，实现静态组件，使用实现静态页面效果

3.动态显示初始化数据 数据类型 名称 保存在哪个组件

4.添加交互

## 56.组件的组合使用 todolist：

defaultChecked可以用来更改checked的警告

## 58.todolist案例

子传递给父组件：
通过父组件的方法的传递，对父组件进行操作，将参数传进入，对父组件进行相关操作

生成唯一id的库：yarn add nanoid

imort {nanoid} from 'nanoid'

通过调用nanoid生成唯一的字符串id

## 61.安装yarn add prop-types

yarn add prop-types

## 62.reduce的用法

```
{todolist.reduce((pre,val)=>{return val.isDone===true?pre+1:pre+0},0)
```

**在react中，checked必须和onchange一起定义，否则就写死了，无法改变选项框***

## 64.总结

+ 组件拆分

+ 数据的放置 都要用的放在父组件
+ 父组件传给子组件：props  子组件传给父组件：调用父组件函数传递
+ 状态在哪里，就在哪里操作状态
+ defaultChecked一旦定义后，后续的改变就不起作用了，因此需要使用checked和onChange一起结合

## 65.react ajax

常用的ajax请求库：jquery 不建议使用

axios：轻量级 建议使用 1.封装XHR对象的ajax  2.promise风格  3.可以用在浏览器端和node端

```
yarn add axios 

import axios from ’axios‘
```

发送请求：



可以通过前端设置相同端口的代理进行中间代理，解决跨域问题 一般都是使用cors解决跨域问题

开启代理方式：

+ 第一种：package.json中设置代理： "proxy":"http://localhost:5000"  将发给3000的转换为5000（中间体起作用）  重新开启脚手架  如果自己的3000端口不存在此资源，则会请求代理端口的数据

​       这种方法只能配置一个代理的服务器端口

+ 第二种：src中新建setupProxy.js文件：

```
const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    proxy('/api1',{==》遇见api1前缀的url，转发
      target:'http://localhost:5000',==》请求转发给谁谁谁
      changeOrigin:true,//控制服务器收到的请求头中Host主机的字段的值 在服务器端解读request host的时候解读到的将是5000端口信息
      pathRewrite:{'^/api1':''}//重写请求路径 
    }),
    proxy('/api2',{
      target:'http://localhost:5001',
      changeOrigin:true,
      pathRewrite:{'^/api2':''}
    })
  )
}
```

axios请求编写：

```
axios({url:'/cars',baseURL:'http://localhost:3000/api2',method:'get'}).then(res=>console.log('成功了',res.data)).catch(err=>console.log('失败了',err))
```

public里的样式 一般通过index html进行引入（boostrap）

## 68.github搜索案例

连续结构赋值：

const {a:{b:data}}=obj//const {a:{b}}=obj

通过data（重命名）或者不写data的b可以直接拿到b的值

如果遇到遇到大量更新state状态的问题，可以使用setState（obj）更新，obj由更新组件进行传入（可以传部分的key value），因为他是合并操作。

```
updateAppState = (stateObj)=>{
    this.setState(stateObj)
  }
  
updateAppState({isLoading:true,isFirst:false})
```



## 71.消息的订阅与发布

使用pubsub-js  

```
yarn add pubsub-js
```

服务器端也可以使用

用法：

import PubSub from 'pubsub-js'

订阅：写在componentDidMount里

```
const mySubscriber  = function (msg,data){

  console.log(msg,data)

}//

const token = PbuSub.subscribe('MY TOPIC',mySubscriber) 订阅 （消息名，回调函数）在接收组件中定义订阅

token代表一次订阅的token  取消PbuSub.unsubscribe（ token）
```

示例：

```
  componentDidMount(){
    this.token=PubSub.subscribe('MyState',(msg,data)=>{console.log(msg);this.setState(data)})
  }
  
  componentWillUnmount(){
    unsubscribe(this.token)
  }
```

发布：写在 componentWillUnmount里

```
PubSub.publish('MY TOPIC','hello') 第二个参数为携带的数据

```

示例：

```
PubSub.publish('MyState',{users:res.data.items,isLoading:false})
```

## 72.fetch发送请求

ajax请求的方式：

+ xhr 需要写send get等 不好用 解决方案：封装库

jquery   容易形成回调地狱

axios：promise解决回调地狱，有拦截器

+ fetch  ：另外一种ajax请求方案

也是promise风格，但是问题也不少，真是项目中使用的也不多

why **fetch？**

关注分离原则：xhr的调用和配置方式非常混乱（）

fetch请求：

```
      fetch(`/api1/search/users?q=${inputDate.trim()}`,{method:'get'})
      .then(res=>{return res.json()})//服务器联系成功了 简历
      .then(res1=>{
        PubSub.publish('MyState',{users:res1.items,isLoading:false})
    })
      .catch(err=>PubSub.publish('MyState',{err:err.message,isLoading:false}))
      
      
    // const response = await fetch(`/api1/search/users?q=${inputDate.trim()}`)
    // const data = await response.json()
    // console.log(data) //加上try catch捕获错误
```

## 73.总结搜索案例

+ 请求失败的处理
+ 对象的解构  连续解构
+ 订阅与发布 取消
+ fetch  xhr

## 74.React路由

**对SPA的理解：**

+ 单页面应用
+ 整个应用只有一个页面
+ 点击连接不会刷新，会进行页面局部更新
+ 数据通过ajax获取，在前端进行异步的展现

## 75.对路由的理解

前端路由：

**地址（path）与组件的对应**

对于前端来硕，path对应页面组件，对于后端路由来说，path对应(req，res函数）

## 76.前端路由的原理

前端路由的实现依赖：**hsitory**

通过history的push推进router，并且阻止click的默认跳转链接（return false）

利用history.listen可监听变化

以push方式的router是以栈结构进行的，可以实现后退前进

以replace方式进行router：会把栈顶的进行替换

两种工作模式：

+ History.createBrowserHistory

+ History.createHashHistory 锚点跳转”XXXXX#锚点路由“ 兼容性比较好！

## 77.路由的基本使用

react-router：可以给web使用，可以给react-native用，也可以通用

专门web页面开发使用**react-router-dom**

```
yarn add react-router-dom
```

```
APP页面
import { Link ,Route} from 'react-router-dom'
跳转页面a标签更改为：
<Link className="list-group-item" to="/about">About</Link>
<Link className="list-group-item" to="/home">Home</Link>
组件使用：Route建立path与组件的联系

 <Route path="/about" component={About}/>
 <Route path="/home" component={Home}/>
```

总index.js 将APP包裹在BrowserRouter中

```
ReactDOM.render(
<BrowserRouter>

<App/>

</BrowserRouter>

,document.getElementById('root'))import {BrowserRouter} from 'react-router-dom'
```

注意哦 hash router #后面的值不会给服务端，用于前台的锚点

## 78.路由组件文件放置地址

react中路由组件一般存放在pages中，因为它并不存在引入的过程，是由route进行建立path联系进行调度使用的

。

+ **路由组件默认的**props是一个对象，history、location、match等属性、负责展示、随着地址改变而切换，存放于pages中

```
history:
go: ƒ go(n)
goBack: ƒ goBack()
goForward: ƒ goForward()
length: 7
listen: ƒ listen(listener)
push: ƒ push(path, state)
replace: ƒ replace(path, state)
```

```
location:
hash: ""
pathname: "/about"
search: ""
state: undefined
```

```
match:
isExact: true//模糊精准匹配
params: {}
path: "/about"
url: "/about"
```



+ 普通组件的prop并没有这些，在app中以一般组件标签的方式添加

## 78、NavLink使用

使用NavLink可以实现路由的高亮效果，之前的Link并不能做到动态的高亮效果

使用方法：直接替换原来的Link 它可以自动添加active这个类名，

当然也可以通过activeClassName = ”XXX“进行自定义类名，然后通过css更改他的样式

注意如果使用了boostrap，还要提升自己样式的权限！important才可以正常显示。

## 80.封装NavLink ！important

对于导航元素这种高度相似的组件，建议进行封装，后续引入只要写入不同的内容就好了，使用props进行一个传值就好了

标签体内的内容 通过props中的children隐形传递过去了，因此在Navlink子组件中，直接展开props就能够获取children

```
<MyNavLink to="/home">Home</MyNavLink>
            <MyNavLink to="/about">About</MyNavLink>
```



```
 <NavLink activeClassName='isActive' className="list-group-item" {...this.props}></NavLink>
```

**通过标签的chilren可以获取组件标签体内部的内容**

## 81.路由的匹配

路由的匹配按route指定从上至下进行查找匹配，对于超长性的router设定，过长的route可能会影响匹配效率.

**它默认只要有匹配到的组件都会显示出来，（对于一（path）对多（组件）这种情况其实应该避免出现）**

解决办法:引入Switch，将route包裹起来

从而只要有匹配到，就停止向下进行匹配：

## 82.解决样式路径的问题

路由自动将当前url前一个的地址作为根路径（对于相对路径的引用样式方式），解决方案有如下三种

三种解决方案：

+ 将样式引入的方式写成根路径的方式 ‘/css/’,而不是相对路径的方式

+ 写成：%PUBLIC_URL%/css

+ 使用HashRouter

## 83.路由的精准于模糊匹配

Link中给出的路径可以包含很长，而route的path只要出现在最前面，就能匹配==》模糊匹配  与node的原则比较接近

精准匹配：link必须与route精准对应：

```
<Route exact={true} path="/about" component={About}/>  严格匹配
```

**一般不需要开启**

## 84.redirect重定向

从touter-dom中导入Redirect

用法：

放在所有路由最下方，

```
<Redirect to="/home"/>
```

## 85.嵌套路由的使用

子组件中的路由一样使用link route的方法，要带上父级元素的路由，子组件展示的时候父组件依然获得匹配，从而可以是界面page内的组件得以保留展示。

```
        <ul className="nav nav-tabs">
          <li>
            <MyNavLink to="/home/news">News</MyNavLink>
          </li>
          <li>
            <MyNavLink  to="/home/message">Message</MyNavLink>
          </li>
        </ul>
        <div>
        <Switch>
        <Route path="/home/news" component={News}/>
        <Route path="/home/message" component={Message}/>
        <Redirect to="/home/news"/>
        </Switch>
        </div>
```

## 86.向路由组件传递参数

给route内组件传递参数：三种方法都可以用

+ 携带params参数（string**格式切记**）：通过link路径中写入 拼接内容：使用模板字符串的写法/${XXX.XX}/${XXX.XX}

    /:id/:title  再在route中以这种形式进行接收，在路由组件的props中的match属性就有响应的params

  ```
      声明：      {/* params方法 */}
          {/* <Link to={`/home/message/detail/${val.id}/${val.title}`}>{val.title}</Link>&nbsp;&nbsp; */}
              {/* params方法 */}
      {/* <Route path="/home/message/detail/:id/:title" component={Detail} ></Route> */}
      
      组件中接受    //params方法
      // const {id,title} = this.props.match.params
      // const {content} = this.messageDetail.filter(val=>val.id===id)[0]
  ```

  

+ query方式： link的写法：？id=XXX&title=XXX  在这里面叫**search**参数 ==》urlencoded编码

   route中：无需声明接收，正常注册路由即可，在接收组件中props下的location search属性中记录了string格式，使用querystring库进行解析即可：

qs.parse(？id=XXX&title=XXX) 解析为对象

qs.stringfy==>将对象转为urlencode格式（注意需要去掉？之后在处理 search.slice(1)）

```
     声明”  {/* search方法 */}
        {/* <Link to={`/home/message/detail/?id=${val.id}&title=${val.title}`}>{val.title}</Link>&nbsp;&nbsp; */}
            {/* search方法 */}
    {/* <Route path="/home/message/detail" component={Detail} ></Route> */}
    
    接收：“
        //search方法
    // const {id,title}=qs.parse(this.props.location.search.slice(1))
    // const {content} = this.messageDetail.filter(val=>val.id===id)[0]
    
```



+ state 参数方式：

link中：to={{pathname:XXX,state:{id:XXX,title:XXX}}}

route无需声明接收

在路由组件中：location中的state参数接收

注意state的方式是以history的方式进行记录浏览信息的，刷新可以保留当前页面参数。

三种传递方法中：params用的最多

```
 声明：       {/* state方式继续传递 */}
        <Link to={{pathname:'/home/message/detail/',state:{id:val.id,title:val.title}}}>{val.title}</Link>&nbsp;&nbsp;
        
       <Route path="/home/message/detail" component={Detail} ></Route>
       
       接收：
         //state方法
  const {id,title} = this.props.location.state
  const {content} = this.messageDetail.filter(val=>val.id===id)[0]
        
```

## 90.路由跳转方式

push 与 replace

push（默认模式）：压栈方式进入router，可以进行后退 回到前一个

replace模式：（可互相替换的路由组件间），在link中声明replace={true}，回调到上一层路由，而不是在本路由间进行跳转。或者直接写replace也生效，无痕模式浏览。

```
<Link replace={true} to={{pathname:'/home/message/detail/',state:{id:val.id,title:val.title}}}>{val.title}</Link>&nbsp;&nbsp;
```

## 91.编程式路由导航

不依赖link进行路由跳转

使用路由中porps中的history属性进行push和replace跳转，url参数可以写成link那种：params形式、search形式、state形式=》push（‘url’，{id，title}）

实现后退前进：

goforward

goback

go（n）

## 92.withRouter的使用

对于非路由组件想要实现router跳转功能（不存在props的history的状况），可以从router-dom中引入

withRouter，使用方法：一般组件在导出时：

export default withRouter（组件名）就行了，自带的prop中就有相关的路由api了

Header是一个非路由组件：

```
class Header extends Component {
  render() {
    return (
<div className="page-header"><h2>React Router Demo</h2>
&nbsp;<button onClick={this.props.history.goBack}>后退</button>
       &nbsp;<button onClick={this.props.history.goForward}>前进</button>
       &nbsp;<button onClick={()=>this.props.history.go(1)}>go</button>
</div>
    )
  }
}
export default withRouter(Header)
```

## 93.BrowserRouter与HashRouter

底层原理：

Browser：借助h5的history API进行路由调度 对于IE 9以下支持度不高

Hash：借助锚点，＃后 不会向服务器发送，

刷新后对路由的state参数的影响：

使用browser router：可以保留state（使用history）

hash：会导致state的丢失，他不会保留使用history保留state

## 94.antd的使用

组件库：react的ui组件库：ant-design 蚂蚁金服出品

安装：yarn add antd

使用响应的原件，则赋值js代码，并且引入组件的样式库

```
import 'antd/dist/antd.css'
注意哦 import引入会默认去找moulenode中的文件，因此可以直接写这种路径
```

```
 <Button type="primary">Primary Button</Button> 不写type的话默认为default
```

移动端UI库”VantUI

## 95.antd样式按需引入

需要对 create-react-app 的默认配置进行自定义，从到达到按需引入样式。

```
此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）。

引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 react-app-rewired@2.x 版本的关系，你还需要安装 customize-cra。

$ yarn add react-app-rewired customize-cra
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
使用 babel-plugin-import#

注意：antd 默认支持基于 ES module 的 tree shaking，js 代码部分不使用这个插件也会有按需加载的效果。

babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理），现在我们尝试安装它并修改 config-overrides.js 文件。

$ yarn add babel-plugin-import

+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```

## 96.antd自定义主题（单独版不建议使用）

```
此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 craco （一个对 create-react-app 进行自定义配置的社区解决方案）。

现在我们安装 craco 并修改 package.json 里的 scripts 属性。

$ yarn add @craco/craco
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
然后在项目根目录创建一个 craco.config.js 用于修改默认配置。

/* craco.config.js */
module.exports = {
  // ...
};
自定义主题#
按照 配置主题 的要求，自定义主题需要用到类似 less-loader 提供的 less 变量覆盖功能。我们可以引入 craco-less 来帮助加载 less 样式和修改变量。

首先把 src/App.css 文件修改为 src/App.less，然后修改样式引用为 less 文件。

/* src/App.js */
- import './App.css';
+ import './App.less';
/* src/App.less */
- @import '~antd/dist/antd.css';
+ @import '~antd/dist/antd.less';
然后安装 craco-less 并修改 craco.config.js 文件如下。

$ yarn add craco-less
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

## 96-1.antd自定义主题（与按需引入配合使用版，建议使用）

安装yarn add less less-loader（需要较低版本 6.0？） config-overrite.js  中配置：

```
const { override, fixBabelImports ,addLessLoader} = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
   }),
   addLessLoader({
    lessOptions :{
      javascriptEnabled: true,//允许js修改
       modifyVars: { '@primary-color': '#1DA57A' },
    }

     }),
);
```

## 97.redux简介

他不是react的自带插件，前端三大框架都可以用redux，react中用的比较多

**集中式的状态管理**（管理共享状态）

## 98.redux工作流程

工作流程：

![redux原理图](F:\前端\React\【批量下载】react全家桶资料等\尚硅谷React全家桶教程\react全家桶资料\react全家桶资料\02_原理图\redux原理图.png)

+ React Components：getState获取状态、给React组件；组件中提交动作请求   **顾客**

+ ActionCreators：包装为动作对象 （dispatch （action(包含动作的类型type、数据对象 data))  dispatch分发action对象给store   **服务员**

+ Store：总体的一个全局，调度者，中心   **老板娘**
+ Reducers 负责状态的动作的执行（获得之前状态、动作类型），进行状态的加工； 返回给Sore新的状态

也负责初始化状态===》第一次初始化的preval为undefined  **后厨**



**action**动作对象：

+ 属性type:默认@@init  内置写好的
+ data：默认没有data



**reduce：**通过动作和原来的state产生新状态



## 99.求和案例 react版

选择option，会将value作为c的value，因此我们在类中定义{value}=this.selectNumber就可以获得选项的值了

```
    <select ref={ c=> this.selectNumber=c}>

​     <option value="1">1</option>

​     <option value="2">2</option>

​     <option value="3">3</option>

​    </select>&nbsp;
```

## 100.求和案例 redux精简版本

src下新建redux文件夹：下面建立count_reducer.js  store.js

安装 yarn redux



建立store： （store.js）

```
import { createStore } from "redux"
import countReduccer from './count_reducer'

export default  createStore(countReduccer)

//暴露store对象
```

建立reducer （count_reducer.js）

```
reduce中只进行简单的运算，对于判断’延时‘循环等复杂操作一概不处理
```

```
const initPre = 0//初始化pre的值

export default function countReducer(pre=initPre,action){

  const {type,data} = action//从action中解构出类型 和data
  switch (type) {
    case 'increment':
      return data+pre
    case  'decrement':
      return pre-data

    default://初始化
      return pre
  }
}

```

组件中引入store：import store from '../../redux/store'

 通过:label:**store.getState()**可以获得当前状态

改变state状态：:label:**store.dispatch **传递一个对象 type和data的键值对

```
increment=()=>{

 const {value} = this.selectNumber//字符串

 store.dispatch({data:value*1,type:'increment'})

}
```

但是视图此时并不会实时进行更新，新state只有在render后再会进行更新显示：通过:label:**store.subscribe**继续进行解决this.forceUpdate() 也可以写成setState({})

```
componentDidMount(){
  store.subscribe(()=>{this.forceUpdate()})
}
```

store订阅的钩子，如果要做到全局store更新：

可以将

app的ReactDOM.render()都放到此钩子内：

```

import React from 'react'
import ReactDOM from "react-dom";
import APP from "./App";
import store from './redux/store'

ReactDOM.render(<APP/>,document.getElementById('root'))

store.subscribe(()=>{
  ReactDOM.render(<APP/>,document.getElementById('root'))
})
```

## 101Action的写法

定义常量模块，定义常量的变量名：防止用错名字

constant.js:

```
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

建立count_action文件：定义对象的生成函数

```
//为count组件生成action对象

import {DECREMENT,INCREMENT} from './constant'

export const createIncrementAction=(data)=>

 ({type:INCREMENT,data})

export const createDecrementAction=(data)=>

 ({type:DECREMENT,data})
```

组件中使用action的函数进行调用”

```
increment=()=>{
  const {value} = this.selectNumber//字符串
  store.dispatch(createIncrementAction(value*1))
}

```

## 102.求和案例 异步action

action实质就是个

+ obj，包含动作类型和数据的键值对

+ 还可能是一个函数：对应是一个异步action  需要redux-thunk中间件实现store处理这个任务的功能

yarn add redux-thunk 

+  在store中引入redux-thunk

+ createStore 添加applyMiddleware  applyMiddleware(thunk)

```
import { createStore ,applyMiddleware} from "redux"
import countReduccer from './count_reducer'
import thunk from 'redux-thunk'
export default  createStore(countReduccer,applyMiddleware(thunk))
```



组件请求异步任务“

```
incramentAsync=()=>{
  const {value} = this.selectNumber//字符串
  createDecrementAsyncAction(value,500)
  // setTimeout(()=>store.dispatch(createIncrementAction(value*1)),1000
  // )
}
```

action中定义异步任务：在组建中还需要一次dispatch请求

```
export const  createDecrementAsyncAction=(data,delay)=>{
  console.log(this)
  return (dispatch)=>  这里调用者是store，默认参数dispatch
  setTimeout(() => {
    console.log('到点了')
    dispatch(createIncrementAction(data))   
}, delay);}
```

## 103.对react-redux的理解

**可以实现自动监视state变化，提供API优化dispatch**

引入react-redux：yarn add react-redux

![react-redux模型图](F:\前端\React\【批量下载】react全家桶资料等\尚硅谷React全家桶教程\react全家桶资料\react全家桶资料\02_原理图\react-redux模型图.png)

UI组件如果使用redux的数据，

+ 需要通过容器组件获取getState()并props给ui组件

+ 容器组件通过dispatch（action对象）更改redux状态

容器组件新建一个文件夹container进行存放

容器组件中：建立起UI组件与redux的桥梁，引入UI组件，

+ 与UI组件的连接通过connect完成：

```
import {connect} from  'react-redux'
import CountUI from '../../components/Count'
// import store from '../../redux/store'


//connect的第一个参数是函数，传递的是状态的键值对 通过函数return暴露  store的状态默认已经给出，直接使用，此时子组件可以直接使用this.props.A作为他需要的状态值
function a (state){
  return {A:state}
}
//第二个参数是函数，返回值是一个表示操作状态的方法 通过函数return暴露 ，在子组件中通过
function b (){
  return {B:()=>{console.log('hahaah');}}
}

export default connect(a,b)(CountUI)//建立起UI组件与容器的关联

将父组件中引入CountUI组件变更为引入 容器组件
```

+ 与store的连接：再在父组件的CountUI容器组件上绑定store={store} UI组件的父组件中

```
import React, { Component } from 'react'
// import Count from './components/Count'
import Count from './containers/Count'
import store from './redux/store'
export default class app extends Component {
  render() {
    return (
      <Count store={store}/>
    )
  }
}
```

总结：

主要业务逻辑写在容器内，通过connect函数映射状态和方法：

```
import { connect } from 'react-redux'
import { createDecrementAction, createDecrementAsyncAction, createIncrementAction } from '../../redux/count_action'
import CountUI from '../../components/Count'

// import store from '../../redux/store'

//connect的第一个参数是函数，传递的是状态的键值对 通过函数return暴露  默认参数state
function mapStateToProps(state) {
  return { count: state }
}
//第二个参数是函数，返回值是一个表示操作状态的方法 通过函数return暴露  默认给出参数dispatch
function mapDispatchToProps(dispatch) {
  return {
    jia: data =>
      dispatch(createIncrementAction(data)),
    jian: data =>
      dispatch(createDecrementAction(data)),
    jiaAsync: (data,delay)=>
      dispatch(createDecrementAsyncAction(data,delay)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountUI)//建立起UI组件与容器的关联
```

react-redux的基本使用：

两个概念：

+ UI组件：不适用任何redux的api

+ 容器组件：负责与redux通信，将结果通过props交给UI组件

react-redux的精简写法：‘

一般写法：

```
export default connect(
  state => ({ count: this.state }),
  dispatch => (
    {
      jia: data => dispatch(createIncrementAction(data)),
      jian: data => dispatch(createDecrementAction(data)),
      jiaAsync: (data, delay) => dispatch(createDecrementAsyncAction(data, delay)),
    }
  )
)(CountUI)//建立起UI组件与容器的关联
```

精简写法（API辅助功能）：dispathtoprops默认传参，可以不用写参数，写成action函数键值对的性质，自动进行dispatch分发：

```
export default connect(
  state => ({ count: this.state }),
 {
    jia:createIncrementAction,
    jian:createDecrementAction,
    jiaAsync:createDecrementAsyncAction
  }
)(CountUI)//建立起UI组件与容器的关联
```



## 107.provider组件的使用

使用容器组件和ui组件，通过connect，建立了props和store之间的联系，实现了自动渲染store的功能

内部具备了suscribe的检测变化的能力 以下检测代码可以取消：

```
//检测store状态变化 一旦变化 重新渲染
// store.subscribe(()=>{
//   ReactDOM.render(<APP/>,document.getElementById('root'))
// })
```

在index入口文件中 ：实现全局引用store：将整个APP包裹在Provider内，并提供store，可实现全局使用store

```
src:index.js
import store from './redux/store'
import {Provider} from 'react-redux'
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(
<Provider store={store}>
<APP/>
</Provider>,
document.getElementById('root')
)
```

## 108.整合UI和容器组件

将UI和容器组件写到一个文件里面：都写在container里面

```
import { connect } from 'react-redux'
import { createDecrementAction, createDecrementAsyncAction, createIncrementAction } from '../../redux/count_action'

import React, { Component } from 'react'

class Count extends Component {
  state = {car:'布加迪'}
//store写法：
increment=()=>{
  const {value} = this.selectNumber//字符串
  this.props.jia(value*1)
}

//store写法：
decrement=()=>{
  const {value} = this.selectNumber
  this.props.jian(value*1)
}


//store写法：
incrementIfOdd=()=>{
  const {value} = this.selectNumber//字符串
  this.props.jia(this.props.count%2?value*1:0)
  
}


//store写法：
incramentAsync=()=>{
  const {value} = this.selectNumber//字符串
  this.props.jiaAsync(value*1,500)

}
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
        <select ref={ c=> this.selectNumber=c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
       </select>&nbsp;
       <button onClick={this.increment}>+</button>&nbsp;
       <button onClick={this.decrement}>-</button>&nbsp;
       <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
       <button onClick={this.incramentAsync}>异步加</button>
      </div>
    )
  }
}


export default connect(
  state => ({ count: state }),
 {
    jia:createIncrementAction,
    jian:createDecrementAction,
    jiaAsync:createDecrementAsyncAction
  }
)(Count)//建立起UI组件与容器的关联
```

总结：

+ 定义ui展示组件 

+ connect生成容器组件 

+ 映射状态 映射改变状态的方法 
+ ui中使用this.props获取状态或者实现方法（映射后的方法），从而使store的api不暴露到ui界面

## 110.数据共享 编写person组件

store多个reducer的创建：store.js中

需要合并reducer  从redux中引入combineReducers

createStore使用combine之后的allreducer

```
import { createStore ,applyMiddleware,combineReducers} from "redux"
import countReducer from './reducers/count'
import personReducer from "./reducers/person"
import thunk from 'redux-thunk'

const allReducer =  combineReducers ({countReducer,personReducer})
export default  createStore(allReducer,applyMiddleware(thunk))

```

## 112.纯函数：action中要求定义的是纯函数

像数组操作这种变化，react不会捕捉到内部的变化，因为他只是判断引用的地址值，无法监听到他的改变，需要使用解构生成新数组的方式进行更迭，让react获取变化

纯函数就是有同样的输入，必定获取同样的输出，即函数内部之结构 逻辑关系必然是固定的、绝对的。要求：

+ 函数体内不得改写参数数据（数组操作自改写）
+ 不得使用任何延时操作  网络请求 输入输出
+ 不可使用Date.now（） Math.random()等不纯的方法

## 113.redux开发者工具

+ chrome中将插件装入redux_dev_tools

+ 需要在项目webpack中安装 yarn add redux-devtools-extension

+ src文件夹下 store.js下 引入

  ```
   import {composeWithDevTools} from ’redux-devtools-extention‘
  ```

  

+ 将下列创建store改写为：

  ```
  // export default createStore(allReducer,applyMiddleware(thunk))
  
  export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
  ```

  

对于大型的store，可能需要非常多的reducer，因此可以使用另外一个js文件专门用于汇总所有的reduce，然后将allreducers暴露给store，即store中不引入单独的reducer：

```
reducer下建立index.js：
import { combineReducers } from 'redux'
import  countReducer from './count'
import  personReducer from './person'

export default combineReducers({countReducer,personReducer})

```

尽可能触发简写形式，reducer也可以利用默认调用重命名的形式进行改写，**触发对象中的简写形式**

## 115.项目打包

yarn build

除了node 和 nginx外 还可以使用serve库进行运行打包后的产品

npm i serve -g  或yarn add serve -g

在index.html所在目录下运行serve或者是运行所在的文件夹目录 可以实现index.html网页的打开

```
cmd命令：serve（npm安装）文件名或当前路径直接运行 

  yarn serve 文件名或当前路径直接运行


```

## 116.react扩展

setState更新状态的两种写法



setState除了传一个对象参数以外，还可以传一个函数参数

react更新setState是个异步的更新，可以通过这个函数参数进行回调获取准确的对象参数

```
 this.setState({count:this.state.count+1},()=>console.log(this.state.count))
```

第二种写法：函数式的setState：还可以获取props

```
    //函数式set写法
    this.setState((state,props)=>{
      return {count:state.count+1}
    })
  }
```

对象式的写法是函数式的语法糖，对象式的可以直接对count进行更改，

而如果新状态依赖于原状态，也可以使用函数式的

### 117.懒加载

对于多组件 大项目使用

引入：路由设置组件页引入lazy , Suspense

import React,{ Component ,lazy , Suspense} from 'react'

懒加载组件的引入：

```
const   Home = lazy(()=>import('./Home'))
const   About = lazy(()=>import('./About'))
```

Route需要使用Suspense 包裹 并设置加载时的替代效果，如果不加入suspense，会出现不显示的问题

```
                 <Suspense fallback={<h1>Loading....</h1>}>
                 <Route path="/about" component={About}/>
                 <Route path="/home" component={Home}/>
                 </Suspense>
```



<h1>Loading....</h1>可以作为普通组件进行加载并设置更多的样式

## 118.stateHook

函数式组件

state：   const a = React.useState()  a中第一个元素为状态，第二个元素为更新的方法

```
import React, { useState } from 'react';

export default function Hooks() {
  const [count,setcount] = useState(0)//0为初始化值，虽然多次执行了函数，但是count已经缓存下来，并不会每次都执性初始化
  
  return (
      <div>
        <h2>当前求和为：{count}</h2>
        <button onClick={()=>setcount(count+1)}>点我加1</button>
      </div>
  )
}
```

setcount也可以写成函数式：

```
()=>setcount(count=>count+1)
```

浅层的对象状态的写法：

```
export default function Hooks() {
  const [count,setcount] = useState(0)
  const [person,setPerson] = useState({name:'小明',age:5})
  const {age,name} = person
  return (
    
      <div>
        <h2>当前求和为：{count}</h2>
        {/* <button onClick={()=>setcount(count+1)}>点我加1</button> */}
        <button onClick={()=>setcount(count=>count+1)}>点我加1</button>
        <h2>名字为：{person.name}</h2>
        <h2>年龄为：{person.age}</h2>
        <button onClick={()=>setPerson({age:age+1,name})}>点我长大了</button>
      </div>
  )
}
```

## 119.EffectHook 生命周期

```
  如果第二个参数不传，监测所有生命周期。
  如果写[],则谁都不监测
  如果写了个[count],则监测count的变化  数组中还可以多个参数
  React.useEffect(()=>{
    console.log('object');
  },[])
  
```

（）={执行体中可以防止回调 延时调用函数}，定时timer需要在willunmount时期进行清除

:zap: React.useEffect(()=>{//相当于did mount 和did update 两个钩子} return中相当于willunmount钩子



在函数式组件中，willunmount为useEffect  return的函数，通过在return的函数体中定义卸载前执行的动作，完成willunmount的调用

```
  React.useEffect(()=>{//相当于did mount 和did update 两个钩子
    let timer= setInterval(()=>setcount(count=>count+1),1000)
   
   return ()=>{
      console.log('要被卸载了');
      clearInterval(timer)
    }
  
  },[])
```

## 120.RefHook

 const myRef = useRef()

 myRef即是定义的ref={myRef}的变量对象

通过myRef.current.value可以获取他的值  myRef.current代表当前指向节点

```
const myRef = useRef()
<input type="text" ref={myRef}/>
<button onClick={()=>alert(myRef.current.value)}>点我提示数据</button>
```

## 121.fragment 文档碎片

解决过多div嵌套的问题，使用Fragment代替之前的根标签div 他只接收key属性 用作遍历识别

他不参与最终渲染

也可以使用<></>但是不能用它来传递任何属性

```
      <Fragment>
        <h2>hahah </h2>
      </Fragment>
```

## 122 Context 上下文 provider consumer

用于组件间的通信：常用于组组件和后代组件之间的通信

```
在组组件下创建全局上下文变量const UserNameContext = createContext()
组组件外包裹上下文的provider  并将要传递的值赋值给value
        <UserNameContext.Provider value={username}>
        <B />
        </UserNameContext.Provider>

在后代组件中使用：需要先生命使用：
  state = {username:'tom'}
  后代组件使用：直接使用context就可以拿到
        <h5>我从B组件接收的用户名是{this.context}</h5>   
```

value也可以传递对象 函数

在函数式组件中使用context：

```
         使用UserNameContext的Consumer将后代组件包裹，并使用value作为参数的函数传递给后代组件使用
         <UserNameContext.Consumer>
        {value=><h5>我从B组件接收的用户名是{value}</h5>}   
        </UserNameContext.Consumer>   
```

 **context在react的插件封装中使用比较广泛，但是在一般应用开发中使用不多**

## 123.PureComponent

一般的组件，只要存在嵌套关系，父组件render的时候，子组件也进行render，无论子组件是否使用了父组件的props。

component存在两个问题：

+ 只要执行setState，无论状态有没有更改，组件也将重新render（比如setState（{}）这种）
+ 只要组件重新render，就会自动render子组件==》效率很低（如果子组件没有使用父组件的任何数据）

原因在于shouldComponentUpdate默认返回true

解决方案：

组件的state或props数据发生改变时，才会重新render

+ 解决setState（{}）的问题：

```
  shouldComponentUpdate(nextProps,nextState){
    console.log({nextProps},{nextState});
    console.log(this.props,this.state);
    return nextState.carname!==this.state.carname
  }
```

+ 解局不继承任何数据子组件重复渲染的问题：

+ ```
    shouldComponentUpdate(nextProps,nextState){
      console.log({nextProps},{nextState});
      console.log(this.props,this.state);
      return nextProps.carname!==this.props.carname
    }
  通过监听自己props是否有变化决定是否要渲染
  ```



react官方解决方案：

使用PureComponent代替Component

```
class Parent extends PureComponent {
```

## 124.Render Props 标签属性定义render函数进行传值

父子关系的形成：嵌套至下如何将A的值传给B呢？

```
 <A><B /></A>
```

```
class A extends Component {
  render() {
    return (
      <div>
        <h4>我是A组件</h4>
        {this.props.children}
      </div>
    );
  }
}
```

这种情况下如何进行props的传递？

```
 在具有嵌套的祖先组件中：<A render={(name)=> <B name={name}/>}/>  定义传值函数
 在A组件中：{this.props.render(this.state.name)}  在A中执行函数进行传值
 在B中：<h5>我的名字是：{this.props.name}</h5>  接收
```

## 125.ErrorBoundry

错误边界

将错误控制在某一个组件 UI界面某一块区域，而不是影响整个页面、整个APP的运行

需要在容易发生错误的:smile:父组件区域做一些动作

```
  父组件内：
class Parent extends Component {
  state = {hasError:''}
  static getDerivedStateFromError(error){
    console.log(error);
    return {hasError:error}//返回错误对象 更新state的错误值
  }
  render() {
    return (
      <div>
        <h1>我是Parent组件
        </h1>
        {this.state.hasError?<h3>你的电脑太垃圾了，不配浏览此内容</h3>:<Child/>}//进行判断 选择显示组件还是替代标签
      </div>
    );
  }
}

```

在vite里测试错误边界 开发者环境也是可以用的 webpack中只能打包后生效



还可以使用componentDidCatch 来统计出错的状况：

```
  componentDidCatch(){//渲染时出错的回调函数：多用于统计出错次数 发送给后台
    console.log('渲染时出错了');
  }
```

注意！错误边界！**只能捕获子组件生命周期发生的错误**（主要是渲染问题），初始化的过程、定时器中的错误是不行的



## 126.组件间通讯方式总结：

**组件之间的关系：**

+ 父子关系
+ 兄弟关系（非嵌套组件）
+ 祖孙组件（跨级组件）

**通信方式：**

```
1.props children props   render props
2.消息订阅 发布  pub-sub
3.集中式管理 redux dva等等
4.context：生产者消费者模式
```

**比较好的搭配方式**：

```
父子之间：props

兄弟之间：消息订阅发布 或redux

祖孙组件：订阅发布、redux、context 
```

