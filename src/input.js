import {togglePause} from './pause';

function directionUp(position) {
  return {
    x: position.x,
    y: position.y - 1
  };
}

function directionDown(position) {
  return {
    x: position.x,
    y: position.y + 1
  };
}

function directionLeft(position) {
  return {
    x: position.x - 1,
    y: position.y
  };
}

function directionRight(position) {
  return {
    x: position.x + 1,
    y: position.y
  };
}

// queuedDirection is used for queuing up the next inputStep, for example if the player presses two key strokes in rapid succession
// with the interval between them faster than the inputStep interval of the main loop, we want to enqueue the second keystroke to fire on the following inputStep
// rather than making it overwrite the current one
let previousDirection, currentDirection, queuedDirection;

document.addEventListener('keydown', (e) => {
  let newDirection;
  switch (e.key) {
    case "ArrowLeft":
      newDirection = directionLeft;
      break;
    case "ArrowRight":
      newDirection = directionRight;
      break;
    case "ArrowUp":
      newDirection = directionUp;
      break;
    case "ArrowDown":
      newDirection = directionDown;
      break;
    case "p":
    case "P":
      console.log('pause');
      togglePause();
      return;
    default:
      return;
  }
  if (!areOppositeDirections(previousDirection, newDirection) && !directionChangedThisStep()) {
    currentDirection = newDirection;
    queuedDirection = void 0;
  } else if (currentDirection !== previousDirection) {
    queuedDirection = newDirection;
  }
});

function areOppositeDirections(d1, d2) {
  let result = d1(d2({x: 0, y: 0}));
  return result.x === 0 && result.y === 0;
}

function inputStep() {
  previousDirection = currentDirection;
  if (queuedDirection) {
    currentDirection = queuedDirection;
  }
  return previousDirection;
}

function directionChangedThisStep() {
  return currentDirection !== previousDirection;
}

function initializeDefaultDirections() {
  previousDirection = currentDirection = directionRight;
  queuedDirection = void 0;
}

export {
  directionUp,
  directionDown,
  directionLeft,
  directionRight,
  inputStep,
  initializeDefaultDirections
};
