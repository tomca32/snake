let isPaused = true;
let pauseWindow = document.createElement('div');
pauseWindow.className = 'pause-window';

let pauseText = document.createElement('p');
pauseText.className = 'pause-text';
pauseWindow.appendChild(pauseText);

let timer;

const PAUSED_TEXT = 'Game paused. Press "P" to unpause.';

function timerText(time) {
  return `Starting in ${time}`;
}

function togglePause() {
  if (isPaused && !timer) {
    return unpause();
  }
  pause();
}

function pause() {
  isPaused = true;
  pauseText.innerText = PAUSED_TEXT;
  if (timer) {
    clearTimeout(timer);
    timer = void 0;
  }
  drawPauseWindow();
}

function unpause() {
  startTimer();
}

function drawPauseWindow() {
  document.body.appendChild(pauseWindow);
}

function startTimer(time = 3) {
  if (time === 0) {
    isPaused = false;
    document.body.removeChild(pauseWindow);
    timer = void 0;
    return;
  }
  pauseText.innerText = timerText(time);
  timer = setTimeout(startTimer.bind(null, time - 1), 1000);

}

export {
  togglePause,
  pause,
  unpause,
  isPaused
}