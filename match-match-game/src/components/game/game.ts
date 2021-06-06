import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../game-field/cards-field';
import { addWinModalMarkup } from '../endGame/endGame';
import { stopTime } from '../timer/timer';

const FLIP_DELAY = 700;
let mistakes = 0;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map(url => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach(card => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add('mistake-true');
      card.element.classList.add('mistake-true');

      await delay(FLIP_DELAY);

      this.activeCard.element.classList.remove('mistake-true');
      card.element.classList.remove('mistake-true');

      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);

      mistakes += 1;
    } else {
      this.activeCard.element.classList.add('mistake-false');
      card.element.classList.add('mistake-false');
    }
    this.activeCard = undefined;
    this.isAnimation = false;

    const isCardsOpen: boolean = this.cardsField.cards.every(
      el => el.isFlipped === false,
    );
    const matches = 4;
    const timer = document.querySelector('.timer');
    if (!timer?.textContent) throw Error('App root element not found');

    const timerValue = Number(timer.textContent.replace('secs', ''));

    const score = (matches - mistakes) * 100 - timerValue * 10;

    if (isCardsOpen) {
      addWinModalMarkup(timerValue, score > 0 ? score : 0);
      stopTime();
      mistakes = 0;

      if (score < 0) {
        localStorage.setItem('score', '0');
      } else {
        localStorage.setItem('score', score.toString());
      }
    }
  }
}
