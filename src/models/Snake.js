import Entity from './Entity';
import {SNAKE_COLOR} from '../colors';
import {grid, gridGet, gridSet} from '../grid';
import {directionLeft} from '../input';

export default class Snake extends Entity {
  color = SNAKE_COLOR;
  alive = true;

  constructor(position, previousNode, numberOfChildren = 4) {
    super(position);
    this.previousNode = previousNode;
    if (numberOfChildren) {
      this.nextNode = new Snake(directionLeft(position), this, numberOfChildren - 1);
    }
  }

  step(direction) {
    !this.isTail() && this.nextNode.step(() => this.position);

    let newPosition = direction(this.position);
    if (this.isHead()) {
      this.checkCollision(newPosition);
      if (this.alive) {
        this.move(newPosition);
      }
    } else {
      this.move(newPosition);
    }
    return this;
  }

  checkCollision(newPosition) {
    let entityAtNewPosition = gridGet(newPosition);
    if (entityAtNewPosition === void 0) {
      return;
    }
    entityAtNewPosition.collision(this);
  }

  isHead() {
    return this.previousNode === void 0;
  }

  isTail() {
    return this.nextNode === void 0;
  }

  move(newPosition) {
    this.isTail() && this.removeFromGrid();
    this.position = newPosition;
    gridSet(this.position, this);
  }

  die() {
    if (!this.isHead()) {
      return this.previousNode.die();
    }
    this.alive = false;
    return false;
  }

  collision(snake) {
    snake.die();
  }

  grow() {
    if (this.isTail()) {
      return this.nextNode = new Snake(void 0, this, 0);
    }
    this.nextNode.grow();
  }
}
