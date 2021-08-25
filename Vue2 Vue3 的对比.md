## 1.Vue2 Vue3 的对比

Vue3 main.js:

```
import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

// import ElementUI from 'element-plus'

import store from './store'

// import 'element-plus/lib/theme-chalk/index.css'//注意这里要引css文件！

createApp(App).use(router).use(store).mount('#app')
```

Vue2 main.js:

```
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import obj from './components/common/toast'
import FastClick from 'fastclick'
import lazyload from 'vue-lazyload'
Vue.use(obj)
Vue.use(lazyload,{loading:require('./assets/img/common/placeholder.png')})
// 
// Vue.use(FastClick)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
import router from "./router"
new Vue({
  render: h => h(App),
  router,
  store,
  // toast
}).$mount('#app')
FastClick.attach(document.body)
```

## 2.全局插件

```
import Toast from 'components/common/toast/Toast'
const obj = {}
obj.install=function(Vue){
  // this.show='hahaha'
  console.log('安装toast',Vue);
  // document.body.appendChild(Toast.$el)
  // Vue.extend(Toast)
  const toastContructor = Vue.extend(Toast)//根据vue组件 创建一个组件对象构造器
  const toast = new toastContructor()//创建一个新的toast组件对象
  toast.$mount(document.createElement('div'))//将组件对象挂载到'div'上
  document.body.appendChild(toast.$el)//再将新的toast.$el添加到document的body上去
  Vue.prototype.$toast = toast
}
export default obj
```

在main.js中Vue.use（obj）就好了，引用时只要在需要使用的组件中

this.$toast.show(res); show是toast组件内部定义的方法，用于显示。

## 3.全局组件

```
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

## 4.vite的模块自动化导入

```
const modulesFiles = require.context('./modules', true, /\.js$/) // webpack
const modulesFiles = import.meta.globEager("./module/*.js") // vite
————————————————
版权声明：本文为CSDN博主「weixin_43857376」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43857376/article/details/114687031
```

以下为webpack示例

```
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

以下是vite的按需加载和统一加载

```
 let routesmodules = {} as any

 const modulesFiles = import.meta.globEager("../views/*/*.vue")

 for (let key in modulesFiles){

  console.log(key);

 console.log(modulesFiles[key].default.name);

  routesmodules=Object.assign({[modulesFiles[key].default.name]:modulesFiles[key].default},routesmodules)

 };

 const Myspace = modulesFiles['../views/myspace/Myspace.vue']['default']

 console.log(routesmodules['Home']);
```



```
let routesmodules = {} as any

const modulesFiles = import.meta.glob("../views/*/*.vue")

console.log(modulesFiles);

Object.keys(modulesFiles).forEach((key)=>{

 const moduleName=(key.match(/\.\.\/.*\/.*\/(\w+)/) as any)[1]

 routesmodules=Object.assign({[moduleName]:modulesFiles[key]},routesmodules)

})

console.log(routesmodules);
```

## 5.vue2补充

### 1.点击 按键 事件的指定修饰

+ event.preventDefault()阻止默认
+ event.stopPropagation()阻止继承
+ @click.stop 阻止传播
+ @submit.prevent
+ @click.stop.prevent
+ @click.capture 捕获模式
+ @click.self 当target为当前元素时触发 阻止冒泡
+ @click.once 只会触发一次
+ @scroll.passive 优化滚动的阻塞问题
+ @key.enter tab delete esc space up down left right 
+ @key.ctrl.keycode shift alt meta(cmd键)
+ @mouse.left righ middle

### 2.input select的用法

为input指定label

```
<input id="input1"/> <label for="input1">
```

select的value为option的值

```
<select value><option disable><option>XXX</option>  
```

对于checkbox类型，我们可以指定他的true-value false-value

### 3.v-model

当value发生变化时才更新：v-model.lazy

另外 华友v-model.trim      v-model.number会将结果转为数字



### 4.动态引入 :is组件名

可以使用 :is="computed里面定义的动态生成组件名的计算属性函数"

view路由的动态引入：

```
   <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view></div>
```

### 5.父子传值

①v-bind=“对象名” 等于直接对象的所有属性名  但这里传入的时property

②子组件根标签不继承：组件定义中设置inheritAttrs:false  style class不会受到影响

③任选一个标签继承 vbind=”$attrs“

④自定义v-model：

```
model：{prop：”checked“，event:"change"} 

props:{checked:Boolean}
```

⑤子组件向父组件发送数据的语法糖写法：

```
在子组件中将事件命名为：emit("update:foo",value)
在父组件中 :foo.sync="bar" 完成将value绑定到bar身上
```

### 6.具名插槽

```
<slot name="XXX">
引用：<template #XXX></template>
```

插槽prop：

```
通过<slot :user="users">引入
父组件中<template #default="slotprops">{{slotprops.user.name}}</template>
```

### 7.异步加载 状态的处理

```
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### 8.Vue根实例属性的访问：

```
this.$root.foo
```

对method data都有效，也可以进行写入

访问父组件的

```
this.$parent.map
```

### 9.Vue2中的注入

```
provide: function () {
  return {
    getMap: this.getMap
  }
}
inject: ['getMap']
```

### 10.组件的加载

### 组件的动态注册

```
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```

这两者是等效的

```
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

### 11.组件的动态过渡

**使用transition **对v-if和v-show都生效

https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D

```
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">//包裹过渡组件
    <p v-if="show">hello</p>
  </transition>
</div>

//设置css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

创建动态过渡的最终方案是组件通过接受 props 来动态修改之前的过渡。一句老话，唯一的限制是你的想象力

通过`name` attribute 来绑定动态值。

### 12.组件的生命周期事件绑定

```html
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

