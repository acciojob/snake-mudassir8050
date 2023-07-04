document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreBoard = document.createElement('div');
    scoreBoard.className = 'scoreBoard';
    scoreBoard.textContent = 'Score: 0';

    gameContainer.appendChild(scoreBoard);

    const pixels = Array.from({ length: 1600 }, (_, i) => i + 1);
    let snake = [801, 800];
    let direction = 'right';
    let score = 0;
    let food = generateFood();

    function generateFood() {
        const foodIndex = Math.floor(Math.random() * pixels.length);
        const foodPixel = pixels[foodIndex];
        const foodElement = document.createElement('div');
        foodElement.id = `pixel${foodPixel}`;
        foodElement.className = 'pixel food';
        gameContainer.appendChild(foodElement);
        return foodPixel;
    }

    function updateSnake() {
        const newHead = snake[0] + (direction === 'right' ? 1 : direction === 'left' ? -1 : direction === 'up' ? -40 : 40);
        
        if (snake.includes(newHead) || newHead < 1 || newHead > 1600 || (newHead % 40 === 0 && direction === 'right') || ((newHead - 1) % 40 === 0 && direction === 'left')) {
            clearInterval(gameInterval);
            alert('Game Over');
            return;
        }
        
        const newHeadPixel = document.getElementById(`pixel${newHead}`);
        newHeadPixel.classList.add('snakeBodyPixel');
        snake.unshift(newHead);

        if (newHead === food) {
            newHeadPixel.classList.remove('food');
            score++;
            scoreBoard.textContent = `Score: ${score}`;
            food = generateFood();
        } else {
            const tail = snake.pop();
            const tailPixel = document.getElementById(`pixel${tail}`);
            tailPixel.classList.remove('snakeBodyPixel');
        }
    }

    function handleKeyPress(event) {
        const key = event.key;
        if ((key === 'ArrowRight' || key === 'd') && direction !== 'left') {
            direction = 'right';
        } else if ((key === 'ArrowLeft' || key === 'a') && direction !== 'right') {
            direction = 'left';
        } else if ((key === 'ArrowUp' || key === 'w') && direction !== 'down') {
            direction = 'up';
        } else if ((key === 'ArrowDown' || key === 's') && direction !== '
