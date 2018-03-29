import _debounce from 'lodash/debounce';
import {BACKGROUND_COLOR} from './colors';
import {gridSize, grid} from './grid';

let ctx;
let container;
let canvas;
let tileSize;

function calculateTileSize(containerWidth, containerHeight) {
  return Math.floor(Math.min(containerWidth / gridSize.x, containerHeight / gridSize.y));
}

function createCanvas(containerElement) {
  container = containerElement;
  canvas = document.createElement('canvas');
  canvas.id = 'main-canvas';
  ctx = canvas.getContext('2d');
}

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  draw();
}

function draw() {
  for (let y = 0; y < gridSize.y; y++) {
    for (let x = 0; x < gridSize.x; x++) {
      if (grid[y][x] !== void 0) {
        grid[y][x].draw();
      }
    }
  }
}

function resizeCanvas() {
  requestAnimationFrame(() => {
    tileSize = calculateTileSize(container.clientWidth, container.clientHeight);
    canvas.width = tileSize * gridSize.x;
    canvas.height = tileSize * gridSize.y;

    redrawCanvas();
  });
}

function initializeCanvas(containerElement) {
  if (canvas !== void 0) {
    return;
  }
  createCanvas(containerElement);
  resizeCanvas();
  window.addEventListener('resize', _debounce(resizeCanvas, 50));
  container.appendChild(canvas);
}

export {
  initializeCanvas,
  ctx,
  tileSize,
  redrawCanvas,
  resizeCanvas
}
