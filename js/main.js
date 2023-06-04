let scene1, scene2, scene3;
let sceneCounter = 0;
let canFood, cat, cucumber,boxes,tv;

let mapSize = 25;
let tileWidth = 1280;
let tileHeight = 720;
let worldWidth = mapSize * tileWidth // mapSize * (tileWidth / 2);
let worldHeight = tileHeight // mapSize * (tileHeight / 2);

let bgmSound, catEatSound1, catEatSound2, boxSound;

let soundOn;
let margin;

let score = 0;
let karla, karlaBold, arial;

let isSoundOn = false;
let rug, tape1, tape2;
let catImg, canImg, cucumberImg, boxImg, tvImg, winImg, catInBoxImg;
let startGameImg, titleImg, titleBGImg;
let cameraX = 0;
let cat_x = 0, cat_y = 0;
const eatPositions = [];
let outSideCarpet = false;
let carpetTop, carpetEnd;
let rate = 0.2;
let isPaused = false;
const CAT_SPEED_X = 2;
const CAT_SPEED_Y = 5;
let catMove_x = CAT_SPEED_X; // camera and cat move distance per drawing
let catMove_y = CAT_SPEED_Y;
let startTime;
let leftTime;
let gameStatus = 'Wait';
const itemPositions = [];

function preload() {

  bgmSound = loadSound('data/bgm.mp3');
  catEatSound1 = loadSound('data/catEatSFX1.mp3')
  catEatSound2 = loadSound('data/catEatSFX2.mp3')
  boxSound = loadSound('data/catBoxSFX.mp3');

  karla = loadFont('data/Karla-Regular.ttf');
  karlaBold = loadFont('data/Karla-Bold.ttf');
  arial = loadFont('data/arial.ttf');

  catImg = loadImage('data/cat1f.png');

  rug = loadImage('data/rug.png')
  tape1 = loadImage('data/tape1.png')
  tape2 = loadImage('data/tape2.png')
  startGameImg = loadImage('data/startGame.png')
  titleImg =loadImage('data/title.png')
  titleBGImg =loadImage('data/titleBG.png')

  canImg = loadImage('data/can.png')
  cucumberImg = loadImage('data/cucumber.png')
  boxImg = loadImage('data/CardboardBox.png');
  tvImg = loadImage('data/TV.png');
  winImg = loadImage('data/WinBG.png')
  catInBoxImg = loadImage('data/catInBox.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  scene1 = new Scene1();
  scene2 = new Scene2();
  scene3 = new Scene3();
}
function keyReleased() {
  // press any key to start game
  if (sceneCounter === 0) {
    sceneCounter = 1;
    startTime = new Date();
    bgmStart()
  }


  // press esc to exit
  if (keyCode === 27) {
    sceneCounter = 0;
    cat.reset()
    cameraX = 0;
    scene2 = new Scene2();
    boxSound.stop();
    bgmEnd();
    gameStatus = 'Wait';
    score = 0;
  }

  // press a to toggle sound
  if (keyCode === 65) {
    togglePlaying();
  }
}

function setupBackGround() {
  const viewHeight = document.body.clientHeight;
  const rugImgWidth = rug.width
  const rugImgHeight = rug.height
  const tapeWidth = tape1.width
  const tapeHeight = tape1.height

  const scaleRate = (viewHeight - tapeHeight * 2) / rugImgHeight
  const rugWidth = rugImgWidth * scaleRate
  const rugHeight = rugImgHeight * scaleRate

  const margin = (viewHeight - rugHeight) / 2
  const rugSize = worldWidth % rugWidth + 1
  for (let i = 0; i < rugSize; i++) {
    image(rug, i * rugWidth, margin, rugWidth, rugHeight, 0, 0, rugImgWidth, rugImgHeight);
  }

  const tapeSize = worldWidth % rugWidth + 1
  for (let i = 0; i < tapeSize; i++) {
    image(tape1, i * tapeWidth, 0, tapeWidth, tapeHeight, 0, 0, tapeWidth, rugImgHeight);
    image(tape2, i * tapeWidth, margin + rugHeight, tapeWidth, tapeHeight, 0, 0, tapeWidth, rugImgHeight);
  }
  carpetTop = margin;
  carpetEnd = margin + rugHeight;
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
  }

  show() {
    background(255);
    image(titleBGImg, 0, 0, document.body.clientWidth, document.body.clientHeight, 0, 0, titleBGImg.width, titleBGImg.height)
    image(startGameImg, document.body.clientWidth * 0.6, document.body.clientHeight * 0.6, startGameImg.width, startGameImg.height, 0, 0, startGameImg.width, startGameImg.height)
    image(titleImg, document.body.clientWidth * 0.1 ,0, titleImg.width, titleImg.height, 0, 0, titleImg.width, titleImg.height)
    push();
    imageMode(CENTER)
    pop();
  }
}

// Game Scene
class Scene2 {

  constructor() {
    margin = width * 0.15;
    canFood = new CanFood(0.8);
    cat = new Cat(0.5);
    boxes = new PaperBox(rate);
    cucumber = new Cucumber(0.7);
    tv = new Tv();
  }

  show() {
    clear();
    gameStatus = 'Process';
    background(0);
    moveCamera();
    setupBackGround()
    noStroke();
    push();
    imageMode(CORNER);
    noSmooth();
    pop();


    canFood.show();
    cucumber.show();
    boxes.show();
    cat.show();
    tv.show();
    checkTimeUp();
    checkScore();
  }
}

// Game Over Scene
class Scene3 {
  constructor() {
    cursor(ARROW);
  }

  show() {
    background(0, 100);
    push();
    imageMode(CENTER)
    pop();
    soundOn.position(width - 100, 40);
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    textFont(karlaBold);
    if(gameStatus === 'Lost') {
      text("Game Over", width / 2, height / 2 - 100);
      textSize(30);
      text("Press ESC to restart", width / 2, height / 2 );
    } else if(gameStatus === 'Win') {
      image(winImg, 0, 0, document.body.clientWidth, document.body.clientHeight);
    }
    pop();
  }
}

function bgmStart() {
  isSoundOn = true;
  bgmSound.loop();
  $("img[alt$='Sound on button']").remove()
  $("img[alt$='Sound off button']").remove()
  soundOn = createImg("data/sound-on.png", "Sound on button", '', () => {
    soundOn.size(50, AUTO);
  });
  soundOn.position(width - 100, 40);
}

function  bgmEnd() {
  isSoundOn = false;
  bgmSound.pause();
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
}

// Click to move around the map
function moveCamera() {
  cameraX = cameraX - catMove_x;
  translate(cameraX,0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function checkTimeUp() {
  if(leftTime === 0) {
    gameStatus = 'Lost';
    sceneCounter = 2;
  }
}

function checkScore() {
  if(score >= 100){
    gameStatus = 'Win';
    sceneCounter = 2;
  }
}
