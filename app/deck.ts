// Elements

const deckCreation = document.querySelector(".create_deck") as HTMLButtonElement;
const section = document.querySelector("section")!;
const shuffle = document.querySelector(".shuffle") as HTMLButtonElement;
const playerElement = document.querySelector(".player") as HTMLDivElement;
const computerElement = document.querySelector(".computer") as HTMLDivElement;
const time = document.querySelector("time") as HTMLElement;
const timeLimit = document.querySelector("h4")!;

// Structures

const VALUES: Array<string> = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Array<string> = ["♠", "♣", "♥", "♦"];
const deck: Array<Cards> = [];
const deckFlag: Array<string> = [];
let gameTime = 30;
let remainingTime = 5;
let timer: number

interface CardValues {
  [key: string]: number;
  J: number;
  Q: number;
  K: number;
  A: number;
}

const CardValue: CardValues = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

class Cards {
  constructor(public number: string, public shape: string, public color: string) {
  }
}

// Deck Creation

while (deck.length < 52) {
  const index = Math.floor(Math.random() * VALUES.length);
  const randIndex = Math.floor(Math.random() * SUITS.length);
  const flagCard = `${VALUES[index] + " " + SUITS[randIndex]}`;
  const color = (SUITS[randIndex] === "♠" || SUITS[randIndex] === "♣") ? "black" : "red";
  if (deckFlag.includes(flagCard)) continue;
  deckFlag.push(flagCard);
  const card = new Cards(VALUES[index], SUITS[randIndex], color);
  deck.push(card);
}

const player = deck.slice(0, deck.length / 2);
const computer = deck.slice(-deck.length / 2);

// Events

deckCreation.addEventListener("click", () => {
  deckCreation.style.opacity = "0";
  setTimeout(() => {
    time.style.backgroundColor = "white";
    time.style.border = "2px solid black";
    section.style.display = "grid";
    (section.previousElementSibling as HTMLElement).style.display = "none";
  }, 1000);
  timer = setInterval(countdown, 1000);
});

shuffle.addEventListener("click", () => {
  remainingTime = 5;
  htmlRender();
});

// Game's Logic

function countdown() {
  if (!gameTime || remainingTime == -1) {
    clearInterval(timer)
    shuffle.disabled = true;
    if (player.length > computer.length && remainingTime !== -1) {
      time.innerHTML = "You Won!";
    } else {
      time.innerHTML = "The Computer Won";
    }
  } else {
    gameTime <= 5 ? time.style.color = 'red' : ''
    time.innerHTML = gameTime + " seconds remaining";
    timeLimit.childNodes[1].textContent = `${remainingTime}`;
    gameTime--;
    remainingTime--;
  }
}

function htmlRender() {
  const card_1 = cardRender(playerElement, player);
  const card_2 = cardRender(computerElement, computer);

  if (CardValue[player[card_1].number] === CardValue[computer[card_2].number]) return;
  if (CardValue[player[card_1].number] < CardValue[computer[card_2].number]) {
    player.splice(card_1, 1);
    computer.push(player[card_1]);
  } else {
    computer.splice(card_2, 1);
    player.push(computer[card_2]);
  }
  section.children[3].children[2].textContent = `Player : ${player.length}`;
  section.children[3].children[3].textContent = `Computer : ${computer.length}`;
}

function cardRender(element: HTMLDivElement, cards: Cards[]) {
  const randomCard = Math.floor(Math.random() * cards.length);
  element.style.backgroundImage = "none";
  element.innerText = cards[randomCard].shape;
  element.dataset.value = `${cards[randomCard].number} ${cards[randomCard].shape} `;
  element.style.color = `${cards[randomCard].color === "black" ? 'black' : 'red'}`
  return randomCard;
}
