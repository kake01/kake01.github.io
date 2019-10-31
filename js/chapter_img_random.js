var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');

var eye_width = 25;//目の長さ
var eye_end_to_center = 25;//左目のenbとcenterとの距離
var eye_to_eye = 35;// 目と目の距離

var head_num = 8;

var eye_angle = 0;

//キャラ1
var chara_center_x = 375;
var chara_center_y = 375;
var eye_pos_y = chara_center_y - 50;
var eye_control_y = chara_center_y - 50;
var mouth_pos_y = chara_center_y + 25;
var mouth_control_y = chara_center_y + 25;
var temp_temp = 0;
//キャラごに違う
var head_big_radi = 100;
var radi_small = head_big_radi - 20;//固定
var radi_inside = radi_small - 10;//固定


//キャラ2
var chara_center_x1 = 600;
var chara_center_y1 = 650;
var eye_pos_y1 = chara_center_y1 - 50;
var eye_control_y1 = chara_center_y1 - 50;
var mouth_pos_y1 = chara_center_y1 + 50;
var mouth_control_y1 = chara_center_y1 + 50;


var chara_center_x2 = 200;
var chara_center_y2 = 250;
var eye_pos_y2 = chara_center_y2 - 50;
var eye_control_y2 = chara_center_y2 - 50;
var mouth_pos_y2 = chara_center_y2 + 50;
var mouth_control_y2 = chara_center_y2 + 50;

var chara_center_x3 = 200;
var chara_center_y3 = 500;
var eye_pos_y3 = chara_center_y3 - 50;
var eye_control_y3 = chara_center_y3 - 50;
var mouth_pos_y3 = chara_center_y3 + 50;
var mouth_control_y3 = chara_center_y3 + 50;

onload = function()
{
	CreateHead(head_num, chara_center_x, chara_center_y, head_big_radi);
	CreateMouth(chara_center_x - 50, mouth_pos_y, chara_center_x + 50, mouth_pos_y, mouth_control_y);
	CreateEye(chara_center_x - (eye_end_to_center + eye_width),	eye_pos_y, chara_center_x - eye_end_to_center, eye_pos_y, eye_control_y, eye_to_eye + eye_end_to_center);

	CreateHead(head_num, chara_center_x1, chara_center_y1, head_big_radi);
	CreateMouth(chara_center_x1 - 50, mouth_pos_y1, chara_center_x1 + 50, mouth_pos_y1, mouth_control_y1);
	CreateEye(chara_center_x1 - (eye_end_to_center + eye_width),	eye_pos_y1, chara_center_x1 - eye_end_to_center, eye_pos_y1, eye_control_y1, eye_to_eye + eye_end_to_center);

	CreateHead(head_num, chara_center_x2, chara_center_y2, head_big_radi);
	CreateMouth(chara_center_x2 - 50, mouth_pos_y2, chara_center_x2 + 50, mouth_pos_y2, mouth_control_y2);
	CreateEye(chara_center_x2 - (eye_end_to_center + eye_width),	eye_pos_y2, chara_center_x2 - eye_end_to_center, eye_pos_y2, eye_control_y2, eye_to_eye + eye_end_to_center);

	CreateHead(head_num, chara_center_x3, chara_center_y3, head_big_radi);
	CreateMouth(chara_center_x3 - 50, mouth_pos_y3, chara_center_x3 + 50, mouth_pos_y3, mouth_control_y3);
	CreateEye(chara_center_x3 - (eye_end_to_center + eye_width),	eye_pos_y3, chara_center_x3 - eye_end_to_center, eye_pos_y3, eye_control_y3, eye_to_eye + eye_end_to_center);
};

