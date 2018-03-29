import {FOOD_COLOR} from '../colors';
import Entity from './Entity';
import {getRandomEmptyPosition} from '../grid';

export default class Food extends Entity {
  color = FOOD_COLOR;

  static spawnFood() {
    new Food(getRandomEmptyPosition());
  }

  collision(snake) {
    this.removeFromGrid();
    snake.grow();
    Food.spawnFood();
  }
}
