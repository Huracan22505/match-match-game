import './header.scss';

const headerMarkupTemplate = (): string =>
  `    <header class="header">
      <div class="wrapper">
        <div class="logo">
          <p class="logo-up">Match</p>
          <p class="logo-down">Match</p>
        </div>
        <ul class="info">
          <li class="item">About</li>
          <li class="item">Score</li>
          <li class="item">Setting</li>
        </ul>
        <button class="btn reg-btn">register new player</button>
      </div>
    </header>
    <button class="about start-btn">start game</button>
`;

export { headerMarkupTemplate };
