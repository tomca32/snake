import Entity from './Entity';
import {SNAKE_COLOR} from '../colors';
import {gridGet, gridSet} from '../grid';

export default class Snake extends Entity {
  color = SNAKE_COLOR;
  alive = true;

  constructor(x, y, previousNode) {
    super(x, y);
    this.previousNode = previousNode;
  }

  step(direction) {
    let newPosition = direction(this.position);
    gridSet(this.position, void 0);
    if (this.checkCollision(newPosition)) {
      this.position = newPosition;
      gridSet(this.position, this);
    } else {

    }
    return this;
  }

  checkCollision(newPosition) {
    if (gridGet(newPosition) === void 0) {
      return true;
    }
    this.alive = false;
    return false;
  }
}
