import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import './cards-field.scss';

// SECONDS
const SHOW_TIME = 10;

export class CardsField extends BaseComponent {
  cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach(card => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach(card => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
