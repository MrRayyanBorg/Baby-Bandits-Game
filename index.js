//ground
var groundY = 350;
//player on right
var playerX = 140;
var playerY = 100;
var playerWidth = 35;
var playerHeight = 35;
var playerSpeedY = 0;
var playerSpeedX = 5;
var jumping = false;
//player on left
var playerX2 = 115;
var playerY2 = 100;
var playerWidth2 = 35;
var playerHeight2 = 35;
var playerSpeedY2 = 0;
var playerSpeedX2 = 5;
var jumping2 = false;
//menu
var menu = true;
var singleplayer = false;
var multiplayer = false;
var menuMusic;
var menuMusicFade = 5.0;
var mumX = 300;
var mumY = 355;
var mumWidth = 100;
var mumHeight = 100;
//obstacles
var obWidth = 20;
var obHeight = -20;
var obX = 600;
var obY = groundY;
var obSpeedX = 1;
var obstacleCollision = true;
var warden;
//backgrounds
var singleplayerlose = false;
var player1winScreen = false;
var player2winScreen = false;
var min = 20;
var max = 80;
//score
var score = 0;
var scoreOn = false;
var scoreCounter = 0.3;
var staticScore = 0;
var starY = 30;
var starY2 = 30;
var starY3 = 30;
var starY4 = 30;
var starY5 = 30;
var starX = 600;
var starX2 = 700;
var starX3 = 800;
var starX4 = 900;
var starX5 = 1000;
//sound
var gameMusicVolume = 5;
var menuMusicVolume = 2
var gameMusic;
var gameMusicFade = 1.0
var scrollSpeed;
var x1 = 0;
var x2 = 1280;
var x3 = 2560;
var x4 = 3840;
var r = 0;
var g = 0;
var b = 0;
var lineThickness;
var whitebaby;
var whitebabyImage;
var blackbaby;
var blackbabyImage;
var mother;
var motherImage;
var gameBackground1;
var gameBackground2;
var gameBackground3;
var gameBackground4;
var babies = []; 
var myFont;
//only allow jumping if the player is not already jumping
function preload() {
  soundFormats('wav');
  gameMusic = loadSound('Assets/IngameMusic.wav');
  menuMusic = loadSound('Assets/MenuMusic.wav')
  gameBackground1 = loadImage('Assets/NightCity1.png')
  gameBackground2 = loadImage('Assets/FlatNight1.png')
  gameBackground3 = loadImage('Assets/NightCity2.png')
  gameBackground4 = loadImage('Assets/FlatNight2.png')
  myFont = loadFont('Assets/AdaFont.ttf');

}
function setup() {
  fireFrame1 = loadImage('Assets/firewall/firewall000.png')
  pistol = loadImage('Assets/pistol.png')
  knife = loadImage('Assets/knife.png')
  bow = loadImage('Assets/bow.png')
  createCanvas(600, 400);
  whitebabyImage = loadImage('Assets/whitebaby.png')
  blackbabyImage = loadImage('Assets/blackbaby.png')
  mixedbabyImage = loadImage('Assets/mixedbaby.png')
  wardenImage = loadImage('Assets/warden.png')
  motherImage = loadImage('Assets/Mother.png')
  menuMusic.loop()
  gameMusic.loop()
  for (var B=0; B<100; B++) {
    babies.push(new Jitter());
  }
 
  //collsion between sprites
  //doctor.setCollider("circle",playerX,playerY,25)
}

