var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');

var head_count = 0;
var mouth_count = 0;
var eye_count = 0;
var head_num = 8;


var parameter = [
  //pos_x,pos_y,サイズの倍数,色
  [200, 475, 1, "#000000"],
  [500, 500, 1.3, "#f0f8ff"],
  [700, 400, 2, "#66FF99"]
]

// var test_x = new Array(200, 500);
// var test_y = new Array(475, 500);
// var head_size = new Array(1, 0.5);
// var head_color = new Array("#000000", "#f0f8ff");



onload = function()
{
  console.log(parameter[0][0]);
  for(var i = 0; i < parameter.length; i++)
  {
    CreateHead(head_num, parameter[i][0], parameter[i][1], head_count, parameter[i][2], parameter[i][3]);
    CreateMouth(parameter[i][0] , parameter[i][1], mouth_count, parameter[i][2]);
    CreateEye(parameter[i][0], parameter[i][1], eye_count, parameter[i][2]);
  }
};

function CreateHead(n, dx, dy, counter, size, color)
{
  head_count += counter
  var angle_big = Math.PI / n;
  var angle_small = 1/6 + Math.PI / n;
  var radi_small = 80 ;//固定
  var radi_inside = radi_small * size;//固定,引数で変化
  var head_big_radi = radi_inside + 20 + head_count;
  ctx.beginPath();
  for(var i = 0; i < 2 * Math.PI; i += angle_big)
  {
    var big_x = Math.sin(i) * head_big_radi;
    var big_y = Math.cos(i) * head_big_radi;
    var small_x = Math.sin(1/6 + i) * radi_inside;
    var small_y = Math.cos(1/6 + i) * radi_inside;
    ctx.lineTo(big_x + dx, big_y + dy);
    ctx.lineTo(small_x + dx, small_y + dy);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.arc( dx, dy, radi_small, 0, 2 * Math.PI, false);
}
function CreateMouth(chara_center_x, chara_center_y, counter, size)
{
  mouth_count += counter;
  var mouth_start_x = chara_center_x - 45 * size;
  var mouth_end_x = chara_center_x + 45 * size;
  var mouth_center_y = chara_center_y + 25 * size;
  var mouth_control_y = mouth_center_y + mouth_count;
  //control_yで口の開き具合
  ctx.beginPath();
  ctx.moveTo(mouth_start_x, mouth_center_y);
  ctx.quadraticCurveTo(chara_center_x, mouth_control_y, mouth_end_x, mouth_center_y);
  ctx.strokeStyle = "Orange";
  ctx.lineWidth = 5;
  ctx.stroke();
}
function CreateEye(chara_center_x, chara_center_y, counter, size)
{
  eye_count += counter;
  //目の中央
  var eye_left_center_x = chara_center_x - 40 * size;
  var eye_rigth_center_x = chara_center_x + 40 * size;
  //目の長さ
  var eye_width = 20 * size;
  var eye_center_y = chara_center_y - 25 * size;
  //左目の右目 start点,end点
  var eye_left_start_x = eye_left_center_x - eye_width;
  var eye_left_end_x = eye_left_center_x + eye_width;
  var eye_rigth_start_x = eye_rigth_center_x - eye_width;
  var eye_rigth_end_x = eye_rigth_center_x + eye_width;
  //ゆがむy座標
  var eye_control_y = eye_center_y - eye_count * 3 * size;

  //ただの線
  if(0 <= eye_count)
  {
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
  if(-10 < eye_count && eye_count < 0)
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
  if(eye_count <= -10)
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
}
function CleateCharacter(hed_counter, mouth_count, eye_count)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < parameter.length; i++)
  {
    CreateHead(head_num, parameter[i][0], parameter[i][1], hed_counter, parameter[i][2], parameter[i][3]);
    CreateMouth(parameter[i][0] , parameter[i][1], mouth_count, parameter[i][2]);
    CreateEye(parameter[i][0], parameter[i][1], eye_count, parameter[i][2]);
  }
}
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
