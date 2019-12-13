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
//菌の色幅
var virus_color_width = 4;
var test_red_max = 255;
var test_red_min = 119;
var test_green_max = 136;
var test_green_min = 0;
var test_blue_max = 136;
var test_blue_min = 0;
var virus_red_max = 170;
var virus_red_min = 34;
var virus_green_max = 255;
var virus_green_min = 119;
var virus_blue_max = 204;
var virus_blue_min = 68;
var color = [];
var virus_rad = []
var virus_green = [];
var virus_blue = [];
var scale = [];
var thorns_num = 9;
var virus_count_width = 3;
//外部
//背景画像
var yest_virus_color = new Array(Math.floor((virus_red_max + virus_red_min) /2) ,Math.floor((virus_green_max + virus_green_min) /2) ,Math.floor((virus_blue_max + virus_blue_min) /2));
console.log("昨日の色" + yest_virus_color + "で16進数" + (yest_virus_color[0]).toString(16).slice(-2) + " , " + (yest_virus_color[1]).toString(16).slice(-2) + " , " + (yest_virus_color[2]).toString(16).slice(-2))
var yest_background = new Array(Math.floor((test_red_max + test_red_min) /2) ,Math.floor((test_green_max + test_green_min) /2) ,Math.floor((test_blue_max + test_blue_min) /2));
var yest_virus_num = 6;

var mission = 15;//0か5,10,15
var login = 5;//0か5
var bonus = 10;//0か10
// mission反映
var virus_num = ((15 - mission) * 3 + (5 - login) * 2 -  (10- bonus) / 7) / 8 + yest_virus_num;//5 ~ 156/*最低個数*/
// 背景色に関して
var background_red = Math.floor((mission + bonus * 3) / 10);
var background_green = Math.floor((mission + bonus * 3) / 10);
var background_blue = Math.floor((mission + bonus * 3) / 10);
var background_color = '#' + (yest_background[0] + background_red).toString(16).slice(-2) + (yest_background[1]).toString(16).slice(-2) + (yest_background[2]).toString(16).slice(-2);

