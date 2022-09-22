var PLAY=1,END=0,gameState=PLAY;
var ground, groundImage,invisibleGround , trex ,trex_running, cloud, cloudImg, obstacle, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score,gameOver,gameOverImg,restart,restartImg,trex_collided,jumpSound,dieSound,checkpointSound;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png")
  cloudImg=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  trex_collided=loadImage("trex_collided.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  trex=createSprite(50,windowHeight-90,20,50);
  trex.addAnimation("runing",trex_running);
 trex.x=50;
 trex.scale = 0.5
  ground=createSprite(windowWidth/2,windowHeight,1200,10);
  ground.addImage("ground",groundImage)
  invisibleGround=createSprite(300,windowHeight+17,600,40)
  invisibleGround.visible= false
  gameOver=createSprite(windowWidth/2,windowHeight/2-20,400,20);
  gameOver.addImage(gameOverImg)
  restart=createSprite(windowWidth/2,windowHeight/2+20);
  restart.addImage(restartImg);
  trex.addAnimation("colidido",trex_collided);
  obstaclesGroup = new Group();
  cloudsGroup= new Group();
  score=0;
  trex.debug=true;
}
 
function draw(){
  background("white")   
  text ("pontuação: " + score, 20,30);
   
  if(gameState === PLAY) { 
    if(score>0 && score%100===0){
    checkpointSound.play();

    }
    spawnClouds();
    spawnObstacles();
    ground.velocityX = -(5+2*score/100);
    score=score+ Math.round(getFrameRate()/60);
    gameOver.visible=false;
    restart.visible=false;
    trex.velocityY = trex.velocityY +0.5;

    if(score>1100){
      ground.velocityX= -27
      obstaclesGroup.velocityX= -27
      cloudsGroup.velocityX=16
    }
  
    if(touches.length>0||keyDown("space")&& trex.y>=windowHeight-32){
      trex.velocityY = -8 ;
      jumpSound.play();
      touches=[];
    }
   
    if (ground.x < 0){
    ground.x = ground.width/2
    }
               
 
    if(obstaclesGroup.isTouching(trex)){ 
      gameState=END
      dieSound.play();
}}  
else if(gameState===END){   
  trex.changeAnimation("colidido",trex_collided)
  trex.velocityY = trex.velocityY = 0;
  ground.velocityX= 0 
  gameOver.visible=true
  restart.visible=true
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityYEach(0)
  obstaclesGroup.setLifetimeEach (-1)
  cloudsGroup.setLifetimeEach (-1)
  if(mousePressedOver(restart)){
    reset()
  }
}   



  trex.collide(invisibleGround)
  
  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("runing",trex_running)
  score=0
}
    
function spawnClouds() {
  if(frameCount % 60 === 0  ){
cloud= createSprite (windowWidth,100,40,10);
cloud.addImage(cloudImg);
cloud.velocityX= -(5 + score/100);
cloud.y = Math.round(random(100,220))
cloud.depth=trex.depth;
trex.depth= trex.depth+1;
cloud.lifetime= 500
cloudsGroup.add(cloud)
}}

function spawnObstacles(){
  if(frameCount % 60 === 0  ){
obstacle= createSprite(windowWidth,windowHeight-20,10,40);
obstacle.velocityX= -(5+2*score/100) ;
var rand = Math.round(random(1,6));
switch(rand){
case 1: obstacle.addImage(obstacle1);
break;
case 2: obstacle.addImage(obstacle2);
break;
case 3: obstacle.addImage(obstacle3);
break;
case 4: obstacle.addImage(obstacle4);
break;
case 5: obstacle.addImage(obstacle5);
break;
case 6: obstacle.addImage(obstacle6);
default:break;
}
obstacle.lifetime=300
obstacle.scale=0.5
obstaclesGroup.add(obstacle)
}}