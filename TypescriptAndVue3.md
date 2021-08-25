# Vue 3.0

## 1.认识Vue3.0

+ 更好的支持TS
+ 支持Vue2.0的大多数特性
+ 使用Proxy代替了defineProperty
+ 重写虚拟BOM的实现和TreeShaking：将没用的东西删除、更加轻量化
+ 新增：Composition（组合） API
+ setup：实现计算属性 监视  ref和reactive 新的生命周期函数
+ 模板中可以不用写div根标签了
+ 支持标签驼峰写法
+ :imp: v-if的优先级高于v-for（与vue2相反）
+ 。。。。。。

## 2.创建Vue3.0项目

+ @vue/cli 4.5.13    4.5以上的脚手架

​        创建项目 vue create XXXX

​        npm run serve

+ 使用Vite创建：

```
//npm init vite-app vite_study  若要选择ts则”npm init @vitejs/app vite_study已被废弃
npm init vite XXX
cd vite_study
npm install
npm run dev

```

## 3.初始文件

+ main.ts:

```
import { createApp } from 'vue'
//引入createdApp函数，创建对应的应用，产生更多的实例对象
import App from './App.vue'
//APP组件的引入 作为所有组件的父级组件
createApp(App).mount('#app')
//创建App应用,调用mount方法进行挂在 挂在到index.html中名字叫app的div上，最终所有组件产生完毕后再div中渲染
```

+ APP.vue：defineComponent函数最终的返回值是一个对象

```
import { defineComponent } from 'vue';//引入定义组件函数
export default defineComponent({})//使用组件定义函数并暴露
```

## 4.Composition组合 API

###   4.1 初识setup：组合API中第一个要使用的函数

​    新的option，所有的组合API函数都会在此使用，只在初始化时执行依次

函数。

​      setup函数如果返回**对象**，对象中的属性或方法，在模板中可以直接使用

```
setup(){
    const number = 10
    console.log('我是setup');
    return {
      number
      }
  }
```

### 4.2setup和ref的使用

在setup中创建的基本类型变量并不是响应式的数据。

可以通过

```
let count2= ref(0)
```

它返回的是一个Refimp对象count2的类型，需要使用count2.value来对他的值进行更改

而在模板使用时，可以直接使用count2来展示

ref的功能！：用于定义一个**基本类型**的响应式数据

### 4.3 reactive的使用

返回一个Proxy代理对象user，被代理者 是（）内的obj，

user代理对象中有[[handler]]和[[Target]]

```
const user = reactive({
       name:'小甜甜',
       age:20,
       wife:{
         name:'小明',
         age:18,
         cars:['奔驰','宝马','奥迪']
       }

     })
function btnclick(){
      user.age++
      user.wife.cars[0]='三轮车'
    }
```

可以理解为虽然返回的是被代理对象，但实际执行响应操作的是proxy代理对象，因此有user.age++！

**实现了深层次的复杂数据结构的响应式**

### 4.4  setup中对象属性的添加与删除

添加属性：使用proxy对象进行对象属性的操作

```
  setup(){
    //把对象数据编程响应式的数据
    const obj:any={
       name:'小甜甜',
       age:20,
       wife:{
         name:'小明',
         age:18,
         cars:['奔驰','宝马','奥迪']
       }
     }
     const user = reactive(obj)
     console.log(user);
    function btnclick(){
     user.gender='男'   // delete user.age 删除
    }  } 
    return {user,btnclick}//return代理对象
  }
```

### 4.5 响应式的数据的原理

**Vue2**中通过Object.definedProperty的get与set劫持进行响应，对此对象直接新添加的属性和删除的已有属性并不会自动更新界面。

对于数组的的元素更新，需要重写他的一系列更新元素来进行劫持，但对于通过下标替换元素或者更新length，界面也不会更新（因为重写的是数组中的元素）

**Vue3**中通过proxy代理对象的行为，他可是实现把普通对象变为响应式对象，

+ target目标对象 被代理对象

+ handler 处理器 监视方法 get、set、delete、

+ reflect:配合handler中的对象方法，调用它用于将proxy对象中的属性操作变动交给被代理对象

+ **为什么设计Reflect?**

+ reflect解决了获取属性的问题，它较之对象[属性]的写法适应性更好---可以根据调用get中的receiver（get的第三个参数）动态调整其this（将两者形成绑定）==》对应他Reflect的第三个参数，解决了继承元素间私有变量的指定的问题

+ （1）将Object对象的属于语言内部的方法放到Reflect对象上，即从Reflect对象上拿Object对象内部方法。
  （2）将用 老Object方法 报错的情况，改为返回false？？不太明白

  

+ 本质上讲：

+   const result = Reflect.get(target,prop)//将读取对象的属性作为返回代理handler中的get方法

    const result = target[prop]//将读取对象的属性作为返回代理handler中的get方法

  **这两个是一回事儿，但是Reflect方法明显适用性更好，可以在继承上的this指向上做的更好**

