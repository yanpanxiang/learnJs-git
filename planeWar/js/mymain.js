//获取主页面
var maindiv = document.getElementById("maindiv");
//获取开始界面
var startdiv = document.getElementById("startdiv");
//获取分数界面
var scorelabel = document.getElementById("label");
//获取游戏中分数界面
var scorediv = document.getElementById("scorediv");
//获取游戏暂停界面
var menu = document.getElementById("menu");
//获取结束界面
var enddiv = document.getElementById("enddiv");
//获取游戏结束分数统计
var planscore = document.getElementById("planscore");
//初始化分数
var scores = 0;

//定时器
var set;
//开始游戏按钮事件
function begin() {
	startdiv.style.display = 'none';
	maindiv.style.display = "block";
	scorediv.style.display = "block";
	selfplane.imagenode.style.display = "block";

	//调用开始函数
	set = setInterval(start, 20);
}
//继续
function jixu() {
	location.reload(true);
}
//创建飞机类
function plane(hp, X, Y, sizeX, sizeY, score, dietime, speed, boomimage, imagesrc) {
	this.planeX = X;
	this.planeY = Y;
	this.planedietimes = 0;
	this.planedietime = dietime;
	this.planesizeX = sizeX;
	this.planesizeY = sizeY;
	this.planehp = hp;
	this.planescore = score;
	this.planeboomimage = boomimage;
	this.planespeed = speed;
	this.planeisdie = false;
	this.imagenode = null;
	//飞机的移动行为
	this.planemove = function() {
			if(scores <= 50000) {
				this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 'px';
			} else if(scores >= 50000 && scores <= 100000) {
				this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 1 + 'px';
			} else if(scores >= 100000 && scores <= 150000) {
				this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 2 + 'px';
			} else if(scores >= 150000 && scores <= 200000) {
				this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 3 + 'px';
			} else if(scores >= 200000 && scores <= 300000) {
				this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 4 + 'px';
			} else {
				this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 5 + 'px';
			}
		}
		//初始飞机
	this.create = function() {
		this.imagenode = document.createElement('img');
		this.imagenode.style.left = X + 'px';
		this.imagenode.style.top = Y + 'px';
		this.imagenode.src = imagesrc;
		maindiv.appendChild(this.imagenode);
	}
	this.create();
}
//创建子弹类
function bullet(X, Y, sizeX, sizeY, imagesrc) {
	this.bulletX = X;
	this.bulletY = Y;
	this.bulletsizeX = sizeX;
	this.bulletsizeY = sizeY;
	this.bulletimage = null;
	this.bulletattach = 1; //子弹攻击力；
	//子弹移动行为
	this.bulletmove = function() {
			this.bulletimage.style.top = this.bulletimage.offsetTop - 20 + 'px';
		}
		//初始子弹
	this.creat = function() {
		this.bulletimage = document.createElement('img');
		this.bulletimage.style.left = X + 'px';
		this.bulletimage.style.top = Y + 'px';
		this.bulletimage.src = imagesrc;
		maindiv.appendChild(this.bulletimage);
	}
	this.creat();
}
//创建单行子弹类
function singlebullet(X, Y) {
	bullet.call(this, X, Y, 6, 14, 'image/bullet1.png');
}
//创建敌机类
function enemy(hp, min, max, sizeX, sizeY, score, dietime, speed, boomimage, imagesrc) {
	plane.call(this, hp, random(min, max), -100, sizeX, sizeY, score, dietime, speed, boomimage, imagesrc);
}
//创建随机数
function random(min, max) {
	return Math.floor(Math.random() * max + min);
}

//创建自己的飞机类
function ourplane(X, Y) {
	plane.call(this, 1, X, Y, 66, 80, 0, 660, 0, 'image/bz.gif', 'image/my.gif');
	this.imagenode.setAttribute('id', 'ourplane');
}
//创建自己的飞机
var selfplane = new ourplane(120, 485);
var ourplane = document.getElementById("ourplane");
//移动事件
var move = function() {
	var e = window.event || arguments[0];
	var selfplaneX = e.clientX - 500;
	var selfplaneY = e.clientY;
	ourplane.style.left = selfplaneX - selfplane.planesizeX / 2 + 'px';
	ourplane.style.top = selfplaneY - selfplane.planesizeY / 2 + 'px';

}
var touchMove = function(event){
	var event = event || window.event;
	
	if(event.targetTouches.length ==1){
	
		var touch = event.targetTouches[0];
		var selfplaneX = touch.clientX;
		var selfplaneY = touch.clientY;
		ourplane.style.left = selfplaneX - selfplane.planesizeX / 2 + 'px';
		ourplane.style.top = selfplaneY - selfplane.planesizeY / 2 + 'px';
		
	}
}

