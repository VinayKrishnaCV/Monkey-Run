var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0,survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  //creating ground
  ground = createSprite(400,290,800,2);
  ground.velocityX = -4;
  
  //creating gorilla
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("mankey",monkey_running);
  monkey.scale = 0.1;
  
  //creating groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {
  //backround
  background(255);
  
  //making ground move
  if(ground.x < 0){
      ground.x = ground.width/2; 
  }
  //spawn obstacles
  spawnObstacles();
  
  //gravity
  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY + 1;
  console.log(frameCount);
  
  //making gorilla jump
  if(keyDown("space")&&monkey.y > 250){
    monkey.velocityY = -15;
  }
  
  //spawning food
  spawnFood();
  
  drawSprites();
  
  //displaying score and survival time
  stroke(1);
  textSize(20);
  fill(1);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
  stroke(255);
  fill(255);
  text("Score: "+ score,300,50)
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,270,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -4;
   
   obstacleGroup.add(obstacle)
 }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 3/400;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   FoodGroup.add(banana);
    }
}




