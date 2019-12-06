//TODO:
/*
*表情を消化率に合わせる
*/

//内部の変数 => パラメーターの変更はしない
var canvas = document.getElementById('rectangle');
var ctx = canvas.getContext('2d');
var eye_count = [];
var head_count = [];
var mouth_count = [];
var chara_x = [];
var chara_y = [];
// 菌の移動範囲
var move_value = 4;
var min_x = 100;
var max_x = 700;
var min_y = 150;
var max_y = 750;
var color = [];
var scale = [];
var thorns_num = 9;


//外部
var yest_background = new Array(192, 144, 80);
var yest_virus_color = 192;
var yest_virus_num = 6;
var yest_face = new Array(3, 0);


var mission = 15;//0か5,10,15
var login = 5;//0か5
var bonus = 10;//0か10
// mission反映
var virus_num = ((15 - mission) * 3 + (5 - login) * 2 -  (10- bonus) / 7) / 8 + yest_virus_num;//5 ~ 156/*最低個数*/

// 背景色に関して
var background_red = (mission + bonus * 3 ) / 9;
var background_green = (mission + bonus * 3 / 2) / 10;
var background_blue = (mission + bonus * 3) / 9;
var background_color = '#' + (yest_background[0]).toString(16).slice(-2) + (yest_background[1]).toString(16).slice(-2) + (yest_background[2]).toString(16).slice(-2);

for(var i = 0; i < virus_num; i++)
{
  chara_x.push(Math.random() * (max_x - min_x + 1) + min_x);
  chara_y.push(Math.random() * (max_y - min_y + 1) + min_y);
  scale.push(Math.random() + 1);

  /*プレイヤーによって違う*/
  // eye_count .push(0);  //-13 ~ 7
  // mouth_count.push(0); //-5 ~ 5
  // head_count.push(0);  //-5 ~ 5
  var test = Math.random() * (7 + 13 + 1) - 13;
  eye_count.push(test);//-13 ~ 7
  mouth_count.push(test / 2);//-5 ~ 5
  head_count.push(test / 2);//-5 ~ 5













  //菌の色
  var median = (mission + bonus * 3 / 7) / 10 + yest_virus_color;
  var width = 3;
  var virus_blue = Math.min(255, Math.random() * ((median + width) - (median - width) + 1) + (median - width));
  if(virus_blue < 0)
  {
    virus_blue = 0;
  }
  if(virus_blue > 255)
  {
    virus_blue = 255;
  }
  var virus_green =　Math.random() * ((448 - virus_blue + width) - (448 - virus_blue - width) + 1) + (448 - virus_blue - width);
  if(virus_green < 0)
  {
    virus_green = 0;
  }
  if(virus_green > 255)
  {
    virus_green = 255;
  }
  color.push('#ff' + (virus_green).toString(16).slice(-2) + (virus_blue).toString(16).slice(-2));
}

onload = function()
{
  //  一日の目安量
  Stomach(min_x, min_y, 600, 600, 100, background_color);
  CreateHead(thorns_num, chara_x, chara_y, 0, scale, color);
  CreateMouth(chara_x , chara_y, 0, scale);
  CreateEye(chara_x, chara_y, 0, scale);
  setInterval("TimeUpDate()", 100);
};

// デバッグ
document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  /*
  if(keyName == "a")
  {
  GoodAll();
}
if(keyName == "z")
{
BadAll();
}
*/
//mission消化率
if(keyName == "s")
{
  background_red += (mission + bonus * 3 ) / 9;
  var back_red = background_red +  yest_background[0];

  if(back_red > 255)
  {
    back_red = 255;
  }
  if(back_red < 144)
  {
    back_red = 144;
  }
  background_green -= (mission + bonus * 3 / 2) / 10;
  var back_green = background_green +  yest_background[1];
  if(back_green > 170)
  {
    back_green = 170;
  }
  if(back_green < 136)
  {
    back_green = 136;
  }
  background_blue += (mission + bonus * 3) / 9;
  var back_blue = background_blue +  yest_background[2];
  if(back_blue > 136)
  {
    back_blue = 136;
  }
  if(back_blue < 34)
  {
    back_blue = 34;
  }
  background_color = '#' + (back_red).toString(16).slice(-2) + (back_green).toString(16).slice(-2) + (back_blue).toString(16).slice(-2);
  console.log('#' + (back_red).toString(16).slice(-2) + (back_green).toString(16).slice(-2) + (back_blue).toString(16).slice(-2));
  Stomach(min_x, min_y, 600, 600, 100, background_color);
}

if(keyName == "x")
{
  background_red -= (mission + bonus * 3 ) / 9;
  var back_red = background_red +  yest_background[0];

  if(back_red > 255)
  {
    back_red = 255;
  }
  if(back_red < 144)
  {
    back_red = 144;
  }
  background_green += (mission + bonus * 3 / 2) / 10;
  var back_green = background_green +  yest_background[1];
  if(back_green > 170)
  {
    back_green = 170;
  }
  if(back_green < 136)
  {
    back_green = 136;
  }
  background_blue -= (mission + bonus * 3) / 9;
  var back_blue = background_blue +  yest_background[2];
  if(back_blue > 136)
  {
    back_blue = 136;
  }
  if(back_blue < 34)
  {
    back_blue = 34;
  }
  background_color = '#' + (back_red).toString(16).slice(-2) + (back_green).toString(16).slice(-2) + (back_blue).toString(16).slice(-2);
  console.log('#' + (back_red).toString(16).slice(-2) + (back_green).toString(16).slice(-2) + (back_blue).toString(16).slice(-2));
  Stomach(min_x, min_y, 600, 600, 100, background_color);
}


});







