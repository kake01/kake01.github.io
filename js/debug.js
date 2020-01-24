// 更新?
// 背景色は2減衰

virus_num += Math.floor(test_virus_num_increase + ((15 - mission) * 6 / 5 + (5 - login) * 8 / 5 - bonus * 3 ) / 25);
//背景に関して
background_red += Math.floor((mission + bonus * 3) / 10);
background_green += Math.floor((mission + bonus * 3) / 10);
background_blue += Math.floor((mission + bonus * 3) / 10);
var back_red = background_red +  yest_background[0];
var back_green = background_green +  yest_background[1];
var back_blue = background_blue +  yest_background[2];
if(back_red > back_red_max)
{
  back_red = back_red_max;
}
if(back_green > back_green_max)
{
  back_green = back_green_max;
}
if(back_blue > back_blue_max)
{
  back_blue = back_blue_max;
}
background_color = '#' + ('0' + (back_red).toString(16)).slice(-2) + ('0' + (back_green).toString(16)).slice(-2) + ('0' + (back_blue).toString(16)).slice(-2);
//菌の色に関して
for(var i = 0; i < virus_num; i++)
{
  virus_rad[i] += Math.floor(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
  virus_green[i] += Math.floor(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
  virus_blue[i] -= Math.floor(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
  if(virus_rad[i] > virus_red_max){
    virus_rad[i] = virus_red_max;
  }
  if(virus_green[i] > virus_green_max){
    virus_green[i] = virus_green_max;
  }
  if(virus_blue[i] < virus_blue_min){
    virus_blue[i] = virus_blue_min;
  }
  parts_red[i] = 255 - virus_rad[i];
  parts_green[i] = 255 - virus_green[i];
  parts_blue[i] = 255 - virus_blue[i];
  color[i] = ('#' + ('0' + Math.floor(virus_rad[i]).toString(16)).slice(-2) + ('0' + Math.floor(virus_green[i]).toString(16)).slice(-2) + ('0' + Math.floor(virus_blue[i]).toString(16)).slice(-2));
}








/**/
// デバッグ
document.addEventListener('keydown', (event) =>
{
  var keyName = event.key;
  // 良くなる場合
  if(keyName == "s")
  {
    //菌の数に関して
    virus_num += Math.floor(test_virus_num_increase + ((15 - mission) * 6 / 5 + (5 - login) * 8 / 5 - bonus * 3 ) / 25);
    if(virus_num < virus_num_min){
      virus_num = virus_num_min;
    }
    //背景に関して
    background_red += Math.floor((mission + bonus * 3) / 10);
    background_green += Math.floor((mission + bonus * 3) / 10);
    background_blue += Math.floor((mission + bonus * 3) / 10);
    var back_red = background_red +  yest_background[0];
    var back_green = background_green +  yest_background[1];
    var back_blue = background_blue +  yest_background[2];
    if(back_red > back_red_max)
    {
      back_red = back_red_max;
    }
    if(back_green > back_green_max)
    {
      back_green = back_green_max;
    }
    if(back_blue > back_blue_max)
    {
      back_blue = back_blue_max;
    }
    background_color = '#' + ('0' + (back_red).toString(16)).slice(-2) + ('0' + (back_green).toString(16)).slice(-2) + ('0' + (back_blue).toString(16)).slice(-2);
    //菌の色に関して
    for(var i = 0; i < virus_num; i++)
    {
      virus_rad[i] += Math.floor(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
      virus_green[i] += Math.floor(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
      virus_blue[i] -= Math.floor(Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width));
      if(virus_rad[i] > virus_red_max){
        virus_rad[i] = virus_red_max;
      }
      if(virus_green[i] > virus_green_max){
        virus_green[i] = virus_green_max;
      }
      if(virus_blue[i] < virus_blue_min){
        virus_blue[i] = virus_blue_min;
      }
      parts_red[i] = 255 - virus_rad[i];
      parts_green[i] = 255 - virus_green[i];
      parts_blue[i] = 255 - virus_blue[i];
      color[i] = ('#' + ('0' + Math.floor(virus_rad[i]).toString(16)).slice(-2) + ('0' + Math.floor(virus_green[i]).toString(16)).slice(-2) + ('0' + Math.floor(virus_blue[i]).toString(16)).slice(-2));
    }
    Stomach(min_x, min_y, 600, 600, 100, background_color);
    CleateCharacter(1, 1, 1);
  }
  if(keyName == "x")
  {
    //菌の数に関して
    virus_num += Math.floor(test_virus_num_increase + ((15 - mission) * 6 / 5 + (5 - login) * 8 / 5 - bonus * 3 ) / 25);
    if(virus_num > virus_num_max)
    {
      virus_num = virus_num_max;
    }
    //背景に関して
    background_red -= Math.floor((mission + bonus * 3) / 10);
    background_green -= Math.floor((mission + bonus * 3) / 10);
    background_blue -= Math.floor((mission + bonus * 3) / 10);
    var back_red = background_red + yest_background[0];
    var back_green = background_green +  yest_background[1];
    var back_blue = background_blue +  yest_background[2];
    if(back_red < back_red_min)
    {
      back_red = back_red_min;
    }
    if(back_green < back_green_min)
    {
      back_green = back_green_min;
    }
    if(back_blue < back_blue_min)
    {
      back_blue = back_blue_min;
    }
    background_color = '#' + ('0' + (back_red).toString(16)).slice(-2) + ('0' + (back_green).toString(16)).slice(-2) + ('0' + (back_blue).toString(16)).slice(-2);
    //菌の色に関して
    for(var i = 0; i < virus_num; i++)
    {
      virus_rad[i] += Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
      virus_green[i] += Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
      virus_blue[i] -= Math.random() * (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width + 1) + (Math.floor((mission + bonus * 3 ) / 9) - virus_color_width);
      if(virus_rad[i] < virus_red_min){
        virus_rad[i] = virus_red_min;
      }
      if(virus_green[i] < virus_green_min){
        virus_green[i] = virus_green_min;
      }
      if(virus_blue[i] > virus_blue_max){
        virus_blue[i] = virus_blue_max;
      }
      parts_red[i] = 255 - virus_rad[i];
      parts_green[i] = 255 - virus_green[i];
      parts_blue[i] = 255 - virus_blue[i];
      color[i] = ('#' + ('0' + (virus_rad[i]).toString(16)).slice(-2) + ('0' + (virus_green[i]).toString(16)).slice(-2) + ('0' + (virus_blue[i]).toString(16)).slice(-2));
    }
    Stomach(min_x, min_y, 600, 600, 100, background_color);
    CleateCharacter(-1, -1, -1);
  }
});
