class Cat {
    constructor(scaleRate) {
        this.scaleRate = scaleRate;
        this.catWidth = catImg.width * scaleRate;
        this.catHeight = catImg.height * scaleRate;
        this.catLeft = 200;
        this.catTop = tileHeight / 2 - this.catHeight / 2;
        this.collisionDisFood = 50 //this.catHeight * 0.2
        this.collisionDisBox = 50;
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
            image(catInBoxImg, this.stuckBox.x, this.stuckBox.y + 50, catInBoxImg.width * 0.7, catInBoxImg.height * 0.7, 0, 0, catImg.width, catImg.width);
            this.showBoxTime(this.stuckBox,this.boxLeftTime);
            return;
        }
        image(catImg, this.catLeft, this.catTop, this.catWidth, this.catHeight, 0, 0, catImg.width, catImg.width);

    }

    checkEatFood(itemPosition){
        let adjustSize = 0;
        if(isPaused){
            return;
        }
        const distance = calculateDis(cat_x, cat_y, itemPosition)
        if (distance < this.collisionDisFood) {
            if(itemPosition.type === 'canFood') {
                catEatSound1.play()
                adjustSize += 40;
                score += 10;
            } else {
                catEatSound2.play()
                adjustSize += -20;
                score += 5;
            }

            eatPositions.push({type: itemPosition.type, x: itemPosition.x, y: itemPosition.y})
            itemPosition.x = -1000
            itemPosition.y = -1000
        }

        this.catWidth = this.catWidth + adjustSize // constrain(this.catWidth + this.adjustSize, 40, 160);
        this.catHeight = this.catHeight + adjustSize //constrain(this.catHeight + this.adjustSize, 40, 160);
    }

    checkTouchBox(boxPosition) {
        let box = boxPosition;
        const distance = calculateDis(cat_x,cat_y,boxPosition);
        if (distance < this.collisionDisBox && !box.hasChecked && this.catWidth < box.width * 0.7  &&!isPaused) {
            boxPosition.hasChecked = true;
            boxSound.play();
            this.stuckBox = boxPosition;
            this.pause(boxPosition);
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
        boxPosition.x = -1000
        boxPosition.y = -1000
        for(let i = 1; i < this.stuckTime ; i++) {
            setTimeout(() => {
                this.boxLeftTime = this.stuckTime - i;
            }, i * 1000);
        }
        setTimeout(()=>{
            // cameraX -= catMove;
            catMove_x = CAT_SPEED_X;
            catMove_y = CAT_SPEED_Y;
            isPaused = false;
            boxSound.stop();
            // todo: update box image
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
    let foodOrBox_y = {min: position.y + adjustHeight, max: position.y + position.height - adjustHeight};
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


