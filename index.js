document.addEventListener('DOMContentLoaded', function () {
  const timer = document.querySelector('div.timer > div.current-time');
  const startButton = document.querySelector(
    'div.timer > div.buttons > button.start'
  );
  const resetButton = document.querySelector(
    'div.timer > div.buttons > button.reset'
  );

  const ONE_SECOND = 1000;
  const ONE_MINUTE = ONE_SECOND * 60;
  const ONE_HOUR = ONE_MINUTE * 60;
  const ONE_DAY = ONE_HOUR * 24;

  let isRunning = false;
  let startTime;
  let pauseTime;
  let nextTime;
  let timeDifference;
  let intervalId;

  function doStartPause() {
    if (isRunning) {
      clearInterval(intervalId);
      pauseTime = timeDifference;
      startButton.innerText = 'Start';
    } else {
      startTime = new Date().getTime();
      intervalId = setInterval(updateTime, 10);
      startButton.innerText = 'Pause';
    }
    isRunning = !isRunning;
  }

  function doReset() {
    clearInterval(intervalId);
    isRunning = false;
    startTime = 0;
    pauseTime = 0;
    timeDifference = 0;
    timer.innerText = '00:00:00:000';
    startButton.innerText = 'Start';
  }

  startButton.addEventListener('click', doStartPause);
  resetButton.addEventListener('click', doReset);
  document.addEventListener('keydown', function (event) {
    if (event.key === 's') {
      doStartPause();
    } else if (event.key === 'r') {
      doReset();
    }
  });

  function updateTime() {
    nextTime = new Date().getTime();

    if (pauseTime) {
      timeDifference = nextTime - startTime + pauseTime;
    } else {
      timeDifference = nextTime - startTime;
    }

    let hours = Math.floor((timeDifference % ONE_DAY) / ONE_HOUR);
    let minutes = Math.floor((timeDifference % ONE_HOUR) / ONE_MINUTE);
    let seconds = Math.floor((timeDifference % ONE_MINUTE) / ONE_SECOND);
    let milliseconds = Math.floor(timeDifference % ONE_SECOND);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    if (milliseconds < 10) {
      milliseconds = '00' + milliseconds;
    } else if (milliseconds < 100) {
      milliseconds = '0' + milliseconds;
    }

    timer.innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
});
