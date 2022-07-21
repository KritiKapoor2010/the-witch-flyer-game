var bg, bgImg
var bottomGround
var topGround
var witch, witchImg
var  dangerGroup, danger1, danger2
var rewardGroup,  reward,reward1Img,reward2Img,reward3Img

var Play=1
var gameState=Play
var end=0
var score=0
var restartImg,gameOver
var gameOverImg, restart

function preload(){
bgImg = loadImage("assets/bg.png")
backgroundSound=loadSound("assets/BackgroundSound.mp3")
collectRewardSound=loadSound("assets/collect reward.wav")
dieSound = loadSound("assets/die.mp3");
witchImg = loadImage("assets/witch.png")

danger1 = loadImage("assets/danger.png");
 danger2 = loadImage("assets/danger2.png");
 
  restartImg=loadImage("assets/restart.png")
  gameOverImg=loadImage("assets/gameOver.png")
reward1Img=loadImage("assets/reward 1.png")
reward2Img=loadImage("assets/reward 2.png")

reward3Img=loadImage("assets/reward 3.png")
}


function setup(){
  createCanvas(windowWidth, windowHeight);
  

//background image
bg = createSprite(200,485,1,1);
bg.addImage(bgImg);
bg.scale =1.3



//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);

topGround.addImage(bgImg)
topGround.scale=1.5


      
//creating witch    
witch = createSprite(100,200,20,50);
witch.addImage(witchImg);
witch.scale = 0.2;

gameOver= createSprite(200,200)
gameOver.scale=1
gameOver.addImage(gameOverImg)
gameOver.visible=false


restart=createSprite(200,300)
restart.addImage(restartImg)
restart.visible= false


dangerGroup = new Group();
rewardGroup= new Group()



}

function spawnReward(){
  if(World.frameCount%60===0){
reward=createSprite(400,50)
reward.scale=0.3
reward.velocityX=-4
reward.y=Math.round(random(10,100))
var rand=Math.round(random(1,3))
switch(rand){
  case 1:reward.addImage(reward1Img)
  break;
  case 2:reward.addImage(reward2Img)
  break;
  case 3:reward.addImage(reward3Img)
  default:

}

reward.lifetime=100
rewardGroup.add(reward)


  }
}



function draw() {
 console.log(gameState) 
  background(bgImg);

  
if(gameState===Play){
  topGround.velocityX=-4
  if (topGround.x<0){
    topGround.x=700

  }
spawnReward()







  spawnObstacles()
  if(keyDown(UP_ARROW)){
    witch.y=witch.y-4}

    else if(keyDown(DOWN_ARROW)){
      witch.y=witch.y+4}
      if(witch.isTouching(dangerGroup)){
        gameState=end
        dieSound.play();
   
     }
}
if(gameState===end){
  gameOverF()
  gameOverImg.visible=true
  restart.visible=true


  if(mousePressedOver(restart)){
reset()
  }
}





        
        

          

             
        drawSprites();
Score()
    
        
}

function reset(){
 gameState=Play
 gameOver.visible=false
 restart.visible =false
 dangerGroup.destroyEach()
 score=0

}

function Score(){
  if(witch.isTouching(rewardGroup)){
   score+=1
   rewardGroup.destroyEach()
   collectRewardSound.play();
    

  }
  textSize(30)
  fill("purple")
  text("score:"+score,250,50)
}

//refer to spawnClouds from trex game
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var danger  = createSprite(600,height-95,20,30);
    danger.setCollider('circle',0,0,45)
    // danger.debug = true
  
    danger.velocityX = -6;
    danger.y=Math.round(random(height/2-50,height/2+400))
    
    //generate random danger
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: danger.addImage(danger1);
              break;
      case 2: danger.addImage(danger2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the danger         
    danger.scale = 0.3;
    danger.lifetime = 300;
    danger.depth = witch.depth;
    witch.depth +=1;
    //add each danger to the group
    dangerGroup.add(danger);
  }
}

function gameOverF(){
  topGround.velocityX=0
  dangerGroup.setVelocityXEach(0)
dangerGroup.destroyEach()
  
}












