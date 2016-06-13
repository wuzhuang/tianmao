// 兼容性的通过类名获取元素
function checkClass1(className)
		{
			if(document.getElementsByClassName)
			{
				return document.getElementsByClassName(className)
			}
			else
			{
				var all=document.getElementsByTagName("*")
				var newarr=[]
				for (var i = 0; i < all.length; i++) {
					if(all[i].className==className)
					{
						newarr.push(all[i])
					}
				}
				return newarr
			}
			
		}



// 兼容性的通过类名获取元素
		// 如果标签的className内部只是包含我们需要的关键词：
		// 		例如需要找classname=like  
		// 		但是有的标签的classname=like one
		// 		这个时候需要继续精细筛选，就需要再写一个判断方法
function getClass2(selectName)
	{
		if(document.getElementsByClassName)
		{
			return document.getElementsByClassName(selectName)
		}
		else
		{
			var all=document.getElementsByTagName("*")
			var newarr=[]
			for (var i = 0; i < all.length; i++) {
				// 应用下面的判断是否包含关键词
				if(checkClassName(selectName,all[i].className))
				{
					newarr.push(all[i])
				}
			}
			return newarr
		}
		
	}


// 完善后的通过类名获取元素
// 通过后代获取元素也想使用这种方法的话，需要再接受一个参数，接受可能收到的父元素
function getClass(selectName,obj)
	{
		// 如果有传入父级元素，则使用后代获取元素，如果没传入则默认eleobj为document，也不影响运行
		var obj=obj||document
		if(obj.getElementsByClassName)
		{
			return obj.getElementsByClassName(selectName)
		}
		else
		{
			var all=obj.getElementsByTagName("*")
			var newarr=[]
			for (var i = 0; i < all.length; i++) {
				// 应用下面的判断是否包含关键词
				if(checkClassName(selectName,all[i].className))
				{
					newarr.push(all[i])
				}
			}
			return newarr
		}
		
	}

// 定义一个判断all[i].className中是否包含selectName的函数
	// 接受两个参数，一个是selectName-------str
	// 另一个是all[i].classname------lstr
function checkClassName(str,Lstr)
	{
			// 如果类名是两个字符串组合起来的，那肯定是由空格分开，所以先把字符串转化成数组，通过空格转换，用字符串的split方法
			var arr=Lstr.split(" ")
			// 对转化成数组的类名进行循环，判断arr[i]是否有等于str的，如果有，说明包含，如果没有，说明不是需要找的关键词
			for (var i = 0; i < arr.length; i++) {
				if(arr[i]==str)
				{
					return true
				}
			}
			return false
	}





// 兼容性的获取修改文本内容
// 获取两个参数，一个是元素名，一个是需要修改的内容
function getText(element,content)
	{
		// 判断是否需要修改，如果需要修改，content不等于undefined，如果不需要，content==undefined
		if(content==undefined)
			{
				// 如果支持context，返回获取方法
				if(element.textContent)
				{
					return element.textContent
				}
				// 如果不支持context，返回innerText获取方法
				else
				{
					return element.innerText
				}
			}
		else
			// 如果需要修改，判断支持那种获取，修改方式，然后进行赋值
			{
				if(element.textContent)
					element.textContent=content
				else
					element.innerText=content
			}
	}
	


// 兼容性的获取对象的实际样式属性
// 接收两个参数，一个是对象，一个是要获取的属性名stylename在传值时候要加引号
function getStyle(element,stylename)
	{
		// 判断是否支持IE中的currentStyle方法，如果支持，返回方法
		if(element.currentStyle)
			// return element.currentStyle.stylename是错误的，如果这个写相当于return element.currentStyle."stylename",是查不到的，所以用访问对象属性的另一种方法：对象["属性名"]
			return element.currentStyle[stylename]
		// 反之，返回现代浏览器的 getComputedStyle方法
		else
			return window.getComputedStyle(element,null)[stylename]
	}





// 通过多种方式获取元素
	// 接受一个参数，就是标签名，或者类名，或者id
	// 标签名为一个字符串："div"
	// 类名为.开头的字符串：".one"
	// id为#开头的字符串："#name"
	// 所以要先判断这个字符串的第一个字符是什么
	// 用字符串的charAt方法获取字符串的第一个字符charAt(0)
