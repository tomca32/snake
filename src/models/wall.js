import {ctx, tileSize} from '../grid.js';

export default class Wall {
  constructor(x, y) {
    this.position = {x, y};
  }

  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);
  }
}
