# 2021/08/11

script setup带来的变化

- 不用定义setup return

- 状态量直接暴露给模版

- ref变量直接已展开形式在模版中（没变） 可以直接用@click=count++实现

- 引用组件直接写在script setup中

- 双峰式组件名写法是被推荐的 用来轻易区分原生组件

- 动态组件的实现

```HTML
<component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" /
```


- 可为组件设置别名

```JavaScript
import { FooBar as FooBarChild } from './components'
```


- 模版中使用自己的组件名实现递归、如重名，优先度不及引入模版

- 使用import * as sth from  然后通过sth.xxx的方式引入多组件文件的子组件

- props emit适配ts写法：

```JavaScript
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```


目前不支持外部的type引入？本文件内的可以？默认值的定义：

```JavaScript
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})

```


- expose的使用（对父组件暴露属性）

```JavaScript
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```


- 在普通script中定义一些option，如默认属性、自定义说明、导出name等

```JavaScript
<script>
// normal <script>, executed in module scope (only once)
runSideEffectOnce()

// declare additional options
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// executed in setup() scope (for each instance)
</script>
```


- await可以直接在setup中使用，setup将自动作为异步setup（），并且await等待后保留当前组件实例上下文

```JavaScript
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>

```


- 使用suspense仍然需要按照async setup进行定义

- CSS样式绑定：

```JavaScript
<script setup>

import { ref } from 'vue'

const color = ref('red')

</script>

<template>

  <button @click="color = color === 'red' ? 'green' : 'red'">

    Color is: {{ color }}

  </button>

</template>

<style scoped>

button {

  color: v-bind(color);

}

</style>
```


对于静态属性的的绑定：可能需要使用""进行包装

```JavaScript
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

