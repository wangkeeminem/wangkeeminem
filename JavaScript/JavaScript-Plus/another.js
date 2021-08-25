function fib(n){
    return n<=2?1:fib(n-1)+fib(n-2)
}
var onmessage=function(event){
    console.log('分线程已接收主线程数据')
    var number=event.data
    var result=fib(number)
    postMessage(result)
    console.log("分线程已发送返回结果")
}