function draw() {
  menuMusic.rate(1)
  //background
  background(0);

  
  image(gameBackground1, x1, -200);
  image(gameBackground2, x2, -290);
  image(gameBackground3, x3, -200);
  image(gameBackground4, x4, -275);
  

  x1 -= 1
  x2 -= 1
  x3 -= 1
  x4 -= 1
  //image(gameBackground,x2,0,width,height);
  //sound
  gameMusic.setVolume(gameMusicVolume,gameMusicFade)
  menuMusic.setVolume(menuMusicVolume,menuMusicFade)
  //gameMusic.setVolume(slider.value());
  //score
  stroke(0);
  strokeWeight(2)
  fill(0,255,0)
  if (scoreOn === true) {
    score += scoreCounter;
    text('Score: ' + Math.floor(score), width - (width / 8), 20);
  } else {
    score += scoreCounter;
  }


  //draw the ground
  //pavement top
  /*fill(200);
  rect(-1, groundY - 7, 2000, groundY - 7);
  //pavement bottom
  stroke(0)
  fill(150);
  rect(-1, groundY + 20, 2000, groundY + 20);
  stroke(170);
  line(0, groundY - 7, 2000, groundY - 7);
  stroke(200);
  line(0, groundY + 15, 2000, groundY + 15);
  */
  //menu
  showMenu();
  //move the player
  playerY += playerSpeedY;
  playerY2 += playerSpeedY2;
  //player Collision
  //doctor.collide(doctor2)
  //obstacle collision for single player
  if (singleplayer === true && obstacleCollision === true) {
    if (playerX + playerWidth > obX && playerY + playerHeight > obY + obHeight && playerX < obX + obWidth && playerX + playerWidth > obX - obWidth) {
      obWidth = generateRandomInteger(5, 90);
      obHeight = generateRandomInteger(-5, -65);
      obX = width;
      singleplayerlose = true;
      scoreCounter = 0;
      staticScore = score;
      score = 0;
    }
  } if (multiplayer === true && obstacleCollision === true) {
    //obstacle collision player 1
    if (playerX + playerWidth > obX && playerY + playerHeight > obY + obHeight && playerX < obX + obWidth && playerX + playerWidth > obX - obWidth) {
      obWidth = generateRandomInteger(5, 90);
      obHeight = generateRandomInteger(-5, -65);
      obX = width;
      player2winScreen = true;
      scoreCounter = 0;
      staticScore = score;
      score = 0;
      //obstacle collision player 2
    } if (playerX2 + playerWidth > obX && playerY2 + playerHeight > obY + obHeight && playerX2 < obX + obWidth && playerX2 + playerWidth > obX - obWidth) {
      obWidth = generateRandomInteger(5, 90);
      obHeight = generateRandomInteger(-5, -65);
      obX = width;
      player1winScreen = true;
      scoreCounter = 0;
      staticScore = score;
      score = 0;
    }
  }

  //is the player colliding with the ground?
  //right player
  if (playerY + playerHeight > groundY) {

    //snap the player's bottom to the ground's position
    playerY = groundY - playerHeight;

    //stop the player falling
    playerSpeedY = 0;

    //allow jumping again
    jumping = false;
  }
  //player is not colliding with the ground
  else {
    //gravity accelerates the movement speed
    playerSpeedY++;
  }
  //left player
  if (playerY2 + playerHeight > groundY) {

    //snap the player's bottom to the ground's position
    playerY2 = groundY - playerHeight;

    //stop the player falling
    playerSpeedY2 = 0;

    //allow jumping again
    jumping2 = false;
  }
  //player is not colliding with the ground
  else {
    //gravity accelerates the movement speed
    playerSpeedY2++;
  }
  //Draw powerUps
  //noStroke()
  //fill(212, 239, 7);
  //rect(width/1.5, height/3,15,15,5)
  drawPlayers();
  generateStars();
  drawObstacles();

  //obstacle moving
  obX -= obSpeedX;
  if (score >= 0 && score <= 50) {
    obSpeedX = 2;
  } else if (score >= 51 && score <= 100) {
    obSpeedX = 3;
  } else if (score >= 101 && score <= 150) {
    obSpeedX = 4;
  } else if (score >= 151 && score <= 200) {
    obSpeedX = 5;
  } else if (score >= 201 && score <= 250) {
    obSpeedX = 6;
  } else if (score >= 251 && score <= 300) {
    obSpeedX = 7; ``
  } else if (score >= 301 && score <= 350) {
    obSpeedX = 8;
  } else if (score >= 351 && score <= 400) {
    obSpeedX = 9;
  } else if (score >= 401 && score <= 450) {
    obSpeedX = 10;
  } else if (score >= 451 && score <= 500) {
    obSpeedX = 11;
  }
  if (obX + obWidth < 0) {
    obWidth = generateRandomInteger(5, 90);
    obHeight = generateRandomInteger(-5, -65);
    obX = width;
  }
  //singleplayer controls
  if (singleplayer === true) {
    if (keyIsDown(LEFT_ARROW)) {
      playerX -= playerSpeedX;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += playerSpeedX;
    }
  } if (multiplayer === true) {
    //right hand side player
    if (keyIsDown(LEFT_ARROW)) {
      playerX -= playerSpeedX;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += playerSpeedX;
    }
    //left hand side player
    if (keyIsDown(65)) {
      playerX2 -= playerSpeedX2;
    }
    if (keyIsDown(68)) {
      playerX2 += playerSpeedX2;
    }
  }
  //collsions walls player 1
  if (playerX >= width - playerWidth) {
    playerX = width - playerWidth;
  }
  if (playerX <= 0) {
    playerX = 0;
  }
  //collsions walls player 2
  if (playerX2 >= width - playerWidth2) {
    playerX2 = width - playerWidth2;
  }
  if (playerX2 <= 0) {
    playerX2 = 0;
  }
  //menu
  showMenu();
  //winScreens
  winScreens();
}