//暂停事件
var flag = 0;
var pause = function() {
	if(flag == 0) {
		menu.style.display = 'block';
		if(document.removeEventListener) {
			maindiv.removeEventListener('mousemove', move, true);
			maindiv.removeEventListener('touchmove', touchMove, true);
			bodyobj.removeEventListener('mousemove', side, true);
			bodyobj.removeEventListener('touchmove', side, true);
		} else if(document.detachEvent) {
			maindiv.detachEvent('onmousemove', move);
			bodyobj.detachEvent('onmousemove', side)
		}
		clearInterval(set);
		flag = 1;
	} else {
		menu.style.display = 'none';
		if(document.addEventListener) {
			maindiv.addEventListener('mousemove', move, true);
			maindiv.addEventListener('touchmove', touchMove, true);
			bodyobj.addEventListener('mousemove', side, true);
			bodyobj.addEventListener('touchmove', touchMove, true);
		} else if(document.attachEvent) {
			maindiv.attachEvent('onmousemove', move);
			bodyobj.attachEvent('onmousemove', side)
		}
		set = setInterval(start, 20);
		flag = 0;
	}
}
var bodyobj = document.getElementsByTagName('body')[0];
//自己的飞机如果飞出边界，就取消mousemove事件
var side = function() {
		var e = window.event || event;
		var bodyobjX = e.clientX;
		var bodyobjY = e.clientY;
		if(bodyobjX < 505 || bodyobjX > 815 || bodyobjY > 568 || bodyobjY < 0) {
			if(document.removeEventListener) {
				maindiv.removeEventListener('mousemove', move, true);
				maindiv.removeEventListener('touchmove', touchMove, true);
			} else if(document.detachEvent) {
				maindiv.detachEvent('onmousemove', move);
			}
		} else {
			if(document.addEventListener) {
				maindiv.addEventListener('mousemove', move, true);
				maindiv.addEventListener('touchmove', touchMove, true);
			} else if(document.attachEvent) {
				maindiv.attachEvent('onmousemove', move);
			}
		}
	}
	//给menu添加事件
