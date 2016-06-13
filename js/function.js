// banner轮播
function bannerlunbo()
	{
			var imgbox=getClass("back-banner-box")
		var btbox=getClass("btbox")[0]
		var bannerbox=getClass("banner-box")[0]
		var bt=btbox.getElementsByTagName("li")
		var num=0
		var settime=function ()
			{
				num++
				if(num>5)
				{
					num=0
				}
				for(var i = 0; i < imgbox.length; i++)
				{
					bt[i].style.background="#aaa"
					imgbox[i].style.display="none"
				}
				imgbox[num].style.display="block"
				bt[num].style.background="#fff"
			}
		var time=setInterval(settime,2000)
		for(var i=0;i<bt.length;i++)
			{
				bt[i].index=i;
				bt[i].onmouseover=function()
				{
					for(var j=0;j<bt.length;j++)
					{
						bt[j].style.background="#aaa"
						imgbox[j].style.display="none"
					}
					bt[this.index].style.background="#fff"
					imgbox[this.index].style.display="block"
				}
				bt[i].onmouseout=function()
				{
					num=this.index;
				}

			}
		bannerbox.onmouseover=function()
			{
				clearInterval(time);
			}
		bannerbox.onmouseout=function()
			{
				time=setInterval(settime,2000)
			}
	}
// 热门品牌圆点
function xiaoyuandian()
	{
		var abox=$(".rmpp-bottom-right")
	for (var i = 0; i < abox.length; i++) 
		{
			var box=abox[i].getElementsByTagName("a")
			
			for (var j = 0; j < box.length; j++)
				{
					box[j].index=j;
					box[j].onmouseover=function()
					{
						var heart=$(".heart",this)[0]
						heart.style.display="block"
					}
					box[j].onmouseout=function()
					{
						var heart=$(".heart",this)[0]
						heart.style.display="none"
					}
				}
		};
	}
// 热门品牌选项卡
function xuanxiangka()
	{
		var menu=$(".menu")[0]
		var btn=$("a",menu)
		var content=$(".rmpp-bottom-right")
		for (var i = 0; i < btn.length; i++) {
			btn[i].index=i
			btn[i].onclick=function()
				{
					for (var j = 0; j < btn.length; j++) 
					{
						btn[j].style.border="none"
						content[j].style.display="none"
					};
					this.style.borderBottom="2px solid black"
					content[this.index].style.display="block"
				}
		};
	}
// 右固定动画
function fix(icon,tab)
	{
		
		tab.style.right=70+"px"
		tab.style.opacity=0;
		tab.style.display="none"
		icon.onmouseover=function()
			{
				tab.style.display="block"
				animate(tab,{right:35,opacity:1},300)
			}
		icon.onmouseout=function()
			{
				animate(tab,{right:70,opacity:0},300,function(){tab.style.display="none"})
			}
	}
// 按需加载图片
function orderpic(imgs)
	{
		wheight=document.documentElement.clientHeight
				for (var i = 0; i < imgs.length; i++) 
					{
						if((getPosition(imgs[i]).y)<wheight)
							{
								imgs[i].src=imgs[i].getAttribute("date-src")
							}
					}
		var obj=document.documentElement.scrollTop==0?document.body:document.documentElement
		addEvent(window,"scroll",function()
			{
				var obj=document.documentElement.scrollTop==0?document.body:document.documentElement
				wheight=document.documentElement.clientHeight
				for (var i = 0; i < imgs.length; i++) 
					{
						if((getPosition(imgs[i]).y)<(wheight+obj.scrollTop))
							{
								imgs[i].src=imgs[i].getAttribute("date-src")
							}
					}
			})
		
		
	}
// 顶部搜索浮动+返回顶部
function fudong()
	{
		var fudong=$(".fudong-top")[0]
		var input=$("#lookfor")
		var tssc=$(".tssc")[0]
		var backtop=$("#backtop")
		window.onscroll=function()
			{
				var obj=document.documentElement.scrollTop==0?document.body:document.documentElement
				if(obj.scrollTop>=getPosition(tssc).y)
					{

						animate(fudong,{top:0},200)
					}
				else
					{
						animate(fudong,{top:-50},200)
					}
				// 返回顶部
				if(obj.scrollTop==0)
					{
						animate(backtop,{opacity:0},100)
					}
				else
					{
						animate(backtop,{opacity:1},100)
					}
				backtop.onclick=function()
					{
						animate(obj,{scrollTop:0})
					}
				
			}
	}
// 二级导航
function daohang(first,second)
	{
		first.onmouseover=function()
			{
				second.style.display="block"
			}
		first.onmouseout=function()
			{
				second.style.display="none"
			}
	}
// top下拉
function xiala(first,second,topic)
	{
		first.onmouseover=function()
			{
				topic.style.color="#c40000";
				topic.style.backgroundColor="#fff";
				second.style.display="block"
			}
		first.onmouseout=function()
			{
				second.style.display="none"
				topic.style.color="#999";
				topic.style.backgroundColor="#f2f2f2";
			}
	}
