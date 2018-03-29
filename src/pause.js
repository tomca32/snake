let isPaused = false;
let pauseWindow = document.createElement('div');
pauseWindow.className = 'pause-window';
let pauseText = document.createElement('p');
pauseText.className = 'pause-text';
pauseText.innerText = 'Game paused. Press "P" to unpause.';
pauseWindow.appendChild(pauseText);

function togglePause() {
  if (isPaused) {
    return unpause();
  }
  pause();
}

function pause() {
  isPaused = true;
  drawPauseWindow();
}

function unpause() {
  isPaused = false;
  document.body.removeChild(pauseWindow);
}

function drawPauseWindow() {
  document.body.appendChild(pauseWindow);
}

export {
  togglePause,
  isPaused
}