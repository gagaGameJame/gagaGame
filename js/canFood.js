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
                this.offsetX[i][j] = int(random(-200,200)) + 60;
                this.offsetY[i][j] = int(random(-200,200)) + 70;
            }
          }
    }

    show() {
        console.log(this.offsetX.length, this.offsetX[this.offsetX.length - 1].length)
        const canWidth = canFood1.width
        const canHeight = canFood1.height
        const canScaleSize = 0.4
        for(let i = 0; i < worldWidth; i += this.densityX) {
            for(let j = 0; j < worldHeight; j += this.densityY){
                // if(rockType[i][j] == 'A') {
                //     drawRocksA(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                // } else if (rockType[i][j] == 'B') {
                //     drawRocksB(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                // } else if (rockType[i][j] == 'C') {
                //     drawRocksC(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                // }
                image(canFood1, i + this.offsetX[i][j], j + this.offsetY[i][j], canWidth * canScaleSize, canHeight * canScaleSize, 0, 0, canWidth, canHeight);
            }
        }
    }
}


