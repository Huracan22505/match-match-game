import { App } from './app';
import { headerMarkupTemplate } from './components/header/header';
import { gameTimer, removeTimer } from './components/timer/timer';
import { createBackdropMarkup } from './components/backdrop/backdrop';
import { createDataBase } from './database/database';
import { aboutRender, navWrapper } from './components/about/about';
import { scoreRender } from './components/score/score';
import { settingsRender } from './components/settings/settings';
import './style.scss';

// DATABASE
createDataBase('Huracan22505');

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

appElement.insertAdjacentHTML('beforeend', createBackdropMarkup());
appElement.insertAdjacentHTML('afterbegin', headerMarkupTemplate());

// ROUTING

const scoreBtn = document.getElementById('score');
const aboutBtn = document.getElementById('about');
const settingsBtn = document.getElementById('settings');
const startBtn = document.querySelector('.start-btn');

if (!scoreBtn) throw Error('Element not found');
if (!aboutBtn) throw Error('Element not found');
if (!settingsBtn) throw Error('Element not found');
if (!startBtn) throw Error('Element not found');

aboutBtn.addEventListener('click', aboutRender);
scoreBtn.addEventListener('click', scoreRender);
settingsBtn.addEventListener('click', settingsRender);

// START GAME

function startGame() {
  if (!startBtn) throw Error('Element not found');
  if (startBtn.innerHTML === 'RESTART') {
    const cardsField = document.querySelector('.cards-field');
    if (!cardsField) throw Error('App root element not found');
    cardsField.remove();
    removeTimer();
    gameTimer();
  } else {
    gameTimer();
  }

  navWrapper.innerHTML = '';

  if (!appElement) throw Error('App root element not found');
  new App(appElement).start();

  startBtn.innerHTML = 'RESTART';
}

const controller = (hash: string) => {
  switch (hash) {
    case 'about':
      aboutBtn.classList.add('current');
      scoreBtn.classList.remove('current');
      settingsBtn.classList.remove('current');

      aboutRender();
      break;
    case 'score':
      scoreBtn.classList.add('current');
      aboutBtn.classList.remove('current');
      settingsBtn.classList.remove('current');

      scoreRender();
      break;
    case 'settings':
      settingsBtn.classList.add('current');
      aboutBtn.classList.remove('current');
      scoreBtn.classList.remove('current');

      settingsRender();
      break;
    case 'game':
      aboutBtn.classList.remove('current');
      scoreBtn.classList.remove('current');
      settingsBtn.classList.remove('current');

      startGame();
      break;

    default:
      break;
  }
};

const hendleHash = () => {
  const hash = window.location.hash ? window.location.hash.slice(1) : '';

  controller(hash);
};

const gameRender = () => {
  window.location.hash = 'game';
  startGame();
};

window.addEventListener('hashchange', hendleHash);
startBtn.addEventListener('click', gameRender);

hendleHash();
