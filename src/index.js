import style from './index.css';
import {calculateStartPosition, GRID_SIZES, gridSize, initializeGrid, updateGridSize} from './grid';
import {initializeCanvas, redrawCanvas, resizeCanvas} from './drawing';
import Snake from './models/Snake';
import {initializeDefaultDirections, inputStep} from './input';
import {isPaused, pause, unpause} from './pause';

const SPEED = {
  slow: 200,
  normal: 100,
  fast: 50,
  ludicrous: 10
};

let stepDuration = SPEED.normal;
let loop;

function startGame() {
  pause();
  initializeGrid();
  let snakeHead = new Snake(calculateStartPosition());
  initializeCanvas(document.getElementById('app'));
  redrawCanvas();
  initializeDefaultDirections();
  unpause();

  loop = setTimeout(function step() {
    if (!isPaused) {
      snakeHead = snakeHead.step(inputStep());
      redrawCanvas();
      if (!snakeHead.alive) {
        return startGame();
      }
    }
    loop = setTimeout(step, stepDuration);
  }, stepDuration);
}

for (let elem of document.getElementsByClassName('speed-button')) {
  elem.addEventListener('click', () => {
    stepDuration = SPEED[elem.getAttribute('data-speed')];
  });
}

for (let elem of document.getElementsByClassName('size-button')) {
  elem.addEventListener('click', () => {
    updateGridSize(GRID_SIZES[elem.getAttribute('data-size')]);
    resizeCanvas();
    clearTimeout(loop);
    startGame();
  });
}

startGame();