function CreateEye(start_x, start_y, end_x, end_y, control_y, eye_width)
{
	// ただの線
	if(0 <= temp_temp/*初期値*/)
	{
		ctx.beginPath();
		//左目
		ctx.moveTo(start_x, start_y);
		ctx.quadraticCurveTo((start_x + end_x) / 2, control_y, end_x, end_y);
		//右目
		ctx.moveTo(start_x + eye_width, start_y);  // 始点まで移動
		ctx.quadraticCurveTo((start_x + end_x) / 2 + eye_width, control_y, end_x + eye_width, end_y);
		ctx.strokeStyle = "Orange";
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	// 目玉あり
	if(-10 < temp_temp && temp_temp < 0)
	{
		ctx.beginPath();
		//左目
		ctx.moveTo(start_x, start_y);
		ctx.quadraticCurveTo((start_x + end_x) / 2, control_y, end_x, end_y);
		//右目
		ctx.moveTo(start_x + eye_width, start_y);
		ctx.quadraticCurveTo((start_x + end_x) / 2 + eye_width, control_y, end_x + eye_width, end_y);
		ctx.fillStyle = '#CCCCCC';
		ctx.fill();
		ctx.closePath();
	}
	// 怒り目
	if(temp_temp <= -10)
	{
		//左目
		ctx.beginPath();
		ctx.arc((start_x + end_x) / 2, end_y, 25, 1/16 * Math.PI + eye_angle, 17/16 * Math.PI + eye_angle, false);
		ctx.fillStyle = 'rgb(0, 255, 0)';
		ctx.fill();
		// 右目
		ctx.beginPath();
		ctx.arc((start_x + end_x) / 2 + eye_width, end_y, 25, -1/16 * Math.PI - eye_angle, 15/16 * Math.PI - eye_angle, false);
		ctx.fillStyle = 'rgb(0, 255, 0)';
		ctx.fill();
	}
}
function CreateMouth(start_x, start_y, end_x, end_y, control_y)
{
	//control_yで口の開き具合
	ctx.beginPath();
	ctx.moveTo(start_x, start_y);
	ctx.quadraticCurveTo((start_x + end_x) /2, control_y, end_x, end_y);
	ctx.strokeStyle = "Orange";
	ctx.lineWidth = 5;
	ctx.stroke();
}
// 内部の点線固定,小さい円固定,大きい円可変
function CreateHead(n, dx, dy, radi_big)
{
	var angle_big = Math.PI/n;
	var angle_small = 1/6 + Math.PI/n;

	ctx.beginPath();
	for(var i = 0; i < 2 * Math.PI; i += angle_big)
	{
		var big_x = Math.sin(i) * radi_big;
		var big_y = Math.cos(i) * radi_big;
		var small_x = Math.sin(1/6 + i) * radi_inside;
		var small_y = Math.cos(1/6 + i) * radi_inside;
		ctx.lineTo(big_x + dx, big_y + dy);
		ctx.lineTo(small_x + dx, small_y + dy);
		ctx.globalAlpha = 0.5;
	}
	ctx.closePath();
	ctx.fillStyle = "#00f";
	ctx.fill();
	ctx.arc( dx, dy, radi_small, 0, 2 * Math.PI, false);
	ctx.fillStyle = "#f00";
	ctx.fill();
}


function good_eye()
{
	temp_temp += 1;
	// ただの線
	if(temp_temp >= 0/*初期値*/)
	{
				console.log("良いボタンでただの線");
		eye_control_y -= 3;
		eye_pos_y += 3
	}

	// 目玉あり
	if(-10 < temp_temp && temp_temp < 0)
	{
				console.log("良いボタンでw目玉");
		eye_control_y -= 3;
	}
	// 怒り目
	if(temp_temp <= -10)
	{
				console.log("良いボタンで怒り目");
		eye_angle -= 1/16 * Math.PI;
		eye_control_y -= 3;
	}
	CleateCharacter();
}
function bad_eye()
{
	temp_temp -=1;
	//ただの線
	if( 0 <=temp_temp)
	{
				console.log("悪いボタンでただの線");
		eye_control_y += 3;
		eye_pos_y -= 3;
	}
	// 目玉あり
	if(-10 < temp_temp && temp_temp < 0)
	{
				console.log("悪いボタンで目玉");
		eye_control_y += 3;
	}
	// 怒り目
	if(-10 >= temp_temp)
	{
		console.log("悪いボタンで怒り目");
		eye_angle += 1/16 * Math.PI;
		eye_control_y += 3;
	}
	CleateCharacter();
}




function good_head()
{
	// head_num -= 1;
	head_big_radi -= 7;
	CleateCharacter();
}
function bad_head()
{
	// head_num += 1;
	head_big_radi += 7;
	CleateCharacter();
}
function good_mouth()
{
	mouth_control_y += 4;
	mouth_pos_y -=3;
	CleateCharacter();
}
function bad_mouth()
{
	mouth_control_y -= 4;
	mouth_pos_y +=3;
	CleateCharacter();
}
function CleateCharacter()
{
	console.log("現在の" + temp_temp);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	CreateHead(head_num, chara_center_x, chara_center_y, head_big_radi);
	CreateMouth(chara_center_x - 50, mouth_pos_y, chara_center_x + 50, mouth_pos_y, mouth_control_y);
	CreateEye(chara_center_x - (eye_end_to_center + eye_width), eye_pos_y, chara_center_x - eye_end_to_center , eye_pos_y, eye_control_y, eye_to_eye + eye_end_to_center);
}
function good_all()
{
	good_head();
	good_eye();
	good_mouth();
}
function bad_all()
{
	bad_head();
	bad_eye();
	bad_mouth();
}
