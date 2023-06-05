class CanFood {
    constructor(rate, scaleRate = 0.5) {
        this.x;
        this.y;
        this.densityX = 1000 * rate//tileWidth * 1.5;
        this.densityY = 1000 * rate//tileHeight * 1.5;
        this.offsetX = [];
        this.offsetY = [];
        this.canWidth = canImg.width * scaleRate
        this.canHeight = canImg.height * scaleRate

        for(let i = 0; i < worldWidth; i += this.densityX) {
            // rockType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                // rockType[i][j] = random(rockTypes);
                this.offsetX[i][j] = int(random( - 500, 500)) + 60 //+ this.densityX;
                this.offsetY[i][j] = int(random(0, document.body.clientHeight)) - 10 //+ 70 
                itemPositions.push({
                    type: 'canFood',
                    x: i + this.offsetX[i][j],
                    y: j + this.offsetY[i][j],
                    width: this.canWidth,
                    height:this.canHeight
                });
                // canFoodPositions.push({ x: i + this.offsetX[i][j], y: j + this.offsetY[i][j], width: this.canWidth, height:this.canHeight})
            }
          }
    }

    show() {
        // for (let i = 0; i < canFoodPositions.length; i++) {
        //     // let food_x = canFoodPositions[i].x;
        //     // let food_y = canFoodPositions[i].y;
        //     // if(food_x<200 && food_y<tape1.height && food_y>worldHeight-tape2.height-this.canHeight){
        //     //     continue;
        //     // }
        //     image(canImg, canFoodPositions[i].x, canFoodPositions[i].y, this.canWidth, this.canHeight, 0, 0, canImg.width, canImg.height);
        // }
        for (let i = 0; i < itemPositions.length; i++) {
            if (itemPositions[i].type === 'canFood') {
                image(canImg, itemPositions[i].x, itemPositions[i].y, this.canWidth, this.canHeight, 0, 0, canImg.width, canImg.height);
            }
        }
    }
}


