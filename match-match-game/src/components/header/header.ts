import './header.scss';

const headerMarkupTemplate = (): string =>
  `    <header class="header">
      <div class="wrapper">
        <div class="logo">
          <p class="logo-up">Match</p>
          <p class="logo-down">Match</p>
        </div>
        <div class="info">
          <div class="about">About</div>
          <div class="score">Score</div>
          <div class="setting">Setting</div>
        </div>
        <button class="btn reg-btn">register new player</button>
      </div>
    </header>
    <button class="about start-btn">start game</button>
`;

export { headerMarkupTemplate };
