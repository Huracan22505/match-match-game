import refs from './shared/refs';
import { App } from './app';
import { aboutRender, navWrapper } from './components/about/about';
import { scoreRender } from './components/score/score';
import { settingsRender } from './components/settings/settings';
import { gameTimer, removeTimer } from './components/timer/timer';

const routing = (): void => {
  const scoreBtn = document.getElementById('score') as HTMLElement;
  const aboutBtn = document.getElementById('about') as HTMLElement;
  const settingsBtn = document.getElementById('settings') as HTMLElement;
  const startBtn = document.querySelector('.start-btn') as HTMLElement;

  aboutBtn.addEventListener('click', aboutRender);
  scoreBtn.addEventListener('click', scoreRender);
  settingsBtn.addEventListener('click', settingsRender);

  function startGame() {
    if (startBtn.innerHTML === 'RESTART GAME') {
      const cardsField = document.querySelector('.cards-field') as HTMLElement;
      cardsField.remove();
      removeTimer();
    }

    gameTimer();

    navWrapper.innerHTML = '';

    new App(refs.appElement).start();

    startBtn.innerHTML = 'RESTART GAME';
  }

  const gameRender = () => {
    window.location.hash = 'game';
    startGame();

    const cardsField = document.querySelector('.cards-field') as HTMLElement;

    const difficulty = localStorage.getItem('gameDifficulty');
    if (difficulty === '6x6') {
      cardsField.setAttribute('style', 'width:1440px;');
    } else {
      cardsField.setAttribute('style', 'width:640px;');
    }
  };

  const controller = (hash: string) => {
    switch (hash) {
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

        gameRender();
        break;

      default:
        aboutBtn.classList.add('current');
        scoreBtn.classList.remove('current');
        settingsBtn.classList.remove('current');

        aboutRender();
        break;
    }
  };

  const hendleHash = (): void => {
    const hash = window.location.hash ? window.location.hash.slice(1) : '';

    controller(hash);
  };

  window.addEventListener('hashchange', hendleHash);
  startBtn.addEventListener('click', gameRender);

  hendleHash();
};

export { routing };
