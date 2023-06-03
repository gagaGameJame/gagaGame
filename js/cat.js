class Cat {
    constructor() {
        this.catWidth = 100;
        this.catHeight = 100;
        this.catLeft = 200;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
    }

    show(moveX) {
        let moveTop = 0;
        let adjustSize = 0;
        if(keyIsDown(38)) {
            // press arrow top
            moveTop = -5;
        }
        if(keyIsDown(40)) {
            // press arrow down
            moveTop = 5;
        }
        this.catLeft += moveX;
        this.catTop = constrain(this.catTop + moveTop, 60, tileHeight - this.catHeight - 100);
        cat_x = this.catLeft
        cat_y = this.catTop
        for (let i = 0; i < canFoodPositions.length; i++) {
            const distance = dist(cat_x, cat_y, canFoodPositions[i].x, canFoodPositions[i].y);
            if (distance < 50) {
                catEatSound1.play()
                adjustSize += 20
                eatPositions.push({x: canFoodPositions[i].x, y: canFoodPositions[i].y})
                canFoodPositions[i].x = -1000
                canFoodPositions[i].y = -1000
            }
        }
        this.catWidth = this.catWidth + adjustSize // constrain(this.catWidth + this.adjustSize, 40, 160);
        this.catHeight = this.catHeight + adjustSize //constrain(this.catHeight + this.adjustSize, 40, 160);
        image(spikeCat, this.catLeft, this.catTop, this.catWidth, this.catHeight, 0, 0, spikeCat.width, spikeCat.width);
    }
}


