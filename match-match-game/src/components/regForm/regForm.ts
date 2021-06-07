/* eslint-disable no-return-assign */
import { postData } from '../../database/database';
import './regForm.scss';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const formWrapper = document.createElement('div');
appElement.append(formWrapper);

function createFormMarkup(): string {
  return `<div class="reg-modal hidden" id="reg-form">
      <p class="modal__title">Registr New Player</p>
      <form action="submit" class="modal__form">
        <div class="form__wrapper">
          <div class="modal__form__input">
            <label>First name</label
            >
            <input
            class="name"
            id="name"
            type="name"
            required
            title="- Имя не может быть пустым.
                 - Имя не может состоять из цифр.
                 - Имя не может содержать служебные символы"
          pattern="[a-zA-Zа-яА-Я]+"
          maxlength="30"/>
            <div class="checkbox name-ch">
              <img
                src="https://clip2net.com/clip/m231034/c5779-clip-554b.png?nocache=1"
                alt=""
              />
            </div>
          </div>
          <div class="modal__form__input">
            <label>Last name</label
            ><input
            class="surname"
            id="lastName"
            type="text"
            required
            title="- Имя не может быть пустым.
                 - Имя не может состоять из цифр.
                 - Имя не может содержать служебные символы"
            pattern="[a-zA-Zа-яА-Я]+"
          maxlength="30" />
            <div class="checkbox surname-ch">
              <img
                src="https://clip2net.com/clip/m231034/c5779-clip-554b.png?nocache=1"
                alt=""
              />
            </div>
          </div>
          <div class="modal__form__input">
            <label>E-mail</label
            ><input
            class="email"
            id="email"
            type="email"
            required
            pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]{2,10}[.]+[a-zA-Z0-9]+" />
            <div class="checkbox email-ch">
              <img
                src="https://clip2net.com/clip/m231034/c5779-clip-554b.png?nocache=1"
                alt=""
              />
            </div>
          </div>
        </div>
        <img
          class="form__modal__img"
          src="https://clip2net.com/clip/m231034/174d4-clip-6kb.png?nocache=1"
          alt=""
          width="198"
          height="198"
        />
        <div class="modal__form__buttons">
          <button
            class="form__modal__submitbtn form__modal__btn invalid"
            id="send"
            type="submit"
          >
            Add user</button
          ><button
            class="form__modal__cancelbtn form__modal__btn"
            id="cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>

`;
}

const formValidate = (): void => {
  const coverElem = document.getElementById('cover');
  if (!coverElem) throw Error('App root element not found');

  const formElem = document.getElementById('reg-form');
  if (!formElem) throw Error('App root element not found');

  const sendButton = document.getElementById('send');
  if (!sendButton) throw Error('App root element not found');

  const cancelButton = document.getElementById('cancel');
  if (!cancelButton) throw Error('App root element not found');

  const nameField = <HTMLInputElement>document.getElementById('name');
  if (!nameField) throw Error('App root element not found');

  const lastNameField = <HTMLInputElement>document.getElementById('lastName');
  if (!lastNameField) throw Error('App root element not found');

  const emailField = <HTMLInputElement>document.getElementById('email');
  if (!emailField) throw Error('App root element not found');

  formElem.classList.remove('hidden');

  const validate = () => {
    if (nameField.validity.valid && emailField.validity.valid) {
      sendButton.classList.remove('invalid');
    } else {
      sendButton.classList.add('invalid');
    }
  };

  coverElem.addEventListener('click', () => {
    document.body.classList.remove('notScrollable');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');
  });

  const onSendBtnClick = (e: { preventDefault: () => void }) => {
    if (sendButton.classList.contains('invalid')) return;
    e.preventDefault();

    postData();

    document.body.classList.remove('notScrollable');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');

    const delay = () => (window.location.hash = 'score');
    setTimeout(delay, 100);
  };

  const onCancelBtnClick = () => {
    document.body.classList.remove('notScrollable');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');
  };

  cancelButton.addEventListener('click', onCancelBtnClick);

  sendButton.addEventListener('click', onSendBtnClick);

  nameField.addEventListener('input', validate);

  lastNameField.addEventListener('input', validate);

  emailField.addEventListener('input', validate);
};

const addRegFormMarkup = (): void => {
  formWrapper.innerHTML = createFormMarkup();

  formValidate();
};

export { addRegFormMarkup };
