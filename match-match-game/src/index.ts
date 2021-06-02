import './style.scss';
import { App } from './app';

let time;
let minutes = 0;
let seconds = 0;

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const header = document.createElement('header');
header.classList.add('header');
document.body.append(header);

const divWrapper = document.createElement('div');
divWrapper.classList.add('wrapper');
header.append(divWrapper);

const divLogo = document.createElement('div');
divLogo.classList.add('logo');
divWrapper.append(divLogo);

const pLogoUp = document.createElement('p');
pLogoUp.innerHTML = 'Match';
pLogoUp.classList.add('logo-up');
divLogo.append(pLogoUp);

const pLogoDown = document.createElement('p');
pLogoDown.innerHTML = 'Match';
pLogoDown.classList.add('logo-down');
divLogo.append(pLogoDown);

const divInfo = document.createElement('div');
divInfo.classList.add('info');
divWrapper.append(divInfo);

const divAbout = document.createElement('div');
divAbout.innerHTML = 'About';
divAbout.classList.add('about');

const divScore = document.createElement('div');
divScore.innerHTML = 'Score';
divScore.classList.add('score');

const divSetting = document.createElement('div');
divSetting.innerHTML = 'Setting';
divSetting.classList.add('setting');

divInfo.append(divAbout);
divInfo.append(divScore);
divInfo.append(divSetting);

const registrationBtn = document.createElement('button');
registrationBtn.innerHTML = 'register new player';
registrationBtn.classList.add('btn');
divWrapper.append(registrationBtn);

const headerImg = document.createElement('div');
headerImg.classList.add('header-img');
divWrapper.append(headerImg);

const timer = document.createElement('div');
timer.innerHTML = '00:00';
appElement?.append(timer);

const gameTimer = () => {
  time = setInterval((): void => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timer.innerHTML = `<i class='fa fa-hourglass-start'></i>${minutes} mins ${seconds} secs`;
  }, 1000);
};

gameTimer();

// const stopTime = () => {
//   clearInterval(time);
// };
function createBackdropMarkup() {
  return "<div class='cover hidden' id='cover'></div>";
}

const backdropMarkup = createBackdropMarkup();

appElement.insertAdjacentHTML('beforeend', backdropMarkup);

// REGISTRATION FORM

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
          placeholder="First name"
        />
        <br />

        <label class="label" for="name"></label>
        <input
          class="input"
          type="text"
          id="name"
          required
          placeholder="Last name"
        />
        <br />

        <label class="label" for="email"></label>
        <input
          class="input"
          type="email"
          id="email"
          required
          placeholder="E-mail"
        />
        <br />
        <label class="label" for="text-feedback"></label>
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

const nameField = document.getElementById('name');
if (!nameField) throw Error('App root element not found');

const emailField = document.getElementById('email');
if (!emailField) throw Error('App root element not found');

// const validate = () => {
//   if (
//     nameField.validity.valid &&
//     emailField.validity.valid &&
//   ) {
//     sendButton.classList.remove('invalid');
//   } else {
//     sendButton.classList.add('invalid');
//   }
// };

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
  // validate();
});

emailField.addEventListener('input', () => {
  // validate();
});

window.onload = () => {
  new App(appElement).start();
};
