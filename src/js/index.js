let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let scoreDisplay = document.getElementById("score");
let startBtn = document.getElementById("start-btn");
let gameOverScreen = document.getElementById("game-over");
let finalScore = document.getElementById("final-score");
let restartBtn = document.getElementById("restart-btn");

let grid = 16;
let count = 0;

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};
let apple = { x: 320, y: 320 };
let score = 0;
let isGameRunning = false;

// Utility function to get random grid positions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Reset game state
function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
  score = 0;
  scoreDisplay.innerText = "Score: 0";
  isGameRunning = true;
}


// Load sound effects
const moveSound = new Audio("assets/move.mp3");
const scoreSound = new Audio("assets/score.mp3");
const failSound = new Audio("assets/fail.mp3");
const gameOverSound = new Audio("assets/game-over.mp3");

// Function to play a sound
function playSound(sound) {
  sound.currentTime = 0; // Reset sound to start
  sound.play();
}

// Main game loop
function loop() {
  if (!isGameRunning) return;

  requestAnimationFrame(loop);

  if (++count < 4) return;

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move snake
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.dx !== 0 || snake.dy !== 0) playSound(moveSound);

  // Wrap around edges
  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;

  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  // Track snake body
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) snake.cells.pop();

  // Draw apple
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  // Draw snake
  context.fillStyle = "lime";
  snake.cells.forEach((cell, index) => {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Snake eats apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      playSound(scoreSound);
      scoreDisplay.innerText = `Score: ${score}`;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // Collision with self
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        playSound(failSound);
        gameOver();
      }
    }
  });
}

// Handle game over
function gameOver() {
  isGameRunning = false;
  playSound(gameOverSound);
  gameOverScreen.style.display = "block";
  finalScore.innerText = `Final Score: ${score}`;
}

// Event listeners for button clicks
startBtn.addEventListener("click", () => {
  resetGame();
  gameOverScreen.style.display = "none";
  loop();
});

restartBtn.addEventListener("click", () => {
  resetGame();
  gameOverScreen.style.display = "none";
  loop();
});

// Handle snake movement
document.addEventListener("keydown", (e) => {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
    playSound(moveSound);
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
    playSound(moveSound);
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
    playSound(moveSound);
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
    playSound(moveSound);
  }
});
