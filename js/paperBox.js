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
        this.remainTime;

        for(let i = 0; i < worldWidth; i += this.densityX) {
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
                let box_x = i + this.offsetX[i][j];
                let box_y = j +  this.offsetY[i][j];
                if(box_x<200 && box_y<tape1.height && box_y>worldHeight-tape2.height-this.boxHeight){
                    continue;
                }
                image(boxImg, box_x, box_y, this.boxWidth, this.boxHeight, 0, 0, this.boxWidth, this.boxHeight);
            }
        }
    }

    // showTime(boxPosition){
    //     // push();
    //     textAlign(CENTER);
    //     textSize(60);
    //     textFont(karlaBold);
    //     text('3',boxPosition.x+100,boxPosition.y+50);
    //     // setTimeout(()=>text('3'''))
    //     // pop();
    // }
}


