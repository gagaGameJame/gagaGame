/* References: https://p5-demos.glitch.me/, https://compform.net/tiles/, https://editor.p5js.org/ambikajo/sketches/cKu3Gn0Po,
https://hazzzaa.itch.io/forest, https://www.youtube.com/watch?v=OTNpiLUSiB4, https://pikuma.com/blog/isometric-projection-in-games,
https://www.youtube.com/watch?v=KkyIDI6rQJI, https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur */

let scene1, scene2, winState, scene3;
let gameoverState = false;
let sceneCounter = 0;
let intro, introText;
let ground, grass, player, rain, rocks, identity, trees, birds, ripples, hole;
let bgImg;
let moveX = 0;
let moveY = 0;
let camX = 0;
let camY = 0;
let moveSpeedX, moveSpeedY;
let easeMove = 0.2;
let magX = 0;
let magY = 0;
let persp = 0.75;
let pg;
let mapSize = 25;
let tileWidth = 1000;
let tileHeight = 500;
let worldWidth = mapSize * (tileWidth / 2);
let worldHeight = mapSize * (tileHeight / 2);
let x_screen = [];
let y_screen = [];
let x_start = -tileWidth / 2;
let y_start = -tileHeight / 2;
let tileTypes = ['A', 'B', 'C'];
let tileType = [];
let rockTypes = ['A', 'B', 'C'];
let rockType = [];
let treeTypes = ['A', 'B', 'C'];
let treeType = [];
let grassTypes = ['A', 'B', 'C'];
let grassType = [];
let tiles;
let tilesList1;
let threshold = 0.4;
let blendThreshold = 0.05;
let darkest = 200;
let rainSound, scoreSound, winSound, gameoverSound, birdsSound;
let sampleIsLooping = false;
let winIsLooping = false;
let birdsIsLooping = false;
let gameoverSoundIsLooping = false;
let soundOff, soundOn;
let margin;
let dx, dy, targetX, targetY;
let d = [];
let d2 = [];
let score = 0;
let karla, karlaBold;
let mult = 0.25;
let cat;
let catLeft = 0;
let catTop = 0;
let isSoundOn = false;
let catImage;
let catWidth = 100;
let catHeight = 100;

