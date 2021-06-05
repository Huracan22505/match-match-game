import './endGame.scss';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const createMarkup = (): string => `
<section class="win-game-modal">
      <div id="modal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Congratulations!</h2>
          <p>You successfully found all matches</p>
          <img
            class="modal-img"
            src="https://image.freepik.com/free-vector/you-win-sign-in-pop-art-style_175838-498.jpg"
            alt="Vault boy giving the thumbs up from the game fall out"
          />
        </div>
      </div>
    </section>
`;

const displayModal = (): void => {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementsByClassName('close')[0] as HTMLElement;
  const coverElem = document.getElementById('cover');
  if (!coverElem) throw Error('App root element not found');
  if (!modal) throw Error('App root element not found');

  modal.style.display = 'block';

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

const addWinModalMarkup = (): void => {
  appElement.insertAdjacentHTML('beforeend', createMarkup());
  displayModal();
};

export { addWinModalMarkup };
