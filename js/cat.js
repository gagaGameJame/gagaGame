class Cat {
    constructor(scaleRate) {
        this.scaleRate = scaleRate;
        this.catWidth = catImg.width * scaleRate;
        this.catHeight = catImg.height * scaleRate;
        this.catLeft = 200;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
        this.collisionDisFood = this.catHeight / 2 ;//this.catHeight * 0.2
        this.collisionDisBox = this.catHeight / 2;
        this.stuckBox;
        this.stuckTime = 3;
        this.boxLeftTime = this.stuckTime;
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
        if(!isPaused) {
            catMove_x = catSpeed_x;
        }
        this.catLeft += catMove_x;
        this.catTop += moveTop;

        if (this.catTop <= carpetTop || this.catTop + this.catHeight >= carpetEnd) {
            outSideCarpet = true;
            gameStatus = 'Lost';
            sceneCounter = 2;
            return;
        }

        let adjustCatWidth = this.catWidth * 0.2;
        let adjustCatHeight = this.catHeight * 0.2;

        cat_x = {
            min:this.catLeft + adjustCatWidth,
            max:this.catLeft + this.catWidth - adjustCatWidth
        }

        cat_y = {
            min: this.catTop + adjustCatHeight,
            max: this.catTop + this.catHeight - adjustCatHeight
        }

        this.checkItem();

        if(isPaused){
            this.showBoxTime(this.stuckBox,this.boxLeftTime);
        } else {
            image(catImg, this.catLeft, this.catTop, this.catWidth, this.catHeight, 0, 0, catImg.width, catImg.width);
        }

    }

    checkEatFood(itemPosition){
        let adjustSize = 1;
        if(isPaused){
            return;
        }
        const distance = calculateDis(cat_x, cat_y, itemPosition)
        if (distance < this.collisionDisFood) {
            if(itemPosition.type === 'canFood') {
                catEatSound1.play()
                adjustSize += 0.4;
                score += 5;
            } else {
                catEatSound2.play()
                adjustSize += -0.2;
                score += 2;
            }

            eatPositions.push({type: itemPosition.type, x: itemPosition.x, y: itemPosition.y})
            itemPosition.x = -1000
            itemPosition.y = -1000
            catSpeed_x += 1;
        }
        this.catWidth = constrain(this.catWidth * adjustSize,catImg.width *0.1, catImg.width * this.scaleRate); // constrain(this.catWidth + this.adjustSize, 40, 160);
        this.catHeight = constrain(this.catHeight * adjustSize,catImg.height *0.1, catImg.height * this.scaleRate) //constrain(this.catHeight + this.adjustSize, 40, 160);
    }

    checkTouchBox(boxPosition) {
        let box = boxPosition;
        const distance = calculateDis(cat_x,cat_y,boxPosition);
        if (distance < this.collisionDisBox && !box.hasChecked &&!isPaused) {
            boxPosition.hasChecked = true;
            if(this.catWidth < box.width * 0.7 ) {
                boxSound.play();
                this.stuckBox = boxPosition;
                this.pause(boxPosition);
            } else {
                boxPosition.hasChecked = true;
                boxPosition.x = -1000
                boxPosition.y = -1000
            }
        }
    }

    checkItem() {
        for (let i = 0; i < itemPositions.length; i++) {
            if(itemPositions[i].type === 'paperBox'){
                this.checkTouchBox(itemPositions[i])
            } else  {
                this.checkEatFood(itemPositions[i])
            }
        }
    }

    pause(boxPosition){
        catMove_x = 0;
        catMove_y = 0;
        isPaused = true;
        this.boxLeftTime = this.stuckTime;
        boxPosition.image = catInBoxImg
        for(let i = 1; i < this.stuckTime ; i++) {
            setTimeout(() => {
                this.boxLeftTime = this.stuckTime - i;
            }, i * 1000);
        }
        setTimeout(()=>{
            // cameraX -= catMove;
            // catMove_x = CAT_SPEED_X;
            catMove_x = catSpeed_x;
            catMove_y = INIT_CAT_SPEED_Y;
            isPaused = false;
            boxSound.stop();
            boxPosition.x = -1000
            boxPosition.y = -1000
        },3000);
    }

    reset() {
        this.catWidth = catImg.width * this.scaleRate;
        this.catHeight = catImg.height * this.scaleRate;
        this.catLeft = 200;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
    }

    showBoxTime(box, boxLeftTime){
        push();
        fill(255);
        textSize(40);
        text(boxLeftTime + '\'\'',box.x+box.width/2,box.y+box.height/2.1);
        pop();
    }
}

function calculateDis(cat_x, cat_y, position ) {
    let adjustWidth = position.width * 0.3
    let adjustHeight = position.height * 0.3
    let foodOrBox_x = {min: position.x + adjustWidth, max: position.x + position.width - adjustWidth};
    let foodOrBox_y = {min: position.y + adjustHeight, max: position.y + position.height - adjustHeight*1.5};
    const distance = []
    distance.push(dist(cat_x.max, cat_y.min, foodOrBox_x.min, foodOrBox_y.min))
    distance.push(dist(cat_x.max, cat_y.min, foodOrBox_x.min, foodOrBox_y.max))
    distance.push(dist(cat_x.max, cat_y.min, foodOrBox_x.max, foodOrBox_y.min))
    distance.push(dist(cat_x.max, cat_y.min, foodOrBox_x.max, foodOrBox_y.max))

    distance.push(dist(cat_x.max, cat_y.max, foodOrBox_x.min, foodOrBox_y.min))
    distance.push(dist(cat_x.max, cat_y.max, foodOrBox_x.min, foodOrBox_y.max))
    distance.push(dist(cat_x.max, cat_y.max, foodOrBox_x.max, foodOrBox_y.min))
    distance.push(dist(cat_x.max, cat_y.max, foodOrBox_x.max, foodOrBox_y.max))

    return min(distance)
}


