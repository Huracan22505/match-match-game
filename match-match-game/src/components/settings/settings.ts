import { navWrapper } from '../about/about';
import { removeTimer } from '../timer/timer';
import './settings.scss';

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

function settingsRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createSettingsMarkup());
  window.location.hash = 'settings';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

export { settingsRender };