function $1(selector)
	{
		// 如果传入的字符串前面有空格，用正则可以用空字符串替换掉
		// selector=selector.replace(/^\s*|\s*$/g,"")



		// 判断第一个字符是不是.如果是说明为类名查询
		if(selector.charAt(0)==".")
			{
				// 如果是类名查询，则返回上面定义通过类名查询的方法，但是getClass方法只能接受"one"这样的字符串，而传回来的是".one"，所以需要用字符串的slice方法截取从第一个到最后一个字符然后进行查询
				return getClass(selector.slice(1))
			}
		else if(selector.charAt(0)=="#")
			{
				// 如果是id查询，返回id查询获取元素的方法，也需要截取
				return document.getElementById(selector.slice(1))
			}
		else 
			// 如果前两个都不是，说明为标签方式查询获取元素，返回标签方式查询方法，因为标签名查询的话接受的值就是"div"这样的一个字符串，所以不需要截取
			{
				return document.getElementsByTagName(selector)
			}
		// 正则判断是不是纯字符串
			// else if(/^[a-z|A-Z][a-z|A-Z|1-6]*$/g.test(selector))
	}


// 完善后的通过多种方式获取元素，如果既有可能通过各种方式，又想让通过后代也可以使用这样的方式获取元素，就多接收一个参数eleobj来接受又能传入的父级元素名称
function $2(selector,eleobj)
	{
		// 如果有传入父级元素，则使用后代获取元素，如果没传入则默认eleobj为document，也不影响运行
		var eleobj=eleobj||document
		// 如果传入的字符串前面有空格，用正则可以用空字符串替换掉空格
		// selector=selector.replace(/^\s*|\s*$/g,"")



		// 判断第一个字符是不是.如果是说明为类名查询
		if(selector.charAt(0)==".")
			{
				// 如果是类名查询，则返回上面定义通过类名查询的方法，但是getClass方法只能接受"one"这样的字符串，而传回来的是".one"，所以需要用字符串的slice方法截取从第一个到最后一个字符然后进行查询
				return getClass(selector.slice(1),eleobj)
			}
		else if(selector.charAt(0)=="#")
			{
				// 如果是id查询，返回id查询获取元素的方法，也需要截取
				return eleobj.getElementById(selector.slice(1))
			}
		else 
			// 如果前两个都不是，说明为标签方式查询获取元素，返回标签方式查询方法，因为标签名查询的话接受的值就是"div"这样的一个字符串，所以不需要截取
			{
				return eleobj.getElementsByTagName(selector)
			}
		// 正则判断是不是纯字符串
			// else if(/^[a-z|A-Z][a-z|A-Z|1-6]*$/g.test(selector))
	}






// 继续完善的通过多种方式获取元素
// 如果传入的是String类型，说名是要获取元素
// 如果传入的是function类型，就让这个function在window.onload后运行
function $(selector,eleobj)
	{
	// 如果传入的类型是string，就通过方法获取元素
	if(typeof selector=="string")
		{
			// 如果有传入父级元素，则使用后代获取元素，如果没传入则默认eleobj为document，也不影响运行
			var eleobj=eleobj||document
			// 如果传入的字符串前面有空格，用正则可以删掉
			selector=selector.replace(/^\s*|\s*$/g,"")



			// 判断第一个字符是不是.如果是说明为类名查询
			if(selector.charAt(0)==".")
				{
					// 如果是类名查询，则返回上面定义通过类名查询的方法，但是getClass方法只能接受"one"这样的字符串，而传回来的是".one"，所以需要用字符串的slice方法截取从第一个到最后一个字符然后进行查询
					return getClass(selector.slice(1),eleobj)
				}
			else if(selector.charAt(0)=="#")
				{
					// 如果是id查询，返回id查询获取元素的方法，也需要截取
					return document.getElementById(selector.slice(1))
				}
				// 如果传入的是以<>包住的字符串，就返回一个创建元素节点的方法
				// 用正则判断
			else if(/^<[a-z|A-Z][a-z|A-Z|1-6]*>$/g.test(selector))
				{
					// 如果是创建一个节点，那么返回创建方式，需要截取<>里面的内容，所以用slice方法截取第一个以后到最后一个以前的字符串
					return document.createElement(selector.slice(1,-1))
				}
			else 
				// 如果前两个都不是，说明为标签方式查询获取元素，返回标签方式查询方法，因为标签名查询的话接受的值就是"div"这样的一个字符串，所以不需要截取
				{
					return eleobj.getElementsByTagName(selector)
				}
			// 正则判断是不是纯字符串
				// else if(/^[a-z|A-Z][a-z|A-Z|1-6]*$/g.test(selector))
		}
	// 如果传入的类型是function，就让这个函数在window.onload后运行
	else if(typeof selector=="function")
		{
			// window.onload=function()
			// 	{
			// 		selector()	
			// 	}
			addEvent(window,"load",selector)
		}
	}

