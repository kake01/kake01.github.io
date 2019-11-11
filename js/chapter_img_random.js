var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');
var head_count = [0,0,0,0];
var mouth_count = [0,0,0,0];
var eye_count = [0,0,0,0];
var head_num = 8;
var chara_x = [200,500,700,200];
var chara_y = [475,500,400,200];
var scale = [1.3,1.3,2,1.4];
var color = ["#000000", "#f0f8ff", "#66FF99", "#FFFFFF"];

/*var parameter = [
//pos_x,pos_y,サイズの倍数,色
[200, 475, 1.3, "#000000"],
[500, 500, 1.3, "#f0f8ff"],
[700, 400, 2, "#66FF99"],
[200, 200, 1.4, "#FFFFFF"]
];*/

onload = function()
{

  // ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
  // ctx.fill();
  /*
  // for(var i = 0; i < parameter.length; i++)
  // {
  //   CreateHead(head_num, parameter[i][0], parameter[i][1], head_count, parameter[i][2], parameter[i][3]);
  //   CreateMouth(parameter[i][0] , parameter[i][1], mouth_count, parameter[i][2]);
  //   CreateEye(parameter[i][0], parameter[i][1], eye_count, parameter[i][2]);
  // }
  */
  CreateHead(head_num, chara_x, chara_y, 0, scale, color);
  CreateMouth(chara_x , chara_y, 0, scale);
  CreateEye(chara_x, chara_y, 0, scale);
};