function winScreens() {

  //Single Player
  if (singleplayer === true) {
    if (singleplayerlose === true) {
      fill(0);
      rect(0, 0, width, height);
      fill(0, 225, 0)
      noStroke();
      textAlign(CENTER) && textFont(myFont, 10) && textStyle(ITALIC);
      textSize(45) && textStyle(BOLD);
      text('GAMEOVER', (width / 2), height / 2);
      textSize(16);
      text('Press R to restart', (width / 2), height / 2 + 70);
      if (scoreOn == true) {
        textSize(16);
        text('Your Score: ' + Math.floor(staticScore), (width / 2), height / 2 - 70);
      }
      playerX = width / 3
      obX = width
      starX = 600
      songSwitch();
      x1 = 0;
      x2 = 1280;
      x3 = 2560;
      x4 = 3840;
      if (keyIsDown(82)) {
        resetStars();
        scoreCounter = 0.1;
        singleplayerlose = false;
        songSwitch();
      }
    }

  }
  //multi player  
  //player1 win
  if (multiplayer === true) {
    if (player1winScreen === true) {
      fill(0);
      rect(0, 0, width, height);
      noStroke();
      fill(0, 255, 0)
      textSize(45) && textStyle(BOLD) && textAlign(CENTER) && textFont(myFont);
      text('RIGHT PLAYER WINS', (width / 2), height / 2);
      textSize(16);
      text('Press R to restart', (width / 2), height / 2 + 70);
      playerX = width / 3
      playerX2 = width / 3 + 20
      obX = width
      starX = 600
      songSwitch();
      x1 = 0;
      x2 = 1280;
      x3 = 2560;
      x4 = 3840;
      if (keyIsDown(82)) {
        resetStars();
        scoreCounter = 0.1;
        player1winScreen = false;
        songSwitch();
      }
    }
    if (player2winScreen === true) {
      fill(0);
      rect(0, 0, width, height);
      noStroke();
      fill(0, 255, 0)
      textSize(45) && textStyle(BOLD) && textAlign(CENTER) && textFont(myFont);
      text('LEFT PLAYER WINS', (width / 2), height / 2);
      textSize(16);
      text('Press R to restart', (width / 2), height / 2 + 70);
      playerX = width / 3
      playerX2 = width / 3 + 20
      obX = width
      starX = 600
      songSwitch();
      x1 = 0;
      x2 = 1280;
      x3 = 2560;
      x4 = 3840;
      if (keyIsDown(82)) {
        resetStars()
        scoreCounter = 0.1;
        player2winScreen = false;
        songSwitch();
      }

    }
  }

}

function keyPressed() {
  //esc
  if (event.keyCode == 27) {
    resetStars();
    singleplayerlose = false
    player1winScreen = false
    player2winScreen = false
    menu = true

    showMenu();
  }
  //space bar
  if (event.keyCode == 32) {
    if (!jumping) {
      //going up
      playerSpeedY = -15;
    }

  }

  //disallow jumping while already jumping
  jumping = true;
  //W button
  if (event.keyCode == 87) {
    if (!jumping2) {
      //going up
      playerSpeedY2 = -15;
    }
    jumping2 = true;
  }

  //disallow jumping while already jumping
  jumping2 = true;


}
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}



function showMenu() {
  songSwitch();
  if (menu === true) {
    //backscreen
    fill(0)
    rect(0, 0, width, height)
    for (var B=0; B<babies.length; B++) {
      babies[B].move();
      babies[B].display();
    }
    //stops game being played in the back
    obstacleCollision = false;
    //adjusts gameMusic
    songSwitch();
    strokeWeight(4)
    //flickering stroke in menu 
    //frameRate(15)
    fill(0, 255, 0)
    stroke(0);
    strokeWeight(0.3)
    textSize(45) && textAlign(CENTER) && textFont(myFont);
    text('BABY BANDITS', (width / 2), height / 3);
    textSize(20) && textStyle(NORMAL)
    text('"S" for single player', (width / 2), height / 2);
    text('"M" for multiplayer', (width / 2), height / 1.5);
    frontpageMum();
    //when single player is selected
    if (keyCode === 83) {
      //resets everything back in place
      scoreOn = true;
      playerX = 140
      starX = 600
      x1 = 0;
      x2 = 1280;
      x3 = 2560;
      x4 = 3840;
      menu = false;
      score = 0;
      scoreCounter = 0.1;
      obX = 600;
      songSwitch();
      frameRate(60)
      obstacleCollision = true;
      singleplayer = true;
      multiplayer = false;
      //multiplayer is selected
    } else if (keyCode === 77) {
      scoreOn = false;
      playerX = 140
      playerX2 = 115
      starX = 600
      x1 = 0;
      x2 = 1280;
      x3 = 2560;
      x4 = 3840;
      menu = false;
      score = 0;
      scoreCounter = 0.1;
      obX = 600;
      songSwitch();
      frameRate(60)
      obstacleCollision = true;
      singleplayer = false;
      multiplayer = true;

    } else {
      menu = true;
    }

  }
}

