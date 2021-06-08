import { removeTimer } from '../timer/timer';
import './about.scss';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

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

function aboutRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.innerHTML = createAboutMarkup();
  window.location.hash = 'about';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

export { aboutRender, navWrapper };
