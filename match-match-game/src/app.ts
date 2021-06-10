import { Game } from './components/game/game';
import { ImageCategory } from './models/image-category-model';

export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();

    const gameCategory = localStorage.getItem('gameCategory');
    const gameDifficulty = localStorage.getItem('gameDifficulty');

    const cat = categories.filter(
      ({ category }) => category === gameCategory,
    )[0];
    const { images } = cat;

    if (gameDifficulty === '4x4') this.game.newGame(images.slice(0, 8));
    if (gameDifficulty === '6x6') this.game.newGame(images);
  }
}
