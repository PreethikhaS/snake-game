var canvas, ctx;

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);

  var x = 8;
  setInterval(draw, 1000 / x);
};

var gridSize = (tileSize = 20);
var nextX = (nextY = 0);

var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

var appleX = (appleY = 15);

function draw() {
  snakeX += nextX;
  snakeY += nextY;

  if (snakeX < 0) snakeX = gridSize - 1;
  if (snakeX > gridSize - 1) snakeX = 0;

  if (snakeY < 0) snakeY = gridSize - 1;
  if (snakeY > gridSize - 1) snakeY = 0;

  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );

    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
    }
  }

  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}