function drawPlayers() {
  //single player
  if (singleplayer === true) {
    noStroke()
    fill(230, 0, 0);
    image(whitebabyImage, playerX, playerY, playerWidth, playerHeight, 7);
  }
  if (multiplayer === true) {
    noStroke()
    fill(230, 0, 0);
    image(whitebabyImage, playerX, playerY, playerWidth, playerHeight, 7);
    image(blackbabyImage, playerX2, playerY2, playerWidth2, playerHeight2, 7);
  }
}

function generateStars() {
  //stars
  if (score < 190) {
    r = 230
    g = 230
    b = 230
    lineThickness = 1
  } else {
    r = 0
    g = 255
    b = 0
    lineThickness = 4
  }
  strokeWeight(lineThickness)
  stroke(r, g, b);
  line(starX - 10, starY, starX, starY);
  line(starX2 + 30, starY2 - 20, starX2 + 40, starY2 - 20);
  line(starX3 + 70, starY3 - 30, starX3 + 80, starY3 - 30);
  line(starX4 + 80, starY4 - 40, starX4 + 90, starY4 - 40);
  line(starX5 + 100, starY5 - 10, starX5 + 110, starY5 - 10);
  starX -= score * 0.1;
  starX2 -= score * 0.1;
  starX3 -= score * 0.1;
  starX4 -= score * 0.1;
  starX5 -= score * 0.1;
  if (starX < 0) {
    starY = generateRandomInteger(30, groundY - 15);
    starX = width;
  }
  if (starX2 < 0) {
    starY2 = generateRandomInteger(30, groundY - 15);
    starX2 = width;
  }
  if (starX3 < 0) {
    starY3 = generateRandomInteger(30, groundY - 15);
    starX3 = width;
  }
  if (starX4 < 0) {
    starY4 = generateRandomInteger(30, groundY - 15);
    starX4 = width;
  }
  if (starX5 < 0) {
    starY5 = generateRandomInteger(30, groundY - 15);
    starX5 = width;
  }
}

function resetStars() {
  starX = 600
  starX2 = starX + 100
  starX3 = starX2 + 200
  starX4 = starX3 + 300
  starX5 = starX4 + 400
}

function songSwitch(){
  if (menu === true){
    menuMusicVolume = 2
    menuMusicFade = 5.0
    gameMusicVolume = 0
    gameMusicFade = 2.0
    
  }else{
    menuMusicVolume = 0
    menuMusicFade = 2.0
    gameMusicVolume = 2
    gameMusicFade = 5.0
  }
}

function frontpageMum(){
  x = 1
  if (mumWidth < 90){
    x = 10
  } else if (mumWidth > 110){
    x = -10
  }
  mumHeight += x
  mumWidth += x
  frameRate(10)
  currentfireFrame = fireFrame1
  firewall()

  image(motherImage, mumX - mumWidth/2, mumY - mumHeight/2, mumWidth, mumHeight);
  //frameRate(60)
}

function drawObstacles(){
  //obstacle
  stroke(0);
  strokeWeight(3);
  fill(220, 0, 80,220);
  rect(obX, obY, obWidth, obHeight);
}

function firewall(){
  image(currentfireFrame,0,300,100,100)
  image(currentfireFrame,100,300,100,100)
  image(currentfireFrame,200,300,100,100)
  image(currentfireFrame,300,300,100,100)
  image(currentfireFrame,400,300,100,100)
  image(currentfireFrame,500,300,100,100)
}

function Jitter() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(4, 30);
  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    //fill(0,255,0)
    image(whitebabyImage,this.x, this.y, this.diameter, this.diameter);
    image(blackbabyImage,this.x-50, this.y+80, this.diameter, this.diameter);
    image(pistol,this.x - this.diameter/2.5,this.y + this.diameter/2.5 , this.diameter/1.5, this.diameter/1.5);
    image(blackbabyImage,this.x-50, this.y+80, this.diameter, this.diameter);
    image(knife,this.x-50 + this.diameter/2,this.y+80 + this.diameter/2.5 , this.diameter/1.5, this.diameter/1.5);
    image(mixedbabyImage,this.x+80, this.y+40, this.diameter, this.diameter);
    image(bow,this.x+80 - this.diameter/5, this.y+40 + this.diameter/5, this.diameter/2, this.diameter/2);

    
  }
}

function moon(){
  
}