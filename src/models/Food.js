import {FOOD_COLOR} from '../colors';
import Entity from './Entity';
import {getRandomEmptyPosition, gridSet} from '../grid';

export default class Food extends Entity {
  color = FOOD_COLOR;

  static spawnFood() {
    let spawnPosition = getRandomEmptyPosition();
    gridSet(spawnPosition, new Food(spawnPosition))
  }

  collision(snake) {
    this.removeFromGrid();
    snake.grow();
    Food.spawnFood();
  }
}
