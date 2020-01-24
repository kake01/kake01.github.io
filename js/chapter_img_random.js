// 目は2倍
var canvas
var ctx;
/*-------------------------
canvas関係
-----------------------------*/
var canvas_width;
var canvas_height;
/*-----------------------------
胃関係
------------------------------*/
var stomach_width;
var stomach_height;
var stomach_radius = 100;
/*--------------------------
菌関係
---------------------------*/
// 菌の移動範囲
var move_value = 4;
//菌の移動範囲
var min_x;
var max_x;
var min_y;
var max_y;
//菌の色幅
var virus_color_width = 4;
//菌の数
var virus_num_min = 3;
var virus_num_max = 50;
// 菌の角の数
var thorns_num = 9;
//菌の大きさ
var scale = [];
//菌の座標
var chara_x = [];
var chara_y = [];
// 菌の色の上限幅
var virus_red_max = 238;
var virus_green_max = 238;
var virus_blue_max = 102;
var virus_red_min = 84;
var virus_green_min = 34;
var virus_blue_min = 68;
// 菌の中央値
var virus_color_center = new Array(Math.floor((virus_red_max + virus_red_min) /2) ,Math.floor((virus_green_max + virus_green_min) /2) ,Math.floor((virus_blue_max + virus_blue_min) /2));
// 菌の今日の色が入る(rgb)
var virus_rad = []
var virus_green = [];
var virus_blue = [];
// 菌の口,目の色
var virus_parts_red = [];
var virus_parts_green =[];
var virus_parts_blue = [];
/*----------------------------
胃に関して
-------------------------------*/
//胃の色の上限幅
var back_red_max = 255;
var back_red_min = 119;
var back_green_max = 136;
var back_green_min = 0;
var back_blue_max = 136;
var back_blue_min = 0;
var background_color;
var back_color_center = new Array(Math.floor((back_red_max + back_red_min) /2) ,Math.floor((back_green_max + back_green_min) /2) ,Math.floor((back_blue_max + back_blue_min) /2));
// 菌の色が入る(rgb統合)
var color = [];
/*------------------------------
外部Railsの方で加える値?
-------------------------------*/
var test_virus_num_increase = 1;//一日の菌の増加する値
/*---------------------------
ミッション消化で変わる値
-----------------------------*/
//デイリーミッションポイント
var mission = 15;//0か5,10,15
var login = 5;//0か5
var bonus = 10;//0か10
// DBから複製と保管
var test_count = [];
var test_kin_num;
var test_kin_color;
var test_parts_color;




/*--------------------------
変更
----------------------------*/
var min_x;
var max_x;
var min_y;
var max_y;
var stomach_width;
var stomach_height;
/*--------------------------
変更終わり
----------------------------*/



