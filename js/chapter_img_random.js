var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');
var head_num = 8;
var head_big_radi = 170;
var chara_center_x = 375;
var chara_center_y = 375;
var eye_angle = 0;
var eye_width = 50;

//左目のenbとcenterとの距離
var eye_end_to_center = 50;
// 目と目の距離
var eye_to_eye = 70;
var eye_pos_y = chara_center_y - 50;
var eye_control_y = chara_center_y - 50;
var mouth_pos_y = chara_center_y + 50;
var mouth_control_y = chara_center_y + 50;

onload = function()
{
	CreateHead(head_num, chara_center_x, chara_center_y, head_big_radi);
	CreateMouth(chara_center_x - 100, mouth_pos_y, chara_center_x + 100, mouth_pos_y, mouth_control_y);
	CreateEye(chara_center_x - (eye_end_to_center + eye_width),	eye_pos_y, chara_center_x - eye_end_to_center, eye_pos_y, eye_control_y, eye_to_eye + eye_end_to_center);

};

function CreateEye(start_x, start_y, end_x, end_y, control_y, eye_width)
{
	// 目玉あり
	if(chara_center_y - 50/*初期値*/ < eye_control_y && eye_control_y <= 355/*悪いを10回押した*/)
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
	// ただの線
	if(eye_control_y <= chara_center_y - 50/*初期値*/)
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
	// 怒り目
	if(355/*悪いを10回押した*/ < eye_control_y)
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
	var radi_small = 150;//固定
	var radi_inside = 130;
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
	if(eye_control_y <= chara_center_y - 50/*初期値*/)
	{
		eye_control_y -= 3;
		eye_pos_y += 3
	}
	// 目玉あり
	if(chara_center_y - 50/*初期値*/ < eye_control_y && eye_control_y <= 355/*悪いを10回押した*/)
	{
		eye_control_y -= 3;
	}
	// 怒り目
	if(355/*悪いを10回押した*/ < eye_control_y)
	{
		eye_angle -= 1/16 * Math.PI;
		eye_control_y -= 3;
	}
	CleateCharacter();
}
function bad_eye()
{
	//ただの線
	if(eye_control_y <= chara_center_y - 50/*初期値*/)
	{
		eye_control_y += 3;
		eye_pos_y -= 3;
	}
	// 目玉あり
	if(chara_center_y - 50/*初期値*/ < eye_control_y && eye_control_y <= 355/*悪いを10回押した*/)
	{
		eye_control_y += 3;
	}
	// 怒り目
	if(355/*悪いを10回押した*/ < eye_control_y)
	{
		eye_angle += 1/16 * Math.PI;
		eye_control_y += 3;
	}
	CleateCharacter();
}
function good_head()
{
	head_num -= 1;
	head_big_radi -= 7;
	CleateCharacter();
}
function bad_head()
{
	head_num += 1;
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	CreateHead(head_num, chara_center_x, chara_center_y, head_big_radi);
	CreateMouth(chara_center_x - 100, mouth_pos_y, chara_center_x + 100, mouth_pos_y, mouth_control_y);
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
