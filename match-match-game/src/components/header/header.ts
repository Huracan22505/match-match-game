import './header.scss';

const headerMarkupTemplate = (): string =>
  `    <header class="header">
      <h1 class="hidden">Match Match Game</h1>
      <div class="wrapper">
         <a href="#about" class="logo" >
         <p class="logo-up">Match</p>
          <p class="logo-down">Match</p>
          </a>
        <ul class="info">
          <li class="item current" id="about">About</li>
          <li class="item" id="score">Score</li>
          <li class="item" id="settings">Settings</li>
        </ul>
      </div>
    </header>
    <button class="btn start-btn">start game</button>
`;

export { headerMarkupTemplate };
