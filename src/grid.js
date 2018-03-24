import _debounce from 'lodash/debounce';

let container;
let canvas;

let gridSize = {
  x: 30,
  y: 30
};

let tileSize = 0;

function createCanvas(containerElement) {
  container = containerElement;
  canvas = document.createElement('canvas');
  canvas.id = 'main-canvas';
}

function calculateTileSize(containerWidth, containerHeight) {
  return Math.min(containerWidth / gridSize.x, containerHeight / gridSize.y);
}

function resizeCanvas() {
  requestAnimationFrame(() => {
    tileSize = calculateTileSize(container.clientWidth, container.clientHeight);
    canvas.width = tileSize * gridSize.x;
    canvas.height = tileSize * gridSize.y;
  });
}

function initialize(containerElement) {
  createCanvas(containerElement);
  resizeCanvas();
  window.addEventListener('resize', _debounce(resizeCanvas, 50));
  container.appendChild(canvas);
}

export default initialize;
