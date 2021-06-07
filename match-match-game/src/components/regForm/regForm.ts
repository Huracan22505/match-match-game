/* eslint-disable no-return-assign */
import { postData } from '../../database/database';
import './regForm.scss';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const formWrapper = document.createElement('div');
appElement.append(formWrapper);

function createFormMarkup(): string {
  return `<div class="form-feedback hidden" id="form-feedback">
      <form action="">
        <label class="label" for="name"></label>
        <input
          class="input"
          type="text"
          id="name"
          required
          title="- Имя не может быть пустым.
                 - Имя не может состоять из цифр.
                 - Имя не может содержать служебные символы"
          pattern="[a-zA-Zа-яА-Я]+"
          maxlength="30"
          placeholder="First name"
        />
        <br />

        <label class="label" for="lastName"></label>
        <input
          class="input"
          type="text"
          id="lastName"
          required
          title="- Имя не может быть пустым.
                 - Имя не может состоять из цифр.
                 - Имя не может содержать служебные символы"
          pattern="[a-zA-Zа-яА-Я]+"
          maxlength="30"
          placeholder="Last name"
        />
        <br />

        <label class="label" for="email"></label>
        <input
          class="input"
          type="email"
          id="email"
          maxlength="30"
          required
          placeholder="E-mail"
        />
        <br />
        <button class="button invalid" id="send" type="submit">Add user</button>
      </form>
    </div>`;
}

const formValidate = (): void => {
  const coverElem = document.getElementById('cover');
  if (!coverElem) throw Error('App root element not found');

  const formElem = document.getElementById('form-feedback');
  if (!formElem) throw Error('App root element not found');

  const sendButton = document.getElementById('send');
  if (!sendButton) throw Error('App root element not found');

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

  sendButton.addEventListener('click', onSendBtnClick);

  nameField.addEventListener('input', () => {
    if (!nameField.validity.valid) {
      nameField.classList.add('form-invalid');
      nameField.classList.remove('form-valid');
    } else {
      nameField.classList.remove('form-invalid');
      nameField.classList.add('form-valid');
    }
    validate();
  });

  lastNameField.addEventListener('input', () => {
    if (!lastNameField.validity.valid) {
      lastNameField.classList.add('form-invalid');
      lastNameField.classList.remove('form-valid');
    } else {
      lastNameField.classList.remove('form-invalid');
      lastNameField.classList.add('form-valid');
    }
    validate();
  });

  emailField.addEventListener('input', () => {
    if (!emailField.validity.valid) {
      emailField.classList.add('form-invalid');
      emailField.classList.remove('form-valid');
    } else {
      emailField.classList.remove('form-invalid');
      emailField.classList.add('form-valid');
    }
    validate();
  });

  emailField.addEventListener('input', () => {
    validate();
  });
};

const addRegFormMarkup = (): void => {
  formWrapper.innerHTML = createFormMarkup();

  formValidate();
};

export { addRegFormMarkup };
