class Tv {
    constructor() {
        this.score;
        this.time;
        this.rate = 0.65
        this.totalTime = 90;
    }

    show() {
        image(tvImg,-cameraX+10,10,tvImg.width *this.rate, tvImg.height *this.rate);
        let nowTime = new Date();
        leftTime = (int) (this.totalTime - (nowTime.getTime() - startTime.getTime())/1000);
        if(leftTime>=0){
            push();
            fill(255);
            textSize(40);
            // textFont(arial);
            textStyle(BOLD);
            text(leftTime+'\'\'',-cameraX+65,70);
            textSize(20);
            textStyle(NORMAL);
            fill(255,215,0); // gold
            text(score+' \| 100',-cameraX+60,100);
            pop();
        }
    }
}


