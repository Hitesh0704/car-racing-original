class Game {
   constructor(){
   }
getState(){
  var gameStateRefer=database.ref("gameState");
  gameStateRefer.on("value",function(data){
      gameState=data.val();
  })
}
updateState(state){
    database.ref("/").update({
        gameState:state
    })
}
async start(){
    if(gameState==0){
        player=new Player();
        var playerCountrefer=await database.ref("playerCount").once("value");
        if(playerCountrefer.exists()){
          playerCount=playerCountrefer.val();
           player.getCount();
        }
       
        form=new Form();
        form.display();
    }

    car1=createSprite(100,200);
    car1.addImage("car1",car1Img);

    car2=createSprite(300,200);
    car2.addImage("car2",car2Img);
    
    car3=createSprite(500,200);
    car3.addImage("car3",car3Img);

    car4=createSprite(700,200);
    car4.addImage("car4",car4Img);

    cars=[car1,car2,car3,car4];

}
play(){
    form.hide();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    sound.play();

    if(allPlayers !==undefined){
        var index=0;
        var x=175;
        var y=0;
        background(groundImg);
        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
        for(var plr in allPlayers){
            index=index+1;
            x=x+200;
            y=displayHeight-allPlayers[plr].distance;
            cars[index-1].x=x;
            cars[index-1].y=y;

            if(index== player.index){
               stroke(10);
               fill("red");
               ellipse(x,y,60,60);  
              cars[index-1].shapeColor="red"; 
              camera.position.x=displayWidth/2;
              camera.position.y=cars[index-1].y;
            }   
            
        }
    }
    if(keyIsDown(UP_ARROW)&& player.index!==null){
        player.distance+=50;
        player.update();
    }
    if(player.distance>3860){
        player.rank+=1;
        Player.updateCarsAtEnd(player.rank); 
        gameState=2;
    }
    drawSprites();
}
end(){
    var title=createElement("h1");
    title.html("Game Ended");
    title.position(displayWidth/2,250);
    var title2=createElement("h2");
    title2.html("Player's Rank : "+player.rank);
    title2.position(200,300);
    sound.stop();
}
}