```
  const user = {//目标对象
    name:'佐助',
    age:20,
    wife:{
      name:'小樱',
      age:19
    }
  }
  //参数1 目标对象 参数2 handler处理器对象
  const proxyUser = new Proxy(user,{
    get(target,prop){
      console.log('get方法调用了');
      return Reflect.get(target,prop)
    },
    set(target,prop,val){
      console.log('set方法调用了');
      return Reflect.set(target,prop,val)
    },
    deleteProperty(target,prop){
     console.log(`删除了${prop}`);
     return Reflect.deleteProperty(target,prop)
    }
  })
  console.log(proxyUser.name);//不加reflect 并不会使uesr的name属性传递给proxyUser 因为没有通过reflect将数据反射出去
  proxyUser.name='鸣人'
  //通过代理对象更新值
  console.log(user);//在reflect不写的情况下，并不会更新user的属性,实现通过代理对象对目标对象的更新
  //通过代理对象添加属性：
  proxyUser.gender = '男'//直接就可以添加
  console.log(user);
  //删除目标对象上的属性 需要通过Reflect进行实现被代理对象中更新删除
  delete proxyUser.name
  console.log(user);
  delete proxyUser.wife.name//深度的操作！！！！牛批！！！！！！
  console.log(user);

```

### 4.6 setup的执行时机

setup中返回的对象，其属性与方法在html模板中都可以直接使用

+ 在beforeCreated（数据初始化的回调函数，此时组件还没有创建）之前执行，只执行一次。

+ setup执行时，组件实例对象的this还是undefined状态，此时methods、data、computed中的内容并不能调用

+ 所有的composition API也都不可以调用this的data、computed、methods

### 4.7 setup中的返回值

+ 返回值是一个对象，其内部的属性方法，html可以使用

+ setup中对象内部的属性与data函数中reurn属性都可以在html中使用，他们会合并为组件对象的属性 
+ mouted：界面渲染后的生命周期函数
+ setup中对象内部的方法与methods中的方法，他们会合并为组件对象的属性 
+ 在Vue3中 尽量不要混合使用data、setup及setup和methods 推荐使用**setup**
+ 不能把setup作为一个异步执行函数使用asyna

### 4.8 setup的参数

setup（props，context）  setup（props，{attrs，emit，slots}）

+ 参数1：props：他是一个代理Proxy，可以通过它拿到从父组件传过来的属性或方法 （setup执行下中定义如下

```
 console.log(props.msg);
```

props.msg

+ 参数2：
  + context是个对象 可以写成{attrs，emit，slots}

  context具有attrs代理属性（用于获取当前组件标签上的所有属性（并非用v-bind绑定的），该属性未在props中声明）  

​            emit方法 ：用于分发事件 （setup执行下中定义如下）

```
function emitxxx(){
      context.emit('xxx','++')（xxx为分发到父级的事件，++为传递给XXX的参数）
    }
```

​            slots代理属性：

### 4.9 reactive和ref的细节问题

+ ref中也可以传入对象（复杂数据类型），这样的话会将该对象的reactive代理作为ref的value处理，从而可以通过ref.value.属性值进行访问

```
RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
__v_isRef: true
_rawValue: {name: "小明", wife: {…}}
_shallow: false
_value: Proxy
[[Handler]]: Object
[[Target]]: Object
[[IsRevoked]]: false
value: (...)
__proto__: Object
```

+ 无论如何 ref的肯定需要.value进行属性的操作，对于html模板没有这个要求（自动读取value）
+ 深层的复杂数据（对象）也会被代理操作

### 4.8 计算属性与监视

在setup中定义：

+ computed（） 如果括号内之传入一个函数，表示的是get方法，返回的是一个ref对象

```
const fullName=computed(()=>{
      return user.firstName+'_'+user.lastName
    })
```

+ 如果要计算属性达到双向绑定实现，需要用到set方法，computed传入两个函数，用对象进行包装

```
const fullName2=computed({
      get(){
      return user.firstName+'_'+user.lastName
    },
      set(val:string){
      console.log(val);
      user.firstName = val.split('_')[0]
      user.lastName = val.split('_')[1]
    }})
```

+ 使用watch监视指定数据：第一个参数 监控的对象，第二个参数：相关回调方法（参数为监控对象中的内容），第三个参数：立即执行否？深度监听否？{immediate：布尔型，deep：true}

在渲染完网页不会显示，但在相关值有改变的时候才会显示出来，若需立即变化：immediate：true

```
    ////通过计算属性方式 实现第三个名字随着姓、名的变化
    const fullname3 = ref('')
    watch(user,({firstName,lastName})=>{
      fullname3.value = firstName+"_"+lastName
      console.log(fullname3);
    },{immediate:true,deep:true})
```

+ watchEffect:它可以默认立即执行监视一次 ，他的参数只能传一个回调

```
    watchEffect(()=>{
       fullname4.value = user.firstName+"_"+user.lastName
    })
```

+ wath和watchEffect

配合使用实现双向监听：

```
   ////通过计算属性方式 实现第三个名字随着姓、名的变化
    const fullname3 = ref('')
    watch(user,({firstName,lastName})=>{
      fullname3.value = firstName+"_"+lastName
      console.log(fullname3);
    },{immediate:true,deep:true})
    //监视fullname3的数据，改变firstName和lastName：
    watchEffect(()=>{
      user.firstName=fullname3.value.split('_')[0]
      user.lastName=fullname3.value.split('_')[1]
    })
```

+ watch的多数据监听：使用数组包装。但对于没有直接使用ref定义的非相应式数据，需要变更写法为（）=>数据名

