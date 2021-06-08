import { navWrapper } from '../about/about';
import { removeTimer } from '../timer/timer';
import { usersData } from '../../database/database';
import './score.scss';

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

function scoreRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createScoreMarkup(usersData));
  window.location.hash = 'score';

  const cardsField = document.querySelector('.cards-field');
  if (!cardsField) return;
  cardsField.innerHTML = '';
  removeTimer();
}

export { scoreRender };
