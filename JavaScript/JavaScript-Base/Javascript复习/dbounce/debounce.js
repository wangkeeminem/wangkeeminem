function debounce(func, delay=300) {
  let timer = null
  console.log('debounce')
  return function (...args) {
    console.log('回调执行了')
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
function debounce1(func, delay=300) {
  return (...args)=>{
    console.log(args)
  }
}
