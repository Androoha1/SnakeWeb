

class Snake {
    constructor(x , y , colors) {
        this.headX = x;
        this.headY = y;
        this.body = [[x-28 , 0]];

        this.velocityX = 1;
        this.velocityY = 0;

        this.colorSet = colors
    }

    draw() {
        window.context.fillStyle= this.colorSet[0];
        context.fillRect(this.headX , this.headY , blockSize , blockSize);

        for (let i = 0; i < this.body.length; ++i) {
            context.fillRect(this.body[i][0] , this.body[i][1] , blockSize , blockSize);
        }

        window.context.fillStyle= this.colorSet[1];
        for (let i = 0; i < this.body.length; ++i) {
            context.fillRect(this.body[i][0]+1 , this.body[i][1]+1 , blockSize-2 , blockSize-2);
        }
    }

    move() {
        for (let i = this.body.length-1; i > 0; --i)
            this.body[i] = this.body[i-1];
        if (this.body.length) this.body[0] = [this.headX , this.headY];
        this.headX += this.velocityX * blockSize;
        this.headY += this.velocityY * blockSize;

        if (this.headX > board.width-blockSize) this.headX = 0;
        else if (this.headX < 0) this.headX = board.width-blockSize;
        else if (this.headY > board.height-blockSize) this.headY = 0;
        else if (this.headY < 0) this.headY = board.height - blockSize;
    }

    changeDirection(dir) {
        if (this.velocityX+dir[0] && this.velocityY+dir[1]) {
            this.velocityX = dir[0];
            this.velocityY = dir[1];
        }
    }

    grow() {
        this.body.push([this.headX , this.headY]);
    }
}