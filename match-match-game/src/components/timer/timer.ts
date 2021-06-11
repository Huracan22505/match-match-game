import './timer.scss';

let time: NodeJS.Timeout;
let seconds = -10;

const timer = document.createElement('div');
const appElement = document.getElementById('app');
if (!appElement) throw Error('App element not found');

const gameTimer = (): void => {
  time = setInterval((): void => {
    seconds += 1;
    if (seconds === 1) {
      appElement.appendChild(timer);
    }

    timer.innerHTML = `<span class='timer'>${seconds} secs</span>`;
  }, 1000);
};

const stopTime = (): void => {
  clearInterval(time);

  seconds = -10;
};

const removeTimer = (): void => {
  stopTime();
  timer.remove();
};

export { gameTimer, removeTimer };
