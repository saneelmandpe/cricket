const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine;
var world;

var batsman, stumps ,umpire;
var ground,ground2,ground3,ground4,ground5,ground6,ground7;
var ball, sling;
var bowlerImg;

var stumps2;

var curtainImg,curtain;

var bgImg;
var score = 0;
var wickets = 0;
var MaxWickets = 10;

var gameState = "play";

function preload(){
bgImg = loadImage("stadium.jpg");
bowlerImg = loadImage("bowler.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
engine = Engine.create();
world = engine.world;

ground2  = new Ground2(700, 5, 1400, 5);
ground3  = new Ground2(275, 600, 5, 50);
ground4  = new Ground2(1150, 600, 5, 50);
ground5  = new Ground2(275, 600, 5, 50);
ground6  = new Ground2(75, 600, 5, 50);
ground3  = new Ground2(700, 620, 1400, 5);
ground   = new Ground(windowWidth/2, 600, windowWidth, 50);

batsman  = new Batsman(1200, 550, 65, 100);

umpire  = new Umpire(80, 550, 25, 100);

stumps   = new Wickets(1320, 525, 40, 150);
stumps2  = new wickets2(120, 525, 40, 150);

ball     = new Ball(200, 450, 20, 20);

sling    = new Sling(
  ball.body,
   {
  x: 240,
  y: 455
}
);
}


function draw() {
  background(bgImg);  

  fill("yellow");
  textSize(25);
  text("Runs: " + score, 50,150);
  text("Wickets: " + wickets, 50, 100);
  text("MAX WICKETS: " + MaxWickets, 50, 50);
  text("Press spacebar to get back ball.", 600, 50);
  text("Try to take 10 wickets.", 600, 100);
  text("Drag the ball to release.", 600, 150);
  

Engine.update(engine);

  ground.display();

  image(bowlerImg, 200, 400, 80, 200);

  batsman.display();

  stumps.display();
  stumps2.display();

  sling.display();

  ball.display();

  ground2.display();
  ground3.display();
  ground4.display();
  ground5.display();
  ground6.display();

  umpire.display();

detectcollision();
detectcollision2();

if(wickets >= MaxWickets){
gameState = "end";
textSize(80);
text("GAME OVER", 480, 300);
textSize(40);
text("Runs: "+ score, 640, 350);
text("Wickets: " + wickets, 640, 400);
}
}

function mouseDragged(){
  Matter.Body.setPosition(ball.body, {x: mouseX, y: mouseY});
}

function mouseReleased(){
sling.fly();
}

function detectcollision(){
var distance = dist(ball.body.position.x, ball.body.position.y, batsman.body.position.x, batsman.body.position.y);

if((distance <= ball.width + batsman.width) && ball.body.velocity.x > 20){
score = score + 1
}
}

function detectcollision2(){
  var distance = dist(ball.body.position.x, ball.body.position.y, stumps.body.position.x, stumps.body.position.y);
  
  if((distance < ball.width + stumps.width) && ball.body.velocity.x >5){
  wickets = wickets + 1;
  }
  }

  function keyPressed(){
    if(keyCode === 32){
      Matter.Body.setPosition(ball.body, {x: 240, y: 455});
      sling.attach(ball.body);
    }
  }
  