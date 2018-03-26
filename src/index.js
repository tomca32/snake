import style from './index.css';
import {grid, initializeGrid, START_POSITION} from './grid';
import {initializeCanvas, redrawCanvas} from './drawing';
import Snake from './models/Snake';
import {currentDirection, inputStep} from './input';

const STEP_DURATION = 100;

initializeGrid();

let snakeHead = new Snake(START_POSITION.x, START_POSITION.y);
grid[START_POSITION.y][START_POSITION.x] = snakeHead;

initializeCanvas(document.getElementById('app'));

let loop = setTimeout(function step() {
  snakeHead = snakeHead.step(currentDirection);
  inputStep();
  if (!snakeHead.alive) {
    return;
  }
  redrawCanvas();
  loop = setTimeout(step, STEP_DURATION);
}, STEP_DURATION);
