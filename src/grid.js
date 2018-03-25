import _debounce from 'lodash/debounce';
import Wall from './models/Wall';

let container;
let canvas;
let ctx;

let gridSize = {
  x: 30,
  y: 30
};

let grid = [];

let tileSize = 0;

function createCanvas(containerElement) {
  container = containerElement;
  canvas = document.createElement('canvas');
  canvas.id = 'main-canvas';
  ctx = canvas.getContext('2d');
}

function calculateTileSize(containerWidth, containerHeight) {
  return Math.floor(Math.min(containerWidth / gridSize.x, containerHeight / gridSize.y));
}

function initializeGrid() {
  grid[0] = [];
  grid.push([]);
  for (let i = 0; i < gridSize.x; i++) {
    grid[0][i] = new Wall(i, 0);
  }
  for (let i = 1; i < gridSize.y - 1; i++) {
    grid.push([]);
    grid[i][0] = new Wall(0, i);
    grid[i][gridSize.x - 1] = new Wall(gridSize.x - 1, i)
  }
  grid.push([]);
  for (let i = 0; i < gridSize.x; i++) {
    grid[gridSize.y - 1][i] = new Wall(i, gridSize.y - 1);
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

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgb(0, 0, 0)';
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

function initialize(containerElement) {
  createCanvas(containerElement);
  initializeGrid();
  resizeCanvas();
  window.addEventListener('resize', _debounce(resizeCanvas, 50));
  container.appendChild(canvas);
}

export {
  initialize,
  ctx,
  tileSize
}
