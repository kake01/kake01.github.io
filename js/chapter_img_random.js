var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');
var head_num = 9;
var mouth_control_y = 120;
var eye_control_y = 60;

onload = function()
{
	CreateHead(ctx, 21, 100, 80, 70);
	CreateMouth(ctx, 60, 110, 140, 110, 100, 120);
	CreateEye(ctx, 60, 50, 90, 50, 80, 60, 50);
};

function CreateEye(context, start_x, start_y, end_x, end_y, control_x, control_y, eye_width)
{
	context.beginPath();
	//左目
	context.moveTo(start_x, start_y);  // 始点まで移動
	context.quadraticCurveTo(control_x, control_y, end_x, end_y);   // 2次ベジュ曲線を描画
	//右目
	context.moveTo(start_x + eye_width, start_y);  // 始点まで移動
	context.quadraticCurveTo(control_x + eye_width, control_y, end_x + eye_width, end_y);   // 2次ベジュ曲線を描画
	context.strokeStyle = "Orange";  // 線の色
	context.lineWidth = 2;           // 線の太さ
	context.stroke();
}
function CreateHead(context, n, dx, dy, size)
{
	/*nは奇数、N角星 :dx,dyは座標: sizeは大きさ*/
	context.beginPath();
	var dig = Math.PI / n * 4;
	for(var i = 0; i < n ; i++)
	{
		var x = Math.sin(i * dig);
		var y = Math.cos(i * dig);
		context.lineTo(x * size + dx, y * size + dy);
	}
	context.closePath();
	context.fillStyle = "#f00";
	context.fill();
}
function CreateMouth(context, start_x, start_y, end_x, end_y, control_x, control_y)
{
	//control_yで口の開き具合
	context.beginPath();
	context.moveTo(start_x, start_y);  // 始点まで移動
	context.quadraticCurveTo(control_x, control_y, end_x, end_y);   // 2次ベジュ曲線を描画
	context.strokeStyle = "Orange";  // 線の色
	context.lineWidth = 5;           // 線の太さ
	context.stroke();
}

function bad_head()
{
	if( 9 <= head_num)
	{
		head_num -= 2;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		CleateCharacter();
	}
}
function good_head()
{
	head_num += 2;
	CleateCharacter();
}

function bad_mouth(){
	mouth_control_y -= 5;
	CleateCharacter();
}
function good_mouth()
{
	mouth_control_y += 5;
	CleateCharacter();
}
function good_eye()
{
	eye_control_y -= 5;
	CleateCharacter();
}
function bad_eye()
{
	eye_control_y += 5;
	CleateCharacter();
}



function CleateCharacter()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	CreateHead(ctx, head_num, 100, 80, 70);
	CreateMouth(ctx, 60, 110, 140, 110, 100, mouth_control_y);
	CreateEye(ctx, 60, 50, 90, 50, 80, eye_control_y, 50);
}
