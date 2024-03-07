

//board
var blockSize = 28;
var rows = 20;
var cols = 20;

var field = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];



var board;
var context;

//snake head
var snakeX = blockSize * 0;
var snakeY = blockSize * 19;
var snakeBody = [];

var velocityX = 1;
var velocityY = 0;
var directionQueue = [];

//food
var foodX;
var foodY;

var gameOver = false;
var score;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood(); score = 0; 
    document.addEventListener("keyup", changeDirection);
    
    setInterval(update , 1000/8);
}

function update() {
    if (gameOver) return;

    //draw board
    context.fillStyle = '#113510';
    context.fillRect(0 , 0 , board.width , board.height);

    //out of board check
    if (snakeX > board.width-blockSize)
        snakeX = 0;
    else if (snakeX < 0)
        snakeX = board.width-blockSize;
    else if (snakeY > board.height - blockSize)
        snakeY = 0;
    else if (snakeY < 0)
        snakeY = board.height - blockSize;

    //Eat apple check
    if (snakeX == foodX && snakeY == foodY) { ++score;
        snakeBody.push([foodX , foodY]);

        field[snakeBody[snakeBody.length-1][1] / blockSize][snakeBody[snakeBody.length-1][0] / blockSize] = 1;

        while (field[foodY/blockSize][foodX/blockSize])
            placeFood();

        document.getElementById("score").textContent = score;
    }

    //draw apple
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    //field matrix update before move
    if (snakeBody.length) {
        field[snakeBody[snakeBody.length-1][1] / blockSize][snakeBody[snakeBody.length-1][0] / blockSize] = 0;
        field[snakeY / blockSize][snakeX / blockSize] = 1;
    }

    //Snake
        //movement  
    for (let i = snakeBody.length-1; i > 0; --i) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) snakeBody[0] = [snakeX , snakeY];
    if (directionQueue.length > 0) {
        var direction = directionQueue.shift();
        if (velocityX + direction[0] && direction[1] + velocityY) {
            velocityX = direction[0];
            velocityY = direction[1];
        }
    }
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
        //draw
    context.fillStyle= '#AE6503';
    for (let i = snakeBody.length-1; i >= 0; --i)
        context.fillRect(snakeBody[i][0] , snakeBody[i][1] , blockSize , blockSize);
    context.fillStyle= '#F2A947';
    for (let i = snakeBody.length-1; i >= 0; --i)
        context.fillRect(snakeBody[i][0]+1 , snakeBody[i][1]+1 , blockSize-2 , blockSize-2);
    context.fillStyle= '#AE6503';
    context.fillRect(snakeX , snakeY , blockSize , blockSize);

    //check for collision
    if (field[snakeY / blockSize][snakeX / blockSize])
        gameOver = true;
}

function changeDirection(e) {
    switch (e.key) {
        case 'w':
            directionQueue.push([0,-1]);
            break;
        case 's':
            directionQueue.push([0,1]);
            break;
        case 'a':
            directionQueue.push([-1,0]);
            break;
        case 'd':
            directionQueue.push([1,0]);
            break;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}
