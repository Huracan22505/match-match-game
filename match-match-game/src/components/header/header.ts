import './header.scss';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const headerMarkupTemplate = (): string =>
  `    <header class="header">
      <h1 class="hidden">Match Match Game</h1>
      <div class="wrapper">
         <a href="#about" class="logo" >
         <p class="logo-up">Match</p>
          <p class="logo-down">Match</p>
          </a>
        <ul class="info">
          <li class="button" id="about">About</li>
          <li class="button" id="score">Score</li>
          <li class="button" id="settings">Settings</li>
        </ul>
      </div>
    </header>
    <button class="button start-btn">start game</button>
`;

const headerRender = (): void => {
  appElement.insertAdjacentHTML('afterbegin', headerMarkupTemplate());
};

export { headerRender };
