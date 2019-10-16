var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');
var head_num = 8;
var head_big_radi = 70;
var eye_control_y = 60;
var eye_pos_y = 60;
var eye_angle = 0;
var mouth_control_y = 100;
var mouth_pos_y = 100;

onload = function()
{
	CreateHead(ctx, head_num, 100, 80,head_big_radi);
	CreateMouth(ctx, 60, mouth_pos_y, 140, mouth_pos_y, 100, mouth_control_y);
	CreateEye(ctx, 70, eye_pos_y, 90, eye_pos_y, 80, eye_control_y, 40);
};

function CreateHead(context, n, dx, dy, radi_big)
{
	var angle_big = Math.PI / n;
	var angle_small = 1/6 + Math.PI / n;
	var radi_small = 40;

	context.beginPath();
	for(var i = 0; i < 2 * Math.PI; i += angle_big)
	{
		var big_x = Math.sin(i) * radi_big;
		var big_y = Math.cos(i) * radi_big;
		var small_x = Math.sin(1/6 + i) * radi_small;
		var small_y = Math.cos(1/6 + i) * radi_small;
		context.lineTo(big_x + dx,big_y + dy);
		context.lineTo(small_x + dx,small_y + dy);
	}
	context.fillStyle = "#f00";
	context.fill();
}
function CreateEye(context, start_x, start_y, end_x, end_y, control_x, control_y, eye_width)
{
	// 目玉あり
	if(60 < eye_control_y && eye_control_y < 72)
	{
		context.beginPath();
		//左目
		context.moveTo(start_x, start_y);
		context.quadraticCurveTo(control_x, control_y, end_x, end_y);
		//右目
		context.moveTo(start_x + eye_width, start_y);
		context.quadraticCurveTo(control_x + eye_width, control_y, end_x + eye_width, end_y);
		context.fillStyle = '#CCCCCC';
		context.fill();
		context.closePath();
	}
	// ただの線
	if(eye_control_y <= 60)
	{
		context.beginPath();
		//左目
		context.moveTo(start_x, start_y);
		context.quadraticCurveTo(control_x, control_y, end_x, end_y);
		//右目
		context.moveTo(start_x + eye_width, start_y);  // 始点まで移動
		context.quadraticCurveTo(control_x + eye_width, control_y, end_x + eye_width, end_y);
		context.strokeStyle = "Orange";
		context.lineWidth = 2;
		context.stroke();
	}
	// 怒り目
	if(72 <= eye_control_y)
	{
		//左目
		context.beginPath();
		context.arc(80, 50, 10, 1/16 * Math.PI + eye_angle, 17/16 * Math.PI + eye_angle, false);
		context.fillStyle = 'rgb(0, 0, 255)';
		context.fill();
		// 右目
		context.beginPath();
		context.arc(80 + eye_width, 50, 10, -1/16 * Math.PI - eye_angle, 15/16 * Math.PI - eye_angle, false);
		context.fillStyle = 'rgb(0, 0, 255)';
		context.fill();
	}
}
function CreateMouth(context, start_x, start_y, end_x, end_y, control_x, control_y)
{
	//control_yで口の開き具合
	context.beginPath();
	context.moveTo(start_x, start_y);
	context.quadraticCurveTo(control_x, control_y, end_x, end_y);
	context.strokeStyle = "Orange";
	context.lineWidth = 5;
	context.stroke();
}
function good_head()
{
	// head_num -= 1;
	head_big_radi -= 5;
	CleateCharacter();
}
function bad_head()
{
	head_num += 1;
	head_big_radi += 5;
	CleateCharacter();
	// if( 9 <= head_num)
	// {
	// 	head_num -= 2;
	// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// }
}


function good_eye()
{
	if(72 <= eye_control_y)
	{
		eye_angle -= 1/16 * Math.PI
	}
	eye_control_y -= 3;
	eye_pos_y += 3;
	CleateCharacter();
}
function bad_eye()
{
	if(72 <= eye_control_y)
	{
		eye_angle += 1/16 * Math.PI
	}
	eye_control_y += 3;
	eye_pos_y -= 3;
	CleateCharacter();
}
function good_mouth()
{
	mouth_control_y += 5;
	mouth_pos_y -=3;
	CleateCharacter();
}
function bad_mouth()
{
	mouth_control_y -= 5;
	mouth_pos_y +=3;
	CleateCharacter();
}

function CleateCharacter()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	CreateHead(ctx, head_num, 100, 80, head_big_radi);
	CreateMouth(ctx, 60, mouth_pos_y, 140, mouth_pos_y, 100, mouth_control_y);
	CreateEye(ctx, 70, eye_pos_y, 90, eye_pos_y, 80, eye_control_y, 40);
}