function preload() {

  rainSound = loadSound('data/rain.wav');
  scoreSound = loadSound('data/score.wav');
  winSound = loadSound('data/win.wav');
  gameoverSound = loadSound('data/gameover.wav');
  birdsSound = loadSound('data/birds.wav');
  karla = loadFont('data/Karla-Regular.ttf');
  karlaBold = loadFont('data/Karla-Bold.ttf');
  catImage = loadImage('data/cat.jpeg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  scene1 = new Scene1();
  scene2 = new Scene2();
  scene3 = new Scene3();
}
function keyReleased() {
  // press space to start game
  if (keyCode === 32 && sceneCounter === 0) {
    sceneCounter = 1;
    bgmStart()
  }

  // press esc to exit
  if (keyCode === 27) {
    sceneCounter = 0;
  }

  // press a to toggle sound
  if (keyCode === 65) {
    togglePlaying();
  }
}

function draw() {
  switch (sceneCounter) {
    case 0:
      scene1.show();
      break;
    case 1:
      scene2.show();
      break;
    case 2:
      scene3.show();
      break;
    default:
      scene1.show();
      break;
  }
}

// Homepage
class Scene1 {
  constructor() {
    cursor(ARROW);
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    intro = new Intro();
  }

  show() {
    background(255);
    push();
    imageMode(CENTER)
    pop();
    intro.show();
  }
}

// Game Scene
class Scene2 {

  constructor() {
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    hole = new Hole();
    grass = new Grass();
    trees = new Trees();
    rocks = new Rocks();
    identity = new Identity();
    player = new Player();
    rain = new Rain();
    ripples = new Ripples();
    birds = new Birds();
    winState = new WinState();
    hole = new Hole();
  }

  show() {
    clear();
    background(255);
    noStroke();
    push();
    imageMode(CORNER);
    noSmooth();
    pop();

    catImage.resize(catWidth,catHeight);
    image(catImage,catLeft,catTop,catImage.width,catImage.height);


    let moveLeft = 1;
    let moveTop = 0;
    if(keyIsDown(37)) {
      // press arrow left
      catImage.resize(catWidth-=20,catHeight-=20);
    }
    if(keyIsDown(39)) {
      // press arrow right
      catImage.resize(catWidth+=50,catHeight+=50);

    }
    if(keyIsDown(38)) {
      // press arrow top
      moveTop = -5;
    }
    if(keyIsDown(40)) {
      // press arrow down
      moveTop = 5;
    }
    catLeft += moveLeft;
    catTop += moveTop;

    // image(catImage,catLeft,catTop);

  }
}

// Game Over Scene
class Scene3 {
  constructor() {
    cursor(ARROW);
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    hole = new Hole();
    grass = new Grass();
    trees = new Trees();
    rocks = new Rocks();
    rain = new Rain();
    ripples = new Ripples();
  }

  show() {
    background(0, 100);
    ground.show();
    hole.show();
    rocks.show();
    grass.show();
    ripples.show();
    trees.show();
    rain.show();
    push();
    imageMode(CENTER)
    pop();
    soundOn.position(width - 100, 40);
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    textFont(karlaBold);
    text("Game Over", width / 2, height / 2 - 100);
    pop();

    if (!gameoverSoundIsLooping) {
      gameoverSound.play();
      gameoverSoundIsLooping = true;
    }
  }
}

class Intro {
  constructor() {
    // introText = 'Many people have experienced clinical depression at some point in their lives. Some people could experience anxiety, hopelessness, and the feeling that a part of themselves has disappeared. This project aims to promote awareness and motivate those suffering to seek help or at least feel that there is hope.';
    this.leading = 30;
    this.py = 200;
  }

  show() {

    fill(0, 150);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, 440, 840, 700, 20);

    push();
    fill(255, 220);
    textFont(karlaBold);
    textLeading(this.leading);
    textSize(28);
    textAlign(CENTER);
    text("The Healing Forest", width / 2 + 5, this.py);
    textSize(24);
    text("Instructions", width / 2, this.py + this.leading * 7, 600);
    textSize(18);
    textFont(karla);
    textAlign(LEFT);
    text(introText, width / 2, this.py + this.leading * 2, 670);
    textAlign(CENTER);
    text("press 'space' to start game", width / 2, this.py + this.leading * 8, 600);
    pop();
  }
}

class WinState {

  constructor() {
    this.colorChoice = 0;
    this.counter = 0;
  }
  show() {
    if (score === 5) {
      push();
      fill(255);
      textAlign(CENTER);
      textSize(60);
      textFont(karlaBold);
      text("You Win!", width / 2, height / 2 - 180);
      pop();

      player.c = identity.c[this.colorChoice];

      if (this.counter > 5) {
        this.colorChoice = round(random(0, 4));
        this.counter = 0;
      }
      this.counter++;

      if (sampleIsLooping) {
        rainSound.stop();
        sampleIsLooping = false;
        if (!birdsIsLooping) {
          birdsSound.loop();
          birdsIsLooping = true;
        }
      }
      if (!winIsLooping) {
        winSound.play();
        winIsLooping = true;
      }
    }
  }
}


function bgmStart() {
  isSoundOn = true;
  rainSound.loop();
  $("img[alt$='Sound on button']").remove()
  $("img[alt$='Sound off button']").remove()
  soundOn = createImg("data/sound-on.png", "Sound on button", '', () => {
    soundOn.size(50, AUTO);
  });
  soundOn.position(width - 100, 40);
}

