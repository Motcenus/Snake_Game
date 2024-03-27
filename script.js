
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 10;
let dy = 0;
let score = 0;

const scoreElement = document.getElementById("score");

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(food.x, food.y, 10, 10);

    ctx.fillStyle = "blue";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = "Score: " + score;
        generateFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isColliding(head)) {
        clearInterval(gameLoop);
        alert("Game Over! Your score is: " + score);
    }
}

function isColliding(head) {
    return snake.slice(1).some(segment => {
        return segment.x === head.x && segment.y === head.y;
    });
}

document.addEventListener("keydown", event => {
    const key = event.key;
    if (key === "ArrowUp" && dy !== 10) {
        dx = 0; dy = -10;
    } else if (key === "ArrowDown" && dy !== -10) {
        dx = 0; dy = 10;
    } else if (key === "ArrowLeft" && dx !== 10) {
        dx = -10; dy = 0;
    } else if (key === "ArrowRight" && dx !== -10) {
        dx = 10; dy = 0;
    }
});

generateFood();
const gameLoop = setInterval(draw, 100);
