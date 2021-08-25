
var i=1;
function mymove(obj){
   
    obj.onclick=function(){
    var offset;
    var dir; 
    var sty;        
if (i%2)
   { switch(obj){case btn01:offset='offsetLeft';dir=1;sty='left';break;
   case btn02:offset='offsetLeft';dir=-1;sty='left';break;
   case btn03:offset='offsetTop';dir=-1;sty='top';break;
   case btn04:offset='offsetTop';dir=1;sty='top';break;
}
       
   obj.innerHTML='停止';
   clearInterval(obj.timer)
   obj.timer=setInterval(function(){
   box1.style[sty]=box1[offset]+10*dir+'px';
   },30);console.log(obj.timer);
}
   else{
   switch(obj){case btn01:obj.innerHTML='👉';
    clearInterval(obj.timer);           
    console.log(obj.timer);break;
    case btn02:obj.innerHTML='👈';
    clearInterval(obj.timer);           
    console.log(obj.timer);break; 
    case btn03:obj.innerHTML='👆';
    clearInterval(obj.timer);           
    console.log(obj.timer);break;
    case btn04:obj.innerHTML='👇';
    clearInterval(obj.timer);           
    console.log(obj.timer);break;
}

}
   i+=1;}
}