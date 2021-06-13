import { navWrapper } from '../about/about';
import { removeTimer } from '../timer/timer';
import { usersData } from '../../database/database';
import './score.scss';

function createScoreMarkup(
  data: Array<{
    name: string;
    lastName: string;
    email: string;
    score: string | null;
    avatar: string | null;
  }>,
): string {
  const sortedData = data.sort((a, b) => Number(b.score) - Number(a.score));

  return `    <section class="score-section">
      <div class="container">
        <h2 class="title">Best players</h2>
        <div class="score-container">
          <ul class="score-list">${
  data.length < 1
    ? `<p class="name">There are no records yet. You need to play!</p>`
    : sortedData
      .map(
        ({ name, lastName, email, score, avatar }): string =>
          `<li class="item">
              <div class="name-container" >
              <img class="img" src="${
  avatar ||
                'https://clip2net.com/clip/m231034/174d4-clip-6kb.png?nocache=1'
}" alt="" width="40px" height="40px" >
              <div class="email-container" >
              <p class="name">
              ${name} ${lastName}
              </p>
              <span class="email" >${email}</span>
              </div>
              </div>
              <p class="rating">Score: <span class="count">${score}</span></p>
            </li>`,
      )
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 10)
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
