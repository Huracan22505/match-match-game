import refs from '../../shared/refs';
import { removeTimer } from '../timer/timer';
import './about.scss';

const navWrapper: HTMLDivElement = document.createElement('div');
refs.appElement?.append(navWrapper);

const aboutPageMarkup = `<section class="about-section">
      <div class="container">
        <h2 class="title">How to play?</h2>
        <div class="about-container">
          <ul class="step-list">
            <li class="item list">
              <div class="numbering">1</div>
              <p class="text">Stay safe.</p>
            </li>
            <li class="item list">
              <div class="numbering">2</div>
              <p class="text">Configure your game settings.</p>
            </li>
            <li class="item list">
              <div class="numbering">3</div>
              <p class="text">Click "START GAME" button.</p>
            </li>
            <li class="item list">
              <div class="numbering">4</div>
              <p class="text">
                You have 10 seconds to memorize the position of the cards.
              </p>
            </li>
            <li class="item list">
              <div class="numbering">5</div>
              <p class="text">
                Find all matches.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;

function aboutRender(): void {
  navWrapper.innerHTML = aboutPageMarkup;
  window.location.hash = 'about';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

export { aboutRender, navWrapper };
