class Tv {
    constructor() {
        this.score;
        this.time;
        this.rate = 0.6
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
            textFont(arial);
            text(leftTime+'\'\'',-cameraX+60,80);
            pop();
        }
    }
}


