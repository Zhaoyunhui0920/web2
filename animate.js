
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

var box = document.getElementById('box');
		var oNavlist = document.getElementById('nav').children;
		var slider = document.getElementById('slider');
		var left = document.getElementById('left');
		var right = document.getElementById('right');
		var index = 1;
		var timer;
		var timer1;
		var isMoving = false;
		var scrol = document.getElementById('scrol');
		//灰色部分：文字滚动
		//匀速

		window.onload = function (){
			timer1 = setInterval(function (){
				var now = parseInt(getStyle(scrol,'right'));
				if(now >= 1100){
					scrol.style.right = "100px";
				}else{
					scrol.style.right = now + 5 + "px";
				}
			},100);		
		}

		
		//轮播下一张的函数
		function next(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index++;
			navChange();
			animate(slider,{left:-1200*index},function(){
				if(index === 6){
						slider.style.left = "-1200px";
					index = 1;
				}
				isMoving = false;
			});
		}
		function prev(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index--;
			navChange();
			animate(slider,{left:-1200*index},function(){
				if(index === 0){
					slider.style.left = "-6000px";
					index = 5;
				}
				isMoving = false;
			});
		}
		var timer = setInterval(next,2000);
		//鼠标划入清定时器
		box.onmouseover = function(){
			animate(left,{opacity:50});
			animate(right,{opacity:50}); 
			clearInterval(timer)
		}
		//鼠标划出开定时器
		box.onmouseout = function(){
			animate(left,{opacity:0})
			animate(right,{opacity:0})
			timer = setInterval(next,2000);
		}
		right.onclick = next;
		left.onclick = prev;

		//小按钮点击事件
		for(var i = 0;i<oNavlist.length;i++){
			oNavlist[i].idx = i;
			oNavlist[i].onclick = function(){
				index = this.idx + 1;
				navChange();
				animate(slider,{left:-1200*index});
			}
		}

		//小按钮样式：背景色切换
		function navChange(){
			for(var i = 0;i<oNavlist.length;i++){
				oNavlist[i].className = '';
			}
			if(index === 6){
				oNavlist[0].className = 'active';
			}else if(index === 0){
				oNavlist[4].className = 'active';
			}else{
				oNavlist[index-1].className = 'active';
			}
		}