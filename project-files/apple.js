

class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * cols) * blockSize;
        this.y = Math.floor(Math.random() * rows) * blockSize;
    }

    draw() {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(this.x + blockSize / 2, this.y + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
        context.fill();
    }

    relocate() {
        this.x = Math.floor(Math.random() * cols) * blockSize;
        this.y = Math.floor(Math.random() * rows) * blockSize;
    }
}