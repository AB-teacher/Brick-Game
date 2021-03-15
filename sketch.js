var canvas;
var brick, brickGrp;
var score = 0;
// Variables for images of bricks
var brickimg1;
var brickimg2;
var brickimg3;
var brickimg4;
var brickimg5;
var brickimg6;
var brickimg7;
var brickimg8;
var brickimg9;
var brickimg10;
var gameState = "serve";
var brickArr = [];
var lifeArr = [];
function preload() {
  // loading background image
  bg = loadImage("Images/bg.png");

  // loading UI images
  startImg = loadImage("Images/start.png");
  restartImg = loadImage("Images/restart.png");

  // loading paddle animation
  paddleanim = loadAnimation(
    "Images/NormalPaddle/paddle1.png",
    "Images/NormalPaddle/paddle2.png",
    "Images/NormalPaddle/paddle3.png"
  );
  bulletPanim = loadAnimation(
    "Images/BulletPaddle/bulletP1.png",
    "Images/BulletPaddle/bulletP2.png",
    "Images/BulletPaddle/bulletP3.png"
  );
  extendPanim = loadAnimation("Images/extendPaddle.png");

  // loading ball image
  ballimg = loadImage("Images/ball.png");

  // life pic
  lifeImg = loadImage("Images/life.png");

  // loading the bricks images
  brickimg1 = loadImage("Images/tiles/tile1.png");
  brickimg2 = loadImage("Images/tiles/tile2.png");
  brickimg3 = loadImage("Images/tiles/tile3.png");
  brickimg4 = loadImage("Images/tiles/tile4.png");
  brickimg5 = loadImage("Images/tiles/tile5.png");
  brickimg6 = loadImage("Images/tiles/tile6.png");
  brickimg7 = loadImage("Images/tiles/tile7.png");
  brickimg8 = loadImage("Images/tiles/tile8.png");
  brickimg9 = loadImage("Images/tiles/tile9.png");
  brickimg10 = loadImage("Images/tiles/tile10.png");

  // loading images for bullet power-up
  bulletPowerImg = loadImage("Images/power-ups/bulletpower.png");
  bulletImg = loadImage("Images/bullet.png");

  // loading images for extend power-up
  extendPowerImg = loadImage("Images/power-ups/extendpower.png");

  // loading images for fire power-up
  firePowerImg = loadImage("Images/power-ups/firepower.png");
  fireBall = loadAnimation(
    "Images/Fireball/fireball.png",
    "Images/Fireball/fireball1.png",
    "Images/Fireball/fireball.png"
  );

  // loading the sounds
  Pop = loadSound("Audio/pop.mp3");
  Bullet = loadSound("Audio/laser.mp3");
}

function setup(){
  canvas = createCanvas(windowWidth,windowHeight)

  // creating bricks
  //brickGrp = []
  brickGrp = createGroup();
  for(i= 80; i< windowWidth - 80; i +=120){
    for(j = 100; j < windowHeight/1.75; j+=100){
      brick = createSprite(i,j,30,20);
      addBrickImage();
      brickGrp.add(brick)
      brickArr.push(brick);
    }
  }

  // creating life image
  for(var count = 1;count < 6; count++) {
    life = createSprite(count*60, 40);
    life.addImage(lifeImg);
    life.scale = 0.4;
    lifeArr.push(life);
  }
  

  // creating UI sprites
  start = createSprite(windowWidth / 2, windowHeight  - 200);
  start.addImage(startImg);
  start.scale = 0.7;
  start.visible = true;

  restart = createSprite(windowWidth / 2, windowHeight - 100);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  restart.visible = false;

  // creating paddle and ball sprites
  paddle = createSprite(windowWidth / 2, windowHeight - 40);
  paddle.addAnimation("normal", paddleanim);
  paddle.addAnimation("bullet", bulletPanim);
  paddle.addAnimation("extend", extendPanim);
  paddle.scale = 0.3;

  ball = createSprite(windowWidth / 2, windowHeight- 150);
  ball.addImage(ballimg);
  ball.scale = 0.2;

  edges = createEdgeSprites();
}

function draw(){
  background("cyan");
  text("Score:" + score, width - 100,50);

  if (gameState === "serve"){
    start.visible = "true"
    if (mousePressedOver(start)){
      start.visible = false;
      ball.velocityX = -8;
      ball.velocityY = -9;
      gameState = "play";
    }

  }
  console.log("game state : " + gameState);
  if(gameState === "play"){
    console.log("game state : " + gameState);
    playGame();
  }
  drawSprites();

  if(gameState === "over"){
    while(brickArr.length >0){
      var clearBrick = brickArr.pop();
      clearBrick.destroy();
    }
    ball.visible = false;
    paddle.visible = false;
    textSize(30);
    text ("GAME OVER", width/2-40, height/2);
    
    

  }
  

  
}

function addBrickImage(){
  var number = Math.round(random(1,10));
   switch (number) {
    
      case 1:
        brick.addImage(brickimg1);
        break;
      case 2:
        brick.addImage(brickimg2);
        break;
      case 3:
        brick.addImage(brickimg3);
        break;
      case 4:
        brick.addImage(brickimg4);
        break;
      case 5:
        brick.addImage(brickimg5);
        break;
      case 6:
        brick.addImage(brickimg6);
        break;
      case 7:
        brick.addImage(brickimg7);
        break;
      case 8:
        brick.addImage(brickimg8);
        break;
      case 9:
        brick.addImage(brickimg9);
        break;
      case 10:
        brick.addImage(brickimg10);
        break;
      default:
        break;
    }
    brick.scale = 0.2

}

function playGame() {
  
  paddle.x = mouseX;
  
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(paddle);

  // traverse the bricks in brick group
  console.log(brickArr.length);
  for(var i =0; i< brickArr.length; i++){
    var selBrick = brickArr[i];
    if(selBrick != null && ball.isTouching(selBrick)){
      ball.bounceOff(selBrick);
      selBrick.destroy();
      //play sound
      score += 5;
      break;
    }
  }
  
      
    
  
  if(ball.y > height ){
    ball.x = windowWidth / 2;
    ball.y=  windowHeight- 150; 
    ball.velocityX = 0;
    ball.velocityY = 0;
    paddle.x = windowWidth / 2
    paddle.y =  windowHeight - 40;
    gameState = "serve";

    var lostLife = lifeArr.pop();
    lostLife.destroy();
    
  
    if(lifeArr.length === 0){
      gameState = "over";
      
      
    } 
  }
}