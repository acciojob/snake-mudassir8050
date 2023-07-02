//your code here
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");
  
  const width = 20;
  const height = 20;
  
  let snake = [{ x: 10, y: 19 }];
  let food = { x: 15, y: 10 };
  let dx = 1;
  let dy = 0;
  let score = 0;
  
  const draw = () => {
    gameContainer.innerHTML = "";
    
    // Draw snake
    snake.forEach((segment) => {
      const snakeBodyPixel = document.createElement("div");
      snakeBodyPixel.classList.add("pixel", "snakeBodyPixel");
      snakeBodyPixel.style.gridColumn = segment.x;
      snakeBodyPixel.style.gridRow = segment.y;
      gameContainer.appendChild(snakeBodyPixel);
    });
    
    // Draw food
    const foodPixel = document.createElement("div");
    foodPixel.classList.add("pixel", "food");
    foodPixel.style.gridColumn = food.x;
    foodPixel.style.gridRow = food.y;
    gameContainer.appendChild(foodPixel);
  };
  
  const moveSnake = () => {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreElement.textContent = score;
      generateFood();
    } else {
      snake.pop();
    }
  };
  
  const generateFood = () => {
    food = {
      x: Math.floor(Math.random() * width) + 1,
      y: Math.floor(Math.random() * height) + 1
    };
  };
  
  const checkCollision = () => {
    const head = snake[0];
    
    // Check if snake hits the wall
    if (head.x < 1 || head.x > width || head.y < 1 || head.y > height) {
      return true;
    }
    
    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    
    return false;
  };
  
  const changeDirection = (event) => {
    const key = event.keyCode;
    
    if (key === 37 && dx !== 1) { // left arrow
