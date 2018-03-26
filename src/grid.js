import Wall from './models/Wall';
import Snake from './models/Snake';

let gridSize = {
  x: 30,
  y: 30
};

const START_POSITION = {
  x: 15,
  y: 15
};

let grid = [];

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

function gridGet({x, y}) {
  return grid[y][x];
}

function gridSet({x, y}, entity) {
  grid[y][x] = entity;
  return entity;
}

export {
  initializeGrid,
  gridSize,
  grid,
  START_POSITION,
  gridGet,
  gridSet
}
