import './style.scss';
import { App } from './app';

let time;
let minutes = 0;
let seconds = 0;

window.onload = () => {
  const appElement = document.getElementById('app');
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

  const button = document.createElement('button');
  button.innerHTML = 'Restart game';
  button.classList.add('btn');
  divWrapper.append(button);

  button.addEventListener('click', () => {
    window.location.reload();
  });

  const headerImg = document.createElement('div');
  headerImg.classList.add('header-img');
  divWrapper.append(headerImg);

  const timer = document.createElement('div');
  timer.innerHTML = '00:00';
  appElement?.append(timer);

  const gameTime = () => {
    time = setInterval((): void => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      timer.innerHTML = `<i class='fa fa-hourglass-start'></i>${minutes} mins ${seconds} secs`;
    }, 1000);
  };

  gameTime();

  // const stopTime = () => {
  //   clearInterval(time);
  // };

  if (!appElement) throw Error('App root element not found');

  new App(appElement).start();
};