```
    //watch可以监视多个数据：但监视非相应式的数据的时候，需要变更为()=>数据
    watch([()=>user.firstName,()=>user.lastName,fullName],()=>{
      console.log('==');
    })
```

### 4.9 生命周期

vue2中的生命周期回调都是属于option，而vue3中属于组合API，

+ 使用setup代替created函数（其实比beforeCreate还早）
+ 这里都是3的！！！！！！！

| 选项式 API                              | Hook inside `setup ` 在setup中定义的 |
| --------------------------------------- | ------------------------------------ |
| `beforeCreate`                          | Not needed*                          |
| `created`                               | Not needed*                          |
| `beforeMount`                           | `onBeforeMount`                      |
| `mounted`                               | `onMounted`                          |
| `beforeUpdate`                          | `onBeforeUpdate`                     |
| `updated`                               | `onUpdated`                          |
| `beforeUnmount(2.0中的beforeDestroyed)` | `onBeforeUnmount`                    |
| `unmounted(2.0中的destroyed)`           | `onUnmounted`                        |
| `errorCaptured`                         | `onErrorCaptured`                    |
| `renderTracked`                         | `onRenderTracked`                    |
| `renderTriggered`                       | `onRenderTriggered`                  |
| `activated`                             | `onActivated`                        |
| `deactivated`                           | `onDeactivated`                      |

通过@click="isShow=!isShow"，可以直接实现**click**的动作

生命周期说明

+ Vue2.X中：

正常刷新：

```
2.x中的beforeCreate
Child.vue?fa93:10 2.x中的created
Child.vue?fa93:13 2.x中的beforeMount
Child.vue?fa93:16 2.x中的Mount
```

更新数据

```
2.x中的beforeUpdate
Child.vue?fa93:22 2.x中的 updated
```

组件删除：

```
2.x中的beforeUnmount
Child.vue?fa93:28 2.x中的unmounted
```

+ Vue3.X中：setup最早执行：新页面：

```
3.0中的setup
Child.vue?fa93:7 2.x中的beforeCreate
Child.vue?fa93:10 2.x中的created
Child.vue?fa93:38 3.0中的onBeforeMount
Child.vue?fa93:13 2.x中的beforeMount
Child.vue?fa93:41 3.0中的onMounted
Child.vue?fa93:16 2.x中的Mount
```

+ 更新数据

```
3.0中的onBeforeUpdate
Child.vue?fa93:19 2.x中的beforeUpdate
Child.vue?fa93:47 3.0中的onUpdated
Child.vue?fa93:22 2.x中的 updated
```

+ 卸载组件

```
3.0中的onBeforeUnmount
Child.vue?fa93:25 2.x中的beforeUnmount
Child.vue?fa93:53 3.0中的onUnmounted
Child.vue?fa93:28 2.x中的unmounted
```

setup中生命周期API执行的优先度明显要高于外部的option调用方法

**3.0中的生命周期调用方式：**（setup函数中）

```
     onBeforeMount(()=>{
       console.log('3.0中的onBeforeMount');
     })
     onMounted(()=>{
       console.log('3.0中的onMounted');
     })
     onBeforeUpdate(()=>{
       console.log('3.0中的onBeforeUpdate');
     })
     onUpdated(()=>{
       console.log('3.0中的onUpdated');
     })
     onBeforeUnmount(()=>{
       console.log('3.0中的onBeforeUnmount');
     })
     onUnmounted(()=>{
       console.log('3.0中的onUnmounted');
     })
```

### 4.10 自定义hook函数

一、它是使用组合API封装的可复用的功能函数，类似于mixin

+ 混用封装函数：

```
import {onMounted, onUnmounted, ref} from 'vue'
export default function(){
  const x = ref(-1)
    const y = ref(-1)
    const clickHandler=function(event:MouseEvent){
       x.value = event.pageX
       y.value = event.pageY
    }
    //页面加载完毕 进行点击操作
    onMounted(()=>{
      window.addEventListener('click',clickHandler)
      })
    //页面卸载之前的生命
    onUnmounted(()=>{
      window.removeEventListener('click',clickHandler)
    })

    return {
      x,y
    }
}
```

+ 函数导出并在setup中使用：注意需要在setup中继续data接受，

这样实现了封装函数的复用调用！

```
import useMousePosition from './hooks/useMousePosition'
*******************
setup(){
    const {x,y}=useMousePosition()
    return {
     x,y
    }
```

+ axios请求应用函数复用以及 **接口的定义和调用问题**：（注意泛型的使用）

请求复用函数的定义：

```
import { ref } from "vue";
import axios from "axios";


//发送AJAX请求 在加载内容的时候显示正在加载中。请求成功了显示内容，请求失败显示错误信息
export default function <T>(url:string){

  const loading = ref(true)
  const data = ref<T|null>(null)
  const errorMsg = ref(false)
  axios.get(url).then(response=>{
    loading.value =false
    data.value = response.data
  }).catch(error=>{
    loading.value = false
    errorMsg.value = error.message || '未知错误'
  })
  return {
    loading,
    data,
    errorMsg
  }
}
```

调用复用函数以及接口（用于约束对象类型）的定义：

```
//定义接口 约束对象的类型
interface IAddressData{
  id:number
  address:string
  distance:string
}
interface IProductData{
  id:string
  title:string
  price:number
}
```