function  bgmEnd() {
  isSoundOn = false;
  rainSound.pause();
  $("img[alt$='Sound on button']").remove()
  $("img[alt$='Sound off button']").remove()
  soundOn = createImg("data/sound-off.png", "Sound off button", '', () => {
    soundOn.size(50, AUTO);
  });
  soundOn.position(width - 100, 40);
}
function togglePlaying() {
  if (isSoundOn) {
    bgmEnd();
  } else {
    bgmStart();
  }

  // if (!sampleIsLooping) {
  //   console.log('==================')
  //   rainSound.loop();
  //   sampleIsLooping = true;
  //   removeElements();
  //   soundOff = createImg("data/sound-on.png", "Sound off button",
  //   '',
  //   () => {
  //     soundOff.size(50, AUTO);
  //   });
  //   soundOff.position(width - 100, 40);
  //   // soundOff.mousePressed(togglePlaying);
  //
  // } else {
  //   rainSound.pause();
  //   sampleIsLooping = false;
  //   removeElements();
  //   soundOn = createImg("data/sound-off.png", "Sound on button",
  //   '',
  //   () => {
  //     soundOn.size(50, AUTO);
  //   });
  //   soundOn.position(width - 100, 40);
  //   // soundOn.mousePressed(togglePlaying);
  // }
}

// Click to move around the map
function moveCamera() {

  if (mouseIsPressed === true) {

    if (mouseX > width / 2) {
      magX = (mouseX - width / 2) / (width / 2);
      moveSpeedX = int(20 * magX);
      moveX -= moveSpeedX;
    } else {
      magX = 1 - (mouseX / (width / 2));
      moveSpeedX = int(20 * magX);
      moveX += moveSpeedX;
    }

    if (mouseY > height / 2) {
      magY = (mouseY - height / 2) / (height / 2);
      moveSpeedY = int(20 * magY);
      moveY -= moveSpeedY;
    } else {
      magY = 1 - (mouseY / (height / 2));
      moveSpeedY = int(20 * magY);
      moveY += moveSpeedY;
    }

  } else {

    if (moveSpeedX > 0) {
      if (mouseX > width / 2) {
        moveSpeedX -= easeMove;
        moveX -= moveSpeedX;
      } else {
        moveSpeedX -= easeMove;
        moveX += moveSpeedX;
      }
    }
    if (moveSpeedY > 0) {
      if (mouseY > height / 2) {
        moveSpeedY -= easeMove;
        moveY -= moveSpeedY;
      } else {
        moveSpeedY -= easeMove;
        moveY += moveSpeedY;
      }
    }
  }

  if (moveX < -10000) {
    moveX = -10000;
  }
  if (moveX > 600) {
    moveX = 600;
  }
  if (moveY < -5200) {
    moveY = -5200;
  }
  if (moveY > 400) {
    moveY = 400;
  }

  camX = constrain(moveX, -10000, 600);
  camY = constrain(moveY, -5200, 400);

}

function checkCollision() {

  for (let i = 0; i < 5; i++) {
    d[i] = dist((camX - player.px) * -1, (camY - player.py) * -1, identity.px[i] + identity.offX[i],
      (((identity.py[i] + identity.offY[i]) * persp)) + ((height / 2) * persp) / 2);
    if (d[i] < 80) {
      player.c = identity.c[i];
      identity.collided[i] = true;
      scoreSound.play();

    }
  }

  for (let j = 0; j < hole.holes.length; j++) {
    d2[j] = dist((camX - player.px) * -1, (camY - player.py) * -1, hole.holes[j].px, hole.holes[j].py);
    if (d2[j] < 50) {
      gameoverState = true;
      sceneCounter = 2;
    }
  }
}

function showScore() {
  score = identity.collided[0] + identity.collided[1] + identity.collided[2] + identity.collided[3] + identity.collided[4];
  push();
  fill(255);
  textSize(36);
  textFont(karlaBold);
  text('Identities Recovered: ' + score + '/5', 70, 80);
  pop();
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}
