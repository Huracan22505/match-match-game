import './style.scss';
import { App } from './app';
import { headerMarkupTemplate } from './components/header/header';
import { gameTimer, removeTimer } from './components/timer/timer';
import { createBackdropMarkup } from './components/backdrop/backdrop';
import { createDataBase, usersData } from './database/database';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

appElement.insertAdjacentHTML('beforeend', createBackdropMarkup());
appElement.insertAdjacentHTML('afterbegin', headerMarkupTemplate());

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

function createScoreMarkup(data: any[]): string {
  const sortedData = data.sort((a, b) => b.score - a.score);

  return `    <section class="score-section">
      <div class="container">
        <h2 class="title">Best players</h2>
        <div class="score-container">
          <ul class="score-list">${
            data.length < 1
              ? `<p class="name">There are no records yet. You need to play!</p>`
              : sortedData
                  .map(
                    ({ name, lastName, score }): string =>
                      `<li class="item list">
              <p class="name">${name} ${lastName}</p>
              <p class="rating">Score: <span class="count">${score}</span></p>
            </li>`,
                  )
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .join('')
          }
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
  navWrapper.innerHTML = createAboutMarkup();
  window.location.hash = 'about';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

function scoreRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createScoreMarkup(usersData));
  window.location.hash = 'score';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

function settingsRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createSettingsMarkup());
  window.location.hash = 'settings';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

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

// ROUTING

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

// DATABASE
createDataBase('Huracan22505');
