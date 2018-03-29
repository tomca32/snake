import {ctx, tileSize} from '../drawing';
import {gridSet} from '../grid';

export default class Entity {
  color = 'rgb(0, 0, 0)';

  constructor(position) {
    this.position = position;
    if (position) {
      gridSet(position, this);
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);
  }

  removeFromGrid() {
    if (this.position === void 0) {
      return;
    }
    gridSet(this.position, void 0);
  }
}
