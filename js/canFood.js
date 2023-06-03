class CanFood {
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
                canFoodPositions.push({ x: i + this.offsetX[i][j], y: j + this.offsetY[i][j]})
            }
          }
    }

    show() {
        const canWidth = canFood1.width
        const canHeight = canFood1.height
        const canScaleSize = 0.2
        for (let i = 0; i < canFoodPositions.length; i++) {
            image(canFood1, canFoodPositions[i].x, canFoodPositions[i].y, canWidth * canScaleSize, canHeight * canScaleSize, 0, 0, canWidth, canHeight);
        }
    }
}


