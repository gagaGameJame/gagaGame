class Cucumber {
    constructor(rate) {
        this.x;
        this.y;
        this.densityX = 1000 * rate//tileWidth * 1.5;
        this.densityY = 1000 * rate//tileHeight * 1.5;
        this.offsetX = [];
        this.offsetY = [];

        for(let i = 0; i < worldWidth; i += this.densityX) {
            // rockType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                // rockType[i][j] = random(rockTypes);
                this.offsetX[i][j] = int(random(-200,200)) + 60 //+ this.densityX;
                this.offsetY[i][j] = int(random(-200,200)) + 70 //+ this.densityY;
                cucumberPositions.push({ x: i + this.offsetX[i][j], y: j + this.offsetY[i][j]})
            }
          }
    }

    show() {
        const cucumberWidth = cucumberImg.width
        const cucumberHeight = cucumberImg.height
        const cucumberScaleSize = 0.2
        for (let i = 0; i < cucumberPositions.length; i++) {
            image(cucumberImg, cucumberPositions[i].x, cucumberPositions[i].y, cucumberWidth * cucumberScaleSize, cucumberHeight * cucumberScaleSize, 0, 0, cucumberWidth, cucumberHeight);
        }
    }
}


