import './header.scss';

const headerMarkupTemplate = (): string =>
  `    <header class="header">
      <div class="wrapper">
        <div class="logo">
          <p class="logo-up">Match</p>
          <p class="logo-down">Match</p>
        </div>
        <ul class="info">
          <li class="item" id="about">About</li>
          <li class="item" id="score">Score</li>
          <li class="item" id="settings">Settings</li>
        </ul>
      </div>
    </header>
    <button class="btn start-btn">start game</button>
`;

export { headerMarkupTemplate };