接口的使用：<IProductData[]> 定义一个元素接口固定为IProductData类型的数组！！很巧妙！！

```
    const {x,y}=useMousePosition()
    //使用接口
    // const {loading,data,errorMsg} = useRequests<IAddressData>('/data/address.json')
    const {loading,data,errorMsg} = useRequests<IProductData[]>('/data/product.json')
    watch(data,()=>{
      if(data.value)
      {
      console.log(data.value.length);}
    })
    return {
     x,y,loading,data,errorMsg
    }
  }
```

### 4.11 torefs的使用

它可以将一个响应式对象转换为普通对象，并且该普通对象的每个property都是一个ref

torefs通常搭配reactive使用，将其包裹的对象进行转变

**问题：**

+ 如果要直接使用setup中某对象的属性，可以直接将某对象的解构...obj直接return：

```
 <h2>name:{{name}}</h2>
  <h2>age:{{age}}</h2>
  ***********
  return {...state}
```

该方法并不会将对象的代理的变化同步至自己的属性身上，造成每个property非响应性。

torefs是**解决**办法：

```
  setup(){
    const state = reactive({
      name:'自来也',
      age:47
    })
    //torefs将响应式对象转为普通对象，并且其中的每个property(state2.age)都是一个ref
    const {name,age} = toRefs(state)
    //定时器 更新数据
    setTimeout(() => {
      // state.age+=1
      age.value+=1
    }, 5000);
    return {
      // ...state
      name,age
      }
  }
```

使用场所：

**hook**调用函数的返回对象，写成对象会造成提取属性不方便、写作对象的属性解构又会造成属性是非响应式的。这个时候torefs封装就可以很好的去解决这个问题，通过返回...torefs（state）,并且在引用的时候直接用{name,age}去进行取值引用，此时name,age也是ref响应式的，可以直接暴露出去引用

### 4.12 ref的另一个作用

利用ref获取组件中的标签元素： 自动获取焦点  注意需要return出去

```
<template>
  <h2>ref的另一个作用：可以获取页面中的元素</h2>
  <input type="text" ref="inputRef">
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
export default defineComponent({
  //需求 当页面加载完毕，页面中的文本框可以自动获取焦点
  name:'App',
  setup(){
    const inputRef = ref<HTMLElement | null>(null)//运行setup时肯定还没有ref
    onMounted(()=>{
      inputRef.value?.focus()//自动focus
    })
    return {
      // inputRef
    }
  }
})
</script>
```

## 5.Composition的其他API

### 5.1 ShallowReactive与ShallowRef

+ ShallowReactive对对象的第一层有响应，再向下无响应属性，**适用范围：只在外层属性需要响应式的时候**

+ ShallowRef对象从最外层就不会发生响应，他不会对对象进行reactive处理，从而属性不具备响应性，适用范围？：**整个对象直接替换，而不是需要仅仅进行属性的响应**

```
  const update=()=>{
    //更改m1 reactive
    // m1.name+="****"//可以响应
    // m1.car.name+="****"//可以
    //更改m2 shallowReactive
    //  m2.name+="****"//可以
    // m2.car.name+="****"//不可以（m2.name+="****"必须关闭更新才行）
    //更改m3 ref 做过代理操作 可以响应深层
      // m3.value.name+="****"//可以响应
      // m3.value.car.name+="****"//可以响应
    //更改m4 shallowRef
    m4.value.name+="*********"//不可以
    m4.value.car.name+="*********"//不可以
    console.log(m3,m4);

  }
```

```
m3：RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}__v_isRef: true_rawValue: {name: "鸣人", age: 20, car: {…}}_shallow: false_value: Proxy {name: "鸣人", age: 20, car: {…}}value: (...)__proto__: Object m4：RefImpl {_rawValue: {…}, _shallow: true, __v_isRef: true, _value: {…}}__v_isRef: true_rawValue: {name: "鸣人*********", age: 20, car: {…}}_shallow: true_value: {name: "鸣人*********", age: 20, car: {…}}value: (...)__proto__: Object
```

### 5.2.Shallowreadonly和readonly

shallowreadonly属性是不可以更改的，但是内层可以进行更改

readonly是深度只读，从外到内都不可以更改

```

 //const state2 = readonly(state)
 const state2 = shallowReadonly(state)
    const update=()=>{
      // state2.age+=1//readonly下不可以更改  shallowReadonly下不可以更改
      state2.cars.name+=1//readonly下 内层也不可以更改 shallowReadonly下深层可以更改

    }
```

+ 对于Ref包装而言，readonly从浅到深层都不能够进行更改

+ 而对于shallowReadonly包装而言从浅层就可以进行更改，这点和响应的shallowref比较一致

###  5.3 toRaw与 markRaw

+ 用 toRaw进行包装后，state数据会跟随user一起变化，但他不会在界面进行响应
+ 这只是通过toRaw进行内部更新state数据，如果直接更新state的话，还是会在界面进行响应

```
   const testToRaw=()=>{
      const user = toRaw(state)//把代理对象变为普通对象
      user.name+="*****"
      // state.name+="@@@@"
      console.log(user);
      console.log(state);
    }
```

markRaw：

被其标记的对象数据，之后都不能再成为代理对象了，而且没有响应行为