//胃の描画作成
function Stomach(color)
{
  /*---------------------------------
  変更
  -------------------------------------*/
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.moveTo(min_x, min_y + stomach_radius);
  ctx.arc(min_x + stomach_radius, min_y + stomach_height - stomach_radius, stomach_radius ,Math.PI, Math.PI*0.5, true);
  ctx.arc(min_x + stomach_width - stomach_radius, min_y + stomach_height - stomach_radius, stomach_radius, Math.PI*0.5, 0, 1);
  ctx.arc(min_x + stomach_width - stomach_radius, min_y + stomach_radius, stomach_radius, 0, Math.PI*1.5, 1);
  ctx.arc(min_x + stomach_radius, min_y + stomach_radius, stomach_radius, Math.PI*1.5, Math.PI, 1);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //上下の四角
  ctx.beginPath();
  ctx.rect(canvas_width / 2, 0, stomach_width / 2, canvas_height * 3 / 10);
  ctx.rect(min_x, max_y - stomach_radius, stomach_width / 2, canvas_height * 4 / 10);
  ctx.closePath();
  ctx.fill();
  // 扇形の塗りつぶし
  ctx.beginPath();
  ctx.fillStyle = "#FFF2CC";
  ctx.moveTo(canvas_width / 2, 0);
  ctx.arc(canvas_width / 2, 0, canvas_height * 2 / 10, 0, Math.PI * 1 / 2, false);
  ctx.closePath();
  ctx.moveTo(canvas_width / 2, canvas_height);
  ctx.arc(canvas_width / 2, canvas_height, canvas_height * 2 / 10, Math.PI, -Math.PI* 1 / 2, false);
  ctx.closePath();
  ctx.fill();
  /*-------------------------------------------
  変更終わり
  --------------------------------------------*/
}
/*---------------------------------------------------------------------
function関係
---------------------------------------------------------------------*/
onload = function() {
  canvas = document.getElementById('rectangle');
  ctx = canvas.getContext('2d');
  /*--------------------------
  追加
  ---------------------------*/
  var parent_width = $('.characterTraining').width();
  // 親の横幅を縦の2 / 3倍
  $(".characterTraining").css({"height": parent_width * 4 / 5,});
  var parent_heigth = $('.characterTraining').height();
  $('#rectangle').attr('width', parent_width);
  $('#rectangle').attr('height', parent_heigth);
  canvas_width = canvas.width;
  canvas_height = canvas.height;
  stomach_width = canvas_width * 8 / 10;
  stomach_height = canvas_height * 6 / 10;
  min_x = canvas_width * 1 / 10;
  max_x = canvas_width * 9 / 10;
  min_y = canvas_height * 2 / 10;
  max_y = canvas_height * 8 / 10;
  /*--------------------------
  追加終わり
  ---------------------------*/
  $("#but").click(function() {
    console.log('クリックされました！');
    CreateCanvas(1,1,1);
  })
  CreateCanvas(50, 0, 0);
  setInterval("TimeUpDate()", 100);
};
//菌の微小の変化を描画
function TimeUpDate() {
  for(var i = 0; i < virus_num_max; i++) {
    chara_x[i] += Math.random() * move_value - move_value / 2;
    chara_y[i] += Math.random() * move_value - move_value / 2;
    //範囲外に出た場合の処理
    if(chara_x[i] <= min_x){
      chara_x[i] = min_x + 2;
    }
    if(max_x <= chara_x[i]){
      chara_x[i] = max_x - 2;
    }
    if(chara_y[i] <= min_y){
      chara_y[i] = min_y + 2;
    }
    if(max_y <= chara_y[i]){
      chara_y[i] = max_y - 2;
    }
  }
  CanvasDraw(test_kin_num, test_count, background_color);
}
// 胃,菌の描画を行う関数
function CreateCanvas(bacteria_number, bacteria_face, stomach_condition) {/*菌の数,顔の段階,胃の段階*/
  // 菌の表情をDBの値から更新& 複製する
  for(var i = 0; i < bacteria_number; i++) {
    chara_x[i] = Math.random() * (max_x - min_x + 1) + min_x;
    chara_y[i] = Math.random() * (max_y - min_y + 1) + min_y;
    scale[i] = Math.random() + 1;
    test_count[i] = Math.floor((bacteria_face + Math.random() * 4 - 2) / 2);//-5 ~ 5
    virus_rad[i] = Math.floor(virus_color_center[0] + bacteria_face * 15 + Math.random() * 60 - 30);
    virus_green[i] = Math.floor(virus_color_center[1] + bacteria_face * 20 + Math.random() * 60 - 30);
    virus_blue[i]  = Math.floor(virus_color_center[2] + bacteria_face * 3 + Math.random() * 60 - 30);
    virus_parts_red[i] = 255 - virus_rad[i];
    virus_parts_green[i] = 255 - virus_green[i];
    virus_parts_blue[i] = 255 - virus_blue[i];
    color[i] = ('#' + ('0' + (virus_rad[i]).toString(16)).slice(-2) + ('0' + (virus_green[i]).toString(16)).slice(-2) + ('0' + (virus_blue[i]).toString(16)).slice(-2));
  }
  test_kin_num = bacteria_number;
  background_color = '#' + (back_color_center[0] + stomach_condition * 11).toString(16).slice(-2) + (back_color_center[1] + stomach_condition * 1).toString(16).slice(-2) + (back_color_center[2] + stomach_condition * 1).toString(16).slice(-2);
  CanvasDraw(test_kin_num, test_count, background_color);
}
// 菌全体の描画
function CanvasDraw(bacteria_number, test_count, back_color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Stomach(back_color);
  CreateHead(bacteria_number, test_count);
  CreateMouth(bacteria_number, test_count);
  CreateEye(bacteria_number, test_count);
}
// 顔の描画作成
function CreateHead(bacteria_number, bacteria_face){
  for(var i = 0; i < bacteria_number; i++) {
    var angle_big = Math.PI / thorns_num;
    var angle_small = 1/6 + Math.PI / thorns_num;
    var radi_small = 25 ;//固定
    var radi_inside = radi_small * scale[i];//固定,引数で変化
    //ものすごく良くなった場合
    if(test_count[i] <= -5){
      var head_big_radi = radi_inside + 20 -5 * 3;
    }
    //ものすごく悪くなった場合
    if(test_count[i] >= 5){
      var head_big_radi = radi_inside + 20 + 5 * 3;
    }
    // それ以外での状態
    if(-5 < test_count[i] && test_count[i] < 5){
      var head_big_radi = radi_inside + 20 + test_count[i] * 3;
    }
    ctx.beginPath();
    for(var j = 0; j < 2 * Math.PI; j += angle_big){
      var big_x = Math.sin(j) * head_big_radi;
      var big_y = Math.cos(j) * head_big_radi;
      var small_x = Math.sin(1/6 + j) * radi_inside;
      var small_y = Math.cos(1/6 + j) * radi_inside;
      ctx.lineTo(big_x + chara_x[i], big_y + chara_y[i]);
      ctx.lineTo(small_x + chara_x[i], small_y + chara_y[i]);
    }
    ctx.closePath();
    ctx.fillStyle = color[i];
    ctx.fill();
    ctx.arc(chara_x[j], chara_y[j], radi_small, 0, 2 * Math.PI, false);
  }
}
// 口の描画作成
function CreateMouth(bacteria_number, counter){
  for(var i = 0; i < bacteria_number; i++){
    var mouth_start_x = chara_x[i] - 20 * scale[i];
    var mouth_end_x = chara_x[i] + 20 * scale[i];
    var mouth_center_y = chara_y[i] + 10 * scale[i];
    //良くなった場合
    if(test_count[i] <= -5){
      var mouth_control_y = mouth_center_y - 5 * 3;
    }
    //悪くなった場合
    if(test_count[i] >= 5){
      var mouth_control_y = mouth_center_y + 5 * 3;
    }
    if(-5 < test_count[i] && test_count[i] < 5){
      var mouth_control_y = mouth_center_y + test_count[i] * 3;
    }
    ctx.beginPath();
    ctx.moveTo(mouth_start_x, mouth_center_y);
    ctx.quadraticCurveTo(chara_x[i], mouth_control_y, mouth_end_x, mouth_center_y);
    ctx.strokeStyle = "#" + ('0' + (virus_parts_red[i]).toString(16)).slice(-2) + ('0' + (virus_parts_green[i]).toString(16)).slice(-2) + ('0' + (virus_parts_blue[i]).toString(16)).slice(-2);
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}
// 目の描画作成
function CreateEye(bacteria_number, counter){
  for(var i = 0; i < bacteria_number; i++){
    //目の中央
    var eye_left_center_x = chara_x[i] - 10 * scale[i];
    var eye_rigth_center_x = chara_x[i] + 10 * scale[i];
    //目の長さ
    var eye_width = 7 * scale[i];
    var eye_center_y = chara_y[i] - 10 * scale[i];
    //左目の右目 start点,end点
    var eye_left_start_x = eye_left_center_x - eye_width;
    var eye_left_end_x = eye_left_center_x + eye_width;
    var eye_rigth_start_x = eye_rigth_center_x - eye_width;
    var eye_rigth_end_x = eye_rigth_center_x + eye_width;
    //良いの上限
    if(7 <= test_count[i] * 2){
      //ゆがむy座標
      var eye_control_y = eye_center_y - 7 * 3 * scale[i];
      ctx.beginPath();
      //左目
      ctx.moveTo(eye_left_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_left_center_x, eye_control_y, eye_left_end_x, eye_center_y);
      //右目
      ctx.moveTo(eye_rigth_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_rigth_center_x, eye_control_y, eye_rigth_end_x, eye_center_y);
      ctx.strokeStyle = "#" + ('0' + (virus_parts_red[i]).toString(16)).slice(-2) + ('0' + (virus_parts_green[i]).toString(16)).slice(-2) + ('0' + (virus_parts_blue[i]).toString(16)).slice(-2);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    //ただの線
    if(0 <= test_count[i] * 2 && test_count[i] * 2 < 7){
      var eye_control_y = eye_center_y - test_count[i] * 2 * 3 * scale[i];
      ctx.beginPath();
      //左目
      ctx.moveTo(eye_left_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_left_center_x, eye_control_y, eye_left_end_x, eye_center_y);
      //右目
      ctx.moveTo(eye_rigth_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_rigth_center_x, eye_control_y, eye_rigth_end_x, eye_center_y);
      ctx.strokeStyle = "#" + ('0' + (virus_parts_red[i]).toString(16)).slice(-2) + ('0' + (virus_parts_green[i]).toString(16)).slice(-2) + ('0' + (virus_parts_blue[i]).toString(16)).slice(-2);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    //目玉あり
    if(-10 < test_count[i] * 2 && test_count[i] * 2 < 0){
      var eye_control_y = eye_center_y - test_count[i] * 2 * 3 * scale[i];
      ctx.beginPath();
      //左目
      ctx.moveTo(eye_left_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_left_center_x, eye_control_y, eye_left_end_x, eye_center_y);
      //右目
      ctx.moveTo(eye_rigth_start_x, eye_center_y);
      ctx.quadraticCurveTo(eye_rigth_center_x, eye_control_y, eye_rigth_end_x, eye_center_y);
      ctx.strokeStyle = "#" + ('0' + (virus_parts_red[i]).toString(16)).slice(-2) + ('0' + (virus_parts_green[i]).toString(16)).slice(-2) + ('0' + (virus_parts_blue[i]).toString(16)).slice(-2);
      ctx.fill();
      ctx.closePath();
    }
    //怒り目
    if(-13 <= test_count[i] * 2 && test_count[i] * 2 <= -10){
      var eye_angle = Math.abs(10 + test_count[i] * 2);
      //左目
      ctx.beginPath();
      ctx.arc(eye_left_center_x, eye_center_y, 8 * scale[i], 1/32*Math.PI * eye_angle, Math.PI + 1/32*Math.PI * eye_angle, false);
      ctx.strokeStyle = "#" + ('0' + (virus_parts_red[i]).toString(16)).slice(-2) + ('0' + (virus_parts_green[i]).toString(16)).slice(-2) + ('0' + (virus_parts_blue[i]).toString(16)).slice(-2);
      ctx.fill();
      //右目
      ctx.beginPath();
      ctx.arc(eye_rigth_center_x, eye_center_y, 8 * scale[i], -1/32 * Math.PI * eye_angle, Math.PI - 1/32 * Math.PI * eye_angle, false);
      ctx.strokeStyle = "#" + ('0' + (virus_parts_red[i]).toString(16)).slice(-2) + ('0' + (virus_parts_green[i]).toString(16)).slice(-2) + ('0' + (virus_parts_blue[i]).toString(16)).slice(-2);
      ctx.fill();
    }
    //悪いの上限
    if(test_count[i] * 2 < -13){
      var eye_angle = Math.abs(10 - 13);
      //左目
      ctx.beginPath();
      ctx.arc(eye_left_center_x, eye_center_y, 8 * scale[i], 1/32*Math.PI * eye_angle, Math.PI + 1/32*Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
      //右目
      ctx.beginPath();
      ctx.arc(eye_rigth_center_x, eye_center_y, 8 * scale[i], -1/32 * Math.PI * eye_angle, Math.PI - 1/32 * Math.PI * eye_angle, false);
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fill();
    }
  }
}
