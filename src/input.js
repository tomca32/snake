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

let previousDirection = directionRight;
let currentDirection = directionRight;

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
  }
  if (isValidDirection(newDirection)) {
    currentDirection = newDirection;
  }
});

function isValidDirection(newDirection) {
  return newDirection(previousDirection({x: 0, y: 0})).x !== 0;
}

function inputStep() {
  previousDirection = currentDirection;
}

export {
  directionUp,
  directionDown,
  directionLeft,
  directionRight,
  currentDirection,
  inputStep
};
