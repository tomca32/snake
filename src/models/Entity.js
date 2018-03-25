import {ctx, tileSize} from '../grid';

export default class Entity {
  color = 'rgb(0, 0, 0)';

  constructor(x, y) {
    this.position = {x, y};
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);
  }
}
