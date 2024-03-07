

const blockSize = 30;
const rows = 20;
const cols = 20;

var snake1 , snake2;
var apple;

const colorSet1 = ['#AE6503' , '#F2A947'];
const colorSet2 = ['#111111' , '#111111'];

var score1 = 0;
var score2 = 0;

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

var directionQueue1 = [];
var directionQueue2 = [];

//speed 5-15 is ok
var speed = 4;


//Loading function
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    document.addEventListener("keyup", changeDirection);

    snake1 = new Snake(blockSize , 0 , colorSet1);
    snake2 = new Snake(blockSize , blockSize*(cols-1) , colorSet2);
    apple = new Apple;

    setInterval(gameLoop , 1000/speed);
}

var gameOver = false;
function gameLoop() {
    if (gameOver) return;

    //draw board
    context.fillStyle = '#113510';
    context.fillRect(0 , 0 , board.width , board.height);

    //Draw
    apple.draw();
    snake1.draw();
    snake2.draw();

    //field matrix update before move
    if (snake1.body.length) {
        field[snake1.body[snake1.body.length-1][1] / blockSize][snake1.body[snake1.body.length-1][0] / blockSize] = 0;
        field[snake1.headY / blockSize][snake1.headX / blockSize] = 1;
    }
    if (snake2.body.length) {
        field[snake2.body[snake2.body.length-1][1] / blockSize][snake2.body[snake2.body.length-1][0] / blockSize] = 0;
        field[snake2.headY / blockSize][snake2.headX / blockSize] = 2;
    }

    //check is apple eaten
    if (field[apple.y/blockSize][apple.x/blockSize] == 1) { score1++; console.log("Op");
        snake1.body.push([apple.x , apple.y]);
        field[snake1.body[snake1.body.length-1][1] / blockSize][snake1.body[snake1.body.length-1][0] / blockSize] = 1;
        while (field[apple.y/blockSize][apple.x/blockSize])
            apple.relocate();
        document.getElementById("score1").textContent = score1;
    }
    else if (field[apple.y/blockSize][apple.x/blockSize] == 2) { score2++;
        snake2.body.push([apple.x , apple.y]);
        field[snake2.body[snake2.body.length-1][1] / blockSize][snake2.body[snake2.body.length-1][0] / blockSize] = 2;
        while (field[apple.y/blockSize][apple.x/blockSize])
            apple.relocate();
        document.getElementById("score2").textContent = score2;
    }

    //Check all events
    if (directionQueue1.length > 0) {
        snake1.changeDirection(directionQueue1.shift());
    }
    if (directionQueue2.length > 0) {
        snake2.changeDirection(directionQueue2.shift());
    }


    //Movement
    snake1.move();
    snake2.move();


    //Check for game over
    if (field[snake1.headY/blockSize][snake1.headX/blockSize]) gameOver = true;
    else if (field[snake2.headY/blockSize][snake2.headX/blockSize]) gameOver = true;
}

function changeDirection(e) {
    switch (e.key) {
        case 'w':
            directionQueue1.push([0,-1]);
            break;
        case 's':
            directionQueue1.push([0,1]);
            break;
        case 'a':
            directionQueue1.push([-1,0]);
            break;
        case 'd':
            directionQueue1.push([1,0]);
            break;

        case 'ArrowUp':
            directionQueue2.push([0,-1]);
            break;
        case 'ArrowDown':
            directionQueue2.push([0,1]);
            break;
        case 'ArrowLeft':
            directionQueue2.push([-1,0]);
            break;
        case 'ArrowRight':
            directionQueue2.push([1,0]);
            break;
    }
}