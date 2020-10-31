var canvas,backgroundimg;
var gameState=0;
var playerCount,database,form,player,game;
var allPlayers; 
var distance=0;

var cars,car1,car2,car3,car4;
var car1Img,car2Img,car3Img,car4Img,groundImg,trackImg;
var sound;

function preload(){
    car1Img=loadImage("images/car1.png");
    car2Img=loadImage("images/car2.png");
    car3Img=loadImage("images/car3.png");
    car4Img=loadImage("images/car4.png");
    groundImg=loadImage("images/ground.png");
    trackImg=loadImage("images/track.jpg");

    sound=loadSound("audi+1.mp3");
    
}
function setup(){
    canvas=createCanvas(displayWidth-20,displayHeight-175);
    database=firebase.database();

    game=new Game();
    game.getState();
    game.start();
   
}
function draw(){
 if(playerCount==4){
     game.updateState(1);


 }
if(gameState==1){
    clear();
    game.play();
}
if(gameState==2){
    game.end();
}
}