 var bg, bgImg, river, riverimg, boat, boatimg, invisibleWall;
 var obstacleA, obstacleB, obstaclesGroup;
 var invisibleBoat;
 var START = 2;
 var PLAY= 1;
 var END = 0;
 var gameState = START;

 var score = 0

 function preload(){
  bgImg = loadImage("bg.jpg");
  riverimg = loadImage("river.png")
  boatimg = loadImage("boat.png")
  obstacleA = loadImage("obstacleA.png");
  obstacleB = loadImage("obstacleB.png");
 }

 function setup(){
  createCanvas(1200, 600)

  river = createSprite(1200, -280, 600, 200);
  river.addImage(riverimg)
  river.scale = 7

  boat = createSprite(200, 500, 200, 100);
  boat.addImage(boatimg)
  boat.scale = 0.6

  invisibleBoat = createSprite(203.5, 510, 180, 10);
  invisibleBoat.visible = false;

  obstaclesGroup = new Group();

 }

 function draw(){
  background(bgImg)

  textSize(30)
  fill("black")
  text("Score: "+ score, 10, 30)
if(gameState === START){
  textSize(50)
  fill("red")
  text("Rainforest River Ride", 390, 50)
  textSize(40)
  text("Press P to Play", 480, 300)

  if(keyDown("p")){
    gameState = PLAY
  }
} else if(gameState === PLAY){
  
  score += 1;

  river.velocityX = -(6+score/20);

    if(river.x<0){
    river.x = 1200
  }

  spawnObstacles();

  if(keyDown("up")){
    boat.y = boat.y - 7;
    invisibleBoat.y = invisibleBoat.y - 7;
  }

  if(keyDown("down")){
    boat.y = boat.y + 7;
    invisibleBoat.y = invisibleBoat.y + 7;
  }

  if(boat.y < 400){
    boat.velocityY = 0;
  }

  if(obstaclesGroup.isTouching(invisibleBoat)){
    gameState= END;
  }
}else if(gameState === END){

  textSize(40)
  fill("red")
  text("Game Over", 510, 250)
  text("Score: "+ score, 525, 300)
  text("Press R to Restart", 450, 350)

  
  boat.velocityY= 0;
    river.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    if(keyDown("r")){
      reset();
   }
}

  drawSprites();

 }

 function reset(){

  score = 0;

  gameState = PLAY;
  obstaclesGroup.destroyEach();

  boat.x = 200
  invisibleBoat.x = 203.5
  boat.y = 500
  invisibleBoat.y = 510
}

 function spawnObstacles(){
  if(frameCount % 70 === 0){
  var obstacle = createSprite(1200,Math.round(random(460,560)),50,20);
  obstacle.velocityX = -7;
  
  var rand = Math.round(random(1,2));
  switch(rand){
    case 1: obstacle.addImage(obstacleA);
    break;
    case 2: obstacle.addImage(obstacleB);
    break;
    default: break;
  }
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}