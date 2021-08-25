stylus

## 1.stylus特点

+ 可以没有冒号 分号 括号 大括号 横向以空格作为区隔 
+ 选择器的逗号（多元素选择）以换行作为区隔，以最后一行的定义生效
+ 可以使用嵌套写法 以缩进单位作为层级关系的抽象，当然也可以使用空格呈现嵌套父子关系
+ 伪类使用&:连接 &::连接

+ 可以使用构造函数写法，将多个属性合成到一个构造类中，通过参数按需定义，使用参数的方法为arguments[0]

+ 可以定义一个变量 在其他属性中使用该变量，还可以用@引用自家变量

+ ```stylus
   button6
  
   width: w=200px
  
   height: 0.5*w
   或者
     width: 200px
    margin-left: -(@width / 2)
  ```

+ 隐式定义属性的方法

```
pos(type,args)
  position: unquote(type)
  i = 0
  {args[i]}:args[i+1] is a 'unit'?args[i+=1]:0//i+=1跳至当前指定的属性值处
  {args[i+=1]}:args[i+1] is a 'unit'?args[i+=1]:0//下一个属性值对应的下一个参数是否为unit，是则加入，否则默认为0
  {args[i+=1]}:args[i+1] is a 'unit'?args[i+=1]:0//下一个属性值对应的下一个参数是否为unit，是则加入，否则默认为0
```

args有几个 就写几行，但是在定义的时候一个都不能少

+ 属性为枚举的变量写法 注意for下面需要缩进 使用{}进行变量的引用

```
ul
  for row in 1 2 3 4 5
    li:nth-child({row})
      height: 10px*row
      background: red
      border: solid 2px black
```

+ 可以用来作为适配性的写法

```
//设备适配性写法
vendors = webkit moz o ms official
border-radius()
  for vendor in vendors
    if vendor == official
      border-radius: arguments;
    else
      -{vendor}-border-radius: arguments;
#content
  border-radius 5px
 等同于
 #content {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;
}
```

+ 各种运算符：

```
+ 
**幂运算 
像素计算 
!!''非运算为false  
and or 
1..5表示[1,5] 
1...5表示[1,5） 
'foo' is a 'string'类型判断
==全等
(()())外边大括号相当数组的中括号 可以通过[i]取得元素
el in （1，2，3，4） 判断是否在里面
2s-500ms 时间的计算
```

```
body
  foo:foo+bar
  foo:'foo'+bar
  foo:'foo'+'bar'
  foo:'foo'+5px
  foo:2s - 500ms
  foo:5000ms ==5s
  foo:50deg
对应css
body {
  foo: foobar;
  foo: 'foobar';
  foo: 'foobar';
  foo: 'foo5px';
  foo: 1.5s;
  foo: true;
  foo: 50deg;
}

```

+ unquote用来解决无法处理了的属性值 在参数引用时 作为一种保险？

```
foo: unquote('MS:WeirdStuff(opacity=1)') 
将转变为
foo: MS:WeirdStuff(opacity=1);
```

+ 占位符的使用

```
  foo:'%s/%s' %(5px 10px) 多占位使用%（args）
  foo:'MS:WeirdStuff(opacity=%s)' % 1 单占位
```

+ **颜色的计算**

```
background-color: red - 50%  减表示减少亮度 加表示增加亮度
 border:rgba(black,0.2) 10px solid 使用rgba函数定义基础颜色 和透明度
  color: yellow - red =》green  颜色做差
```

+ 函数表达式使用 参数可以使用num...这种形式表示未知长度的参数,函数中可以使用默认参数 比如a=10这种

```
sum(nums...)
  n = 0
  n+=num for num in nums

body
  foo:sum(1,2,3)
  
当然还有内置函数，但使用方法为sum(1 2 3)
```

+ 返回颜色分量和透明度

```
body
  foo red(#fc0)
  foo green(#fc0)
  foo blue(#fc0)
  foo alpha(#fff)
  foo alpha(rgba(#fff,0.4))
```

+ 颜色的变暗 darken(blue,50%) 与-50%效果一样  lighten（）变亮  还可以用dark与light来判断当前是属于亮还是暗（白=》黑）

+ 媒体查询也可以嵌套，它们将被展开并包裹住使用它们的上下文。例如：

```
.widget
  padding 10px
  
  @media screen and (min-width: 600px)
    padding 20px
```

```
@media (max-width: 500px)
  .foo
    color: #000

  @media (min-width: 100px), (min-height: 200px)
    .foo
      color: #100
      
 将被视为
 @media (max-width: 500px) {
  .foo {
    color: #000;
  }
}
@media (max-width: 500px) and (min-width: 100px), (max-width: 500px) and (min-height: 200px) {
  .foo {
    color: #100;
  }
}
```

重申一下media的写法 之前写的还是有点麻烦的

```
stylus
@media screen and (max-width:500px)
    body
      background-color:blue
      
@media screen and (max-width: 500px) {
  body {
    background-color: #00f;
  }
}
```

