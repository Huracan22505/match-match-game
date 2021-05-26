import { CardsField } from './components/game-field/cards-field';

export class App {
  private readonly cardsField: CardsField;

  constructor(private readonly rootElement: HTMLElement) {
    this.cardsField = new CardsField();
    this.rootElement.appendChild(this.cardsField.element);
  }
}