```
     state.likes = markRaw(likes)
       setInterval(()=>{
         if(state.likes)
         {state.likes[0]+="+++"
          console.log('定时器运行了');
         }
       },1000)//likes并不会响应
```

### 5.4 toref的使用

+ ref是拷贝了一份原来的对象，其变化不会影响原来的对象

```
 //使用ref进行包装某个属性
    const money = ref(state.money)
    // money.value+=3//state.age不跟随变化  ===》这种情况 如果在父子传递中，子组件的继承属性=》相当于父组件传过来的属性.value如果发生了变法，那么将对父级不会产生任何影响
    
```

使用toref包装对象中的属性为一个ref对象，

+ 为什么要使用toref：通过toref对父传给子组件的 数据进行一个包装，使其也具有响应的属性，但子组件中hook函数需要的对象是Ref类型的,（hook中是computed动态计算函数），这个时候就需要将继承props中的响应属性拿出来变成Ref类型

使用方法：toref（属性所属对象，‘属性名’）

```
const length = useGetLength(toRef(props,'age'))这里已经传递过来
```

子组件引入的hook函数

```
function useGetLength(age:Ref){
  return computed(()=>{
    return age.value.toString().length
  })
}
```

setup中使用toref：（**注意需要将prop作为参数才可以使用**）

```
  setup(props){
    const length = useGetLength(toRef(props,'age'))
   return {
     length
   }
  }
```

+ 解决了什么？解决了父传子默认传.value，而需要进行hook函数操作的参数需要是个Ref类型的数据,

通过它实现了转换。

### 5.5 customRef的使用

应用：输入防抖效果

通过customRef可以自定义一个响应的数据类型(CustomRefImpl)，return 一个get和set的设定对象，在get与set的回调中可以对于他响应的track（追踪数据）、和trigger（更新界面）进行绑定函数，从而实现多样化的响应实现：

案例：

```
 function useDebounceRef<T>(value:T,delay=200){
  let timeOutId:number
 return customRef((track,trigger)=>{//*********************
    return {
      get(){
        //告诉Vue追踪数据
        track()
        return value
      },
      set(newValue:T){
        //设置开启定时器防抖
        //清理定时器
        clearTimeout(timeOutId)
        //开启定时器
        timeOutId=setTimeout(()=>{
          value = newValue
          //告诉Vue更新界面
          trigger()
        },delay)
      }
    }
  })
  }
  ************
  const keyword = useDebounceRef('abc',500)
```

### 5.6 provide和inject

原本的向下传递是以逐层传输的方式，对于组件层级差较深的环境适应性非常差。

传递方向：自上至下传递、、不可以反过来 只能实现属性的传递，方法不可以??keyide 

Vue3提供了这两个跨组件的方式：

案例：爷孙间 的通讯：

爷爷的setup中提供：

```
const color = ref('red')
provide('color',color)
```

孙子setup中接收：

```
const color=inject('color')
```

### 5.7 响应式数据的判断

```
    console.log(isRef(ref({})));//判断是否为ref对象
    console.log(isReactive(reactive({})));//判断是否为reactive对象
    console.log(isReadonly(readonly({})));//判断是否为readonly对象
    console.log(isProxy(readonly({})));//判断是否为proxy对象
    console.log(isProxy(reactive({})));//判断是否为proxy对象
```

## 6.手写组合API

### 6.1实现shallowreactive和reactive

reactive都是将对象处理返回一个代理对象，什么是代理对象：

```
Proxy {name: "小明", car: Proxy}
[[Handler]]: Object
deleteProperty: ƒ deleteProperty(target,prop)
get: ƒ get(target,prop)
set: ƒ set(target,prop,value)
__proto__: Object
[[Target]]: Object
car: Proxy {}
name: "小明"
__proto__: Object
[[IsRevoked]]: false//吊销
```

怎么定义代理对象：target即是经过筛选后的数组或者对象，而用reactiveHandler回调函数用来对handler中的set get deleteProperty进行定义：

```
return new Proxy(target,reactiveHandler)
```

通过Reflect.get(target,prop)讲handler的返回，**调用它用于将proxy对象中的属性操作变动交给被代理对象**

```
const reactiveHandler={
  //获取属性值
  get(target,prop){
    const result = Reflect.get(target,prop)
    console.log('拦截了读取数据',prop,result);
    return result
  },
  set(target,prop,value){
    const result = Reflect.set(target,prop,value)
    console.log('拦截了修改数据或者是添加属性',prop,value);
    return result
  },
  deleteProperty(target,prop){
    const result = Reflect.deleteProperty(target,prop)
    console.log('拦截了删除数据',prop);
    return result
  }
}
```

### 6.2实现shallowreadonly和readonly

手写函数定义：

```
//定义设置为readonly的代理处理对象
const readonlyHandler = {
  get(target,prop){
    const result = Reflect.get(target,prop)
    console.log('拦截到了读取数据了',prop,result);
    return result
  },
  set(){
    console.warn('只能读取数据');
    return true
  },
  deleteProperty(){
   console.log('只能读取不能删除数据');
   return true
  }
}

//定义一个shallowReadonly
function shallowReadonly (target){
  if(target&&typeof target ==='object'){
    return new Proxy(target,readonlyHandler)
  }
  return target
}


//定义一个Readonly函数
function readonly (target){
  if(target&&typeof target ==='object'){
    if (Array.isArray(target)){
       target.forEach((item,index)=>{
         target[index]=readonly(item)
       })
    }
    else{
      Object.keys(target).forEach(key=>{
        target[key] = readonly(target[key])
      })
    }
    return new Proxy(target,readonlyHandler)
  }

  //如果不是对象或数组，直接返回

  return target
}
```

