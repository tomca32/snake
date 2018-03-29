import Wall from './models/Wall';
import Food from './models/Food';

let gridSize = {
  x: 30,
  y: 30
};

const START_POSITION = {
  x: 15,
  y: 15
};

let grid;

function initializeGrid() {
  grid = [];
  grid.push([]);
  for (let i = 0; i < gridSize.x; i++) {
    new Wall({x: i, y:0});
  }
  for (let i = 1; i < gridSize.y - 1; i++) {
    grid.push([]);
    new Wall({x: 0, y: i});
    new Wall({x: gridSize.x - 1, y: i})
  }
  grid.push([]);
  for (let i = 0; i < gridSize.x; i++) {
    new Wall({x: i, y: gridSize.y - 1});
  }
  Food.spawnFood();
}

function gridGet({x, y}) {
  return grid[y][x];
}

function gridSet({x, y}, entity) {
  grid[y][x] = entity;
  return entity;
}

function getRandomEmptyPosition() {
  let position = {
    x: Math.floor(Math.random() * gridSize.x - 1) + 1,
    y: Math.floor(Math.random() * gridSize.y - 1) + 1,
  };
  if (gridGet(position) === void 0) {
    return position;
  }
  return getRandomEmptyPosition();
}

export {
  initializeGrid,
  gridSize,
  grid,
  START_POSITION,
  gridGet,
  gridSet,
  getRandomEmptyPosition
}