// 封装轮播函数
// 京东使用
function jdlb(bigbox,imgbox,btn,leftbtn,rightbtn){

			btn[0].style.background="red"
			imgbox.style.left="-500px"
			var num=1
			var flag=true
			function time()
				{
					if(flag)
					{
					flag=false
					num++
					if(num==btn.length+1)
					{
						
						animate(imgbox,{left:-num*500},1000,function(){
							num=1
							imgbox.style.left="-500px"
							for (var j = 0; j < btn.length; j++) 
							{
								btn[j].style.background="#3e3e3e"
							};
							btn[0].style.background="red"
							flag=true
						})
						
						
					}
					else if(num==0)
						{
							animate(imgbox,{left:-num*500},1000,function(){
							num=5
							imgbox.style.left="-2500px"
							for (var j = 0; j < btn.length; j++) 
							{
								btn[j].style.background="#3e3e3e"
							};
							btn[btn.length-1].style.background="red"
							flag=true
						})
						}
					else{
						animate(imgbox,{left:-500*num},1000,function()
							{
								for (var j = 0; j < btn.length; j++) 
								{
									btn[j].style.background="#3e3e3e"
								};
								btn[num-1].style.background="red"
								flag=true
							})
					}
				}


				}
			var timeout;
			var t=setInterval(time,1500)
			for (var i = 0; i < btn.length; i++)
				{
					
					btn[i].index=i
					
					btn[i].onmouseover=function()
						{	var that=this
							clearTimeout(timeout)
							timeout=setTimeout(function()
								{
								for (var j = 0; j < btn.length; j++) 
									{
										btn[j].style.background="#3e3e3e"
									};
									that.style.background="red"
									animate(imgbox,{left:-500*(that.index+1)},1000)
								},1000)
						}
					btn[i].onmouseout=function()
					{
						num=this.index+1
					}
				};
			bigbox.onmouseover=function()
				{
					clearInterval(t)
					leftbtn.style.display="block"
					rightbtn.style.display="block"
				}
			bigbox.onmouseout=function()
				{
					t=setInterval(time,1500)
					leftbtn.style.display="none"
					rightbtn.style.display="none"
				}
			leftbtn.onclick=function()
				{
					if(flag)
					{
					num-=2
					time()
					}
				}
			rightbtn.onclick=function()
				{
					time()
				}
}


// 双下标轮播
// 函数双下标轮播
// 传入五个参数
// bigbox----最大的div
// imgs----图片集合
// btns----按钮集合
// leftbtn-左按钮
// rightbtn--右按钮
// width----每张图片的宽度
function easylunbo(bigbox,imgs,btns,leftbtn,rightbtn,width)
	{
			leftbtn.style.display="none"
			rightbtn.style.display="none"
			imgs[0].style.zIndex=1
			btns[0].style.background="red"
			var z=5
			var num=0
			var now=0
			function lunbo()
			{
				num++
				if(num==imgs.length)
					{
						num=0
					}
					btns[now].style.background="#3e3e3e"
					btns[num].style.background="red"
					imgs[num].style.left=width+"px"
					imgs[num].style.zIndex=z++
					animate(imgs[now],{left:-width})
					animate(imgs[num],{left:0})
					now=num
					
			}
			var t=setInterval(lunbo,1000)
			for (var i = 0; i < btns.length; i++) 
			{
				btns[i].index=i
				btns[i].onmouseover=function()
				{
					if(this.index>now)
					{
						imgs[this.index].style.left=width+"px"
						animate(imgs[now],{left:-width})
					}
					else if(this.index<now)
					{
						imgs[this.index].style.left=-width+"px"
						animate(imgs[now],{left:width})
					}
					btns[now].style.background="#3e3e3e"
					btns[this.index].style.background="red"
					imgs[this.index].style.zIndex=z++
					animate(imgs[this.index],{left:0})
					num=this.index
					now=this.index
				}
			};
			bigbox.onmouseover=function()
			{
				clearInterval(t)
				leftbtn.style.display="block"
				rightbtn.style.display="block"
			}
			bigbox.onmouseout=function()
			{
				t=setInterval(lunbo,1000)
				leftbtn.style.display="none"
				rightbtn.style.display="none"
			}
			leftbtn.onclick=function()
			{
				num--
				if(num==-1)
					{
						num=imgs.length-1
					}
				btns[now].style.background="#3e3e3e"
				imgs[num].style.left=-width+"px"
				imgs[num].style.zIndex=z++
				btns[num].style.background="red"
				animate(imgs[now],{left:width})
				animate(imgs[num],{left:0})
				now=num
			}
			rightbtn.onclick=function()
			{
				lunbo()
			}
	}





// 获取某个对象的元素子节点
// 接收一个参数，对象
function getChildren(obj)
	{
		// 先从传进来的对象获取它所有子节点的集合，用对象.childNodes方法
		var arr=obj.childNodes
		// 声明一个空数组，用来接受所有元素子节点
		var newarr=[]
		// 然后对集合进行遍历，然后进行判断，看数组里的子节点是不是元素节点，用节点的nodeType看节点类型是什么，如果是1，说明这个几点就是元素节点
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].nodeType==1)
				// 如果是元素子节点，就填充进newarr数组里，用数组的push方法
				newarr.push(arr[i])
		};
		// 返回数组
		return newarr
	}


