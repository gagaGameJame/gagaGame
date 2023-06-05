class Cucumber {
    constructor(rate, scaleRate = 0.5) {
        this.x;
        this.y;
        this.densityX = 1000 * rate//tileWidth * 1.5;
        this.densityY = 1000 * rate//tileHeight * 1.5;
        this.offsetX = [];
        this.offsetY = [];
        this.cucumberWidth = cucumberImg.width * scaleRate
        this.cucumberHeight = cucumberImg.height * scaleRate

        for(let i = 0; i < worldWidth; i += this.densityX) {
            // rockType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                // rockType[i][j] = random(rockTypes);
                this.offsetX[i][j] = int(random(-400, 400)) + 70//i//this.densityX; //+ 60 //
                this.offsetY[i][j] =  int(random(0, document.body.clientHeight)) //int(random(-200, 200)) + 200//this.densityY; //
                itemPositions.push({
                    type: 'cucumber',
                    x: i + this.offsetX[i][j],
                    y: j + this.offsetY[i][j],
                    width: this.cucumberWidth,
                    height: this.cucumberHeight
                });
                // cucumberPositions.push({ x: i + this.offsetX[i][j], y: j + this.offsetY[i][j], width: this.cucumberWidth, height: this.cucumberHeight})
            }
          }
    }

    show() {
        // for (let i = 0; i < cucumberPositions.length; i++) {
        //     // let food_x = cucumberPositions[i].x;
        //     // let food_y = cucumberPositions[i].y;
        //     // if(food_x<300 && food_y<tape1.height && food_y>worldHeight-tape2.height-this.cucumberHeight-100){
        //     //     continue;
        //     // }
        //     image(cucumberImg, cucumberPositions[i].x, cucumberPositions[i].y, cucumberPositions[i].width, cucumberPositions[i].height, 0, 0, cucumberImg.width, cucumberImg.height);
        // }
        for (let i = 0; i < itemPositions.length; i++) {
            if (itemPositions[i].type === 'cucumber') {
                image(cucumberImg, itemPositions[i].x, itemPositions[i].y, itemPositions[i].width, itemPositions[i].height, 0, 0, cucumberImg.width, cucumberImg.height);
            }
        }
    }
}


