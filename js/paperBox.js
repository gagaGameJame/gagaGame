class PaperBox {
    constructor(rate, scaleRate = 1) {
        this.x;
        this.y;
        this.densityX = 5000 * rate//tileWidth * 1.5;
        this.densityY = 5000 * rate//tileHeight * 1.5;
        this.offsetX = [];
        this.offsetY = [];
        this.boxWidth = 300;
        this.boxHeight = 300;
        this.scaleRate = scaleRate;
        this.remainTime;

        for(let i = 0; i < worldWidth; i += this.densityX) {
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                this.offsetX[i][j] = int(random(-200,200));
                this.offsetY[i][j] = int(random(60, tileHeight - this.boxHeight - 150));

                const box_x = i + this.offsetX[i][j];
                const box_y = j +  this.offsetY[i][j];
                if(box_x >= 200 && box_y >= tape1.height && box_y <= worldHeight - tape2.height - this.boxHeight){
                    itemPositions.push({
                        type: 'paperBox',
                        image: boxImg,
                        x: i + this.offsetX[i][j],
                        y: j + this.offsetY[i][j],
                        width: this.boxWidth,
                        height: this.boxHeight,
                        hasChecked: false
                    });
                }
            }
        }
    }

    show() {
        for (let i = 0; i < itemPositions.length; i++) {
            if (itemPositions[i].type === 'paperBox') {
                image(itemPositions[i].image, itemPositions[i].x, itemPositions[i].y,
                  itemPositions[i].image.width * this.scaleRate, itemPositions[i].image.height * this.scaleRate,
                  0, 0, itemPositions[i].image.width, itemPositions[i].image.height);
            }
        }
    }
}