function CreateHead(n, dx, dy, counter, size, color)
{
  for(var i = 0; i < head_count.length; i++)
  {
    head_count[i] += counter;
    var angle_big = Math.PI / n;
    var angle_small = 1/6 + Math.PI / n;
    var radi_small = 80 ;//固定
    var radi_inside = radi_small * size[i];//固定,引数で変化
    var head_big_radi = radi_inside + 20 + head_count[i];

    ctx.beginPath();
    for(var j = 0; j < 2 * Math.PI; j += angle_big)
    {
      var big_x = Math.sin(j) * head_big_radi;
      var big_y = Math.cos(j) * head_big_radi;
      var small_x = Math.sin(1/6 + j) * radi_inside;
      var small_y = Math.cos(1/6 + j) * radi_inside;
      ctx.lineTo(big_x + dx[i], big_y + dy[i]);
      ctx.lineTo(small_x + dx[i], small_y + dy[i]);
    }
    ctx.closePath();
    ctx.fillStyle = color[i];
    ctx.fill();
    ctx.arc(dx[j], dy[j], radi_small, 0, 2 * Math.PI, false);
  }
}
function CreateMouth(pos_x, pos_y, counter, size)
{
  for(var i= 0; i < mouth_count.length; i++)
  {
    mouth_count[i] += counter;
    var mouth_start_x = pos_x[i] - 45 * size[i];
    var mouth_end_x = pos_x[i] + 45 * size[i];
    var mouth_center_y = pos_y[i] + 25 * size[i];
    var mouth_control_y = mouth_center_y + mouth_count[i];
    //control_yで口の開き具合
    ctx.beginPath();
    ctx.moveTo(mouth_start_x, mouth_center_y);
    ctx.quadraticCurveTo(pos_x[i], mouth_control_y, mouth_end_x, mouth_center_y);
    ctx.strokeStyle = "Orange";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
}
function CreateEye(chara_center_x, chara_center_y, counter, size)
{
  for(var i = 0; i < eye_count.length; i++)
  {
    eye_count[i] += counter;
    //目の中央
    var eye_left_center_x = chara_center_x[i] - 40 * size[i];
    var eye_rigth_center_x = chara_center_x[i] + 40 * size[i];
    //目の長さ
    var eye_width = 20 * size[i];
    var eye_center_y = chara_center_y[i] - 25 * size[i];
    //左目の右目 start点,end点
    var eye_left_start_x = eye_left_center_x - eye_width;
    var eye_left_end_x = eye_left_center_x + eye_width;
    var eye_rigth_start_x = eye_rigth_center_x - eye_width;
    var eye_rigth_end_x = eye_rigth_center_x + eye_width;
    //ゆがむy座標
    var eye_control_y = eye_center_y - eye_count[i] * 3 * size[i];

    //ただの線
    if(0 <= eye_count[i])
    {
      console.log(234);
      ctx.beginPath();
      //左目
      ctx.moveTo(eye_left_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_left_center_x, eye_control_y, eye_left_end_x, eye_center_y);
      //右目
      ctx.moveTo(eye_rigth_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_rigth_center_x, eye_control_y, eye_rigth_end_x, eye_center_y);
      ctx.strokeStyle = "Orange";
      ctx.lineWidth = 2;
      ctx.stroke();
    }




    //目玉あり
    if(-10 < eye_count[i] && eye_count[i] < 0)
    {
      ctx.beginPath();
      //左目
      ctx.moveTo(eye_left_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_left_center_x, eye_control_y, eye_left_end_x, eye_center_y);
      //右目
      ctx.moveTo(eye_rigth_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_rigth_center_x, eye_control_y, eye_rigth_end_x, eye_center_y);
      ctx.fillStyle = '#CCCCCC';
      ctx.fill();
      ctx.closePath();
    }
    //怒り目
    if(-13 <= eye_count[i] && eye_count[i] <= -10)
    {
      var eye_angle = Math.abs(10 + eye_count);
      //左目
      ctx.beginPath();
      ctx.arc(eye_left_center_x, eye_center_y, 25, 1/32*Math.PI * eye_angle, Math.PI + 1/32*Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
      //右目
      ctx.beginPath();
      ctx.arc(eye_rigth_center_x, eye_center_y, 25, -1/32 * Math.PI * eye_angle, Math.PI - 1/32 * Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
    }
    if(eye_count[i] <= -13){
      var eye_angle = Math.abs(10 - 13);
      //左目
      ctx.beginPath();
      ctx.arc(eye_left_center_x, eye_center_y, 25, 1/32*Math.PI * eye_angle, Math.PI + 1/32*Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
      //右目
      ctx.beginPath();
      ctx.arc(eye_rigth_center_x, eye_center_y, 25, -1/32 * Math.PI * eye_angle, Math.PI - 1/32 * Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
    }
  }
}



function CleateCharacter(hed_counter, mouth_count, eye_count)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /*
  for (var i = 0; i < parameter.length; i++)
  {
  CreateHead(head_num, parameter[i][0], parameter[i][1], hed_counter, parameter[i][2], parameter[i][3]);
  CreateMouth(parameter[i][0] , parameter[i][1], mouth_count, parameter[i][2]);
  CreateEye(parameter[i][0], parameter[i][1], eye_count, parameter[i][2]);
}
*/
CreateHead(head_num, chara_x, chara_y, hed_counter, scale, color);
CreateMouth(chara_x , chara_y, mouth_count, scale);
CreateEye(chara_x, chara_y, eye_count, scale);
}

/*
function good_eye()
{
CleateCharacter(0, 0, 1);
}
function bad_eye()
{
CleateCharacter(0, 0, -1);
}
function good_head()
{
CleateCharacter(7, 0, 0);
}
function bad_head()
{
CleateCharacter(-7,0,0);
}
function good_mouth()
{
CleateCharacter(0, 4, 0);
}
function bad_mouth()
{
CleateCharacter(0, -4, 0);
}
*/
function good_all()
{
  CleateCharacter(-3, 4, 1);
}
function bad_all()
{
  CleateCharacter(3, -4, -1);
}
document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  /*
  if(keyName == "g")
  {
  good_head();
}
if(keyName == "b")
{
bad_head();
}
if(keyName == "h")
{
good_mouth();
}
if(keyName == "n")
{
bad_mouth();
}
if(keyName == "j")
{
good_eye();
}
if(keyName == "m")
{
bad_eye();
}
*/
if(keyName == "a")
{
  good_all();
}
if(keyName == "z")
{
  bad_all();
}
});
