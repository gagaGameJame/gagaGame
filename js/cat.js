class Cat {
    constructor() {
        this.catWidth = 100;
        this.catHeight = 100;
        this.catLeft = 0;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
    }

    show() {
        let moveLeft = 1;
        let moveTop = 0;
        let adjustSize = 0;
        if(keyIsDown(37)) {
            // press arrow left
            adjustSize = -20;
        }
        if(keyIsDown(39)) {
            // press arrow right
            adjustSize = 20;
        }
        if(keyIsDown(38)) {
            // press arrow top
            moveTop = -5;
        }
        if(keyIsDown(40)) {
            // press arrow down
            moveTop = 5;
        }
        this.catLeft += moveLeft;
        this.catWidth = constrain(this.catWidth + adjustSize, 40, 160);
        this.catHeight = constrain(this.catHeight + adjustSize, 40, 160);
        this.catTop = constrain(this.catTop + moveTop, 60, tileHeight - this.catHeight - 100);
        image(spikeCat, this.catLeft, this.catTop, this.catWidth, this.catHeight, 0, 0, spikeCat.width, spikeCat.width);
    }
}


