import style from './index.css';
import {calculateStartPosition, initializeGrid} from './grid';
import {initializeCanvas, redrawCanvas} from './drawing';
import Snake from './models/Snake';
import {initializeDefaultDirections, inputStep} from './input';
import {isPaused} from './pause';

const SPEED = {
  slow: 200,
  normal: 100,
  fast: 50,
  ludicrous: 10
};

let stepDuration = SPEED.normal;


function startGame() {
  initializeGrid();
  let snakeHead = new Snake(calculateStartPosition());
  initializeCanvas(document.getElementById('app'));
  redrawCanvas();
  initializeDefaultDirections();

  let loop = setTimeout(function step() {
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
  elem.addEventListener('click', _e => {
    stepDuration = SPEED[elem.getAttribute('data-speed')];
  });
}

startGame();
