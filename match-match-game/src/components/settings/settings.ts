import { navWrapper } from '../about/about';
import { removeTimer } from '../timer/timer';
import './settings.scss';

function createSettingsMarkup(): string {
  return `    <section class="settings-section">
      <div class="container">
      <h2 class="title">Game cards</h2>
        <select class="select-css" id="game-categories">
          <option>select game cards type</option>
          <option>Animals</option>
          <option>Toys</option>
          <option>Coding</option>
        </select>

        <h2 class="title">Difficulty</h2>
        <select class="select-css" id="game-difficult">
          <option>select game type</option>
          <option>4x4</option>
          <option>6x6</option>
        </select>
      </div>
    </section>
`;
}

const settingsHendle = () => {
  const gameCategories: HTMLSelectElement | null =
    document.querySelector('#game-categories');

  const difficulty: HTMLSelectElement | null =
    document.querySelector('#game-difficult');

  if (!gameCategories) throw Error('Select element not found');
  if (!difficulty) throw Error('Select element not found');

  gameCategories.addEventListener('change', (event): void => {
    const { value } = <HTMLSelectElement>event.target;
    localStorage.setItem('gameCategory', value);
  });

  difficulty.addEventListener('change', (event): void => {
    const { value } = <HTMLSelectElement>event.target;
    localStorage.setItem('gameDifficulty', value);
  });
};

function settingsRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createSettingsMarkup());
  window.location.hash = 'settings';

  settingsHendle();

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

export { settingsRender };