for(var i = 0; i < virus_num; i++)
{
  chara_x.push(Math.random() * (max_x - min_x + 1) + min_x);
  chara_y.push(Math.random() * (max_y - min_y + 1) + min_y);
  scale.push(Math.random() + 1);

  /*プレイヤーによって違う*/
  var tt = (mission * 2 + login * 3 + bonus * 3) / 35;
  eye_count.push(Math.floor(tt + Math.random() * 4 - 2));//-13 ~ 7
  mouth_count.push(Math.floor((tt + Math.random() * 4 - 2) / 2));//-5 ~ 5
  head_count.push(Math.floor((tt + Math.random() * 4 - 2) / 2));//-5 ~ 5


























  // console.log((mission * 2 + bonus * 3) / 10);
  // console.log(Math.floor(Math.random() * (Math.floor(mission + bonus * 3) - virus_color_width + 1) + (Math.floo+r(mission + bonus * 3) - virus_color_width)));
  // console.log(Math.floor((Math.random() * (mission * 2 + bonus * 3 + virus_color_width + 1) + mission * 2+ bonus * 3 - virus_color_width)/ 10));
  //菌の色
  // virus_rad[i] = Math.floor(yest_virus_color[0] + Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
  // virus_green[i] = Math.floor(yest_virus_color[1] + Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
  // virus_blue[i] = Math.floor(yest_virus_color[2] + Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));

  // var test_today_color = yest_virus_color[i] + (mission * 2 + bonus * 3) / 10;
  virus_rad[i] = Math.floor(yest_virus_color[0] + (mission * 2 + bonus * 3) / 10 + Math.random() * 60 - 30);
  virus_green[i] = Math.floor(yest_virus_color[1] + (mission * 2 + bonus * 3) / 10 + Math.random() * 60 - 30);
  virus_blue[i]  = Math.floor(yest_virus_color[2] + (mission * 2 + bonus * 3) / 10 + Math.random() * 60 - 30);
  // virus_green[i] = Math.floor(Math.random()*((test_today_color +virus_color_width) -(test_today_color - virus_color_width))) + (test_today_color - virus_color_width);
  // virus_blue[i] = Math.floor(Math.random()*((test_today_color +virus_color_width) -(test_today_color - virus_color_width))) + (test_today_color - virus_color_width);


  //判定かく
  color[i] = ('#' + ('0' + (virus_rad[i]).toString(16)).slice(-2) + ('0' + (virus_green[i]).toString(16)).slice(-2) + ('0' + (virus_blue[i]).toString(16)).slice(-2));
  color[4] = "#000"
}
// console.log(virus_rad);
console.log(color);
// console.log(virus_rad + " " + virus_green + " " + virus_blue);



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
  background_red += Math.floor((mission + bonus * 3) / 10);
  background_green += Math.floor((mission + bonus * 3) / 10);
  background_blue += Math.floor((mission + bonus * 3) / 10);
  var back_red = background_red +  yest_background[0];
  var back_green = background_green +  yest_background[1];
  var back_blue = background_blue +  yest_background[2];

  if(back_red > test_red_max)
  {
    back_red = test_red_max;
  }
  if(back_green > test_green_max)
  {
    back_green = test_green_max;
  }
  if(back_blue > test_blue_max)
  {
    back_blue = test_blue_max;
  }
  background_color = '#' + ('0' + (back_red).toString(16)).slice(-2) + ('0' + (back_green).toString(16)).slice(-2) + ('0' + (back_blue).toString(16)).slice(-2);

  for(var i = 0; i < virus_num; i++)
  {

    virus_rad[i] += Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
    console.log(virus_rad[0]);
    // console.log(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
    virus_green[i] += Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
    virus_blue[i] += Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
    // console.log(virus_rad[i]);
    if(virus_rad[i] > virus_red_max){
      virus_rad[i] = virus_red_max;
    }
    if(virus_green[i] > virus_green_max){
      virus_green[i] = virus_green_max;
    }
    if(virus_blue[i] > virus_blue_max){
      virus_blue[i] = virus_blue_max;
    }
    color[i] = ('#' + ('0' + Math.floor(virus_rad[i]).toString(16)).slice(-2) + ('0' + Math.floor(virus_green[i]).toString(16)).slice(-2) + ('0' + Math.floor(virus_blue[i]).toString(16)).slice(-2));
  }
  console.log(color);
  Stomach(min_x, min_y, 600, 600, 100, background_color);
  CleateCharacter(0,0,0);
}
if(keyName == "x")
{
  background_red -= Math.floor((mission + bonus * 3) / 10);
  background_green -= Math.floor((mission + bonus * 3) / 10);
  background_blue -= Math.floor((mission + bonus * 3) / 10);
  var back_red = background_red + yest_background[0];
  var back_green = background_green +  yest_background[1];
  var back_blue = background_blue +  yest_background[2];
  if(back_red < test_red_min)
  {
    back_red = test_red_min;
  }
  if(back_green < test_green_min)
  {
    back_green = test_green_min;
  }
  if(back_blue < test_blue_min)
  {
    back_blue = test_blue_min;
  }
  background_color = '#' + ('0' + (back_red).toString(16)).slice(-2) + ('0' + (back_green).toString(16)).slice(-2) + ('0' + (back_blue).toString(16)).slice(-2);
  for(var i = 0; i < virus_num; i++)
  {
    virus_rad[i] -= Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
    virus_green[i] -= Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
    virus_blue[i] -= Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
    // console.log((Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
    if(virus_rad[i] < virus_red_min){
      virus_rad[i] = virus_red_min;
    }
    if(virus_green[i] < virus_green_min){
      virus_green[i] = virus_green_min;
    }
    if(virus_blue[i] < virus_blue_min){
      virus_blue[i] = virus_blue_min;
    }
    color[i] = ('#' + ('0' + (virus_rad[i]).toString(16)).slice(-2) + ('0' + (virus_green[i]).toString(16)).slice(-2) + ('0' + (virus_blue[i]).toString(16)).slice(-2));
    console.log(color[i]);
  }
  Stomach(min_x, min_y, 600, 600, 100, background_color);
}
});











onload = function()
{
  //  一日の目安量
  Stomach(min_x, min_y, 600, 600, 100, background_color);
  CreateHead(thorns_num, chara_x, chara_y, 0, scale, color);
  CreateMouth(chara_x , chara_y, 0, scale);
  CreateEye(chara_x, chara_y, 0, scale);
  setInterval("TimeUpDate()", 100);
};
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