function CreateHead(n, dx, dy, counter, size, color)
{
  for(var i = 0; i < head_count.length; i++)
  {
    head_count[i] -= counter;
    var angle_big = Math.PI / n;
    var angle_small = 1/6 + Math.PI / n;
    var radi_small = 25 ;//固定
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
function CreateMouth(pos_x, pos_y, counter, size)
{
  for(var i = 0; i < mouth_count.length; i++)
  {
    mouth_count[i] += counter;
    var mouth_start_x = pos_x[i] - 20 * size[i];
    var mouth_end_x = pos_x[i] + 20 * size[i];
    var mouth_center_y = pos_y[i] + 10 * size[i];
    //良くなった場合
    if(mouth_count[i] <= -5)
    {
      var mouth_control_y = mouth_center_y - 5 * 3;
    }
    //悪くなった場合
    if(mouth_count[i] >= 5)
    {
      var mouth_control_y = mouth_center_y + 5 * 3;
    }
    if(-5 < mouth_count[i] && mouth_count[i] < 5)
    {
      var mouth_control_y = mouth_center_y + mouth_count[i] * 3;
    }
    ctx.beginPath();
    ctx.moveTo(mouth_start_x, mouth_center_y);
    ctx.quadraticCurveTo(pos_x[i], mouth_control_y, mouth_end_x, mouth_center_y);
    ctx.strokeStyle = "Orange";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}
function CreateEye(chara_center_x, chara_center_y, counter, size)
{
  for(var i = 0; i < eye_count.length; i++)
  {
    eye_count[i] += counter;
    //目の中央
    var eye_left_center_x = chara_center_x[i] - 10 * size[i];
    var eye_rigth_center_x = chara_center_x[i] + 10 * size[i];
    //目の長さ
    var eye_width = 7 * size[i];
    var eye_center_y = chara_center_y[i] - 10 * size[i];
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
      ctx.arc(eye_left_center_x, eye_center_y, 8 * size[i], 1/32*Math.PI * eye_angle, Math.PI + 1/32*Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
      //右目
      ctx.beginPath();
      ctx.arc(eye_rigth_center_x, eye_center_y, 8 * size[i], -1/32 * Math.PI * eye_angle, Math.PI - 1/32 * Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
    }
    //悪いの上限
    if(eye_count[i] < -13)
    {
      var eye_angle = Math.abs(10 - 13);
      //左目
      ctx.beginPath();
      ctx.arc(eye_left_center_x, eye_center_y, 8 * size[i], 1/32*Math.PI * eye_angle, Math.PI + 1/32*Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
      //右目
      ctx.beginPath();
      ctx.arc(eye_rigth_center_x, eye_center_y, 8 * size[i], -1/32 * Math.PI * eye_angle, Math.PI - 1/32 * Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
    }
  }
}
function TimeUpDate()
{
  for(var i = 0; i < head_count.length; i++)
  {
    chara_x[i] += Math.random() * move_value - move_value / 2;
    chara_y[i] += Math.random() * move_value - move_value / 2;

    //範囲外に出た場合の処理
    if(chara_x[i] <= min_x)
    {
      chara_x[i] = min_x + 2;
    }
    if(max_x <= chara_x[i])
    {
      chara_x[i] = max_x - 2;
    }
    if(chara_y[i] <= min_y)
    {
      chara_y[i] = min_y + 2;
    }
    if(max_y <= chara_y[i])
    {
      chara_y[i] = max_y - 2;
    }
  }
  CleateCharacter(0,0,0);
}
function Stomach(x,y,w,h,r,color)
{
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.moveTo(x,y + r);
  ctx.arc(x+r,y+h-r,r,Math.PI,Math.PI*0.5,true);
  ctx.arc(x+w-r,y+h-r,r,Math.PI*0.5,0,1);
  ctx.arc(x+w-r,y+r,r,0,Math.PI*1.5,1);
  ctx.arc(x+r,y+r,r,Math.PI*1.5,Math.PI,1);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //上下の四角
  ctx.beginPath();
  ctx.rect(550, 0, 150, 250);
  ctx.rect(100, 650, 150, 200);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
function CleateCharacter(hed_count, mouth_count, eye_count)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Stomach(min_x, min_y, 600, 600, 100, background_color);
  CreateHead(thorns_num, chara_x, chara_y, hed_count, scale, color);
  CreateMouth(chara_x , chara_y, mouth_count, scale);
  CreateEye(chara_x, chara_y, eye_count, scale);
}
function GoodAll()
{
  CleateCharacter(1, 1, 1);
}
function BadAll()
{
  CleateCharacter(-1, -1, -1);
}
