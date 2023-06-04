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

        // eat can and become larger
        this.checkEatFood();
        this.checkTouchBox();
        if(isPaused){
            image(catInBoxImg, this.stuckBox.x, this.stuckBox.y + 50, catInBoxImg.width * 0.7, catInBoxImg.height * 0.7, 0, 0, catImg.width, catImg.width);
            this.showBoxTime(this.stuckBox,this.boxLeftTime);
            return;
        }
        image(catImg, this.catLeft, this.catTop, this.catWidth, this.catHeight, 0, 0, catImg.width, catImg.width);

    }

    checkEatFood(){
        let adjustSize = 0;
        if(isPaused){
            return;
        }
        for (let i = 0; i < canFoodPositions.length; i++) {
            const distance = calculateDis(cat_x, cat_y, canFoodPositions[i])
            if (distance < this.collisionDisFood) {
                catEatSound1.play()
                adjustSize += 40
                eatPositions.push({type: 'canFood', x: canFoodPositions[i].x, y: canFoodPositions[i].y})
                canFoodPositions[i].x = -1000
                canFoodPositions[i].y = -1000
                score += 10;
            }
        }

        // eat cucumber and become smaller
        for (let i = 0; i < cucumberPositions.length; i++) {
            const distance = calculateDis(cat_x, cat_y, cucumberPositions[i])
            if (distance < this.collisionDisFood ) {
                catEatSound2.play()
                adjustSize -= 20
                eatPositions.push({type: 'cucumber',x: cucumberPositions[i].x, y: cucumberPositions[i].y})
                cucumberPositions[i].x = -1000
                cucumberPositions[i].y = -1000
                score += 5;
            }
        }

        this.catWidth = this.catWidth + adjustSize // constrain(this.catWidth + this.adjustSize, 40, 160);
        this.catHeight = this.catHeight + adjustSize //constrain(this.catHeight + this.adjustSize, 40, 160);
    }
    checkTouchBox() {
        for (let i = 0; i < boxPositions.length; i++) {
            let box = boxPositions[i];
            const distance = calculateDis(cat_x,cat_y,boxPositions[i]);
            if (distance < this.collisionDisBox && !box.hasChecked && this.catWidth < box.width * 0.7  &&!isPaused) {
                boxPositions[i].hasChecked = true;
                boxSound.play();
                this.stuckBox = {x:box.x, y:box.y, width:box.width,height:box.height};
                this.pause(boxPositions[i]);
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