运行结果

```
//测试浅readonly
const proxyUser3 = shallowReadonly({
  name:'小明',
  cars:['奔驰','宝马']
})
proxyUser3.name = '小红'//不能修改
proxyUser3.cars[0] = '小红'//可以完成深层修改 被修改了
delete proxyUser3.name//不能 删除
delete proxyUser3.cars[0]//深层被删除了
// 测试readonly
console.log('***********测试readonly************');
const proxyUser4 = readonly({
  name:'小明',
  cars:['奔驰','宝马']
})
proxyUser4.name = '小红'//不可以修改
proxyUser4.cars[0] = '小红'//深层不能修改
delete proxyUser4.name//不能 删除
delete proxyUser4.cars[0]//深层也不能删除了
```

### 6.3.实现shallowref和ref

```
// 定义一个shallowRef
function shallowRef(target){
  // target = reactive(target)
  return {
  _value:target,//ref是用value读取其值
  get value(){
    console.log('劫持到了读取数据');
    return this._value
  },
  set value(val){
    console.log('劫持到了修改数据，准备更新界面',val);
    this._value = val
  }
}
}
```

```
// 定义一个Ref
function ref(target){
  target = reactive(target)
  return {
  _is_ref:true,//给他一个属性is——ref为默认true
  _value:target,//ref适用value读取其值
  get value(){
    console.log('劫持到了读取数据');
    return this._value
  },
  set value(val){
    console.log('劫持到了修改数据，准备更新界面',val);
    this._value = val
  }
}
}
```

运行结果：

```
// 测试shallowref
console.log('***********测试shallowref************');
const ref1 = shallowRef({
  name:'小明',
  cars:{
    color:'red'
  }
})
// console.log(ref1.value);//劫持到了读取数据
// ref1.value = '==='//劫持到了修改数据，准备更新界面 ===

ref1.value.car='=='//劫持不到修改数据

console.log('***********测试ref************');
const ref2 = ref({
  name:'小明',
  cars:{
    color:'red'
  }
})
// console.log(ref1.value);//劫持到了读取数据
// ref1.value = '==='//劫持到了修改数据，准备更新界面 ===

ref2.value.car='=='//劫持到了修改数据
```

### 6.4  实现isref isreactive isproxy isreadonly函数

```

//isref定义
function isRef(obj){
  return obj &&obj._is_ref//给他一个属性is——ref为默认true
}
//isReactive定义
function isReactive(obj){
  return obj &&obj._is_reactive//在Reactive处理器属性中get这个is——reactiv属性时，返回为默认true
}

//isReadonly定义
function isReadonly(obj){
  return obj &&obj._is_readonly//在Readonly处理器属性中get这个_is_readonly属性时，返回为默认true
}

//isproxy定义
function isProxy(obj){
  return isReactive(obj)|| isReadonly(obj) //要么isReactive 要么isReadonly
}
逻辑为给目标对象设置一个属性_is_ref,然后在其ref的return或handler（reactive、readonly）的get属性中，设置这个属性为true（return中）或者判断其读取的prop为该属性时（handler中），返回true，将obj._is_ref这个值默认为true
```

## 7.fragment和teleport组件

vue2中组件模板必须要写根标签，而vue3中是通过fragment虚拟元素内部将多个标签包含在一起。有利于减少标签层级。

teleport 将其内部的组件脱离父组件，到to指定的标签下显示（body），**可用于弹窗脱离出父元素显示**

```
  <teleport to='body'>
      <div v-if="modalOpen">
    <div>
      这是对话框
    </div>
    <button @click="modalOpen=false">关闭这个对话框</button>
  </div>
  </teleport>
```

## 8.suspense组件

**异步组件过渡期间的显示组件**：

```
//异步引入组件、动态的引入方式：
//Vue2的方式:在vuerouter中仍可以这样使用
// const AsyncComponent = ()=>import ('./components/AsyncComponent.vue')//当前vue3不支持 不会显示子组件
//Vue3的方式: 对于vuerouter不可以使用
const AsyncComponent = defineAsyncComponent(()=>import ('./components/AsyncComponent.vue'))//vue3写法
```

用法：将异步加载或者setup中return为异步的组件包在其第一个template中 并设置#default属性，

将延迟过渡期间显示的内容放在第二个template中，并且设置v-slot：fallback

```
<Suspense>
    <template #default>
      <AsyncComponent/>
    </template>
    <template v-slot:callback>
      <h2>loading...</h2>
    </template>
<Suspense>
```

setup中异步的实现：

```
1.promise方式：
  setup(){

   return new Promise((res)=>{
     setTimeout(()=>{
       res({msg:'你在干啥呢'})
     },2000)
   })
  }
2.axios
setup(){
    return axios.get('/data/address.json').then(res=>{
      return {
        data:res.data
      }
    })
  }
3.async
  async setup(){
    const result = await axios.get('/data/address.json')
    return {
      data:result.data
    }
  }
```

