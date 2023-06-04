class PaperBox {
    constructor(rate) {
        this.x;
        this.y;
        this.densityX = 5000 * rate//tileWidth * 1.5;
        this.densityY = 5000 * rate//tileHeight * 1.5;
        this.offsetX = [];
        this.offsetY = [];
        this.boxWidth = 300;
        this.boxHeight = 300;

        for(let i = 0; i < worldWidth; i += this.densityX) {
            // rockType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                this.offsetX[i][j] = int(random(-200,200));
                this.offsetY[i][j] = int(random(60, tileHeight - this.boxHeight - 150));
                boxPositions.push({x: i + this.offsetX[i][j], y: j + this.offsetY[i][j], width: this.boxWidth, height: this.boxHeight, hasChecked: false});
            }
        }
    }

    show() {
        // const boxWidth = 130
        // const boxHeight = 130
        boxImg.width = this.boxWidth;
        boxImg.height = this.boxHeight;

        for(let i = 0; i < worldWidth; i += this.densityX) {
            for(let j = 0; j < worldHeight; j += this.densityY){
                // boxPositions.push({x: i + this.offsetX[i][j], y: j + this.offsetY[i][j], width: this.boxWidth, height: this.boxHeight, hasChecked: false});
                image(boxImg, i + this.offsetX[i][j], j +  this.offsetY[i][j], this.boxWidth, this.boxHeight, 0, 0, this.boxWidth, this.boxHeight);
            }
        }
    }
}


