import './css/styles.css';

const deckCards = [
  'https://image.flaticon.com/icons/png/512/4583/4583637.png',
  'https://image.flaticon.com/icons/png/512/4583/4583637.png',
  'https://image.flaticon.com/icons/png/512/4583/4583650.png',
  'https://image.flaticon.com/icons/png/512/4583/4583650.png',
  'https://image.flaticon.com/icons/png/512/4583/4583666.png',
  'https://image.flaticon.com/icons/png/512/4583/4583666.png',
  'https://image.flaticon.com/icons/png/512/4583/4583674.png',
  'https://image.flaticon.com/icons/png/512/4583/4583674.png',
  'https://image.flaticon.com/icons/png/512/4583/4583704.png',
  'https://image.flaticon.com/icons/png/512/4583/4583704.png',
  'https://image.flaticon.com/icons/png/512/4583/4583741.png',
  'https://image.flaticon.com/icons/png/512/4583/4583741.png',
  'https://image.flaticon.com/icons/png/512/4583/4583761.png',
  'https://image.flaticon.com/icons/png/512/4583/4583761.png',
  'https://image.flaticon.com/icons/png/512/4583/4583842.png',
  'https://image.flaticon.com/icons/png/512/4583/4583842.png',
];

const deck = document.querySelector('.deck');
let opened = [];
let matched = [];
const modal = document.getElementById('modal');
const reset = document.querySelector('.reset-btn');
const playAgain = document.querySelector('.play-again-btn');
const timeCounter = document.querySelector('.timer');
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function startGame() {
  const shuffledDeck = shuffle(deckCards);
  for (let i = 0; i < shuffledDeck.length; i++) {
    const liTag = document.createElement('LI');
    liTag.classList.add('card', 'list');
    const addImage = document.createElement('IMG');
    liTag.appendChild(addImage);
    addImage.src = `${shuffledDeck[i]}`;
    deck.appendChild(liTag);
  }
}

startGame();

function removeCard() {
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

function timer() {
  time = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timeCounter.innerHTML =
      "<i class='fa fa-hourglass-start'></i>" +
      ' Timer: ' +
      minutes +
      ' Mins ' +
      seconds +
      ' Secs';
  }, 1000);
}

function stopTime() {
  clearInterval(time);
}

function resetEverything() {
  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML =
    "<i class='fa fa-hourglass-start'></i>" + ' Timer: 00:00';
  // Clear both arrays that hold the opened and matched cards
  matched = [];
  opened = [];
  // Clear the deck
  removeCard();
  // Create a new deck
  startGame();
}
