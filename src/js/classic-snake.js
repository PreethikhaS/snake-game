const speed = 100;
const CANVAS_BORDER_COLOUR = "black";
const CANVAS_BACKGROUND_COLOUR = "white";
const SNAKE_COLOUR = "lightgreen";
const SNAKE_BORDER_COLOUR = "darkgreen";
const FOOD_COLOUR = "red";
const FOOD_BORDER_COLOUR = "darkred";

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

let score = 0;
let changingDirection = false;
let foodX;
let foodY;
let dx = 10;
let dy = 0;

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

main();
createFood();
document.addEventListener("keydown", changeDirection);

function main() {
  if (didGameEnd()) return;

  setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  }, speed);
}

function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
  ctx.strokeStyle = CANVAS_BORDER_COLOUR;

  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Remaining functions (drawSnake, createFood, changeDirection, didGameEnd, etc.)
