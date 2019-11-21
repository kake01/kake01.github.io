//内部の変数 => パラメーターの変更はしない
var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');
var coordinate = 0;

//外部
var head_num = 8;
var color = ["#000000", "#f0f8ff", "#66FF99", "#FFFFFF"];
var head_count = [0,0,0,0];
var mouth_count = [0,0,0,0];
var eye_count = [0,0,0,0];

var scale = [1.3,1.3,2,1.4];

var original_chara_x = [200,500,700,200];
var original_chara_y = [475,500,400,200];

//元の位置に戻すのに使う
var chara_x = original_chara_x.slice(0, original_chara_x.length);
var chara_y = original_chara_y.slice(0, original_chara_y.length);

onload = function()
{
  CreateHead(head_num, chara_x, chara_y, 0, scale, color);
  CreateMouth(chara_x , chara_y, 0, scale);
  CreateEye(chara_x, chara_y, 0, scale);
  //
  setInterval("TimeUpDate()", 500);
};

function TimeUpDate()
{
  coordinate++;

  if(coordinate == 3)
  {
    for(var i = 0; i < head_count.length; i++)
    {
      chara_x[i] = original_chara_x[i];
      chara_y[i] = original_chara_y[i];
    }
    coordinate = 0;
  }
  if(coordinate == 2)
  {
    for(var i = 0; i < head_count.length; i++)
    {
      chara_x[i] =  original_chara_x[i] + Math.random(4) -2;
      chara_y[i] =  original_chara_y[i] + Math.random(4) -2;
    }
  }
  if(coordinate == 1)
  {
    for(var i = 0; i < head_count.length; i++)
    {
      chara_x[i] = original_chara_x[i] + Math.random(4) -2;
      chara_y[i] = original_chara_y[i] + Math.random(4) -2;
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  CreateHead(head_num, chara_x, chara_y, 0, scale, color);
  CreateMouth(chara_x , chara_y, 0, scale);
  CreateEye(chara_x, chara_y, 0, scale);
}

function CreateHead(n, dx, dy, counter, size, color)
{
  for(var i = 0; i < head_count.length; i++)
  {
    head_count[i] -= counter;
    var angle_big = Math.PI / n;
    var angle_small = 1/6 + Math.PI / n;
    var radi_small = 80 ;//固定
    var radi_inside = radi_small * size[i];//固定,引数で変化

    //良くなった場合
    if(head_count[i] <= -5)
    {
      var head_big_radi = radi_inside + 20 -5 * 3;
    }
    //悪くなった場合
    if(head_count[i] >= 5)
    {
      var head_big_radi = radi_inside + 20 + 5 * 3;
    }
    //それ以外での状態
    if(-5 < head_count[i] && head_count[i] < 5)
    {
      var head_big_radi = radi_inside + 20 + head_count[i] * 3;
    }

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

    //良いの上限
    if(7 <= eye_count[i])
    {
      //ゆがむy座標
      var eye_control_y = eye_center_y - 7 * 3 * size[i];
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
    //ただの線
    if(0 <= eye_count[i] && eye_count[i] < 7)
    {
      var eye_control_y = eye_center_y - eye_count[i] * 3 * size[i];
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
      var eye_control_y = eye_center_y - eye_count[i] * 3 * size[i];
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
      var eye_angle = Math.abs(10 + eye_count[i]);
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
    //悪いの上限
    if(eye_count[i] < -13)
    {
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
function CreateMouth(pos_x, pos_y, counter, size)
{
  for(var i= 0; i < mouth_count.length; i++)
  {
    mouth_count[i] += counter;
    var mouth_start_x = pos_x[i] - 45 * size[i];
    var mouth_end_x = pos_x[i] + 45 * size[i];
    var mouth_center_y = pos_y[i] + 25 * size[i];

    //良くなった場合
    if(mouth_count[i] <= -5)
    {
      var mouth_control_y = mouth_center_y - 5 * 10;
      //control_yで口の開き具合
      ctx.beginPath();
      ctx.moveTo(mouth_start_x, mouth_center_y);
      ctx.quadraticCurveTo(pos_x[i], mouth_control_y, mouth_end_x, mouth_center_y);
      ctx.strokeStyle = "Orange";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
    //悪くなった場合
    if(mouth_count[i] >= 5)
    {
      var mouth_control_y = mouth_center_y + 5 * 10;
      //control_yで口の開き具合
      ctx.beginPath();
      ctx.moveTo(mouth_start_x, mouth_center_y);
      ctx.quadraticCurveTo(pos_x[i], mouth_control_y, mouth_end_x, mouth_center_y);
      ctx.strokeStyle = "Orange";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
    // else
    if(-5 < mouth_count[i] && mouth_count[i] < 5)
    {
      var mouth_control_y = mouth_center_y + mouth_count[i] * 10;
      //control_yで口の開き具合
      ctx.beginPath();
      ctx.moveTo(mouth_start_x, mouth_center_y);
      ctx.quadraticCurveTo(pos_x[i], mouth_control_y, mouth_end_x, mouth_center_y);
      ctx.strokeStyle = "Orange";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }
}
function CleateCharacter(hed_counter, mouth_count, eye_count)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  CreateHead(head_num, chara_x, chara_y, hed_counter, scale, color);
  CreateMouth(chara_x , chara_y, mouth_count, scale);
  CreateEye(chara_x, chara_y, eye_count, scale);
}
function good_all()
{
  CleateCharacter(1, 1, 1);
}
function bad_all()
{
  CleateCharacter(-1, -1, -1);
}
document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  if(keyName == "a")
  {
    good_all();
  }
  if(keyName == "z")
  {
    bad_all();
  }
});
