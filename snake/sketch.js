var quadSize = 600/30;
var x = y = 0;
var dir = 2;
var xFood = Math.floor((Math.random() * 29)) * (quadSize);
var yFood = Math.floor((Math.random() * 29)) * (quadSize);
var isEaten = true;
var tail = 0;
var prevx = [];
var prevy = [];

function setup() {
  //create Canvas
  var canvas = createCanvas(600, 600);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  //set framerate
  frameRate(15);
}

function draw() {

  background(0);
  stroke(255);
  fill(0, 255, 0);

  //snake
  moveSnake();
  resetSnake();
  //draw head of the snake
  rect(x, y, quadSize, quadSize, 2);

  //store position of snake
  prevx.unshift(x);
  prevy.unshift(y);
  //delete entries if more than 600
  deleteEntries(600);

  //draw tail
  drawTail(tail);

  //food
  if(eatFood()){
    xFood = Math.floor((Math.random() * 29)) * (quadSize);
    yFood = Math.floor((Math.random() * 29)) * (quadSize);
    tail += 1;

    //display score
    document.getElementById("score").innerHTML = "Score: " + tail;
  }
  createFood(xFood, yFood);

  console.log(tail);
}

//choose direction
function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    dir = 1;
  } else if (keyCode === RIGHT_ARROW) {
    dir = 2;
  } else if (keyCode === DOWN_ARROW) {
    dir = 3;
  } else if (keyCode === UP_ARROW) {
    dir = 4;
  }
}

//draws food
function createFood(xFood, yFood){
  push();
  fill(255, 0, 0);
  stroke(255);
  rect(xFood, yFood, quadSize, quadSize, 5);
  pop();
}

//resets snake if position out of bounds
function resetSnake(){
  //reset location of snake if out of bounds
  if(x > 600 - quadSize && dir == 2){
    x = 0;
  }
  if(y > 600 - quadSize && dir == 3){
    y = 0;
  }
  if(x < 0 && dir == 1){
    x = 600 - quadSize;
  }
  if(y < 0 && dir == 4){
    y = 600 - quadSize;
  }
}

//function to move the snake
//depending on dir
function moveSnake(){
  //move snake
  if(dir == 1){
    x -= quadSize;
  } else if (dir == 2) {
    x += quadSize;
  } else if (dir == 3) {
    y += quadSize;
  } else{
    y -= quadSize;
  }
}

//checks if snake pos == food pos
function eatFood(){
  if(xFood == x && yFood == y){
    return true;
  }
}

//deletes entries out of the position-array
//if amount is over 600
function deleteEntries(end){
  if(prevx > end){
    prevx.pop();
    prevy.pop();
  }
}

//draw the tail
function drawTail(tail){
  for(var i = 0; i < tail; i++){
    push();
    fill(100, 160, 0);
    rect(prevx[i], prevy[i], quadSize, quadSize, 2);
    pop();
  }
}

//TODO doesent work
function tailBite(tail){
  for(var j = 0; j < tail; j++){
    if(x == prevx[j] && y == prevy[j]){
      return true;
    }
  }
}