## 9.todolist案例

### 9.1静态网页模板进行组件化开发的思路：

1.将获取到的静态网页，样式引入，分析其层级结构

2.将html页面根据其结构分析拆分组件大类，css样式公共样式拆分至index.html引用，大类中再进行拆分，依次向下分析其详细结构

3.css中 public中新建css文件夹，将html要用的样式部分存为bass.css,index.html引入该css

4.在src component文件下创建组件类（大类小类可依据实际情况看要不要在进行文件夹分层）

5.把index中的静态代码先放到app的模板当中，按结构拆分到各个组件中 有重复结构的item仅需要一项组件放到子组件中

6.引入直接的子组件并注册，子组件引入下级分类组件

7.样式表拆分分组件放入对应组件样式中

### 9.2 列表中不固定的数据展示以及接口约束

1.数据采用数组的方式存储，数组的元素可以是对象{选中状态： 内容： id： }

2.根据数据的使用范围，确定相应数据的定义位置

3.子组件引用返回的reactive对象中数组，写起来麻烦，可考虑return 解构该对象，然后可以直接使用该对象内部的key

4.vue 3中对用户数据的约束（双向绑定的约束）：采用接口约束的方式

```
interface Todo{
  id：number，
  title：string，
  isComplated：boolean
}
泛型约束数组：todos  //Todo[]代表每个元素的接口类型是id：number，title：string，isComplated：boolean
<{todos：Todo[]}>({todos:[{id： title： isComplated}，{}，{}]})
```

接口一般作为公共文件放在src下面的types文件夹下面存为 接口名.ts，并且export interface暴露出去，组件中引入import {接口名} from 

5.数据进行层层传递 prop，后代中可以指定为符合接口类型的对象

```
props：{
todo：Object as （）=> Todo//这是说明object key接口的方式
}
```

### 9.3 数据添加与传递

对数据进行增加的方法可以定义在数据所在的setup中，方便引用，然后如果在其他组件中使用，将其方法return 并传出去，在使用的组件中进行props接收：

```
props:{
addTodo:{
type:Function,
required:true
}
}
```

在引用该方法的组件setup中定义激活函数，激活函数在setup中定义：拿到该组件获得的数据并且进行构建为符合条件的对象，然后调用props中的引用的方法将该数据进行处理，加进去之后 在清空文本框：使.value=''

**子组件调用父组件的方法对父组件的数据进行更新**

### 9.4  鼠标移入高亮显示

mouseenter mouseleave

对于两种相反状态的事件，可以为其事件共同定义一个相同的函数，分别传入true和false，然后再函数中进行if else分别处理

样式状态能定义就定义，别用css，那太low

### 9.5  点击按钮删除数据

用inject？使用传递方法并在子组件中调用的方式

提醒功能

```
if（window.confirm('确定要删除吗')）
```

### 9.6 选中与不选中：

利用计算属性完成

### 9.7  全选与全不选

注意props的类型接口约束和required：true

将 选中的数量记为count，使用计算属性定义

```
const count = computed(()=>{
return props.todos.reduce(()=>{return 条件判断})
})
```

将全选全不选作为另一个计算属性操作，分别设置get 通过实际的选中状态和长度对比进行判断。

set可以通过引用父组件中的统计data的选中状态的方法来进行性更新

### 9.8 清空选中

将所有选中状态为true的更改为false

### 9.9 缓存数据 刷新数据不恢复

```
将读缓存 取缓存的操作放在src/utils下的localStorageUtils.ts 里：

import{Todo} 
export function saveTodo（todos：Todo[]）{
localStorage.setItem('todos_keys',JSON.stringify(todos))
}
export function readTodos():Todo[]{
return JSON.parse(localStorage.getItem('todos_key')||'[]')
}
```

引入该ts文件,

保存至浏览器的缓存中：

通过watch(()=>state.todos,saveTodo,deep=true) 数组

在mouted中直接运行read的函数读取localStorage的数据



## Final 面试题简述

Vue2和Vue3相比而言的面试题：

1.2020年9月正式版

2.大多数Vue2的特性

3.设计了一套强大的组合API代替了Option，提高了复用性，解决了option代码过于分散的问题

4.更好的TS支持

**5.最主要：**

**Vue3中使用了Proxy配合reflect代替了Vue2.0中object.defineProperty()方法实现了数据的响应式（数据代理）**，代理解决绑定问题（实现数据操作上的代理），reflect解决了获取属性的问题，它较之对象[属性]的写法适应性更好---可以根据调用get中的receiver（get的第三个参数）动态调整其this（将两者形成绑定）==》对应他Reflect的第三个参数，解决了继承元素间私有变量的指定的问题

https://blog.csdn.net/qq_34629352/article/details/114210386

6.重写了虚拟DOM、速度更快乐

7.新的组件：Fragment(片段)/Teleport（瞬移）/Suspense（不确定，异步组件空白期的代号）

8.新的脚手架工具 vite

## 10.精读文档扩充

### 1.ref的使用，通过:ref绑定函数，函数的参数就是该对象元素

```
标签中:ref="setItemRef"
    let itemRef = ref([])
    const setItemRef = (item)=>{
      itemRef.value.push(item)
    }
对于v-for 也可以使用这种方法进行遍历获取所有元素
```

