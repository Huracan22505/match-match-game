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
      minutes +
      ' mins ' +
      seconds +
      ' secs';
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
  matched = [];
  opened = [];
  removeCard();
  startGame();
}

function compareTwo() {
  if (opened.length === 2) {
    document.body.style.pointerEvents = 'none';
  }
  if (opened.length === 2 && opened[0].src === opened[1].src) {
    match();
  } else if (opened.length === 2 && opened[0].src != opened[1].src) {
    noMatch();
  }
}

function match() {
  setTimeout(function () {
    opened[0].parentElement.classList.add('match');
    opened[1].parentElement.classList.add('match');
    matched.push(...opened);
    document.body.style.pointerEvents = 'auto';
    winGame();
    opened = [];
  }, 600);
}

function noMatch() {
  setTimeout(function () {
    opened[0].parentElement.classList.remove('flip');
    opened[1].parentElement.classList.remove('flip');
    document.body.style.pointerEvents = 'auto';
    opened = [];
  }, 700);
}

function displayModal() {
  const modalClose = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';
  modalClose.onclick = function () {
    modal.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function winGame() {
  if (matched.length === 16) {
    stopTime();
    displayModal();
  }
}
deck.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'LI') {
    if (timeStart === false) {
      timeStart = true;
      timer();
    }
    flipCard();
  }

  function flipCard() {
    evt.target.classList.add('flip');
    addToOpened();
  }

  function addToOpened() {
    if (opened.length === 0 || opened.length === 1) {
      opened.push(evt.target.firstElementChild);
    }
    compareTwo();
  }
});
reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click', function () {
  modal.style.display = 'none';
  resetEverything();
});
