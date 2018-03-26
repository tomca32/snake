import Entity from './Entity';
import {SNAKE_COLOR} from '../colors';
import {gridSet} from '../grid';

export default class Snake extends Entity {
  color = SNAKE_COLOR;

  constructor(x, y, previousNode) {
    super(x, y);
    this.previousNode = previousNode;
  }

  step(direction) {
    let newPosition = direction(this.position);
    gridSet(this.position, void 0);
    this.position = newPosition;
    gridSet(this.position, this);
    return this;
  }
}