### 2.带选项的异步组件写法

```
// 带选项的异步组件
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

new Promise写法

```
// 2.x 版本
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// 3.x 版本
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

一个简单的延迟加载的实例：

```
const AsyncComponent = defineAsyncComponent(()=>new Promise<any>((resolve, reject) => {
  setTimeout(()=>resolve(import ('./components/AsyncComponent.vue')),5000)
}))
```

### 3.$attrs包含 class style，fragment存在使得需要在子组件中显示定义v-bind="$attrs"

```
 <AsyncComponent name="hahah" id="hehehe" class="wuwuwuw" v-bind="$attrs"/> 父组件中
 如果inheritAttrs: false不设置，则默认给根元素，没有根，则不会传递
 子组件中：
 <template>
  <h2>我是一个异步组件</h2>
  <h2 v-bind="$attrs">我是一个异步组件</h2>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
  name:'AsyncComponent',
  inheritAttrs: false,
```

### 4.自定义指令

```
相关钩子有：
  created(el, binding, vnode, prevVnode) {}, // 新增
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // 新增
  updated() {},
  beforeUnmount() {}, // 新增
  unmounted() {}
}
使用直接v-highlight = "'yellow'"就好了
createApp(App)
.directive('highlight',{beforeUpdate(el,binding,vnode){el.style.background = binding.value}})
.mount('#app')
```

### 5.过滤器

vue2的过滤器已经被删除，可以使用计算属性进行替代

```
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
```

### 6.vue2 vue3的use

从技术上讲，Vue 2 没有“app”的概念，我们定义的应用只是通过 `new Vue()` 创建的根 Vue 实例。从同一个 Vue 构造函数**创建的每个根实例共享相同的全局配置**

大概可以看一下vue2中的router使用，可以在任意地方进行Vue.use, 确实有点混乱

**vue3**中统一使用app.use进行配置

```
createApp(App).use(router).use(store).mount('#app')
```

全局provide的写法：

```
createApp(App)
.provide('guide', 'Vue 3 Guide')
```

组件接收注入

```
  两种接收方式：
  inject:{
    injection2:{
      from:'guide'
    }
  },
  setup(){
    const injection1=ref(inject('guide'))
    return {injection1}
  }
```

### 7.在应用之间共享配置

在应用之间共享配置 (如组件或指令) 的一种方法是创建工厂函数，如下所示：

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)
  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

现在，`Foo` 和 `Bar` 实例及其后代中都可以使用 `focus` 指令。

### 8.nextTick（）

什么是Vue.nextTick()？？


定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

所以就衍生出了这个获取更新后的DOM的Vue方法。所以放在Vue.nextTick()回调函数中的执行的应该是会对DOM进行操作的 js代码；

理解：nextTick()，是将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数。

### 9.按键修饰

使用短横线写法page-down，keycode被弃用 

```
<!-- Vue 3 在 v-on 上使用 按键修饰符 -->
<input v-on:keyup.page-down="nextPage">

<!-- 同时匹配 q 和 Q -->
<input v-on:keypress.q="quit">```
```

### 10.可以通过attrs将事件绑定传入组件内部的标签内

废除vue2的$listeners写法

### 11.render 

一个单标签的render，可以直接通过export default {}作为渲染的实例

而不必通过defineComponent进行一步包装组件化

```
  setup(){
    const injection1=ref(inject('guide'))
    const count = ref(1)
    const increment = ()=> {count.value+=1}
    // return {injection1}
    return ()=>h('div',{onClick:increment},count.value)
  }
```

h函数的第二参数扁平化：

```js
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

### 12 suspense

```
  <suspense>
    <template #default>
        <AsyncComponent name="hahah" id="hehehe" class="wuwuwuw" v-bind="$attrs" @click="clickOne"/>  
    </template>
    <template #fallback>
      <div>loading...</div>
      </template>
  </suspense>
```

### 13.v-model



多定义：

```js
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

多绑定：

```
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 是以下的简写： -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### 14.v-bind = "{}"

定义属性依据谁最后定义来确定

```
v-bind="{id:'blue',name:'red'}"绑定属性，可以
```

### 15.组件的生命周期事件绑定

```html
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

## 11.Vue3.2版本新特性

emit prop  如果在setup中不使用这些，则可以不写接收的变量

```
  // const emit =defineEmits({update(payload:number){return true}})
  
  const emit =defineEmits<{(e:'update',payload:number):void}>()
  
  
  // const prop = defineProps({count:{type:Number}})

  const props = defineProps<{count:number}>()

//   const props = withDefaults(defineProps<{count:number}>(), {
//   count:100
// })
```

expose也可以向父元素暴露，通过在子组件上ref的形式当成相应的属性值去获得即可：

```
  定义：
  defineExpose({count2})
  const box1Color = ref('red')
  const box2Color = 'yellow'
  const theme = {
    border:'blue',
    background:'green'
  }
```

```
获取：可以通过父组件的onmounted内直接调用子组件的方法，或者通过父组件的交互动作实现调用
const hellovue = ref(null)
onMounted(()=>{
  (hellovue.value as any).count2()
})
const clickToSee = ()=>{
  (hellovue.value as any).count2()
}
```

