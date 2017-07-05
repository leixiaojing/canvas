// var window_width = 1024;
// var window_height = 600;
// var margin_left = 10;
// var margin_top = 10;
// var radius = 8;

var endTime = new Date();
endTime.setTime((endTime.getTime()) + 48 * 3600 * 1000);

var currShowTimeSecond = 0;
// const 声明一个常量
// getTime() 表示当前时间距离1970年1月1日0时0分0秒的毫秒数

var ball = [];
var aBall = {};
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function() {

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	window_width = document.documentElement.clientWidth;
	window_height = document.documentElement.clientHeight;
	margin_left = Math.round(window_width / 10);
	margin_top = Math.round(window_height / 4);
	radius = Math.round(window_width * 4 / 5 / 108) - 1;
 
	canvas.width = window_width;
	canvas.height = window_height;

	// 获取倒计时的毫秒数
	currShowTimeSecond = getCurrShowTimeSecond();
	setInterval(function() {
		render(context);
		update();
	},50)
};

function getCurrShowTimeSecond() {
	var currTime = new Date();
	var diff = endTime.getTime() - currTime.getTime();
	diff = Math.round(diff);
	return diff > 0 ? diff/1000 : 0;
}

function update() {
	var nextShowTimeSecond = getCurrShowTimeSecond();

	var nexthour = parseInt(nextShowTimeSecond/3600);
	var nextminute = parseInt((nextShowTimeSecond - nexthour*3600)/60);
	var nextsecond = parseInt(nextShowTimeSecond%60);

	var currhour = parseInt(currShowTimeSecond/3600);
	var currminute = parseInt((currShowTimeSecond - currhour*3600)/60);
	var currsecond = parseInt(currShowTimeSecond%60);

	if(nextsecond != currsecond) {
		if(parseInt(currhour/10) != parseInt(nexthour/10)) {
			addBalls(margin_left,margin_top,parseInt(nexthour/10));
		}
		if(parseInt(currhour%10) != parseInt(nexthour%10)) {
			addBalls(margin_left + 15*(radius + 1),margin_top,parseInt(nexthour%10));
		}
		if(parseInt(currminute/10) != parseInt(nextminute/10)) {
			addBalls(margin_left + 39*(radius + 1),margin_top,parseInt(nextminute/10));
		}
		if(parseInt(currminute%10) != parseInt(nextminute%10)) {
			addBalls(margin_left + 54*(radius + 1),margin_top,parseInt(nextminute%10));
		}
		if(parseInt(currsecond/10) != parseInt(nextsecond/10)) {
			addBalls(margin_left + 78*(radius + 1),margin_top,parseInt(nextsecond/10));
		}
		if(parseInt(currsecond%10) != parseInt(nextsecond%10)) {
			addBalls(margin_left + 93*(radius + 1),margin_top,parseInt(nextsecond%10));
		}
		currShowTimeSecond = nextShowTimeSecond;
	}
	updateBalls();
}

function updateBalls() {
	for (var i = 0; i < ball.length; i++) {
		ball[i].x += ball[i].vx;
		ball[i].y += ball[i].vy;
		ball[i].vy += ball[i].g;
		if(ball[i].y >= window_height - radius) {
			ball[i].y = window_height - radius;
			ball[i].vy = -ball[i].vy*0.75;
		}
	}

	var cnt = 0;
	for (var j = 0; j < ball.length; j++) {
		if(ball[j].x + radius > 0 && ball[j].x - radius < window_width) {
			ball[cnt++] = ball[j];
		}
	}
	while(ball.length > Math.min(500,cnt)) {
		ball.pop();
	}
}

function render(cxt) {
	cxt.clearRect(0,0,window_width,window_height);
	//刷新画布内容

	var hour = parseInt(currShowTimeSecond/3600);
	var minute = parseInt((currShowTimeSecond - hour*3600)/60);
	var second = parseInt(currShowTimeSecond%60);

	renderDigit(margin_left,margin_top,parseInt(hour/10),cxt);
	renderDigit(margin_left + 15*(radius + 1),margin_top,parseInt(hour%10),cxt);
	renderDigit(margin_left + 30*(radius + 1),margin_top,10,cxt);
	renderDigit(margin_left + 39*(radius + 1),margin_top,parseInt(minute/10),cxt);
	renderDigit(margin_left + 54*(radius + 1),margin_top,parseInt(minute%10),cxt);
	renderDigit(margin_left + 69*(radius + 1),margin_top,10,cxt);
	renderDigit(margin_left + 78*(radius + 1),margin_top,parseInt(second/10),cxt);
	renderDigit(margin_left + 93*(radius + 1),margin_top,parseInt(second%10),cxt);

	for (var i = 0; i < ball.length; i++) {
		cxt.fillStyle = ball[i].color;

		cxt.beginPath();
		cxt.arc(ball[i].x,ball[i].y,radius,0,2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}
}

function addBalls(x,y,num) {
	for (var i = 0; i < digital[num].length; i++) {
		for (var j = 0; j < digital[num][i].length; j++) {
			if(digital[num][i][j] == 1) {
				aBall = {
					x:(2*j + 1)*(radius + 1) + x,
					y:(2*i + 1)*(radius + 1) + y,
					g:1.2+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
					vy:-6,
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				ball.push(aBall);
			}
		}
	}
}

function renderDigit(x,y,num,cxt) {
	cxt.fillStyle = "#0B6797";
	for (var i = 0; i < digital[num].length; i++) {
		for (var j = 0; j < digital[num][i].length; j++) {
			if(digital[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc((2*j + 1)*(radius + 1) + x,(2*i + 1)*(radius + 1) + y,radius,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}