if(document.addEventListener) {
	selfplane.imagenode.addEventListener('click', pause, true);
	maindiv.addEventListener('mousemove', move, true);
	maindiv.addEventListener('touchmove', touchMove, true);
	bodyobj.addEventListener('mousemove', side, true);
	bodyobj.addEventListener('touchmove', touchMove, true);
	menu.getElementsByTagName('button')[0].addEventListener('click', pause, true);
	menu.getElementsByTagName('button')[0].addEventListener('touchstart', pause, true);
	menu.getElementsByTagName('button')[2].addEventListener('click', jixu, true);
	menu.getElementsByTagName('button')[2].addEventListener('touchstart', jixu, true);
} else if(document.attachEvent) {
	maindiv.removeEventListener('mousemove', move, true);
	bodyobj.removeEventListener('mousemove', side, true);
	selfplane.imagenode.attachEvent('onclick', pause);
	menu.getElementsByTagName('button')[0].attachEvent('onclick', pause);
	menu.getElementsByTagName('button')[2].attachEvent('onclick', jixu);

}
//将敌机和子弹存入数组，碰撞删除
var enemys = [];
var bullets = [];
var mark = 0;
var mark1 = 0;
var backgroundPositionY = 0;
//开始
function start() {
	maindiv.style.backgroundPositionY = backgroundPositionY + 'px';
	backgroundPositionY += 0.5;
	if(backgroundPositionY > 568) {
		backgroundPositionY = 0;
	}
	mark++;
	//创建敌方飞机
	if(mark == 20) {
		mark1++;
		//中飞机
		if(mark1 % 5 == 0) {
			enemys.push(new enemy(6, 25, 274, 46, 60, 5000, 360, random(1, 3), 'image/zz.gif', 'image/enemy3_fly_1.png'));
		}
		if(mark1 == 20) { //大飞机
			enemys.push(new enemy(12, 57, 210, 110, 164, 10000, 540, 1, 'image/dd.gif', 'image/enemy2_fly_1.png'));
			mark1 = 0;
		} else { //小飞机
			enemys.push(new enemy(1, 19, 286, 34, 24, 1000, 360, random(1, 4), "image/xx.gif", "image/enemy1_fly_1.png"));
		}
		mark = 0;
		
	}
	//移动敌方飞机
	var enemyslen = enemys.length;
	for(var i = 0; i < enemyslen; i++) {
		if(enemys[i].planeisdie != true) {
			enemys[i].planemove();
		}
		//如果敌机超出边界
		if(enemys[i].imagenode.offsetTop > 568) {
			maindiv.removeChild(enemys[i].imagenode);
			enemys.splice(i, 1);
			enemyslen--;
		}
		//碰撞之后一段事件清除敌机
		if(enemys[i].planeisdie == true) {
			enemys[i].planedietimes += 20;
			if(enemys[i].planedietimes == enemys[i].planedietime) {
				maindiv.removeChild(enemys[i].imagenode);
				enemys.splice(i, 1);
				enemyslen--;
			}
		}
	}
	//子弹
	if(mark % 5 == 0) {
		bullets.push(new singlebullet(parseInt(selfplane.imagenode.style.left) + 30, parseInt(selfplane.imagenode.style.top) - 10))
	}
	//子弹移动
	var bulletslen = bullets.length;
	for(var i = 0; i < bulletslen; i++) {
		bullets[i].bulletmove();
		//子弹超出边界的，删除
		if(bullets[i].bulletimage.offsetTop < 0) {
			maindiv.removeChild(bullets[i].bulletimage);
			bulletslen--;
			bullets.splice(i, 1);
		}
	}
	//碰撞
	for(var k = 0; k < bulletslen; k++) {
		for(var j = 0; j < enemyslen; j++) {
			if(enemys[j].planeisdie == false) {
				if(enemys[j].imagenode.offsetLeft + enemys[j].planesizeX >= selfplane.imagenode.offsetLeft && enemys[j].imagenode.offsetLeft <= selfplane.imagenode.offsetLeft + selfplane.planesizeX) {
					if(enemys[j].imagenode.offsetTop + enemys[j].planesizeY >= selfplane.imagenode.offsetTop + 40 && enemys[j].imagenode.offsetTop <= selfplane.imagenode.offsetTop -20 + selfplane.planesizeY) {
						//碰撞游戏结束
												selfplane.imagenode.src = 'image/bz.gif';
//						selfplane.imagenode.src = selfpane.planeboomimage;
						enddiv.style.display = 'block';
						planscore.innerHTML = scores;
						//移除事件
						if(document.removeEventListener) {
							maindiv.removeEventListener('mousemove', move, true);
							bodyobj.removeEventListener('mousemove', side, true);
						} else if(document.detachEvent) {
							maindiv.detachEvent('onmousemove', move);
							bodyobj.detachEvent('onmousemove', side);
						}
						clearInterval(set);
					}
				}
				if(bullets[k].bulletimage.offsetLeft + bullets[k].bulletsizeX >enemys[j].imagenode.offsetLeft && bullets[k].bulletimage.offsetLeft < enemys[j].imagenode.offsetLeft + enemys[j].planesizeX){
					if(bullets[k].bulletimage.offsetTop <= enemys[j].imagenode.offsetTop + enemys[j].planesizeY && bullets[k].bulletimage.offsetTop + bullets[k].bulletsizeY >= enemys[j].imagenode.offsetTop ){
						enemys[j].planehp = enemys[j].planehp - bullets[k].bulletattach;
						if(enemys[j].planehp == 0){
							scores = scores + enemys[j].planescore;
							scorelabel.innerHTML = scores;
							enemys[j].planeisdie = true;
							enemys[j].imagenode.src = enemys[j].planeboomimage;
						}
						//删除子弹
						maindiv.removeChild(bullets[k].bulletimage);
						bullets.splice(k,1);
						bulletslen--;
						break;
					}
				}
			}
		}
	}

}