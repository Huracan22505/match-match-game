import './style.scss';
import { App } from './app';
import { headerMarkupTemplate } from './components/header/header';
import { gameTimer, removeTimer } from './components/timer/timer';
import { createBackdropMarkup } from './components/backdrop/backdrop';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

appElement.insertAdjacentHTML('beforeend', createBackdropMarkup());
appElement.insertAdjacentHTML('afterbegin', headerMarkupTemplate());
// appElement.insertAdjacentHTML('beforeend', createFormMarkup());
// formValidate();

const scoreBtn = document.getElementById('score');
const aboutBtn = document.getElementById('about');
const settingsBtn = document.getElementById('settings');
const startBtn = document.querySelector('.start-btn');

if (!scoreBtn) throw Error('Element not found');
if (!aboutBtn) throw Error('Element not found');
if (!settingsBtn) throw Error('Element not found');
if (!startBtn) throw Error('Element not found');

// ROUTING

const navWrapper: HTMLDivElement = document.createElement('div');
appElement.append(navWrapper);

function createAboutMarkup(): string {
  return `    <section class="about-section">
      <div class="container">
        <h2 class="title">How to play?</h2>
        <div class="about-container">
          <ul class="step-list">
            <li class="item list">
              <div class="numbering">1</div>
              <p class="text">Stay safe</p>
            </li>
            <li class="item list">
              <div class="numbering">2</div>
              <p class="text">Click "START GAME" button.</p>
            </li>
            <li class="item list">
              <div class="numbering">3</div>
              <p class="text">
                Remember card positions and match it.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;
}
navWrapper.insertAdjacentHTML('beforeend', createAboutMarkup());

function createScoreMarkup(): string {
  return `    <section class="score-section">
      <div class="container">
        <h2 class="title">Best players</h2>
        <div class="score-container">
          <ul class="score-list">
            <li class="item list">
              <p class="name">Nicci Troiani</p>
              <p class="rating">Score: <span class="count">456</span></p>
            </li>
            <li class="item list">
              <p class="name">George Fields</p>
              <p class="rating">Score: <span class="count">358</span></p>
            </li>
            <li class="item list">
              <p class="name">Jones Dermot</p>
              <p class="rating">Score: <span class="count">211</span></p>
            </li>
            <li class="item list">
              <p class="name">Jane Doe</p>
              <p class="rating">Score: <span class="count">169</span></p>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;
}

function createSettingsMarkup(): string {
  return `    <section class="settings-section">
      <div class="container">
        <h2 class="title">Game cards</h2>
        <select class="select-css">
          <option>select game cards type</option>
          <option>Animals</option>
          <option>Cars</option>
          <option>Fruits</option>
          <option>Toys</option>
        </select>
        <h2 class="title">Difficulty</h2>
        <select class="select-css">
          <option>select game type</option>
          <option>4x4</option>
          <option>6x6</option>
          <option>8x8</option>
        </select>
      </div>
    </section>
`;
}

function aboutRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createAboutMarkup());
  window.location.hash = 'about';
}

function scoreRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createScoreMarkup());
  window.location.hash = 'score';
}

function settingsRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createSettingsMarkup());
  window.location.hash = 'settings';
}

aboutBtn.addEventListener('click', aboutRender);
scoreBtn.addEventListener('click', scoreRender);
settingsBtn.addEventListener('click', settingsRender);

// START GAME

function startGame() {
  gameTimer();

  if (!startBtn) throw Error('Element not found');
  if (startBtn.innerHTML === 'RESTART') {
    const cardsField = document.querySelector('.cards-field');
    if (!cardsField) throw Error('App root element not found');
    cardsField.remove();
    removeTimer();
  }

  navWrapper.innerHTML = '';

  if (!appElement) throw Error('App root element not found');
  new App(appElement).start();

  startBtn.innerHTML = 'RESTART';
}

startBtn.addEventListener('click', startGame);

// ROUTING

const controller = (hash: string) => {
  switch (hash) {
    case 'about':
      aboutRender();
      break;
    case 'score':
      scoreRender();
      break;
    case 'settings':
      settingsRender();
      break;

    default:
      break;
  }
};

const hendleHash = () => {
  const hash = window.location.hash ? window.location.hash.slice(1) : '';

  controller(hash);
};

window.addEventListener('hashchange', hendleHash);
