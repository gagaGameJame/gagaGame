class Cat {
    constructor(scaleRate) {
        this.scaleRate = scaleRate;
        this.catWidth = catImg.width * scaleRate;
        this.catHeight = catImg.height * scaleRate;
        this.catLeft = 200;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
    }

    show() {
        let moveTop = 0;
        if(keyIsDown(38)) {
            // press arrow top
            moveTop = - catMove_y;
        }
        if(keyIsDown(40)) {
            // press arrow down
            moveTop = catMove_y;
        }
        this.catLeft += catMove_x;
        // this.catTop = constrain(this.catTop + moveTop, 60, tileHeight - this.catHeight - 100);
        this.catTop += moveTop;

        if (this.catTop <= carpetTop || this.catTop + this.catHeight >= carpetEnd) {
            outSideCarpet = true;
            sceneCounter = 2
            return;
        }

        cat_x = {
            min:this.catLeft ,
            max:this.catLeft + this.catWidth,
        }

        cat_y = {
            min: this.catTop,
            max: this.catTop + this.catHeight
        }

        // eat can and become larger
        this.checkEatFood();
        this.checkTouchBox();
        if(!isPaused){
            image(catImg, this.catLeft, this.catTop, this.catWidth, this.catHeight, 0, 0, catImg.width, catImg.width);
        }
    }

    checkEatFood(){
        let adjustSize = 0;
        const collisionDis = 50 //this.catHeight * 0.2
        if(isPaused){
            return;
        }
        for (let i = 0; i < canFoodPositions.length; i++) {
            const distance = calculateFoodDis(cat_x, cat_y, canFoodPositions[i])
            if (distance < collisionDis) {
                catEatSound1.play()
                adjustSize += 40
                eatPositions.push({type: 'canFood', x: canFoodPositions[i].x, y: canFoodPositions[i].y})
                canFoodPositions[i].x = -1000
                canFoodPositions[i].y = -1000
            }
        }

        // eat cucumber and become smaller
        for (let i = 0; i < cucumberPositions.length; i++) {
            const distance = calculateFoodDis(cat_x, cat_y, cucumberPositions[i])
            if (distance < collisionDis ) {
                catEatSound2.play()
                adjustSize -= 20
                eatPositions.push({type: 'cucumber',x: cucumberPositions[i].x, y: cucumberPositions[i].y})
                cucumberPositions[i].x = -1000
                cucumberPositions[i].y = -1000
            }
        }

        this.catWidth = this.catWidth + adjustSize // constrain(this.catWidth + this.adjustSize, 40, 160);
        this.catHeight = this.catHeight + adjustSize //constrain(this.catHeight + this.adjustSize, 40, 160);
    }
    checkTouchBox() {
        for (let i = 0; i < boxPositions.length; i++) {
            let box = boxPositions[i];
            // const distance = dist(cat_x + this.catWidth/2, cat_y, box.x, box.y);
            const distance = calculateFoodDis(cat_x,cat_y,boxPositions[i]);
            if (distance < 50 && !box.hasChecked && this.catWidth < box.width &&!isPaused) {
                boxPositions[i].hasChecked = true;
                boxSound.play();
                this.pause();
            }
        }
    }

    pause(){
        catMove_x = 0;
        catMove_y = 0;
        isPaused = true
        setTimeout(()=>{
            // cameraX -= catMove;
            catMove_x = CAT_SPEED_X;
            catMove_y = CAT_SPEED_Y;
            isPaused = false;
            boxSound.stop();
        },3000);
    }

    reset() {
        this.catWidth = catImg.width * this.scaleRate;
        this.catHeight = catImg.height * this.scaleRate;
        this.catLeft = 200;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
    }
}

function calculateFoodDis(cat_x, cat_y, position) {
    const distance = []
    distance.push(dist(cat_x.max, cat_y.min, position.x, position.y))
    distance.push(dist(cat_x.max, cat_y.min, position.x, position.y + position.height))
    distance.push(dist(cat_x.max, cat_y.min, position.x + position.width, position.y))
    distance.push(dist(cat_x.max, cat_y.min, position.x + position.width, position.y + position.height))

    distance.push(dist(cat_x.max, cat_y.max, position.x, position.y))
    distance.push(dist(cat_x.max, cat_y.max, position.x, position.y + position.height))
    distance.push(dist(cat_x.max, cat_y.max, position.x + position.width, position.y))
    distance.push(dist(cat_x.max, cat_y.max, position.x + position.width, position.y + position.height))

    return min(distance)
}



