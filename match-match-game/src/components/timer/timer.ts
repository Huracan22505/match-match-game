import './timer.scss';

let time: NodeJS.Timeout;
let minutes = 0;
let seconds = 0;

const timer = document.createElement('div');
const appElement = document.getElementById('app');
if (!appElement) throw Error('App element not found');

const gameTimer = (): void => {
  time = setInterval((): void => {
    appElement.appendChild(timer);

    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timer.innerHTML = `<span class='timer'>${minutes} mins ${seconds} secs</span>`;
  }, 1000);
};

const stopTime = (): void => {
  clearInterval(time);

  minutes = 0;
  seconds = 0;
};

const removeTimer = (): void => {
  stopTime();
  timer.remove();
};

export { gameTimer, removeTimer, stopTime };
