import style from './index.css';
import {initializeGrid, START_POSITION} from './grid';
import {initializeCanvas, redrawCanvas} from './drawing';
import Snake from './models/Snake';
import {initializeDefaultDirections, inputStep} from './input';

const STEP_DURATION = 100;


function startGame() {
  initializeGrid();
  let snakeHead = new Snake(START_POSITION);
  initializeCanvas(document.getElementById('app'));
  redrawCanvas();
  initializeDefaultDirections();

  let loop = setTimeout(function step() {
    snakeHead = snakeHead.step(inputStep());
    redrawCanvas();
    if (!snakeHead.alive) {
      return startGame();
    }

    loop = setTimeout(step, STEP_DURATION);
  }, STEP_DURATION);
}

startGame();
