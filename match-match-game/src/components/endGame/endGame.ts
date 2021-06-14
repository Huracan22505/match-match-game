import refs from '../../shared/refs';
import { backdropMarkup } from '../backdrop/backdrop';
import { addRegFormMarkup } from '../regForm/regForm';
import './endGame.scss';

refs.appElement?.insertAdjacentHTML('beforeend', backdropMarkup);

const formWrapper = document.createElement('div');
refs.appElement?.append(formWrapper);

const createMarkup = (timerValue: string, score: number): string => `
<section class="win-game-modal">
      <div id="modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Congratulations!</h2>
          <p>You successfully found all matches for ${timerValue} secs</p>
          <p>Your score - ${score}</p>
          <img
            class="modal-img"
            src="https://image.freepik.com/free-vector/you-win-sign-in-pop-art-style_175838-498.jpg"
            alt="win picture"
          />
          <button type="button" class="button accept-btn">Ok</button>
        </div>
      </div>
    </section>
`;

const displayModal = (): void => {
  const modal = document.getElementById('modal');
  const modalClose = document.querySelector('.close');
  const coverElem = document.getElementById('cover');
  const acceptBtn = document.querySelector('.accept-btn');
  if (!coverElem) throw Error('coverElem element not found');
  if (!modal) throw Error('modal element not found');

  modal.style.display = 'block';
  document.body.classList.add('notScrollable');

  const removeEndGameForm = () => {
    addRegFormMarkup();
    coverElem.classList.remove('hidden');
    modal.style.display = 'none';
  };

  modalClose?.addEventListener('click', () => {
    removeEndGameForm();
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      removeEndGameForm();
    }
  });

  acceptBtn?.addEventListener('click', () => {
    removeEndGameForm();
  });
};

const addWinModalMarkup = (timerValue: number, score: number): void => {
  formWrapper.innerHTML = createMarkup(timerValue.toString(), score);
  displayModal();
};

export { addWinModalMarkup };