// 获取第一个元素子节点
// 用上面的获取所有元素子节点的方法，取数组的第一个
function getFirst(obj)
	{
		var arr=getChildren(obj)
		return arr[0]
	}

// 获取最后一个元素子节点
// 用上面的获取所有元素子节点的方法，取数组的最后一个
function getLast(obj)
	{
		var arr=getChildren(obj)
		return arr[arr.length-1]
	}


// 获取下一个元素子节点
// 传进来一个节点obj
function getNext(obj)
	{
		var next=obj.nextSibling
		if(next==null)
			return null
		while(next.nodeType!=1)
			{
				next=next.nextSibling
				if(next==null)
					return null
				else
					return next
			}
	}


// 获取上一个元素子节点
// 传进来一个节点obj
function getNext(obj)
	{
		var previou=obj.previousSibling
		if(previou==null)
			return null
		while(next.nodeType!=1)
			{
				previou=next.previousSibling
				if(previou==null)
					return null
				else
					return previou
			}
	}


// 在一个节点后插入一个新创建的节点
function insertAfter(obj,newobj)
	{
		var objparent=obj.parentNode
		var objnext=obj.nextSibling
		return objparent.insertBefore(objnext)
	}


// 获取某一个元素的文档坐标
function getPosition(obj)
	{
		// 首先获取该元素的left/top
		var left=obj.offsetLeft
		var top=obj.offsetTop
		// 然后要重复判断这个元素的父元素有没有定位属性，如果父元素有定位属性，那么需要加上父元素的left/top边框等
		// 如果父元素没有就判断父元素是不是body，如果不是，就判断他的父元素有没有定位属性，没有的话就找父元素的父元素，直到body，body肯定没有定位属性，如果直到body都没有定位属性，那么该元素的left/top就是定位
		var parent=obj.parentNode
		// 用父节点获取
		while(parent.nodeName!="BODY")
			{
				// 如果父元素不是body，用getStyle方法获取父元素的position属性
				if(getStyle(parent,"position")=="absolute"||getStyle(parent,"position")=="relative")
					{
						// 如果有定位属性left/top值就应该加上父元素的left/top值和边框
						left+=parent.offsetLeft+parseInt(getStyle(parent,"borderLeftWidth"))
						top+=parent.offsetTop+parseInt(getStyle(parent,"borderTopWidth"))
					}
					// 如果父元素没有定位属性，就把父元素的父节点赋值给parent继续判断
					parent=parent.parentNode
				
			}
			// 返回结果
			return {x:left,y:top}
	}


// 兼容性的给对象绑定事件
// 三个参数：事件源，事件名字，事件处理程序
function addEvent(obj,event,fun)
	{
		// 首先判断在哪个浏览器
		// IE添加事件：对象.attachEvent("事件(on)",move) 
		// 现代添加：对象.addEventListener("事件","处理程序",布尔值)
		if(obj.attachEvent)
			{
				obj.attachEvent("on"+event,fun)
			}
		else
			{
				obj.addEventListener(event,fun,false)
			}
		
		

	}

// 兼容性的给对象移除事件
// 三个参数：事件源，事件名字，事件处理程序
function removeEvent(obj,event,fun)
	{
		// 首先判断在哪个浏览器
		// IE删除事件：对象. detachEvent("事件(on)","处理程序")
		// 现代删除：对象.removeEventListener("事件","处理程序",布尔值)
		if(obj.attachEvent)
			{
				obj.detachEvent("on"+event,fun)
			}
		else
			{
				obj.removeEventListener(event,fun,false)
			}
	}





// 滚轮事件
function mousewheel(obj,upfun,downfun)
	{
		if(obj.attachEvent)
		{
			obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
		}
		else if(obj.addEventListener)
		{
			obj.addEventListener("mousewheel",scrollFn,false);
			//chrome,safari -webkit-
			obj.addEventListener("DOMMouseScroll",scrollFn,false);
			//firefox -moz-
		}
		function scrollFn(e)
			{
				var e=e||window.event
				if (e.preventDefault )
				{
					e.preventDefault(); //阻止默认浏览器动作(W3C)
				}
				else
				{
					e.returnValue = false;
				}	
				var detail=e.detail||e.wheelDelta
				if(detail==-3||detail==120)
					{
						upfun.call(obj)
					}
				else
					{
						downfun.call(obj)
					}
			}
		
	}





//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
	  if(parent.contains){
	     return parent.contains(child) && parent!=child;
	  }else{
	    return (parent.compareDocumentPosition(child)===20);
	  }
	 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,e);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,e);
        }
      }
    }
}
 
  function getEvent(e){
    return e||window.event;
  } 