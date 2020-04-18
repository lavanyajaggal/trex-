var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsgroup,cloudsimg
var op1,op2,op3,op4,op5,op6,obstaclegroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var game,gameOver,restartImage,restart;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudsimg = loadImage("cloud.png");
  op1 = loadImage("obstacle1.png");
  op2 = loadImage("obstacle2.png"); 
   op3 = loadImage("obstacle3.png");
   op4 = loadImage("obstacle4.png");
   op5 = loadImage("obstacle5.png");
   op6 = loadImage("obstacle6.png");
   game = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}
 
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trexcollide",trex_collided);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsgroup = new Group();
  obstaclegroup = new Group();
   gameOver = createSprite(300,153);
 restart = createSprite(300,165);
gameOver.addImage(game);
gameOver.scale = 0.5;
restart.addImage(restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(120);
  fill("black");
  text("Score: "+ score, 500, 50);
  //console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(World.frameRate/60);
    
   // if (count>0 && count%100 === 0){
   //   playSound("checkPoint.mp3");
  //  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log(trex.y);
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 161){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclegroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
     // playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trexcollide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
trex.collide(invisibleGround);
  
  drawSprites();
}
  function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
   obstaclegroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  }  

  
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,25,40,10);
    cloud.y = Math.round(random(20,40));
    cloud.addImage(cloudsimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round( random(1,6));
    switch(rand){
      case 1:obstacle.addImage(op1);
      break;
      case 2:obstacle.addImage(op2);
      break;
      case 3:obstacle.addImage(op3);
      break;
      case 4:obstacle.addImage(op4);
      break;
      case 5:obstacle.addImage(op5);
      break;
      case 6:obstacle.addImage(op6);
      break;
      default:break
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclegroup.add(obstacle);
  }
}