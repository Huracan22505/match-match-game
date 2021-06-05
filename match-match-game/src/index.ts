import './style.scss';
import { App } from './app';
import { headerMarkupTemplate } from './components/header/header';
import { gameTimer, removeTimer } from './components/timer/timer';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

appElement.insertAdjacentHTML('afterbegin', headerMarkupTemplate());

const scoreBtn = document.querySelector('.score');
const aboutBtn = document.querySelector('.about');
const settingsBtn = document.querySelector('.setting');
const startBtn = document.querySelector('.start-btn');
const registrationBtn = document.querySelector('.reg-btn');

if (!registrationBtn) throw Error('Element not found');
if (!scoreBtn) throw Error('Element not found');
if (!aboutBtn) throw Error('Element not found');
if (!settingsBtn) throw Error('Element not found');
if (!startBtn) throw Error('Element not found');

// BACKDROP

function createBackdropMarkup() {
  return "<div class='cover hidden' id='cover'></div>";
}

const backdropMarkup = createBackdropMarkup();

appElement.insertAdjacentHTML('beforeend', backdropMarkup);

// ROUTING

const navWrapper: HTMLDivElement = document.createElement('div');
appElement.append(navWrapper);

function createAboutMarkup(): string {
  return `    <section class="about-section">
      <div class="container">
        <h2 class="title">How to play?</h2>
        <div class="about-container">
          <ul class="step-list">
            <li class="item list">
              <div class="before">1</div>
              <p class="text">Stay safe</p>
            </li>
            <li class="item list">
              <div class="before">2</div>
              <p class="text">Click "START GAME" button.</p>
            </li>
            <li class="item list">
              <div class="before">3</div>
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
navWrapper.insertAdjacentHTML('beforeend', createAboutMarkup());

function createScoreMarkup(): string {
  return `    <section class="score-section">
      <div class="container">
        <h2 class="title">Best players</h2>
        <div class="score-container">
          <ul class="score-list">
            <li class="item list">
              <p class="name">Nicci Troiani</p>
              <p class="rating">Score: <span class="count">456</span></p>
            </li>
            <li class="item list">
              <p class="name">George Fields</p>
              <p class="rating">Score: <span class="count">358</span></p>
            </li>
            <li class="item list">
              <p class="name">Jones Dermot</p>
              <p class="rating">Score: <span class="count">211</span></p>
            </li>
            <li class="item list">
              <p class="name">Jane Doe</p>
              <p class="rating">Score: <span class="count">169</span></p>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;
}

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

function aboutRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createAboutMarkup());
}

function scoreRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createScoreMarkup());
}

function settingsRender(): void {
  navWrapper.innerHTML = '';
  navWrapper.insertAdjacentHTML('beforeend', createSettingsMarkup());
}

aboutBtn.addEventListener('click', aboutRender);
scoreBtn.addEventListener('click', scoreRender);
settingsBtn.addEventListener('click', settingsRender);

// REGISTRATION FORM

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

appElement.insertAdjacentHTML('beforeend', createFormMarkup());

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

const validate = () => {
  if (nameField.validity.valid && emailField.validity.valid) {
    sendButton.classList.remove('invalid');
  } else {
    sendButton.classList.add('invalid');
  }
};

registrationBtn.addEventListener('click', () => {
  document.body.classList.add('notScrollable');
  coverElem.classList.remove('hidden');
  formElem.classList.remove('hidden');
});

coverElem.addEventListener('click', () => {
  document.body.classList.remove('notScrollable');
  coverElem.classList.add('hidden');
  formElem.classList.add('hidden');
});

const onSendBtnClick = (e: { preventDefault: () => void }) => {
  if (sendButton.classList.contains('invalid')) return;
  e.preventDefault();

  document.body.classList.remove('notScrollable');
  coverElem.classList.add('hidden');
  formElem.classList.add('hidden');
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

function startGame() {
  gameTimer();

  if (!startBtn) throw Error('Element not found');
  if (startBtn.innerHTML === 'RESTART') {
    const cardsField = document.querySelector('.cards-field');
    if (!cardsField) throw Error('App root element not found');
    cardsField.remove();
    removeTimer();
  }

  navWrapper.innerHTML = '';

  if (!appElement) throw Error('App root element not found');
  new App(appElement).start();

  startBtn.innerHTML = 'RESTART';
}

startBtn.addEventListener('click', startGame);
