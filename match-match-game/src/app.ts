// eslint-disable-next-line import/no-cycle
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
    const cat = categories[0];
    const images = cat.images.map(name => `${name}`);
    this.game.newGame(images);
  }
}
